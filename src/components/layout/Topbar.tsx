import { Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCompanyStore } from '@/store/companyStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { user, logout } = useAuthStore();
  const { companies, activeCompany, setActiveCompany } = useCompanyStore();
  const { notifications, unreadCount } = useNotificationStore();
  const navigate = useNavigate();

  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  const companyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) setCompanyOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const count = unreadCount();
  const recentNotifs = notifications.slice(0, 4);

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Company Switcher */}
      <div className="relative" ref={companyRef}>
        <button
          onClick={() => setCompanyOpen(!companyOpen)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition"
        >
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            {activeCompany?.name?.charAt(0) || 'C'}
          </div>
          <span>{activeCompany?.name || 'Select Company'}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        {companyOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-lg py-1 animate-fade-in z-50">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveCompany(c); setCompanyOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm hover:bg-muted transition',
                  activeCompany?.id === c.id && 'bg-muted font-medium text-primary'
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setBellOpen(!bellOpen)}
            className="relative p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-[16px] rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium px-1">
                {count}
              </span>
            )}
          </button>
          {bellOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-card border border-border rounded-lg shadow-lg animate-fade-in z-50">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <Link to="/notifications" onClick={() => setBellOpen(false)} className="text-xs text-primary hover:underline">View all</Link>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {recentNotifs.map((n) => (
                  <div key={n.id} className={cn('px-4 py-3 border-b border-border/50 last:border-0', !n.read && 'bg-primary/[0.03]')}>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition"
          >
            <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-card border border-border rounded-lg shadow-lg py-1 animate-fade-in z-50">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition"
              >
                <Settings className="h-3.5 w-3.5" /> Settings
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
