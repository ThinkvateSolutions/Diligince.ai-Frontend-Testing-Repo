
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useNotificationStore } from '@/contexts/NotificationStoreContext';
// import { formatTimeAgo } from '@/utils/dateUtils';
// import { useNavigate } from 'react-router-dom';
// import { Search, X, CheckCheck, Trash2, Bell, Filter } from 'lucide-react';

// interface NotificationPanelProps {
//   onClose: () => void;
// }

// export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
//   const { 
//     notifications, 
//     unreadCount, 
//     markAsRead, 
//     markAllAsRead, 
//     deleteNotification 
//   } = useNotificationStore();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterRead, setFilterRead] = useState('all');

//   const categories = [...new Set(notifications.map(n => n.category))];

//   const filteredNotifications = notifications.filter(notification => {
//     const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          notification.message.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
//     const matchesRead = filterRead === 'all' || 
//                        (filterRead === 'read' && notification.read) ||
//                        (filterRead === 'unread' && !notification.read);
    
//     return matchesSearch && matchesCategory && matchesRead;
//   });

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'urgent': return 'bg-red-100 text-red-800';
//       case 'high': return 'bg-orange-100 text-orange-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleNotificationClick = (notification: any) => {
//     if (!notification.read) {
//       markAsRead(notification.id);
//     }
//     if (notification.actionUrl) {
//       navigate(notification.actionUrl);
//       onClose();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full max-h-[80vh]">
//       {/* Header */}
//       <div className="p-4 border-b bg-gray-50">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <Bell className="h-5 w-5 text-gray-600" />
//             <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
//             {unreadCount > 0 && (
//               <Badge className="bg-red-100 text-red-800">
//                 {unreadCount} unread
//               </Badge>
//             )}
//           </div>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             {/* <X className="h-4 w-4" /> */}
//           </Button>
//         </div>

//         {/* Search and Filters */}
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search notifications..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <div className="flex gap-2">
//             <Select value={filterCategory} onValueChange={setFilterCategory}>
//               <SelectTrigger className="flex-1">
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map(category => (
//                   <SelectItem key={category} value={category}>{category}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
            
//             <Select value={filterRead} onValueChange={setFilterRead}>
//               <SelectTrigger className="flex-1">
//                 <SelectValue placeholder="All Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="unread">Unread</SelectItem>
//                 <SelectItem value="read">Read</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Actions */}
//         {unreadCount > 0 && (
//           <div className="mt-3">
//             <Button variant="outline" size="sm" onClick={markAllAsRead}>
//               <CheckCheck className="h-4 w-4 mr-2" />
//               Mark All as Read
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Notifications List */}
//       <div className="flex-1 overflow-y-auto">
//         {filteredNotifications.length === 0 ? (
//           <div className="p-8 text-center">
//             <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
//             <p className="text-gray-500">Try adjusting your search or filters</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-100">
//             {filteredNotifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
//                   !notification.read ? 'bg-blue-50' : ''
//                 }`}
//                 onClick={() => handleNotificationClick(notification)}
//               >
//                 <div className="flex items-start gap-3">
//                   <div className={`w-3 h-3 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2">
//                       <h3 className={`text-base truncate ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
//                         {notification.title}
//                       </h3>
//                       <Badge className={getPriorityColor(notification.priority)} variant="outline">
//                         {notification.priority}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-3">
//                       {notification.message}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="outline" className="text-xs">
//                           {notification.category}
//                         </Badge>
//                         <span className="text-xs text-gray-500">
//                           {formatTimeAgo(notification.timestamp)}
//                         </span>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteNotification(notification.id);
//                         }}
//                         className="opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useNotificationStore } from '@/contexts/NotificationStoreContext';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCheck, Trash2, Bell, Heart, X, CheckCircle2 } from 'lucide-react';
import { Notification } from '@/types/notifications';
=======
<<<<<<< HEAD
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotificationStore } from '@/contexts/NotificationStoreContext';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { Search, X, CheckCheck, Trash2, Bell, Filter } from 'lucide-react';
=======
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useNotificationStore } from '@/contexts/NotificationStoreContext';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCheck, Trash2, Bell, Heart, X, CheckCircle2 } from 'lucide-react';
import { Notification } from '@/types/notifications';
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
<<<<<<< HEAD
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    interestedIds,
    markAsInterested,
=======
<<<<<<< HEAD
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
>>>>>>> 9b0ce35 (Initial commit)
  } = useNotificationStore();

  const { toast } = useToast();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [requirementToShow, setRequirementToShow] = useState<Notification | null>(null);

  const categories = [...new Set(notifications.map((n) => n.category))];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
