import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Briefcase, LogOut, User, Menu, X } from 'lucide-react';

export default function JobSeekerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const defaultNotifications = [
    {
      id: 1,
      link: '/my-applications',
      title: 'Your application for Frontend Developer has been viewed.',
      time: '2 hours ago'
    },
    {
      id: 2,
      link: '/interviews',
      title: 'You have a new interview scheduled for tomorrow.',
      time: '1 day ago'
    }
  ];

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(`notifications_${user?.id || 'guest'}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultNotifications;
  });

  const hasUnread = notifications.length > 0;

  const handleMarkAllRead = () => {
    setNotifications([]);
    localStorage.setItem(`notifications_${user?.id || 'guest'}`, JSON.stringify([]));
  };

  const handleNotificationClick = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem(`notifications_${user?.id || 'guest'}`, JSON.stringify(updated));
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center px-4 py-2 text-sm transition-all border-b-2 md:border-b-2 ${
      isActive 
      ? 'border-[#38BDF8] text-white font-bold' 
      : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500 font-medium'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-base transition-all rounded-xl ${
      isActive 
      ? 'bg-[#38BDF8]/10 text-[#38BDF8] font-bold' 
      : 'text-slate-400 hover:text-white hover:bg-slate-800 font-medium'
    }`;

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <header className="sticky top-0 z-50 bg-[#0F172A] shadow-lg">
        <div className="w-full px-6 md:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                className="md:hidden text-slate-300 hover:text-[#38BDF8] p-1 -ml-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <NavLink to="/home" className="flex items-center gap-2 shrink-0">
                <Briefcase className="h-7 w-7 text-[#38BDF8]" />
                <span className="text-xl font-bold text-white tracking-wide hidden sm:inline">RTS<span className="font-light">Jobs</span></span>
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
                  {hasUnread && (
                    <span className="absolute top-1.5 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800">Notifications</h3>
                      <span 
                        onClick={handleMarkAllRead}
                        className="text-xs text-[#0A66C2] cursor-pointer hover:underline font-medium"
                      >
                        Clear all
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 font-medium">
                          No new notifications.
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <NavLink 
                            key={notification.id}
                            to={notification.link} 
                            onClick={() => handleNotificationClick(notification.id)} 
                            className="block p-4 border-b border-slate-50 cursor-pointer transition-colors text-left relative bg-blue-50/50 hover:bg-blue-50"
                          >
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#0A66C2] rounded-full"></div>
                            <p className="text-sm text-slate-900 font-medium ml-1" dangerouslySetInnerHTML={{ __html: notification.title.replace('Frontend Developer', '<span class="font-bold text-[#0A66C2]">Frontend Developer</span>') }}></p>
                            <p className="text-xs text-slate-400 mt-1 ml-1">{notification.time}</p>
                          </NavLink>
                        ))
                      )}
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
                  onClick={() => setShowLogoutModal(true)} 
                  className="p-2 text-slate-400 hover:text-[#38BDF8] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <nav className="md:hidden bg-[#0F172A] border-t border-slate-800 px-4 py-4 flex flex-col gap-2 shadow-2xl absolute w-full left-0 z-40">
            <NavLink to="/home" onClick={() => setShowMobileMenu(false)} className={mobileNavLinkClass}>Home</NavLink>
            <NavLink to="/companies" onClick={() => setShowMobileMenu(false)} className={mobileNavLinkClass}>Companies</NavLink>
            <NavLink to="/jobs" onClick={() => setShowMobileMenu(false)} className={mobileNavLinkClass}>Find Jobs</NavLink>
            <NavLink to="/my-applications" onClick={() => setShowMobileMenu(false)} className={mobileNavLinkClass}>My Applications</NavLink>
            <NavLink to="/interviews" onClick={() => setShowMobileMenu(false)} className={mobileNavLinkClass}>Interviews</NavLink>
          </nav>
        )}
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-slate-100 text-center animate-scale-up">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-10 h-10 ml-2" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Leaving so soon?</h3>
            <p className="text-slate-500 font-medium mb-8">
              Are you sure you want to log out? You might miss out on your next big opportunity!
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-[#38BDF8] hover:bg-[#0284c7] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98]"
              >
                Just Kidding!
              </button>
              <button 
                onClick={handleLogout}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
              >
                Yes, Log Me Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}