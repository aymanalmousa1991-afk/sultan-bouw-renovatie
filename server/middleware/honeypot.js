/**
 * Honeypot tegen spambots: het veld 'website' is onzichtbaar voor mensen.
 * Is het ingevuld, dan doen we alsof alles gelukt is, maar verwerken we niets.
 */
const fs = require('fs');

module.exports = function honeypot(req, res, next) {
  if (req.body && typeof req.body.website === 'string' && req.body.website.trim() !== '') {
    (req.files || []).forEach((f) => fs.unlink(f.path, () => {}));
    console.warn('[Spam] Honeypot ingevuld, verzoek genegeerd');
    return res.json({ success: true, message: 'Bedankt!' });
  }
  next();
};
