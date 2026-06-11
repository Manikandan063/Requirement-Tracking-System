import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Briefcase, Building, FileText, CheckCircle, BellRing, MapPin, Clock, ArrowRight, Zap, Rocket, Sparkles, ThumbsUp, Share2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ applicationsCount: 0, followsCount: 0, recentJobs: [] });
  const [expandedJobs, setExpandedJobs] = useState({});

  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    api.get('/dashboard/job-seeker').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  const toggleExpand = (jobId) => {
    setExpandedJobs(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const toggleComments = (jobId) => {
    setShowComments(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const handleLike = async (job) => {
    try {
      if (job.hasLiked) {
        await api.post(`/job-posts/${job.id}/unlike`);
        setStats(prev => ({
          ...prev,
          recentJobs: prev.recentJobs.map(j => 
            j.id === job.id ? { ...j, likesCount: Math.max(0, (j.likesCount || 0) - 1), hasLiked: false } : j
          )
        }));
      } else {
        await api.post(`/job-posts/${job.id}/like`);
        setStats(prev => ({
          ...prev,
          recentJobs: prev.recentJobs.map(j => 
            j.id === job.id ? { ...j, likesCount: (j.likesCount || 0) + 1, hasLiked: true } : j
          )
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (job) => {
    try {
      const jobLink = `${window.location.origin}/jobs/${job.id}`;
      const shareData = {
        title: `Job Opportunity: ${job.title}`,
        text: `Check out this ${job.title} role at ${job.Company?.companyName || 'our company'}.`,
        url: jobLink
      };

      let shared = false;
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        shared = true;
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(jobLink);
        alert("Post link copied to clipboard!");
        shared = true;
      }

      if (shared) {
        await api.post(`/job-posts/${job.id}/share`);
        setStats(prev => ({
          ...prev,
          recentJobs: prev.recentJobs.map(j => 
            j.id === job.id ? { ...j, sharesCount: (j.sharesCount || 0) + 1 } : j
          )
        }));
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err);
        alert("Could not share the post. Please try again.");
      }
    }
  };

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 px-2">
          <div>
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <BellRing className="w-6 h-6 text-orange-500" /> Curated Opportunities
            </h2>
            <p className="text-slate-500 font-medium mt-1 md:ml-9">Latest roles from your network and followed companies</p>
          </div>
          {stats.recentJobs?.length > 0 && (
             <span className="inline-flex items-center justify-center bg-orange-100/80 text-orange-700 font-bold px-4 py-1.5 rounded-full text-sm border border-orange-200 shadow-sm backdrop-blur-sm self-start md:self-auto">
                {stats.recentJobs.length} Fresh Matches
             </span>
          )}
        </div>
        
        {(!stats.recentJobs || stats.recentJobs.length === 0) ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 opacity-20"></div>
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                <Building className="w-10 h-10 text-slate-300" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-2">Awaiting New Signals</h3>
             <p className="text-slate-500 max-w-md mb-8 text-lg">Your network is currently quiet. Follow more industry leaders to see their latest opportunities here.</p>
             <Link to="/companies">
               <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 flex items-center gap-2">
                 Expand Your Network <ArrowRight className="w-5 h-5" />
               </button>
             </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {stats.recentJobs.map((job, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                key={job.id} 
                className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/30 border border-slate-100 transition-all duration-300"
              >
                {/* Header (User/Company info) */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center font-black text-white text-lg shadow-md flex-shrink-0 border border-slate-700">
                    {job.Company?.companyName?.charAt(0).toUpperCase() || <Building className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-900 truncate">{job.Company?.companyName || 'Unknown Company'}</h4>
                    <p className="text-slate-500 font-medium text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> Just Posted • <MapPin className="w-3 h-3"/> {job.location || 'Remote'}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-5 pl-2 border-l-2 border-orange-100 ml-4">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                   
                   <div className={`text-slate-600 text-sm mb-4 leading-relaxed ${expandedJobs[job.id] ? 'block' : 'hidden md:block'}`}>
                     We are actively hiring for the <span className="font-semibold text-slate-800">{job.title}</span> position! 
                     If you are passionate about building great products and thrive in a dynamic environment, we would love to hear from you. 
                     This is a {job.jobType || 'Full-Time'} role based in {job.location || 'Remote'}. Join us to make an impact.
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                     <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
                        {job.jobType || 'Full-Time'}
                     </span>
                     <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg shadow-sm">
                        Actively Hiring
                     </span>
                   </div>
                   
                   {/* Interaction Stats */}
                   <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-50 text-xs font-medium text-slate-400">
                     <span>{job.likesCount || 0} Likes</span>
                     <span>•</span>
                     <span>{job.sharesCount || 0} Shares</span>
                   </div>

                   {/* Mobile Expand Button */}
                   <button 
                     onClick={() => toggleExpand(job.id)}
                     className="md:hidden mt-4 text-orange-600 bg-orange-50 hover:bg-orange-100 text-sm font-bold w-full py-2.5 rounded-xl transition-colors"
                   >
                     {expandedJobs[job.id] ? 'Show Less' : 'View Complete Details'}
                   </button>
                </div>

                {/* Actions */}
                <div className={`flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-4 ${expandedJobs[job.id] ? 'flex' : 'hidden md:flex'}`}>
                  <div className="flex items-center gap-2 md:gap-4">
                    <button 
                      onClick={() => handleLike(job)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${job.hasLiked ? 'text-orange-600 bg-orange-50' : 'text-slate-500 hover:text-orange-500 hover:bg-orange-50'}`}
                    >
                       <ThumbsUp className={`w-4 h-4 ${job.hasLiked ? 'fill-current' : ''}`} /> Like
                    </button>
                    <button 
                      onClick={() => handleShare(job)}
                      className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
                    >
                       <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                  <Link to={`/jobs/${job.id}/apply`} className="w-full sm:w-auto mt-2 sm:mt-0">
                    <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all text-sm shadow-md flex items-center justify-center gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
