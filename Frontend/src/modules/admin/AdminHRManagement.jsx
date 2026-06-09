import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Mail, Building, Plus, Shield, CheckCircle, XCircle } from 'lucide-react';

export default function AdminHRManagement() {
  const [hrs, setHrs] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', department: '' });
  const [loading, setLoading] = useState(false);

  const fetchHrs = () => {
    api.get('/hrs').then(res => setHrs(res.data.data)).catch(console.error);
  };

  useEffect(() => { fetchHrs(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/hrs', formData);
      setFormData({ name: '', email: '', password: '', department: '' });
      fetchHrs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating HR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">HR Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Create and manage recruiter accounts for your organization.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
          <Shield className="w-64 h-64 text-white" />
        </div>
        
        <div className="relative z-10">
          <h3 className="mb-8 text-2xl font-black text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
               <Plus className="w-5 h-5 text-white" />
            </div>
            Provision New HR Account
          </h3>
          
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-1 space-y-1">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
               <input className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-500" placeholder="e.g. Jane Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="md:col-span-1 space-y-1">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
               <input className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-500" type="email" placeholder="jane@company.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="md:col-span-1 space-y-1">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</label>
               <input className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-500" placeholder="e.g. Engineering" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
            </div>
            <div className="md:col-span-1 space-y-1">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
               <input className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-500" type="password" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
            <div className="md:col-span-1 flex items-end">
               <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl py-3 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0">
                 {loading ? 'Provisioning...' : 'Create Account'}
               </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="p-6 md:px-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" /> Active HR Directory
           </h2>
           <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-xs">
              {hrs.length} {hrs.length === 1 ? 'Member' : 'Members'}
           </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-bold"><div className="flex items-center gap-2">Name</div></th>
                <th className="px-8 py-5 font-bold"><div className="flex items-center gap-2"><Building className="w-4 h-4"/> Department</div></th>
                <th className="px-8 py-5 font-bold"><div className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email</div></th>
                <th className="px-8 py-5 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {hrs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                       <Users className="w-12 h-12 text-slate-200 mb-4" />
                       <p className="text-slate-500 font-medium text-lg">No HR accounts provisioned yet.</p>
                       <p className="text-slate-400 text-sm">Use the form above to create the first recruiter account.</p>
                    </div>
                  </td>
                </tr>
              ) : hrs.map(hr => (
                <tr key={hr.id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 font-bold shadow-sm">
                        {hr.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-900 text-base">{hr.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm group-hover:border-orange-200 group-hover:text-orange-700 group-hover:bg-orange-50 transition-colors">
                      {hr.department || 'General HR'}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-medium text-slate-500">{hr.email}</td>
                  <td className="px-8 py-5 text-right">
                    {hr.isActive ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                       </span>
                    ) : (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-100 shadow-sm">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
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
  );
}