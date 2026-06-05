import * as companyService from './company.service.js';
import { createCompanySchema } from './company.schema.js';

export const createCompany = async (req, res, next) => {
  try {
    const data = createCompanySchema.parse(req.body);
    const company = await companyService.createCompany(data);
    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error) {
    next(error);
  }
};

export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json({ success: true, message: 'Companies fetched', data: companies });
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json({ success: true, message: 'Company fetched', data: company });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Company updated', data: company });
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(200).json({ success: true, message: 'Company deleted', data: {} });
  } catch (error) {
    next(error);
  }
};

export const registerCompany = async (req, res, next) => {
  try {
    const result = await companyService.registerCompany(req.body);
    res.status(201).json({ success: true, message: 'Company registered', data: result });
  } catch (error) {
    next(error);
  }
};
