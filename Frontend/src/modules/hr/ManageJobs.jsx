import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Users, XCircle, Trash2, CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if(user?.companyId) {
      api.get(`/job-posts/company/${user.companyId}`).then(res => {
        const myJobs = res.data.data.filter(j => j.hrId === user.id);
        setJobs(myJobs);
      }).catch(console.error);
    }
  }, [user]);

  const closeJob = async (id) => {
    if (window.confirm('Are you sure you want to close this job? It will no longer accept applications.')) {
      try {
        await api.put(`/job-posts/${id}`, { status: 'CLOSED' });
        setJobs(jobs.map(j => j.id === id ? { ...j, status: 'CLOSED' } : j));
      } catch (err) {
        alert('Error closing job');
      }
    }
  }

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
      try {
        await api.delete(`/job-posts/${id}`);
        setJobs(jobs.filter(j => j.id !== id));
      } catch (err) {
        alert('Error deleting job');
      }
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] mb-2">Manage Jobs</h1>
          <p className="text-slate-500 font-medium">View and manage your active and closed job postings.</p>
        </div>
        <Link to="/hr/jobs/create" className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#084e96] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all">
          + Create New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">No jobs posted yet</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't created any job postings. Create your first job post to start accepting applications.</p>
          <Link to="/hr/jobs/create" className="inline-flex bg-[#0A66C2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#084e96] transition-colors">
            Publish First Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {jobs.map(j => (
            <div key={j.id} className={`bg-white rounded-3xl p-6 md:p-8 border shadow-sm relative overflow-hidden transition-all group ${j.status === 'CLOSED' ? 'border-slate-200 bg-slate-50' : 'border-blue-100 hover:shadow-md hover:border-blue-200'}`}>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${j.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {j.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0A66C2]">
                      {j.category}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black ${j.status === 'CLOSED' ? 'text-slate-600' : 'text-[#0F172A]'}`}>{j.title}</h3>
                </div>
                
                {j.status === 'ACTIVE' && (
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[#0A66C2]" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{j.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{j.jobType || 'Full-time'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <Link to={`/hr/jobs/${j.id}/applicants`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                  <Users className="w-4 h-4" /> View Applicants
                </Link>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {j.status === 'ACTIVE' && (
                    <button onClick={() => closeJob(j.id)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2.5 rounded-xl font-bold transition-colors">
                      <XCircle className="w-4 h-4" /> Close
                    </button>
                  )}
                  <button onClick={() => deleteJob(j.id)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
