import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Briefcase, FileText, Bell, Mail, Phone, X, CheckCircle, ArrowRight, UserPlus, TrendingUp, Sparkles, Building2, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const chartData = [
  { name: 'Mon', applications: 12 },
  { name: 'Tue', applications: 19 },
  { name: 'Wed', applications: 15 },
  { name: 'Thu', applications: 28 },
  { name: 'Fri', applications: 22 },
  { name: 'Sat', applications: 9 },
  { name: 'Sun', applications: 14 },
];

export default function HRDashboard() {
  const [stats, setStats] = useState({ jobPostsCount: 0, applicationsCount: 0, recentFollowers: [], adminApproved: [], recentApplications: [] });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    api.get('/dashboard/hr').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-orange-100"
      >
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[#F97316]" /> Recruitment Hub
          </h1>
          <p className="text-slate-500 font-medium">Monitor campaign performance and track your candidate pipeline.</p>
        </div>
        <Link 
          to="/hr/create-job" 
          className="shrink-0 inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-5 h-5 text-[#F97316]" /> Create New Job
        </Link>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/hr/jobs">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0F172A] p-8 rounded-3xl shadow-xl shadow-slate-900/10 text-white relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#F97316]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-400 font-bold mb-1 uppercase tracking-wider text-sm">Active Job Posts</p>
                <h2 className="text-5xl font-black text-white">{stats.jobPostsCount}</h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">
                <Briefcase className="w-8 h-8 text-[#F97316]" />
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/hr/jobs" className="block">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-100 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform h-full"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-500 font-bold mb-1 uppercase tracking-wider text-sm">Total Applications</p>
                <h2 className="text-5xl font-black text-[#0F172A]">{stats.applicationsCount}</h2>
              </div>
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <FileText className="w-8 h-8 text-[#F97316]" />
              </div>
            </div>
          </motion.div>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#F97316] to-orange-500 p-8 rounded-3xl shadow-xl shadow-orange-500/20 text-white relative overflow-hidden group"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-orange-100 font-bold mb-1 uppercase tracking-wider text-sm">New Followers</p>
              <h2 className="text-5xl font-black">{stats.recentFollowers?.length || 0}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl border border-white/10 backdrop-blur-sm">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Chart Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-8 flex items-center gap-2 pb-4 border-b border-slate-100">
          <TrendingUp className="w-6 h-6 text-[#F97316]" /> Applications Pipeline (This Week)
        </h3>
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
              <Tooltip 
                cursor={{ fill: '#fff7ed' }}
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 20px' }}
                itemStyle={{ color: '#fff', fontWeight: '900', fontSize: '18px' }}
                labelStyle={{ color: '#94a3b8', fontWeight: '700', marginBottom: '4px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              />
              <Bar 
                dataKey="applications" 
                fill="url(#barGradient)" 
                radius={[12, 12, 12, 12]} 
                barSize={45} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ready for Offer Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" /> Action Required: Ready for Offer
            </h3>
          </div>
          
          {stats.adminApproved?.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center h-[300px]">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h4 className="text-2xl font-black text-slate-700">Inbox Zero!</h4>
              <p className="text-slate-500 mt-2 font-medium">You have no pending candidates waiting for offer letters.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-emerald-50">
                {stats.adminApproved.map(app => (
                  <div key={app.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/10 hover:bg-emerald-50/40 transition-colors gap-4 group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm border border-emerald-300/30">
                        {app.jobSeeker?.name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <p className="text-[#0F172A] font-black text-lg">{app.jobSeeker?.name}</p>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">
                          Approved for <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md ml-1">{app.JobPost?.title}</span>
                        </p>
                      </div>
                    </div>
                    <Link to={`/hr/offer-letter/${app.id}`} className="shrink-0 inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all group-hover:bg-emerald-600">
                      Send Offer Letter <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Recent Followers Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#F97316]" /> Recent Followers
          </h3>
          
          {stats.recentFollowers?.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center h-[300px] flex flex-col items-center justify-center">
              <UserPlus className="w-10 h-10 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No recent follows.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 h-[300px] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                {stats.recentFollowers?.map(f => (
                  <div 
                    key={f.id} 
                    onClick={() => setSelectedUser(f.jobSeeker)}
                    className="p-4 rounded-2xl hover:bg-orange-50 border border-transparent hover:border-orange-100 flex items-center gap-4 cursor-pointer transition-all group"
                  >
                    <div className="h-12 w-12 bg-[#0F172A] rounded-xl flex items-center justify-center font-bold text-white shadow-sm">
                      {f.jobSeeker?.name?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-bold group-hover:text-[#F97316] transition-colors">{f.jobSeeker?.name}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{new Date(f.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Applications Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-500" /> New Application Notifications
        </h3>
        
        {stats.recentApplications?.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center">
            <FileText className="w-10 h-10 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No recent applications.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {stats.recentApplications?.map(app => (
                <div key={app.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4 group border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm border border-blue-300/30">
                      {app.jobSeeker?.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="text-[#0F172A] font-black text-lg">New Application from {app.jobSeeker?.name}</p>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Applied for <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md ml-1">{app.JobPost?.title}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        {new Date(app.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/hr/jobs`} className="shrink-0 inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm transition-all">
                    View Applications <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Candidate Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="h-24 bg-[#0F172A] relative">
              <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-8 pb-8 relative">
              <div className="h-24 w-24 bg-gradient-to-br from-[#F97316] to-orange-500 text-white rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl shadow-orange-500/30 -mt-12 mb-6 border-4 border-white relative z-10 mx-auto">
                {selectedUser.name?.charAt(0)}
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-[#0F172A]">{selectedUser.name}</h3>
                <span className="inline-block mt-2 text-xs font-bold px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#F97316] rounded-full uppercase tracking-wider">
                  New Follower
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                    <Mail className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <span className="font-bold">{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                    <Phone className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <span className="font-bold">{selectedUser.phoneNumber || 'Not provided'}</span>
                </div>

                {selectedUser.linkedinUrl && (
                  <a href={selectedUser.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 bg-blue-50/50 hover:bg-blue-50 p-4 rounded-2xl border border-blue-100 transition-colors group cursor-pointer">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-blue-100 text-[#0A66C2]">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="font-bold flex-1 text-[#0A66C2]">LinkedIn Profile</span>
                    <ExternalLink className="w-4 h-4 text-blue-300 group-hover:text-[#0A66C2] transition-colors" />
                  </a>
                )}

                {selectedUser.resumeUrl && (
                  <a href={selectedUser.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 bg-orange-50/50 hover:bg-orange-50 p-4 rounded-2xl border border-orange-100 transition-colors group cursor-pointer">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-orange-100 text-[#F97316]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-bold flex-1 text-[#F97316]">View Resume</span>
                    <ExternalLink className="w-4 h-4 text-orange-300 group-hover:text-[#F97316] transition-colors" />
                  </a>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 font-medium text-center">
                  This candidate is following your company but may not have applied to a specific job yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
