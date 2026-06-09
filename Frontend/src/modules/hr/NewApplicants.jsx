import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, ShieldCheck, Calendar, FileText, CheckCircle, Search, Clock, ArrowRight, XCircle } from 'lucide-react';
import InfinityLoader from '../../components/InfinityLoader';

export default function NewApplicants() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get('/applications/hr/all')
       .then(res => setApps(res.data.data))
       .catch(console.error)
       .finally(() => setIsLoading(false));
  }, []);

  const getStatusConfig = (status) => {
    switch(status) {
      case 'PENDING': return { label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'ADMIN_VERIFIED': return { label: 'Verified', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'INTERVIEW_SCHEDULED': return { label: 'Interview', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'INTERVIEW_CONFIRMED': return { label: 'Confirmed', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'OFFER_LETTER_SENT': return { label: 'Offered', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'REJECTED': return { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200' };
      default: return { label: status, color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const filteredApps = apps.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (a.JobPost?.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'ALL') return matchesSearch;
    if (filter === 'PENDING') return matchesSearch && a.status === 'PENDING';
    if (filter === 'VERIFIED') return matchesSearch && a.status === 'ADMIN_VERIFIED';
    if (filter === 'INTERVIEW') return matchesSearch && ['INTERVIEW_SCHEDULED', 'INTERVIEW_CONFIRMED'].includes(a.status);
    if (filter === 'OFFER') return matchesSearch && a.status === 'OFFER_LETTER_SENT';
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Sleek Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-2">Applicants Directory</h1>
          <p className="text-slate-500 font-medium text-sm">Manage and track your candidates across all job postings.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search candidates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/20 outline-none transition-all w-64"
            />
          </div>
        </div>
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'ALL', label: 'All Candidates' },
          { id: 'PENDING', label: 'New' },
          { id: 'VERIFIED', label: 'Verified' },
          { id: 'INTERVIEW', label: 'Interviewing' },
          { id: 'OFFER', label: 'Offered' },
        ].map(f => (
          <button 
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${filter === f.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stripe-like Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10">
                    <InfinityLoader text="Loading candidates..." />
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="font-bold text-slate-700">No candidates found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredApps.map((a, i) => {
                  const statusInfo = getStatusConfig(a.status);
                  const isVerified = a.Verification?.verificationStatus === 'VERIFIED';
                  const isRejected = a.Verification?.verificationStatus === 'REJECTED';
                  
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      key={a.id} 
                      className="group hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                              {a.name.charAt(0)}
                            </div>
                            {isVerified && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A] text-sm group-hover:text-[#F97316] transition-colors">
                              <Link to={`/hr/candidate/${a.id}`}>{a.name}</Link>
                            </p>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" /> {a.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{a.JobPost?.title || 'Unknown Role'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(a.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/hr/candidate/${a.id}`}>
                            <button className="p-2 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors" title="View Profile">
                              <User className="w-4 h-4" />
                            </button>
                          </Link>
                          
                          <Link to={`/hr/verification/${a.id}`}>
                            <button className={`p-2 rounded-lg transition-colors ${isVerified ? 'text-emerald-500 bg-emerald-50' : isRejected ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-[#F97316] hover:bg-orange-50'}`} title="Verification">
                              {isRejected ? <XCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                            </button>
                          </Link>

                          {isVerified && (
                            <Link to={`/hr/interview/${a.id}`}>
                              <button className={`p-2 rounded-lg transition-colors ${a.Interview ? 'text-blue-500 bg-blue-50' : 'text-slate-400 hover:text-[#0F172A] hover:bg-slate-100'}`} title="Interview">
                                <Calendar className="w-4 h-4" />
                              </button>
                            </Link>
                          )}

                          <Link to={`/hr/offer-letter/${a.id}`}>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-[#F97316] hover:text-[#F97316] text-slate-700 text-xs font-bold rounded-lg transition-all shadow-sm ml-2 group">
                              Offer <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
