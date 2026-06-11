import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Camera, Mail, Phone, MapPin, User, CheckCircle, ShieldCheck, Linkedin, UploadCloud, FileText, Trophy, Github, Edit2, X } from 'lucide-react';
import Confetti from 'react-confetti';

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', phoneNumber: '', linkedinUrl: '', githubUrl: '', resumeUrl: '', bio: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasOffer, setHasOffer] = useState(false);
  const [stats, setStats] = useState({ applicationsCount: 0, interviewsCount: 0, offerLettersCount: 0, followsCount: 0 });

  useEffect(() => {
    // Fetch profile and check for offer simultaneously
    Promise.all([
      api.get('/auth/me'),
      api.get('/applications/my-applications')
    ]).then(([profileRes, appsRes]) => {
      // Profile setup
      const p = profileRes.data.data;
      setProfile({ 
        name: p.name, 
        email: p.email, 
        phoneNumber: p.phoneNumber || '',
        linkedinUrl: p.linkedinUrl || '',
        githubUrl: p.githubUrl || '',
        resumeUrl: p.resumeUrl || '',
        bio: p.bio || ''
      });

      // Achievement / Offer Check
      const applications = appsRes.data.data || [];
      const gotOffer = applications.some(app => app.status === 'OFFER_LETTER_SENT' || app.status === 'HIRED');
      if (gotOffer) {
        setHasOffer(true);
        
        // Ensure confetti only shows once per user
        const confettiKey = `confetti_seen_${p.email}`;
        if (!localStorage.getItem(confettiKey)) {
          setShowConfetti(true);
          localStorage.setItem(confettiKey, 'true');
          setTimeout(() => setShowConfetti(false), 8000);
        }
      }
    }).catch(console.error);

    // Fetch dashboard stats for Instagram-style profile stats
    api.get('/dashboard/job-seeker').then(res => setStats(res.data.data)).catch(console.error);
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
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti 
            width={window.innerWidth} 
            height={window.innerHeight} 
            recycle={false} 
            numberOfPieces={600} 
            gravity={0.15}
          />
        </div>
      )}
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
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-start sm:items-center">
                <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">{profile.name || 'Your Name'}</h1>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`sm:hidden bg-white/80 backdrop-blur border text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-all ${isEditing ? 'border-red-200 hover:text-red-500 hover:border-red-500' : 'border-slate-200 hover:text-[#38BDF8] hover:border-[#38BDF8]'}`}
                >
                  {isEditing ? <><X className="w-4 h-4"/> Close</> : <><Edit2 className="w-4 h-4"/> Edit</>}
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-2 max-w-lg leading-relaxed font-medium">
                 {profile.bio || "Add a professional summary to make your profile stand out to recruiters."}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
                  <MapPin className="w-4 h-4 text-slate-400"/> Open to Work
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">
                  <ShieldCheck className="w-4 h-4"/> Verified Candidate
                </span>
                {hasOffer && (
                  <span className="flex items-center gap-1.5 text-sm font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200 shadow-sm animate-pulse-slow">
                    <Trophy className="w-4 h-4 text-amber-500" /> Offer Received!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3">
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-[#0A66C2] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
                    <Linkedin className="w-4 h-4"/> LinkedIn
                  </a>
                )}
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors">
                    <Github className="w-4 h-4"/> GitHub
                  </a>
                )}
              </div>
            </div>
            
            {/* Upgraded Premium Stats & Desktop Edit Button */}
            <div className="flex flex-col items-center sm:items-end gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`hidden sm:flex bg-white/80 backdrop-blur border text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm items-center gap-2 transition-all ${isEditing ? 'border-red-200 hover:text-red-500 hover:border-red-500' : 'border-slate-200 hover:text-[#38BDF8] hover:border-[#38BDF8]'}`}
              >
                {isEditing ? <><X className="w-4 h-4"/> Close Edit</> : <><Edit2 className="w-4 h-4"/> Edit Profile</>}
              </button>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 border-t sm:border-0 border-slate-100 pt-6 sm:pt-0 w-full sm:w-auto">
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50 transition-all min-w-[80px] sm:min-w-[90px]">
                <span className="block text-2xl sm:text-3xl font-black text-[#0F172A] bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-600">{stats.applicationsCount || 0}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Applied</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-purple-200 hover:bg-purple-50/50 transition-all min-w-[80px] sm:min-w-[90px]">
                <span className="block text-2xl sm:text-3xl font-black text-[#0F172A] bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-600">{stats.interviewsCount || 0}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Interviews</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-amber-200 hover:bg-amber-50/50 transition-all min-w-[80px] sm:min-w-[90px]">
                <span className="block text-2xl sm:text-3xl font-black text-amber-500">{stats.offerLettersCount || 0}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Offers</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all min-w-[80px] sm:min-w-[90px]">
                <span className="block text-2xl sm:text-3xl font-black text-[#0F172A] bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-600">{stats.followsCount || 0}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Following</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8 text-[#0F172A] pb-4 border-b border-slate-100">
          <User className="w-6 h-6 text-[#38BDF8]" /> Edit Personal Information
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
            <div>
              <label className={labelClass}>LinkedIn Profile URL</label>
              <div className="relative">
                 <Linkedin className={iconWrapperClass} />
                 <input className={`${inputClass} pl-12`} placeholder="https://linkedin.com/in/yourprofile" value={profile.linkedinUrl} onChange={e=>setProfile({...profile, linkedinUrl: e.target.value})} />
              </div>
            </div>

            {/* GitHub Profile */}
            <div>
              <label className={labelClass}>GitHub Profile URL</label>
              <div className="relative">
                 <Github className={iconWrapperClass} />
                 <input className={`${inputClass} pl-12`} placeholder="https://github.com/yourusername" value={profile.githubUrl} onChange={e=>setProfile({...profile, githubUrl: e.target.value})} />
              </div>
            </div>

            {/* Professional Bio */}
            <div className="md:col-span-2">
              <label className={labelClass}>Professional Summary / Bio</label>
              <div className="relative">
                 <FileText className={`${iconWrapperClass} !top-6 !translate-y-0`} />
                 <textarea 
                   rows="4"
                   className={`${inputClass} pl-12 resize-none leading-relaxed`} 
                   placeholder="Write a brief summary about your professional background, skills, and career goals..." 
                   value={profile.bio} 
                   onChange={e=>setProfile({...profile, bio: e.target.value})} 
                 />
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
      )}
    </div>
    </>
  );
}
