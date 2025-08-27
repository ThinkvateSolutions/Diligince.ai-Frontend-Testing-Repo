
<<<<<<< HEAD
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
// import { mockNotifications } from '@/utils/mockNotifications';
// import { useLocation } from 'react-router-dom';

// interface NotificationStoreContextType {
//   notifications: Notification[];
//   unreadCount: number;
//   preferences: NotificationPreferences;
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: string) => void;
//   getNotificationsByCategory: (category: string) => Notification[];
//   getRecentNotifications: (limit?: number) => Notification[];
// }

// const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

// interface NotificationStoreProviderProps {
//   children: ReactNode;
// }

// export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
//   const location = useLocation();
//   const [state, setState] = useState<NotificationState>({
//     notifications: [],
//     unreadCount: 0,
//     preferences: {
//       showCount: true,
//       enableSound: true,
//       categories: {}
//     }
//   });

//   // Determine user type from current route
//   const getUserType = (): NotificationState['notifications'][0]['userType'] => {
//     const path = location.pathname;
//     if (path.includes('professional')) return 'professional';
//     if (path.includes('service-vendor')) return 'service-vendor';
//     if (path.includes('product-vendor')) return 'product-vendor';
//     if (path.includes('logistics-vendor')) return 'logistics-vendor';
//     return 'industry';
//   };

//   // Initialize notifications based on user type
//   useEffect(() => {
//     const userType = getUserType();
//     const userNotifications = mockNotifications.filter(n => n.userType === userType);
//     const unreadCount = userNotifications.filter(n => !n.read).length;
    
//     setState(prev => ({
//       ...prev,
//       notifications: userNotifications,
//       unreadCount
//     }));
//   }, [location.pathname]);

//   const markAsRead = (id: string) => {
//     setState(prev => {
//       const updatedNotifications = prev.notifications.map(n => 
//         n.id === id ? { ...n, read: true } : n
//       );
//       const unreadCount = updatedNotifications.filter(n => !n.read).length;
//       return {
//         ...prev,
//         notifications: updatedNotifications,
//         unreadCount
//       };
//     });
//   };

//   const markAllAsRead = () => {
//     setState(prev => ({
//       ...prev,
//       notifications: prev.notifications.map(n => ({ ...n, read: true })),
//       unreadCount: 0
//     }));
//   };

//   const deleteNotification = (id: string) => {
//     setState(prev => {
//       const updatedNotifications = prev.notifications.filter(n => n.id !== id);
//       const unreadCount = updatedNotifications.filter(n => !n.read).length;
//       return {
//         ...prev,
//         notifications: updatedNotifications,
//         unreadCount
//       };
//     });
//   };

//   const getNotificationsByCategory = (category: string) => {
//     return state.notifications.filter(n => n.category === category);
//   };

//   const getRecentNotifications = (limit: number = 5) => {
//     return state.notifications
//       .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
//       .slice(0, limit);
//   };

//   const value: NotificationStoreContextType = {
//     notifications: state.notifications,
//     unreadCount: state.unreadCount,
//     preferences: state.preferences,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     getNotificationsByCategory,
//     getRecentNotifications
//   };

//   return (
//     <NotificationStoreContext.Provider value={value}>
//       {children}
//     </NotificationStoreContext.Provider>
//   );
// };

// export const useNotificationStore = (): NotificationStoreContextType => {
//   const context = useContext(NotificationStoreContext);
//   if (context === undefined) {
//     throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
// import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
// import { useLocation } from 'react-router-dom';
// import { mockNotifications } from '@/utils/mockNotifications'; // Assuming mock data is in a separate file

// // --- UPDATED: Context Type now includes interest tracking ---
// interface NotificationStoreContextType {
//   notifications: Notification[];
//   unreadCount: number;
//   preferences: NotificationPreferences;
//   interestedIds: Set<string>; // <-- NEW: To track IDs of responded requirements
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: string) => void;
//   markAsInterested: (id: string) => void; // <-- NEW: Function to mark interest
//   getNotificationsByCategory: (category: string) => Notification[];
//   getRecentNotifications: (limit?: number) => Notification[];
// }

