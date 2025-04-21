
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '@/types/types';
import { userNotifications, stationNotifications } from '@/data/mockData';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, isFireStation } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Load initial notifications based on user type
  useEffect(() => {
    if (currentUser && !isFireStation) {
      // Load user notifications
      const userNotifs = userNotifications.filter(
        notif => notif.userId === currentUser.id
      );
      setNotifications(userNotifs);
      setUnreadCount(userNotifs.filter(notif => !notif.isRead).length);
    } else if (isFireStation) {
      // Load fire station notifications
      setNotifications(stationNotifications);
      setUnreadCount(stationNotifications.filter(notif => !notif.isRead).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [currentUser, isFireStation]);

  // Add new notification
  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `n${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    setUnreadCount(prevCount => prevCount + 1);

    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'alert' ? 'destructive' : 
               notification.type === 'warning' ? 'default' : 'secondary',
    });
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    
    // Update unread count
    setUnreadCount(prevCount => Math.max(0, prevCount - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, isRead: true }))
    );
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
