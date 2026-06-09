import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Mail, Lock, ArrowRight, UserPlus, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (['ADMIN', 'COMPANY_ADMIN', 'SUPER_ADMIN'].includes(user.role)) navigate('/admin/dashboard');
      else if (user.role === 'HR') navigate('/hr/dashboard');
      else navigate('/home');
    } catch (err) {
      alert('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF7ED] via-white to-orange-50 font-sans selection:bg-[#F97316] selection:text-white p-4 sm:p-8 relative">
      
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-orange-300/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-orange-900/5 flex flex-col lg:flex-row overflow-hidden relative z-10 border border-orange-100"
      >
        
        {/* Left Side: Gradient / Image Branding */}
        <div className="lg:w-[45%] bg-[#0F172A] p-12 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#F97316] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">
              Unlock Your <br/> Next Great <br/> Opportunity.
            </h1>
            <p className="text-slate-300 font-medium text-lg max-w-sm">
              The premier ecosystem connecting elite talent with fast-growing companies.
            </p>
          </div>


        </div>

        {/* Right Side: The Form */}
        <div className="lg:w-[55%] p-8 sm:p-12 xl:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Mobile Header Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md">
              <Briefcase className="w-5 h-5 text-[#F97316]" />
            </div>
            <span className="text-2xl font-black text-[#0F172A] tracking-tight">RTS</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Log in to your account to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group/field">
              <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within/field:text-[#F97316] transition-colors">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within/field:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm hover:border-orange-300" 
                  required 
                />
              </div>
            </div>
            
            <div className="group/field">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700 group-focus-within/field:text-[#F97316] transition-colors">Password</label>
                <a href="#" className="text-sm font-bold text-[#F97316] hover:text-[#EA580C] transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within/field:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm hover:border-orange-300 tracking-widest" 
                  required 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-100">
             <p className="text-center text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">New to RTS Platform?</p>
             
             <div className="flex flex-col sm:flex-row gap-3">
               <Link 
                 to="/register-account" 
                 className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-orange-50 text-orange-700 bg-orange-50/50 hover:bg-orange-100 font-bold transition-all"
               >
                 <UserPlus className="w-4 h-4" /> I'm a Candidate
               </Link>
               <Link 
                 to="/register-company" 
                 className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-all shadow-sm"
               >
                 <Building className="w-4 h-4 text-slate-400" /> I'm a Company
               </Link>
             </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}