// const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

// interface NotificationStoreProviderProps {
//   children: ReactNode;
// }

// export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
//   const location = useLocation();
//   const [allNotifications, setAllNotifications] = useState<Notification[]>(mockNotifications);
  
//   // --- NEW: State to track which requirements the user has responded to ---
//   const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set());

//   const [preferences, setPreferences] = useState<NotificationPreferences>({
//     showCount: true,
//     enableSound: true,
//     categories: {}
//   });

//   const getUserType = (): Notification['userType'] => {
//     const path = location.pathname;
//     if (path.includes('professional')) return 'professional';
//     if (path.includes('service-vendor')) return 'service-vendor';
//     if (path.includes('product-vendor')) return 'product-vendor';
//     if (path.includes('logistics-vendor')) return 'logistics-vendor';
//     return 'industry';
//   };

//   const currentUserType = getUserType();

//   const userNotifications = useMemo(() => {
//     return allNotifications.filter(n => n.userType === currentUserType);
//   }, [allNotifications, currentUserType]);

//   const unreadCount = useMemo(() => {
//     return userNotifications.filter(n => !n.read).length;
//   }, [userNotifications]);

//   const markAsRead = (id: string) => {
//     setAllNotifications(prev =>
//       prev.map(n => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   const markAllAsRead = () => {
//     setAllNotifications(prev =>
//       prev.map(n => (n.userType === currentUserType ? { ...n, read: true } : n))
//     );
//   };

//   const deleteNotification = (id: string) => {
//     setAllNotifications(prev => prev.filter(n => n.id !== id));
//   };
  
//   // --- NEW: Function to add a requirement ID to our tracking Set ---
//   const markAsInterested = (id: string) => {
//     setInterestedIds(prevSet => new Set(prevSet).add(id));
//   };

//   const getNotificationsByCategory = (category: string) => {
//     return userNotifications.filter(n => n.category === category);
//   };

//   const getRecentNotifications = (limit: number = 5) => {
//     return userNotifications
//       .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
//       .slice(0, limit);
//   };

//   const value: NotificationStoreContextType = {
//     notifications: userNotifications,
//     unreadCount,
//     preferences,
//     interestedIds, // <-- Expose the Set
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     markAsInterested, // <-- Expose the function
//     getNotificationsByCategory,
//     getRecentNotifications
//   };

//   return (
//     <NotificationStoreContext.Provider value={value}>
//       {children}
//     </NotificationStoreContext.Provider>
//   );
// };

// export const useNotificationStore = (): NotificationStoreContextType => {
//   const context = useContext(NotificationStoreContext);
//   if (context === undefined) {
//     throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Notification, NotificationPreferences, UserType } from '@/types/notifications';
import { useLocation } from 'react-router-dom';
=======
<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
import { mockNotifications } from '@/utils/mockNotifications';
import { useLocation } from 'react-router-dom';
=======
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
// import { mockNotifications } from '@/utils/mockNotifications';
// import { useLocation } from 'react-router-dom';

// interface NotificationStoreContextType {
//   notifications: Notification[];
//   unreadCount: number;
//   preferences: NotificationPreferences;
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: string) => void;
//   getNotificationsByCategory: (category: string) => Notification[];
//   getRecentNotifications: (limit?: number) => Notification[];
// }

// const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

// interface NotificationStoreProviderProps {
//   children: ReactNode;
// }

// export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
//   const location = useLocation();
//   const [state, setState] = useState<NotificationState>({
//     notifications: [],
//     unreadCount: 0,
//     preferences: {
//       showCount: true,
//       enableSound: true,
//       categories: {}
//     }
//   });

//   // Determine user type from current route
//   const getUserType = (): NotificationState['notifications'][0]['userType'] => {
//     const path = location.pathname;
//     if (path.includes('professional')) return 'professional';
//     if (path.includes('service-vendor')) return 'service-vendor';
//     if (path.includes('product-vendor')) return 'product-vendor';
//     if (path.includes('logistics-vendor')) return 'logistics-vendor';
//     return 'industry';
//   };

