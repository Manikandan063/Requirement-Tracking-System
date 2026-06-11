import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
  bio: z.string().optional(),
});
