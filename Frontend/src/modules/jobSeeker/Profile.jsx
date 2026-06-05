import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Camera, Mail, Phone, MapPin, User, CheckCircle, ShieldCheck, Linkedin, UploadCloud, FileText } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', phoneNumber: '', linkedinUrl: '', resumeUrl: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/auth/me').then(res => {
      setProfile({ 
        name: res.data.data.name, 
        email: res.data.data.email, 
        phoneNumber: res.data.data.phoneNumber || '',
        linkedinUrl: res.data.data.linkedinUrl || '',
        resumeUrl: res.data.data.resumeUrl || ''
      });
    }).catch(console.error);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    try {
      await api.put('/job-seekers/profile', profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";
  const iconWrapperClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 h-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="h-40 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#38BDF8]"></div>
        
        <div className="px-8 pb-8">
          <div className="-mt-16 inline-block p-1.5 bg-white rounded-full shadow-lg relative z-10">
            <div className="h-28 w-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex flex-col items-center justify-center border border-slate-200 text-slate-400 group cursor-pointer hover:bg-slate-50 transition-colors relative overflow-hidden">
               {profile.name ? (
                 <span className="text-4xl font-black text-slate-700">{profile.name.charAt(0)}</span>
               ) : (
                 <Camera className="w-8 h-8" />
               )}
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
               </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 relative z-10">
            <div>
              <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">{profile.name || 'Your Name'}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  <MapPin className="w-4 h-4 text-slate-400"/> Open to Work
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                  <ShieldCheck className="w-4 h-4"/> Verified Candidate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8 text-[#0F172A] pb-4 border-b border-slate-100">
          <User className="w-6 h-6 text-[#38BDF8]" /> Personal Information
        </h2>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                 <User className={iconWrapperClass} />
                 <input required className={`${inputClass} pl-12`} placeholder="e.g. John Doe" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                 <Mail className={iconWrapperClass} />
                 <input disabled className={`${inputClass} pl-12 bg-slate-100 cursor-not-allowed opacity-70`} value={profile.email} />
              </div>
              <p className="text-xs font-medium text-slate-400 mt-2 ml-1">Email cannot be changed.</p>
            </div>
            
            <div>
              <label className={labelClass}>Phone Number</label>
              <div className="relative">
                 <Phone className={iconWrapperClass} />
                 <input className={`${inputClass} pl-12`} placeholder="e.g. +1 234 567 8900" value={profile.phoneNumber} onChange={e=>setProfile({...profile, phoneNumber: e.target.value})} />
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="md:col-span-2">
              <label className={labelClass}>LinkedIn Profile URL</label>
              <div className="relative">
                 <Linkedin className={iconWrapperClass} />
                 <input className={`${inputClass} pl-12`} placeholder="https://linkedin.com/in/yourprofile" value={profile.linkedinUrl} onChange={e=>setProfile({...profile, linkedinUrl: e.target.value})} />
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="md:col-span-2">
              <label className={labelClass}>Resume / CV</label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 p-8 text-center hover:bg-slate-100 hover:border-blue-400 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <UploadCloud className="w-8 h-8 text-[#38BDF8]" />
                </div>
                <h3 className="font-bold text-slate-700 mb-1">Upload your resume</h3>
                <p className="text-sm text-slate-500 mb-4">PDF, DOC, DOCX up to 5MB</p>
                
                {/* Fake file input for UI demonstration */}
                <input type="file" id="resumeUpload" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => {
                    if(e.target.files?.[0]) setProfile({...profile, resumeUrl: e.target.files[0].name})
                }} />
                
                {profile.resumeUrl ? (
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium text-sm">{profile.resumeUrl}</span>
                  </div>
                ) : (
                  <label htmlFor="resumeUpload" className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 cursor-pointer transition-colors">
                    Browse Files
                  </label>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-slate-100">
            {saved && (
              <span className="text-emerald-600 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <CheckCircle className="w-5 h-5" /> Saved successfully
              </span>
            )}
            <button disabled={isSaving} type="submit" className="bg-[#0F172A] hover:bg-slate-800 disabled:opacity-50 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2">
              {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
