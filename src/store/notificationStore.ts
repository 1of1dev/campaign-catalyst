import { create } from 'zustand';

export type NotificationType = 'info' | 'success' | 'warning';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: () => number;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Analysis Complete', message: 'Market analysis for "Summer Product Launch" is ready.', type: 'success', read: false, createdAt: '2026-03-31T10:30:00Z' },
  { id: '2', title: 'Campaign Approved', message: 'Your "Brand Awareness Q2" campaign has been approved.', type: 'info', read: false, createdAt: '2026-03-30T14:00:00Z' },
  { id: '3', title: 'Budget Alert', message: 'Campaign "Holiday Special" is approaching its budget limit.', type: 'warning', read: true, createdAt: '2026-03-29T09:15:00Z' },
  { id: '4', title: 'Content Generated', message: 'AI-generated content for Instagram is ready for review.', type: 'success', read: false, createdAt: '2026-03-28T16:45:00Z' },
  { id: '5', title: 'New Team Member', message: 'Sarah joined Acme Corp as a member.', type: 'info', read: true, createdAt: '2026-03-27T11:00:00Z' },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ notifications: mockNotifications, isLoading: false });
  },

  markAsRead: (id) =>
    set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),

  markAllAsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
