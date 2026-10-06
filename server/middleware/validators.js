const { body, validationResult } = require('express-validator');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

/** Verwijdert alle HTML uit tekstinvoer. */
const sanitize = (value) =>
  typeof value === 'string' ? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim() : value;

const PHONE = /^[0-9\s\-+()]{10,15}$/;

const text = (field, max) =>
  body(field).optional({ values: 'falsy' }).isString().withMessage('Ongeldige invoer').bail().trim().isLength({ max }).customSanitizer(sanitize);

function handleErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Geüploade foto's van een afgekeurde aanvraag direct opruimen
    (req.files || []).forEach((f) => fs.unlink(f.path, () => {}));
    return res.status(400).json({
      success: false,
      message: 'Controleer uw invoer.',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

const offerteValidation = [
  body('name').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 100 }).withMessage('Naam moet tussen 2 en 100 tekens zijn').customSanitizer(sanitize),
  body('phone').isString().withMessage('Ongeldige invoer').bail().trim().matches(PHONE).withMessage('Ongeldig telefoonnummer'),
  body('email').isString().withMessage('Ongeldige invoer').bail().trim().isEmail().withMessage('Ongeldig e-mailadres').isLength({ max: 200 }),
  body('dienst').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 500 }).withMessage('Kies minimaal één dienst').customSanitizer(sanitize),
  body('description').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 10, max: 5000 }).withMessage('Omschrijving moet tussen 10 en 5000 tekens zijn').customSanitizer(sanitize),
  body('location').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 100 }).withMessage('Vul uw plaats of postcode in').customSanitizer(sanitize),
  text('propertyType', 60),
  text('startPeriod', 60),
  text('contactPreference', 30),
  body('privacy').equals('true').withMessage('Akkoord met de privacyverklaring is verplicht'),
  handleErrors,
];

const contactValidation = [
  body('name').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 100 }).withMessage('Naam moet tussen 2 en 100 tekens zijn').customSanitizer(sanitize),
  body('email').optional({ values: 'falsy' }).isString().withMessage('Ongeldige invoer').bail().trim().isEmail().withMessage('Ongeldig e-mailadres'),
  body('phone').optional({ values: 'falsy' }).isString().withMessage('Ongeldige invoer').bail().trim().matches(PHONE).withMessage('Ongeldig telefoonnummer'),
  body('email').custom((email, { req }) => {
    if (!email && !req.body.phone) throw new Error('Vul een e-mailadres of telefoonnummer in');
    return true;
  }),
  body('message').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 5000 }).withMessage('Bericht moet tussen 2 en 5000 tekens zijn').customSanitizer(sanitize),
  handleErrors,
];

const reviewValidation = [
  body('name').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 100 }).withMessage('Naam moet tussen 2 en 100 tekens zijn').customSanitizer(sanitize),
  body('stars').isInt({ min: 1, max: 5 }).withMessage('Kies 1 tot 5 sterren'),
  text('dienst', 100),
  body('message').isString().withMessage('Ongeldige invoer').bail().trim().isLength({ min: 2, max: 2000 }).withMessage('Bericht moet tussen 2 en 2000 tekens zijn').customSanitizer(sanitize),
  handleErrors,
];

module.exports = { offerteValidation, contactValidation, reviewValidation };
