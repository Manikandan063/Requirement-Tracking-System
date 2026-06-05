import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';

export default function CompanyAdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}
