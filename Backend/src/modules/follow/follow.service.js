import { Follow } from '../../models/initModels.js';

export const followCompany = async (jobSeekerId, companyId) => {
  const existingFollow = await Follow.findOne({ where: { jobSeekerId, companyId } });
  if (existingFollow) throw new Error('Already following this company');
  return await Follow.create({ jobSeekerId, companyId });
};

export const unfollowCompany = async (jobSeekerId, companyId) => {
  const follow = await Follow.findOne({ where: { jobSeekerId, companyId } });
  if (!follow) throw new Error('Not following this company');
  await follow.destroy();
  return { companyId };
};

export const getMyFollowedCompanies = async (jobSeekerId) => {
  return await Follow.findAll({ where: { jobSeekerId }, include: ['company'] });
};
