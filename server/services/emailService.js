const nodemailer = require('nodemailer');

const BRAND = 'Sultan Bouw & Renovatie';

/** Maakt gebruikersinvoer veilig voor gebruik in HTML-mails. */
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function multiline(value) {
  return esc(value).replace(/\n/g, '<br>');
}

function layout(title, rows, footer = '') {
  return '<div style="background:#f4f1ea;padding:24px;font-family:Arial,sans-serif">' +
    '<div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">' +
    '<div style="background:#1c1a18;color:#f4f1ea;padding:24px 28px;border-bottom:4px solid #b58849">' +
    '<p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4a865">' + BRAND + '</p>' +
    '<h1 style="margin:8px 0 0;font-size:24px;font-weight:700">' + esc(title) + '</h1>' +
    '<p style="margin:6px 0 0;font-size:13px;color:rgba(244,241,234,.65)">Ontvangen op ' + new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' }) + '</p>' +
    '</div><table style="width:100%;border-collapse:collapse;font-size:15px;color:#111513">' +
    rows.filter(Boolean).map(function (r) {
      return '<tr><td style="padding:12px 28px;border-bottom:1px solid #eee;width:38%;color:#5b625d;vertical-align:top">' + esc(r[0]) + '</td>' +
        '<td style="padding:12px 28px;border-bottom:1px solid #eee;vertical-align:top">' + r[1] + '</td></tr>';
    }).join('') +
    '</table>' + footer +
    '<p style="margin:0;padding:20px 28px;font-size:12px;color:#5b625d">Automatisch verzonden via de website van ' + BRAND + '.</p>' +
    '</div></div>';
}

class EmailService {
  constructor() {
    this.enabled = false;
  }

  /**
   * SMTP-configuratie. Voor Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465,
   * SMTP_USER=het gmail-adres en SMTP_PASS=een app-wachtwoord (geen gewoon wachtwoord).
   */
  init() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const port = Number(SMTP_PORT) || 465;
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      this.fromEmail = process.env.MAIL_FROM || SMTP_USER;
      this.enabled = true;
      this.transporter.verify()
        .then(() => console.log('[Email] SMTP verbonden (' + SMTP_HOST + ')'))
        .catch((err) => console.error('[Email] ⚠️  SMTP-verbinding mislukt:', err.message));
    } else if (process.env.NODE_ENV === 'production') {
      console.error('[Email] ⚠️  SMTP_HOST/SMTP_USER/SMTP_PASS ontbreken — er worden GEEN e-mails verstuurd!');
    } else {
      console.log('[Email] Geen SMTP-config, e-mails worden in de console getoond');
    }
  }

  get recipient() {
    return process.env.NOTIFICATION_EMAIL || 'sultanbouwrenovatie@gmail.com';
  }

  /**
   * Verstuurt een e-mail. Geeft { success: false } terug als het mislukt,
   * zodat de aanroeper de klant een eerlijke foutmelding kan geven.
   */
  async sendMail({ to, subject, html, replyTo, attachments = [] }) {
    if (!this.enabled) {
      if (process.env.NODE_ENV === 'production') return { success: false };
      this._consoleLog({ to, subject, html, attachments });
      return { success: true, fallback: true };
    }
    try {
      await this.transporter.sendMail({
        to: to || this.recipient,
        from: { name: BRAND, address: this.fromEmail },
        replyTo: replyTo || undefined,
        subject,
        html,
        text: html.replace(/<br>/g, '\n').replace(/<[^>]*>/g, ' ').replace(/[ \t]+/g, ' '),
        attachments,
      });
      console.log('[Email] Verzonden: ' + subject);
      return { success: true };
    } catch (error) {
      console.error('[Email] Fout:', error.message);
      return { success: false };
    }
  }

  formatOfferteEmail(d) {
    return {
      subject: 'Nieuwe offerte-aanvraag: ' + d.name + ' (' + d.dienst + ')',
      html: layout('Nieuwe offerte-aanvraag', [
        ['Werkzaamheden', '<strong>' + esc(d.dienst) + '</strong>'],
        ['Naam', esc(d.name)],
        ['Telefoon', '<a href="tel:' + esc(d.phone.replace(/\s/g, '')) + '">' + esc(d.phone) + '</a>'],
        ['E-mail', '<a href="mailto:' + esc(d.email) + '">' + esc(d.email) + '</a>'],
        ['Contactvoorkeur', esc(d.contactPreference)],
        ['Plaats / postcode', esc(d.location)],
        ['Type pand', esc(d.propertyType)],
        ['Gewenste start', esc(d.startPeriod)],
        ['Omschrijving', multiline(d.description)],
        d.photoCount ? ["Foto's", d.photoCount + ' bijgevoegd'] : null,
      ]),
    };
  }

  formatContactEmail(d) {
    return {
      subject: 'Nieuw contactbericht van ' + d.name,
      html: layout('Nieuw contactbericht', [
        ['Naam', esc(d.name)],
        ['E-mail', d.email ? '<a href="mailto:' + esc(d.email) + '">' + esc(d.email) + '</a>' : 'Niet opgegeven'],
        ['Telefoon', d.phone ? esc(d.phone) : 'Niet opgegeven'],
        ['Bericht', multiline(d.message)],
      ]),
    };
  }

  formatReviewEmail(d, links) {
    const stars = '★'.repeat(d.stars) + '☆'.repeat(5 - d.stars);
    const btn = (href, label, bg, color) =>
      '<a href="' + href + '" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;border-radius:999px;background:' + bg + ';color:' + color + ';font-weight:700;text-decoration:none">' + label + '</a>';
    const actions = links
      ? '<div style="padding:20px 28px;background:#faf6ef"><p style="margin:0 0 12px;font-size:14px">Deze review staat nog <strong>niet</strong> online. Wat wilt u doen?</p>' +
        btn(links.approve, '✓ Goedkeuren', '#b58849', '#1c1a18') + btn(links.delete, 'Verwijderen', '#e5e0d8', '#1c1a18') + '</div>'
      : '<p style="margin:0;padding:16px 28px;font-size:13px;background:#faf6ef">Deze review staat nog niet online. (Goedkeur-links ontbreken: stel PUBLIC_URL en REVIEW_SECRET in.)</p>';
    return {
      subject: 'Nieuwe review (' + d.stars + '★) van ' + d.name + ' — wacht op goedkeuring',
      html: layout('Nieuwe review', [
        ['Beoordeling', '<span style="color:#b58849;font-size:18px">' + stars + '</span>'],
        ['Naam', esc(d.name)],
        ['Werkzaamheden', esc(d.dienst)],
        ['Bericht', multiline(d.message)],
      ], actions),
    };
  }

  _consoleLog({ to, subject, html, attachments }) {
    const sep = '─'.repeat(50);
    console.log('\n' + sep + '\nE-MAIL (console)\n' + sep);
    console.log('Aan: ' + (to || this.recipient));
    console.log('Onderwerp: ' + subject);
    if (attachments.length) console.log('Bijlagen: ' + attachments.map((a) => a.filename).join(', '));
    const links = [...html.matchAll(/href="(http[^"]+)"/g)].map((m) => m[1]);
    if (links.length) console.log('Links:\n  ' + links.join('\n  '));
    console.log(sep);
    console.log(html.replace(/<br>/g, '\n').replace(/<\/tr>/g, '\n').replace(/<[^>]*>/g, ' ').replace(/[ \t]+/g, ' ').trim());
    console.log(sep + '\n');
  }
}

module.exports = new EmailService();
