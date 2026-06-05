import { User } from '../../models/initModels.js';
import { hashPassword } from '../../shared/auth/bcrypt.js';

export const createHr = async (data, companyId) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await hashPassword(data.password);
  const hr = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: 'HR',
    department: data.department,
    companyId,
  });

  return hr;
};

export const getHrsByCompany = async (companyId) => {
  return await User.findAll({ where: { companyId, role: 'HR' }, attributes: { exclude: ['password'] } });
};

export const updateHr = async (id, data, companyId) => {
  const hr = await User.findOne({ where: { id, role: 'HR', companyId } });
  if (!hr) throw new Error('HR not found');
  return await hr.update(data);
};

export const deleteHr = async (id, companyId) => {
  const hr = await User.findOne({ where: { id, role: 'HR', companyId } });
  if (!hr) throw new Error('HR not found');
  await hr.destroy();
  return { id };
};
