import * as hrService from './hr.service.js';
import { createHrSchema } from './hr.schema.js';

export const createHr = async (req, res, next) => {
  try {
    const data = createHrSchema.parse(req.body);
    const hr = await hrService.createHr(data, req.user.companyId);
    res.status(201).json({ success: true, message: 'HR created', data: { id: hr.id } });
  } catch (error) {
    next(error);
  }
};

export const getHrs = async (req, res, next) => {
  try {
    const hrs = await hrService.getHrsByCompany(req.user.companyId);
    res.status(200).json({ success: true, message: 'HRs fetched', data: hrs });
  } catch (error) {
    next(error);
  }
};

export const updateHr = async (req, res, next) => {
  try {
    const hr = await hrService.updateHr(req.params.id, req.body, req.user.companyId);
    res.status(200).json({ success: true, message: 'HR updated', data: { id: hr.id } });
  } catch (error) {
    next(error);
  }
};

export const deleteHr = async (req, res, next) => {
  try {
    await hrService.deleteHr(req.params.id, req.user.companyId);
    res.status(200).json({ success: true, message: 'HR deleted', data: {} });
  } catch (error) {
    next(error);
  }
};
