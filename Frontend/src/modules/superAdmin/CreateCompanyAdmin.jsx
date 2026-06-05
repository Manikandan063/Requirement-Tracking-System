import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function CreateCompanyAdmin() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', companyId: '' });

  useEffect(() => {
    api.get('/companies').then(res => setCompanies(res.data.data)).catch(console.error);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/company-admins', formData);
      alert('Admin created successfully');
      setFormData({ name: '', email: '', password: '', companyId: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating admin');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Create Company Admin" description="Assign an admin to a company" />
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Select Company</label>
            <select required className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary" value={formData.companyId} onChange={e => setFormData({...formData, companyId: e.target.value})}>
              <option value="">Select a company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Admin Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Admin Email</label>
            <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <Input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <Button type="submit">Create Admin</Button>
        </form>
      </div>
    </div>
  );
}
