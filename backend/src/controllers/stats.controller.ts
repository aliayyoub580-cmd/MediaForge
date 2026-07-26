import { Request, Response, NextFunction } from 'express';
import { getAggregateStats, getDailyStats } from '../services/stats.service';
import { getSupportedPlatforms } from '../extractors/detector';

export async function handleStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await getAggregateStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

export async function handleDailyStats(req: Request, res: Response, next: NextFunction) {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const data = await getDailyStats(days);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export function handlePlatforms(_req: Request, res: Response) {
  res.json({ success: true, data: getSupportedPlatforms() });
}

export function handleHealth(_req: Request, res: Response) {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
    },
  });
}
