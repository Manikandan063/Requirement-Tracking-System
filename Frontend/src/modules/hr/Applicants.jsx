import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function Applicants() {
  const { jobPostId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get(`/applications/hr/job/${jobPostId}`).then(res => setApps(res.data.data)).catch(console.error);
  }, [jobPostId]);

  return (
    <div className="space-y-6">
      <PageHeader title="Job Applicants" description="Candidates who applied for this position" />
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {apps.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell><Badge>{a.status}</Badge></TableCell>
                <TableCell className="space-x-2">
                  <Link to={`/hr/candidate/${a.id}`}><Button size="sm" variant="outline">Profile</Button></Link>
                  
                  <Link to={`/hr/verification/${a.id}`}>
                    <Button 
                      size="sm" 
                      variant={a.Verification?.verificationStatus === 'VERIFIED' ? 'success' : a.Verification?.verificationStatus === 'REJECTED' ? 'danger' : 'secondary'}
                    >
                      {a.Verification?.verificationStatus === 'VERIFIED' ? 'Verified ✓' : 'Verification'}
                    </Button>
                  </Link>

                  {a.Verification?.verificationStatus === 'VERIFIED' ? (
                    <Link to={`/hr/interview/${a.id}`}>
                      <Button size="sm" variant={a.Interview ? 'default' : 'outline'}>
                        {a.Interview ? 'Track Interview' : 'Schedule Interview'}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="opacity-50" title="Must verify candidate first">
                      Interview Lock
                    </Button>
                  )}

                  <Link to={`/hr/offer-letter/${a.id}`}><Button size="sm" variant="success">Offer Letter</Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
