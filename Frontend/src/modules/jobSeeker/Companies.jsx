import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Plus, Check, Loader2, ArrowRight, Building, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfinityLoader from '../../components/InfinityLoader';

const FollowButton = ({ isFollowing, onToggle, companyName, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    const wasFollowing = isFollowing;
    
    await onToggle();
    
    if (!wasFollowing) {
      setShowSparkles(true);
      setShowToast(true);
      setTimeout(() => setShowSparkles(false), 800);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="relative flex justify-center">
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={isLoading ? {} : { scale: 0.95 }}
        onClick={handleClick}
        className={`relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 min-w-[110px] select-none border focus:outline-none
          ${isLoading ? 'opacity-80 cursor-wait' : ''}
          ${isFollowing
            ? isHovered
              ? 'bg-red-50 text-red-600 border-red-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700'
          }
        `}
      >
        {showSparkles && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 bg-emerald-400 rounded-lg blur-md pointer-events-none z-0"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 border-2 border-emerald-400 rounded-lg pointer-events-none z-0"
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: [0, Math.cos((i * 60) * (Math.PI / 180)) * 40],
                    y: [0, Math.sin((i * 60) * (Math.PI / 180)) * 40],
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full"
                />
              ))}
            </div>
          </>
        )}

        <div className="relative z-10 flex items-center gap-1.5">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loader" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5 }}>
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            ) : isFollowing ? (
              isHovered ? (
                <motion.div key="unfollow" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div 
                  key="check" 
                  initial={showSparkles ? { scale: 0, rotate: -45 } : false} 
                  animate={{ scale: 1, rotate: 0 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )
            ) : (
              <motion.div key="plus" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                <Plus className="w-4 h-4 text-slate-500" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.span 
              key={isFollowing ? (isHovered ? 'unfollow' : 'following') : 'follow'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              {isFollowing ? (isHovered ? 'Unfollow' : 'Following') : 'Follow'}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none whitespace-nowrap bg-[#0F172A] text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl z-50 flex items-center gap-2"
          >
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            You are now following {companyName}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/companies').then(res => setCompanies(res.data.data)),
      api.get('/follows/my-companies').then(res => setFollowing(res.data.data.map(f => f.companyId)))
    ])
    .catch(console.error)
    .finally(() => setIsPageLoading(false));
  }, []);

  if (isPageLoading) {
    return <InfinityLoader text="Loading top companies..." />;
  }

  const handleToggleFollow = async (companyId, isFollowing) => {
    setLoadingId(companyId);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      if (isFollowing) {
        await api.delete(`/follows/${companyId}`);
        setFollowing(following.filter(id => id !== companyId));
      } else {
        await api.post(`/follows/${companyId}`);
        setFollowing([...following, companyId]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  // Removed getBannerGradient as we are using a clean minimalist card design

  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-fade-in pb-16 pt-6">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0F172A] p-10 md:p-16 border border-slate-700">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
          <Building className="w-64 h-64 text-white" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Discover Top Companies</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Curate your professional network. Follow industry leaders to receive instant updates on their latest opportunities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((c, i) => {
          const isFollowing = following.includes(c.id);
          const isLoading = loadingId === c.id;
          
          return (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md hover:border-l-blue-600 transition-all duration-300 flex flex-col h-full group"
            >
              {/* SaaS Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-14 w-14 bg-slate-50 rounded-lg flex items-center justify-center text-2xl font-black text-indigo-600 border border-slate-100 group-hover:scale-105 transition-transform">
                    {c.companyName.charAt(0)}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {c.website && (
                      <span className="flex items-center text-[11px] font-bold tracking-wide text-slate-500 uppercase bg-slate-100 px-2.5 py-1 rounded">
                        <Globe className="w-3 h-3 mr-1.5" /> Website
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {c.companyName}
                </h3>
                <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">
                  Tech Industry
                </p>
              </div>
              
              {/* Card Body */}
              <div className="px-6 pb-6 flex-1">
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {c.description || 'A highly innovative technology enterprise providing advanced solutions and robust professional development opportunities.'}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto flex items-center justify-between rounded-b-xl">
                <FollowButton 
                  isFollowing={isFollowing} 
                  isLoading={isLoading}
                  companyName={c.companyName}
                  onToggle={() => handleToggleFollow(c.id, isFollowing)} 
                />
                
                <Link to={`/jobs?q=${encodeURIComponent(c.companyName)}`} className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1 group/link transition-colors">
                  Jobs <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
