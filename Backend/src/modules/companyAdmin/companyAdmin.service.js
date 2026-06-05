import { User, Company } from '../../models/initModels.js';
import { hashPassword } from '../../shared/auth/bcrypt.js';

export const createCompanyAdmin = async (data) => {
  const company = await Company.findByPk(data.companyId);
  if (!company) throw new Error('Company not found');

  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await hashPassword(data.password);
  const admin = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: 'COMPANY_ADMIN',
    companyId: data.companyId,
  });

  return admin;
};
