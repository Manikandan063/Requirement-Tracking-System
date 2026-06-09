import * as applicationService from './application.service.js';
import { createApplicationSchema } from './application.schema.js';

export const applyForJob = async (req, res, next) => {
  try {
    const data = createApplicationSchema.parse(req.body);
    const application = await applicationService.applyForJob(req.user.id, req.params.jobPostId, data);
    res.status(201).json({ success: true, message: 'Applied successfully', data: { id: application.id } });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getMyApplications(req.user.id);
    res.status(200).json({ success: true, message: 'Applications fetched', data: applications });
  } catch (error) {
    next(error);
  }
};

export const getApplicationsByJob = async (req, res, next) => {
  try {
    const applications = await applicationService.getApplicationsByJob(req.params.jobPostId, req.user.id);
    res.status(200).json({ success: true, message: 'Applications fetched', data: applications });
  } catch (error) {
    next(error);
  }
};

export const getAllHrApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getAllHrApplications(req.user.id);
    res.status(200).json({ success: true, message: 'Applications fetched', data: applications });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    res.status(200).json({ success: true, message: 'Application fetched', data: application });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await applicationService.updateApplicationStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, message: 'Application status updated', data: application });
  } catch (error) {
    next(error);
  }
};
