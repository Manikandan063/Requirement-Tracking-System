import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Briefcase, Building, FileText, CheckCircle, BellRing, MapPin, Clock, ArrowRight, Zap, Rocket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ applicationsCount: 0, followsCount: 0, recentJobs: [] });

  useEffect(() => {
    api.get('/dashboard/job-seeker').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10 mix-blend-overlay">
          <Sparkles className="w-64 h-64 text-white animate-pulse-slow" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex w-20 h-20 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 items-center justify-center text-orange-500 text-4xl font-black shadow-inner">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700 mb-3 text-slate-300 text-xs font-bold uppercase tracking-widest shadow-sm">
                <Rocket className="w-3.5 h-3.5 text-orange-500" /> Propel Your Career
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{user?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="mt-3 text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
                Your next big opportunity is waiting. Let's see how your applications are progressing today.
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 shrink-0">
            <Link to="/jobs" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all">
              <Zap className="w-5 h-5 text-white" /> Explore New Roles
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-orange-200 transition-colors group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Applied Jobs</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{stats.applicationsCount || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <Link to="/my-applications" className="relative z-10 flex items-center gap-1 text-orange-500 text-sm font-bold mt-6 hover:text-orange-600 group/link">
            View Applications <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-emerald-200 transition-colors group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interviews</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{stats.interviewsCount || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <Link to="/interviews" className="relative z-10 flex items-center gap-1 text-emerald-500 text-sm font-bold mt-6 hover:text-emerald-600 group/link">
            Check Status <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-indigo-200 transition-colors group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Offer Letters</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{stats.offerLettersCount || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <Link to="/my-applications" className="relative z-10 flex items-center gap-1 text-indigo-500 text-sm font-bold mt-6 hover:text-indigo-600 group/link">
            View Offers <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-amber-200 transition-colors group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Following</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{stats.followsCount || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Building className="w-6 h-6" />
            </div>
          </div>
          <Link to="/companies" className="relative z-10 flex items-center gap-1 text-amber-500 text-sm font-bold mt-6 hover:text-amber-600 group/link">
            Browse Companies <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-6 md:px-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-orange-500" /> Recent Postings from Network
             </h2>
             {stats.recentJobs?.length > 0 && (
                <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-xs">
                   {stats.recentJobs.length} New
                </span>
             )}
          </div>
          
          {(!stats.recentJobs || stats.recentJobs.length === 0) ? (
            <div className="p-12 flex flex-col items-center justify-center text-center bg-white">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                  <Building className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-800 mb-1">No New Postings</h3>
               <p className="text-slate-500 max-w-sm mb-6">The companies you follow haven't posted any new roles recently.</p>
               <Link to="/companies">
                 <button className="bg-white border border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm">
                   Discover More Companies
                 </button>
               </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentJobs.map((job) => (
                <div key={job.id} className="p-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-orange-50/30 transition-colors group">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center font-black text-slate-600 text-2xl shadow-sm border border-slate-200 flex-shrink-0">
                      {job.Company?.companyName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{job.title}</h4>
                      <p className="text-slate-500 font-medium mt-1">{job.Company?.companyName}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                           <MapPin className="w-3.5 h-3.5" /> {job.location || 'Remote'}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                           <Briefcase className="w-3.5 h-3.5" /> {job.jobType || 'Full-Time'}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md">
                           <Clock className="w-3.5 h-3.5" /> New Posting
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to={`/jobs/${job.id}/apply`}>
                      <button className="w-full md:w-auto bg-white border border-slate-200 hover:border-orange-500 hover:bg-orange-500 text-slate-700 hover:text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm">
                        View Role
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