//   // Initialize notifications based on user type
//   useEffect(() => {
//     const userType = getUserType();
//     const userNotifications = mockNotifications.filter(n => n.userType === userType);
//     const unreadCount = userNotifications.filter(n => !n.read).length;
    
//     setState(prev => ({
//       ...prev,
//       notifications: userNotifications,
//       unreadCount
//     }));
//   }, [location.pathname]);

//   const markAsRead = (id: string) => {
//     setState(prev => {
//       const updatedNotifications = prev.notifications.map(n => 
//         n.id === id ? { ...n, read: true } : n
//       );
//       const unreadCount = updatedNotifications.filter(n => !n.read).length;
//       return {
//         ...prev,
//         notifications: updatedNotifications,
//         unreadCount
//       };
//     });
//   };

//   const markAllAsRead = () => {
//     setState(prev => ({
//       ...prev,
//       notifications: prev.notifications.map(n => ({ ...n, read: true })),
//       unreadCount: 0
//     }));
//   };

//   const deleteNotification = (id: string) => {
//     setState(prev => {
//       const updatedNotifications = prev.notifications.filter(n => n.id !== id);
//       const unreadCount = updatedNotifications.filter(n => !n.read).length;
//       return {
//         ...prev,
//         notifications: updatedNotifications,
//         unreadCount
//       };
//     });
//   };

//   const getNotificationsByCategory = (category: string) => {
//     return state.notifications.filter(n => n.category === category);
//   };

//   const getRecentNotifications = (limit: number = 5) => {
//     return state.notifications
//       .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
//       .slice(0, limit);
//   };

//   const value: NotificationStoreContextType = {
//     notifications: state.notifications,
//     unreadCount: state.unreadCount,
//     preferences: state.preferences,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     getNotificationsByCategory,
//     getRecentNotifications
//   };

//   return (
//     <NotificationStoreContext.Provider value={value}>
//       {children}
//     </NotificationStoreContext.Provider>
//   );
// };

// export const useNotificationStore = (): NotificationStoreContextType => {
//   const context = useContext(NotificationStoreContext);
//   if (context === undefined) {
//     throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
// import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
// import { useLocation } from 'react-router-dom';
// import { mockNotifications } from '@/utils/mockNotifications'; // Assuming mock data is in a separate file

// // --- UPDATED: Context Type now includes interest tracking ---
// interface NotificationStoreContextType {
//   notifications: Notification[];
//   unreadCount: number;
//   preferences: NotificationPreferences;
//   interestedIds: Set<string>; // <-- NEW: To track IDs of responded requirements
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: string) => void;
//   markAsInterested: (id: string) => void; // <-- NEW: Function to mark interest
//   getNotificationsByCategory: (category: string) => Notification[];
//   getRecentNotifications: (limit?: number) => Notification[];
// }

// const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

// interface NotificationStoreProviderProps {
//   children: ReactNode;
// }

// export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
//   const location = useLocation();
//   const [allNotifications, setAllNotifications] = useState<Notification[]>(mockNotifications);
  
//   // --- NEW: State to track which requirements the user has responded to ---
//   const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set());

//   const [preferences, setPreferences] = useState<NotificationPreferences>({
//     showCount: true,
//     enableSound: true,
//     categories: {}
//   });

//   const getUserType = (): Notification['userType'] => {
//     const path = location.pathname;
//     if (path.includes('professional')) return 'professional';
//     if (path.includes('service-vendor')) return 'service-vendor';
//     if (path.includes('product-vendor')) return 'product-vendor';
//     if (path.includes('logistics-vendor')) return 'logistics-vendor';
//     return 'industry';
//   };

//   const currentUserType = getUserType();

//   const userNotifications = useMemo(() => {
//     return allNotifications.filter(n => n.userType === currentUserType);
//   }, [allNotifications, currentUserType]);

//   const unreadCount = useMemo(() => {
//     return userNotifications.filter(n => !n.read).length;
//   }, [userNotifications]);

//   const markAsRead = (id: string) => {
//     setAllNotifications(prev =>
//       prev.map(n => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   const markAllAsRead = () => {
//     setAllNotifications(prev =>
//       prev.map(n => (n.userType === currentUserType ? { ...n, read: true } : n))
//     );
//   };

