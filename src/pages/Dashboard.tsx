import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useCampaignStore } from '@/store/campaignStore';
import { useNotificationStore } from '@/store/notificationStore';
import { StatusBadge } from '@/components/StatusBadge';
import { CardSkeleton } from '@/components/SkeletonLoader';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { campaigns, fetchCampaigns, isLoading } = useCampaignStore();
  const { notifications } = useNotificationStore();

  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  const total = campaigns.length;
  const active = campaigns.filter((c) => !['draft', 'published'].includes(c.status)).length;
  const completed = campaigns.filter((c) => c.status === 'published').length;

  const stats = [
    { label: 'Total Campaigns', value: total, icon: Megaphone, color: 'text-primary' },
    { label: 'Active', value: active, icon: TrendingUp, color: 'text-info' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-success' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">Overview of your marketing campaigns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className={cn('h-4 w-4', s.color)} />
                </div>
                <span className="text-2xl font-bold text-foreground">{s.value}</span>
              </div>
            ))}
      </div>

      {/* Recent Campaigns */}
      <div className="glass-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent Campaigns</h2>
          <Link to="/campaigns" className="text-xs text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Start</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition">
                  <td className="px-5 py-3 font-medium text-foreground">
                    <Link to={`/campaigns/${c.id}`} className="hover:text-primary transition">{c.name}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground capitalize">{c.type}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{c.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications Preview */}
      <div className="glass-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent Notifications</h2>
          <Link to="/notifications" className="text-xs text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {notifications.slice(0, 3).map((n) => (
            <div key={n.id} className={cn('px-5 py-3', !n.read && 'bg-primary/[0.02]')}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  'h-2 w-2 rounded-full shrink-0',
                  n.type === 'success' && 'bg-success',
                  n.type === 'warning' && 'bg-warning',
                  n.type === 'info' && 'bg-info',
                )} />
                <p className="text-sm font-medium text-foreground">{n.title}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 ml-4">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
