import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Button } from '../../components/ui/Button';

export default function RegisterAccount() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phoneNumber: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Candidate Registration</h2>
        <p className="text-gray-500 mb-8 text-center">Join thousands of job seekers finding their dream role</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A66C2] outline-none" required />
          <input type="email" placeholder="Email Address" onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A66C2] outline-none" required />
          <input type="text" placeholder="Phone Number" onChange={e=>setFormData({...formData, phoneNumber: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A66C2] outline-none" required />
          <input type="password" placeholder="Password" onChange={e=>setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A66C2] outline-none" required />
          <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#084e96] text-white py-3 rounded-lg font-bold text-lg shadow-md">Create Account</Button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-[#0A66C2] font-semibold hover:underline">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}