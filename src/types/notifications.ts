// in @/types/notifications.ts

export type UserType = "professional" | "service-vendor" | "product-vendor" | "logistics-vendor" | "industry";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
  userType: UserType;
  actionUrl?: string;

  // CLARIFICATION: The main category of the notification itself
  category: 'Requirements' | 'Messages' | 'Purchase Orders' | 'System';

  // NEW: The specific type of the requirement, taken from localStorage
  subCategory?: string;
}

export interface NotificationPreferences {
  showCount: boolean;
  enableSound: boolean;
  categories: {
    [key: string]: boolean;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
}
