import { Router } from 'express';
import * as followController from './follow.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware, roleMiddleware(['JOB_SEEKER']));
router.post('/:companyId', followController.followCompany);
router.delete('/:companyId', followController.unfollowCompany);
router.get('/my-companies', followController.getMyFollowedCompanies);

export default router;
