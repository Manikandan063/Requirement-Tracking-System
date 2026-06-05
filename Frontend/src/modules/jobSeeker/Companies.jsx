import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Building2, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    api.get('/companies').then(res => setCompanies(res.data.data)).catch(console.error);
    api.get('/follows/my-companies').then(res => setFollowing(res.data.data.map(f => f.companyId))).catch(console.error);
  }, []);

  const toggleFollow = async (companyId, isFollowing) => {
    try {
      if (isFollowing) {
        await api.delete(`/follows/${companyId}`);
        setFollowing(following.filter(id => id !== companyId));
      } else {
        await api.post(`/follows/${companyId}`);
        setFollowing([...following, companyId]);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Discover Companies</h1>
        <p className="text-slate-500 mt-2">Find and follow top employers to stay updated on their open roles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c, i) => {
          const isFollowing = following.includes(c.id);
          return (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-bold text-[#0F172A]">
                  {c.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{c.companyName}</h3>
                  <div className="flex items-center text-slate-500 text-sm mt-1">
                    <Globe className="w-4 h-4 mr-1" /> {c.website ? 'Website Available' : 'Tech Industry'}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                {c.description || 'A leading company in its sector, offering great opportunities for growth.'}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <button 
                  onClick={() => toggleFollow(c.id, isFollowing)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isFollowing ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-[#0F172A] text-white hover:bg-slate-800'}`}
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </button>
                <Link to={`/jobs?q=${encodeURIComponent(c.companyName)}`} className="text-[#0A66C2] text-sm font-bold hover:underline">
                  View Jobs
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
