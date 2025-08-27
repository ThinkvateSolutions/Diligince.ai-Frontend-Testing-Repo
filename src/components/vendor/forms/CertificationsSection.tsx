import { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, PlusCircle, FileText, Download, Trash, Edit, Loader2, X, ArrowUpFromLine, Check, ArrowUpDown, Info, ChevronLeft, ChevronRight, Upload } from "lucide-react";
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
};

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ITEMS_PER_PAGE = 6; // Number of items per page

const CertificationsSection = () => {
    const [certifications, setCertifications] = useState<CertificationState[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editingCertification, setEditingCertification] = useState<CertificationState | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sortField, setSortField] = useState<keyof CertificationState | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [showCertInfo, setShowCertInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
     const [showCertDialogInfo, setShowCertDialogInfo] = useState(false);
     
    const form = useForm<CertificationFormValues>({
        resolver: zodResolver(certificationSchema),
        defaultValues: { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" },
        mode: 'onTouched',
    });

    // Calculate pagination values
    const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = certifications.slice(indexOfFirstItem, indexOfLastItem);

    const openAddCertificationDialog = () => {
        setEditingCertification(null);
        form.reset({
            name: "", issuingOrganization: "", issueDate: "",
            expiryDate: "", documentName: "", isVerified: false,
        });
        setSelectedFile(null);
        setIsDragging(false);
        setIsDialogOpen(true);
    };
    
    const openEditCertificationDialog = (certification: CertificationState) => {
        setEditingCertification(certification);
        form.reset({
            ...certification,
            issueDate: format(certification.issueDate, 'dd-MM-yyyy'),
            expiryDate: certification.expiryDate ? format(certification.expiryDate, 'dd-MM-yyyy') : "",
        });
        setSelectedFile(null);
        setIsDragging(false);
        setIsDialogOpen(true);
    };
    
    const handleSort = (field: keyof CertificationState) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const sortedCertifications = [...certifications].sort((a, b) => {
        if (!sortField) return 0;
        
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue === undefined || bValue === undefined) return 0;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === "asc" 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (aValue instanceof Date && bValue instanceof Date) {
            return sortDirection === "asc" 
                ? aValue.getTime() - bValue.getTime()
                : bValue.getTime() - aValue.getTime();
        }
        
        return 0;
    });
    
    const onSubmit = (values: CertificationFormValues) => {
        setIsSubmitting(true);
        setTimeout(() => {
            try {
                if (editingCertification) {
                    const updatedState: CertificationState = {
                        ...editingCertification, ...values,
                        issueDate: new Date(values.issueDate),
                        expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
                        documentName: selectedFile ? selectedFile.name : editingCertification.documentName,
                    };
                    setCertifications(certifications.map(c => c.id === updatedState.id ? updatedState : c));
                    toast.success("Certification updated successfully!");
                } else {
                    const newState: CertificationState = {
                        id: `cert-${Date.now()}`, ...values,
                        issueDate: new Date(values.issueDate),
                        expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
                        documentName: selectedFile ? selectedFile.name : "sample-document.pdf",
                        isVerified: Math.random() < 0.5,
                    };
                    setCertifications(prev => [...prev, newState]);
                    toast.success("Certification added successfully!");
                }
                resetAndCloseDialog();
            } catch (error) {
                console.error("Submission failed:", error);
                toast.error("An unexpected error occurred while saving.");
            } finally {
                setIsSubmitting(false);
            }
        }, 800);
    };  

    const handleDeleteCertification = (id: string) => {
        if (confirm("Are you sure you want to delete this certification?")) {
            setCertifications(certifications.filter((cert) => cert.id !== id));
            // Reset to first page if we deleted the last item on the current page
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
            toast.success("Certification deleted successfully!");
        }
    };

    const handleDownload = (certification: CertificationState) => {
        if (!certification.documentName) {
            toast.error("No file available for this entry.");
            return;
        }
        toast.info(`Simulating download for: ${certification.documentName}`);
    };

    const validateAndSetFile = (file: File | null) => {
        if (!file) return;
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            toast.error(`Invalid file type. Only PDF, JPG, and PNG are allowed.`);
            return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            toast.error(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }
        setSelectedFile(file);
        toast.success("File selected successfully.");
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        validateAndSetFile(e.target.files?.[0] || null);
        e.target.value = '';
    };
    
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(true);
    };
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    };
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        validateAndSetFile(e.dataTransfer.files?.[0] || null);
    };
    const resetAndCloseDialog = () => {
        form.reset(); setEditingCertification(null); setSelectedFile(null);
        setIsDragging(false); setIsDialogOpen(false);
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
  
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-start justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <CardTitle className="mr-2 text-2xl text-gray-800">Certifications</CardTitle>
                            <button
                                type="button"
                                onClick={() => setShowCertInfo((prev) => !prev)}
                                className="text-muted-foreground hover:text-blue-600 transition"
                            >
                                <Info className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="min-h-[20px]">
                            {showCertInfo && (
                                <CardDescription className="text-sm text-muted-foreground">
                                    Manage your company certifications and licenses
                                </CardDescription>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={openAddCertificationDialog}
                        className="bg-orange-600 hover:bg-orange-700 mt-[10px]"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload Certification
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? ( 
                        <div className="flex items-center justify-center h-40">
                            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                        </div> 
                    ) : certifications.length === 0 ? ( 
                        <div className="text-center py-10 text-muted-foreground">
                            No certifications added yet.
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
                                                    <h3 className="font-semibold text-lg leading-tight">{certification.name}</h3>
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
                                                            <DropdownMenuItem onClick={() => handleDownload(certification)} disabled={!certification.documentName}>
                                                                <Download className="mr-2 h-4 w-4" /><span>Download</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => openEditCertificationDialog(certification)}>
                                                                <Edit className="mr-2 h-4 w-4" /><span>Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDeleteCertification(certification.id!)} className="text-red-500 focus:text-red-500">
                                                                <Trash className="mr-2 h-4 w-4" /><span>Delete</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                            <div className="min-h-[2.5rem] pt-2">
                                                {certification.documentName && (
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                                        <span className="text-sm text-blue-600 truncate">{certification.documentName}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-auto pt-4 border-t flex gap-4 items-center text-sm text-gray-600">
                                                <span>Issued: <span className="font-medium">{format(certification.issueDate, "dd-MM-yyyy")}</span></span>
                                                <span>Expiry: <span className="font-medium">{certification.expiryDate ? format(certification.expiryDate, "dd-MM-yyyy") : "NA"}</span></span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination controls */}
                            {totalPages > 1 && (
  <div className="flex flex-col items-center gap-3 mt-6">
    
    {/* Top: Previous / Next with labels */}
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>

    {/* Bottom: Pure number-based pagination like your image */}
    <div className="flex justify-center items-center gap-1">
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

      {/* Page Numbers with ellipsis */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page =>
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1
        )
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
              className={`h-8 w-8 p-0 ${
                currentPage === page
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : ""
              }`}
            >
              {page}
            </Button>
          ) : (
            <span key={idx} className="px-1 text-gray-500">
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
  </div>
)}

                        </>
                    )}
                </CardContent>
            </Card>

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
                                    render={({ field }) => {
                                        const issueDateValue = form.watch("issueDate");
                                        return (
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
                                        );
                                    }}
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
                                    className={cn(
                                        "border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", 
                                        isDragging ? "border-orange-500 bg-orange-50" : "border-border hover:border-orange-400"
                                    )}
                                >
                                    <Upload className="h-10 w-10 text-orange-600 mb-2" />
                                    <p className="text-sm text-muted-foreground mb-1">Drag and drop document or{" "}<span className="font-semibold text-orange-600">click to browse</span></p>
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
                                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
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