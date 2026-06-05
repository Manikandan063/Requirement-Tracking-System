import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Building2, Users, Briefcase, UserCheck, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#FFF7ED] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F172A] text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-black text-[#F97316]">ADMIN PORTAL</span>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><LayoutDashboard className="w-5 h-5"/> Dashboard</Link>
          <Link to="/admin/company" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Building2 className="w-5 h-5"/> Company Profile</Link>
          <Link to="/admin/hrs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Users className="w-5 h-5"/> HR Management</Link>
          <Link to="/admin/candidates" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><UserCheck className="w-5 h-5"/> Candidates</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <LogOut className="w-5 h-5"/> Logout
          </button>
        </div>
      </div>
      
      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-orange-100 flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-lg font-bold text-[#0F172A]">Company Workspace</h2>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}