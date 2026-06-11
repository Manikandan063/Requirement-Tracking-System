import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Users, XCircle, Trash2, CheckCircle, MapPin, Clock, ArrowRight, Layers, Sparkles, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      api.get('/job-posts').then(res => {
        const allJobs = res.data.data || [];
        // Use loose equality (==) in case hrId/companyId are strings vs numbers
        const relevantJobs = allJobs.filter(j => 
          (user.companyId && j.companyId == user.companyId) || 
          j.hrId == user.id
        );
        console.log("Filtered jobs:", relevantJobs, "All jobs:", allJobs);
        setJobs(relevantJobs);
      }).catch(console.error);
    }
  }, [user]);

  const closeJob = async (id) => {
    if (window.confirm('Are you sure you want to close this job? It will no longer accept applications.')) {
      try {
        await api.put(`/job-posts/${id}`, { status: 'CLOSED' });
        setJobs(jobs.map(j => j.id === id ? { ...j, status: 'CLOSED' } : j));
      } catch (err) {
        alert('Error closing job');
      }
    }
  }

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
      try {
        await api.delete(`/job-posts/${id}`);
        setJobs(jobs.filter(j => j.id !== id));
      } catch (err) {
        alert('Error deleting job');
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-orange-100"
      >
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
            <Layers className="w-8 h-8 text-[#F97316]" /> Manage Jobs
          </h1>
          <p className="text-slate-500 font-medium">View and manage your active and closed job postings.</p>
        </div>
        <Link 
          to="/hr/create-job" 
          className="shrink-0 inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-5 h-5 text-[#F97316]" /> Create New Job
        </Link>
      </motion.div>

      {jobs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-12 h-12 text-[#F97316]" />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] mb-3">No jobs posted yet</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium text-lg">You haven't created any job postings. Create your first job post to start accepting applications.</p>
          <Link to="/hr/create-job" className="inline-flex bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]">
            Publish First Job
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {jobs.map((j, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={j.id} 
              className={`bg-white rounded-3xl p-8 border shadow-sm relative overflow-hidden transition-all group ${j.status === 'CLOSED' ? 'border-slate-200 bg-slate-50 opacity-80' : 'border-orange-100 hover:shadow-xl hover:shadow-orange-900/5 hover:border-orange-200'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${j.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {j.status}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#F97316] border border-orange-100">
                      {j.category}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black ${j.status === 'CLOSED' ? 'text-slate-500' : 'text-[#0F172A] group-hover:text-[#F97316] transition-colors'}`}>{j.title}</h3>
                </div>
                
                {j.status === 'ACTIVE' && (
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100">
                    <Briefcase className="w-7 h-7 text-[#F97316]" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-2.5 text-slate-500">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm font-bold">{j.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm font-bold">{j.jobType || 'Full-time'}</span>
                </div>
              </div>

              {/* Interaction Stats for HR */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 text-slate-600 text-sm font-bold">
                      <span className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4 text-orange-500" /> {j.likesCount || 0} Likes</span>
                      <span className="flex items-center gap-1.5"><Share2 className="w-4 h-4 text-emerald-500" /> {j.sharesCount || 0} Shares</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <Link to={`/hr/jobs/${j.id}/applicants`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
                  <Users className="w-4 h-4" /> View Applicants
                </Link>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {j.status === 'ACTIVE' && (
                     <button onClick={() => closeJob(j.id)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-5 py-3 rounded-xl font-bold transition-colors border border-amber-200/50">
                       <XCircle className="w-4 h-4" /> Close
                     </button>
                  )}
                  <button onClick={() => deleteJob(j.id)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold transition-colors border border-red-200/50">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
