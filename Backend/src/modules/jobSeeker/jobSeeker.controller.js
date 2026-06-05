import * as jobSeekerService from './jobSeeker.service.js';
import { updateProfileSchema } from './jobSeeker.schema.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await jobSeekerService.getProfile(req.user.id);
    res.status(200).json({ success: true, message: 'Profile fetched', data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const profile = await jobSeekerService.updateProfile(req.user.id, data);
    res.status(200).json({ success: true, message: 'Profile updated', data: { id: profile.id } });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await jobSeekerService.getDashboard(req.user.id);
    res.status(200).json({ success: true, message: 'Dashboard fetched', data: dashboard });
  } catch (error) {
    next(error);
  }
};
