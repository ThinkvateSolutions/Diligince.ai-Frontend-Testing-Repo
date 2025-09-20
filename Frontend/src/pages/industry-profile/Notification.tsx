import React from "react";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Globe,
  Calendar,
  Save,
  X,
  Home,
  User
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const defaultNotificationPrefs = {
  email: {
    newRequirements: true,
    messages: true,
    documentVerification: true,
  },
  sms: {
    criticalAlerts: true,
    paymentConfirmations: false,
  },
  inApp: {
    allActivities: true,
    systemUpdates: true,
  },
};

type NotificationPreferences = {
  email: {
    newRequirements: boolean;
    messages: boolean;
    documentVerification: boolean;
  };
  sms: {
    criticalAlerts: boolean;
    paymentConfirmations: boolean;
  };
  inApp: {
    allActivities: boolean;
    systemUpdates: boolean;
  };
};

const Notification = () => {
  const [editnotify, setEditnotify] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState(defaultNotificationPrefs);
  const [originalNotificationPrefs, setOriginalNotificationPrefs] = useState(null);
  const [notificationsEditMode, setNotificationsEditMode] = useState(false);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("notificationPrefs");
    if (storedPrefs) {
      setNotificationPrefs(JSON.parse(storedPrefs));
    }
  }, []);

  const enableNotificationEdit = () => {
    setOriginalNotificationPrefs(notificationPrefs); // save the current state
    setNotificationsEditMode(true);
  };

  const handleNotificationResetToDefault = () => {
    setNotificationPrefs(defaultNotificationPrefs);
    localStorage.removeItem("notificationPrefs");
    setNotificationsEditMode(false);
  };

  const handleNotificationSave = () => {
    console.log("Saving notification preferences:", notificationPrefs);
    localStorage.setItem("notificationPrefs", JSON.stringify(notificationPrefs));
    toast.success("Notification preferences updated successfully!");
    setNotificationsEditMode(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
        {!notificationsEditMode &&
          <Button onClick={enableNotificationEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" /> Edit 
          </Button>
        }
      </div>
      
      <hr className="mb-6" />
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 className="font-medium">New Requirements</h4>
            <p className="text-sm text-gray-600">Receive notifications about new requirements matching your profile</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.email.newRequirements}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  email: {
                    ...prev.email,
                    newRequirements: !prev.email.newRequirements,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 className="font-medium">Messages</h4>
            <p className="text-sm text-gray-600">Get email notifications when you receive new messages</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.email.messages}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  email: {
                    ...prev.email,
                    messages: !prev.email.messages,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 className="font-medium">Document Verification</h4>
            <p className="text-sm text-gray-600">Notifications about document verification status changes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.email.documentVerification}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  email: {
                    ...prev.email,
                    documentVerification: !prev.email.documentVerification,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">SMS Notifications</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Critical Alerts</h4>
              <div className="relative group">
                <Info className="w-4 h-4 text-black opacity-70 hover:opacity-100 cursor-pointer transition" />
                <div className="absolute z-10 hidden group-hover:block w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg bottom-full left-0 mb-1">
                  Need to Fill.
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Receive SMS for critical updates and alerts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.sms.criticalAlerts}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  sms: {
                    ...prev.sms,
                    criticalAlerts: !prev.sms.criticalAlerts,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 className="font-medium">Payment Confirmations</h4>
            <p className="text-sm text-gray-600">Get SMS notifications for payment confirmations</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.sms.paymentConfirmations}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  sms: {
                    ...prev.sms,
                    paymentConfirmations: !prev.sms.paymentConfirmations,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">In-App Notifications</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 className="font-medium">All Activities</h4>
            <p className="text-sm text-gray-600">Show notifications for all platform activities</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationPrefs.inApp.allActivities}
              disabled={!notificationsEditMode}
              onChange={() =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  inApp: {
                    ...prev.inApp,
                    allActivities: !prev.inApp.allActivities,
                  },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
        <div>
          {/* Second Block (fixed alignment) */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium">System Updates</h4>
            <div className="relative group">
              <Info className="w-4 h-4 text-black opacity-70 hover:opacity-100 cursor-pointer transition" />
              <div className="absolute z-10 hidden group-hover:block w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg bottom-full left-0 mb-1">
                Need to Fill.
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Get notified about system updates and maintenance</p>
        </div>
        
        <label className="relative inline-flex items-center cursor-not-allowed">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={true}
            disabled={true}
            readOnly
          />
          <div className="w-11 h-6 bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>
      </div>
      
      {notificationsEditMode && (
        <div className="flex justify-end gap-4">
          <Button onClick={handleNotificationSave}>Save </Button>
          <Button variant="outline" onClick={handleNotificationResetToDefault}>
            Reset to Default
          </Button>
          
        </div>
      )}
    </>
  );
}

export default Notification;