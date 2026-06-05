import * as dashboardService from './dashboard.service.js';

export const getSuperAdminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getSuperAdminDashboard();
    res.status(200).json({ success: true, message: 'Dashboard fetched', data });
  } catch (error) {
    next(error);
  }
};

export const getCompanyAdminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getCompanyAdminDashboard(req.user.companyId);
    res.status(200).json({ success: true, message: 'Dashboard fetched', data });
  } catch (error) {
    next(error);
  }
};

export const getHrDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getHrDashboard(req.user.id, req.user.companyId);
    res.status(200).json({ success: true, message: 'Dashboard fetched', data });
  } catch (error) {
    next(error);
  }
};

export const getJobSeekerDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getJobSeekerDashboard(req.user.id);
    res.status(200).json({ success: true, message: 'Dashboard fetched', data });
  } catch (error) {
    next(error);
  }
};
