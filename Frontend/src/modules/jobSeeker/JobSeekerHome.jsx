import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Search, MapPin, Briefcase, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function JobSeekerHome() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [stats, setStats] = useState({
    applicationsCount: 0,
    followsCount: 0,
    interviewsCount: 0,
    offerLettersCount: 0,
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
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] border border-slate-700">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 px-8 py-10 md:py-14 md:px-16 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-4 border border-blue-500/20">
            <TrendingUp className="w-3 h-3" /> Trusted by 10,000+ top companies
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">dream job</span> now
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
            Search thousands of jobs from top companies, fast-tracking your career to the next level.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
            <div className="flex-1 flex items-center bg-white px-5 py-3.5 rounded-xl border-none focus-within:ring-4 focus-within:ring-blue-500/30 transition-all shadow-inner">
              <Search className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:font-normal text-base" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 flex items-center bg-white px-5 py-3.5 rounded-xl border-none focus-within:ring-4 focus-within:ring-blue-500/30 transition-all shadow-inner">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:font-normal text-base" 
                value={location}
                onChange={e => setLocation(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="bg-[#0A66C2] hover:bg-[#084e96] text-white px-8 rounded-xl text-base font-bold shadow-lg flex items-center gap-2 transition-all">
              Search <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Activity Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Applied Jobs', value: stats.applicationsCount, color: 'from-blue-50 to-blue-100/50 text-blue-700 border-blue-200' },
            { label: 'Interview Invitations', value: stats.interviewsCount, color: 'from-purple-50 to-purple-100/50 text-purple-700 border-purple-200' },
            { label: 'Offer Letters', value: stats.offerLettersCount, color: 'from-green-50 to-emerald-100/50 text-emerald-700 border-green-200' },
            { label: 'Followed Companies', value: stats.followsCount, color: 'from-orange-50 to-orange-100/50 text-orange-700 border-orange-200' },
          ].map((stat, i) => (
            <div key={i} className={`p-8 rounded-2xl border bg-gradient-to-b ${stat.color} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
               <p className="text-sm font-bold uppercase tracking-wider mb-3 opacity-80">{stat.label}</p>
               <p className="text-5xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Followed Company Posts */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#0A66C2]" /> Jobs From Companies You Follow
        </h2>
        {(!stats.recentJobs || stats.recentJobs.length === 0) ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-700 mb-2">No recent jobs</h3>
            <p className="text-slate-500">Follow more companies to see their latest job postings here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.recentJobs.map(job => (
              <div key={job.id} onClick={() => navigate('/jobs?q=' + encodeURIComponent(job.title))} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {job.Company?.companyName?.charAt(0) || 'C'}
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">New</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0A66C2] transition-colors">{job.title}</h3>
                <p className="text-slate-500 font-medium text-sm mb-4">{job.Company?.companyName || 'Unknown Company'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.location || 'Remote'}</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">{job.jobType || 'Full-time'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}