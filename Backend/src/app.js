import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes imports
import authRoutes from './modules/auth/auth.routes.js';
import companyRoutes from './modules/company/company.routes.js';
import companyAdminRoutes from './modules/companyAdmin/companyAdmin.routes.js';
import hrRoutes from './modules/hr/hr.routes.js';
import jobSeekerRoutes from './modules/jobSeeker/jobSeeker.routes.js';
import jobPostRoutes from './modules/jobPost/jobPost.routes.js';
import followRoutes from './modules/follow/follow.routes.js';
import applicationRoutes from './modules/application/application.routes.js';
import verificationRoutes from './modules/verification/verification.routes.js';
import interviewRoutes from './modules/interview/interview.routes.js';
import offerLetterRoutes from './modules/offerLetter/offerLetter.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

import { errorHandler } from './shared/errorHandling/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/company-admins', companyAdminRoutes);
app.use('/api/admin', companyAdminRoutes);
app.use('/api/hrs', hrRoutes);
app.use('/api/job-seekers', jobSeekerRoutes);
app.use('/api/job-posts', jobPostRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/offer-letters', offerLetterRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
// Trigger nodemon restart 3
