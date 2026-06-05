import { Router } from 'express';
import * as dashboardController from './dashboard.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/super-admin', roleMiddleware(['SUPER_ADMIN']), dashboardController.getSuperAdminDashboard);
router.get('/company-admin', roleMiddleware(['COMPANY_ADMIN']), dashboardController.getCompanyAdminDashboard);
router.get('/hr', roleMiddleware(['HR']), dashboardController.getHrDashboard);
router.get('/job-seeker', roleMiddleware(['JOB_SEEKER']), dashboardController.getJobSeekerDashboard);

export default router;
