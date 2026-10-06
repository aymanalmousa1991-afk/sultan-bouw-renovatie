const fs = require('fs');
const mongoose = require('mongoose');
const sharp = require('sharp');
const emailService = require('../services/emailService');
const Review = require('../models/Review');
const Lead = require('../models/Lead');
const { linksFor } = require('../services/reviewLinks');

const dbReady = () => mongoose.connection.readyState === 1;

/** Controleert de 'ftyp'-header van een HEIC/HEIF-bestand. */
function isHeic(path) {
  const fd = fs.openSync(path, 'r');
  const buf = Buffer.alloc(12);
  fs.readSync(fd, buf, 0, 12, 0);
  fs.closeSync(fd);
  return buf.toString('ascii', 4, 8) === 'ftyp' && ['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(buf.toString('ascii', 8, 12));
}

/**
 * Zet geüploade foto's om naar compacte JPEG-bijlagen (max. 1600px) en
 * verwijdert daarna de tijdelijke bestanden van de schijf.
 */
async function buildAttachments(files) {
  const attachments = [];
  for (const file of files) {
    try {
      const buffer = await sharp(file.path)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true })
        .toBuffer();
      attachments.push({ content: buffer, filename: 'foto-' + (attachments.length + 1) + '.jpg', contentType: 'image/jpeg' });
    } catch (err) {
      // HEIC (iPhone) kan sharp niet altijd lezen: alleen dan het origineel meesturen,
      // en alleen als de bestandsinhoud echt een HEIC/HEIF-foto is (niet wat de browser beweert)
      if (file.size <= 7 * 1024 * 1024 && isHeic(file.path)) {
        attachments.push({ content: fs.readFileSync(file.path), filename: 'foto-' + (attachments.length + 1) + '.heic', contentType: 'image/heic' });
      } else {
        console.error('[Offerte] Bestand overgeslagen (geen geldige foto):', err.message);
      }
    } finally {
      fs.unlink(file.path, () => {});
    }
  }
  return attachments;
}

class FormController {
  async submitOfferte(req, res) {
    const files = req.files || [];
    try {
      const data = {
        dienst: req.body.dienst,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location || '',
        propertyType: req.body.propertyType || '',
        startPeriod: req.body.startPeriod || '',
        contactPreference: req.body.contactPreference || '',
        description: req.body.description || '',
        photoCount: files.length,
      };

      // Aanvraag altijd ook in de database bewaren, zodat er niets verloren gaat
      let saved = false;
      if (dbReady()) {
        try {
          await Lead.create({ type: 'offerte', ...data });
          saved = true;
        } catch (err) {
          console.error('[Offerte] Opslaan in database mislukt:', err.message);
        }
      }

      const attachments = await buildAttachments(files);
      const mail = await emailService.sendMail({
        ...emailService.formatOfferteEmail(data),
        replyTo: data.email,
        attachments,
      });

      if (!mail.success && !saved) {
        return res.status(502).json({ success: false, message: 'Uw aanvraag kon niet worden verstuurd. Probeer het later opnieuw of bel ons.' });
      }
      return res.json({ success: true, message: 'Uw offerte-aanvraag is ontvangen!' });
    } catch (error) {
      console.error('[Offerte] Onverwachte fout:', error);
      files.forEach((f) => fs.unlink(f.path, () => {}));
      return res.status(500).json({ success: false, message: 'Er is een fout opgetreden.' });
    }
  }

  async submitContact(req, res) {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email || '',
        phone: req.body.phone || '',
        message: req.body.message,
      };

      let saved = false;
      if (dbReady()) {
        try {
          await Lead.create({ type: 'contact', name: data.name, email: data.email, phone: data.phone, description: data.message });
          saved = true;
        } catch (err) {
          console.error('[Contact] Opslaan in database mislukt:', err.message);
        }
      }

      const mail = await emailService.sendMail({
        ...emailService.formatContactEmail(data),
        replyTo: data.email || undefined,
      });

      if (!mail.success && !saved) {
        return res.status(502).json({ success: false, message: 'Uw bericht kon niet worden verstuurd. Probeer het later opnieuw of bel ons.' });
      }
      return res.json({ success: true, message: 'Uw bericht is ontvangen!' });
    } catch (error) {
      console.error('[Contact] Onverwachte fout:', error);
      return res.status(500).json({ success: false, message: 'Er is een fout opgetreden.' });
    }
  }

  async submitReview(req, res) {
    try {
      if (!dbReady()) {
        return res.status(503).json({ success: false, message: 'Reviews plaatsen is tijdelijk niet mogelijk. Probeer het later opnieuw.' });
      }
      const data = {
        name: req.body.name,
        stars: parseInt(req.body.stars, 10),
        dienst: req.body.dienst || '',
        message: req.body.message,
      };

      // Reviews worden pas zichtbaar na goedkeuring via de links in de e-mail
      const review = await Review.create({ ...data, approved: false });
      emailService.sendMail(emailService.formatReviewEmail(data, linksFor(review.id))).catch(() => {});

      return res.json({ success: true, message: 'Bedankt voor uw review! Deze verschijnt na controle op de website.' });
    } catch (error) {
      console.error('[Review] Fout:', error);
      return res.status(500).json({ success: false, message: 'Er is een fout opgetreden.' });
    }
  }
}

module.exports = new FormController();
