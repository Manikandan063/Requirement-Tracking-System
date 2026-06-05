import sequelize from '../config/db.js';
import User from '../modules/auth/auth.model.js';
import Company from '../modules/company/company.model.js';
import JobPost from '../modules/jobPost/jobPost.model.js';
import Follow from '../modules/follow/follow.model.js';
import Application from '../modules/application/application.model.js';
import Verification from '../modules/verification/verification.model.js';
import Interview from '../modules/interview/interview.model.js';
import OfferLetter from '../modules/offerLetter/offerLetter.model.js';

const initModels = () => {
  // Company - User
  Company.hasMany(User, { foreignKey: 'companyId' });
  User.belongsTo(Company, { foreignKey: 'companyId' });

  // Company - JobPost
  Company.hasMany(JobPost, { foreignKey: 'companyId' });
  JobPost.belongsTo(Company, { foreignKey: 'companyId' });

  // Company - Application
  Company.hasMany(Application, { foreignKey: 'companyId' });
  Application.belongsTo(Company, { foreignKey: 'companyId' });

  // User(HR) - JobPost
  User.hasMany(JobPost, { foreignKey: 'hrId', as: 'hrJobPosts' });
  JobPost.belongsTo(User, { foreignKey: 'hrId', as: 'hr' });

  // User(JobSeeker) - Application
  User.hasMany(Application, { foreignKey: 'jobSeekerId', as: 'jobSeekerApplications' });
  Application.belongsTo(User, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });

  // User(HR) - Application
  User.hasMany(Application, { foreignKey: 'hrId', as: 'hrApplications' });
  Application.belongsTo(User, { foreignKey: 'hrId', as: 'hr' });

  // JobPost - Application
  JobPost.hasMany(Application, { foreignKey: 'jobPostId' });
  Application.belongsTo(JobPost, { foreignKey: 'jobPostId' });

  // Application - Verification
  Application.hasOne(Verification, { foreignKey: 'applicationId' });
  Verification.belongsTo(Application, { foreignKey: 'applicationId' });

  // Application - Interview
  Application.hasOne(Interview, { foreignKey: 'applicationId' });
  Interview.belongsTo(Application, { foreignKey: 'applicationId' });

  // Application - OfferLetter
  Application.hasOne(OfferLetter, { foreignKey: 'applicationId' });
  OfferLetter.belongsTo(Application, { foreignKey: 'applicationId' });

  // User(JobSeeker) - Follow
  User.hasMany(Follow, { foreignKey: 'jobSeekerId', as: 'userFollows' });
  Follow.belongsTo(User, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });

  // Company - Follow
  Company.hasMany(Follow, { foreignKey: 'companyId', as: 'companyFollowers' });
  Follow.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
};

export {
  sequelize,
  User,
  Company,
  JobPost,
  Follow,
  Application,
  Verification,
  Interview,
  OfferLetter,
  initModels
};
