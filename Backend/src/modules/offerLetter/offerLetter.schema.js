import { z } from 'zod';

export const sendOfferLetterSchema = z.object({
  offerLetterUrl: z.string().url('Invalid URL').optional(),
});
