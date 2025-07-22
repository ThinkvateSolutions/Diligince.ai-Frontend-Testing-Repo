// import { useState, DragEvent, ChangeEvent, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { MoreVertical, PlusCircle, Upload, FileText, Download, Trash, Check, Edit, Loader2,X } from "lucide-react";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// import * as certificationsApi from "@/services/ServicecertificationsApi";

// // Zod schema for form validation
// const certificationSchema = z.object({
//   id: z.string().optional(),
//   name: z.string().min(2, { message: "Certification name is required" }),
//   issuingOrganization: z.string().min(2, { message: "Issuing organization is required" }),
//   issueDate: z.string().min(1, { message: "Issue date is required" }),
//   expiryDate: z.string().optional(),
//   documentName: z.string().optional(),
//   isVerified: z.boolean().default(false),
// }).refine((data) => {
//     if (data.issueDate && data.expiryDate) {
//       return new Date(data.expiryDate) > new Date(data.issueDate);
//     }
//     return true;
//   }, {
//     message: "Expiry date must be after the issue date.",
//     path: ["expiryDate"],
// });

// // Type definitions
// type CertificationFormValues = z.infer<typeof certificationSchema>;
// // This type is for managing component state, ensuring dates are Date objects.
// type CertificationState = Omit<CertificationFormValues, "issueDate" | "expiryDate"> & {
//   issueDate: Date;
//   expiryDate?: Date;
// };

// const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;


// const CertificationsSection = () => {
//   const [certifications, setCertifications] = useState<CertificationState[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [editingCertification, setEditingCertification] = useState<CertificationState | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const form = useForm<CertificationFormValues>({
//     resolver: zodResolver(certificationSchema),
//     defaultValues: { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" },
//     mode: 'onTouched',
//   });

//   const issueDateValue = form.watch("issueDate");
  
//   useEffect(() => {
//     const loadCertifications = async () => {
//       try {
//         const data = await certificationsApi.getCertifications();
//         const formattedData = data.map(cert => ({
//           ...cert,
//           issueDate: new Date(cert.issueDate),
//           expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : undefined,
//         }));
//         setCertifications(formattedData);
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : "Failed to load certifications.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadCertifications();
//   }, []);

//   // FIX 2: Added the missing dialog-opening functions back into the component.
//   const openAddCertificationDialog = () => {
//     setEditingCertification(null);
//     form.reset({
//       name: "",
//       issuingOrganization: "",
//       issueDate: "",
//       expiryDate: "",
//       documentName: "",
//       isVerified: false,
//     });
//     setSelectedFile(null);
//     setIsDragging(false);
//     setIsDialogOpen(true);
//   };
  
//   const openEditCertificationDialog = (certification: CertificationState) => {
//     setEditingCertification(certification);
//     form.reset({
//       ...certification,
//       issueDate: format(certification.issueDate, 'yyyy-MM-dd'),
//       expiryDate: certification.expiryDate ? format(certification.expiryDate, 'yyyy-MM-dd') : "",
//     });
//     setSelectedFile(null);
//     setIsDragging(false);
//     setIsDialogOpen(true);
//   };

//    const onSubmit = async (values: CertificationFormValues) => {
//     setIsSubmitting(true);
//     try {
//       if (editingCertification) {
//         const updatedCert = await certificationsApi.updateCertification(editingCertification.id!, values, selectedFile);
//         const updatedState = { ...updatedCert, issueDate: new Date(updatedCert.issueDate), expiryDate: updatedCert.expiryDate ? new Date(updatedCert.expiryDate) : undefined };
//         setCertifications(certifications.map(c => c.id === updatedState.id ? updatedState : c));
//         toast.success("Certification updated successfully!");
//       } else {
//         if (!selectedFile) {
//           toast.error("A document is required to add a new certification.");
//           setIsSubmitting(false);
//           return;
//         }
//         const newCert = await certificationsApi.addCertification(values, selectedFile);
//         const newState = { ...newCert, issueDate: new Date(newCert.issueDate), expiryDate: newCert.expiryDate ? new Date(newCert.expiryDate) : undefined };
//         setCertifications([...certifications, newState]);
//         toast.success("Certification added successfully!");
//       }
//       resetAndCloseDialog();
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Failed to save certification.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };  

