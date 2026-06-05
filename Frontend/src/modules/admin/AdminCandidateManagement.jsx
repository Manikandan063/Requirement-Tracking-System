import { useEffect, useState } from 'react';
import api from '../../services/api';
import { CheckCircle, XCircle, Search, Mail, Briefcase } from 'lucide-react';

export default function AdminCandidateManagement() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/dashboard/company-admin')
      .then(res => setCandidates(res.data.data.resolvedCandidates || []))
      .catch(console.error);
  }, []);

  const filtered = candidates.filter(c => {
    const nameMatch = (c.name || '').toLowerCase().includes((search || '').toLowerCase());
    const jobMatch = (c.JobPost?.title || '').toLowerCase().includes((search || '').toLowerCase());
    return nameMatch || jobMatch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0F172A]">Candidate Management</h1>
        <p className="text-slate-600">Review final candidates and hiring decisions.</p>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
        <div className="pl-4">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input 
          className="w-full border-0 focus:ring-0 outline-none p-2 text-slate-700 bg-transparent" 
          placeholder="Search by candidate name or job title..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
            <tr>
              <th className="p-5 font-bold">Candidate Name</th>
              <th className="p-5 font-bold"><div className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email</div></th>
              <th className="p-5 font-bold"><div className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> Job Role</div></th>
              <th className="p-5 font-bold">Final Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">No candidates found.</td>
              </tr>
            ) : filtered.map(app => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold text-[#0F172A]">{app.name}</td>
                <td className="p-5">{app.email}</td>
                <td className="p-5 font-medium text-[#F97316]">{app.JobPost?.title}</td>
                <td className="p-5">
                  {app.status === 'ADMIN_VERIFIED' || app.status === 'OFFER_LETTER_SENT' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-green-100 text-green-700">
                      <CheckCircle className="w-4 h-4" /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-red-100 text-red-700">
                      <XCircle className="w-4 h-4" /> Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}