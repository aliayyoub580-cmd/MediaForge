import { Router } from 'express';
import { handleStats, handleDailyStats, handlePlatforms, handleHealth } from '../controllers/stats.controller';

const router = Router();

router.get('/', handleStats);
router.get('/daily', handleDailyStats);

export default router;
