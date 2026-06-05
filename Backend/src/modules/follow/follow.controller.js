import * as followService from './follow.service.js';

export const followCompany = async (req, res, next) => {
  try {
    await followService.followCompany(req.user.id, req.params.companyId);
    res.status(201).json({ success: true, message: 'Followed successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

export const unfollowCompany = async (req, res, next) => {
  try {
    await followService.unfollowCompany(req.user.id, req.params.companyId);
    res.status(200).json({ success: true, message: 'Unfollowed successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

export const getMyFollowedCompanies = async (req, res, next) => {
  try {
    const companies = await followService.getMyFollowedCompanies(req.user.id);
    res.status(200).json({ success: true, message: 'Followed companies fetched', data: companies });
  } catch (error) {
    next(error);
  }
};
