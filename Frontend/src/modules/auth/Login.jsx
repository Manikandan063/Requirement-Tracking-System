import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Briefcase } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (['ADMIN', 'COMPANY_ADMIN', 'SUPER_ADMIN'].includes(user.role)) navigate('/admin/dashboard');
      else if (user.role === 'HR') navigate('/hr/dashboard');
      else navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] text-white p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
             <Briefcase className="w-10 h-10 text-[#F97316]" />
             <span className="text-3xl font-bold tracking-tight">RTS Platform</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-6">
            Find Talent.<br/>
            Track Hiring.<br/>
            <span className="text-[#F97316]">Build Careers.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-md leading-relaxed">
            The all-in-one modern recruitment platform for fast-growing companies and top-tier professionals.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-8 text-center">Sign in to your account to continue</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F97316] outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F97316] outline-none" required />
            </div>
            <Button type="submit" className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all">Sign In</Button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-200">
             <p className="text-center text-sm text-gray-600 mb-4">New to RTS Platform?</p>
             <div className="flex flex-col gap-3">
               <Link to="/register-company" className="text-center py-2 px-4 rounded-lg border-2 border-[#0F172A] text-[#0F172A] font-bold hover:bg-slate-50 transition-colors">Register New Company</Link>
               <Link to="/register-account" className="text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">Register as Candidate</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}