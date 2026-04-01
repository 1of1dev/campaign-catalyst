import { useNotificationStore, type NotificationType } from '@/store/notificationStore';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';

const typeColors: Record<NotificationType, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
};

export default function Notifications() {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  useEffect(() => {
    if (notifications.length === 0) fetchNotifications();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Notifications</h1>
          <p className="page-subheader">{unreadCount()} unread</p>
        </div>
        {unreadCount() > 0 && (
          <button onClick={markAllAsRead} className="text-sm text-primary hover:underline font-medium">Mark all as read</button>
        )}
      </div>

      <div className="glass-card divide-y divide-border/50">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={cn('px-5 py-4 cursor-pointer hover:bg-muted/30 transition', !n.read && 'bg-primary/[0.02]')}
            >
              <div className="flex items-start gap-3">
                <div className={cn('h-2 w-2 rounded-full mt-2 shrink-0', typeColors[n.type])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn('text-sm text-foreground', !n.read && 'font-semibold')}>{n.title}</p>
                    <span className="text-[10px] text-muted-foreground ml-2 shrink-0">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
