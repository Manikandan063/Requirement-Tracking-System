import { useAuth } from '../../context/AuthContext';
import { Building, Mail, Phone, Globe, Edit } from 'lucide-react';

export default function AdminCompanyProfile() {
  const { user } = useAuth();
  
  // In a real app, you would fetch the full company profile from /api/companies/:id
  // Here we use the user context which typically includes basic details
  const company = user?.Company || {
    companyName: 'Loading...',
    companyEmail: 'Loading...',
    companyPhone: 'Loading...',
    website: 'Loading...',
    description: 'Loading...',
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A]">Company Profile</h1>
          <p className="text-slate-600">Manage your company details and brand identity.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
          <Edit className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-slate-900 w-full relative">
           {/* Cover Photo Placeholder */}
           <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl p-2 shadow-lg border border-slate-100 flex items-center justify-center">
              <Building className="w-10 h-10 text-[#F97316]" />
           </div>
        </div>
        <div className="pt-16 p-8">
           <h2 className="text-2xl font-black text-[#0F172A] mb-1">{company.companyName}</h2>
           <p className="text-slate-500 mb-8">{company.description}</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span>{company.companyEmail}</span>
                 </div>
                 <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span>{company.companyPhone || 'Not provided'}</span>
                 </div>
                 <div className="flex items-center gap-3 text-slate-700">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <a href={company.website || '#'} className="text-[#0A66C2] hover:underline">
                      {company.website || 'Not provided'}
                    </a>
                 </div>
               </div>
             </div>
             
             <div>
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Account Details</h3>
               <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                 <p className="text-sm text-slate-500 mb-1">Company Administrator</p>
                 <p className="font-bold text-[#0F172A]">{user?.name}</p>
                 <p className="text-sm text-slate-500">{user?.email}</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}