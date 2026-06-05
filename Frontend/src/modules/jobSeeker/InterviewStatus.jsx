import { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const STAGES = [
  'APPLIED',
  'INTERVIEW_SCHEDULED',
  'INTERVIEW_CONFIRMED',
  'ROUND_1_SELECTED',
  'ROUND_2_SELECTED',
  'ROUND_3_SELECTED',
  'SENT_TO_ADMIN',
  'ADMIN_VERIFIED',
  'OFFER_LETTER_SENT'
];

const formatStageName = (stage) => {
  if (stage === 'SENT_TO_ADMIN') return 'HR VERIFICATION PENDING';
  if (stage === 'ADMIN_VERIFIED') return 'HR VERIFIED';
  return stage.replace(/_/g, ' ');
};

export default function InterviewStatus() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications/my-applications').then(res => {
      const scheduled = res.data.data.filter(a => a.status !== 'REJECTED' && STAGES.indexOf(a.status) > 0);
      setApps(scheduled);
    }).catch(console.error);
  }, []);

  const confirmInterview = async (appId) => {
    try {
      await api.put(`/interviews/${appId}/confirm`, { status: 'CONFIRMED' });
      alert('Confirmed!');
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Interview Tracking</h1>
        <p className="text-slate-500 mt-2">Detailed timeline of your ongoing recruitment processes.</p>
      </div>

      <div className="grid gap-8">
        {apps.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border text-center text-slate-500">No active interviews found.</div>
        ) : apps.map((a, i) => {
          // Normalize legacy broken status strings so existing users aren't stuck
          const normalizedStatus = a.status.replace('ROUND1', 'ROUND_1').replace('ROUND2', 'ROUND_2').replace('ROUND3', 'ROUND_3');
          const currentStageIdx = STAGES.indexOf(normalizedStatus);
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A]">{a.JobPost?.title}</h2>
                  <p className="text-slate-500">{a.JobPost?.Company?.companyName}</p>
                </div>
              </div>
              
              {a.Interview && (
                <div className="mb-8 p-4 bg-orange-50 rounded-xl border border-orange-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-[#F97316]">Interview Details ({a.Interview.round || 'Initial Round'})</h3>
                    <p className="text-sm text-orange-900 mt-1 font-medium">
                      Date: <span className="font-bold">{a.Interview.interviewDate}</span> | Time: <span className="font-bold">{a.Interview.interviewTime}</span>
                    </p>
                    {a.Interview.meetingLink && (
                      <div className="mt-2">
                        {a.Interview.interviewFormat === 'WALKIN' ? (
                          <p className="text-sm text-slate-800 bg-white/60 p-2 rounded border border-orange-100">
                            <span className="font-bold text-[#F97316]">Location: </span> 
                            {a.Interview.meetingLink}
                          </p>
                        ) : (
                          <a href={a.Interview.meetingLink} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-bold hover:underline inline-block">
                            Join Meeting Link →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  {a.status === 'INTERVIEW_SCHEDULED' && (
                    <button onClick={() => confirmInterview(a.id)} className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-xl font-bold whitespace-nowrap shadow-sm">
                      Confirm Attendance
                    </button>
                  )}
                </div>
              )}
              
              {/* Vertical Timeline */}
              <div className="space-y-6">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIdx;
                  const isCurrent = idx === currentStageIdx;
                  return (
                    <div key={stage} className="flex items-center gap-4">
                      {isCompleted ? <CheckCircle2 className={`w-6 h-6 ${isCurrent ? 'text-[#F97316]' : 'text-green-500'}`} /> : <Circle className="w-6 h-6 text-slate-200" />}
                      <div>
                        <p className={`font-medium ${isCurrent ? 'text-[#0F172A] font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                          {formatStageName(stage)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