//   const deleteNotification = (id: string) => {
//     setAllNotifications(prev => prev.filter(n => n.id !== id));
//   };
  
//   // --- NEW: Function to add a requirement ID to our tracking Set ---
//   const markAsInterested = (id: string) => {
//     setInterestedIds(prevSet => new Set(prevSet).add(id));
//   };

//   const getNotificationsByCategory = (category: string) => {
//     return userNotifications.filter(n => n.category === category);
//   };

//   const getRecentNotifications = (limit: number = 5) => {
//     return userNotifications
//       .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
//       .slice(0, limit);
//   };

//   const value: NotificationStoreContextType = {
//     notifications: userNotifications,
//     unreadCount,
//     preferences,
//     interestedIds, // <-- Expose the Set
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     markAsInterested, // <-- Expose the function
//     getNotificationsByCategory,
//     getRecentNotifications
//   };

//   return (
//     <NotificationStoreContext.Provider value={value}>
//       {children}
//     </NotificationStoreContext.Provider>
//   );
// };

// export const useNotificationStore = (): NotificationStoreContextType => {
//   const context = useContext(NotificationStoreContext);
//   if (context === undefined) {
//     throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Notification, NotificationPreferences, UserType } from '@/types/notifications';
import { useLocation } from 'react-router-dom';
>>>>>>> 9b0ce35 (Initial commit)
import { mockNotifications } from '@/utils/mockNotifications';

// Helper 1: Maps a requirement category to a specific vendor user type
const mapCategoryToUserType = (category: string): UserType | null => {
  switch (category) {
    case 'Expert':
      return 'professional';
    case 'Services':
      return 'service-vendor';
    case 'Product':
      return 'product-vendor';
    case 'Logistics':
      return 'logistics-vendor';
    default:
      return null;
  }
};

// Helper 2: Transforms a requirement object into a notification object with subCategory
const transformRequirementToNotification = (req: any): Notification | null => {
  const userType = mapCategoryToUserType(req.category);
  if (!userType) return null;

  return {
    id: `req-notif-${req.id}`,
    title: `New Requirement: ${req.category}`,
    message: `A new requirement titled "${req.title}" is available for your review.`,
    type: 'info',
    priority: req.priority?.toLowerCase() ?? 'medium',
    timestamp: new Date(req.createdDate),
    read: false,
    userType: userType,
    category: 'Requirements',    // Main category for filtering
    subCategory: req.category,   // Specific type for display
    actionUrl: `/vendor-requirements?view=${req.id}&action=showInterest`,
  };
};
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface NotificationStoreContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
<<<<<<< HEAD
  interestedIds: Set<string>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  markAsInterested: (id: string) => void;
=======
<<<<<<< HEAD
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
=======
  interestedIds: Set<string>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  markAsInterested: (id: string) => void;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  getNotificationsByCategory: (category: string) => Notification[];
  getRecentNotifications: (limit?: number) => Notification[];
}

const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

interface NotificationStoreProviderProps {
  children: ReactNode;
}

export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
  const location = useLocation();
<<<<<<< HEAD

  const [allNotifications, setAllNotifications] = useState<Notification[]>(() => {
    try {
      const savedRequirementsRaw = localStorage.getItem('requirements-list');
      const requirements = savedRequirementsRaw ? JSON.parse(savedRequirementsRaw) : [];

      const dynamicNotifications = requirements
        .filter((req: any) => req.status === 'Active' || req.status === 'Pending')
        .map(transformRequirementToNotification)
        .filter(Boolean) as Notification[];

      const otherMockNotifications = mockNotifications.filter(
        (n) => n.category !== 'Requirements'
      );

      return [...dynamicNotifications, ...otherMockNotifications];
    } catch (error) {
      console.error("Failed to parse or process requirements from localStorage", error);
      return mockNotifications;
    }
  });

