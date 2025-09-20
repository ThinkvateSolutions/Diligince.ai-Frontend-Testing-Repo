import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Lock, Shield, Smartphone, History, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Session = {
  id: number;
  name: string;
  location: string;
  current: boolean;
  lastActive: string;
};

const Security = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const defaultSessions: Session[] = [
    {
      id: 1,
      name: "Chrome on Windows",
      location: "Mumbai, India",
      current: true,
      lastActive: "Current Session",
    },
    {
      id: 2,
      name: "Firefox on MacOS",
      location: "Delhi, India",
      current: false,
      lastActive: "Last active: Yesterday",
    },
    {
      id: 3,
      name: "Safari on iPhone",
      location: "Mumbai, India",
      current: false,
      lastActive: "Last active: 2 days ago",
    },
  ];

  const [sessions, setSessions] = useState<Session[]>(() => {
    const stored = localStorage.getItem("sessions");
    return stored ? JSON.parse(stored) : defaultSessions;
  });

  const handleLogout = (id: number, name: string) => {
    const confirmLogout = window.confirm(`Do you want to logout from ${name}?`);
    if (confirmLogout) {
      const updatedSessions = sessions.filter((session) => session.id !== id);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success(`Logged out from ${name}`);
    }
  };

  const handleLogoutAll = () => {
    const confirmAll = window.confirm("Do you want to logout from all devices?");
    if (confirmAll) {
      const updatedSessions = sessions.filter((session) => session.current);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success("Logged out from all other devices");
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      console.log("Update password data:", values);
      localStorage.setItem("passwordForm", JSON.stringify({
        updatedAt: new Date().toISOString()
      }));
      toast.success("Password updated successfully!");
      passwordForm.reset();
    } catch (error) {
      toast.error("Failed to update password.");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security, active sessions, and login history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password">
        <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="password" className="flex items-center justify-center gap-2">
          <Lock size={14} /> Password
        </TabsTrigger>
        <TabsTrigger value="2fa" className="flex items-center justify-center gap-2">
          <Shield size={14} /> Two-Factor
        </TabsTrigger>
        <TabsTrigger value="sessions" className="flex items-center justify-center gap-2">
          <Smartphone size={14} /> Sessions
        </TabsTrigger>
      </TabsList>

          <TabsContent value="password">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            className="border-gray-400"
                            type={showCurrentPassword ? "text" : "password"} 
                            placeholder="Enter your current password" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            className="border-gray-400"
                            type={showNewPassword ? "text" : "password"} 
                            placeholder="Enter new password" 
                            {...field} 
                            disabled={!passwordForm.watch("currentPassword")}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters with letters, numbers, and special characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            className="border-gray-400"
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm new password" 
                            {...field} 
                            disabled={!passwordForm.watch("currentPassword")}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="2fa">
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance your account security with an extra layer of protection
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button onClick={() => navigate("*")}>Setup 2FA</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">{session.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.lastActive}
                        </p>
                      </div>
                      {session.current ? (
                        <Button variant="ghost" size="sm" disabled>
                          Current
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLogout(session.id, session.name)}
                        >
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {sessions.filter((s) => !s.current).length > 0 && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" onClick={handleLogoutAll}>
                      Logout from All Devices
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Login History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 5, 2025 09:15 AM</TableCell>
                      <TableCell>Chrome on Windows</TableCell>
                      <TableCell>Mumbai, India</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Successful
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 4, 2025 02:30 PM</TableCell>
                      <TableCell>Firefox on MacOS</TableCell>
                      <TableCell>Delhi, India</TableCell>
                      <TableCell>192.168.2.2</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Successful
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 3, 2025 10:45 AM</TableCell>
                      <TableCell>Safari on iPhone</TableCell>
                      <TableCell>Unknown</TableCell>
                      <TableCell>192.168.3.3</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Failed</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default Security;