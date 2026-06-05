import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';

export default function ApplyJob() {
  const { jobPostId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', education: '', skills: '', experience: '', resumeUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/applications/${jobPostId}`, formData);
      alert('Application submitted!');
      navigate('/my-applications');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-[#0F172A] p-8 text-white">
          <h1 className="text-3xl font-bold">Submit Application</h1>
          <p className="text-slate-400 mt-2">Please complete the form below to apply for this position.</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label><input required className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label><input required type="email" className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})}/></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label><input required className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" value={formData.phoneNumber} onChange={e=>setFormData({...formData, phoneNumber: e.target.value})}/></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Highest Education</label><input required className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" placeholder="e.g. B.Tech Computer Science" value={formData.education} onChange={e=>setFormData({...formData, education: e.target.value})}/></div>
            </div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Key Skills (Comma separated)</label><textarea required className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all min-h-[100px]" placeholder="React, Node.js, Python" value={formData.skills} onChange={e=>setFormData({...formData, skills: e.target.value})}/></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Total Experience</label><input className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" placeholder="e.g. 3 Years" value={formData.experience} onChange={e=>setFormData({...formData, experience: e.target.value})}/></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Resume URL</label><input type="url" className="w-full border border-slate-200 rounded-xl p-3.5 bg-slate-50 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all" placeholder="https://drive.google.com/..." value={formData.resumeUrl} onChange={e=>setFormData({...formData, resumeUrl: e.target.value})}/></div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#084e96] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all">Submit Application</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
