import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, MapPin, CheckCircle2, XCircle, ChevronDown, ChevronUp, Clock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfinityLoader from '../../components/InfinityLoader';

const STAGES = [
  'APPLIED',
  'INTERVIEW_SCHEDULED',
  'INTERVIEW_CONFIRMED',
  'ROUND_1_SELECTED',
  'ROUND_2_SELECTED',
  'ROUND_3_SELECTED',
  'SENT_TO_ADMIN',
  'ADMIN_VERIFIED',
  'OFFER_LETTER_SENT'
];

const formatStageName = (stage) => {
  if (stage === 'SENT_TO_ADMIN') return 'HR Verification Pending';
  if (stage === 'ADMIN_VERIFIED') return 'HR Verification Complete';
  return stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export default function InterviewStatus() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedAppId, setExpandedAppId] = useState(null);

  useEffect(() => {
    api.get('/applications/my-applications').then(res => {
      const scheduled = res.data.data.filter(a => a.status !== 'REJECTED' && STAGES.indexOf(a.status) > 0);
      setApps(scheduled);
    })
    .catch(console.error)
    .finally(() => setIsLoading(false));
  }, []);

  const confirmInterview = async (appId) => {
    try {
      await api.put(`/interviews/${appId}/confirm`, { status: 'CONFIRMED' });
      alert('Attendance Confirmed!');
      window.location.reload();
    } catch (err) {}
  };

  const toggleExpand = (id) => {
    setExpandedAppId(prev => prev === id ? null : id);
  };

  if (isLoading) {
    return <InfinityLoader text="Loading interview schedule..." />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-sans pb-20 relative">
      
      {/* Decorative Background Header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-900 border-b border-indigo-500/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto pt-16 px-4 animate-fade-in relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left text-white">
          <h1 className="text-4xl font-black tracking-tight mb-2">Interview Schedule</h1>
          <p className="text-indigo-200 font-medium text-lg">Manage your upcoming interviews and track hiring stages.</p>
        </div>

        {apps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center shadow-xl shadow-slate-200/50 mt-10">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">No active interviews</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-md">You don't have any interviews scheduled at the moment. Keep applying to discover new opportunities!</p>
            <Link to="/jobs" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-sm">
              Find Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {apps.map((a) => {
              const isExpanded = expandedAppId === a.id;
              const companyName = a.JobPost?.Company?.companyName || a.JobPost?.Company?.name || 'Unknown Company';
              
              const normalizedStatus = a.status.replace('ROUND1', 'ROUND_1').replace('ROUND2', 'ROUND_2').replace('ROUND3', 'ROUND_3');
              const currentStageIdx = STAGES.indexOf(normalizedStatus);
              
              return (
                <div 
                  key={a.id} 
                  className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden
                    ${isExpanded ? 'border-indigo-400 shadow-xl shadow-indigo-100/50 scale-[1.01]' : 'border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300'}`}
                >
                  {/* Card Header (Always Visible) */}
                  <div 
                    onClick={() => toggleExpand(a.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-5 relative group"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${isExpanded ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-slate-200'}`}></div>
                    
                    <div className="shrink-0 w-16 h-16 bg-slate-50 border border-slate-100 shadow-sm rounded-xl flex items-center justify-center text-2xl font-black text-slate-600 ml-2">
                      {companyName.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold leading-tight mb-1.5 transition-colors ${isExpanded ? 'text-indigo-700' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                        {a.JobPost?.title || 'Unknown Role'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> {companyName}</span>
                        <span className="flex items-center gap-1.5 text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">Round: {a.Interview?.round || 'Initial'}</span>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border text-indigo-700 bg-indigo-50 border-indigo-200">
                        <Clock className="w-3.5 h-3.5" />
                        {a.status.replace(/_/g, ' ')}
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
                          
                          {/* Interview Details Block */}
                          {a.Interview && (
                            <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm mb-10">
                              <h3 className="font-bold text-indigo-900 mb-5 text-base flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-indigo-600" /> Interview Schedule
                              </h3>
                              
                              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                <div className="flex items-center gap-3 text-indigo-900">
                                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                                    <Clock className="w-4 h-4 text-indigo-600" />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date & Time</p>
                                    <p className="font-semibold text-sm">{a.Interview.interviewDate} at {a.Interview.interviewTime}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3 text-indigo-900">
                                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0 mt-0.5">
                                    {a.Interview.interviewFormat === 'WALKIN' ? <MapPin className="w-4 h-4 text-indigo-600" /> : <Video className="w-4 h-4 text-indigo-600" />}
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                                      {a.Interview.interviewFormat === 'WALKIN' ? 'Location' : 'Meeting Link'}
                                    </p>
                                    {a.Interview.interviewFormat === 'WALKIN' ? (
                                      <p className="font-semibold text-sm whitespace-pre-wrap leading-snug">{a.Interview.meetingLink}</p>
                                    ) : (
                                      <a href={a.Interview.meetingLink} target="_blank" rel="noreferrer" className="font-semibold text-sm text-[#0a66c2] hover:underline break-all">
                                        Join Video Call →
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {a.status === 'INTERVIEW_SCHEDULED' && (
                                <button 
                                  onClick={() => confirmInterview(a.id)} 
                                  className="w-full sm:w-auto bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                                >
                                  <CheckCircle2 className="w-4 h-4" /> Confirm Attendance
                                </button>
                              )}
                              {a.status !== 'INTERVIEW_SCHEDULED' && STAGES.indexOf(normalizedStatus) >= STAGES.indexOf('INTERVIEW_CONFIRMED') && (
                                <div className="inline-flex bg-emerald-50 text-emerald-700 px-6 py-2.5 rounded-xl font-bold border border-emerald-200 items-center justify-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4" /> Attendance Confirmed
                                </div>
                              )}
                            </div>
                          )}

                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 text-center">Hiring Pipeline Progress</h3>
                          
                          <div className="relative pl-4 border-l-2 border-slate-200 ml-4 space-y-8">
                            {STAGES.map((stage, idx) => {
                              const isCompleted = idx <= currentStageIdx;
                              const isCurrent = idx === currentStageIdx;
                              const isFailure = a.status === 'REJECTED' && isCurrent;
                              const isSuccess = stage === 'OFFER_LETTER_SENT' && isCompleted;
                              
                              return (
                                <div key={stage} className="relative">
                                  {/* Timeline Dot */}
                                  <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-slate-50 flex items-center justify-center
                                    ${isCompleted 
                                      ? (isSuccess ? 'bg-emerald-500' : isFailure ? 'bg-red-500' : 'bg-indigo-500') 
                                      : 'bg-slate-200'
                                    }
                                    ${isCurrent && !isSuccess && !isFailure ? 'ring-4 ring-indigo-100' : ''}
                                  `}>
                                    {isCompleted && !isFailure && (
                                      <CheckCircle2 className="w-3 h-3 text-white absolute" />
                                    )}
                                    {isFailure && (
                                      <XCircle className="w-3 h-3 text-white absolute" />
                                    )}
                                  </div>

                                  {/* Content Box */}
                                  <div className={`ml-6 p-4 rounded-xl border transition-all ${isCurrent ? 'bg-white border-indigo-100 shadow-sm' : 'bg-transparent border-transparent'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className={`text-base font-bold ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {formatStageName(stage)}
                                      </h4>
                                    </div>
                                    <p className={`text-sm ${isCompleted || isCurrent ? 'text-slate-500' : 'text-slate-400'}`}>
                                      {isCurrent ? 'You are currently in this stage.' : isCompleted ? 'Completed successfully.' : 'Pending future action.'}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
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
  );
}
