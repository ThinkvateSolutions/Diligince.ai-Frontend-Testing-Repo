<<<<<<< HEAD
// import { useMemo, useState, useRef } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Plus, Edit, Trash, Truck, ArrowUpDown, Info } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { toast } from "sonner";

// // --- UPDATED ZOD SCHEMA with conditional validation ---
// const equipmentSchema = z.object({
//   equipmentType: z.string().min(1, { message: "Equipment type is required" }),
//   otherEquipmentType: z.string().optional(),
//   make: z.string().min(1, { message: "Make is required" }),
//   model: z.string().min(1, { message: "Model is required" }),
//   year: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year" }),
//   quantity: z.string().min(1, { message: "Quantity is required" }),
//   capacity: z.string().min(1, { message: "Capacity is required" }),
//   unit: z.string().min(1, { message: "Unit is required" }),
//   registrationNumber: z.string().min(1, { message: "Registration number is required" }),
//   features: z.string(),
//   location: z.string().min(1, { message: "Location is required" }),
//   status: z.string().min(1, { message: "Status is required" }),
// }).refine(
//   (data) => {
//     if (data.equipmentType === "Other specialized equipment") {
//       return data.otherEquipmentType && data.otherEquipmentType.trim().length > 0;
//     }
//     return true;
//   },
//   {
//     message: "Please specify the equipment type.",
//     path: ["otherEquipmentType"], 
//   }
// );

// type Equipment = z.infer<typeof equipmentSchema> & { id: string };
// type SortableKeys = keyof Omit<Equipment, 'id' | 'features' | 'model' | 'unit' | 'quantity' | 'year' | 'otherEquipmentType'>;

// const equipmentTypes = [ "Bulldozers", "Container handlers", "Dump Trucks", "Excavators", "Forklifts", "Heavy Duty Trucks", "Low-bed Trailers", "Mobile Cranes", "Wheel Loaders", "Other specialized equipment" ];
// const capacityUnits = [ "Tons", "Kg", "Metric Tons", "Cubic Meters", "Feet", "Square Meters" ];
// const availabilityStatuses = [ "Available", "In Use", "Under Maintenance", "Reserved", "Out of Service" ];

// const mockEquipment: Equipment[] = [
//   { id: "1", equipmentType: "Heavy Duty Trucks", make: "Tata", model: "Prima 3718.K", year: "2021", quantity: "5", capacity: "37", unit: "Tons", registrationNumber: "MH02AB1234", features: "Air Conditioning, GPS Tracking, Sleep Cabin", location: "Mumbai", status: "Available" },
//   { id: "2", equipmentType: "Low-bed Trailers", make: "Ashok Leyland", model: "Multi-axle", year: "2020", quantity: "3", capacity: "70", unit: "Tons", registrationNumber: "MH04CD5678", features: "Hydraulic Ramps, Extendable Bed, Air Suspension", location: "Pune", status: "In Use" },
//   { id: "3", equipmentType: "Mobile Cranes", make: "ACE", model: "NXT 150", year: "2022", quantity: "2", capacity: "15", unit: "Tons", registrationNumber: "DL01EF9012", features: "Telescopic Boom, 4x4 Drive, Outriggers", location: "Delhi", status: "Available" },
//   { id: "4", equipmentType: "Other specialized equipment", otherEquipmentType: "Tunnel Boring Machine", make: "Herrenknecht", model: "S-567", year: "2019", quantity: "1", capacity: "120", unit: "Tons", registrationNumber: "N/A", features: "Automated Guidance, Cutter Head Extensions", location: "Mumbai", status: "Under Maintenance" },
// ];

// export const FleetEquipmentSection = () => {
//   const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
//   const [showInfo, setShowInfo] = useState(false);
//   const [showInfo1, setShowInfo1] = useState(false);

//   const form = useForm<z.infer<typeof equipmentSchema>>({
//     resolver: zodResolver(equipmentSchema),
//     defaultValues: {
//       equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "",
//     },
//   });

//   const watchedEquipmentType = form.watch("equipmentType");

//   const sortedEquipment = useMemo(() => {
//     let sortableItems = [...equipment];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];
//         if (sortConfig.key === 'equipmentType') {
//           aValue = a.equipmentType === 'Other specialized equipment' ? a.otherEquipmentType : a.equipmentType;
//           bValue = b.equipmentType === 'Other specialized equipment' ? b.otherEquipmentType : b.equipmentType;
//         } else if (sortConfig.key === 'capacity') {
//             const numA = parseFloat(aValue as string);
//             const numB = parseFloat(bValue as string);
//             if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
//             if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
//             return 0;
//         }
//         if (aValue! < bValue!) return sortConfig.direction === 'ascending' ? -1 : 1;
//         if (aValue! > bValue!) return sortConfig.direction === 'ascending' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [equipment, sortConfig]);

//   const requestSort = (key: SortableKeys) => {
//     let direction: 'ascending' | 'descending' = 'ascending';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const openAddDialog = () => {
//     form.reset({ equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "", });
//     setIsEditing(false);
//     setCurrentEquipmentId(null);
//     setIsDialogOpen(true);
//   };

//   const openEditDialog = (id: string) => {
//     const equipmentToEdit = equipment.find(e => e.id === id);
//     if (equipmentToEdit) {
//       form.reset(equipmentToEdit);
//       setIsEditing(true);
//       setCurrentEquipmentId(id);
//       setIsDialogOpen(true);
//     }
//   };

