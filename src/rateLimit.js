// Basic API rate limiting middleware.
// Limits each client identifier to 5 requests per minute.

const buckets = new Map();

function rateLimit(req, res, next) {
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = forwardedFor || req.socket?.remoteAddress || 'unknown';
  const key = Array.isArray(clientIp) ? clientIp[0] : String(clientIp);
  const now = Date.now();

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    next();
    return;
  }

  if (bucket.count >= maxRequests) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  bucket.count += 1;
  next();
}

module.exports = { rateLimit };
