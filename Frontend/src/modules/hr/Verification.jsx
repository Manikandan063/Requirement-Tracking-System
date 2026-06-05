import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function Verification() {
  const { applicationId } = useParams();
  const [verification, setVerification] = useState(null);
  const [category, setCategory] = useState('IT');
  const [email, setEmail] = useState('');

  const handleSearch = async () => {
    try {
      const res = await api.post(`/verification/${applicationId}/search`, { candidateEmail: email, jobCategory: category });
      setVerification(res.data.data);
    } catch (err) {
      alert('Error searching verification');
    }
  };

  const handleVerify = async (status) => {
    try {
      await api.put(`/verification/${applicationId}/verify`, { status, remarks: 'Checked by HR' });
      alert('Verification updated');
      setVerification({ ...verification, verificationStatus: status });
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Candidate Verification" description="Verify candidate profiles across multiple platforms" />
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex gap-4 mb-6">
          <input type="email" placeholder="Candidate Email" className="border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          <select className="border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="IT">IT</option>
            <option value="NON_IT">NON_IT</option>
          </select>
          <Button onClick={handleSearch}>Generate Verification Report</Button>
        </div>
        
        {verification && (
          <div>
            <div className="mb-4"><strong>Global Status:</strong> <Badge>{verification.verificationStatus}</Badge></div>
            <Table>
              <TableHeader><TableRow><TableHead>Platform</TableHead><TableHead>Found</TableHead><TableHead>Note</TableHead></TableRow></TableHeader>
              <TableBody>
                {verification.verificationSources?.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell>{s.platformName}</TableCell>
                    <TableCell>{s.profileFound ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{s.verificationNote}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-x-2">
              <Button variant="success" onClick={() => handleVerify('VERIFIED')}>Mark as Verified</Button>
              <Button variant="danger" onClick={() => handleVerify('REJECTED')}>Reject</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
