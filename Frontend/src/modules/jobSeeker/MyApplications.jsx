import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building2, MapPin, CheckCircle2, XCircle, ChevronDown, ChevronUp, FileText, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfinityLoader from '../../components/InfinityLoader';
import Confetti from 'react-confetti';

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedAppId, setExpandedAppId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    api.get('/applications/my-applications')
      .then(res => {
        const applications = res.data.data || [];
        setApps(applications);
        
        const hasOffer = applications.some(app => app.status === 'OFFER_LETTER_SENT' || app.status === 'HIRED');
        if (hasOffer) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 8000);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const getStatusConfig = (status) => {
    const s = status.toLowerCase();
    if (s.includes('reject')) return { color: 'text-red-700 bg-red-50 border-red-200', icon: XCircle };
    if (s.includes('offer') || s.includes('hire') || s.includes('accept')) return { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Trophy };
    if (s.includes('interview')) return { color: 'text-purple-700 bg-purple-50 border-purple-200', icon: Clock };
    if (s.includes('review')) return { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock };
    return { color: 'text-blue-700 bg-blue-50 border-blue-200', icon: FileText };
  };

  const getTimelineSteps = (app) => {
    const s = app.status.toLowerCase();
    
    const isRejected = s.includes('reject');
    const isOffer = s.includes('offer') || s.includes('hire') || s.includes('accept');
    const isInterview = s.includes('interview');
    const isReview = s.includes('review');
    
    let currentStep = 0;
    if (isReview) currentStep = 1;
    if (isInterview) currentStep = 2;
    if (isOffer || isRejected) currentStep = 3;

    return [
      { 
        id: 1,
        title: 'Application Submitted', 
        description: 'Your application was received successfully.', 
        completed: currentStep >= 0, 
        isCurrent: currentStep === 0,
        date: app.createdAt 
      },
      { 
        id: 2,
        title: 'Under Review', 
        description: 'The hiring team is currently reviewing your profile.', 
        completed: currentStep >= 1, 
        isCurrent: currentStep === 1 
      },
      { 
        id: 3,
        title: 'Interview Process', 
        description: 'You have been selected to meet with the team.', 
        completed: currentStep >= 2, 
        isCurrent: currentStep === 2 
      },
      { 
        id: 4,
        title: 'Final Decision', 
        description: isRejected ? 'Unfortunately, the team moved forward with other candidates.' : isOffer ? 'Congratulations! You received an offer.' : 'Awaiting final results.', 
        completed: currentStep === 3, 
        isCurrent: currentStep === 3,
        isFailure: isRejected,
        isSuccess: isOffer
      }
    ];
  };

  const toggleExpand = (id) => {
    setExpandedAppId(prev => prev === id ? null : id);
  };

  if (isLoading) {
    return <InfinityLoader text="Loading your applications..." />;
  }

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti 
            width={window.innerWidth} 
            height={window.innerHeight} 
            recycle={false} 
            numberOfPieces={600} 
            gravity={0.15}
          />
        </div>
      )}
      <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-sans pb-20 relative">
      
      {/* Decorative Background Header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-900 border-b border-indigo-500/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto pt-16 px-4 animate-fade-in relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left text-white">
          <h1 className="text-4xl font-black tracking-tight mb-2">My Applications</h1>
          <p className="text-indigo-200 font-medium text-lg">Track your career opportunities and hiring progress.</p>
        </div>

        {apps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center shadow-xl shadow-slate-200/50 mt-10">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
              <Briefcase className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">No applications yet</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-md">You haven't applied to any roles yet. Discover great opportunities and track them here.</p>
            <Link to="/jobs" className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-sm">
              Find Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {apps.map(app => {
              const isExpanded = expandedAppId === app.id;
              const companyName = app.JobPost?.Company?.companyName || app.JobPost?.Company?.name || 'Unknown Company';
              const statusConfig = getStatusConfig(app.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div 
                  key={app.id} 
                  className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden
                    ${isExpanded ? 'border-indigo-400 shadow-xl shadow-indigo-100/50 scale-[1.01]' : 'border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300'}`}
                >
                  {/* Card Header (Always Visible) */}
                  <div 
                    onClick={() => toggleExpand(app.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-5 relative group"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${isExpanded ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-slate-200'}`}></div>
                    
                    <div className="shrink-0 w-16 h-16 bg-slate-50 border border-slate-100 shadow-sm rounded-xl flex items-center justify-center text-2xl font-black text-slate-600 ml-2">
                      {companyName.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold leading-tight mb-1.5 transition-colors ${isExpanded ? 'text-indigo-700' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                        {app.JobPost?.title || 'Unknown Role'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> {companyName}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {app.JobPost?.location || 'Remote'}</span>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-4">
                      <span className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${statusConfig.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {app.status.replace(/_/g, ' ')}
                      </span>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors
                        ${isExpanded ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-slate-100'}
                      `}>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Timeline Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="p-8 max-w-2xl mx-auto">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 text-center">Application Progress</h3>
                          
                          <div className="relative pl-4 border-l-2 border-slate-200 ml-4 space-y-8">
                            {getTimelineSteps(app).map((step, index) => (
                              <div key={step.id} className="relative">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-slate-50 flex items-center justify-center
                                  ${step.completed 
                                    ? (step.isSuccess ? 'bg-emerald-500' : step.isFailure ? 'bg-red-500' : 'bg-[#0a66c2]') 
                                    : 'bg-slate-200'
                                  }
                                  ${step.isCurrent && !step.isSuccess && !step.isFailure ? 'ring-4 ring-blue-100' : ''}
                                `}>
                                  {step.completed && !step.isFailure && (
                                    <CheckCircle2 className="w-3 h-3 text-white absolute" />
                                  )}
                                  {step.isFailure && (
                                    <XCircle className="w-3 h-3 text-white absolute" />
                                  )}
                                </div>

                                {/* Content Box */}
                                <div className={`ml-6 p-4 rounded-xl border transition-all ${step.isCurrent ? 'bg-white border-blue-100 shadow-md transform scale-[1.02]' : 'bg-transparent border-transparent'}`}>
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className={`text-base font-bold ${step.completed || step.isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                                      {step.title}
                                    </h4>
                                    {step.date && (
                                      <span className="text-xs font-semibold text-slate-400">
                                        {new Date(step.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                      </span>
                                    )}
                                  </div>
                                  <p className={`text-sm ${step.completed || step.isCurrent ? 'text-slate-600' : 'text-slate-400'}`}>
                                    {step.description}
                                  </p>
                                  
                                  {/* Offer Letter Download Button */}
                                  {step.id === 4 && app.OfferLetter?.documentUrl && (
                                    <div className="mt-4">
                                      <a 
                                        href={app.OfferLetter.documentUrl} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                                      >
                                        <FileText className="w-4 h-4" /> Download Official Offer Letter
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
