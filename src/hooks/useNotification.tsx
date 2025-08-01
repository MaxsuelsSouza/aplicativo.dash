import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notification, { NotificationType } from '@/components/Notification';

interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message?: string, duration?: number) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Date.now().toString();
    const newNotification: NotificationData = {
      id,
      type,
      title,
      message,
      duration,
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showNotification('success', title, message, duration);
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showNotification('warning', title, message, duration);
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showNotification('error', title, message, duration);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showWarning,
        showError,
      }}
    >
      {children}
      {notifications.map((notification, index) => (
        <Notification
          key={notification.id}
          visible={true}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onHide={() => hideNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}