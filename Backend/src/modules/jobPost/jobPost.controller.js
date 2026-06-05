import * as jobPostService from './jobPost.service.js';
import { createJobPostSchema } from './jobPost.schema.js';

export const createJobPost = async (req, res, next) => {
  try {
    const data = createJobPostSchema.parse(req.body);
    const jobPost = await jobPostService.createJobPost(data, req.user.id, req.user.companyId);
    res.status(201).json({ success: true, message: 'Job post created', data: jobPost });
  } catch (error) {
    next(error);
  }
};

export const getAllJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await jobPostService.getAllJobPosts();
    res.status(200).json({ success: true, message: 'Job posts fetched', data: jobPosts });
  } catch (error) {
    next(error);
  }
};

export const getJobPostById = async (req, res, next) => {
  try {
    const jobPost = await jobPostService.getJobPostById(req.params.id);
    res.status(200).json({ success: true, message: 'Job post fetched', data: jobPost });
  } catch (error) {
    next(error);
  }
};

export const getJobPostsByCompany = async (req, res, next) => {
  try {
    const jobPosts = await jobPostService.getJobPostsByCompany(req.params.companyId);
    res.status(200).json({ success: true, message: 'Job posts fetched', data: jobPosts });
  } catch (error) {
    next(error);
  }
};

export const updateJobPost = async (req, res, next) => {
  try {
    const jobPost = await jobPostService.updateJobPost(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, message: 'Job post updated', data: jobPost });
  } catch (error) {
    next(error);
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    await jobPostService.deleteJobPost(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Job post deleted', data: {} });
  } catch (error) {
    next(error);
  }
};
