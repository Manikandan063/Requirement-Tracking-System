import { Interview, Application } from '../../models/initModels.js';

export const scheduleInterview = async (applicationId, data) => {
  const application = await Application.findByPk(applicationId);
  if (!application) throw new Error('Application not found');

  let interview = await Interview.findOne({ where: { applicationId } });
  if (interview) {
    interview = await interview.update(data);
  } else {
    interview = await Interview.create({ applicationId, ...data });
  }

  await application.update({ status: 'INTERVIEW_SCHEDULED' });

  return interview;
};

export const confirmInterview = async (applicationId, status) => {
  const interview = await Interview.findOne({ where: { applicationId } });
  if (!interview) throw new Error('Interview not found');

  await interview.update({ candidateConfirmation: status });
  if (status === 'CONFIRMED') {
    await Application.update({ status: 'INTERVIEW_CONFIRMED' }, { where: { id: applicationId } });
  }

  return interview;
};

export const updateRoundStatus = async (applicationId, data) => {
  const interview = await Interview.findOne({ where: { applicationId } });
  if (!interview) throw new Error('Interview not found');

  await interview.update(data);
  return interview;
};

export const getInterview = async (applicationId) => {
  const interview = await Interview.findOne({ where: { applicationId } });
  if (!interview) throw new Error('Interview not found');
  return interview;
};
