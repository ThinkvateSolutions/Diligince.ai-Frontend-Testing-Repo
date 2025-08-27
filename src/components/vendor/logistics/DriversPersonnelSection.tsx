<<<<<<< HEAD
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Users, ArrowUpDown, Info } from "lucide-react";
=======
<<<<<<< HEAD
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Users } from "lucide-react";
=======
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Users, ArrowUpDown, Info } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const personnelSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  licenseType: z.string().min(1, { message: "License type is required" }),
<<<<<<< HEAD
  licenseNumber: z.string().trim().min(6, { message: "License number must be at least 6 characters" }).max(20, { message: "License number must not exceed 20 characters" }).regex(/^[A-Z0-9-]+$/, { message: "License number must contain only uppercase letters, numbers, and dashes" }),
=======
<<<<<<< HEAD
  licenseNumber: z
  .string()
  .trim()
  .min(6, { message: "License number must be at least 6 characters" })
  .max(20, { message: "License number must not exceed 20 characters" })
  .regex(/^[A-Z0-9-]+$/, {
    message: "License number must contain only uppercase letters, numbers, and dashes",
  }),
=======
  licenseNumber: z.string().trim().min(6, { message: "License number must be at least 6 characters" }).max(20, { message: "License number must not exceed 20 characters" }).regex(/^[A-Z0-9-]+$/, { message: "License number must contain only uppercase letters, numbers, and dashes" }),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  experience: z.string().min(1, { message: "Experience is required" }),
  certifications: z.string(),
  availability: z.string().min(1, { message: "Availability status is required" }),
  contactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
// Define a type based on the zod schema
>>>>>>> 9b0ce35 (Initial commit)
type Personnel = z.infer<typeof personnelSchema> & { id: string };
type SortableKeys = keyof Omit<Personnel, 'id' | 'licenseNumber' | 'certifications' | 'contactNumber' | 'email'>;

const mockPersonnel: Personnel[] = [
  { id: "1", name: "Rajesh Kumar", position: "Senior Driver", licenseType: "Heavy Vehicle License", licenseNumber: "DL-1420110123456", experience: "12 years", certifications: "Hazardous Materials Transport, Mountain Driving", availability: "Available", contactNumber: "9876543210", email: "rajesh.k@translogindia.com" },
  { id: "2", name: "Sunil Verma", position: "Crane Operator", licenseType: "Heavy Equipment Operation License", licenseNumber: "HEOL-98765432", experience: "8 years", certifications: "Mobile Crane Operation, Safety Training", availability: "Assigned", contactNumber: "8765432109", email: "sunil.v@translogindia.com" },
  { id: "3", name: "Priya Sharma", position: "Logistics Coordinator", licenseType: "N/A", licenseNumber: "N/A", experience: "5 years", certifications: "Supply Chain Management, Logistics Planning", availability: "Available", contactNumber: "7654321098", email: "priya.s@translogindia.com" }
];

<<<<<<< HEAD
const positions = [ "Crane Operator", "Dispatcher", "Driver", "Equipment Operator", "Fleet Manager", "Forklift Operator", "Logistics Coordinator", "Maintenance Technician", "Senior Driver", "Transport Manager" ];
const licenseTypes = [ "Light Motor Vehicle—Non Transport", "Light Motor Vehicle—Invalid Carriage Non Transport", "Light Motor Vehicle—Transport", "Light Motor Vehicle", "Loader, Excavator, Hydraulic Equipment", "Heavy Motor Vehicle", "Heavy Passenger Motor Vehicle", "Heavy Goods Motor Vehicle, Heavy Passenger Motor Vehicle", "Agricultural Tractor and Power Tiller", "Additional Endorsement of Driving licence", "International Driving licence" ];
const availabilityStatuses = [ "Available", "Assigned", "On Leave", "Training", "Unavailable" ];
=======
const positions = [
  "Crane Operator",
  "Dispatcher",
  "Driver",
  "Equipment Operator",
  "Fleet Manager",
  "Forklift Operator",
  "Logistics Coordinator",
  "Maintenance Technician",
  "Senior Driver",
  "Transport Manager"
];

