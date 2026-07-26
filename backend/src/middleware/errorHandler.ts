import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function createError(message: string, statusCode = 500, code?: string): AppError {
  const err: AppError = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  return err;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  logger.error(`[${statusCode}] ${err.message}`, { stack: err.stack });

  res.status(statusCode).json({
    success: false,
    error: {
      message: statusCode === 500 && !isDev ? 'An unexpected error occurred' : err.message,
      code: err.code,
      ...(isDev && { stack: err.stack }),
    },
  });
}

export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  const err = createError('Route not found', 404, 'NOT_FOUND');
  next(err);
}
