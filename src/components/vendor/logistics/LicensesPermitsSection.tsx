
// import { useMemo, useState, useRef, ChangeEvent, DragEvent } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Plus, File, Download, Check, Edit, Trash, ArrowUpDown, FileText, Upload, X, Info } from "lucide-react";
// import { cn } from "@/lib/utils"; // Assumes you have a lib/utils.ts for shadcn

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";

// // --- CONFIGURATION FOR FILE UPLOAD ---
// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// const ACCEPTED_FILE_TYPES = ["application/pdf", "image/png"];

// const licenseSchema = z.object({
//   licenseType: z.string().min(1, { message: "License type is required" }),
//   licenseNumber: z.string().min(1, { message: "License number is required" }).regex(/^[A-Z0-9-]+$/, { message: "Only uppercase letters, numbers, and hyphens are allowed" }),
//   issuingAuthority: z.string().min(1, { message: "Issuing authority is required" }).regex(/^[A-Za-z\s,.'()&-]+$/, { message: "Only letters, commas, and punctuation allowed" }),
//   issueDate: z.string().min(1, { message: "Issue date is required" }),
//   expiryDate: z.string().optional(),
//   verificationStatus: z.string().min(1, { message: "Verification status is required" }),
//   document: z.any()
//     .refine((file) => file, "Document is required.")
//     .refine((file) => file?.size <= MAX_FILE_SIZE_BYTES, `Max file size is ${MAX_FILE_SIZE_MB}MB.`)
//     .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Only .pdf and .png formats are supported."),
// }).refine((data) => {
//     if (!data.expiryDate) return true;
//     const issue = new Date(data.issueDate);
//     const expiry = new Date(data.expiryDate);
//     return expiry > issue;
// }, { message: "Expiry date must be after issue date", path: ["expiryDate"] });

// // --- CHANGE: Updated the License type to reflect the mock data structure ---
// type License = Omit<z.infer<typeof licenseSchema>, 'document'> & { 
//   id: string; 
//   documentName: string;
//   document?: File | null; // The document can be a File or null
// };
// type SortableKeys = keyof Omit<License, 'id' | 'document' | 'documentName'>;

// // --- CHANGE: Replaced `new File(...)` with simple objects for mock data ---
// // const mockLicenses: License[] = [
// //   { id: "1", licenseType: "Commercial Vehicle Permit", licenseNumber: "CVP-12345678", issuingAuthority: "Regional Transport Office, Mumbai", issueDate: "2023-03-15", expiryDate: "2026-03-14", verificationStatus: "Verified", documentName: "cv-permit.pdf" },
// //   { id: "2", licenseType: "Hazardous Materials Transport License", licenseNumber: "HMTL-87654321", issuingAuthority: "Ministry of Environment, Govt. of India", issueDate: "2022-09-20", expiryDate: "2025-09-19", verificationStatus: "Pending", documentName: "hazmat-license.png" },
// //   { id: "3", licenseType: "Interstate Goods Transport Permit", licenseNumber: "IGTP-246813579", issuingAuthority: "Ministry of Road Transport & Highways", issueDate: "2023-01-05", expiryDate: "2028-01-04", verificationStatus: "Verified", documentName: "interstate-permit.pdf" }
// // ];

// const licenseTypes = [ "Commercial Vehicle Permit", "Environmental Clearance Certificate", "GPS Implementation Certificate", "Goods Carrier License", "Hazardous Materials Transport License", "Heavy Equipment Operation License", "Interstate Goods Transport Permit", "Oversize Load Transport Permit", "Special Project Transportation Permit", "Vehicle Fitness Certificate" ];
// const verificationStatuses = [ "Verified", "Pending", "Rejected", "Expired" ];
// const mockLicenses: License[] = [
//   { id: "1", licenseType: "Commercial Vehicle Permit", licenseNumber: "CVP-12345678", issuingAuthority: "Regional Transport Office, Mumbai", issueDate: "2023-03-15", expiryDate: "2026-03-14", verificationStatus: "Verified", documentName: "cv-permit.pdf" },
//   { id: "2", licenseType: "Hazardous Materials Transport License", licenseNumber: "HMTL-87654321", issuingAuthority: "Ministry of Environment, Govt. of India", issueDate: "2022-09-20", expiryDate: "2025-09-19", verificationStatus: "Pending", documentName: "hazmat-license.png" },
//   { id: "3", licenseType: "Interstate Goods Transport Permit", licenseNumber: "IGTP-246813579", issuingAuthority: "Ministry of Road Transport & Highways", issueDate: "2023-01-05", expiryDate: "2028-01-04", verificationStatus: "Verified", documentName: "interstate-permit.pdf" }
// ];

