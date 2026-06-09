import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Search, MapPin, Briefcase, ChevronRight, TrendingUp, Building, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobSeekerHome() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [stats, setStats] = useState({
    applicationsCount: 0,
    followsCount: 0,
    interviewsCount: 0,
    offerLettersCount: 0,
    recentJobs: []
  });

  useEffect(() => {
    api.get('/dashboard/job-seeker')
      .then(res => setStats(res.data.data))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-sans p-4 md:p-6 pb-20">
      <div className="max-w-6xl mx-auto animate-fade-in">
        
        {/* Sleek Dark Header Card */}
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950 rounded-[2rem] relative overflow-hidden shadow-xl shadow-indigo-900/10 pt-10 pb-24 px-6 md:px-10">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

          {/* Compact Hero Section */}
          <div className="relative z-10 text-center md:text-left text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Welcome back.</h1>
              <p className="text-indigo-200 font-medium text-base max-w-xl">Find your next great opportunity and track your professional growth.</p>
            </div>
            
            {/* Compact Search Bar */}
            <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-1.5 flex items-center shadow-lg relative z-50">
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 mr-1">
                <Search className="text-indigo-200 w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="bg-transparent outline-none text-white placeholder-indigo-200/70 text-sm w-36 sm:w-48 font-medium"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-2 mr-1 border-l border-white/10">
                <MapPin className="text-indigo-200 w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="bg-transparent outline-none text-white placeholder-indigo-200/70 text-sm w-28 font-medium"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch} 
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Unified Metrics Row (Reduced Card Size) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 mb-10 overflow-hidden relative z-20 -mt-12 mx-4 md:mx-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              { label: 'Applications', value: stats.applicationsCount || 0, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Interviews', value: stats.interviewsCount || 0, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Offers', value: stats.offerLettersCount || 0, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Following', value: stats.followsCount || 0, icon: Building, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Followed Company Posts (Reduced Card Size) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Curated Opportunities
            </h2>
            <button onClick={() => navigate('/companies')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View All Companies <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {(!stats.recentJobs || stats.recentJobs.length === 0) ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Building className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Expand Your Network</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">Follow companies to receive updates on their latest job postings right here.</p>
              <button onClick={() => navigate('/companies')} className="bg-white border border-slate-300 hover:border-indigo-500 text-slate-700 hover:text-indigo-600 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                Discover Companies
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.recentJobs.map((job, idx) => (
                <motion.div 
                  key={job.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.05) }}
                  onClick={() => navigate('/jobs?q=' + encodeURIComponent(job.title))} 
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all flex flex-col h-full group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 shadow-sm shrink-0">
                        {job.Company?.companyName?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 leading-none mb-1">{job.Company?.companyName || 'Unknown Company'}</p>
                        <p className="text-xs text-slate-400 leading-none">{job.location || 'Remote'}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-100">
                      New
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400"/> {job.jobType || 'Full-time'}</span>
                    <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                      View <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}