import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications/my-applications').then(res => setApps(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Application Tracking</h1>
        <p className="text-slate-500 mt-2">Monitor the real-time status of all your submitted job applications.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-sm font-semibold text-slate-600">Role & Company</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Applied Date</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr><td colSpan="3" className="p-8 text-center text-slate-500">No applications yet.</td></tr>
              ) : apps.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0F172A] p-2 rounded-lg"><Briefcase className="w-4 h-4 text-white" /></div>
                      <div>
                        <p className="font-bold text-[#0F172A]">{a.JobPost?.title}</p>
                        <p className="text-sm text-slate-500">{a.JobPost?.Company?.companyName || 'Unknown Company'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 inline-block">
                      {a.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
