const crypto = require('crypto');

/**
 * Ondertekende links om reviews vanuit de e-mail goed te keuren of te verwijderen.
 * Zonder REVIEW_SECRET kan niemand die links namaken.
 */
const ACTIONS = ['approve', 'delete'];

function sign(id, action) {
  const secret = process.env.REVIEW_SECRET;
  if (!secret) return null;
  return crypto.createHmac('sha256', secret).update(`${id}:${action}`).digest('hex');
}

function verify(id, action, sig) {
  const expected = sign(id, action);
  if (!expected || typeof sig !== 'string' || sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

/** Volledige links voor in de e-mail, of null als PUBLIC_URL/REVIEW_SECRET ontbreken. */
function linksFor(id) {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  if (!base || !process.env.REVIEW_SECRET) return null;
  return Object.fromEntries(ACTIONS.map((a) => [a, `${base}/api/reviews/${id}/${a}?sig=${sign(id, a)}`]));
}

module.exports = { ACTIONS, verify, linksFor };
