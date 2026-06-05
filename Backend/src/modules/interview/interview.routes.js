import { Router } from 'express';
import * as interviewController from './interview.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:applicationId/schedule', roleMiddleware(['HR']), interviewController.scheduleInterview);
router.put('/:applicationId/confirm', roleMiddleware(['JOB_SEEKER']), interviewController.confirmInterview);
router.put('/:applicationId/round-status', roleMiddleware(['HR']), interviewController.updateRoundStatus);
router.get('/:applicationId', interviewController.getInterview);

export default router;
