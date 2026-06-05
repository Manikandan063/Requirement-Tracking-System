import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../modules/auth/Login';
import RegisterAccount from '../modules/auth/RegisterAccount';
import RegisterCompany from '../modules/auth/RegisterCompany';

// ADMIN
import AdminLayout from '../modules/admin/AdminLayout';
import AdminDashboard from '../modules/admin/AdminDashboard';
import AdminCompanyProfile from '../modules/admin/AdminCompanyProfile';
import AdminHRManagement from '../modules/admin/AdminHRManagement';
import AdminCandidateManagement from '../modules/admin/AdminCandidateManagement';

// HR
import HRLayout from '../modules/hr/HRLayout';
import HRDashboard from '../modules/hr/HRDashboard';
import CreateJobPost from '../modules/hr/CreateJobPost';
import ManageJobs from '../modules/hr/ManageJobs';
import Applicants from '../modules/hr/Applicants';
import CandidateProfile from '../modules/hr/CandidateProfile';
import Verification from '../modules/hr/Verification';
import InterviewTracking from '../modules/hr/InterviewTracking';
import OfferLetter from '../modules/hr/OfferLetter';

// JOB SEEKER
import JobSeekerLayout from '../modules/jobSeeker/JobSeekerLayout';
import JobSeekerHome from '../modules/jobSeeker/JobSeekerHome';
import Jobs from '../modules/jobSeeker/Jobs';
import ApplyJob from '../modules/jobSeeker/ApplyJob';
import MyApplications from '../modules/jobSeeker/MyApplications';
import InterviewStatus from '../modules/jobSeeker/InterviewStatus';
import Profile from '../modules/jobSeeker/Profile';
import JobSeekerCompanies from '../modules/jobSeeker/Companies';

import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleBasedRoute from '../components/common/RoleBasedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-account" element={<RegisterAccount />} />
      <Route path="/register-company" element={<RegisterCompany />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute><RoleBasedRoute allowedRoles={['ADMIN', 'COMPANY_ADMIN', 'SUPER_ADMIN']}><AdminLayout /></RoleBasedRoute></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/company" element={<AdminCompanyProfile />} />
        <Route path="/admin/hrs" element={<AdminHRManagement />} />
        <Route path="/admin/candidates" element={<AdminCandidateManagement />} />
      </Route>

      {/* HR ROUTES */}
      <Route element={<ProtectedRoute><RoleBasedRoute allowedRoles={['HR']}><HRLayout /></RoleBasedRoute></ProtectedRoute>}>
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/create-job" element={<CreateJobPost />} />
        <Route path="/hr/jobs" element={<ManageJobs />} />
        <Route path="/hr/jobs/:jobPostId/applicants" element={<Applicants />} />
        <Route path="/hr/candidate/:applicationId" element={<CandidateProfile />} />
        <Route path="/hr/verification/:applicationId" element={<Verification />} />
        <Route path="/hr/interview/:applicationId" element={<InterviewTracking />} />
        <Route path="/hr/offer-letter/:applicationId" element={<OfferLetter />} />
      </Route>

      {/* JOB SEEKER ROUTES */}
      <Route element={<ProtectedRoute><RoleBasedRoute allowedRoles={['JOB_SEEKER']}><JobSeekerLayout /></RoleBasedRoute></ProtectedRoute>}>
        <Route path="/home" element={<JobSeekerHome />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobPostId/apply" element={<ApplyJob />} />
        <Route path="/companies" element={<JobSeekerCompanies />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/interviews" element={<InterviewStatus />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;