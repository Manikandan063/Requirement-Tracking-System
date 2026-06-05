import { Application, JobPost, Company, Interview, Verification } from '../../models/initModels.js';

export const applyForJob = async (jobSeekerId, jobPostId, data) => {
  const jobPost = await JobPost.findByPk(jobPostId);
  if (!jobPost) throw new Error('Job post not found');

  const existingApp = await Application.findOne({ where: { jobSeekerId, jobPostId } });
  if (existingApp) throw new Error('Already applied for this job');

  return await Application.create({
    ...data,
    jobSeekerId,
    jobPostId,
    companyId: jobPost.companyId,
    hrId: jobPost.hrId
  });
};

export const getMyApplications = async (jobSeekerId) => {
  return await Application.findAll({ 
    where: { jobSeekerId }, 
    include: [
      { model: JobPost, include: [Company] },
      Interview
    ] 
  });
};

export const getApplicationsByJob = async (jobPostId, hrId) => {
  const jobPost = await JobPost.findOne({ where: { id: jobPostId, hrId } });
  if (!jobPost) throw new Error('Job post not found or unauthorized');

  return await Application.findAll({ 
    where: { jobPostId },
    include: [Verification, Interview]
  });
};

export const getApplicationById = async (id) => {
  const application = await Application.findByPk(id);
  if (!application) throw new Error('Application not found');
  return application;
};

export const updateApplicationStatus = async (id, status) => {
  const application = await Application.findByPk(id);
  if (!application) throw new Error('Application not found');
  return await application.update({ status });
};
