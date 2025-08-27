import { useState } from "react";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Info, Lock, Mail, Shield, User, Users, Trash2, Eye, EyeOff, Bell, Smartphone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const securitySchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const twoFactorSchema = z.object({
  enableTwoFactor: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  //receiveBackupCodes: z.boolean().default(false),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  loginAlerts: z.boolean().default(true),
  paymentNotifications: z.boolean().default(true),
  projectUpdates: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

const privacySchema = z.object({
  profileVisibility: z.boolean().default(true),
  showContactInfo: z.boolean().default(true),
  showCompanyDetails: z.boolean().default(true),
  allowDataSharing: z.boolean().default(false),
});

const emailSchema = z.string().email({ message: "Please enter a valid email address." });
type SecuritySettings = z.infer<typeof securitySchema>;
type TwoFactorSettings = z.infer<typeof twoFactorSchema>;
type NotificationSettings = z.infer<typeof notificationsSchema>;
type PrivacySettings = z.infer<typeof privacySchema>;

const teamMembers = [
  { id: "1", name: "Raj Mehta", email: "raj.mehta@techserve.com", role: "Admin", status: "active" },
  { id: "2", name: "Priya Shah", email: "priya.shah@techserve.com", role: "Editor", status: "active" },
  { id: "3", name: "Ankit Patel", email: "ankit.patel@techserve.com", role: "Viewer", status: "invited" },
];

const PasswordInput = ({ field, placeholder }: { field: any; placeholder: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} type={showPassword ? "text" : "password"} className="pl-10 pr-10" {...field} 
      />
      <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground" onClick={togglePasswordVisibility}>
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} 
      </Button>
    </div>
  );
};

const AccountSettingsForm = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [isSecuritySubmitting, setIsSecuritySubmitting] = useState(false);
  const [isTwoFactorSubmitting, setIsTwoFactorSubmitting] = useState(false);
  const [isNotificationsSubmitting, setIsNotificationsSubmitting] = useState(false);
  const [isPrivacySubmitting, setIsPrivacySubmitting] = useState(false);
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState("");
  const [localTeamMembers, setLocalTeamMembers] = useState(teamMembers);
  const [showAccessInfo, setShowAccessInfo] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  type Session = { id: number; name: string; location: string; current: boolean; lastActive: string; };
  const defaultSessions: Session[] = [
    { id: 1, name: "Chrome on Windows", location: "Mumbai, India", current: true, lastActive: "Current Session" },
    { id: 2, name: "Firefox on MacOS", location: "Delhi, India", current: false, lastActive: "Last active: Yesterday" },
    { id: 3, name: "Safari on iPhone", location: "Mumbai, India", current: false, lastActive: "Last active: 2 days ago" },
  ];
  const [sessions, setSessions] = useState<Session[]>(() => {
    const stored = localStorage.getItem("sessions");
    return stored ? JSON.parse(stored) : defaultSessions;
  });

