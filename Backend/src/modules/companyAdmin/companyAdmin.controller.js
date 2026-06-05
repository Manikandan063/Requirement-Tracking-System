import * as companyAdminService from './companyAdmin.service.js';
import { createCompanyAdminSchema } from './companyAdmin.schema.js';

export const createCompanyAdmin = async (req, res, next) => {
  try {
    const data = createCompanyAdminSchema.parse(req.body);
    const admin = await companyAdminService.createCompanyAdmin(data);
    res.status(201).json({ success: true, message: 'Company admin created', data: { id: admin.id } });
  } catch (error) {
    next(error);
  }
};
