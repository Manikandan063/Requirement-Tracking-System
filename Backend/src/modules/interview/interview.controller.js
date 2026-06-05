import * as interviewService from './interview.service.js';
import { scheduleInterviewSchema } from './interview.schema.js';

export const scheduleInterview = async (req, res, next) => {
  try {
    const data = scheduleInterviewSchema.parse(req.body);
    const interview = await interviewService.scheduleInterview(req.params.applicationId, data);
    res.status(200).json({ success: true, message: 'Interview scheduled', data: interview });
  } catch (error) {
    next(error);
  }
};

export const confirmInterview = async (req, res, next) => {
  try {
    const interview = await interviewService.confirmInterview(req.params.applicationId, req.body.status);
    res.status(200).json({ success: true, message: 'Interview confirmed', data: interview });
  } catch (error) {
    next(error);
  }
};

export const updateRoundStatus = async (req, res, next) => {
  try {
    const interview = await interviewService.updateRoundStatus(req.params.applicationId, req.body);
    res.status(200).json({ success: true, message: 'Round status updated', data: interview });
  } catch (error) {
    next(error);
  }
};

export const getInterview = async (req, res, next) => {
  try {
    const interview = await interviewService.getInterview(req.params.applicationId);
    res.status(200).json({ success: true, message: 'Interview fetched', data: interview });
  } catch (error) {
    next(error);
  }
};
