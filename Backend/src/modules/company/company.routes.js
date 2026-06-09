import { Router } from 'express';
import * as companyController from './company.controller.js';
import { authMiddleware } from '../../shared/Middleware/authMiddleware.js';
import { roleMiddleware } from '../../shared/Middleware/roleMiddleware.js';

const router = Router();

router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);

router.post('/register', companyController.registerCompany);

router.put('/:id', authMiddleware, roleMiddleware(['SUPER_ADMIN', 'COMPANY_ADMIN']), companyController.updateCompany);

router.use(authMiddleware, roleMiddleware(['SUPER_ADMIN']));
router.post('/', companyController.createCompany);
router.delete('/:id', companyController.deleteCompany);

export default router;