// export const LicensesPermitsSection = () => {
//   const [licenses, setLicenses] = useState<License[]>(mockLicenses);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentLicenseId, setCurrentLicenseId] = useState<string | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [editingLicense, setEditingLicense] = useState<License | null>(null);


//   const form = useForm<z.infer<typeof licenseSchema>>({
//     resolver: zodResolver(licenseSchema),
//     defaultValues: { licenseType: "", licenseNumber: "", issuingAuthority: "", issueDate: "", expiryDate: "", verificationStatus: "Pending" },
//   });

//   const sortedLicenses = useMemo(() => {
//   let sortableItems = [...licenses];
//   if (sortConfig !== null) {
//     sortableItems.sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
//       if (sortConfig.key === 'issueDate' || sortConfig.key === 'expiryDate') {
//         return sortConfig.direction === 'ascending' ? new Date(aValue!).getTime() - new Date(bValue!).getTime() : new Date(bValue!).getTime() - new Date(aValue!).getTime();
//       }
//       if (sortConfig.key === 'verificationStatus') {
//         const statusOrder: Record<string, number> = {
//           Verified: 1,
//           Pending: 2,
//           Rejected: 3,
//           Expired: 4,
//         };
//         return sortConfig.direction === 'ascending' ? (statusOrder[aValue as string] || 99) - (statusOrder[bValue as string] || 99) : (statusOrder[bValue as string] || 99) - (statusOrder[aValue as string] || 99);
//       }
//       return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
//     });
//   }
//   return sortableItems;
// }, [licenses, sortConfig]);

//   const requestSort = (key: SortableKeys) => {
//     let direction: 'ascending' | 'descending' = 'ascending';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; }
//     setSortConfig({ key, direction });
//   };

//   const openAddDialog = () => {
//     form.reset({ licenseType: "", licenseNumber: "", issuingAuthority: "", issueDate: "", expiryDate: "", verificationStatus: "Pending", document: undefined });
//     setSelectedFile(null);
//     setEditingLicense(null);
//     setIsEditing(false);
//     setCurrentLicenseId(null);
//     setIsDialogOpen(true);
//   };


//   const handleDownload = (file: File | null | undefined, fileName: string) => {
//     if (!file || file.size === 0) {
//       toast.error("No document available for download for this entry.");
//       return;
//     }
//     const url = URL.createObjectURL(file);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', fileName);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const openEditDialog = (id: string) => {
//     const licenseToEdit = licenses.find(l => l.id === id);
//     if (licenseToEdit) {
//       form.reset(licenseToEdit);
//       setSelectedFile(null);
//       setEditingLicense(licenseToEdit);
//       setIsEditing(true);
//       setCurrentLicenseId(id);
//       setIsDialogOpen(true);
//     }
//   };

//   const deleteLicense = (id: string) => {
//     setLicenses(licenses.filter(l => l.id !== id));
//     toast.success("License deleted successfully");
//   };

