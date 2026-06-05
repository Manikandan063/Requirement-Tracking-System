import { Router } from 'express';
import * as jobSeekerController from './jobSeeker.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware, roleMiddleware(['JOB_SEEKER']));
router.get('/profile', jobSeekerController.getProfile);
router.put('/profile', jobSeekerController.updateProfile);
router.get('/dashboard', jobSeekerController.getDashboard);

export default router;
