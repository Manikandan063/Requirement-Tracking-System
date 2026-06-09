import { useEffect, useState } from 'react';
import api from '../../services/api';
import { CheckCircle, XCircle, Search, Mail, Briefcase, Users, UserCheck, FileText } from 'lucide-react';

export default function AdminCandidateManagement() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchCandidates = () => {
    api.get('/dashboard/company-admin')
      .then(res => {
        const pending = res.data.data.pendingVerifications || [];
        const resolved = res.data.data.resolvedCandidates || [];
        setCandidates([...pending, ...resolved]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleVerify = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      setSelectedApp(null);
      fetchCandidates();
    } catch (err) {
      alert('Error updating verification status');
    }
  };

  const filtered = candidates.filter(c => {
    const nameMatch = (c.name || '').toLowerCase().includes((search || '').toLowerCase());
    const jobMatch = (c.JobPost?.title || '').toLowerCase().includes((search || '').toLowerCase());
    return nameMatch || jobMatch;
  });

  return (
    <>
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">Candidate Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Review finalized candidates and manage hiring outcomes.</p>
        </div>
        
        <div className="w-full md:w-96 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm group-hover:shadow-md text-slate-700 font-medium placeholder:text-slate-400" 
            placeholder="Search by name or role..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
               <Users className="w-32 h-32" />
            </div>
            <div className="relative z-10">
               <p className="text-orange-100 font-bold uppercase tracking-wider text-xs mb-1">Pending Verification</p>
               <h3 className="text-4xl font-black">{candidates.filter(c => c.status === 'SENT_TO_ADMIN').length}</h3>
            </div>
         </div>
         <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
               <CheckCircle className="w-32 h-32" />
            </div>
            <div className="relative z-10">
               <p className="text-emerald-100 font-bold uppercase tracking-wider text-xs mb-1">Approved</p>
               <h3 className="text-4xl font-black">{candidates.filter(c => c.status === 'ADMIN_VERIFIED' || c.status === 'OFFER_LETTER_SENT').length}</h3>
            </div>
         </div>
         <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl shadow-red-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
               <XCircle className="w-32 h-32" />
            </div>
            <div className="relative z-10">
               <p className="text-red-100 font-bold uppercase tracking-wider text-xs mb-1">Rejected</p>
               <h3 className="text-4xl font-black">{candidates.filter(c => c.status === 'REJECTED').length}</h3>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="p-6 md:px-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-orange-500" /> Candidate Roster
           </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-bold">Candidate Name</th>
                <th className="px-8 py-5 font-bold"><div className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email Address</div></th>
                <th className="px-8 py-5 font-bold"><div className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> Job Role</div></th>
                <th className="px-8 py-5 font-bold text-right">Final Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                       <Search className="w-12 h-12 text-slate-200 mb-4" />
                       <p className="text-slate-500 font-medium text-lg">No candidates found.</p>
                       <p className="text-slate-400 text-sm">Adjust your search or check back later.</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold shadow-md">
                           {app.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-900 text-base">{app.name}</span>
                     </div>
                  </td>
                  <td className="px-8 py-5 font-medium text-slate-500">{app.email}</td>
                  <td className="px-8 py-5">
                     <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100 shadow-sm group-hover:bg-orange-100 transition-colors">
                        {app.JobPost?.title || 'Unknown Role'}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {app.status === 'SENT_TO_ADMIN' ? (
                      <button onClick={() => setSelectedApp(app)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors">
                        Review & Verify
                      </button>
                    ) : app.status === 'ADMIN_VERIFIED' || app.status === 'OFFER_LETTER_SENT' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-100 shadow-sm">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto pt-20 pb-20">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 mt-auto mb-auto border border-slate-200">
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Candidate Full Profile</h2>
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> Applying for <span className="text-orange-600 font-bold">{selectedApp.JobPost?.title}</span>
                </p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full shadow-sm border border-slate-200 transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Profile Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Personal Details</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">{selectedApp.name.charAt(0)}</div> <span className="font-bold text-slate-800 text-lg">{selectedApp.name}</span></p>
                    <p className="flex items-center gap-3 text-sm text-slate-600"><Mail className="w-4 h-4 text-slate-400"/> {selectedApp.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Professional Summary</h3>
                  <div className="space-y-3 text-sm">
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Education:</span> <span className="text-slate-800 font-medium">{selectedApp.education}</span></p>
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Experience:</span> <span className="text-slate-800 font-medium">{selectedApp.experience}</span></p>
                    <p><span className="font-semibold text-slate-500 w-24 inline-block">Skills:</span> <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{selectedApp.skills}</span></p>
                  </div>
                </div>
              </div>

              {/* Resume */}
              {selectedApp.resumeUrl && (
                <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                      <FileText className="text-indigo-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-indigo-900 text-sm">Resume Document</p>
                      <p className="text-xs text-indigo-500 mt-0.5 font-medium">{selectedApp.resumeUrl}</p>
                    </div>
                  </div>
                  <a href={selectedApp.resumeUrl} target="_blank" rel="noreferrer">
                    <button className="bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
                      View Resume
                    </button>
                  </a>
                </div>
              )}

              {/* Offer Letter */}
              {selectedApp.OfferLetter?.documentUrl && (
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-emerald-50">
                      <FileText className="text-emerald-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900 text-sm">Official Offer Letter</p>
                      <p className="text-xs text-emerald-600 mt-0.5 font-medium">Ready for download</p>
                    </div>
                  </div>
                  <a href={selectedApp.OfferLetter.documentUrl} target="_blank" rel="noreferrer">
                    <button className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
                      Download Offer Letter
                    </button>
                  </a>
                </div>
              )}

              {/* Interview Performance */}
              <div className="space-y-5 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg"><CheckCircle className="w-5 h-5 text-emerald-500"/> Interview Performance</h3>
                {selectedApp.Interview ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map(round => {
                      const status = selectedApp.Interview[`round${round}Status`];
                      const score = selectedApp.Interview[`round${round}Score`];
                      const name = selectedApp.Interview[`round${round}Name`];
                      return (
                        <div key={round} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                          {status === 'SELECTED' && <div className="absolute inset-0 bg-emerald-50/50 z-0"></div>}
                          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider relative z-10">{name || `Round ${round}`}</p>
                          <p className={`font-black text-xl relative z-10 ${status === 'SELECTED' ? 'text-emerald-600' : 'text-slate-700'}`}>{status || 'PENDING'}</p>
                          {score && <p className="text-sm font-bold text-slate-500 mt-2 relative z-10 bg-slate-50 inline-block px-2.5 py-1 rounded-lg border border-slate-100">Score: {score}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                    <p className="text-sm font-medium text-slate-500">No interview records found for this candidate.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Action Footer */}
            {selectedApp.status === 'SENT_TO_ADMIN' && (
              <div className="p-6 md:p-8 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-end gap-4">
                <button 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-white text-red-600 border-2 border-red-100 hover:bg-red-50 hover:border-red-200 transition-colors" 
                  onClick={() => handleVerify(selectedApp.id, 'REJECTED')}
                >
                  <XCircle className="w-5 h-5" /> Reject Candidate
                </button>
                <button 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-bold bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all" 
                  onClick={() => handleVerify(selectedApp.id, 'ADMIN_VERIFIED')}
                >
                  <CheckCircle className="w-5 h-5" /> Approve Offer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}