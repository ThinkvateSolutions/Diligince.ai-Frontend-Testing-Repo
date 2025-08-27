<<<<<<< HEAD
// in @/types/notifications.ts

export type UserType = "professional" | "service-vendor" | "product-vendor" | "logistics-vendor" | "industry";
=======
<<<<<<< HEAD
=======
// in @/types/notifications.ts

export type UserType = "professional" | "service-vendor" | "product-vendor" | "logistics-vendor" | "industry";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
<<<<<<< HEAD
  priority: 'low' | 'medium' | 'high';
=======
<<<<<<< HEAD
  priority: 'low' | 'medium' | 'high' | 'urgent';
>>>>>>> 9b0ce35 (Initial commit)
  timestamp: Date;
  read: boolean;
  userType: UserType;
  actionUrl?: string;
<<<<<<< HEAD
=======
  icon?: string;
=======
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
  userType: UserType;
  actionUrl?: string;
>>>>>>> 9b0ce35 (Initial commit)

  // CLARIFICATION: The main category of the notification itself
  category: 'Requirements' | 'Messages' | 'Purchase Orders' | 'System';

  // NEW: The specific type of the requirement, taken from localStorage
  subCategory?: string;
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
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
