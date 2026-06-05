import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function HRManagement() {
  const [hrs, setHrs] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', department: '' });

  const fetchHrs = () => {
    api.get('/hrs').then(res => setHrs(res.data.data)).catch(console.error);
  };

  useEffect(() => { fetchHrs(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hrs', formData);
      setFormData({ name: '', email: '', password: '', department: '' });
      fetchHrs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating HR');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="HR Management" description="Manage HR accounts for your company" />
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Create New HR</h3>
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input placeholder="HR Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <Input type="email" placeholder="HR Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <Input placeholder="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
          <Input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <Button type="submit">Create HR</Button>
        </form>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {hrs.map(hr => (
              <TableRow key={hr.id}>
                <TableCell>{hr.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {hr.department || 'General HR'}
                  </span>
                </TableCell>
                <TableCell>{hr.email}</TableCell>
                <TableCell>{hr.isActive ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
