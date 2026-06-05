import { z } from 'zod';

export const searchVerificationSchema = z.object({
  candidateEmail: z.string().email('Invalid email'),
  jobCategory: z.enum(['IT', 'NON_IT']),
});
