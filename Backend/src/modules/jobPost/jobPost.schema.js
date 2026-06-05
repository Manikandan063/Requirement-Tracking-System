import { z } from 'zod';

export const createJobPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  skills: z.string().optional(),
  experience: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  jobType: z.string().optional(),
  category: z.enum(['IT', 'NON_IT']),
});