//   const handleDeleteCertification = async (id: string) => {
//     if (confirm("Are you sure you want to delete this certification?")) {
//       try {
//         await certificationsApi.deleteCertification(id);
//         setCertifications(certifications.filter((cert) => cert.id !== id));
//         toast.success("Certification deleted successfully!");
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : "Failed to delete certification.");
//       }
//     }
//   };

//   const handleDownload = (certification: CertificationState) => {
//     if (!certification.documentName) {
//       toast.error("No file available for this entry.");
//       return;
//     }
//     const downloadUrl = certificationsApi.getCertificationDocumentUrl(certification.id!);
//     window.open(downloadUrl, '_blank');
//   };

//    // FIX: Centralized function to validate a single file
//   const validateAndSetFile = (file: File | null) => {
//     if (!file) return;

//     // Check file type
//     if (!ALLOWED_FILE_TYPES.includes(file.type)) {
//       toast.error(`Invalid file type. Only PDF, JPG, and PNG are allowed.`);
//       return;
//     }
//     // Check file size
//     if (file.size > MAX_FILE_SIZE_BYTES) {
//       toast.error(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
//       return;
//     }
//     setSelectedFile(file);
//     toast.success("File selected successfully.");
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     validateAndSetFile(e.target.files?.[0] || null);
//     e.target.value = ''; // Reset input to allow re-selecting the same file
//   };
  
//   // FIX: Added stopPropagation to all drag events
//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     validateAndSetFile(e.dataTransfer.files?.[0] || null);
//   };
//   const resetAndCloseDialog = () => {
//   form.reset();
//   setEditingCertification(null);
//   setSelectedFile(null);
//   setIsDragging(false);
//   setIsDialogOpen(false);
// };
  
//   // FIX 3: Removed the incomplete `renderContent` function and placed the rendering logic directly in the return statement for clarity and correctness.

//   return (
//     <>
//       {/* <Card className="w-full"> */}
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle className="text-2xl font-bold text-gray-800">Certifications</CardTitle>
//             <CardDescription>
//               Manage your company certifications and licenses
//             </CardDescription>
//           </div>
//           <Button onClick={openAddCertificationDialog} className="bg-[#6A0DAD] hover:bg-[#453262]">
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Upload Certification
//           </Button>
//         </CardHeader>
        
//         <CardContent>
//           {isLoading ? (
//             <div className="flex items-center justify-center h-40">
//               <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
//             </div>
//           ) : certifications.length === 0 ? (
//             <div className="text-center py-10 text-muted-foreground">
//               No certifications added yet. Click "Upload Certification" to get started.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {certifications.map((certification) => (
//                 <Card key={certification.id} className="overflow-hidden flex flex-col">
//                   <CardContent className="p-4 flex flex-col flex-grow">
//                     <div className="flex-grow space-y-3">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-semibold text-lg">{certification.name}</h3>
//                         {certification.isVerified && (
//                           <Badge className="bg-green-100 text-green-600 hover:bg-green-200">
//                             <Check className="mr-1 h-3 w-3" /> Verified
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600">
//                         Issued by: <span className="font-medium">{certification.issuingOrganization}</span>
//                       </p>
//                       <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
//                         <span>
//                           Issued: <span className="font-medium">
//                             {format(certification.issueDate, "MMM dd, yyyy")}
//                           </span>
//                         </span>
//                         {certification.expiryDate && (
//                           <span>
//                             Expires: <span className="font-medium">
//                               {format(certification.expiryDate, "MMM dd, yyyy")}
//                             </span>
//                           </span>
//                         )}
//                       </div>
//                       {certification.documentName && (
//                         <div className="flex items-center gap-2 pt-2">
//                           <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
//                           <span className="text-sm text-blue-600 truncate">{certification.documentName}</span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="mt-4 pt-4 border-t flex justify-between items-center">
//                       <Button
//                         variant="link"
//                         size="sm"
//                         className="p-0 h-auto text-blue-600 font-semibold"
//                         onClick={() => handleDownload(certification)}
//                         // FIX 4: The check should be against `documentName`, not a local file blob which doesn't exist in the state from the API.
//                         disabled={!certification.documentName}
//                       >
//                         <Download className="h-4 w-4 mr-2" />
//                         Download
//                       </Button>