//   const deleteEquipment = (id: string) => {
//     setEquipment(equipment.filter(e => e.id !== id));
//     toast.success("Equipment deleted successfully");
//   };

//   const onSubmit = (values: z.infer<typeof equipmentSchema>) => {
//     if (values.equipmentType !== "Other specialized equipment") {
//         values.otherEquipmentType = "";
//     }
//     if (isEditing && currentEquipmentId) {
//       setEquipment(equipment.map(e => e.id === currentEquipmentId ? { ...values, id: currentEquipmentId } : e));
//       toast.success("Equipment updated successfully");
//     } else {
//       const newId = Math.random().toString(36).substring(2, 9);
//       setEquipment([...equipment, { ...values, id: newId }]);
//       toast.success("New equipment added successfully");
//     }
//     setIsDialogOpen(false);
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "Available": return "bg-green-300 hover:bg-green-500 text-black";
//       case "In Use": return "bg-blue-300 hover:bg-blue-500 text-black";
//       case "Under Maintenance": return "bg-yellow-300 hover:bg-yellow-500 text-black";
//       case "Reserved": return "bg-purple-300 hover:bg-purple-500 text-black";
//       case "Out of Service": return "bg-red-300 hover:bg-red-500 text-black";
//       default: return "bg-gray-300 hover:bg-gray-500 text-black";
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//   {/* --- CORRECTED LAYOUT --- */}
//   {/* The main flex container for the top row */}
//   <div className="flex flex-row items-start justify-between">
//     {/* A container for the title and icon */}
//     <div className="flex items-center gap-2">
//       <CardTitle className="text-xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
//       <Info
//         className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
//         onClick={() => {
//           setShowInfo1(!showInfo1);
//           // Remove gap by setting margin to 0 when info is clicked
//           if (showInfo1) {
//             document.querySelector('.card-description')?.classList.toggle('hidden');
//           }
//         }}
//       />
//     </div>

//     {/* The Dialog Trigger and Dialog component remain on the right */}
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
//           <Plus className="mr-2 h-4 w-4" /> Add Equipment
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <div className="flex gap-2">
//             <DialogTitle>{isEditing ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
//             <Info className="w-5 h-5 text-black opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShowInfo(!showInfo)} />
//           </div>
//           {showInfo && <p className="text-sm text-muted-foreground mt-1">{isEditing ? "Update the details of your equipment" : "Add details about your transportation or handling equipment"}</p>}
         
