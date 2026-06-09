import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, IndianRupee, Target, Award, List, CheckCircle, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateJobPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', skills: '', experience: '', salary: '', location: '', jobType: '', category: 'IT'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/job-posts', formData);
      navigate('/hr/jobs');
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting job');
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-orange-500/50 focus:border-[#F97316] outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";
  const iconWrapperClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#F97316] transition-colors";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-orange-100"
      >
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#F97316]" /> Publish New Job
          </h1>
          <p className="text-slate-500 font-medium">Create a detailed job listing to attract top-tier candidates.</p>
        </div>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit} 
        className="space-y-8"
      >
        {/* Basic Details */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-xl font-black flex items-center gap-3 mb-8 text-[#0F172A] pb-4 border-b border-slate-100">
            <Briefcase className="w-6 h-6 text-[#F97316]" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 group">
              <label className={labelClass}>Job Title</label>
              <div className="relative">
                <Briefcase className={iconWrapperClass} />
                <input required className={`${inputClass} pl-12`} placeholder="e.g. Senior Frontend Engineer" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
            </div>
            
            <div className="group">
              <label className={labelClass}>Job Category</label>
              <div className="relative">
                <Target className={iconWrapperClass} />
                <select className={`${inputClass} pl-12 appearance-none`} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="IT">Information Technology</option>
                  <option value="NON_IT">Non-IT / Operations</option>
                </select>
              </div>
            </div>

            <div className="group">
              <label className={labelClass}>Job Type</label>
              <div className="relative">
                <List className={iconWrapperClass} />
                <input className={`${inputClass} pl-12`} placeholder="e.g. Full-time, Remote" value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/20"
        >
          <h2 className="text-xl font-black flex items-center gap-3 mb-8 text-[#0F172A] pb-4 border-b border-slate-100">
            <List className="w-6 h-6 text-[#F97316]" /> Job Description
          </h2>
          <div className="group">
            <textarea required rows={6} className={`${inputClass} resize-none`} placeholder="Describe the responsibilities, day-to-day tasks, and what you're looking for in a candidate..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
        </motion.div>

        {/* Requirements & Logistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/20"
        >
          <h2 className="text-xl font-black flex items-center gap-3 mb-8 text-[#0F172A] pb-4 border-b border-slate-100">
            <Award className="w-6 h-6 text-[#F97316]" /> Requirements & Logistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className={labelClass}>Key Skills Required</label>
              <input className={inputClass} placeholder="e.g. React, Node.js, TypeScript" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
              <p className="text-xs text-slate-400 mt-2 font-medium">Separate multiple skills with commas.</p>
            </div>
            <div className="group">
              <label className={labelClass}>Experience Level</label>
              <input className={inputClass} placeholder="e.g. 3-5 Years" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
            </div>
            <div className="group">
              <label className={labelClass}>Location</label>
              <div className="relative">
                <MapPin className={iconWrapperClass} />
                <input className={`${inputClass} pl-12`} placeholder="e.g. New York, NY or Remote" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
            <div className="group">
              <label className={labelClass}>Salary Range (Optional)</label>
              <div className="relative">
                <IndianRupee className={iconWrapperClass} />
                <input className={`${inputClass} pl-12`} placeholder="e.g. ₹10L - ₹15L" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-end gap-4 pt-6"
        >
          <button type="button" onClick={() => navigate('/hr/jobs')} className="px-6 py-3.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3.5 bg-[#0F172A] hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 transition-all active:scale-[0.98]">
            <CheckCircle className="w-5 h-5" /> {isSubmitting ? 'Publishing...' : 'Publish Job Post'}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}
