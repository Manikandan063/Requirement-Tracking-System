import * as verificationService from './verification.service.js';
import { searchVerificationSchema } from './verification.schema.js';

export const searchVerification = async (req, res, next) => {
  try {
    const data = searchVerificationSchema.parse(req.body);
    const verification = await verificationService.searchVerification(req.params.applicationId, data);
    res.status(200).json({ success: true, message: 'Verification sources generated', data: verification });
  } catch (error) {
    next(error);
  }
};

export const verifyCandidate = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const verification = await verificationService.verifyCandidate(req.params.applicationId, status, remarks);
    res.status(200).json({ success: true, message: 'Candidate verified', data: verification });
  } catch (error) {
    next(error);
  }
};

export const getVerification = async (req, res, next) => {
  try {
    const verification = await verificationService.getVerification(req.params.applicationId);
    res.status(200).json({ success: true, message: 'Verification fetched', data: verification });
  } catch (error) {
    next(error);
  }
};
