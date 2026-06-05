import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Building, Users, Briefcase, FileText } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({ companiesCount: 0, usersCount: 0 });

  useEffect(() => {
    api.get('/dashboard/super-admin').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader title="Super Admin Dashboard" description="Overview of system statistics." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.companiesCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.usersCount}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