<<<<<<< HEAD
=======
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.read) ||
                       (filterRead === 'unread' && !notification.read);
    
=======
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    interestedIds,
    markAsInterested,
  } = useNotificationStore();

  const { toast } = useToast();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [requirementToShow, setRequirementToShow] = useState<Notification | null>(null);

  const categories = [...new Set(notifications.map((n) => n.category))];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
>>>>>>> 9b0ce35 (Initial commit)
    const matchesRead =
      filterRead === 'all' ||
      (filterRead === 'read' && notification.read) ||
      (filterRead === 'unread' && !notification.read);
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    return matchesSearch && matchesCategory && matchesRead;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

<<<<<<< HEAD
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
=======
<<<<<<< HEAD
  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
=======
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
>>>>>>> 9b0ce35 (Initial commit)

    if (notification.category === 'Messages' && notification.userType) {
      navigate(`/${notification.userType}-messages`);
      onClose();
    } 
    else if (notification.category === 'Requirements') {
      setRequirementToShow(notification);
    } 
    else if (notification.actionUrl) {
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      navigate(notification.actionUrl);
      onClose();
    }
  };

<<<<<<< HEAD
  const handleInterested = () => {
    if (requirementToShow) {
      markAsInterested(requirementToShow.id);
      toast({
        title: "✅ Response Sent",
        description: "Your interest in the requirement has been recorded.",
      });
      setRequirementToShow(null);
    }
  };

  const handleNotInterested = () => {
    setRequirementToShow(null);
  };

=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
  return (
    <>
      <div className="flex flex-col h-full max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              {/* <X className="h-4 w-4" />  */}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto group/list">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const hasResponded = notification.category === 'Requirements' && interestedIds.has(notification.id);
                return (
                  <div
                    key={notification.id}
                    className={`group p-4 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    } ${
                      hasResponded
                        ? 'bg-gray-100/50 opacity-80'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-base truncate ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                          </div>
                          {hasResponded && (
                            <Badge variant="secondary" className="border-green-300 bg-green-50 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1.5" />
                              Responded
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Requirement Interest Dialog */}
      <Dialog open={!!requirementToShow} onOpenChange={(isOpen) => !isOpen && setRequirementToShow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Requirement Details</DialogTitle>
            <DialogDescription className="pt-2">
              {requirementToShow?.message}
            </DialogDescription>
          </DialogHeader>
          
          {requirementToShow && interestedIds.has(requirementToShow.id) ? (
            <div className="pt-6 text-center">
              <p className="text-sm font-semibold text-green-700 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 mr-2"/>
                You have already sent your response.
              </p>
            </div>
          ) : (
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleNotInterested}>
                Not Interested
              </Button>
              <Button onClick={handleInterested}>
                <Heart className="mr-2 h-4 w-4" /> Interested
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
<<<<<<< HEAD
};
=======
};
=======
  const handleInterested = () => {
    if (requirementToShow) {
      markAsInterested(requirementToShow.id);
      toast({
        title: "✅ Response Sent",
        description: "Your interest in the requirement has been recorded.",
      });
      setRequirementToShow(null);
    }
  };

  const handleNotInterested = () => {
    setRequirementToShow(null);
  };

  return (
    <>
      <div className="flex flex-col h-full max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              {/* <X className="h-4 w-4" />  */}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto group/list">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const hasResponded = notification.category === 'Requirements' && interestedIds.has(notification.id);
                return (
                  <div
                    key={notification.id}
                    className={`group p-4 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    } ${
                      hasResponded
                        ? 'bg-gray-100/50 opacity-80'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-base truncate ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                          </div>
                          {hasResponded && (
                            <Badge variant="secondary" className="border-green-300 bg-green-50 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1.5" />
                              Responded
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Requirement Interest Dialog */}
      <Dialog open={!!requirementToShow} onOpenChange={(isOpen) => !isOpen && setRequirementToShow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Requirement Details</DialogTitle>
            <DialogDescription className="pt-2">
              {requirementToShow?.message}
            </DialogDescription>
          </DialogHeader>
          
          {requirementToShow && interestedIds.has(requirementToShow.id) ? (
            <div className="pt-6 text-center">
              <p className="text-sm font-semibold text-green-700 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 mr-2"/>
                You have already sent your response.
              </p>
            </div>
          ) : (
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleNotInterested}>
                Not Interested
              </Button>
              <Button onClick={handleInterested}>
                <Heart className="mr-2 h-4 w-4" /> Interested
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
