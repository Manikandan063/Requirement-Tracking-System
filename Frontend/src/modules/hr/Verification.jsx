import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ShieldCheck, Search, CheckCircle, XCircle, AlertCircle, Fingerprint, Globe, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Verification() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [verification, setVerification] = useState(null);
  const [category, setCategory] = useState('IT');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (applicationId) {
      api.get(`/applications/${applicationId}`).then(res => {
        const app = res.data.data;
        if (app?.jobSeeker?.email) setEmail(app.jobSeeker.email);
        if (app?.JobPost?.category) setCategory(app.JobPost.category);
      }).catch(console.error);
    }
  }, [applicationId]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const res = await api.post(`/verification/${applicationId}/search`, { candidateEmail: email, jobCategory: category });
      setVerification(res.data.data);
    } catch (err) {
      alert('Error searching verification');
    } finally {
      setIsSearching(false);
    }
  };

  const handleVerify = async (status) => {
    try {
      await api.put(`/verification/${applicationId}/verify`, { status, remarks: 'Checked by HR' });
      setVerification({ ...verification, verificationStatus: status });
    } catch (err) {
      alert('Error updating status');
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-orange-500/50 focus:border-[#F97316] outline-none transition-all";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-orange-100"
      >
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-400 hover:text-[#F97316] transition-colors mb-2 text-sm font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Profile
          </button>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#F97316]" /> Candidate Verification
          </h1>
          <p className="text-slate-500 font-medium">Verify candidate profiles across multiple platforms to ensure authenticity.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/20"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
             <input type="email" placeholder="Candidate Email" className={`${inputClass} pl-12`} value={email} onChange={e => setEmail(e.target.value)} />
             <Fingerprint className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
          </div>
          <div className="w-full md:w-64 relative group">
             <select className={`${inputClass} appearance-none pl-12`} value={category} onChange={e => setCategory(e.target.value)}>
               <option value="IT">Information Technology</option>
               <option value="NON_IT">Non-IT / Operations</option>
             </select>
             <Globe className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F97316] transition-colors" />
          </div>
          <button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="shrink-0 flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            <Search className={`w-5 h-5 ${isSearching ? 'animate-spin' : ''}`} /> 
            {isSearching ? 'Scanning...' : 'Generate Report'}
          </button>
        </div>
        
        {verification ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-t border-slate-100 pt-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-black text-[#0F172A]">Scan Results</h3>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <span className="text-sm font-bold text-slate-500">Global Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  verification.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 
                  verification.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                  'bg-orange-100 text-[#F97316]'
                }`}>
                  {verification.verificationStatus}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Platform</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Profile Found</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Performance Level</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">System Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {verification.verificationSources?.map((s, i) => (
                    <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#0F172A]">{s.platformName}</td>
                      <td className="px-6 py-4">
                        {s.profileFound ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">
                            <XCircle className="w-4 h-4" /> No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {s.performanceLevel && s.performanceLevel !== 'N/A' ? (
                          <span className="inline-flex items-center font-bold text-[#F97316] bg-orange-50 px-3 py-1 rounded-lg text-sm border border-orange-100/50">
                            {s.performanceLevel}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium text-sm">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{s.verificationNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-4">
              <button 
                onClick={() => handleVerify('REJECTED')}
                className="flex items-center gap-2 px-6 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors"
              >
                <XCircle className="w-5 h-5" /> Reject Candidate
              </button>
              <button 
                onClick={() => handleVerify('VERIFIED')}
                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-colors shadow-sm"
              >
                <CheckCircle className="w-5 h-5" /> Mark as Verified
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <ShieldCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Ready to Verify</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">Click "Generate Report" to automatically scan multiple platforms for candidate authenticity.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
