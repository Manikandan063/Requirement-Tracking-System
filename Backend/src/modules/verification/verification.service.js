import { Verification, Application } from '../../models/initModels.js';

export const searchVerification = async (applicationId, data) => {
  const application = await Application.findByPk(applicationId);
  if (!application) throw new Error('Application not found');

  let sources = [];
  if (data.jobCategory === 'IT') {
    sources = [
      { platformName: 'LinkedIn', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: 'All-Star Profile' },
      { platformName: 'GitHub', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: '1,240 Contributions' },
      { platformName: 'LeetCode', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: 'Top 15%' },
      { platformName: 'Coding Ninjas', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING', performanceLevel: 'N/A' },
      { platformName: 'HackerRank', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: '5 Star Gold' }
    ];
  } else {
    sources = [
      { platformName: 'LinkedIn', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: 'All-Star Profile' },
      { platformName: 'Certifications', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Valid', status: 'PENDING', performanceLevel: 'Advanced Level' },
      { platformName: 'Internships', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: 'High Ratings' },
      { platformName: 'Workshops', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING', performanceLevel: 'N/A' },
      { platformName: 'Competitions', profileFound: false, profileUrl: null, verificationNote: 'Not Found', status: 'PENDING', performanceLevel: 'N/A' },
      { platformName: 'Portfolio', profileFound: true, profileUrl: 'dummy_url', verificationNote: 'Matched', status: 'PENDING', performanceLevel: 'Excellent' }
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