//   const onSubmit = (values: z.infer<typeof licenseSchema>) => {
//     const documentData = {
//         document: values.document,
//         documentName: (values.document as File).name,
//     };
//     if (isEditing && currentLicenseId) {
//       setLicenses(licenses.map(l => l.id === currentLicenseId ? { ...values, ...documentData, id: currentLicenseId } : l));
//       toast.success("License updated successfully");
//     } else {
//       const newId = Math.random().toString(36).substring(2, 9);
//       setLicenses([...licenses, { ...values, ...documentData, id: newId }]);
//       toast.success("New license added successfully");
//     }
//     setIsDialogOpen(false);
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       form.setValue("document", file, { shouldValidate: true });
//       setSelectedFile(file);
//     }
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault(); e.stopPropagation(); setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       form.setValue("document", file, { shouldValidate: true });
//       setSelectedFile(file);
//     }
//   };
//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "Verified": return "bg-green-300 hover:bg-green-500 text-black";
//       case "Pending": return "bg-yellow-300 hover:bg-yellow-500 text-black";
//       case "Rejected": return "bg-red-300 hover:bg-red-500 text-black";
//       case "Expired": return "bg-gray-300 hover:bg-gray-500 text-black";
//       default: return "bg-blue-300 hover:bg-blue-500 text-black";
//     }
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <div>
//           <CardTitle className="text-2xl font-bold text-gray-800">Licenses & Permits</CardTitle>
//           <CardDescription>Manage your logistics licenses, permits and certifications</CardDescription>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//   <Button
//     onClick={openAddDialog}
//     className="bg-[#eb2f96] hover:bg-[#c4257d]"
//   >
//     <Plus className="mr-2 h-4 w-4" /> Add License
//   </Button>
// </DialogTrigger>
// <DialogContent className="sm:max-w-[600px]">
//   <DialogHeader>
//     <DialogTitle>{isEditing ? "Edit License" : "Add New License"}</DialogTitle>
//     <DialogDescription>
//       {isEditing
//         ? "Update the details of your license or permit"
//         : "Add details about a new license or permit for your logistics operations"}
//     </DialogDescription>
//   </DialogHeader>
//   <Form {...form}>
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//       <FormField
//         control={form.control}
//         name="licenseType"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className={form.formState.errors.licenseType ? "text-black" : ""}>License Type</FormLabel>
//             <Select onValueChange={field.onChange} value={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select license type" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {licenseTypes.map((type) => (
//                   <SelectItem key={type} value={type}>
//                     {type}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name="licenseNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className={form.formState.errors.licenseNumber ? "text-black" : ""}>License Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter license number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="issuingAuthority"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className={form.formState.errors.issuingAuthority ? "text-black" : ""}>Issuing Authority</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter issuing authority" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name="issueDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className={form.formState.errors.issueDate ? "text-black" : ""}>Issue Date</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="expiryDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className={form.formState.errors.expiryDate ? "text-black" : ""}>Expiry Date</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//                 <FormField control={form.control} name="document" render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-foreground">Upload License</FormLabel>
//                     {!selectedFile && editingLicense?.documentName && (<div className="flex items-center gap-2 p-2 mt-2 rounded-md border text-sm text-muted-foreground"><FileText className="h-4 w-4" /><span className="truncate">Current file: {editingLicense.documentName}</span></div>)}
//                     <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById("licenseDocument")?.click()} className={cn("border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-400")}>
//                       <Upload className="h-10 w-10 text-muted-foreground mb-2" />
//                       <p className="text-sm text-muted-foreground mb-1">Drag and drop document or click to browse</p>
//                       <p className="text-xs text-muted-foreground">Supports PDF, PNG up to {MAX_FILE_SIZE_MB}MB</p>
//                       <Input id="licenseDocument" type="file" className="hidden" accept=".pdf,.png" onChange={handleFileChange} />
//                     </div>
//                     {selectedFile && (
//                       <div className="flex items-center justify-between p-2 mt-2 rounded-md border text-sm">
//                         <div className="flex items-center gap-2 overflow-hidden">
//                           <FileText className="h-4 w-4 text-blue-600" />
//                           <span className="truncate">{selectedFile.name}</span>
//                           <span className="text-gray-500 text-xs flex-shrink-0">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
//                         </div>
//                         <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-50" onClick={() => { setSelectedFile(null); form.setValue("document", null); }}><X className="h-4 w-4" /></Button>
//                       </div>
//                     )}
//                     <FormMessage />
//                   </FormItem>
//                 )} />
//                 <FormField control={form.control} name="verificationStatus" render={({ field }) => (<FormItem><FormLabel>Verification Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{verificationStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
//                 <DialogFooter className="pt-4">
//                   <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d] text-white">{isEditing ? "Update" : "Upload"}</Button>
//                   <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
//                 </DialogFooter>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </CardHeader>
      
