import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Briefcase, FileText, CheckCircle, Activity, Bell, ChevronRight, Clock, AlertCircle, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    hrCount: 0,
    jobPostsCount: 0,
    pendingVerifications: [],
    resolvedCandidates: [],
  });

  useEffect(() => {
    api.get('/dashboard/company-admin')
      .then(res => setStats(res.data.data))
      .catch(console.error);
  }, []);

  const totalApplications = (stats?.pendingVerifications?.length || 0) + (stats?.resolvedCandidates?.length || 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Welcome to your command center. Here is a high-level summary of your recruitment operations.</p>
        </div>
      </div>
      
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
             <Users className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/10">
                <Users className="w-6 h-6 text-white" />
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Total HR Accounts</p>
             <h3 className="text-4xl font-black">{stats?.hrCount || 0}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
             <Briefcase className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/20">
                <Briefcase className="w-6 h-6 text-white" />
             </div>
             <p className="text-orange-100 font-bold uppercase tracking-widest text-xs mb-1">Active Job Posts</p>
             <h3 className="text-4xl font-black">{stats?.jobPostsCount || 0}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
             <FileText className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/20">
                <FileText className="w-6 h-6 text-white" />
             </div>
             <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-1">Total Applications</p>
             <h3 className="text-4xl font-black">{totalApplications}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
             <CheckCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/20">
                <CheckCircle className="w-6 h-6 text-white" />
             </div>
             <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-1">Resolved Outcomes</p>
             <h3 className="text-4xl font-black">{stats?.resolvedCandidates?.length || 0}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden h-full flex flex-col transition-colors duration-300">
            <div className="p-6 md:px-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center transition-colors duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" /> Pending Verifications
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Applications awaiting final review by your HR team.</p>
              </div>
              <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-colors">
                <AlertCircle className="w-3.5 h-3.5" /> {stats?.pendingVerifications?.length || 0} Pending
              </span>
            </div>
            
            <div className="p-6 md:px-8 flex-1 overflow-y-auto">
              {(!stats?.pendingVerifications || stats.pendingVerifications.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">All Caught Up!</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm">There are no pending verifications requiring your attention at this moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats?.pendingVerifications?.map((app, index) => (
                    <div key={index} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 group-hover:bg-orange-500 transition-colors"></div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold border border-orange-100 dark:border-orange-500/20 flex-shrink-0 transition-colors">
                          {app.JobPost?.title?.charAt(0).toUpperCase() || 'J'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-base mb-1">Application for <span className="text-orange-600 dark:text-orange-400">{app.JobPost?.title || 'Unknown Job'}</span></h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                             <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Awaiting HR Action</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                         <span className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors">
                           Verification Pending
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           {/* Quick Actions */}
           <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 md:p-8 transition-colors duration-300">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                 <Bell className="w-5 h-5 text-orange-500" /> Quick Actions
              </h3>
              <div className="space-y-3">
                 <Link to="/admin/hrs" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50 dark:hover:bg-orange-500/10 border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          <Users className="w-5 h-5" />
                       </div>
                       <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">Manage HR Staff</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                 </Link>
                 
                 <Link to="/admin/candidates" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          <UserCheck className="w-5 h-5" />
                       </div>
                       <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Review Candidates</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}