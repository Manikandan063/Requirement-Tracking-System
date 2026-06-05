import { z } from 'zod';

export const createHrSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is required'),
  department: z.string().optional(),
});
