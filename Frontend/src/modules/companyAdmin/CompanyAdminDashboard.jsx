import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Users, Briefcase, CheckCircle, XCircle, Eye, FileText, Phone, Mail, Award, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function CompanyAdminDashboard() {
  const [stats, setStats] = useState({ hrCount: 0, jobPostsCount: 0, pendingVerifications: [] });
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchStats = () => {
    api.get('/dashboard/company-admin').then(res => setStats(res.data.data)).catch(console.error);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleVerify = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      setSelectedApp(null);
      fetchStats(); // Refresh dashboard
    } catch (err) {
      alert('Error updating verification status');
    }
  };

  return (
    <div>
      <PageHeader title="Company Admin Dashboard" description="Overview of your company." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total HRs</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.hrCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Posts</CardTitle>
            <Briefcase className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.jobPostsCount}</div></CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-[#0F172A]">Final Candidate Verifications</h2>
        {stats.pendingVerifications?.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500">
            No candidates pending final verification.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold">Candidate Name</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Job Role</th>
                  <th className="p-4 font-bold text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.pendingVerifications?.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{app.name}</td>
                    <td className="p-4">{app.email}</td>
                    <td className="p-4">{app.JobPost?.title}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => setSelectedApp(app)}>
                        <Eye className="w-4 h-4" /> View
                      </Button>
                      <Button size="sm" variant="success" className="flex items-center gap-1" onClick={() => handleVerify(app.id, 'ADMIN_VERIFIED')}>
                        <CheckCircle className="w-4 h-4" /> Approve
                      </Button>
                      <Button size="sm" variant="danger" className="flex items-center gap-1" onClick={() => handleVerify(app.id, 'REJECTED')}>
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto pt-20 pb-20">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 mt-auto mb-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Candidate Full Profile</h2>
                <p className="text-sm text-slate-500 mt-1">Applying for {selectedApp.JobPost?.title}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Profile Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 border-b pb-2">Personal Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Name:</span> {selectedApp.name}</p>
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Email:</span> {selectedApp.email}</p>
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Phone:</span> {selectedApp.phoneNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 border-b pb-2">Professional Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Education:</span> {selectedApp.education}</p>
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Experience:</span> {selectedApp.experience}</p>
                    <p><span className="font-semibold text-slate-600 w-24 inline-block">Skills:</span> <span className="font-bold text-blue-600">{selectedApp.skills}</span></p>
                  </div>
                </div>
              </div>

              {/* Resume */}
              {selectedApp.resumeUrl && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-500 w-6 h-6" />
                    <div>
                      <p className="font-bold text-blue-900">Resume Link</p>
                      <p className="text-xs text-blue-700">{selectedApp.resumeUrl}</p>
                    </div>
                  </div>
                  <a href={selectedApp.resumeUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="bg-white">View Resume</Button>
                  </a>
                </div>
              )}

              {/* Interview Performance */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Award className="w-5 h-5 text-orange-500"/> Interview Performance</h3>
                {selectedApp.Interview ? (
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider relative z-10">{selectedApp.Interview.round1Name || 'Round 1'}</p>
                      <p className={`font-black text-lg relative z-10 ${selectedApp.Interview.round1Status === 'SELECTED' ? 'text-green-600' : 'text-slate-600'}`}>{selectedApp.Interview.round1Status}</p>
                      {selectedApp.Interview.round1Score && <p className="text-sm font-semibold text-slate-500 mt-1 relative z-10">Score: {selectedApp.Interview.round1Score}</p>}
                      {selectedApp.Interview.round1Status === 'SELECTED' && <div className="absolute inset-0 bg-green-50 opacity-50 z-0"></div>}
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider relative z-10">{selectedApp.Interview.round2Name || 'Round 2'}</p>
                      <p className={`font-black text-lg relative z-10 ${selectedApp.Interview.round2Status === 'SELECTED' ? 'text-green-600' : 'text-slate-600'}`}>{selectedApp.Interview.round2Status}</p>
                      {selectedApp.Interview.round2Score && <p className="text-sm font-semibold text-slate-500 mt-1 relative z-10">Score: {selectedApp.Interview.round2Score}</p>}
                      {selectedApp.Interview.round2Status === 'SELECTED' && <div className="absolute inset-0 bg-green-50 opacity-50 z-0"></div>}
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider relative z-10">{selectedApp.Interview.round3Name || 'Round 3'}</p>
                      <p className={`font-black text-lg relative z-10 ${selectedApp.Interview.round3Status === 'SELECTED' ? 'text-green-600' : 'text-slate-600'}`}>{selectedApp.Interview.round3Status}</p>
                      {selectedApp.Interview.round3Score && <p className="text-sm font-semibold text-slate-500 mt-1 relative z-10">Score: {selectedApp.Interview.round3Score}</p>}
                      {selectedApp.Interview.round3Status === 'SELECTED' && <div className="absolute inset-0 bg-green-50 opacity-50 z-0"></div>}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic text-center py-2">No interview records found.</p>
                )}
              </div>
            </div>

            {/* Admin Action Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="danger" className="flex items-center gap-2 px-6" onClick={() => handleVerify(selectedApp.id, 'REJECTED')}>
                <XCircle className="w-5 h-5" /> Reject Candidate
              </Button>
              <Button variant="success" className="flex items-center gap-2 px-8" onClick={() => handleVerify(selectedApp.id, 'ADMIN_VERIFIED')}>
                <CheckCircle className="w-5 h-5" /> Approve Offer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
