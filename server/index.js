/**
 * Sultan Bouw & Renovatie - Express server
 * Serveert de gebouwde Astro-website (web/dist) en de formulier-API.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const emailService = require('./services/emailService');
const fileService = require('./services/fileService');
const formRoutes = require('./routes/forms');
const reviewRoutes = require('./routes/reviews');
const database = require('./services/database');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';
const SITE_DIR = path.join(__dirname, '..', 'web', 'dist');

// Achter de proxy van Fly.io (nodig voor de rate limiter)
app.set('trust proxy', 1);

// ─── Middleware ──────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  next();
});

// Website en API draaien op hetzelfde domein; extra domeinen via ALLOWED_ORIGINS (komma-gescheiden)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use('/api', cors({
  origin: isProd ? allowedOrigins : true,
  methods: ['GET', 'POST'],
}));

app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ─── Eén vast adres ─────────────────────────────────────
// Met CANONICAL_HOST (bijv. sultan-bouw.nl) gaan www- en .fly.dev-bezoekers permanent
// naar het hoofddomein. De API blijft op elk adres werken (o.a. health checks en oude reviewlinks).
const canonicalHost = process.env.CANONICAL_HOST;
if (canonicalHost) {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.hostname === canonicalHost) return next();
    res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
  });
}

// ─── API ────────────────────────────────────────────────
app.use('/api', formRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'Endpoint niet gevonden' }));

// ─── Website ────────────────────────────────────────────
app.use(express.static(SITE_DIR, {
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.includes(`${path.sep}_astro${path.sep}`)) {
      // Bestanden met hash in de naam veranderen nooit
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', `public, max-age=${isProd ? 86400 : 0}`);
    }
  },
}));

app.use((req, res) => {
  res.status(404).sendFile(path.join(SITE_DIR, '404.html'));
});

// ─── Error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server] Onverwachte fout:', err);
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Aangevraagde data is te groot' });
  }
  res.status(500).json({ success: false, message: 'Interne serverfout. Probeer het later opnieuw.' });
});

database.connect();
emailService.init();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Sultan Bouw & Renovatie draait op http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  // Vangnet: achtergebleven uploads opruimen
  setInterval(() => fileService.cleanOldUploads(), 6 * 60 * 60 * 1000);
});

const shutdown = () => {
  console.log('[Server] Server wordt afgesloten...');
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app;