//       <CardContent>
//         {licenses.length === 0 ? (
//           <div className="text-center py-8">
//             <File className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-semibold text-gray-900">No licenses added</h3>
//             <p className="mt-1 text-sm text-gray-500">Get started by adding your first license or permit</p>
//             <div className="mt-6"><Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add License</Button></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-pink-100">
//                   <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseType')}><div className="flex items-center justify-center gap-2"><span>License Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                    <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseNumber')}><div className="flex items-center justify-center gap-2"><span>License Number</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                    <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('issuingAuthority')}><div className="flex items-center justify-center gap-2"><span>Issuing Authority</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'issuingAuthority' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                    <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('issueDate')}><div className="flex items-center justify-center gap-2"><span>Issue Date</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'issueDate' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                    <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('expiryDate')}><div className="flex items-center justify-center gap-2"><span>Expiry Date</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'expiryDate' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
//                   <TableHead className="text-center cursor-pointer hover:bg-pink-100" onClick={() => requestSort('verificationStatus')}>
//                    <div className="flex items-center justify-center gap-2">
//                     <span>Status</span>
//                        <ArrowUpDown className="h-4 w-4 text-slate-400" />
//                          {sortConfig?.key === 'verificationStatus' && (
//                         <span className="text-xs font-bold text-slate-700">
//                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                   </span>
//                      )}
//                   </div>
//                  </TableHead>

//                    <TableHead className="text-center hover:bg-pink-100">Document</TableHead>
//                   <TableHead className="text-center hover:bg-pink-100">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedLicenses.map((license) => (
//                   <TableRow key={license.id}>
//                     <TableCell className="text-center">{license.licenseType}</TableCell>
//                     <TableCell className="text-center">{license.licenseNumber}</TableCell>
//                     <TableCell className="text-center">{license.issuingAuthority}</TableCell>
//                     <TableCell className="text-center">{formatDate(license.issueDate)}</TableCell>
//                     <TableCell className="text-center">{formatDate(license.expiryDate)}</TableCell>
//                     <TableCell className="text-center"><Badge className={getStatusBadge(license.verificationStatus)}>{license.verificationStatus === "Verified" && <Check className="mr-1 h-3 w-3" />}{license.verificationStatus}</Badge></TableCell>
//                     {/* <TableCell className="text-center"><Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button></TableCell> */}
//                     <TableCell className="text-center">
//                       <Button variant="ghost" size="sm" onClick={() => handleDownload(license.document, license.documentName)}>
//                         <Download className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                     <TableCell className="text-center"><div className="flex justify-center items-center space-x-2"><Button variant="outline" size="sm" className="hover:bg-blue-50" onClick={() => openEditDialog(license.id)}><Edit className="h-4 w-4 text-blue-600" /></Button><Button variant="outline" size="sm" className="hover:bg-red-50" onClick={() => deleteLicense(license.id)}><Trash className="h-4 w-4 text-red-600" /></Button></div></TableCell>
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

import { useMemo, useState, useRef, ChangeEvent, DragEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, File, Download, Check, Edit, Trash, ArrowUpDown, FileText, Upload, X, Info } from "lucide-react";
import { cn } from "@/lib/utils"; // Assumes you have a lib/utils.ts for shadcn

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- CONFIGURATION FOR FILE UPLOAD ---
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/png"];

