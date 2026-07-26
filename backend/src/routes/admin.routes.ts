import { Router } from 'express';
import {
  handleAdminLogin,
  handleCacheFlush,
  handleAdminHistory,
  handleDeleteHistory,
} from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', authLimiter, handleAdminLogin);
router.delete('/cache', authenticate, requireAdmin, handleCacheFlush);
router.get('/history', authenticate, requireAdmin, handleAdminHistory);
router.delete('/history/:id', authenticate, requireAdmin, handleDeleteHistory);

export default router;
