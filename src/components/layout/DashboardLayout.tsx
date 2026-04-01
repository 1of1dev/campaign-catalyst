import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { Topbar } from './Topbar';
import { useCompanyStore } from '@/store/companyStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useEffect } from 'react';

export function DashboardLayout() {
  const { fetchCompanies, companies } = useCompanyStore();
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    if (companies.length === 0) {
      fetchCompanies();
      fetchNotifications();
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
