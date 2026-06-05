import { z } from 'zod';

export const createCompanySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyEmail: z.string().email('Invalid email'),
  companyPhone: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
  description: z.string().optional(),
});
