import { JobPost, Company } from '../../models/initModels.js';

export const createJobPost = async (data, hrId, companyId) => {
  return await JobPost.create({ ...data, hrId, companyId });
};

export const getAllJobPosts = async () => {
  return await JobPost.findAll({ include: [{ model: Company }] });
};

export const getJobPostById = async (id) => {
  const jobPost = await JobPost.findByPk(id, { include: [{ model: Company }] });
  if (!jobPost) throw new Error('Job post not found');
  return jobPost;
};

export const getJobPostsByCompany = async (companyId) => {
  return await JobPost.findAll({ where: { companyId } });
};

export const updateJobPost = async (id, data, hrId) => {
  const jobPost = await JobPost.findOne({ where: { id, hrId } });
  if (!jobPost) throw new Error('Job post not found or unauthorized');
  return await jobPost.update(data);
};

export const deleteJobPost = async (id, hrId) => {
  const jobPost = await JobPost.findOne({ where: { id, hrId } });
  if (!jobPost) throw new Error('Job post not found or unauthorized');
  await jobPost.destroy();
  return { id };
};

export const likeJobPost = async (id) => {
  const jobPost = await JobPost.findByPk(id);
  if (!jobPost) throw new Error('Job post not found');
  jobPost.likesCount += 1;
  return await jobPost.save();
};

export const unlikeJobPost = async (id) => {
  const jobPost = await JobPost.findByPk(id);
  if (!jobPost) throw new Error('Job post not found');
  jobPost.likesCount = Math.max(0, (jobPost.likesCount || 0) - 1);
  return await jobPost.save();
};

export const commentJobPost = async (id, userId, text, userName) => {
  const jobPost = await JobPost.findByPk(id);
  if (!jobPost) throw new Error('Job post not found');
  
  const comments = jobPost.comments || [];
  comments.push({ userId, userName, text, timestamp: new Date().toISOString() });
  
  jobPost.comments = comments;
  return await jobPost.save();
};

export const shareJobPost = async (id) => {
  const jobPost = await JobPost.findByPk(id);
  if (!jobPost) throw new Error('Job post not found');
  jobPost.sharesCount += 1;
  return await jobPost.save();
};
