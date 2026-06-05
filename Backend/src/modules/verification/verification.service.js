import { Verification, Application } from '../../models/initModels.js';

export const searchVerification = async (applicationId, data) => {
  const application = await Application.findByPk(applicationId);
  if (!application) throw new Error('Application not found');

  let sources = [];
  if (data.jobCategory === 'IT') {
    sources = [
      { platformName: 'LinkedIn', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' },
      { platformName: 'GitHub', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' },
      { platformName: 'LeetCode', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' },
      { platformName: 'Coding Ninjas', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING' },
      { platformName: 'HackerRank', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' }
    ];
  } else {
    sources = [
      { platformName: 'LinkedIn', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' },
      { platformName: 'Certifications', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Valid', status: 'PENDING' },
      { platformName: 'Internships', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' },
      { platformName: 'Workshops', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING' },
      { platformName: 'Competitions', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING' },
      { platformName: 'Portfolio', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING' }
    ];
  }

  let verification = await Verification.findOne({ where: { applicationId } });
  if (verification) {
    verification = await verification.update({ candidateEmail: data.candidateEmail, jobCategory: data.jobCategory, verificationSources: sources });
  } else {
    verification = await Verification.create({
      applicationId,
      candidateEmail: data.candidateEmail,
      jobCategory: data.jobCategory,
      verificationSources: sources
    });
  }

  return verification;
};

export const verifyCandidate = async (applicationId, status, remarks) => {
  const verification = await Verification.findOne({ where: { applicationId } });
  if (!verification) throw new Error('Verification not found');
  
  return await verification.update({ verificationStatus: status, remarks });
};

export const getVerification = async (applicationId) => {
  const verification = await Verification.findOne({ where: { applicationId } });
  if (!verification) throw new Error('Verification not found');
  return verification;
};
