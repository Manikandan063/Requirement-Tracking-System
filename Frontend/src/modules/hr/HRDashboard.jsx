import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Briefcase, FileText, Bell, User, Mail, Phone, X, CheckCircle, ArrowRight, UserPlus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const [stats, setStats] = useState({ jobPostsCount: 0, applicationsCount: 0, recentFollowers: [], adminApproved: [] });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    api.get('/dashboard/hr').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-3xl font-black text-[#0F172A] mb-2">HR Overview</h1>
        <p className="text-slate-500 font-medium">Manage your active recruitment campaigns and track candidate pipelines.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-indigo-500/20 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-indigo-100 font-semibold mb-1 uppercase tracking-wider text-sm">Active Job Posts</p>
              <h2 className="text-5xl font-black">{stats.jobPostsCount}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0F172A] to-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-900/20 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-sm">Total Applications</p>
              <h2 className="text-5xl font-black">{stats.applicationsCount}</h2>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#F97316] to-orange-600 p-8 rounded-3xl shadow-lg shadow-orange-500/20 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-orange-100 font-semibold mb-1 uppercase tracking-wider text-sm">New Followers</p>
              <h2 className="text-5xl font-black">{stats.recentFollowers?.length || 0}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#0A66C2]" /> Applications Overview (This Week)
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0A66C2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0A66C2', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="applications" stroke="#0A66C2" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" /> Action Required: Ready for Offer
            </h3>
          </div>
          
          {stats.adminApproved?.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-slate-300" />
              </div>
              <h4 className="text-lg font-bold text-slate-700">All Caught Up!</h4>
              <p className="text-slate-500 mt-2">No pending candidates waiting for offer letters.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-emerald-50">
                {stats.adminApproved.map(app => (
                  <div key={app.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/20 hover:bg-emerald-50/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-lg">
                        {app.jobSeeker?.name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <p className="text-[#0F172A] font-semibold text-lg">{app.jobSeeker?.name}</p>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">
                          Approved for <span className="text-emerald-600 font-bold">{app.JobPost?.title}</span>
                        </p>
                      </div>
                    </div>
                    <Link to={`/hr/offer-letter/${app.id}`} className="shrink-0 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105">
                      Send Offer Letter <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#F97316]" /> Recent Followers
          </h3>
          
          {stats.recentFollowers?.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
              <p className="text-slate-500">No recent follows.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-2">
              {stats.recentFollowers?.map(f => (
                <div 
                  key={f.id} 
                  onClick={() => setSelectedUser(f.jobSeeker)}
                  className="p-4 rounded-2xl hover:bg-slate-50 flex items-center gap-4 cursor-pointer transition-colors group"
                >
                  <div className="h-12 w-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-700 shadow-sm">
                    {f.jobSeeker?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-bold">{f.jobSeeker?.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{new Date(f.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Candidate Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="h-20 w-20 bg-gradient-to-br from-[#F97316] to-orange-500 text-white rounded-3xl flex items-center justify-center font-black text-4xl shadow-lg shadow-orange-500/30 -mt-10 border-4 border-white">
                {selectedUser.name?.charAt(0)}
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 pt-6 space-y-8">
              <div>
                <h3 className="text-2xl font-black text-[#0F172A]">{selectedUser.name}</h3>
                <span className="inline-block mt-2 text-xs font-bold px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full">New Follower</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                  <div className="bg-white p-2 rounded-xl shadow-sm"><Mail className="w-5 h-5 text-slate-400" /></div>
                  <span className="font-semibold">{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                  <div className="bg-white p-2 rounded-xl shadow-sm"><Phone className="w-5 h-5 text-slate-400" /></div>
                  <span className="font-semibold">{selectedUser.phoneNumber || 'Not provided'}</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-500 font-medium text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                This candidate is following your company but may not have applied to a specific job yet.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
