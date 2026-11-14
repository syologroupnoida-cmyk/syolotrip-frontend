import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/navigation/AdminSidebar';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Extract current tab from pathname, e.g. /admin/bookings -> bookings, /admin -> dashboard
  const getActiveTab = () => {
    const subPath = location.pathname.replace(/^\/admin\/?/, '');
    return subPath || 'dashboard';
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  return (
    <div
      className={`flex min-h-screen font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-800'
      }`}
    >
      <AdminSidebar
        currentTab={getActiveTab()}
        setCurrentTab={handleTabChange}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