//           {/* <DialogDescription>{isEditing ? "Update the details of your equipment" : "Add details about your transportation or handling equipment"}</DialogDescription> */}
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             {/* ... Your entire form content remains unchanged ... */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="equipmentType" render={({ field }) => (<FormItem><FormLabel>Equipment Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent>{equipmentTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//               {watchedEquipmentType === "Other specialized equipment" && (
//                 <FormField control={form.control} name="otherEquipmentType" render={({ field }) => (<FormItem><FormLabel>Specify Equipment</FormLabel><FormControl><Input placeholder="e.g., Tunnel Boring Machine" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               )}
//               <FormField control={form.control} name="quantity" render={({ field }) => (<FormItem><FormLabel>Quantity</FormLabel><FormControl><Input type="number" min={0} placeholder="Number of units" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FormField control={form.control} name="make" render={({ field }) => (<FormItem><FormLabel>Make</FormLabel><FormControl><Input placeholder="e.g. Tata, Volvo" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="model" render={({ field }) => (<FormItem><FormLabel>Model</FormLabel><FormControl><Input placeholder="Model number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="year" render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input placeholder="YYYY" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FormField control={form.control} name="capacity" render={({ field }) => (<FormItem><FormLabel>Capacity</FormLabel><FormControl><Input type="number" min={0} placeholder="e.g. 20" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="unit" render={({ field }) => (<FormItem><FormLabel>Unit</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger></FormControl><SelectContent>{capacityUnits.map((unit) => (<SelectItem key={unit} value={unit}>{unit}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>Registration Number</FormLabel><FormControl><Input placeholder="Vehicle registration" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <FormField control={form.control} name="features" render={({ field }) => (<FormItem><FormLabel>Features & Specifications</FormLabel><FormControl><Textarea placeholder="List key features and specifications" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Base Location</FormLabel><FormControl><Input placeholder="City/Region" {...field} onChange={(e) => { const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); field.onChange(value); }} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Availability Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{availabilityStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//             </div>
//             <DialogFooter className="pt-4">
//               <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   </div>

//   {/* Conditionally render the description on a new line, below the title/button row */}
//    {showInfo1 && (
//            <CardDescription className="pt-2">
//                    Manage your transport and heavy machinery equipment
//             </CardDescription>
//        )}
  
// </CardHeader>

//       <CardContent>
//         {equipment.length === 0 ? (
//             <div className="text-center py-8"><Truck className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-semibold text-gray-900">No equipment added</h3><p className="mt-1 text-sm text-gray-500">Get started by adding your first equipment</p><div className="mt-6"><Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add Equipment</Button></div></div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-pink-100">
//                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('equipmentType')}><div className="flex items-center  gap-2"><span>Equipment Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'equipmentType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('make')}><div className="flex items-center  gap-2"><span>Make & Model</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'make' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('capacity')}><div className="flex items-center  gap-2"><span>Capacity</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'capacity' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('registrationNumber')}><div className="flex items-center  gap-2"><span>Registration</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'registrationNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  

//                  {/* <TableHead className=" cursor-pointer hover:bg-gray-50" ><div className="flex items-center  gap-2"><span>Status</span></div></TableHead>  */}
                  
//                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('status')}>
//                        <div className="flex items-center gap-2">
//                         <span>Status</span>
//                         <ArrowUpDown className="h-4 w-4 text-slate-400" />
//                           {sortConfig?.key === 'status' && (
//                            <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
//                              )}
//                                   </div>
//                                      </TableHead>

//                   <TableHead className="text-center,cursor-pointer hover:bg-pink-100">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedEquipment.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell className="font-normal">{item.equipmentType === 'Other specialized equipment' ? item.otherEquipmentType : item.equipmentType}</TableCell>
//                     <TableCell className=""><div><span className="text-xs text-gray-500">{item.year}</span> {item.make} {item.model}</div></TableCell>
//                     <TableCell className="">{item.capacity} {item.unit}</TableCell>
//                     <TableCell className="">{item.registrationNumber}</TableCell>
//                     <TableCell className="">{item.location}</TableCell>
//                     <TableCell className=""><Badge className={getStatusBadge(item.status)}>{item.status}</Badge></TableCell>
//                     <TableCell className="flex justify-center items-center gap-x-5">
//                       <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(item.id)} />
//                       <Trash className="h-4 w-4 text-red-600" onClick={() => deleteEquipment(item.id)}/>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

import { useMemo, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Truck, ArrowUpDown, Info } from "lucide-react";
=======
<<<<<<< HEAD
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Truck } from "lucide-react";

=======
// import { useMemo, useState, useRef } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Plus, Edit, Trash, Truck, ArrowUpDown, Info } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { toast } from "sonner";

// // --- UPDATED ZOD SCHEMA with conditional validation ---
// const equipmentSchema = z.object({
//   equipmentType: z.string().min(1, { message: "Equipment type is required" }),
//   otherEquipmentType: z.string().optional(),
//   make: z.string().min(1, { message: "Make is required" }),
//   model: z.string().min(1, { message: "Model is required" }),
//   year: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year" }),
//   quantity: z.string().min(1, { message: "Quantity is required" }),
//   capacity: z.string().min(1, { message: "Capacity is required" }),
//   unit: z.string().min(1, { message: "Unit is required" }),
//   registrationNumber: z.string().min(1, { message: "Registration number is required" }),
//   features: z.string(),
//   location: z.string().min(1, { message: "Location is required" }),
//   status: z.string().min(1, { message: "Status is required" }),
// }).refine(
//   (data) => {
//     if (data.equipmentType === "Other specialized equipment") {
//       return data.otherEquipmentType && data.otherEquipmentType.trim().length > 0;
//     }
//     return true;
//   },
//   {
//     message: "Please specify the equipment type.",
//     path: ["otherEquipmentType"], 
//   }
// );

// type Equipment = z.infer<typeof equipmentSchema> & { id: string };
// type SortableKeys = keyof Omit<Equipment, 'id' | 'features' | 'model' | 'unit' | 'quantity' | 'year' | 'otherEquipmentType'>;

// const equipmentTypes = [ "Bulldozers", "Container handlers", "Dump Trucks", "Excavators", "Forklifts", "Heavy Duty Trucks", "Low-bed Trailers", "Mobile Cranes", "Wheel Loaders", "Other specialized equipment" ];
// const capacityUnits = [ "Tons", "Kg", "Metric Tons", "Cubic Meters", "Feet", "Square Meters" ];
// const availabilityStatuses = [ "Available", "In Use", "Under Maintenance", "Reserved", "Out of Service" ];

// const mockEquipment: Equipment[] = [
//   { id: "1", equipmentType: "Heavy Duty Trucks", make: "Tata", model: "Prima 3718.K", year: "2021", quantity: "5", capacity: "37", unit: "Tons", registrationNumber: "MH02AB1234", features: "Air Conditioning, GPS Tracking, Sleep Cabin", location: "Mumbai", status: "Available" },
//   { id: "2", equipmentType: "Low-bed Trailers", make: "Ashok Leyland", model: "Multi-axle", year: "2020", quantity: "3", capacity: "70", unit: "Tons", registrationNumber: "MH04CD5678", features: "Hydraulic Ramps, Extendable Bed, Air Suspension", location: "Pune", status: "In Use" },
//   { id: "3", equipmentType: "Mobile Cranes", make: "ACE", model: "NXT 150", year: "2022", quantity: "2", capacity: "15", unit: "Tons", registrationNumber: "DL01EF9012", features: "Telescopic Boom, 4x4 Drive, Outriggers", location: "Delhi", status: "Available" },
//   { id: "4", equipmentType: "Other specialized equipment", otherEquipmentType: "Tunnel Boring Machine", make: "Herrenknecht", model: "S-567", year: "2019", quantity: "1", capacity: "120", unit: "Tons", registrationNumber: "N/A", features: "Automated Guidance, Cutter Head Extensions", location: "Mumbai", status: "Under Maintenance" },
// ];

// export const FleetEquipmentSection = () => {
//   const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
//   const [showInfo, setShowInfo] = useState(false);
//   const [showInfo1, setShowInfo1] = useState(false);

//   const form = useForm<z.infer<typeof equipmentSchema>>({
//     resolver: zodResolver(equipmentSchema),
//     defaultValues: {
//       equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "",
//     },
//   });

//   const watchedEquipmentType = form.watch("equipmentType");

//   const sortedEquipment = useMemo(() => {
//     let sortableItems = [...equipment];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];
//         if (sortConfig.key === 'equipmentType') {
//           aValue = a.equipmentType === 'Other specialized equipment' ? a.otherEquipmentType : a.equipmentType;
//           bValue = b.equipmentType === 'Other specialized equipment' ? b.otherEquipmentType : b.equipmentType;
//         } else if (sortConfig.key === 'capacity') {
//             const numA = parseFloat(aValue as string);
//             const numB = parseFloat(bValue as string);
//             if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
//             if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
//             return 0;
//         }
//         if (aValue! < bValue!) return sortConfig.direction === 'ascending' ? -1 : 1;
//         if (aValue! > bValue!) return sortConfig.direction === 'ascending' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [equipment, sortConfig]);

//   const requestSort = (key: SortableKeys) => {
//     let direction: 'ascending' | 'descending' = 'ascending';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const openAddDialog = () => {
//     form.reset({ equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "", });
//     setIsEditing(false);
//     setCurrentEquipmentId(null);
//     setIsDialogOpen(true);
//   };

//   const openEditDialog = (id: string) => {
//     const equipmentToEdit = equipment.find(e => e.id === id);
//     if (equipmentToEdit) {
//       form.reset(equipmentToEdit);
//       setIsEditing(true);
//       setCurrentEquipmentId(id);
//       setIsDialogOpen(true);
//     }
//   };

//   const deleteEquipment = (id: string) => {
//     setEquipment(equipment.filter(e => e.id !== id));
//     toast.success("Equipment deleted successfully");
//   };

//   const onSubmit = (values: z.infer<typeof equipmentSchema>) => {
//     if (values.equipmentType !== "Other specialized equipment") {
//         values.otherEquipmentType = "";
//     }
//     if (isEditing && currentEquipmentId) {
//       setEquipment(equipment.map(e => e.id === currentEquipmentId ? { ...values, id: currentEquipmentId } : e));
//       toast.success("Equipment updated successfully");
//     } else {
//       const newId = Math.random().toString(36).substring(2, 9);
//       setEquipment([...equipment, { ...values, id: newId }]);
//       toast.success("New equipment added successfully");
//     }
//     setIsDialogOpen(false);
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "Available": return "bg-green-300 hover:bg-green-500 text-black";
//       case "In Use": return "bg-blue-300 hover:bg-blue-500 text-black";
//       case "Under Maintenance": return "bg-yellow-300 hover:bg-yellow-500 text-black";
//       case "Reserved": return "bg-purple-300 hover:bg-purple-500 text-black";
//       case "Out of Service": return "bg-red-300 hover:bg-red-500 text-black";
//       default: return "bg-gray-300 hover:bg-gray-500 text-black";
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//   {/* --- CORRECTED LAYOUT --- */}
//   {/* The main flex container for the top row */}
//   <div className="flex flex-row items-start justify-between">
//     {/* A container for the title and icon */}
//     <div className="flex items-center gap-2">
//       <CardTitle className="text-xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
//       <Info
//         className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
//         onClick={() => {
//           setShowInfo1(!showInfo1);
//           // Remove gap by setting margin to 0 when info is clicked
//           if (showInfo1) {
//             document.querySelector('.card-description')?.classList.toggle('hidden');
//           }
//         }}
//       />
//     </div>

//     {/* The Dialog Trigger and Dialog component remain on the right */}
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
//           <Plus className="mr-2 h-4 w-4" /> Add Equipment
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <div className="flex gap-2">
//             <DialogTitle>{isEditing ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
//             <Info className="w-5 h-5 text-black opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShowInfo(!showInfo)} />
//           </div>
//           {showInfo && <p className="text-sm text-muted-foreground mt-1">{isEditing ? "Update the details of your equipment" : "Add details about your transportation or handling equipment"}</p>}
         
//           {/* <DialogDescription>{isEditing ? "Update the details of your equipment" : "Add details about your transportation or handling equipment"}</DialogDescription> */}
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             {/* ... Your entire form content remains unchanged ... */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="equipmentType" render={({ field }) => (<FormItem><FormLabel>Equipment Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent>{equipmentTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//               {watchedEquipmentType === "Other specialized equipment" && (
//                 <FormField control={form.control} name="otherEquipmentType" render={({ field }) => (<FormItem><FormLabel>Specify Equipment</FormLabel><FormControl><Input placeholder="e.g., Tunnel Boring Machine" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               )}
//               <FormField control={form.control} name="quantity" render={({ field }) => (<FormItem><FormLabel>Quantity</FormLabel><FormControl><Input type="number" min={0} placeholder="Number of units" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FormField control={form.control} name="make" render={({ field }) => (<FormItem><FormLabel>Make</FormLabel><FormControl><Input placeholder="e.g. Tata, Volvo" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="model" render={({ field }) => (<FormItem><FormLabel>Model</FormLabel><FormControl><Input placeholder="Model number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="year" render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input placeholder="YYYY" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FormField control={form.control} name="capacity" render={({ field }) => (<FormItem><FormLabel>Capacity</FormLabel><FormControl><Input type="number" min={0} placeholder="e.g. 20" {...field} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="unit" render={({ field }) => (<FormItem><FormLabel>Unit</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger></FormControl><SelectContent>{capacityUnits.map((unit) => (<SelectItem key={unit} value={unit}>{unit}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>Registration Number</FormLabel><FormControl><Input placeholder="Vehicle registration" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             </div>
//             <FormField control={form.control} name="features" render={({ field }) => (<FormItem><FormLabel>Features & Specifications</FormLabel><FormControl><Textarea placeholder="List key features and specifications" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Base Location</FormLabel><FormControl><Input placeholder="City/Region" {...field} onChange={(e) => { const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); field.onChange(value); }} /></FormControl><FormMessage /></FormItem>)} />
//               <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Availability Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{availabilityStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//             </div>
//             <DialogFooter className="pt-4">
//               <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   </div>

//   {/* Conditionally render the description on a new line, below the title/button row */}
//    {showInfo1 && (
//            <CardDescription className="pt-2">
//                    Manage your transport and heavy machinery equipment
//             </CardDescription>
//        )}
  
// </CardHeader>

//       <CardContent>
//         {equipment.length === 0 ? (
//             <div className="text-center py-8"><Truck className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-semibold text-gray-900">No equipment added</h3><p className="mt-1 text-sm text-gray-500">Get started by adding your first equipment</p><div className="mt-6"><Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add Equipment</Button></div></div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-pink-100">
//                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('equipmentType')}><div className="flex items-center  gap-2"><span>Equipment Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'equipmentType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('make')}><div className="flex items-center  gap-2"><span>Make & Model</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'make' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('capacity')}><div className="flex items-center  gap-2"><span>Capacity</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'capacity' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('registrationNumber')}><div className="flex items-center  gap-2"><span>Registration</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'registrationNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  

//                  {/* <TableHead className=" cursor-pointer hover:bg-gray-50" ><div className="flex items-center  gap-2"><span>Status</span></div></TableHead>  */}
                  
//                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('status')}>
//                        <div className="flex items-center gap-2">
//                         <span>Status</span>
//                         <ArrowUpDown className="h-4 w-4 text-slate-400" />
//                           {sortConfig?.key === 'status' && (
//                            <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
//                              )}
//                                   </div>
//                                      </TableHead>

//                   <TableHead className="text-center,cursor-pointer hover:bg-pink-100">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedEquipment.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell className="font-normal">{item.equipmentType === 'Other specialized equipment' ? item.otherEquipmentType : item.equipmentType}</TableCell>
//                     <TableCell className=""><div><span className="text-xs text-gray-500">{item.year}</span> {item.make} {item.model}</div></TableCell>
//                     <TableCell className="">{item.capacity} {item.unit}</TableCell>
//                     <TableCell className="">{item.registrationNumber}</TableCell>
//                     <TableCell className="">{item.location}</TableCell>
//                     <TableCell className=""><Badge className={getStatusBadge(item.status)}>{item.status}</Badge></TableCell>
//                     <TableCell className="flex justify-center items-center gap-x-5">
//                       <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(item.id)} />
//                       <Trash className="h-4 w-4 text-red-600" onClick={() => deleteEquipment(item.id)}/>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

import { useMemo, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Truck, ArrowUpDown, Info } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

<<<<<<< HEAD
// --- UPDATED ZOD SCHEMA with conditional validation ---
const equipmentSchema = z.object({
  equipmentType: z.string().min(1, { message: "Equipment type is required" }),
  otherEquipmentType: z.string().optional(),
=======
<<<<<<< HEAD
const equipmentSchema = z.object({
  equipmentType: z.string().min(1, { message: "Equipment type is required" }),
=======
// --- UPDATED ZOD SCHEMA with conditional validation ---
const equipmentSchema = z.object({
  equipmentType: z.string().min(1, { message: "Equipment type is required" }),
  otherEquipmentType: z.string().optional(),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  features: z.string(),
  location: z.string().min(1, { message: "Location is required" }),
  status: z.string().min(1, { message: "Status is required" }),
<<<<<<< HEAD
}).refine(
  (data) => {
    if (data.equipmentType === "Other specialized equipment") {
      return data.otherEquipmentType && data.otherEquipmentType.trim().length > 0;
    }
    return true;
  },
  {
    message: "Please specify the equipment type.",
    path: ["otherEquipmentType"], 
  }
);
=======
<<<<<<< HEAD
});
>>>>>>> 9b0ce35 (Initial commit)

type Equipment = z.infer<typeof equipmentSchema> & { id: string };
type SortableKeys = keyof Omit<Equipment, 'id' | 'features' | 'model' | 'unit' | 'quantity' | 'year' | 'otherEquipmentType'>;

const equipmentTypes = [ "Bulldozers", "Container handlers", "Dump Trucks", "Excavators", "Forklifts", "Heavy Duty Trucks", "Low-bed Trailers", "Mobile Cranes", "Wheel Loaders", "Other specialized equipment" ];
const capacityUnits = [ "Tons", "Kg", "Metric Tons", "Cubic Meters", "Feet", "Square Meters" ];
const availabilityStatuses = [ "Available", "In Use", "Under Maintenance", "Reserved", "Out of Service" ];

const mockEquipment: Equipment[] = [
<<<<<<< HEAD
=======
  {
    id: "1",
    equipmentType: "Heavy Duty Trucks",
    make: "Tata",
    model: "Prima 3718.K",
    year: "2021",
    quantity: "5",
    capacity: "37",
    unit: "Tons",
    registrationNumber: "MH02AB1234",
    features: "Air Conditioning, GPS Tracking, Sleep Cabin",
    location: "Mumbai",
    status: "Available",
  },
  {
    id: "2",
    equipmentType: "Low-bed Trailers",
    make: "Ashok Leyland",
    model: "Multi-axle",
    year: "2020",
    quantity: "3",
    capacity: "70",
    unit: "Tons",
    registrationNumber: "MH04CD5678",
    features: "Hydraulic Ramps, Extendable Bed, Air Suspension",
    location: "Pune",
    status: "In Use",
  },
  {
    id: "3",
    equipmentType: "Mobile Cranes",
    make: "ACE",
    model: "NXT 150",
    year: "2022",
    quantity: "2",
    capacity: "15",
    unit: "Tons",
    registrationNumber: "DL01EF9012",
    features: "Telescopic Boom, 4x4 Drive, Outriggers",
    location: "Delhi",
    status: "Available",
  },
=======
}).refine(
  (data) => {
    if (data.equipmentType === "Other specialized equipment") {
      return data.otherEquipmentType && data.otherEquipmentType.trim().length > 0;
    }
    return true;
  },
  {
    message: "Please specify the equipment type.",
    path: ["otherEquipmentType"], 
  }
);

type Equipment = z.infer<typeof equipmentSchema> & { id: string };
type SortableKeys = keyof Omit<Equipment, 'id' | 'features' | 'model' | 'unit' | 'quantity' | 'year' | 'otherEquipmentType'>;

const equipmentTypes = [ "Bulldozers", "Container handlers", "Dump Trucks", "Excavators", "Forklifts", "Heavy Duty Trucks", "Low-bed Trailers", "Mobile Cranes", "Wheel Loaders", "Other specialized equipment" ];
const capacityUnits = [ "Tons", "Kg", "Metric Tons", "Cubic Meters", "Feet", "Square Meters" ];
const availabilityStatuses = [ "Available", "In Use", "Under Maintenance", "Reserved", "Out of Service" ];

const mockEquipment: Equipment[] = [
>>>>>>> 9b0ce35 (Initial commit)
  { id: "1", equipmentType: "Heavy Duty Trucks", make: "Tata", model: "Prima 3718.K", year: "2021", quantity: "5", capacity: "37", unit: "Tons", registrationNumber: "MH02AB1234", features: "Air Conditioning, GPS Tracking, Sleep Cabin", location: "Mumbai", status: "Available" },
  { id: "2", equipmentType: "Low-bed Trailers", make: "Ashok Leyland", model: "Multi-axle", year: "2020", quantity: "3", capacity: "70", unit: "Tons", registrationNumber: "MH04CD5678", features: "Hydraulic Ramps, Extendable Bed, Air Suspension", location: "Pune", status: "In Use" },
  { id: "3", equipmentType: "Mobile Cranes", make: "ACE", model: "NXT 150", year: "2022", quantity: "2", capacity: "15", unit: "Tons", registrationNumber: "DL01EF9012", features: "Telescopic Boom, 4x4 Drive, Outriggers", location: "Delhi", status: "Available" },
  { id: "4", equipmentType: "Other specialized equipment", otherEquipmentType: "Tunnel Boring Machine", make: "Herrenknecht", model: "S-567", year: "2019", quantity: "1", capacity: "120", unit: "Tons", registrationNumber: "N/A", features: "Automated Guidance, Cutter Head Extensions", location: "Mumbai", status: "Under Maintenance" },
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
];

export const FleetEquipmentSection = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null);
<<<<<<< HEAD
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
=======
<<<<<<< HEAD
=======
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  const form = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
<<<<<<< HEAD
      equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "",
=======
<<<<<<< HEAD
      equipmentType: "",
      make: "",
      model: "",
      year: "",
      quantity: "",
      capacity: "",
      unit: "",
      registrationNumber: "",
      features: "",
      location: "",
      status: "",
>>>>>>> 9b0ce35 (Initial commit)
    },
  });

  const watchedEquipmentType = form.watch("equipmentType");

  const sortedEquipment = useMemo(() => {
    let sortableItems = [...equipment];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'equipmentType') {
          aValue = a.equipmentType === 'Other specialized equipment' ? a.otherEquipmentType : a.equipmentType;
          bValue = b.equipmentType === 'Other specialized equipment' ? b.otherEquipmentType : b.equipmentType;
        } else if (sortConfig.key === 'capacity') {
            const numA = parseFloat(aValue as string);
            const numB = parseFloat(bValue as string);
            if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        }
        if (aValue! < bValue!) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue! > bValue!) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [equipment, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
<<<<<<< HEAD
    form.reset({ equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "", });
=======
    form.reset({
      equipmentType: "",
      make: "",
      model: "",
      year: "",
      quantity: "",
      capacity: "",
      unit: "",
      registrationNumber: "",
      features: "",
      location: "",
      status: "",
    });
=======
      equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "",
    },
  });

  const watchedEquipmentType = form.watch("equipmentType");

  const sortedEquipment = useMemo(() => {
    let sortableItems = [...equipment];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'equipmentType') {
          aValue = a.equipmentType === 'Other specialized equipment' ? a.otherEquipmentType : a.equipmentType;
          bValue = b.equipmentType === 'Other specialized equipment' ? b.otherEquipmentType : b.equipmentType;
        } else if (sortConfig.key === 'capacity') {
            const numA = parseFloat(aValue as string);
            const numB = parseFloat(bValue as string);
            if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        }
        if (aValue! < bValue!) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue! > bValue!) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [equipment, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
    form.reset({ equipmentType: "", otherEquipmentType: "", make: "", model: "", year: "", quantity: "", capacity: "", unit: "", registrationNumber: "", features: "", location: "", status: "", });
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    setIsEditing(false);
    setCurrentEquipmentId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const equipmentToEdit = equipment.find(e => e.id === id);
    if (equipmentToEdit) {
      form.reset(equipmentToEdit);
      setIsEditing(true);
      setCurrentEquipmentId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteEquipment = (id: string) => {
    setEquipment(equipment.filter(e => e.id !== id));
    toast.success("Equipment deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof equipmentSchema>) => {
<<<<<<< HEAD
    if (values.equipmentType !== "Other specialized equipment") {
        values.otherEquipmentType = "";
    }
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
    if (isEditing && currentEquipmentId) {
      setEquipment(equipment.map(e => e.id === currentEquipmentId ? { ...values, id: currentEquipmentId } : e));
      toast.success("Equipment updated successfully");
    } else {
<<<<<<< HEAD
=======
      // Add new equipment
=======
    if (values.equipmentType !== "Other specialized equipment") {
        values.otherEquipmentType = "";
    }
    if (isEditing && currentEquipmentId) {
      setEquipment(equipment.map(e => e.id === currentEquipmentId ? { ...values, id: currentEquipmentId } : e));
      toast.success("Equipment updated successfully");
    } else {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      const newId = Math.random().toString(36).substring(2, 9);
      setEquipment([...equipment, { ...values, id: newId }]);
      toast.success("New equipment added successfully");
    }
    setIsDialogOpen(false);
  };

<<<<<<< HEAD
  const getStatusBadge = (status: string) => {
    switch (status) {
=======
<<<<<<< HEAD
  // Function to get the badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600";
      case "In Use":
        return "bg-blue-500 hover:bg-blue-600";
      case "Under Maintenance":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Reserved":
        return "bg-purple-500 hover:bg-purple-600";
      case "Out of Service":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
=======
  const getStatusBadge = (status: string) => {
    switch (status) {
>>>>>>> 9b0ce35 (Initial commit)
      case "Available": return "bg-green-300 hover:bg-green-500 text-black";
      case "In Use": return "bg-blue-300 hover:bg-blue-500 text-black";
      case "Under Maintenance": return "bg-yellow-300 hover:bg-yellow-500 text-black";
      case "Reserved": return "bg-purple-300 hover:bg-purple-500 text-black";
      case "Out of Service": return "bg-red-300 hover:bg-red-500 text-black";
      default: return "bg-gray-300 hover:bg-gray-500 text-black";
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    }
  };

  return (
    <Card>
<<<<<<< HEAD
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          {/* Container for the title, icon, and description to group them on the left */}
          <div className="min-h-14"> {/* <-- MODIFICATION HERE */}
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
              <Info
                className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                onClick={() => setShowInfo1(!showInfo1)}
              />
            </div>
            {/* Conditionally render the description right below the title */}
            {showInfo1 && (
              <CardDescription className="pt-2">
                Manage your transport and heavy machinery equipment
              </CardDescription>
            )}
          </div>
=======
<<<<<<< HEAD
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
          <CardDescription>
            Manage your transport and heavy machinery equipment
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your equipment" 
                  : "Add details about your transportation or handling equipment"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="equipmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.errors.equipmentType ? "text-black" : ""}>Equipment Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
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
>>>>>>> 9b0ce35 (Initial commit)

          {/* The Dialog Trigger and Dialog component remain on the right */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                <Plus className="mr-2 h-4 w-4" /> Add Equipment
              </Button>
<<<<<<< HEAD
=======
            </div>
          </div>
=======
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          {/* Container for the title, icon, and description to group them on the left */}
          <div className="min-h-14"> {/* <-- MODIFICATION HERE */}
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
              <Info
                className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75"
                onClick={() => setShowInfo1(!showInfo1)}
              />
            </div>
            {/* Conditionally render the description right below the title */}
            {showInfo1 && (
              <CardDescription className="pt-2">
                Manage your transport and heavy machinery equipment
              </CardDescription>
            )}
          </div>

          {/* The Dialog Trigger and Dialog component remain on the right */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                <Plus className="mr-2 h-4 w-4" /> Add Equipment
              </Button>
>>>>>>> 9b0ce35 (Initial commit)
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <div className="flex gap-2">
                  <DialogTitle>{isEditing ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
                  <Info className="w-5 h-5 text-black opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShowInfo(!showInfo)} />
                </div>
                {showInfo && <p className="text-sm text-muted-foreground mt-1">{isEditing ? "Update the details of your equipment" : "Add details about your transportation or handling equipment"}</p>}
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* ... Your entire form content remains unchanged ... */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="equipmentType" render={({ field }) => (<FormItem><FormLabel>Equipment Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent>{equipmentTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                    {watchedEquipmentType === "Other specialized equipment" && (
                      <FormField control={form.control} name="otherEquipmentType" render={({ field }) => (<FormItem><FormLabel>Specify Equipment</FormLabel><FormControl><Input placeholder="e.g., Tunnel Boring Machine" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    )}
                    <FormField control={form.control} name="quantity" render={({ field }) => (<FormItem><FormLabel>Quantity</FormLabel><FormControl><Input type="number" min={0} placeholder="Number of units" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="make" render={({ field }) => (<FormItem><FormLabel>Make</FormLabel><FormControl><Input placeholder="e.g. Tata, Volvo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="model" render={({ field }) => (<FormItem><FormLabel>Model</FormLabel><FormControl><Input placeholder="Model number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="year" render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input placeholder="YYYY" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="capacity" render={({ field }) => (<FormItem><FormLabel>Capacity</FormLabel><FormControl><Input type="number" min={0} placeholder="e.g. 20" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="unit" render={({ field }) => (<FormItem><FormLabel>Unit</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger></FormControl><SelectContent>{capacityUnits.map((unit) => (<SelectItem key={unit} value={unit}>{unit}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>Registration Number</FormLabel><FormControl><Input placeholder="Vehicle registration" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="features" render={({ field }) => (<FormItem><FormLabel>Features & Specifications</FormLabel><FormControl><Textarea placeholder="List key features and specifications" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Base Location</FormLabel><FormControl><Input placeholder="City/Region" {...field} onChange={(e) => { const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); field.onChange(value); }} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Availability Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{availabilityStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d]">{isEditing ? "Update" : "Add"}</Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {equipment.length === 0 ? (
            <div className="text-center py-8"><Truck className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-semibold text-gray-900">No equipment added</h3><p className="mt-1 text-sm text-gray-500">Get started by adding your first equipment</p><div className="mt-6"><Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add Equipment</Button></div></div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
<<<<<<< HEAD
                <TableRow className="bg-pink-100">
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('equipmentType')}><div className="flex items-center  gap-2"><span>Equipment Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'equipmentType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('make')}><div className="flex items-center  gap-2"><span>Make & Model</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'make' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('capacity')}><div className="flex items-center  gap-2"><span>Capacity</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'capacity' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('registrationNumber')}><div className="flex items-center  gap-2"><span>Registration</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'registrationNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('status')}>
                       <div className="flex items-center gap-2">
                        <span>Status</span>
                        <ArrowUpDown className="h-4 w-4 text-slate-400" />
                          {sortConfig?.key === 'status' && (
                           <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                             )}
                                  </div>
                                     </TableHead>

                  <TableHead className="text-center,cursor-pointer hover:bg-pink-100">Actions</TableHead>
=======
<<<<<<< HEAD
                <TableRow>
                  <TableHead>Equipment Type</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
>>>>>>> 9b0ce35 (Initial commit)
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEquipment.map((item) => (
                  <TableRow key={item.id}>
<<<<<<< HEAD
=======
                    <TableCell className="font-medium">{item.equipmentType}</TableCell>
                    <TableCell>
                      <div>{item.make} {item.model}</div>
                      <div className="text-xs text-gray-500">{item.year}</div>
                    </TableCell>
                    <TableCell>{item.capacity} {item.unit}</TableCell>
                    <TableCell>{item.registrationNumber}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-x-2">
                    <Button 
  variant="outline" 
  size="sm" 
  onClick={() => openEditDialog(item.id)}
>
  <Edit className="h-4 w-4 text-blue-600" />
</Button>

<Button 
  variant="outline" 
  size="sm" 
  onClick={() => deleteEquipment(item.id)}
>
  <Trash className="h-4 w-4 text-red-600" />
</Button>

=======
                <TableRow className="bg-pink-100">
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('equipmentType')}><div className="flex items-center  gap-2"><span>Equipment Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'equipmentType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('make')}><div className="flex items-center  gap-2"><span>Make & Model</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'make' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('capacity')}><div className="flex items-center  gap-2"><span>Capacity</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'capacity' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('registrationNumber')}><div className="flex items-center  gap-2"><span>Registration</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'registrationNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className=" cursor-pointer hover:bg-pink-100" onClick={() => requestSort('location')}><div className="flex items-center  gap-2"><span>Location</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'location' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('status')}>
                       <div className="flex items-center gap-2">
                        <span>Status</span>
                        <ArrowUpDown className="h-4 w-4 text-slate-400" />
                          {sortConfig?.key === 'status' && (
                           <span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                             )}
                                  </div>
                                     </TableHead>

                  <TableHead className="text-center,cursor-pointer hover:bg-pink-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEquipment.map((item) => (
                  <TableRow key={item.id}>
>>>>>>> 9b0ce35 (Initial commit)
                    <TableCell className="font-normal">{item.equipmentType === 'Other specialized equipment' ? item.otherEquipmentType : item.equipmentType}</TableCell>
                    <TableCell className=""><div><span className="text-xs text-gray-500">{item.year}</span> {item.make} {item.model}</div></TableCell>
                    <TableCell className="">{item.capacity} {item.unit}</TableCell>
                    <TableCell className="">{item.registrationNumber}</TableCell>
                    <TableCell className="">{item.location}</TableCell>
                    <TableCell className=""><Badge className={getStatusBadge(item.status)}>{item.status}</Badge></TableCell>
                    <TableCell className="flex justify-center items-center gap-x-5">
                      <Edit className="h-4 w-4 text-gray-600 "onClick={() => openEditDialog(item.id)} />
                      <Trash className="h-4 w-4 text-red-600" onClick={() => deleteEquipment(item.id)}/>
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
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
