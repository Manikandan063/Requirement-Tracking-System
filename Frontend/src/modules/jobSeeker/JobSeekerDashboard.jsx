import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Briefcase, Building, FileText, CheckCircle, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ applicationsCount: 0, followsCount: 0, recentJobs: [] });

  useEffect(() => {
    api.get('/dashboard/job-seeker').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  const cards = [
    { title: 'Applied Jobs', value: stats.applicationsCount, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100', link: '/job-seeker/applications' },
    { title: 'Interview Invitations', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', link: '/job-seeker/interviews' },
    { title: 'Offer Letters', value: '0', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100', link: '/job-seeker/applications' },
    { title: 'Followed Companies', value: stats.followsCount || 0, icon: Building, color: 'text-orange-600', bg: 'bg-orange-100', link: '/job-seeker/companies' },
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-white to-[#FFF7ED]"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Welcome Back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="mt-2 text-[#475569] text-lg">Find your next opportunity today.</p>
        </div>
        <div className="mt-6 md:mt-0">
          <Link to="/job-seeker/jobs" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-colors inline-block">
            Explore Jobs
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <h3 className="text-3xl font-bold text-[#0F172A] mt-2">{card.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${card.bg}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
              <Link to={card.link} className="text-[#F97316] text-sm font-medium mt-4 inline-block hover:underline">
                View Details →
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center">
          <BellRing className="w-5 h-5 mr-2 text-[#F97316]" /> Recent Postings From Followed Companies
        </h3>
        
        {stats.recentJobs?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
            No new job postings from your followed companies.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {stats.recentJobs?.map((job, index) => (
              <div key={job.id} className={`p-6 flex items-center justify-between transition-colors hover:bg-slate-50 ${index !== stats.recentJobs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-[#0F172A] text-xl">
                    {job.Company?.companyName?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A]">{job.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{job.Company?.companyName} • {job.location || 'Remote'}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">{job.jobType || 'Full-Time'}</span>
                      <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded font-medium">New</span>
                    </div>
                  </div>
                </div>
                <Link to={`/job-seeker/jobs/${job.id}/apply`}>
                  <button className="hidden sm:block border border-slate-200 hover:border-[#F97316] text-slate-700 hover:text-[#F97316] px-6 py-2 rounded-xl font-medium transition-colors">
                    View Job
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
