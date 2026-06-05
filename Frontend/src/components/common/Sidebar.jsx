import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { Home, Briefcase, Users, Building, LogOut, CheckCircle, FileText } from 'lucide-react';

const roleLinks = {
  SUPER_ADMIN: [
    { name: 'Dashboard', path: '/super-admin/dashboard', icon: Home },
    { name: 'Companies', path: '/super-admin/companies', icon: Building },
    { name: 'Admins', path: '/super-admin/company-admins', icon: Users },
  ],
  COMPANY_ADMIN: [
    { name: 'Dashboard', path: '/company-admin/dashboard', icon: Home },
    { name: 'HR Management', path: '/company-admin/hrs', icon: Users },
    { name: 'Candidates', path: '/company-admin/candidates', icon: CheckCircle },
  ],
  HR: [
    { name: 'Dashboard', path: '/hr/dashboard', icon: Home },
    { name: 'Create Job', path: '/hr/create-job', icon: Briefcase },
    { name: 'Manage Jobs', path: '/hr/jobs', icon: FileText },
  ],
  JOB_SEEKER: [
    { name: 'Dashboard', path: '/job-seeker/dashboard', icon: Home },
    { name: 'Companies', path: '/job-seeker/companies', icon: Building },
    { name: 'Find Jobs', path: '/job-seeker/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/job-seeker/applications', icon: FileText },
    { name: 'Interviews', path: '/job-seeker/interviews', icon: CheckCircle },
    { name: 'Profile', path: '/job-seeker/profile', icon: Users },
  ],
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const links = roleLinks[user?.role] || [];

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-white shadow-xl">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-primary">RTS Portal</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800',
                  isActive ? 'bg-slate-800 text-primary' : 'text-slate-300'
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
