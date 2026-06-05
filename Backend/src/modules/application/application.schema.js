import { z } from 'zod';

export const createApplicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  education: z.string().min(1, 'Education is required'),
  skills: z.string().min(1, 'Skills are required'),
  experience: z.string().optional(),
  resumeUrl: z.string().url('Invalid URL').optional(),
});
