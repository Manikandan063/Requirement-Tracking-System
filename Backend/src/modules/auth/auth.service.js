import { User, Company } from '../../models/initModels.js';
import { hashPassword, comparePassword } from '../../shared/auth/bcrypt.js';
import { generateToken } from '../../shared/auth/jwt.js';

export const registerJobSeeker = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(data.password);
  const user = await User.create({
    ...data,
    password: hashedPassword,
    role: 'JOB_SEEKER'
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ 
    where: { email },
    include: [{ model: Company }]
  });
  if (!user || !user.isActive) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    companyId: user.companyId
  });

  return { user, token };
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Company }]
  });
  return user;
};
