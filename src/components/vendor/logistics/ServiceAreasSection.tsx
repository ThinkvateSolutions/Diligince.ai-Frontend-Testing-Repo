<<<<<<< HEAD
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Plus, Edit, Trash, ArrowUpDown, Info } from "lucide-react";
=======
<<<<<<< HEAD
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Plus, Edit, Trash } from "lucide-react";
=======
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Plus, Edit, Trash, ArrowUpDown, Info } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const serviceAreaSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  state: z.string().min(1, { message: "State/Region is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  serviceRadius: z.string().min(1, { message: "Service radius is required" }),
  transitTime: z.string().min(1, { message: "Transit time is required" }),
  pricePerKm: z.string().min(1, { message: "Price per km is required" }),
  specialConditions: z.string().optional(),
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
// Define a type based on the zod schema
>>>>>>> 9b0ce35 (Initial commit)
type ServiceArea = z.infer<typeof serviceAreaSchema> & { id: string };
type SortableKeys = keyof Omit<ServiceArea, 'id' | 'specialConditions' | 'country'>;

const mockServiceAreas: ServiceArea[] = [
  { id: "1", location: "Mumbai", state: "Maharashtra", country: "India", serviceRadius: "150", transitTime: "1-2 days", pricePerKm: "₹50", specialConditions: "No service during monsoon season in certain coastal areas" },
  { id: "2", location: "Delhi NCR", state: "Delhi", country: "India", serviceRadius: "200", transitTime: "2-3 days", pricePerKm: "₹55", specialConditions: "Restrictions in central Delhi during peak hours" },
  { id: "3", location: "Bangalore", state: "Karnataka", country: "India", serviceRadius: "100", transitTime: "1-2 days", pricePerKm: "₹60", specialConditions: "Additional charges for airport area deliveries" }
];

<<<<<<< HEAD
const indianStates = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" ];
=======
// States in India for dropdown
const indianStates = [
  "Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chandigarh",
"Chhattisgarh",
"Delhi",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jammu and Kashmir",
"Jharkhand",
"Karnataka",
"Kerala",
"Ladakh",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Puducherry",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal"

];
=======
type ServiceArea = z.infer<typeof serviceAreaSchema> & { id: string };
type SortableKeys = keyof Omit<ServiceArea, 'id' | 'specialConditions' | 'country'>;

const mockServiceAreas: ServiceArea[] = [
  { id: "1", location: "Mumbai", state: "Maharashtra", country: "India", serviceRadius: "150", transitTime: "1-2 days", pricePerKm: "₹50", specialConditions: "No service during monsoon season in certain coastal areas" },
  { id: "2", location: "Delhi NCR", state: "Delhi", country: "India", serviceRadius: "200", transitTime: "2-3 days", pricePerKm: "₹55", specialConditions: "Restrictions in central Delhi during peak hours" },
  { id: "3", location: "Bangalore", state: "Karnataka", country: "India", serviceRadius: "100", transitTime: "1-2 days", pricePerKm: "₹60", specialConditions: "Additional charges for airport area deliveries" }
];

const indianStates = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" ];
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

export const ServiceAreasSection = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>(mockServiceAreas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAreaId, setCurrentAreaId] = useState<string | null>(null);
<<<<<<< HEAD
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)

  const form = useForm<z.infer<typeof serviceAreaSchema>>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: { location: "", state: "", country: "India", serviceRadius: "", transitTime: "", pricePerKm: "", specialConditions: "" },
  });

  const sortedServiceAreas = useMemo(() => {
    let sortableItems = [...serviceAreas];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'serviceRadius' || sortConfig.key === 'pricePerKm') {
          const numA = parseFloat(aValue.replace(/[^0-9.]/g, ''));
          const numB = parseFloat(bValue.replace(/[^0-9.]/g, ''));
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
  }, [serviceAreas, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
<<<<<<< HEAD
    form.reset({ location: "", state: "", country: "India", serviceRadius: "", transitTime: "", pricePerKm: "", specialConditions: "" });
=======
    form.reset({
      location: "",
      state: "",
      country: "India",
      serviceRadius: "",
      transitTime: "",
      pricePerKm: "",
      specialConditions: "",
    });
=======
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);

  const form = useForm<z.infer<typeof serviceAreaSchema>>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: { location: "", state: "", country: "India", serviceRadius: "", transitTime: "", pricePerKm: "", specialConditions: "" },
  });

  const sortedServiceAreas = useMemo(() => {
    let sortableItems = [...serviceAreas];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'serviceRadius' || sortConfig.key === 'pricePerKm') {
          const numA = parseFloat(aValue.replace(/[^0-9.]/g, ''));
          const numB = parseFloat(bValue.replace(/[^0-9.]/g, ''));
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
  }, [serviceAreas, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
    form.reset({ location: "", state: "", country: "India", serviceRadius: "", transitTime: "", pricePerKm: "", specialConditions: "" });
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    setIsEditing(false);
    setCurrentAreaId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const areaToEdit = serviceAreas.find(a => a.id === id);
    if (areaToEdit) {
      form.reset(areaToEdit);
      setIsEditing(true);
      setCurrentAreaId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteServiceArea = (id: string) => {
    setServiceAreas(serviceAreas.filter(a => a.id !== id));
    toast.success("Service area deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof serviceAreaSchema>) => {
    if (isEditing && currentAreaId) {
<<<<<<< HEAD
      setServiceAreas(serviceAreas.map(a => a.id === currentAreaId ? { ...values, id: currentAreaId } : a));
      toast.success("Service area updated successfully");
    } else {
=======
<<<<<<< HEAD
      // Update existing area
      setServiceAreas(serviceAreas.map(a => 
        a.id === currentAreaId ? { ...values, id: currentAreaId } : a
      ));
      toast.success("Service area updated successfully");
    } else {
      // Add new area
=======
      setServiceAreas(serviceAreas.map(a => a.id === currentAreaId ? { ...values, id: currentAreaId } : a));
      toast.success("Service area updated successfully");
    } else {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      const newId = Math.random().toString(36).substring(2, 9);
      setServiceAreas([...serviceAreas, { ...values, id: newId }]);
      toast.success("New service area added successfully");
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
<<<<<<< HEAD
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-gray-800">Service Areas</CardTitle>
            <Info
              className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
              onClick={() => setShowInfo1(!showInfo1)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                <Plus className="mr-2 h-4 w-4" /> Add Service Area
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{isEditing ? "Edit Service Area" : "Add New Service Area"}</DialogTitle>
                  <Info
                    className="h-4 w-4 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                    onClick={() => setShowInfo(!showInfo)}
                  />
                </div>
                {showInfo && (
                  <DialogDescription>
                    {isEditing 
                      ? "Update the details of your service area" 
                      : "Add details about a new region where you provide services"}
                  </DialogDescription>
                )}
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* The entire form dialog remains unchanged */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Location/City</FormLabel><FormControl><Input placeholder="e.g. Mumbai" {...field} onChange={(e) => { const onlyAlphabets = e.target.value.replace(/[^a-zA-Z\s]/g, ""); field.onChange(onlyAlphabets); }} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State/Region</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl><SelectContent>{indianStates.map((state) => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="serviceRadius" render={({ field }) => (<FormItem><FormLabel>Service Radius (km)</FormLabel><FormControl><Input type="number" min={1} placeholder="e.g. 100" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="transitTime" render={({ field }) => (<FormItem><FormLabel>Transit Time Estimate</FormLabel><FormControl><Input placeholder="e.g. 1-2 days" {...field} onChange={(e) => { const value = e.target.value; const cleaned = value.replace(/(^|\s)-\d+/g, ""); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="pricePerKm" render={({ field }) => (<FormItem><FormLabel>Price per km/mile (₹)</FormLabel><FormControl><Input type="number" min={0} step="0.01" placeholder="e.g. 50" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="specialConditions" render={({ field }) => (<FormItem><FormLabel>Special Conditions</FormLabel><FormControl><Input placeholder="Any special conditions or restrictions for this area" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <DialogFooter className="pt-4">
                    <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        {showInfo1 && (
          <CardDescription className="pt-2">
            Define the regions where you provide logistics services
          </CardDescription>
        )}
=======
<<<<<<< HEAD
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Service Areas</CardTitle>
          <CardDescription>
            Define the regions where you provide logistics services
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Service Area
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Service Area" : "Add New Service Area"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your service area" 
                  : "Add details about a new region where you provide services"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
  control={form.control}
  name="location"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.location? "text-black" : ""}>Location/City</FormLabel>
      <FormControl>
        <Input
          placeholder="e.g. Mumbai"
          {...field}
          onChange={(e) => {
            const onlyAlphabets = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // allows letters and space only
            field.onChange(onlyAlphabets);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.state ? "text-black" : ""}>State/Region</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.country? "text-black" : ""}>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
  control={form.control}
  name="serviceRadius"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.serviceRadius ? "text-black" : ""}>Service Radius (km)</FormLabel>
      <FormControl>
        <Input
          type="number"
          min={1} // ensures only positive values
          placeholder="e.g. 100"
          {...field}
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
  name="transitTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.transitTime? "text-black" : ""}>Transit Time Estimate</FormLabel>
      <FormControl>
        <Input
          placeholder="e.g. 1-2 days"
          {...field}
          onChange={(e) => {
            // Remove any leading '-' and prevent standalone negative numbers
            const value = e.target.value;
            const cleaned = value.replace(/(^|\s)-\d+/g, ""); // removes negative numbers like -2
            field.onChange(cleaned);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>



                  <FormField
  control={form.control}
  name="pricePerKm"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={form.formState.errors.pricePerKm ? "text-black" : ""}>Price per km/mile (₹)</FormLabel>
      <FormControl>
        <Input
          type="number"
          min={0} // allows only non-negative values
          step="0.01" // optional: allows decimals like 10.50
          placeholder="e.g. 50"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                </div>

                <FormField
                  control={form.control}
                  name="specialConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={form.formState.errors.specialConditions ? "text-black" : ""}>Special Conditions</FormLabel>
                      <FormControl>
                        <Input placeholder="Any special conditions or restrictions for this area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  
                  <Button 
                    type="submit"
                    className="bg-[#eb2f96] hover:bg-[#c4257d]"
                  >
                    {isEditing ? "Update" : "Add"}
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
=======
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-gray-800">Service Areas</CardTitle>
            <Info
              className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
              onClick={() => setShowInfo1(!showInfo1)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                <Plus className="mr-2 h-4 w-4" /> Add Service Area
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{isEditing ? "Edit Service Area" : "Add New Service Area"}</DialogTitle>
                  <Info
                    className="h-4 w-4 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                    onClick={() => setShowInfo(!showInfo)}
                  />
                </div>
                {showInfo && (
                  <DialogDescription>
                    {isEditing 
                      ? "Update the details of your service area" 
                      : "Add details about a new region where you provide services"}
                  </DialogDescription>
                )}
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* The entire form dialog remains unchanged */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Location/City</FormLabel><FormControl><Input placeholder="e.g. Mumbai" {...field} onChange={(e) => { const onlyAlphabets = e.target.value.replace(/[^a-zA-Z\s]/g, ""); field.onChange(onlyAlphabets); }} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State/Region</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl><SelectContent>{indianStates.map((state) => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="serviceRadius" render={({ field }) => (<FormItem><FormLabel>Service Radius (km)</FormLabel><FormControl><Input type="number" min={1} placeholder="e.g. 100" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="transitTime" render={({ field }) => (<FormItem><FormLabel>Transit Time Estimate</FormLabel><FormControl><Input placeholder="e.g. 1-2 days" {...field} onChange={(e) => { const value = e.target.value; const cleaned = value.replace(/(^|\s)-\d+/g, ""); field.onChange(cleaned); }} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="pricePerKm" render={({ field }) => (<FormItem><FormLabel>Price per km/mile (₹)</FormLabel><FormControl><Input type="number" min={0} step="0.01" placeholder="e.g. 50" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="specialConditions" render={({ field }) => (<FormItem><FormLabel>Special Conditions</FormLabel><FormControl><Input placeholder="Any special conditions or restrictions for this area" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <DialogFooter className="pt-4">
                    <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        {showInfo1 && (
          <CardDescription className="pt-2">
            Define the regions where you provide logistics services
          </CardDescription>
        )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </CardHeader>
      
      <CardContent>
        {serviceAreas.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No service areas added</h3>
<<<<<<< HEAD
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first service area</p>
            <div className="mt-6">
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add Service Area</Button>
=======
<<<<<<< HEAD
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first service area
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Service Area
              </Button>
=======
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first service area</p>
            <div className="mt-6">
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add Service Area</Button>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
<<<<<<< HEAD
                <TableRow className="bg-pink-100">
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('state')}><div className="flex items-center  gap-2"><span>State/Region</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'state' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('serviceRadius')}><div className="flex items-center  gap-2"><span>Service Radius</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'serviceRadius' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('transitTime')}><div className="flex items-center  gap-2"><span>Transit Time</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'transitTime' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('pricePerKm')}><div className="flex items-center  gap-2"><span>Price per km</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'pricePerKm' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className="text-center,  cursor-pointer hover:bg-pink-50">Actions</TableHead>
=======
<<<<<<< HEAD
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>State/Region</TableHead>
                  <TableHead>Service Radius</TableHead>
                  <TableHead>Transit Time</TableHead>
                  <TableHead>Price per km</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
>>>>>>> 9b0ce35 (Initial commit)
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedServiceAreas.map((area) => (
                  <TableRow key={area.id}>
<<<<<<< HEAD
=======
                    <TableCell className="font-medium">{area.location}</TableCell>
                    <TableCell>{area.state}</TableCell>
                    <TableCell>{area.serviceRadius} km</TableCell>
                    <TableCell>{area.transitTime}</TableCell>
                    <TableCell>{area.pricePerKm}</TableCell>
                    <TableCell className="flex justify-center items-center gap-x-2">
                      
<Button
  variant="outline"
  size="sm"
  onClick={() => openEditDialog(area.id)}
>
  <Edit className="h-4 w-4 text-blue-600" />
</Button>

<Button 
  variant="outline" 
  size="sm" 
  onClick={() => deleteServiceArea(area.id)}
>
  <Trash className="h-4 w-4 text-red-600" />
</Button>
=======
                <TableRow className="bg-pink-100">
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('state')}><div className="flex items-center  gap-2"><span>State/Region</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'state' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('serviceRadius')}><div className="flex items-center  gap-2"><span>Service Radius</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'serviceRadius' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('transitTime')}><div className="flex items-center  gap-2"><span>Transit Time</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'transitTime' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('pricePerKm')}><div className="flex items-center  gap-2"><span>Price per km</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'pricePerKm' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className="text-center,  cursor-pointer hover:bg-pink-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedServiceAreas.map((area) => (
                  <TableRow key={area.id}>
>>>>>>> 9b0ce35 (Initial commit)
                     <TableCell className="">{area.location}</TableCell> 
                    <TableCell className="">{area.state}</TableCell>
                    <TableCell className="">{area.serviceRadius} km</TableCell>
                    <TableCell className="">{area.transitTime}</TableCell>
                    <TableCell className="">{area.pricePerKm}</TableCell>
                    <TableCell className="flex justify-center items-center gap-x-5">
                      <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(area.id)} />
                      <Trash className="h-4 w-4 text-red-600" onClick={() => deleteServiceArea(area.id)}/>
                     
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};