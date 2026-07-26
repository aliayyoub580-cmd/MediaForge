import { Request, Response, NextFunction } from 'express';
import { loginAdmin } from '../services/auth.service';
import { cacheFlush } from '../utils/cache';
import { prisma } from '../database/prisma';
import { authLimiter } from '../middleware/rateLimiter';

export async function handleAdminLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: { message: 'Email and password required' } });
      return;
    }
    const result = await loginAdmin(email, password);
    res.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    res.status(401).json({ success: false, error: { message } });
  }
}

export async function handleCacheFlush(_req: Request, res: Response, next: NextFunction) {
  try {
    await cacheFlush();
    res.json({ success: true, data: { message: 'Cache flushed successfully' } });
  } catch (err) {
    next(err);
  }
}

export async function handleAdminHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const platform = req.query.platform as string | undefined;
    const skip = (page - 1) * limit;

    const where = platform ? { platform } : {};
    const [items, total] = await Promise.all([
      prisma.downloadHistory.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.downloadHistory.count({ where }),
    ]);
    res.json({ success: true, data: { items, total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

export async function handleDeleteHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.downloadHistory.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Record deleted' } });
  } catch (err) {
    next(err);
  }
}
