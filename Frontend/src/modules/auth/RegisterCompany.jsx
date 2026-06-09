import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Building, Mail, Globe, FileText, User, Phone, Lock, ArrowRight, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InputField = ({ icon: Icon, label, type="text", ...props }) => (
  <div className="group/field mb-4">
    <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within/field:text-[#F97316] transition-colors">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-slate-400 group-focus-within/field:text-[#F97316] transition-colors" />
      </div>
      {type === 'textarea' ? (
        <textarea 
          {...props}
          className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm hover:border-orange-300 min-h-[120px]"
        />
      ) : (
        <input 
          type={type}
          {...props}
          className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm hover:border-orange-300"
        />
      )}
    </div>
  </div>
);

export default function RegisterCompany() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', companyEmail: '', companyPhone: '', website: '', description: '',
    adminName: '', adminEmail: '', adminPhone: '', password: ''
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.post('/companies/register', formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering company');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50 font-sans selection:bg-[#F97316] selection:text-white p-4 sm:p-8 relative overflow-hidden">
      
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-orange-300/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-orange-900/5 border border-white/50 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0F172A] to-slate-800 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <Building className="w-8 h-8 text-[#F97316]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-3">Register Your Company</h2>
          <p className="text-slate-500 font-medium text-lg">Set up your workspace to start hiring elite talent</p>
        </div>
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#F97316] rounded-full -z-10 transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {[1, 2, 3].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/30 scale-110' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              <span className={`text-xs font-bold mt-1 ${step >= s ? 'text-slate-800' : 'text-slate-400'}`}>
                {s === 1 ? 'Company' : s === 2 ? 'Admin' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2"
              >
                <InputField icon={Building} label="Company Name" placeholder="e.g. Acme Corp" value={formData.companyName} onChange={e=>setFormData({...formData, companyName: e.target.value})} />
                <InputField icon={Mail} label="Company Email" type="email" placeholder="contact@acmecorp.com" value={formData.companyEmail} onChange={e=>setFormData({...formData, companyEmail: e.target.value})} />
                <InputField icon={Globe} label="Website URL" placeholder="https://www.acmecorp.com" value={formData.website} onChange={e=>setFormData({...formData, website: e.target.value})} />
                <InputField icon={FileText} label="Description" type="textarea" placeholder="Tell us about your company..." value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} />
                
                <button onClick={nextStep} className="w-full bg-[#0F172A] hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 mt-8">
                  Continue to Admin Details <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2"
              >
                <InputField icon={User} label="Admin Full Name" placeholder="John Doe" value={formData.adminName} onChange={e=>setFormData({...formData, adminName: e.target.value})} />
                <InputField icon={Mail} label="Admin Work Email" type="email" placeholder="john@acmecorp.com" value={formData.adminEmail} onChange={e=>setFormData({...formData, adminEmail: e.target.value})} />
                <InputField icon={Phone} label="Admin Phone" placeholder="+1 (555) 000-0000" value={formData.adminPhone} onChange={e=>setFormData({...formData, adminPhone: e.target.value})} />
                <InputField icon={Lock} label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})} />
                
                <div className="flex gap-4 mt-8">
                  <button onClick={prevStep} className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button onClick={nextStep} className="flex-[2] bg-[#0F172A] hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2">
                    Review Details <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-inner">
                  <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                    <ShieldCheck className="w-6 h-6 text-[#F97316]" /> Registration Summary
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium text-sm">Company Name</span>
                      <span className="text-slate-900 font-bold">{formData.companyName || 'Not provided'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium text-sm">Company Email</span>
                      <span className="text-slate-900 font-bold">{formData.companyEmail || 'Not provided'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium text-sm">Admin Name</span>
                      <span className="text-slate-900 font-bold">{formData.adminName || 'Not provided'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium text-sm">Admin Email</span>
                      <span className="text-slate-900 font-bold">{formData.adminEmail || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={isLoading || isSuccess}
                    className="flex-[2] bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 text-white py-4 rounded-2xl font-bold shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Creating Account...' : isSuccess ? 'Registered ✓' : 'Complete Registration'} {!isLoading && !isSuccess && <CheckCircle className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-slate-500 font-medium">
            Already have a workspace? <Link to="/login" className="text-[#F97316] hover:text-[#EA580C] font-bold ml-1">Sign in here</Link>
          </p>
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
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            Registration successful ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}