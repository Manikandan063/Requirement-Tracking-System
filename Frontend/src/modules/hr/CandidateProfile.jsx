import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Briefcase, FileText, ArrowLeft, Star, ExternalLink, ShieldCheck, CheckCircle, Calendar } from 'lucide-react';
import InfinityLoader from '../../components/InfinityLoader';

export default function CandidateProfile() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/applications/${applicationId}`)
       .then(res => {
         if (res?.data?.data) {
           setApp(res.data.data);
         } else {
           setError('Invalid response from server.');
         }
       })
       .catch(err => {
         console.error(err);
         setError(err.message || 'Error fetching candidate.');
       })
       .finally(() => setIsLoading(false));
  }, [applicationId]);

  const getStatusConfig = (status) => {
    switch(status) {
      case 'PENDING': return { label: 'New Application', color: 'bg-blue-500', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'ADMIN_VERIFIED': return { label: 'Verified', color: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'INTERVIEW_SCHEDULED': return { label: 'Interview Scheduled', color: 'bg-indigo-500', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'INTERVIEW_CONFIRMED': return { label: 'Interview Confirmed', color: 'bg-indigo-500', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'OFFER_LETTER_SENT': return { label: 'Offer Sent', color: 'bg-purple-500', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'REJECTED': return { label: 'Rejected', color: 'bg-red-500', bg: 'bg-red-50 text-red-700 border-red-200' };
      default: return { label: status || 'Unknown', color: 'bg-slate-500', bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  if (isLoading) {
    return <InfinityLoader text="Loading Candidate Profile..." />;
  }

  if (error || !app) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <User className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700">Candidate Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">{error || 'This application may have been removed or does not exist.'}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">Go Back</button>
      </div>
    );
  }

  const statusInfo = getStatusConfig(app.status);
  const safeName = typeof app.name === 'string' ? app.name : 'Unknown Candidate';
  const initial = safeName !== 'Unknown Candidate' && safeName.length > 0 ? safeName.charAt(0).toUpperCase() : '?';

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
      
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 transition-all group shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#0F172A]">Candidate Profile</h1>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
            Application ID: <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{app.id || 'N/A'}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: ID Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Main ID Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            {/* Colored Banner */}
            <div className={`h-32 ${statusInfo.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="px-6 pb-8 -mt-16 relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-white rounded-[2rem] p-2 shadow-lg mb-4">
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-[1.5rem] flex items-center justify-center text-5xl font-black text-[#0F172A] border border-slate-100">
                  {initial}
                </div>
              </div>

              <h2 className="text-2xl font-black text-[#0F172A] mb-1">{safeName}</h2>
              <p className="text-sm font-bold text-[#F97316] mb-4">Applied for {app.JobPost?.title || 'Unknown Role'}</p>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs uppercase tracking-wider mb-6 ${statusInfo.bg}`}>
                <div className={`w-2 h-2 rounded-full ${statusInfo.color}`}></div>
                {statusInfo.label}
              </div>

              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 border border-slate-200">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate">{app.email || 'N/A'}</span>
                </div>
                
                {app.phoneNumber && (
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 border border-slate-200">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{app.phoneNumber}</span>
                  </div>
                )}

                {app.resumeUrl && (
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-slate-900/10 mt-4 group"
                  >
                    <FileText className="w-4 h-4" /> View Original Resume
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                )}

                {app.OfferLetter?.documentUrl && (
                  <a 
                    href={app.OfferLetter.documentUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 mt-3 group"
                  >
                    <FileText className="w-4 h-4" /> Download Offer Letter
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-100 group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-black text-[#0F172A] mb-4">Pipeline Actions</h3>
            <div className="space-y-3">
              <Link to={`/hr/verification/${app.id || ''}`} className="block">
                <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-between transition-colors group">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-[#F97316]" /> Verification Step</span>
                  <CheckCircle className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
              <Link to={`/hr/interview/${app.id || ''}`} className="block">
                <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-between transition-colors group">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400 group-hover:text-[#F97316]" /> Interview Stage</span>
                  <CheckCircle className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
              <Link to={`/hr/offer-letter/${app.id || ''}`} className="block">
                <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-between transition-colors group">
                  <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400 group-hover:text-[#F97316]" /> Offer Letter</span>
                  <CheckCircle className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Detailed Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 space-y-6"
        >
          {/* Experience Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-orange-50 text-[#F97316] rounded-xl border border-orange-100">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Professional Experience</h3>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
              {app.experience ? String(app.experience) : <span className="italic text-slate-400">No experience details provided.</span>}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Education Background</h3>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
              {app.education ? String(app.education) : <span className="italic text-slate-400">No education details provided.</span>}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Core Skills</h3>
            </div>
            
            {app.skills && typeof app.skills === 'string' && app.skills.trim().length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {app.skills.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:border-[#F97316] hover:text-[#F97316] transition-colors cursor-default"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <span className="italic text-slate-400">No specific skills listed.</span>
              </div>
            )}
          </div>

        </motion.div>

      </div>
    </div>
  );
}
