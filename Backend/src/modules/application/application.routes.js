import { Router } from 'express';
import * as applicationController from './application.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:jobPostId', roleMiddleware(['JOB_SEEKER']), applicationController.applyForJob);
router.get('/my-applications', roleMiddleware(['JOB_SEEKER']), applicationController.getMyApplications);
router.get('/hr/all', roleMiddleware(['HR']), applicationController.getAllHrApplications);
router.get('/hr/job/:jobPostId', roleMiddleware(['HR']), applicationController.getApplicationsByJob);
router.get('/:id', applicationController.getApplicationById);
router.put('/:id/status', roleMiddleware(['HR', 'ADMIN', 'COMPANY_ADMIN', 'SUPER_ADMIN']), applicationController.updateApplicationStatus);

export default router;