const securityForm = useForm<SecuritySettings>({
  resolver: zodResolver(securitySchema),
  defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  mode: "onChange", // validates as you type
  reValidateMode: "onChange" // re-validates after each change
});  const twoFactorForm = useForm<TwoFactorSettings>({ resolver: zodResolver(twoFactorSchema), defaultValues: { enableTwoFactor: false, phoneNumber: "" } });
  const notificationsForm = useForm<NotificationSettings>({ resolver: zodResolver(notificationsSchema), defaultValues: { emailNotifications: true, loginAlerts: true, paymentNotifications: true, projectUpdates: true, marketingEmails: false } });
  const privacyForm = useForm<PrivacySettings>({ resolver: zodResolver(privacySchema), defaultValues: { profileVisibility: true, showContactInfo: true, showCompanyDetails: true, allowDataSharing: false } });

  const { trigger, watch } = securityForm;
     useEffect(() => {
    trigger("newPassword");
   },   [watch("newPassword")])

  const onSubmitSecurity = (values: SecuritySettings) => {
    setIsSecuritySubmitting(true);
    setTimeout(() => { console.log("Security values:", values); setIsSecuritySubmitting(false); toast.success("Password updated successfully!"); securityForm.reset({ currentPassword: "", newPassword: "", confirmPassword: "" }); }, 1500);
  };

  const handleLogout = (id: number, name: string) => {
    if (window.confirm(`Do you want to logout from ${name}?`)) {
      const updatedSessions = sessions.filter((session) => session.id !== id);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success(`Logged out from ${name}`);
    }
  };

  const handleLogoutAll = () => {
    if (window.confirm("Do you want to logout from all other devices?")) {
      const updatedSessions = sessions.filter((session) => session.current);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success("Logged out from all other devices");
    }
  };

  const onSubmitTwoFactor = (values: TwoFactorSettings) => {
    setIsTwoFactorSubmitting(true);
    setTimeout(() => { console.log("Two-factor values:", values); setIsTwoFactorSubmitting(false); toast.success("Authentication settings updated!"); }, 1500);
  };
  
  const onSubmitNotifications = (values: NotificationSettings) => {
    setIsNotificationsSubmitting(true);
    setTimeout(() => { console.log("Notification values:", values); setIsNotificationsSubmitting(false); toast.success("Notification preferences updated!"); }, 1000);
  };
  
  const onSubmitPrivacy = (values: PrivacySettings) => {
    setIsPrivacySubmitting(true);
    setTimeout(() => { console.log("Privacy values:", values); setIsPrivacySubmitting(false); toast.success("Privacy settings updated!"); }, 1000);
  };

  const inviteTeamMember = () => {
    const validationResult = emailSchema.safeParse(newTeamMemberEmail);
    if (!validationResult.success) { toast.error(validationResult.error.issues[0].message); return; }
    const newMember = { id: `${Date.now()}`, name: validationResult.data.split('@')[0], email: validationResult.data, role: "Viewer", status: "invited" };
    setLocalTeamMembers([...localTeamMembers, newMember]);
    setNewTeamMemberEmail("");
    toast.success("Invitation sent successfully!");
  };

  const removeTeamMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setLocalTeamMembers(localTeamMembers.filter(member => member.id !== id));
      toast.success("Team member removed successfully!");
    }
  };

  const changeRole = (id: string, role: string) => {
    setLocalTeamMembers(localTeamMembers.map(member => member.id === id ? { ...member, role } : member));
    toast.success("Role updated successfully!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-gray-800">Account Settings</CardTitle>
            <button type="button" onClick={() => setShowAccountInfo(prev => !prev)} className="text-gray-500">
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>
        {showAccountInfo && (
          <CardDescription className="pt-2">
            Manage your account security, access and preferences
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="password" className="flex items-center gap-2"><Lock size={14} /> Password</TabsTrigger>
            <TabsTrigger value="2fa" className="flex items-center justify-center gap-2"><EyeOff size={14} /> Two-Factor</TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell size={14} /> Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2"><Shield size={14} /> Privacy</TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2"><Smartphone size={14} /> Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="password">
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSubmitSecurity)} className="space-y-6">
                <div className="space-y-4">
                  <FormField control={securityForm.control} name="currentPassword" render={({ field }) => (<FormItem><FormLabel>Current Password</FormLabel><FormControl><PasswordInput field={field} placeholder="Enter current password" /></FormControl><FormDescription></FormDescription><FormMessage /></FormItem>)} />
                  <FormField control={securityForm.control} name="newPassword" render={({ field }) => (<FormItem><FormLabel>New Password</FormLabel><FormControl><PasswordInput field={field} placeholder="Enter new password" /></FormControl><FormDescription>Password must contain at least 8 characters, including uppercase, lowercase, number and special character.</FormDescription><FormMessage /></FormItem>)} />
                  <FormField control={securityForm.control} name="confirmPassword" render={({ field }) => (<FormItem><FormLabel>Confirm Password</FormLabel><FormControl><PasswordInput field={field} placeholder="Confirm new password" /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSecuritySubmitting || !securityForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isSecuritySubmitting ? "Updating..." : "Update"}</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="2fa">
            <Form {...twoFactorForm}>
              <form onSubmit={twoFactorForm.handleSubmit(onSubmitTwoFactor)} className="space-y-6">
                <div className="rounded-lg border p-6 pb-4 space-y-4">
                  <div className="flex items-center gap-4"><div className="rounded-full bg-[#eb2f96]/10 p-2"><Shield className="h-6 w-6 text-[#eb2f96]" /></div><div><h3 className="text-lg font-medium">Two-Factor Authentication</h3><p className="text-sm text-gray-500">Add an extra layer of security to your account</p></div></div>
                  <FormField control={twoFactorForm.control} name="enableTwoFactor" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4"><div className="space-y-0.5"><FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel><FormDescription>Require a verification code when logging in</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                  {twoFactorForm.watch("enableTwoFactor") && (
                    <div className="space-y-4 mt-4">
                      <FormField control={twoFactorForm.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number for SMS Verification</FormLabel><FormControl><Input placeholder="Enter phone number" {...field} /></FormControl><FormDescription>We'll send a verification code to this number when you log in</FormDescription><FormMessage /></FormItem>)} />
                     
                        
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isTwoFactorSubmitting || !twoFactorForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isTwoFactorSubmitting ? "Saving..." : "Save"}</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                <div className="space-y-4">
                  {sessions.map((session) => (<div key={session.id} className="flex items-center justify-between rounded-lg border p-4"><div className="space-y-1"><h4 className="text-sm font-medium">{session.name}</h4><p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p></div>{session.current ? (<Button variant="ghost" size="sm" disabled>Current</Button>) : (<Button className="bg-[#eb2f96] text-white" variant="outline" size="sm" onClick={() => handleLogout(session.id, session.name)}>Logout</Button>)}</div>))}
                </div>
                {sessions.filter((s) => !s.current).length > 0 && (<div className="flex justify-end space-x-4 pt-4"><Button className="bg-[#eb2f96] text-white" variant="outline" onClick={handleLogoutAll}>Logout from All Devices</Button></div>)}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Login History</h3>
                <Table>
                  <TableHeader><TableRow><TableHead>Date & Time</TableHead><TableHead>Device</TableHead><TableHead>Location</TableHead><TableHead>IP Address</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>May 5, 2025 09:15 AM</TableCell><TableCell>Chrome on Windows</TableCell><TableCell>Mumbai, India</TableCell><TableCell>192.168.1.1</TableCell><TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Successful</Badge></TableCell></TableRow>
                    <TableRow><TableCell>May 4, 2025 02:30 PM</TableCell><TableCell>Firefox on MacOS</TableCell><TableCell>Delhi, India</TableCell><TableCell>192.168.2.2</TableCell><TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Successful</Badge></TableCell></TableRow>
                    <TableRow><TableCell>May 3, 2025 10:45 AM</TableCell><TableCell>Safari on iPhone</TableCell><TableCell>Unknown</TableCell><TableCell>192.168.3.3</TableCell><TableCell><Badge variant="destructive">Failed</Badge></TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
                <div className="rounded-lg border p-6 pb-4 space-y-4">
                  <div className="flex items-center gap-4"><div className="rounded-full bg-[#eb2f96]/10 p-2"><Mail className="h-6 w-6 text-[#eb2f96]" /></div><div><h3 className="text-lg font-medium">Notification Preferences</h3><p className="text-sm text-gray-500">Control which notifications you receive</p></div></div>
                  <div className="space-y-4 mt-4">
                    <FormField control={notificationsForm.control} name="emailNotifications" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Email Notifications</FormLabel><FormDescription>Receive notifications via email</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={notificationsForm.control} name="loginAlerts" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Login Alerts</FormLabel><FormDescription>Get notified about new logins to your account</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={notificationsForm.control} name="paymentNotifications" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Payment Notifications</FormLabel><FormDescription>Receive updates about payments and invoices</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={notificationsForm.control} name="projectUpdates" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Project Updates</FormLabel><FormDescription>Get notifications about project status changes</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={notificationsForm.control} name="marketingEmails" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Marketing Emails</FormLabel><FormDescription>Receive promotional emails and platform updates</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isNotificationsSubmitting || !notificationsForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isNotificationsSubmitting ? "Saving..." : "Save"}</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Form {...privacyForm}>
              <form onSubmit={privacyForm.handleSubmit(onSubmitPrivacy)} className="space-y-6">
                <div className="rounded-lg border p-6 pb-4 space-y-4">
                  <div className="flex items-center gap-4"><div className="rounded-full bg-[#eb2f96]/10 p-2"><User className="h-6 w-6 text-[#eb2f96]" /></div><div><h3 className="text-lg font-medium">Privacy Settings</h3><p className="text-sm text-gray-500">Control your profile visibility and data sharing</p></div></div>
                  <div className="space-y-4 mt-4">
                    <FormField control={privacyForm.control} name="profileVisibility" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Profile Visibility</FormLabel><FormDescription>Make your vendor profile visible to industrial clients</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={privacyForm.control} name="showContactInfo" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Contact Information</FormLabel><FormDescription>Display your contact information on your profile</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={privacyForm.control} name="showCompanyDetails" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Company Details</FormLabel><FormDescription>Show company registration and tax details on your profile</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                    <FormField control={privacyForm.control} name="allowDataSharing" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><FormLabel className="text-base">Data Sharing</FormLabel><FormDescription>Allow Diligince.ai to share your profile data with partner platforms</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isPrivacySubmitting || !privacyForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isPrivacySubmitting ? "Saving..." : "Save"}</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountSettingsForm;