import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';

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

  const totalApplications = stats.pendingVerifications.length + stats.resolvedCandidates.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-[#0F172A]">Dashboard Overview</h1>
      <p className="text-slate-600">Welcome to your company admin portal. Here is a summary of your recruitment operations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {[
          { label: 'Total HR', value: stats.hrCount, icon: Users, color: 'bg-orange-100 text-[#F97316]' },
          { label: 'Active Jobs', value: stats.jobPostsCount, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
          { label: 'Total Applications', value: totalApplications, icon: FileText, color: 'bg-purple-100 text-purple-600' },
          { label: 'Resolved Candidates', value: stats.resolvedCandidates.length, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 flex items-center gap-4 hover:shadow-md transition-shadow cursor-default">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-black text-[#0F172A]">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-sm border border-orange-50 p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Recent Pending Verifications</h2>
        <div className="space-y-4">
          {stats.pendingVerifications.length === 0 ? (
            <p className="text-slate-500 italic">No recent verifications pending.</p>
          ) : (
            stats.pendingVerifications.map((app, index) => (
              <div key={index} className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex justify-between items-center">
                 <p className="text-[#0F172A] font-medium">Candidate Application for <span className="font-bold text-[#F97316]">{app.JobPost?.title || 'Unknown Job'}</span> requires verification.</p>
                 <span className="text-sm font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">Pending</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}