// --- MODIFIED ZOD SCHEMA for multiple files ---
const licenseSchema = z.object({
  licenseType: z.string().min(1, { message: "License type is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }).regex(/^[A-Z0-9-]+$/, { message: "Only uppercase letters, numbers, and hyphens are allowed" }),
  issuingAuthority: z.string().min(1, { message: "Issuing authority is required" }).regex(/^[A-Za-z\s,.'()&-]+$/, { message: "Only letters, commas, and punctuation allowed" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional(),
  verificationStatus: z.string().min(1, { message: "Verification status is required" }),
  documents: z.array(z.any())
    .min(1, "At least one document is required.")
    .refine((files) => files.every((file: File) => file.size <= MAX_FILE_SIZE_BYTES), `Max file size for each file is ${MAX_FILE_SIZE_MB}MB.`)
    .refine((files) => files.every((file: File) => ACCEPTED_FILE_TYPES.includes(file.type)), "Only .pdf and .png formats are supported."),
}).refine((data) => {
    if (!data.expiryDate) return true;
    const issue = new Date(data.issueDate);
    const expiry = new Date(data.expiryDate);
    return expiry > issue;
}, { message: "Expiry date must be after issue date", path: ["expiryDate"] });

// --- MODIFIED License type for multiple documents ---
type License = Omit<z.infer<typeof licenseSchema>, 'documents'> & { 
  id: string; 
  documentNames: string[];
  documents?: File[];
};
type SortableKeys = keyof Omit<License, 'id' | 'documents' | 'documentNames'>;

const licenseTypes = [ "Commercial Vehicle Permit", "Environmental Clearance Certificate", "GPS Implementation Certificate", "Goods Carrier License", "Hazardous Materials Transport License", "Heavy Equipment Operation License", "Interstate Goods Transport Permit", "Oversize Load Transport Permit", "Special Project Transportation Permit", "Vehicle Fitness Certificate" ];
const verificationStatuses = [ "Verified", "Pending", "Rejected", "Expired" ];

// --- MODIFIED Mock data for multiple documents ---
const mockLicenses: License[] = [
  { id: "1", licenseType: "Commercial Vehicle Permit", licenseNumber: "CVP-12345678", issuingAuthority: "Regional Transport Office, Mumbai", issueDate: "2023-03-15", expiryDate: "2026-03-14", verificationStatus: "Verified", documentNames: ["cv-permit.pdf"] },
  { id: "2", licenseType: "Hazardous Materials Transport License", licenseNumber: "HMTL-87654321", issuingAuthority: "Ministry of Environment, Govt. of India", issueDate: "2022-09-20", expiryDate: "2025-09-19", verificationStatus: "Pending", documentNames: ["hazmat-license.png"] },
  { id: "3", licenseType: "Interstate Goods Transport Permit", licenseNumber: "IGTP-246813579", issuingAuthority: "Ministry of Road Transport & Highways", issueDate: "2023-01-05", expiryDate: "2028-01-04", verificationStatus: "Verified", documentNames: ["interstate-permit.pdf"] }
];

export const LicensesPermitsSection = () => {
  const [licenses, setLicenses] = useState<License[]>(mockLicenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLicenseId, setCurrentLicenseId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  
  // --- NEW STATE to manage files in the form ---
  const [formFiles, setFormFiles] = useState<{ name: string; file?: File }[]>([]);

  const form = useForm<z.infer<typeof licenseSchema>>({
    resolver: zodResolver(licenseSchema),
    defaultValues: { licenseType: "", licenseNumber: "", issuingAuthority: "", issueDate: "", expiryDate: "", verificationStatus: "Pending", documents: [] },
  });
  
  const sortedLicenses = useMemo(() => {
    let sortableItems = [...licenses];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'issueDate' || sortConfig.key === 'expiryDate') {
          return sortConfig.direction === 'ascending' ? new Date(aValue!).getTime() - new Date(bValue!).getTime() : new Date(bValue!).getTime() - new Date(aValue!).getTime();
        }
        if (sortConfig.key === 'verificationStatus') {
          const statusOrder: Record<string, number> = { Verified: 1, Pending: 2, Rejected: 3, Expired: 4 };
          return sortConfig.direction === 'ascending' ? (statusOrder[aValue as string] || 99) - (statusOrder[bValue as string] || 99) : (statusOrder[bValue as string] || 99) - (statusOrder[aValue as string] || 99);
        }
        return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }
    return sortableItems;
  }, [licenses, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; }
    setSortConfig({ key, direction });
  };

  const openAddDialog = () => {
    form.reset({ licenseType: "", licenseNumber: "", issuingAuthority: "", issueDate: "", expiryDate: "", verificationStatus: "Pending", documents: [] });
    setFormFiles([]);
    setIsEditing(false);
    setCurrentLicenseId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const licenseToEdit = licenses.find(l => l.id === id);
    if (licenseToEdit) {
      const existingFiles = licenseToEdit.documentNames.map(name => ({ name, file: licenseToEdit.documents?.find(f => f.name === name) }));
      form.reset({ ...licenseToEdit, documents: existingFiles.map(f => f.file).filter(Boolean) as File[] });
      setFormFiles(existingFiles);
      setIsEditing(true);
      setCurrentLicenseId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteLicense = (id: string) => {
    setLicenses(licenses.filter(l => l.id !== id));
    toast.success("License deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof licenseSchema>) => {
    const licenseData = {
        ...values,
        id: isEditing && currentLicenseId ? currentLicenseId : Math.random().toString(36).substring(2, 9),
        documentNames: formFiles.map(f => f.name),
        documents: values.documents,
    };
    if (isEditing && currentLicenseId) {
        setLicenses(licenses.map(l => (l.id === currentLicenseId ? licenseData : l)));
        toast.success("License updated successfully");
    } else {
        setLicenses([...licenses, licenseData]);
        toast.success("New license added successfully");
    }
    setIsDialogOpen(false);
  };

  const updateFormFiles = (newFiles: File[]) => {
    const updatedFormFiles = [...formFiles];
    newFiles.forEach(file => {
      if (!updatedFormFiles.some(f => f.name === file.name)) {
        updatedFormFiles.push({ name: file.name, file: file });
      }
    });
    setFormFiles(updatedFormFiles);
    form.setValue("documents", updatedFormFiles.map(f => f.file).filter((f): f is File => !!f), { shouldValidate: true });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) updateFormFiles(files);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) updateFormFiles(files);
  };

  const handleRemoveFile = (fileNameToRemove: string) => {
    const updatedFormFiles = formFiles.filter(f => f.name !== fileNameToRemove);
    setFormFiles(updatedFormFiles);
    form.setValue("documents", updatedFormFiles.map(f => f.file).filter((f): f is File => !!f), { shouldValidate: true });
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified": return "bg-green-300 hover:bg-green-500 text-black";
      case "Pending": return "bg-yellow-300 hover:bg-yellow-500 text-black";
      case "Rejected": return "bg-red-300 hover:bg-red-500 text-black";
      case "Expired": return "bg-gray-300 hover:bg-gray-500 text-black";
      default: return "bg-blue-300 hover:bg-blue-500 text-black";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="min-h-14">
            <div className="flex items-center gap-2">
                <CardTitle className="text-2xl font-bold text-gray-800">Licenses & Permits</CardTitle>
                <Info className="h-5 w-5 cursor-pointer text-gray-500 transition-opacity hover:opacity-75" onClick={() => setShowDescription(!showDescription)} />
            </div>
            {showDescription && <CardDescription className="pt-2">Manage your logistics licenses, permits and certifications</CardDescription>}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add License</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit License" : "Add New License"}</DialogTitle>
              <DialogDescription>{isEditing ? "Update the details of your license or permit" : "Add details about a new license or permit"}</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="licenseType" render={({ field }) => (<FormItem><FormLabel>License Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select license type" /></SelectTrigger></FormControl><SelectContent>{licenseTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="licenseNumber" render={({ field }) => (<FormItem><FormLabel>License Number</FormLabel><FormControl><Input placeholder="Enter license number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="issuingAuthority" render={({ field }) => (<FormItem><FormLabel>Issuing Authority</FormLabel><FormControl><Input placeholder="Enter issuing authority" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="issueDate" render={({ field }) => (<FormItem><FormLabel>Issue Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="expiryDate" render={({ field }) => (<FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={form.control} name="documents" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Upload License</FormLabel>
                     <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById("licenseDocument")?.click()} className={cn("border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-400")}>
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">Drag and drop documents or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports PDF, PNG up to {MAX_FILE_SIZE_MB}MB</p>
                        <Input id="licenseDocument" type="file" className="hidden" accept=".pdf,.png" multiple onChange={handleFileChange} />
                     </div>
                    {formFiles.length > 0 && (
                      <div className={cn(
                        "mt-2 space-y-2",
                        formFiles.length > 1 && "max-h-32 overflow-y-auto pr-2" // <-- MODIFICATION HERE
                      )}>
                        {formFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-md border text-sm">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="h-4 w-4 flex-shrink-0 text-gray-500" />
                              <span className="truncate" title={file.name}>{file.name}</span>
                              {file.file && <span className="text-gray-500 text-xs flex-shrink-0">({(file.file.size / 1024 / 1024).toFixed(2)} MB)</span>}
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-50" onClick={() => handleRemoveFile(file.name)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="verificationStatus" render={({ field }) => (<FormItem><FormLabel>Verification Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{verificationStatuses.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                <DialogFooter className="pt-4">
                  <Button type="submit" className="bg-[#eb2f96] hover:bg-[#c4257d] text-white">{isEditing ? "Update" : "Add"}</Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">Cancel</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {licenses.length === 0 ? (
          <div className="text-center py-8">
            <File className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No licenses added</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first license or permit</p>
            <div className="mt-6"><Button onClick={openAddDialog} className="bg-[#eb2f96] hover:bg-[#c4257d]"><Plus className="mr-2 h-4 w-4" /> Add License</Button></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow className="bg-pink-100">
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseType')}><div className="flex items-center gap-2"><span>License Type</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseType' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('licenseNumber')}><div className="flex items-center gap-2"><span>License Number</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'licenseNumber' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('issuingAuthority')}><div className="flex items-center gap-2"><span>Issuing Authority</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'issuingAuthority' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('issueDate')}><div className="flex items-center gap-2"><span>Issue Date</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'issueDate' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                   <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('expiryDate')}><div className="flex items-center gap-2"><span>Expiry Date</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'expiryDate' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                  <TableHead className="cursor-pointer hover:bg-pink-100" onClick={() => requestSort('verificationStatus')}><div className="flex items-center gap-2"><span>Status</span><ArrowUpDown className="h-4 w-4 text-slate-400" />{sortConfig?.key === 'verificationStatus' && (<span className="text-xs font-bold text-slate-700">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>)}</div></TableHead>
                   <TableHead className="hover:bg-pink-100">Document</TableHead>
                  <TableHead className="hover:bg-pink-100 text-center">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {sortedLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell>{license.licenseType}</TableCell>
                    <TableCell>{license.licenseNumber}</TableCell>
                    <TableCell>{license.issuingAuthority}</TableCell>
                    <TableCell>{formatDate(license.issueDate)}</TableCell>
                    <TableCell>{formatDate(license.expiryDate)}</TableCell>
                    <TableCell><Badge className={getStatusBadge(license.verificationStatus)}>{license.verificationStatus === "Verified" && <Check className="mr-1 h-3 w-3" />}{license.verificationStatus}</Badge></TableCell>
                    <TableCell>
                      {license.documents && license.documents.length > 0 ? (
                        <Button variant="ghost" size="sm" onClick={() => {
                          const fileToDownload = license.documents?.[0];
                          if (fileToDownload) {
                            const url = URL.createObjectURL(fileToDownload);
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', license.documentNames[0]);
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                          } else {
                            toast.error("Document not available for download.");
                          }
                        }}>
                          <Download className="h-4 w-4" />
                        </Button>
                      ) : <span className="text-xs text-gray-500">N/A</span>}
                    </TableCell>
                    <TableCell><div className="flex justify-center items-center space-x-2"><Button variant="outline" size="sm" className="hover:bg-blue-50" onClick={() => openEditDialog(license.id)}><Edit className="h-4 w-4 text-blue-600" /></Button><Button variant="outline" size="sm" className="hover:bg-red-50" onClick={() => deleteLicense(license.id)}><Trash className="h-4 w-4 text-red-600" /></Button></div></TableCell>
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