//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => openEditCertificationDialog(certification)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             <span>Edit</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem 
//                             onClick={() => handleDeleteCertification(certification.id!)}
//                             className="text-red-500 focus:text-red-500"
//                           >
//                             <Trash className="mr-2 h-4 w-4" />
//                             <span>Delete</span>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       {/* </Card> */}

//      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) resetAndCloseDialog(); else setIsDialogOpen(true); }}>
//         <DialogContent className="sm:max-w-[525px]">
//           <DialogHeader>
//             <DialogTitle>{editingCertification ? 'Edit Certification' : 'Upload Certification'}</DialogTitle>
//             <DialogDescription>
//               {editingCertification
//                 ? "Update the details of your company certification"
//                 : "Add a new certification to showcase your company's credentials"}
//             </DialogDescription>
//           </DialogHeader>
          
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-foreground">Certification Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="E.g., ISO 9001:2015" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
              
//               <FormField
//                 control={form.control}
//                 name="issuingOrganization"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-foreground">Issuing Organization</FormLabel>
//                     <FormControl>
//                       <Input placeholder="E.g., Quality Council of India" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
              
//               <div className="grid grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="issueDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-foreground">Issue Date</FormLabel>
//                       <FormControl>
//                          <Input 
//                             type="date" 
//                             max={format(new Date(), 'yyyy-MM-dd')}
//                             {...field}
//                          />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="expiryDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-foreground">Expiry Date (Optional)</FormLabel>
//                       <FormControl>
//                         <Input 
//                             type="date"
//                             min={issueDateValue}
//                             disabled={!issueDateValue}
//                             {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
              
//                       {/* FIX: Improved file upload section */}
//               <FormItem>
//                 <FormLabel className="text-foreground">Certification Document</FormLabel>
//                 {!selectedFile && editingCertification?.documentName && (
//                   <div className="flex items-center gap-2 p-2 mt-2 rounded-md border text-sm text-muted-foreground">
//                     <FileText className="h-4 w-4" />
//                     <span className="truncate">Current file: {editingCertification.documentName}</span>
//                   </div>
//                 )}
//                 <div
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                   onClick={() => document.getElementById("certificationDocument")?.click()}
//                   className={cn("border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", isDragging ? "border-[#6A0DAD] bg-[#6A0DAD]" : "border-border hover:border-[#6A0DAD]")}
//                 >
//                   <Upload className="h-10 w-10 text-muted-foreground mb-2" />
//                   <p className="text-sm text-muted-foreground mb-2">Drag and drop document or{" "}<span className="font-semibold text-[#6A0DAD]">click to browse</span></p>
//                   <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG up to {MAX_FILE_SIZE_MB}MB</p>
//                   <Input id="certificationDocument" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
//                 </div>
//                 {selectedFile && (
//                   <div className="flex items-center justify-between p-2 mt-2 rounded-md border text-sm">
//                     <div className="flex items-center gap-2 overflow-hidden">
//                       <FileText className="h-4 w-4 text-blue-600" />
//                       <span className="truncate">{selectedFile.name}</span>
//                       <span className="text-gray-500 text-xs flex-shrink-0">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
//                     </div>
//                     <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => setSelectedFile(null)}>
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 )}
//               </FormItem>
              
