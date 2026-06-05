import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Badge } from '../../components/ui/Badge';

export default function CandidateProfile() {
  const { applicationId } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    api.get(`/applications/${applicationId}`).then(res => setApp(res.data.data)).catch(console.error);
  }, [applicationId]);

  if (!app) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Candidate Profile" description="Full details of the application" />
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <div><h3 className="font-semibold text-lg">{app.name}</h3><p className="text-slate-500">{app.email} • {app.phoneNumber}</p></div>
        <div><strong>Status:</strong> <Badge>{app.status}</Badge></div>
        <div><strong>Education:</strong> {app.education}</div>
        <div><strong>Skills:</strong> {app.skills}</div>
        <div><strong>Experience:</strong> {app.experience}</div>
        {app.resumeUrl && <div><a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Resume</a></div>}
      </div>
    </div>
  );
}
