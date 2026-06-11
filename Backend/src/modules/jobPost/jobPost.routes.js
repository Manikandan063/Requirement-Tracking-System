import { Router } from 'express';
import * as jobPostController from './jobPost.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.get('/', jobPostController.getAllJobPosts);
router.get('/:id', jobPostController.getJobPostById);
router.get('/company/:companyId', jobPostController.getJobPostsByCompany);

router.post('/:id/like', authMiddleware, jobPostController.likeJobPost);
router.post('/:id/unlike', authMiddleware, jobPostController.unlikeJobPost);
router.post('/:id/comment', authMiddleware, jobPostController.commentJobPost);
router.post('/:id/share', authMiddleware, jobPostController.shareJobPost);

router.use(authMiddleware, roleMiddleware(['HR']));
router.post('/', jobPostController.createJobPost);
router.put('/:id', jobPostController.updateJobPost);
router.delete('/:id', jobPostController.deleteJobPost);

export default router;
