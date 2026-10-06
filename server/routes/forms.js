const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { formLimiter, reviewLimiter } = require('../middleware/rateLimiter');
const { offerteValidation, contactValidation, reviewValidation } = require('../middleware/validators');
const fileService = require('../services/fileService');
const honeypot = require('../middleware/honeypot');

/**
 * POST /api/offerte
 * Offerte-aanvraag (multipart) met maximaal 5 foto's
 */
router.post('/offerte', formLimiter, (req, res, next) => {
  fileService.getUploadMiddleware()(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'Bestand is te groot (max 10 MB per foto)'
        : err.code === 'LIMIT_FILE_COUNT'
          ? "Maximaal 5 foto's toegestaan"
          : err.message || 'Fout bij uploaden van bestanden';
      return res.status(400).json({ success: false, message });
    }
    next();
  });
}, honeypot, offerteValidation, (req, res) => formController.submitOfferte(req, res));

/** POST /api/contact */
router.post('/contact', formLimiter, honeypot, contactValidation, (req, res) => formController.submitContact(req, res));

/** POST /api/review — wordt pas zichtbaar na goedkeuring */
router.post('/review', reviewLimiter, honeypot, reviewValidation, (req, res) => formController.submitReview(req, res));

/** GET /api/health */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
