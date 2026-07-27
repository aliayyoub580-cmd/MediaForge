import { Router } from 'express';
import {
  handleDownload,
  downloadValidation,
  handleHistory,
  handleQRCode,
  streamMediaDownload,
  handleProxyImage,
} from '../controllers/download.controller';
import { downloadLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', downloadLimiter, downloadValidation, handleDownload);
router.get('/file', downloadLimiter, streamMediaDownload);
router.get('/proxy-image', handleProxyImage);
router.get('/history', handleHistory);
router.post('/qr', handleQRCode);

export default router;
