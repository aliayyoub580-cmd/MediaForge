import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { globalLimiter } from './middleware/rateLimiter';
import { errorHandler, notFound } from './middleware/errorHandler';
import { connectDatabase } from './database/prisma';
import { initRedis } from './utils/cache';
import { logger } from './utils/logger';
import { seedAdminUser } from './services/auth.service';
import { handlePlatforms, handleHealth } from './controllers/stats.controller';

import downloadRoutes from './routes/download.routes';
import statsRoutes from './routes/stats.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '5000');

// Security & parsing
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
app.use('/api', globalLimiter);

// Routes
app.get('/api/health', handleHealth);
app.get('/api/platforms', handlePlatforms);
app.use('/api/download', downloadRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// 404 & error handling
app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
  await connectDatabase();
  await initRedis();

  // Seed admin user — safe to fail if DB isn't connected yet
  try {
    await seedAdminUser();
  } catch {
    logger.warn('Admin seed skipped — database not available');
  }

  app.listen(PORT, () => {
    logger.info(`🚀 MediaForge Pro API running on port ${PORT}`);
    logger.info(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`   DB: ${process.env.DATABASE_URL?.includes('your-project') ? '⚠ placeholder — set DATABASE_URL' : '✓'}`);
  });
}

bootstrap();