//                            <DialogFooter className="pt-4">
//                 <Button type="button" variant="outline" onClick={resetAndCloseDialog}>Cancel</Button>
//                 <Button type="submit" disabled={isSubmitting} className="bg-[#6A0DAD] hover:bg-[#453262]">
//                   {isSubmitting ? "Saving..." : (editingCertification ? "Update" : "Upload")}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default CertificationsSection;

import { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreVertical, PlusCircle, Upload, FileText, Download, Trash, Check, Edit, Loader2, X, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

// Zod schema for form validation
const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Certification name is required" }),
  issuingOrganization: z.string().min(2, { message: "Issuing organization is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional(),
  documentName: z.string().optional(),
  isVerified: z.boolean().default(false),
}).refine((data) => {
    if (data.issueDate && data.expiryDate) {
      return new Date(data.expiryDate) > new Date(data.issueDate);
    }
    return true;
  }, {
    message: "Expiry date must be after the issue date.",
    path: ["expiryDate"],
});

// Type definitions
type CertificationFormValues = z.infer<typeof certificationSchema>;
type CertificationState = Omit<CertificationFormValues, "issueDate" | "expiryDate"> & {
  issueDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
};

type SortField = "name" | "issuingOrganization" | "issueDate" | "expiryDate";
type SortDirection = "asc" | "desc";

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const LOCAL_STORAGE_KEY = "companyCertifications";
const ITEMS_PER_PAGE = 6; // Number of items to show per page

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<CertificationState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCertification, setEditingCertification] = useState<CertificationState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sortField, setSortField] = useState<SortField>("issueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showInfo, setShowInfo] = useState(false);
  const [showCertDialogInfo, setShowCertDialogInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" },
    mode: 'onTouched',
  });

  const issueDateValue = form.watch("issueDate");
  
  // Sort certifications whenever sort field or direction changes
  const sortedCertifications = [...certifications].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "issuingOrganization":
        comparison = a.issuingOrganization.localeCompare(b.issuingOrganization);
        break;
      case "issueDate":
        comparison = a.issueDate.getTime() - b.issueDate.getTime();
        break;
      case "expiryDate":
        // Handle cases where expiryDate might be undefined
        const aExpiry = a.expiryDate?.getTime() || Infinity;
        const bExpiry = b.expiryDate?.getTime() || Infinity;
        comparison = aExpiry - bExpiry;
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedCertifications.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sortedCertifications.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field with default descending order
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Load certifications from localStorage
  useEffect(() => {
    const loadCertifications = () => {
      try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const formattedData = parsedData.map((cert: any) => ({
            ...cert,
            issueDate: new Date(cert.issueDate),
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : undefined,
          }));
          setCertifications(formattedData);
        }
      } catch (error) {
        toast.error("Failed to load certifications from storage.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCertifications();
  }, []);

  // Save certifications to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certifications));
    }
  }, [certifications, isLoading]);

  const openAddCertificationDialog = () => {
    setEditingCertification(null);
    form.reset({
      name: "",
      issuingOrganization: "",
      issueDate: "",
      expiryDate: "",
      documentName: "",
      isVerified: false,
    });
    setSelectedFile(null);
    setIsDragging(false);
    setIsDialogOpen(true);
  };
  
  const openEditCertificationDialog = (certification: CertificationState) => {
    setEditingCertification(certification);
    form.reset({
      ...certification,
      issueDate: format(certification.issueDate, 'yyyy-MM-dd'),
      expiryDate: certification.expiryDate ? format(certification.expiryDate, 'yyyy-MM-dd') : "",
    });
    setSelectedFile(null);
    setIsDragging(false);
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: CertificationFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingCertification) {
        // Update existing certification
        const updatedCert = {
          ...editingCertification,
          ...values,
          issueDate: new Date(values.issueDate),
          expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
          documentName: selectedFile ? selectedFile.name : editingCertification.documentName,
          documentUrl: selectedFile ? URL.createObjectURL(selectedFile) : editingCertification.documentUrl,
        };
        
        setCertifications(certifications.map(c => c.id === updatedCert.id ? updatedCert : c));
        toast.success("Certification updated successfully!");
      } else {
        // Add new certification
        if (!selectedFile) {
          toast.error("A document is required to add a new certification.");
          setIsSubmitting(false);
          return;
        }
        
        const newCert = {
          ...values,
          id: Date.now().toString(),
          issueDate: new Date(values.issueDate),
          expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
          documentName: selectedFile.name,
          documentUrl: URL.createObjectURL(selectedFile),
          isVerified: false,
        };
        
        setCertifications([...certifications, newCert]);
        toast.success("Certification added successfully!");
      }
      resetAndCloseDialog();
    } catch (error) {
      toast.error("Failed to save certification.");
    } finally {
      setIsSubmitting(false);
    }
  };  

  const handleDeleteCertification = (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      try {
        // Revoke object URL if it exists
        const certToDelete = certifications.find(c => c.id === id);
        if (certToDelete?.documentUrl) {
          URL.revokeObjectURL(certToDelete.documentUrl);
        }
        
        setCertifications(certifications.filter((cert) => cert.id !== id));
        // Reset to first page if we deleted the last item on the current page
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        toast.success("Certification deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete certification.");
      }
    }
  };

  const handleDownload = (certification: CertificationState) => {
    if (!certification.documentUrl) {
      toast.error("No file available for this entry.");
      return;
    }
    
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = certification.documentUrl;
    a.download = certification.documentName || 'certification';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const validateAndSetFile = (file: File | null) => {
    if (!file) return;

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Only PDF, JPG, and PNG are allowed.");
      return;
    }
    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setSelectedFile(file);
    toast.success("File selected successfully.");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0] || null);
    e.target.value = ''; // Reset input to allow re-selecting the same file
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0] || null);
  };

  const resetAndCloseDialog = () => {
    form.reset();
    setEditingCertification(null);
    setSelectedFile(null);
    setIsDragging(false);
    setIsDialogOpen(false);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="p-4">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between p-0">
          <div className="flex flex-col">
            <div className="flex items-center">
              <CardTitle className="text-2xl font-semibold mr-2">Certifications</CardTitle>
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className="text-black opacity-70 hover:opacity-100 transition"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            <div className="min-h-[24px]">
              {showInfo && (
                <div className="text-sm text-muted-foreground mt-1">
                  Manage your company certifications and licenses.
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={openAddCertificationDialog}
            className="mt-[8px] md:mt-[10px] bg-[#6A0DAD] hover:bg-[#453262] py-2 px-4 text-white rounded-md"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Certification
          </Button>
        </CardHeader>
      </div>
      
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-10 text-xl text-muted-foreground">
            No certifications added yet. Click "Upload Certification" to get started.
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4 flex-wrap">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("name")}
              >
                <span>Name</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "name" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("issuingOrganization")}
              >
                <span>Organization</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "issuingOrganization" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("issueDate")}
              >
                <span>Issue Date</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "issueDate" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("expiryDate")}
              >
                <span>Expiry Date</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "expiryDate" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((certification) => (
                <Card key={certification.id} className="flex flex-col">
                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-grow pr-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg leading-tight">{certification.name}</h3>
                          {certification.isVerified && (
                            <Badge className="bg-green-100 text-green-600 hover:bg-green-200">
                              <Check className="mr-1 h-3 w-3" /> Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-4 min-h-[40px]">
                          Issued by: <span className="font-medium">{certification.issuingOrganization}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload(certification)} disabled={!certification.documentUrl}>
                              <Download className="mr-2 h-4 w-4" /><span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditCertificationDialog(certification)}>
                              <Edit className="mr-2 h-4 w-4" /><span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCertification(certification.id!)} 
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash className="mr-2 h-4 w-4" /><span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="min-h-[2.5rem] pt-2">
                      {certification.documentName && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#6A0DAD] flex-shrink-0" />
                          <span className="text-sm text-[#6A0DAD] truncate">{certification.documentName}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-4 border-t flex gap-4 items-center text-sm text-gray-600">
                      <span>
                        Issued: <span className="font-medium">
                          {format(certification.issueDate, "dd-MM-yyyy")}
                        </span>
                      </span>
                      <span>
                        Expiry: <span className="font-medium">
                          {certification.expiryDate ? format(certification.expiryDate, "dd-MM-yyyy") : "NA"}
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination controls */}
             {totalPages > 1 && (
  <div className="flex justify-center items-center gap-1 mt-6">
    {/* Left Arrow */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="h-8 w-8"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(page => {
        // Always show first, last, current, and neighbors of current
        return (
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1
        );
      })
      .reduce((acc: (number | string)[], page, index, array) => {
        if (
          index > 0 &&
          typeof page === 'number' &&
          typeof array[index - 1] === 'number' &&
          (page as number) - (array[index - 1] as number) > 1
        ) {
          acc.push("...");
        }
        acc.push(page);
        return acc;
      }, [])
      .map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={`h-8 w-8 ${
              currentPage === page
                ? "bg-purple-700 text-white hover:bg-purple-800"
                : ""
            }`}
          >
            {page}
          </Button>
        ) : (
          <span key={idx} className="px-1">
            ...
          </span>
        )
      )}

    {/* Right Arrow */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="h-8 w-8"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)}
          </>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) resetAndCloseDialog(); else setIsDialogOpen(true); }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <DialogTitle>
                  {editingCertification ? 'Edit Certification' : 'Upload Certification'}
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setShowCertDialogInfo(prev => !prev)}
                  className="text-muted-foreground hover:text-blue-600 transition"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
              
              <div className="min-h-[20px] mt-1">
                {showCertDialogInfo && (
                  <DialogDescription>
                    {editingCertification
                      ? "Update the details of your company certification"
                      : "Add a new certification to showcase your company's credentials"}
                  </DialogDescription>
                )}
              </div>
            </div>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Certification Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g ISO 9001:2015" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issuingOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Issuing Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Quality Council of India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Issue Date</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="DD-MM-YYYY"
                          type="date" 
                          max={format(new Date(), 'yyyy-MM-dd')}
                          {...field}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          min={issueDateValue}
                          disabled={!issueDateValue}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormItem>
                <FormLabel className="text-foreground">Certification Document</FormLabel>
                {!selectedFile && editingCertification?.documentName && (
                  <div className="flex items-center gap-2 p-2 mt-2 rounded-md border border-purple-1000 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">Current file: {editingCertification.documentName}</span>
                  </div>
                )}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("certificationDocument")?.click()}
                  className={cn("border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", isDragging ? "border-bg-[#6A0DAD] bg-[#453262]" : "border-border hover:border-[purple]")}
                >
                  <Upload className="h-10 w-10 text-purple-700 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop document or{" "}<span className="font-semibold text-purple-900">click to browse</span></p>
                  <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG up to {MAX_FILE_SIZE_MB}MB</p>
                  <Input id="certificationDocument" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                </div>
                
                {selectedFile && (
                  <div className="flex items-center justify-between p-2 mt-2 rounded-md border text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="h-4 w-4 text-bg-[#6A0DAD]" />
                      <span className="truncate">{selectedFile.name}</span>
                      <span className="text-gray-500 text-xs flex-shrink-0">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormItem>
              
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="bg-[#6A0DAD] hover:bg-[#453262]">
                  {isSubmitting ? "Saving..." : (editingCertification ? "Update" : "Upload")}
                </Button>
                
                <Button type="button" variant="outline" onClick={resetAndCloseDialog}>Cancel</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationsSection;