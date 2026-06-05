import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Mail, FileText, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function OfferLetter() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);
    try {
      await api.post(`/offer-letters/${applicationId}/send`, { offerLetterUrl: url });
      setStatus('success');
      setTimeout(() => navigate('/hr/dashboard'), 2000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Error sending offer letter (Make sure candidate is ADMIN_VERIFIED)');
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-[#0F172A] mb-2 flex items-center gap-3">
          <Mail className="w-8 h-8 text-[#0A66C2]" /> Dispatch Offer Letter
        </h1>
        <p className="text-slate-500 font-medium">Send the official job offer document to the verified candidate.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        
        <form onSubmit={handleSend} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Offer Letter Document URL</label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input 
                required 
                type="url"
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                placeholder="https://drive.google.com/file/d/..." 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 pl-12 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] outline-none transition-all shadow-inner"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 ml-1 font-medium">Ensure the URL is publicly accessible or shared with the candidate's email.</p>
          </div>

          {status === 'error' && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-sm font-medium">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-sm font-bold">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p>Offer letter dispatched successfully! Redirecting...</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSending || status === 'success'}
              className="w-full bg-[#0A66C2] hover:bg-[#084e96] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSending ? (
                <span className="animate-pulse">Dispatching...</span>
              ) : status === 'success' ? (
                <><CheckCircle className="w-5 h-5" /> Dispatched</>
              ) : (
                <><Send className="w-5 h-5" /> Send Offer Letter</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
