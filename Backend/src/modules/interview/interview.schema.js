import { z } from 'zod';

export const scheduleInterviewSchema = z.object({
  interviewDate: z.string(),
  interviewTime: z.string(),
  interviewFormat: z.enum(['ONLINE', 'WALKIN']).optional(),
  meetingLink: z.string().optional(),
});
