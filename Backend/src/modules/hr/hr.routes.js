import { Router } from 'express';
import * as hrController from './hr.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware, roleMiddleware(['COMPANY_ADMIN']));
router.post('/', hrController.createHr);
router.get('/', hrController.getHrs);
router.put('/:id', hrController.updateHr);
router.delete('/:id', hrController.deleteHr);

export default router;
