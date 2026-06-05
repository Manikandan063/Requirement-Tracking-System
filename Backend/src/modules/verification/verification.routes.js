import { Router } from 'express';
import * as verificationController from './verification.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:applicationId/search', roleMiddleware(['HR']), verificationController.searchVerification);
router.put('/:applicationId/verify', roleMiddleware(['HR', 'SUPER_ADMIN']), verificationController.verifyCandidate);
router.get('/:applicationId', verificationController.getVerification);

export default router;
