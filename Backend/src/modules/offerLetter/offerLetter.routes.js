import { Router } from 'express';
import * as offerLetterController from './offerLetter.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:applicationId/send', roleMiddleware(['HR']), offerLetterController.sendOfferLetter);
router.get('/:applicationId', offerLetterController.getOfferLetter);

export default router;