const licenseTypes = [
  "Hardous Materials Transport License",
  "Heavy Equipment Operation License",
  "Heavy Vehicle License",
  "International Driving Permit",
  "Light Commercial Vehicle License",
  "N/A",
];

const availabilityStatuses = [
  "Available",
  "Assigned",
  "On Leave",
  "Training",
  "Unavailable",
];
=======
type Personnel = z.infer<typeof personnelSchema> & { id: string };
type SortableKeys = keyof Omit<Personnel, 'id' | 'licenseNumber' | 'certifications' | 'contactNumber' | 'email'>;

const mockPersonnel: Personnel[] = [
  { id: "1", name: "Rajesh Kumar", position: "Senior Driver", licenseType: "Heavy Vehicle License", licenseNumber: "DL-1420110123456", experience: "12 years", certifications: "Hazardous Materials Transport, Mountain Driving", availability: "Available", contactNumber: "9876543210", email: "rajesh.k@translogindia.com" },
  { id: "2", name: "Sunil Verma", position: "Crane Operator", licenseType: "Heavy Equipment Operation License", licenseNumber: "HEOL-98765432", experience: "8 years", certifications: "Mobile Crane Operation, Safety Training", availability: "Assigned", contactNumber: "8765432109", email: "sunil.v@translogindia.com" },
  { id: "3", name: "Priya Sharma", position: "Logistics Coordinator", licenseType: "N/A", licenseNumber: "N/A", experience: "5 years", certifications: "Supply Chain Management, Logistics Planning", availability: "Available", contactNumber: "7654321098", email: "priya.s@translogindia.com" }
];

const positions = [ "Crane Operator", "Dispatcher", "Driver", "Equipment Operator", "Fleet Manager", "Forklift Operator", "Logistics Coordinator", "Maintenance Technician", "Senior Driver", "Transport Manager" ];
const licenseTypes = [ "Light Motor Vehicle—Non Transport", "Light Motor Vehicle—Invalid Carriage Non Transport", "Light Motor Vehicle—Transport", "Light Motor Vehicle", "Loader, Excavator, Hydraulic Equipment", "Heavy Motor Vehicle", "Heavy Passenger Motor Vehicle", "Heavy Goods Motor Vehicle, Heavy Passenger Motor Vehicle", "Agricultural Tractor and Power Tiller", "Additional Endorsement of Driving licence", "International Driving licence" ];
const availabilityStatuses = [ "Available", "Assigned", "On Leave", "Training", "Unavailable" ];
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

export const DriversPersonnelSection = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPersonnelId, setCurrentPersonnelId] = useState<string | null>(null);
<<<<<<< HEAD
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  
=======
<<<<<<< HEAD

