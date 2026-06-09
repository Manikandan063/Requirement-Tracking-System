import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { MapPin, Briefcase, IndianRupee, Clock, Search, Building2, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InfinityLoader from '../../components/InfinityLoader';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSearch = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/job-posts').then(res => {
      setJobs(res.data.data);
    })
    .catch(console.error)
    .finally(() => setIsLoading(false));
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchQuery = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (job.Company?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.Company?.companyName || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchLocation = initialLocation ? (job.location || '').toLowerCase().includes(initialLocation.toLowerCase()) : true;
      return matchQuery && matchLocation;
    });
  }, [jobs, searchQuery, initialLocation]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedJob]);

  if (isLoading) {
    return <InfinityLoader text="Loading opportunities..." />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-sans pb-20 relative">
      
      {/* Decorative Background Header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-900 border-b border-indigo-500/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 relative z-10 animate-fade-in">
        
        {/* Header Content */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Find your dream job</h1>
          <p className="text-indigo-200 font-medium text-base max-w-2xl mx-auto">Explore thousands of opportunities and find the perfect match for your skills and career goals.</p>
        </div>

        {/* Floating Search Bar */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-900/10 p-1.5 flex items-center border border-slate-100 mb-8">
          <div className="flex-1 flex items-center pl-4">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by job title, skill, or company..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none pl-3 pr-4 py-2 text-slate-900 font-medium focus:ring-0 outline-none text-base placeholder-slate-400"
            />
          </div>
          {initialLocation && (
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4 pr-4 text-slate-600 font-medium text-sm">
              <MapPin className="w-4 h-4" /> {initialLocation}
            </div>
          )}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md ml-2">
            Search
          </button>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
        </div>

        {/* Job Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center shadow-sm mt-10">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">No matching jobs</h2>
            <p className="text-slate-500 text-lg max-w-md">We couldn't find any jobs matching your search criteria. Try adjusting your keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, i) => {
              const companyName = job.Company?.name || job.Company?.companyName || 'Company Name';
              
              return (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-indigo-500 transition-colors"></div>
                  
                  {/* Card Top */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-slate-600 shadow-sm group-hover:scale-105 transition-transform">
                      {companyName.charAt(0)}
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-100">
                      <Clock className="w-3.5 h-3.5" /> Recent
                    </div>
                  </div>
                  
                  {/* Card Middle */}
                  <div className="mb-6 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                    <p className="text-slate-500 font-medium mb-4 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> {companyName}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-200">
                        <MapPin className="w-3.5 h-3.5" /> {job.location || 'Remote'}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-200">
                        <Briefcase className="w-3.5 h-3.5" /> {job.jobType || 'Full-time'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Bottom */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center text-slate-700 font-bold text-sm">
                      <IndianRupee className="w-4 h-4 mr-0.5 text-slate-400" /> {job.salary || 'Competitive'}
                    </div>
                    <div className="text-indigo-600 font-bold text-sm flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      View Details <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-in Job Details Drawer */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            >
              
              {/* Drawer Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Job Details</h2>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-8 py-8">
                
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-center text-3xl font-black text-slate-600 shadow-sm shrink-0">
                    {(selectedJob.Company?.name?.charAt(0) || selectedJob.Company?.companyName?.charAt(0) || 'C')}
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">
                      {selectedJob.title}
                    </h1>
                    <p className="text-lg text-indigo-600 font-bold mb-1">
                      {selectedJob.Company?.name || selectedJob.Company?.companyName || 'Company Name'}
                    </p>
                    <p className="text-slate-500 font-medium">
                      {selectedJob.location || 'Remote'} • Posted {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-100 mb-8">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Briefcase className="w-5 h-5 text-slate-400"/>
                    <span className="font-bold text-slate-700">{selectedJob.jobType || 'Full-time'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <IndianRupee className="w-5 h-5 text-slate-400"/>
                    <span className="font-bold text-slate-700">{selectedJob.salary || 'Competitive'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Clock className="w-5 h-5 text-slate-400"/>
                    <span className="font-bold text-slate-700">{selectedJob.experience || 'Entry level'}</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-5">About the role</h2>
                  <div className="text-base text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedJob.description}
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-5">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills ? selectedJob.skills.split(',').map((s, idx) => (
                      <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold border border-indigo-100 shadow-sm">
                        {s.trim()}
                      </span>
                    )) : (
                      <span className="text-slate-500 font-medium">No specific skills listed.</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Drawer Footer (Sticky Apply Button) */}
              <div className="p-6 border-t border-slate-200 bg-white sticky bottom-0">
                <button 
                  onClick={() => navigate(`/jobs/${selectedJob.id}/apply`)} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                >
                  Apply for this position <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}