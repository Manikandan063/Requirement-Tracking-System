import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Button } from '../../components/ui/Button';

export default function RegisterCompany() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '', companyEmail: '', companyPhone: '', website: '', description: '',
    adminName: '', adminEmail: '', adminPhone: '', password: ''
  });

  // Note: Needs a backend endpoint to handle creating company + admin in one go.
  // Assuming POST /companies/register
  const handleSubmit = async () => {
    try {
      await api.post('/companies/register', formData);
      alert('Company registration successful! Please login as Admin.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering company');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
        <h2 className="text-3xl font-black text-[#0F172A] mb-2 text-center">Register Your Company</h2>
        <p className="text-slate-500 mb-8 text-center">Set up your workspace to start hiring top talent</p>
        
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-2 rounded-full mx-1 ${step >= s ? 'bg-[#F97316]' : 'bg-slate-200'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Company Details</h3>
            <input type="text" placeholder="Company Name" onChange={e=>setFormData({...formData, companyName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <input type="email" placeholder="Company Email" onChange={e=>setFormData({...formData, companyEmail: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <input type="text" placeholder="Website" onChange={e=>setFormData({...formData, website: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <textarea placeholder="Description" rows={3} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none"></textarea>
            <Button onClick={()=>setStep(2)} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-lg font-bold">Next: Admin Info</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Admin Account</h3>
            <input type="text" placeholder="Admin Full Name" onChange={e=>setFormData({...formData, adminName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <input type="email" placeholder="Admin Email" onChange={e=>setFormData({...formData, adminEmail: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <input type="text" placeholder="Admin Phone" onChange={e=>setFormData({...formData, adminPhone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <input type="password" placeholder="Password" onChange={e=>setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#F97316] outline-none" />
            <div className="flex gap-4">
              <Button variant="secondary" onClick={()=>setStep(1)} className="flex-1 py-3 rounded-lg font-bold">Back</Button>
              <Button onClick={()=>setStep(3)} className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-lg font-bold">Review</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Review & Submit</h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
               <p><strong>Company:</strong> {formData.companyName}</p>
               <p><strong>Admin Email:</strong> {formData.adminEmail}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={()=>setStep(2)} className="flex-1 py-3 rounded-lg font-bold">Back</Button>
              <Button onClick={handleSubmit} className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg font-bold text-lg">Register Company</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}