>>>>>>> 9b0ce35 (Initial commit)
  const form = useForm<z.infer<typeof personnelSchema>>({
    resolver: zodResolver(personnelSchema),
    defaultValues: { name: "", position: "", licenseType: "", licenseNumber: "", experience: "", certifications: "", availability: "", contactNumber: "", email: "" },
  });

  const sortedPersonnel = useMemo(() => {
    let sortableItems = [...personnel];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'experience') {
          const numA = parseInt(aValue, 10);
          const numB = parseInt(bValue, 10);
          if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [personnel, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
    form.reset({ name: "", position: "", licenseType: "", licenseNumber: "", experience: "", certifications: "", availability: "Available", contactNumber: "", email: "" });
    setIsEditing(false);
    setCurrentPersonnelId(null);
<<<<<<< HEAD
    // The DialogTrigger now handles opening the dialog, so we don't need setIsDialogOpen(true) here
=======
    setIsDialogOpen(true);
=======
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  
  const form = useForm<z.infer<typeof personnelSchema>>({
    resolver: zodResolver(personnelSchema),
    defaultValues: { name: "", position: "", licenseType: "", licenseNumber: "", experience: "", certifications: "", availability: "", contactNumber: "", email: "" },
  });

  const sortedPersonnel = useMemo(() => {
    let sortableItems = [...personnel];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'experience') {
          const numA = parseInt(aValue, 10);
          const numB = parseInt(bValue, 10);
          if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [personnel, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
    form.reset({ name: "", position: "", licenseType: "", licenseNumber: "", experience: "", certifications: "", availability: "Available", contactNumber: "", email: "" });
    setIsEditing(false);
    setCurrentPersonnelId(null);
    // The DialogTrigger now handles opening the dialog, so we don't need setIsDialogOpen(true) here
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  };

  const openEditDialog = (id: string) => {
    const personnelToEdit = personnel.find(p => p.id === id);
    if (personnelToEdit) {
      form.reset(personnelToEdit);
      setIsEditing(true);
      setCurrentPersonnelId(id);
<<<<<<< HEAD
      // The DialogTrigger now handles opening the dialog
=======
<<<<<<< HEAD
      setIsDialogOpen(true);
=======
      // The DialogTrigger now handles opening the dialog
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    }
  };

  const deletePersonnel = (id: string) => {
    setPersonnel(personnel.filter(p => p.id !== id));
    toast.success("Personnel deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof personnelSchema>) => {
    if (isEditing && currentPersonnelId) {
<<<<<<< HEAD
      setPersonnel(personnel.map(p => p.id === currentPersonnelId ? { ...values, id: currentPersonnelId } : p));
      toast.success("Personnel updated successfully");
    } else {
=======
<<<<<<< HEAD
      // Update existing personnel
      setPersonnel(personnel.map(p => 
        p.id === currentPersonnelId ? { ...values, id: currentPersonnelId } : p
      ));
      toast.success("Personnel updated successfully");
    } else {
      // Add new personnel
=======
      setPersonnel(personnel.map(p => p.id === currentPersonnelId ? { ...values, id: currentPersonnelId } : p));
      toast.success("Personnel updated successfully");
    } else {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      const newId = Math.random().toString(36).substring(2, 9);
      setPersonnel([...personnel, { ...values, id: newId }]);
      toast.success("New personnel added successfully");
    }
    setIsDialogOpen(false);
  };

<<<<<<< HEAD
  const getStatusBadge = (status: string) => {
    switch (status) {
=======
<<<<<<< HEAD
  // Function to get the badge color based on availability status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600";
      case "Assigned":
        return "bg-blue-500 hover:bg-blue-600";
      case "On Leave":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Training":
        return "bg-purple-500 hover:bg-purple-600";
      case "Unavailable":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
=======
  const getStatusBadge = (status: string) => {
    switch (status) {
>>>>>>> 9b0ce35 (Initial commit)
      case "Available": return "bg-green-200 hover:bg-green-300 text-black";
      case "Assigned": return "bg-blue-200 hover:bg-blue-300 text-black";
      case "On Leave": return "bg-yellow-200 hover:bg-yellow-300 text-black";
      case "Training": return "bg-purple-200 hover:bg-purple-300 text-black";
      case "Unavailable": return "bg-red-200 hover:bg-red-300 text-black";
      default: return "bg-gray-300 hover:bg-gray-200 text-black";
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    }
  };

  return (
<<<<<<< HEAD
    // HIGHLIGHTED UPDATE: The Dialog component now wraps the entire UI
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold text-gray-800">Drivers & Personnel</CardTitle>
              <Info
                className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                onClick={() => setShowInfo1(!showInfo1)}
              />
            </div>
            {/* HIGHLIGHTED UPDATE: This button is now a DialogTrigger */}
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
=======
<<<<<<< HEAD
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Drivers & Personnel</CardTitle>
          <CardDescription>
            Manage your drivers, operators, and logistics staff
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Personnel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Personnel" : "Add New Personnel"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your team member" 
                  : "Add details about a new driver or logistics staff member"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.name? "text-black" : ""}>Full Name</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter full name"
          {...field}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            field.onChange(cleaned);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.position? "text-black" : ""}>Position/Role</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
  control={form.control}
  name="experience"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.experience? "text-black" : ""}>Experience</FormLabel>
      <FormControl>
        <Input
          placeholder="e.g. 5 years"
          {...field}
          onChange={(e) => {
            const value = e.target.value;
            const cleaned = value.replace(/[^a-zA-Z0-9\s+]/g, ""); // removes special chars except letters, numbers, space, and +
            field.onChange(cleaned);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="licenseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.licenseType? "text-black" : ""}>License Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select license type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {licenseTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.licenseNumber? "text-black" : ""}>License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={form.formState.errors.certifications? "text-black" : ""}>Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any relevant certifications, comma separated" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.availability? "text-black" : ""}>Availability</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availabilityStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.contactNumber? "text-black" : ""}>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.email ? "text-black" : ""}>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-4">
                  
                  <Button 
                    type="submit"
                    className="bg-[#eb2f96] hover:bg-[#c4257d]"
                  >
                    {isEditing ? "Update " : "Add "}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {personnel.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No personnel added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first team member
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
>>>>>>> 9b0ce35 (Initial commit)
                <Plus className="mr-2 h-4 w-4" /> Add Personnel
              </Button>
            </DialogTrigger>
          </div>
          {showInfo1 && (
            <CardDescription className="pt-2">
              Manage your drivers, operators, and logistics staff
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          {personnel.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No personnel added</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first team member</p>
              <div className="mt-6">
                {/* HIGHLIGHTED UPDATE: This button is also a DialogTrigger */}
                <DialogTrigger asChild>
                  <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                    <Plus className="mr-2 h-4 w-4" /> Add Personnel
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-100">
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('name')}><div className="flex items-center  gap-2"><span>Name</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'name' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('position')}><div className="flex items-center  gap-2"><span>Position</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'position' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseType')}><div className="flex items-center  gap-2"><span>License</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('experience')}><div className="flex items-center  gap-2"><span>Experience</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'experience' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('availability')}>
                      <div className="flex items-center gap-2">
                        <span>Status</span>
                        <ArrowUpDown className="h-4 w-4 text-slate-400" />
                        {sortConfig?.key === 'availability' && (
                          <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                        )}
                      </div> </TableHead>     
                      <TableHead className=" cursor-pointer hover:bg-pink-100">Contact</TableHead>
                    <TableHead className="text-center,  cursor-pointer hover:bg-pink-100">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="">{person.name}</TableCell>
                      <TableCell className="">{person.position}</TableCell>
                      <TableCell className=""><div>{person.licenseType}</div><div className="text-xs text-gray-500">{person.licenseNumber}</div></TableCell>
                      <TableCell className="">{person.experience}</TableCell>
                      <TableCell className=""><Badge className={getStatusBadge(person.availability)}>{person.availability}</Badge></TableCell>
                      <TableCell className=""><div>{person.contactNumber}</div><div className="text-xs text-gray-500">{person.email}</div></TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center items-center space-x-5">
                          {/* HIGHLIGHTED UPDATE: This Edit button is now a DialogTrigger */}
                          <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(person.id)} />
                          <Trash className="h-4 w-4 text-red-600" onClick={() => deletePersonnel(person.id)}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* HIGHLIGHTED UPDATE: The DialogContent is now a sibling of the Card, not a child */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{isEditing ? "Edit Personnel" : "Add New Personnel"}</DialogTitle>
            <Info className="h-4 w-4 cursor-pointer text-gray-500 transition-opacity hover:opacity-75" onClick={() => setShowInfo(!showInfo)}/>        
          </div>
          {showInfo && (
            <DialogDescription>
              {isEditing ? "Update the details of your team member" : "Add details about a new driver or logistics staff member"}
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* The form content itself requires no changes */}
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter full name" {...field} onChange={(e) => { const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, ''); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="position" render={({ field }) => (<FormItem><FormLabel>Position/Role</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger></FormControl><SelectContent>{positions.map((position) => (<SelectItem key={position} value={position}>{position}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="experience" render={({ field }) => (<FormItem><FormLabel>Experience</FormLabel><FormControl><Input placeholder="e.g. 5 years" {...field} onChange={(e) => { const value = e.target.value; const cleaned = value.replace(/[^a-zA-Z0-9\s+]/g, ""); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="licenseType" render={({ field }) => (<FormItem><FormLabel>License Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select license type" /></SelectTrigger></FormControl><SelectContent>{licenseTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="licenseNumber" render={({ field }) => (<FormItem><FormLabel>License Number</FormLabel><FormControl><Input placeholder="Enter license number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.control} name="availability" render={({ field }) => (<FormItem><FormLabel>Availability</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{availabilityStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="contactNumber" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="Enter phone number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Enter email address" type="email" {...field} /></FormControl><FormMessage/></FormItem>)} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
<<<<<<< HEAD
};
=======
};
=======
    // HIGHLIGHTED UPDATE: The Dialog component now wraps the entire UI
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold text-gray-800">Drivers & Personnel</CardTitle>
              <Info
                className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                onClick={() => setShowInfo1(!showInfo1)}
              />
            </div>
            {/* HIGHLIGHTED UPDATE: This button is now a DialogTrigger */}
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                <Plus className="mr-2 h-4 w-4" /> Add Personnel
              </Button>
            </DialogTrigger>
          </div>
          {showInfo1 && (
            <CardDescription className="pt-2">
              Manage your drivers, operators, and logistics staff
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          {personnel.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No personnel added</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first team member</p>
              <div className="mt-6">
                {/* HIGHLIGHTED UPDATE: This button is also a DialogTrigger */}
                <DialogTrigger asChild>
                  <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                    <Plus className="mr-2 h-4 w-4" /> Add Personnel
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-100">
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('name')}><div className="flex items-center  gap-2"><span>Name</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'name' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('position')}><div className="flex items-center  gap-2"><span>Position</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'position' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseType')}><div className="flex items-center  gap-2"><span>License</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('experience')}><div className="flex items-center  gap-2"><span>Experience</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'experience' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                    <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('availability')}>
                      <div className="flex items-center gap-2">
                        <span>Status</span>
                        <ArrowUpDown className="h-4 w-4 text-slate-400" />
                        {sortConfig?.key === 'availability' && (
                          <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                        )}
                      </div> </TableHead>     
                      <TableHead className=" cursor-pointer hover:bg-pink-100">Contact</TableHead>
                    <TableHead className="text-center,  cursor-pointer hover:bg-pink-100">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="">{person.name}</TableCell>
                      <TableCell className="">{person.position}</TableCell>
                      <TableCell className=""><div>{person.licenseType}</div><div className="text-xs text-gray-500">{person.licenseNumber}</div></TableCell>
                      <TableCell className="">{person.experience}</TableCell>
                      <TableCell className=""><Badge className={getStatusBadge(person.availability)}>{person.availability}</Badge></TableCell>
                      <TableCell className=""><div>{person.contactNumber}</div><div className="text-xs text-gray-500">{person.email}</div></TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center items-center space-x-5">
                          {/* HIGHLIGHTED UPDATE: This Edit button is now a DialogTrigger */}
                          <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(person.id)} />
                          <Trash className="h-4 w-4 text-red-600" onClick={() => deletePersonnel(person.id)}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* HIGHLIGHTED UPDATE: The DialogContent is now a sibling of the Card, not a child */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{isEditing ? "Edit Personnel" : "Add New Personnel"}</DialogTitle>
            <Info className="h-4 w-4 cursor-pointer text-gray-500 transition-opacity hover:opacity-75" onClick={() => setShowInfo(!showInfo)}/>        
          </div>
          {showInfo && (
            <DialogDescription>
              {isEditing ? "Update the details of your team member" : "Add details about a new driver or logistics staff member"}
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* The form content itself requires no changes */}
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter full name" {...field} onChange={(e) => { const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, ''); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="position" render={({ field }) => (<FormItem><FormLabel>Position/Role</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger></FormControl><SelectContent>{positions.map((position) => (<SelectItem key={position} value={position}>{position}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="experience" render={({ field }) => (<FormItem><FormLabel>Experience</FormLabel><FormControl><Input placeholder="e.g. 5 years" {...field} onChange={(e) => { const value = e.target.value; const cleaned = value.replace(/[^a-zA-Z0-9\s+]/g, ""); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="licenseType" render={({ field }) => (<FormItem><FormLabel>License Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select license type" /></SelectTrigger></FormControl><SelectContent>{licenseTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="licenseNumber" render={({ field }) => (<FormItem><FormLabel>License Number</FormLabel><FormControl><Input placeholder="Enter license number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.control} name="availability" render={({ field }) => (<FormItem><FormLabel>Availability</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{availabilityStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="contactNumber" render={({ field }) => (<FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="Enter phone number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Enter email address" type="email" {...field} /></FormControl><FormMessage/></FormItem>)} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