=======
<<<<<<< HEAD
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    preferences: {
      showCount: true,
      enableSound: true,
      categories: {}
    }
  });

  // Determine user type from current route
  const getUserType = (): NotificationState['notifications'][0]['userType'] => {
=======

  const [allNotifications, setAllNotifications] = useState<Notification[]>(() => {
    try {
      const savedRequirementsRaw = localStorage.getItem('requirements-list');
      const requirements = savedRequirementsRaw ? JSON.parse(savedRequirementsRaw) : [];

      const dynamicNotifications = requirements
        .filter((req: any) => req.status === 'Active' || req.status === 'Pending')
        .map(transformRequirementToNotification)
        .filter(Boolean) as Notification[];

      const otherMockNotifications = mockNotifications.filter(
        (n) => n.category !== 'Requirements'
      );

      return [...dynamicNotifications, ...otherMockNotifications];
    } catch (error) {
      console.error("Failed to parse or process requirements from localStorage", error);
      return mockNotifications;
    }
  });

>>>>>>> 9b0ce35 (Initial commit)
  const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set());

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    showCount: true,
    enableSound: true,
    categories: {}
  });

  const getUserType = (): UserType => {
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    const path = location.pathname;
    if (path.includes('professional')) return 'professional';
    if (path.includes('service-vendor')) return 'service-vendor';
    if (path.includes('product-vendor')) return 'product-vendor';
    if (path.includes('logistics-vendor')) return 'logistics-vendor';
    return 'industry';
  };

<<<<<<< HEAD
  const currentUserType = getUserType();

  const userNotifications = useMemo(() => {
    return allNotifications.filter(n => n.userType === currentUserType);
  }, [allNotifications, currentUserType]);

  const unreadCount = useMemo(() => {
    return userNotifications.filter(n => !n.read).length;
  }, [userNotifications]);
=======
<<<<<<< HEAD
  // Initialize notifications based on user type
  useEffect(() => {
    const userType = getUserType();
    const userNotifications = mockNotifications.filter(n => n.userType === userType);
    const unreadCount = userNotifications.filter(n => !n.read).length;
    
    setState(prev => ({
      ...prev,
      notifications: userNotifications,
      unreadCount
    }));
  }, [location.pathname]);
>>>>>>> 9b0ce35 (Initial commit)

  const markAsRead = (id: string) => {
    setAllNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setAllNotifications(prev =>
      prev.map(n => (n.userType === currentUserType ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setAllNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsInterested = (id: string) => {
    setInterestedIds(prevSet => new Set(prevSet).add(id));
  };

  const getNotificationsByCategory = (category: string) => {
    return userNotifications.filter(n => n.category === category);
  };

  const getRecentNotifications = (limit: number = 5) => {
<<<<<<< HEAD
    return userNotifications
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
=======
    return state.notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
=======
  const currentUserType = getUserType();

  const userNotifications = useMemo(() => {
    return allNotifications.filter(n => n.userType === currentUserType);
  }, [allNotifications, currentUserType]);

  const unreadCount = useMemo(() => {
    return userNotifications.filter(n => !n.read).length;
  }, [userNotifications]);

  const markAsRead = (id: string) => {
    setAllNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setAllNotifications(prev =>
      prev.map(n => (n.userType === currentUserType ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setAllNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsInterested = (id: string) => {
    setInterestedIds(prevSet => new Set(prevSet).add(id));
  };

  const getNotificationsByCategory = (category: string) => {
    return userNotifications.filter(n => n.category === category);
  };

  const getRecentNotifications = (limit: number = 5) => {
    return userNotifications
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      .slice(0, limit);
  };

  const value: NotificationStoreContextType = {
<<<<<<< HEAD
    notifications: userNotifications,
    unreadCount,
    preferences,
    interestedIds,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    markAsInterested,
=======
<<<<<<< HEAD
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    preferences: state.preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
=======
    notifications: userNotifications,
    unreadCount,
    preferences,
    interestedIds,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    markAsInterested,
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    getNotificationsByCategory,
    getRecentNotifications
  };

  return (
    <NotificationStoreContext.Provider value={value}>
      {children}
    </NotificationStoreContext.Provider>
  );
};

export const useNotificationStore = (): NotificationStoreContextType => {
  const context = useContext(NotificationStoreContext);
  if (context === undefined) {
    throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
  }
  return context;
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
