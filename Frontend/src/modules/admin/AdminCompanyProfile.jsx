import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Building, Mail, Phone, Globe, Edit, Save, X, Briefcase, User } from 'lucide-react';

export default function AdminCompanyProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    website: '',
    description: '',
  });
  
  // We'll also keep a local state of company to reflect updates immediately
  const [company, setCompany] = useState(user?.Company || {
    companyName: 'Loading...',
    companyEmail: 'Loading...',
    companyPhone: 'Loading...',
    website: 'Loading...',
    description: 'Loading...',
  });

  useEffect(() => {
    if (user?.Company) {
      setCompany(user.Company);
      setFormData({
        companyName: user.Company.companyName || '',
        companyEmail: user.Company.companyEmail || '',
        companyPhone: user.Company.companyPhone || '',
        website: user.Company.website || '',
        description: user.Company.description || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company.id) return;
    setLoading(true);
    try {
      const res = await api.put(`/companies/${company.id}`, formData);
      setCompany(res.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update company profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">Company Profile</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your corporate identity and contact details.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
          >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
             <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition-all"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 disabled:opacity-70"
            >
              <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
        <div className="h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
           <div className="absolute -bottom-16 left-8 md:left-12 w-32 h-32 bg-white rounded-2xl p-2 shadow-2xl border border-white flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-orange-50 rounded-xl flex items-center justify-center">
                 <Building className="w-12 h-12 text-orange-500" />
              </div>
           </div>
        </div>
        
        <div className="pt-20 px-8 md:px-12 pb-12">
          {!isEditing ? (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black text-slate-900 mb-2">{company.companyName}</h2>
              <p className="text-slate-500 mb-10 max-w-3xl leading-relaxed text-lg">{company.description || 'No description provided.'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-colors">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-700 group/item">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover/item:border-orange-200 transition-colors">
                         <Mail className="w-4 h-4 text-slate-400 group-hover/item:text-orange-500" />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-medium mb-0.5">Email Address</p>
                         <span className="font-semibold">{company.companyEmail}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 group/item">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover/item:border-orange-200 transition-colors">
                         <Phone className="w-4 h-4 text-slate-400 group-hover/item:text-orange-500" />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-medium mb-0.5">Phone Number</p>
                         <span className="font-semibold">{company.companyPhone || 'Not provided'}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 group/item">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover/item:border-orange-200 transition-colors">
                         <Globe className="w-4 h-4 text-slate-400 group-hover/item:text-orange-500" />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-medium mb-0.5">Website</p>
                         {company.website ? (
                           <a href={company.website} target="_blank" rel="noreferrer" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                             {company.website}
                           </a>
                         ) : (
                           <span className="font-semibold">Not provided</span>
                         )}
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg text-white">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <User className="w-4 h-4" /> Primary Administrator
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-xl font-black shadow-inner">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{user?.name}</p>
                      <p className="text-slate-300 font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Role</span>
                      <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded-md">COMPANY ADMIN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Status</span>
                      <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Company Name</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Company Email</label>
                  <input 
                    type="email" 
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="contact@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input 
                    type="text" 
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Website URL</label>
                  <input 
                    type="url" 
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Company Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium resize-none"
                    placeholder="Briefly describe your company's mission and culture..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}