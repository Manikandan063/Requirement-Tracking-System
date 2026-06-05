import * as offerLetterService from './offerLetter.service.js';
import { sendOfferLetterSchema } from './offerLetter.schema.js';

export const sendOfferLetter = async (req, res, next) => {
  try {
    const data = sendOfferLetterSchema.parse(req.body);
    const offerLetter = await offerLetterService.sendOfferLetter(req.params.applicationId, req.user.id, data);
    res.status(201).json({ success: true, message: 'Offer letter sent', data: offerLetter });
  } catch (error) {
    next(error);
  }
};

export const getOfferLetter = async (req, res, next) => {
  try {
    const offerLetter = await offerLetterService.getOfferLetter(req.params.applicationId);
    res.status(200).json({ success: true, message: 'Offer letter fetched', data: offerLetter });
  } catch (error) {
    next(error);
  }
};
