import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Building2, Users, UserCheck, LogOut, ChevronDown, User, Shield, Sun, Moon, Monitor, Menu } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dropdownRef = useRef(null);
  const themeRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinkClass = (path) => {
    const isActive = location.pathname.includes(path);
    return `flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3.5 rounded-xl transition-all font-bold ${
      isActive 
      ? 'bg-orange-50 text-orange-600 border border-orange-100 shadow-sm dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-500' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:translate-x-1 border border-transparent dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
    }`;
  };

  return (
    <div className="flex h-screen bg-[#FFF7ED] dark:bg-slate-950 font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:translate-x-0 md:w-24'} absolute md:relative h-full bg-white dark:bg-slate-900 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none z-50 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out`}>
        <div className="h-24 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className={`flex items-center ${isSidebarOpen ? 'gap-4 px-8' : 'justify-center'} relative z-10 w-full transition-all duration-300`}>
            <div 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-12 h-12 shrink-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-105 transition-transform group"
              title="Toggle Sidebar"
            >
              <Shield className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
              <span className="block text-xl font-black text-slate-800 dark:text-white tracking-tight whitespace-nowrap">ADMIN <span className="text-orange-500">PRO</span></span>
              <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 whitespace-nowrap">Control Center</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-8 px-4">
          <p className={`text-xs font-black text-slate-400 uppercase tracking-widest mb-4 transition-all duration-300 ${isSidebarOpen ? 'px-4 opacity-100 text-left' : 'opacity-0 h-0 mb-0 overflow-hidden'}`}>Navigation</p>
          <nav className="flex flex-col gap-2">
            <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')} title="Dashboard">
              <LayoutDashboard className="w-5 h-5 shrink-0"/> <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0 ml-0'}`}>Dashboard</span>
            </Link>
            <Link to="/admin/company" className={navLinkClass('/admin/company')} title="Company Profile">
              <Building2 className="w-5 h-5 shrink-0"/> <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0 ml-0'}`}>Company Profile</span>
            </Link>
            <Link to="/admin/hrs" className={navLinkClass('/admin/hrs')} title="HR Management">
              <Users className="w-5 h-5 shrink-0"/> <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0 ml-0'}`}>HR Management</span>
            </Link>
            <Link to="/admin/candidates" className={navLinkClass('/admin/candidates')} title="Candidates">
              <UserCheck className="w-5 h-5 shrink-0"/> <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0 ml-0'}`}>Candidates</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center justify-center gap-3 py-3.5 rounded-xl w-full text-slate-500 hover:bg-white hover:text-red-500 hover:shadow-sm dark:hover:bg-slate-800 dark:hover:text-red-400 transition-all font-bold border border-slate-200 dark:border-slate-700 hover:border-red-100 dark:hover:border-red-900/30" title="Secure Logout">
            <LogOut className="w-5 h-5 shrink-0"/> <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>Secure Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex items-center px-6 md:px-8 justify-between sticky top-0 z-10 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
             <button className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </button>
             <h2 className="text-xl font-black text-slate-800 dark:text-white hidden sm:block">Admin Workspace</h2>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end hidden sm:flex">
               <span className="text-sm font-bold text-slate-800 dark:text-white">{user?.name || 'Administrator'}</span>
               <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{user?.role?.replace('_', ' ') || 'SYSTEM ADMIN'}</span>
             </div>
             
             <div className="relative" ref={themeRef}>
               <button 
                 onClick={() => setIsThemeOpen(!isThemeOpen)}
                 className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                 title="Theme settings"
               >
                 {theme === 'light' && <Sun className="w-5 h-5" />}
                 {theme === 'dark' && <Moon className="w-5 h-5" />}
                 {theme === 'system' && <Monitor className="w-5 h-5" />}
               </button>

               {isThemeOpen && (
                 <div className="absolute right-0 top-full mt-3 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-4 duration-200 origin-top-right z-50">
                   <button onClick={() => { setTheme('light'); setIsThemeOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-bold transition-colors ${theme === 'light' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                     <Sun className="w-4 h-4" /> Light
                   </button>
                   <button onClick={() => { setTheme('dark'); setIsThemeOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                     <Moon className="w-4 h-4" /> Dark
                   </button>
                   <button onClick={() => { setTheme('system'); setIsThemeOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-bold transition-colors ${theme === 'system' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                     <Monitor className="w-4 h-4" /> System
                   </button>
                 </div>
               )}
             </div>

             <div className="relative" ref={dropdownRef}>
               <button 
                 onClick={() => setIsProfileOpen(!isProfileOpen)}
                 className="flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-slate-800 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-orange-200 dark:hover:border-slate-700 group bg-white dark:bg-slate-900 shadow-sm dark:shadow-none"
               >
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                   {user?.name?.charAt(0).toUpperCase() || 'A'}
                 </div>
                 <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
               </button>

               {isProfileOpen && (
                 <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-4 duration-200 origin-top-right z-50">
                   <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700 mb-2 sm:hidden">
                     <p className="text-sm font-bold text-slate-800 dark:text-white">{user?.name || 'Administrator'}</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                   </div>
                   <div className="px-2">
                     <Link 
                       to="/admin/company" 
                       onClick={() => setIsProfileOpen(false)}
                       className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-white rounded-xl transition-colors font-bold"
                     >
                       <User className="w-4 h-4" /> Profile Settings
                     </Link>
                     <button 
                       onClick={() => { setIsProfileOpen(false); logout(); navigate('/login'); }}
                       className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-xl transition-colors font-bold mt-1"
                     >
                       <LogOut className="w-4 h-4" /> Logout
                     </button>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}