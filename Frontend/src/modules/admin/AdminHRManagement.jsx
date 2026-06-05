import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Mail, Building, Plus } from 'lucide-react';

export default function AdminHRManagement() {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0F172A]">HR Management</h1>
        <p className="text-slate-600">Create and manage recruiter accounts for your company.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="mb-6 text-xl font-bold text-[#0F172A] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#F97316]" /> Add New HR Member
        </h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" placeholder="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
          <input className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-lg py-3">Create Account</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
            <tr>
              <th className="p-5 font-bold"><div className="flex items-center gap-2"><Users className="w-4 h-4"/> Name</div></th>
              <th className="p-5 font-bold"><div className="flex items-center gap-2"><Building className="w-4 h-4"/> Department</div></th>
              <th className="p-5 font-bold"><div className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email</div></th>
              <th className="p-5 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hrs.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-slate-500">No HR members found.</td></tr>
            ) : hrs.map(hr => (
              <tr key={hr.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold text-slate-900">{hr.name}</td>
                <td className="p-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-[#0A66C2] border border-blue-100">
                    {hr.department || 'General HR'}
                  </span>
                </td>
                <td className="p-5">{hr.email}</td>
                <td className="p-5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${hr.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {hr.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}