import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Briefcase, User, Mail, Phone, Lock, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterAccount() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phoneNumber: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/register', formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      alert('Error registering account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      // Simulate Google OAuth delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const googleMockData = {
        name: 'Google User',
        email: `google_${Date.now().toString().slice(-6)}@gmail.com`,
        password: 'GoogleOAuthPassword123!',
        phoneNumber: '+15550001234'
      };

      await api.post('/auth/register', googleMockData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      alert('Error with Google Sign-up. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED] font-sans selection:bg-[#F97316] selection:text-white p-4 sm:p-8">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-orange-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-[#0F172A]/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-orange-900/5 flex flex-col-reverse lg:flex-row overflow-hidden relative z-10 border border-orange-100"
      >
        
        {/* Left Side: The Form */}
        <div className="lg:w-[55%] p-8 sm:p-12 xl:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Mobile Header Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md">
              <Briefcase className="w-5 h-5 text-[#F97316]" />
            </div>
            <span className="text-2xl font-black text-[#0F172A] tracking-tight">RTS</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Join thousands of professionals finding their dream role</p>
          </div>
          
          <button 
            type="button"
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm transition-all mb-6 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleGoogleSignUp}
          >
            {isGoogleLoading ? (
               <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin"></div>
            ) : (
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                 <path d="M1 1h22v22H1z" fill="none" />
               </svg>
            )}
            {isGoogleLoading ? 'Connecting to Google...' : 'Sign up with Google'}
          </button>

          <div className="relative flex items-center py-2 mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or continue with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={formData.phoneNumber} 
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all tracking-widest" 
                  required 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || isSuccess}
              className="w-full bg-[#0F172A] hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Creating Account...' : isSuccess ? '✓ Registered' : 'Register Candidate'} {!isLoading && !isSuccess && <UserPlus className="w-5 h-5" />}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium mb-3">Already have an account?</p>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-all w-full sm:w-auto shadow-sm"
            >
              Sign in instead <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Side: Branding Panel */}
        <div className="lg:w-[45%] bg-[#0F172A] p-12 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#F97316] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">
              Your Career.<br/> Accelerated.
            </h1>
            <p className="text-slate-300 font-medium text-lg max-w-sm mb-12">
              Get access to exclusive job opportunities from top companies and fast-track your applications.
            </p>

            <div className="space-y-6">
              {[
                "1-click applications to premium jobs",
                "Real-time interview tracking & status updates",
                "Direct communication with verified HRs"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center border border-[#F97316]/20 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <span className="text-slate-200 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            className="fixed bottom-6 right-6 bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 z-50 border border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            Registration successful ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}