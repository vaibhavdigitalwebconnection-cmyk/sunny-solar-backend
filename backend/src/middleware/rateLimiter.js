/**
 * Lightweight in-memory rate limiter middleware
 * Prevents brute-force credential attacks and form spam without external dependencies
 */

export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000, // 15 minutes default
  maxRequests = 10,           // Max attempts per window
  message = 'Too many attempts from this IP, please try again later.'
} = {}) => {
  const ipHits = new Map();

  // Periodic cleanup to avoid memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipHits.entries()) {
      if (now - data.firstRequest > windowMs) {
        ipHits.delete(ip);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // In development or local testing, do not lock out localhost
    if (
      process.env.NODE_ENV !== 'production' &&
      (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1' || String(ip).includes('127.0.0.1') || ip === 'localhost')
    ) {
      return next();
    }

    if (!record) {
      ipHits.set(ip, { count: 1, firstRequest: now });
      return next();
    }

    if (now - record.firstRequest > windowMs) {
      // Window expired, reset
      ipHits.set(ip, { count: 1, firstRequest: now });
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      const retryAfter = Math.ceil((record.firstRequest + windowMs - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: retryAfter
      });
    }

    next();
  };
};

export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 50,
  message: 'Too many login attempts. Please wait 15 minutes before trying again.'
});

export const leadLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5,
  message: 'Form submission limit reached. Please wait a moment before sending another request.'
});
