import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import { createError } from './errorHandler';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(createError('No token provided', 401, 'UNAUTHORIZED'));
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JwtPayload;
    req.user = payload;
    next();
  } catch {
    next(createError('Invalid or expired token', 401, 'UNAUTHORIZED'));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    return next(createError('Admin access required', 403, 'FORBIDDEN'));
  }
  next();
}
