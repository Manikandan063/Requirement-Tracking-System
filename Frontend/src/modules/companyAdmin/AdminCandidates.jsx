import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export default function AdminCandidates() {
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
    <div className="space-y-6">
      <PageHeader title="Resolved Candidates" description="Review candidates that have completed final verification." />
      
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Search className="w-5 h-5 text-slate-400" />
        <Input 
          className="border-0 shadow-none focus-visible:ring-0 p-0 text-base" 
          placeholder="Search by candidate name or job title..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold">Candidate Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Job Role</th>
              <th className="p-4 font-bold">Final Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">No candidates found.</td>
              </tr>
            ) : filtered.map(app => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{app.name}</td>
                <td className="p-4">{app.email}</td>
                <td className="p-4 font-medium">{app.JobPost?.title}</td>
                <td className="p-4">
                  {app.status === 'ADMIN_VERIFIED' || app.status === 'OFFER_LETTER_SENT' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
                      <XCircle className="w-3 h-3" /> Rejected
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
