const rateLimit = require('express-rate-limit');

const requestThrottle = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 75,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const clientAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
    return Array.isArray(clientAddress) ? clientAddress[0] : clientAddress;
  },
  message: 'Request limit exceeded. Please retry later.'
});

module.exports = requestThrottle;
