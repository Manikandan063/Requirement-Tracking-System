import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function InterviewTracking() {
  const { applicationId } = useParams();
  const [interview, setInterview] = useState(null);
  const [formData, setFormData] = useState({ interviewDate: '', interviewTime: '', interviewFormat: 'ONLINE', meetingLink: '' });
  const [roundInputs, setRoundInputs] = useState({
    round1Name: '', round1Score: '',
    round2Name: '', round2Score: '',
    round3Name: '', round3Score: ''
  });

  useEffect(() => {
    api.get(`/interviews/${applicationId}`).then(res => {
      if(res.data.data) {
        setInterview(res.data.data);
        setFormData({
          interviewDate: res.data.data.interviewDate || '',
          interviewTime: res.data.data.interviewTime || '',
          interviewFormat: res.data.data.interviewFormat || 'ONLINE',
          meetingLink: res.data.data.meetingLink || ''
        });
        setRoundInputs({
          round1Name: res.data.data.round1Name || '', round1Score: res.data.data.round1Score || '',
          round2Name: res.data.data.round2Name || '', round2Score: res.data.data.round2Score || '',
          round3Name: res.data.data.round3Name || '', round3Score: res.data.data.round3Score || ''
        });
      }
    }).catch(() => {});
  }, [applicationId]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/interviews/${applicationId}/schedule`, formData);
      alert(interview ? 'Interview Schedule Updated' : 'Interview Scheduled');
      setInterview(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error scheduling');
    }
  };

  const updateRound = async (roundName, status) => {
    try {
      const roundNumber = roundName.replace('round', ''); // '1'
      const payload = { 
        [`${roundName}Status`]: status,
        [`${roundName}Name`]: roundInputs[`${roundName}Name`],
        [`${roundName}Score`]: roundInputs[`${roundName}Score`]
      };
      await api.put(`/interviews/${applicationId}/round-status`, payload);
      setInterview({ ...interview, ...payload });
      
      if (status === 'SELECTED') {
        await api.put(`/applications/${applicationId}/status`, { status: `ROUND_${roundNumber}_SELECTED` });
      } else {
        await api.put(`/applications/${applicationId}/status`, { status: 'REJECTED' });
      }
    } catch (err) {
      alert('Error updating round');
    }
  };
  
  const sendToAdmin = async () => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status: 'SENT_TO_ADMIN' });
      alert('Sent to admin for final verification');
    } catch (err) {
      alert('Error sending to admin');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Interview Tracking" description="Schedule and track interview rounds" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Schedule Interview</h3>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div><label>Date</label><Input type="date" required value={formData.interviewDate} onChange={e => setFormData({...formData, interviewDate: e.target.value})} /></div>
            <div><label>Time</label><Input type="time" required value={formData.interviewTime} onChange={e => setFormData({...formData, interviewTime: e.target.value})} /></div>
            
            <div>
              <label>Interview Type</label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent" 
                required 
                value={formData.interviewFormat} 
                onChange={e => setFormData({...formData, interviewFormat: e.target.value})}
              >
                <option value="ONLINE">Online Interview</option>
                <option value="WALKIN">Walk-in Interview</option>
              </select>
            </div>
            
            <div>
              <label>{formData.interviewFormat === 'ONLINE' ? 'Meeting Link' : 'Office Address'}</label>
              <Input 
                required 
                value={formData.meetingLink} 
                onChange={e => setFormData({...formData, meetingLink: e.target.value})} 
                placeholder={formData.interviewFormat === 'ONLINE' ? 'https://zoom.us/...' : '123 Tech Park, 4th Floor...'}
              />
            </div>
            <Button type="submit">{interview ? 'Update Schedule' : 'Schedule'}</Button>
          </form>
        </div>
        {interview && (
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#0F172A] border-b pb-2">Current Status</h3>
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
              <span className="font-medium">Candidate Confirmation:</span>
              <span className={`font-bold ${interview.candidateConfirmation === 'CONFIRMED' ? 'text-green-600' : 'text-orange-500'}`}>{interview.candidateConfirmation}</span>
            </div>
            
            {['round1', 'round2', 'round3'].map((round, idx) => (
              <div key={round} className="p-4 border border-slate-100 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-sm">Round {idx + 1}</span>
                  <span className={`font-bold px-2 py-1 rounded text-xs ${interview[`${round}Status`] === 'SELECTED' ? 'bg-green-100 text-green-700' : interview[`${round}Status`] === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                    {interview[`${round}Status`]}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Round Name</label>
                    <Input 
                      placeholder="e.g. Technical" 
                      value={roundInputs[`${round}Name`]} 
                      onChange={e => setRoundInputs({...roundInputs, [`${round}Name`]: e.target.value})}
                      disabled={interview[`${round}Status`] !== 'PENDING'}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Score</label>
                    <Input 
                      placeholder="e.g. 85/100" 
                      value={roundInputs[`${round}Score`]} 
                      onChange={e => setRoundInputs({...roundInputs, [`${round}Score`]: e.target.value})}
                      disabled={interview[`${round}Status`] !== 'PENDING'}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                {interview[`${round}Status`] === 'PENDING' && (
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-50 mt-2">
                    <Button size="sm" variant="success" onClick={() => updateRound(round, 'SELECTED')}>Pass Candidate</Button>
                    <Button size="sm" variant="danger" onClick={() => updateRound(round, 'REJECTED')}>Reject</Button>
                  </div>
                )}
              </div>
            ))}
            
            <Button onClick={sendToAdmin} variant="secondary" className="w-full mt-6 py-6 font-bold">Send to Admin for Final Verification</Button>
          </div>
        )}
      </div>
    </div>
  );
}
