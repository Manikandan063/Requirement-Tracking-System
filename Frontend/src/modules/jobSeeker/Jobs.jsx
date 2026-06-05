import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Button } from '../../components/ui/Button';
import { MapPin, Briefcase, DollarSign, Clock, Search } from 'lucide-react';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSearch = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    api.get('/job-posts').then(res => {
      setJobs(res.data.data);
      if(res.data.data.length > 0) setSelectedJob(res.data.data[0]);
    }).catch(console.error);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchQuery = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (job.Company?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchLocation = initialLocation ? (job.location || '').toLowerCase().includes(initialLocation.toLowerCase()) : true;
      return matchQuery && matchLocation;
    });
  }, [jobs, searchQuery, initialLocation]);

  useEffect(() => {
    if (filteredJobs.length > 0 && (!selectedJob || !filteredJobs.find(j => j.id === selectedJob.id))) {
      setSelectedJob(filteredJobs[0]);
    } else if (filteredJobs.length === 0) {
      setSelectedJob(null);
    }
  }, [filteredJobs]);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Left List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-lg mb-3 text-gray-900">Recommended Jobs</h2>
          <div className="relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search in jobs..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#0A66C2] outline-none" 
             />
          </div>
          {initialLocation && <p className="text-xs text-blue-600 mt-2 font-medium bg-blue-50 px-2 py-1 rounded inline-block">Filtered by location: {initialLocation}</p>}
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No jobs found matching your search.</div>
          ) : filteredJobs.map(job => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className={`p-5 cursor-pointer border-b border-gray-100 hover:bg-white transition-colors ${selectedJob?.id === job.id ? 'bg-white border-l-4 border-l-[#0A66C2]' : ''}`}
            >
              <h3 className="font-bold text-[#0A66C2] text-lg mb-1">{job.title}</h3>
              <p className="text-gray-900 font-medium mb-2">{job.Company?.name || 'Company Name'}</p>
              <div className="flex flex-col gap-1 text-sm text-gray-500">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{job.location}</span>
                <span className="flex items-center"><DollarSign className="w-4 h-4 mr-2" />{job.salary}</span>
              </div>
              <div className="mt-3 text-xs text-gray-400">Posted {new Date(job.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Details */}
      <div className="w-2/3 flex flex-col bg-white overflow-y-auto">
        {selectedJob ? (
          <div className="p-8">
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-200">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">{selectedJob.title}</h1>
                <h2 className="text-xl text-gray-700 mb-4">{selectedJob.Company?.companyName || 'Company Name'} • {selectedJob.location}</h2>
                <div className="flex gap-4">
                  <Button onClick={() => navigate(`/jobs/${selectedJob.id}/apply`)} className="bg-[#0A66C2] hover:bg-[#084e96] text-white px-8 font-bold shadow-lg shadow-blue-500/20">Apply Now</Button>
                  <Button variant="secondary" className="border-gray-300 font-bold">Save Job</Button>
                </div>
              </div>
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shadow-inner">
                {selectedJob.Company?.name?.charAt(0) || 'C'}
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-800">
              <h3 className="text-xl font-bold mb-4">Job Description</h3>
              <p className="mb-8 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
              
              <h3 className="text-xl font-bold mb-4">Requirements & Skills</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                 {selectedJob.skills?.split(',').map(s => (
                   <span key={s} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{s.trim()}</span>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Job Type</h4>
                  <p className="text-gray-600 flex items-center"><Briefcase className="w-4 h-4 mr-2" />{selectedJob.jobType}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Experience</h4>
                  <p className="text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-2" />{selectedJob.experience}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a job to view details
          </div>
        )}
      </div>
    </div>
  );
}