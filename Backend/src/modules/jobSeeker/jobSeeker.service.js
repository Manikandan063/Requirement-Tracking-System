import { User, Application, JobPost } from '../../models/initModels.js';

export const getProfile = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) throw new Error('User not found');
  return user;
};

export const updateProfile = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.update(data);
};

export const getDashboard = async (id) => {
  const appliedJobsCount = await Application.count({ where: { jobSeekerId: id } });
  return { appliedJobsCount };
};
