const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const { ACTIONS, verify } = require('../services/reviewLinks');

const router = express.Router();
const dbReady = () => mongoose.connection.readyState === 1;

// GET /api/reviews - alleen goedgekeurde reviews
router.get('/', async (req, res) => {
  if (!dbReady()) return res.json({ success: true, reviews: [] });
  try {
    const reviews = await Review.find({ approved: true })
      .select('name stars dienst message createdAt')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return res.json({ success: true, reviews });
  } catch (err) {
    console.error('[Reviews] Fout bij ophalen:', err.message);
    return res.json({ success: true, reviews: [] });
  }
});

/** Eenvoudige pagina in de huisstijl voor de goedkeur-links. */
function page(res, status, title, body) {
  res.status(status).type('html').send(`<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#161412;color:#f6f3ee;font-family:system-ui,sans-serif;padding:24px}
.card{max-width:520px;width:100%;background:#24211e;border-radius:24px;padding:36px;border-top:4px solid #b58849}
h1{margin:0 0 12px;font-size:26px}p{color:rgba(246,243,238,.75);line-height:1.6}blockquote{margin:20px 0;padding:16px 20px;background:rgba(255,255,255,.05);border-radius:14px;font-style:italic}
button,a.btn{display:inline-block;margin-top:12px;padding:14px 26px;border:0;border-radius:999px;font-weight:700;font-size:16px;cursor:pointer;text-decoration:none}
.ok{background:#b58849;color:#1c1a18}.del{background:#b91c1c;color:#fff}a.btn{background:#f6f3ee;color:#1c1a18}</style></head>
<body><div class="card">${body}</div></body></html>`);
}

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function loadReview(req, res) {
  const { id, action } = req.params;
  if (!ACTIONS.includes(action) || !mongoose.isValidObjectId(id) || !verify(id, action, req.query.sig)) {
    page(res, 403, 'Ongeldige link', '<h1>Ongeldige link</h1><p>Deze link is niet geldig of beschadigd.</p>');
    return null;
  }
  if (!dbReady()) {
    page(res, 503, 'Niet beschikbaar', '<h1>Even niet beschikbaar</h1><p>De database is tijdelijk niet bereikbaar. Probeer het later opnieuw.</p>');
    return null;
  }
  const review = await Review.findById(id);
  if (!review) {
    page(res, 404, 'Niet gevonden', '<h1>Review niet gevonden</h1><p>Deze review is al verwijderd.</p><a class="btn" href="/">Naar de website</a>');
    return null;
  }
  return review;
}

// GET: bevestigingspagina (zodat link-scanners in e-mail niets automatisch uitvoeren)
router.get('/:id/:action', async (req, res) => {
  const review = await loadReview(req, res);
  if (!review) return;
  const { action } = req.params;
  const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
  const status = review.approved ? '<p>Deze review staat al online.</p>' : '<p>Deze review is nog niet zichtbaar op de website.</p>';
  page(res, 200, 'Review beoordelen', `<h1>${action === 'approve' ? 'Review goedkeuren?' : 'Review verwijderen?'}</h1>${status}
<blockquote><div style="color:#d4a865;font-style:normal">${stars}</div>"${esc(review.message)}"<br><br>— ${esc(review.name)}${review.dienst ? ' · ' + esc(review.dienst) : ''}</blockquote>
<form method="post"><button class="${action === 'approve' ? 'ok' : 'del'}" type="submit">${action === 'approve' ? 'Ja, plaats op de website' : 'Ja, verwijder deze review'}</button></form>`);
});

// POST: daadwerkelijk goedkeuren of verwijderen
router.post('/:id/:action', express.urlencoded({ extended: false }), async (req, res) => {
  const review = await loadReview(req, res);
  if (!review) return;
  if (req.params.action === 'approve') {
    review.approved = true;
    await review.save();
    page(res, 200, 'Goedgekeurd', '<h1>✓ Review staat online</h1><p>De review is nu zichtbaar op de website.</p><a class="btn" href="/#reviews">Bekijk op de website</a>');
  } else {
    await review.deleteOne();
    page(res, 200, 'Verwijderd', '<h1>Review verwijderd</h1><p>De review is definitief verwijderd.</p><a class="btn" href="/">Naar de website</a>');
  }
});

module.exports = router;
