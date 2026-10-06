const mongoose = require('mongoose');

/** Offerte-aanvragen en contactberichten, als back-up naast de e-mail. */
const leadSchema = new mongoose.Schema({
  type: { type: String, enum: ['offerte', 'contact'], required: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, trim: true, maxlength: 200, default: '' },
  phone: { type: String, trim: true, maxlength: 30, default: '' },
  dienst: { type: String, trim: true, maxlength: 500, default: '' },
  location: { type: String, trim: true, maxlength: 100, default: '' },
  propertyType: { type: String, trim: true, maxlength: 60, default: '' },
  startPeriod: { type: String, trim: true, maxlength: 60, default: '' },
  contactPreference: { type: String, trim: true, maxlength: 30, default: '' },
  description: { type: String, trim: true, maxlength: 5000, default: '' },
  photoCount: { type: Number, default: 0 },
  status: { type: String, enum: ['nieuw', 'in behandeling', 'offerte verstuurd', 'afgerond', 'afgewezen'], default: 'nieuw' },
}, { timestamps: true });

// AVG: aanvragen worden na 12 maanden automatisch verwijderd (zie privacyverklaring)
leadSchema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });

module.exports = mongoose.model('Lead', leadSchema);
