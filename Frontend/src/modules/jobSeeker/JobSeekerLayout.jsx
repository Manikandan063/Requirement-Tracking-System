import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Briefcase, LogOut, User } from 'lucide-react';

export default function JobSeekerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center px-4 py-2 text-sm transition-all border-b-2 ${
      isActive 
      ? 'border-[#38BDF8] text-white font-bold' 
      : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500 font-medium'
    }`;

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <header className="sticky top-0 z-50 bg-[#0F172A] shadow-lg">
        <div className="w-full px-6 md:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <NavLink to="/home" className="flex items-center gap-2 shrink-0">
                <Briefcase className="h-7 w-7 text-[#38BDF8]" />
                <span className="text-xl font-bold text-white tracking-wide">RTS<span className="font-light">Jobs</span></span>
              </NavLink>
              
              {/* Main Nav */}
              <nav className="hidden md:flex items-center h-full space-x-1">
                <NavLink to="/home" className={navLinkClass}>Home</NavLink>
                <NavLink to="/companies" className={navLinkClass}>Companies</NavLink>
                <NavLink to="/jobs" className={navLinkClass}>Find Jobs</NavLink>
                <NavLink to="/my-applications" className={navLinkClass}>My Applications</NavLink>
                <NavLink to="/interviews" className={navLinkClass}>Interviews</NavLink>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex items-center gap-3 text-slate-300 relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800">Notifications</h3>
                      <span className="text-xs text-[#0A66C2] cursor-pointer hover:underline font-medium">Mark all as read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <NavLink to="/my-applications" onClick={() => setShowNotifications(false)} className="block p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors text-left">
                        <p className="text-sm text-slate-800 font-medium">Your application for <span className="font-bold text-[#0A66C2]">Frontend Developer</span> has been viewed.</p>
                        <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                      </NavLink>
                      <NavLink to="/interviews" onClick={() => setShowNotifications(false)} className="block p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors text-left">
                        <p className="text-sm text-slate-800 font-medium">You have a new interview scheduled for tomorrow.</p>
                        <p className="text-xs text-slate-400 mt-1">1 day ago</p>
                      </NavLink>
                    </div>
                    <div className="p-3 text-center border-t border-slate-100 bg-slate-50">
                      <NavLink to="/my-applications" onClick={() => setShowNotifications(false)} className="text-sm text-[#0A66C2] font-semibold hover:underline">View all activity</NavLink>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-px h-6 bg-slate-700 hidden sm:block"></div>
              
              <div className="flex items-center gap-4">
                <NavLink to="/profile" className="flex items-center gap-2 group">
                  <div className="h-8 w-8 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white group-hover:ring-2 ring-[#38BDF8] transition-all">
                    {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                  </div>
                  <div className="hidden lg:block text-left">
                     <p className="text-sm font-semibold text-white leading-tight">{user?.name || 'Profile'}</p>
                  </div>
                </NavLink>
                <button 
                  onClick={handleLogout} 
                  className="p-2 text-slate-400 hover:text-[#38BDF8] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}