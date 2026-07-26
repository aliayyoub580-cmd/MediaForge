import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: 'Too many requests, please try again later.', code: 'RATE_LIMITED' },
  },
});

export const downloadLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: 'Too many download requests. Please wait a moment.', code: 'RATE_LIMITED' },
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60_000,
  max: 10,
  message: {
    success: false,
    error: { message: 'Too many login attempts.', code: 'RATE_LIMITED' },
  },
});
