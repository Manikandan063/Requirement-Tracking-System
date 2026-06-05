import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ companyName: '', companyEmail: '' });

  const fetchCompanies = () => {
    api.get('/companies').then(res => setCompanies(res.data.data)).catch(console.error);
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/companies', formData);
      setFormData({ companyName: '', companyEmail: '' });
      fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating company');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Companies" description="Manage registered companies" />
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Create New Company</h3>
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input placeholder="Company Name" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
          <Input type="email" placeholder="Company Email" required value={formData.companyEmail} onChange={e => setFormData({...formData, companyEmail: e.target.value})} />
          <Button type="submit">Create</Button>
        </form>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {companies.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.companyName}</TableCell>
                <TableCell>{c.companyEmail}</TableCell>
                <TableCell>{c.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
