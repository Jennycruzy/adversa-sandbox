// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    // Use client IP from header for rate limiting
    return req.headers['x-forwarded-for'] || req.ip;
  },
  message: 'Too many requests from this IP'
});

module.exports = limiter;
