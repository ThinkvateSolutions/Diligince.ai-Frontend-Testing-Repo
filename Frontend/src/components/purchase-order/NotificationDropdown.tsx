import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const mockNotifications = [
  {
    id: 1,
    title: "New Message",
    message: "You have a new message from 'XYZ' Company",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Profile Update",
    message: "Your profile has been successfully updated",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "New Opportunity",
    message: "A new opportunity matches your skills",
    time: "2 hours ago",
    read: false,
  },
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length + 10; // Example with 97 unread

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const formatBadgeCount = (count: number) => {
    return count > 99 ? "99+" : count.toString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={24} />
          {unreadCount > 0 && (
<span
  className={`
    absolute
    top-0
    right-0
    w-[20px]
    h-[20px]
    bg-red-500
    text-white
    text-[13px]
    font-extrabold
    rounded-full
    flex
    items-center
    justify-center
    shadow
  `}
  style={{
    transform: "translate(0px, -4px)", // 🔧 nudged right, still close to top
  }}
>
  {unreadCount > 99 ? (
    <>
      99<sup className="text-[9px]">+</sup>
    </>
  ) : (
    unreadCount
  )}
</span>








          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2">
          <h4 className="font-medium">Notifications</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-4 cursor-pointer ${!notification.read ? 'bg-purple-50' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-blue-600 font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;