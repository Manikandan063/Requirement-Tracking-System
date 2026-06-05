import { Router } from 'express';
import { createCompanyAdmin } from './companyAdmin.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';
import { Application } from '../../models/initModels.js';
import { Verification } from '../../models/initModels.js';

const router = Router();

router.use(authMiddleware);

// Admin Verification APIs
router.get('/pending-candidates', roleMiddleware(['SUPER_ADMIN']), async (req, res, next) => {
  try {
    const candidates = await Application.findAll({
      where: { status: 'SENT_TO_ADMIN' },
      include: [Verification]
    });
    res.status(200).json({ success: true, message: 'Pending candidates fetched', data: candidates });
  } catch (error) {
    next(error);
  }
});

router.put('/verify-candidate/:applicationId', roleMiddleware(['SUPER_ADMIN']), async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.applicationId);
    if (!application) throw new Error('Application not found');
    
    await application.update({ status: 'ADMIN_VERIFIED' });
    res.status(200).json({ success: true, message: 'Candidate verified successfully', data: application });
  } catch (error) {
    next(error);
  }
});

// Original create company admin
router.post('/', roleMiddleware(['SUPER_ADMIN']), createCompanyAdmin);

export default router;
