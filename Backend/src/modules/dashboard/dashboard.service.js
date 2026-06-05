import { User, Company, JobPost, Application, Follow, Interview } from '../../models/initModels.js';

export const getSuperAdminDashboard = async () => {
  const companiesCount = await Company.count();
  const usersCount = await User.count();
  return { companiesCount, usersCount };
};

export const getCompanyAdminDashboard = async (companyId) => {
  const hrCount = await User.count({ where: { companyId, role: 'HR' } });
  const jobPostsCount = await JobPost.count({ where: { companyId } });
  
  const pendingVerifications = await Application.findAll({
    where: { companyId, status: 'SENT_TO_ADMIN' },
    include: [
      { model: JobPost, attributes: ['title'] },
      { model: Interview }
    ],
    order: [['updatedAt', 'DESC']]
  });

  const resolvedCandidates = await Application.findAll({
    where: { companyId, status: ['ADMIN_VERIFIED', 'REJECTED', 'OFFER_LETTER_SENT'] },
    include: [
      { model: JobPost, attributes: ['title'] },
      { model: Interview }
    ],
    order: [['updatedAt', 'DESC']]
  });

  return { hrCount, jobPostsCount, pendingVerifications, resolvedCandidates };
};

export const getHrDashboard = async (hrId, companyId) => {
  const jobPostsCount = await JobPost.count({ where: { hrId } });
  const applicationsCount = await Application.count({ where: { hrId } });
  const recentFollowers = await Follow.findAll({
    where: { companyId },
    include: [{ model: User, as: 'jobSeeker', attributes: ['id', 'name', 'email', 'phoneNumber'] }],
    order: [['createdAt', 'DESC']],
    limit: 5
  });

  const adminApproved = await Application.findAll({
    where: { hrId, status: 'ADMIN_VERIFIED' },
    include: [
      { model: User, as: 'jobSeeker', attributes: ['name'] },
      { model: JobPost, attributes: ['title'] }
    ],
    order: [['updatedAt', 'DESC']]
  });

  return { jobPostsCount, applicationsCount, recentFollowers, adminApproved };
};

export const getJobSeekerDashboard = async (jobSeekerId) => {
  const applicationsCount = await Application.count({ where: { jobSeekerId } });
  const followsCount = await Follow.count({ where: { jobSeekerId } });
  
  const interviewsCount = await Application.count({
    where: { jobSeekerId, status: ['INTERVIEW_SCHEDULED', 'INTERVIEW_CONFIRMED'] }
  });
  
  const offerLettersCount = await Application.count({
    where: { jobSeekerId, status: 'OFFER_LETTER_SENT' }
  });

  const follows = await Follow.findAll({ where: { jobSeekerId } });
  const followedCompanyIds = follows.map(f => f.companyId);

  let recentJobs = [];
  if (followedCompanyIds.length > 0) {
    recentJobs = await JobPost.findAll({
      where: { companyId: followedCompanyIds, status: 'ACTIVE' },
      include: [{ model: Company, attributes: ['companyName'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });
  }

  return { applicationsCount, followsCount, interviewsCount, offerLettersCount, recentJobs };
};
