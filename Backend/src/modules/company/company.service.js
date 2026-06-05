import { Company, User } from '../../models/initModels.js';
import { hashPassword } from '../../shared/auth/bcrypt.js';
import sequelize from '../../config/db.js';
export const createCompany = async (data) => {
  const existingCompany = await Company.findOne({ where: { companyEmail: data.companyEmail } });
  if (existingCompany) throw new Error('Company email already exists');
  return await Company.create(data);
};

export const getAllCompanies = async () => {
  return await Company.findAll();
};

export const getCompanyById = async (id) => {
  const company = await Company.findByPk(id);
  if (!company) throw new Error('Company not found');
  return company;
};

export const updateCompany = async (id, data) => {
  const company = await getCompanyById(id);
  return await company.update(data);
};

export const deleteCompany = async (id) => {
  const company = await getCompanyById(id);
  await company.destroy();
  return { id };
};

export const registerCompany = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const existingCompany = await Company.findOne({ where: { companyEmail: data.companyEmail }, transaction });
    if (existingCompany) {
      const err = new Error("Company email already exists");
      err.status = 400;
      throw err;
    }
    
    const existingUser = await User.findOne({ where: { email: data.adminEmail }, transaction });
    if (existingUser) {
      const err = new Error("Admin email already exists");
      err.status = 400;
      throw err;
    }

    const company = await Company.create({
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      website: data.website,
      description: data.description,
    }, { transaction });

    const hashedPassword = await hashPassword(data.password);
    const admin = await User.create({
      name: data.adminName,
      email: data.adminEmail,
      phoneNumber: data.adminPhone,
      password: hashedPassword,
      role: "COMPANY_ADMIN",
      companyId: company.id
    }, { transaction });

    await transaction.commit();
    return { company, admin: { id: admin.id, email: admin.email } };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};