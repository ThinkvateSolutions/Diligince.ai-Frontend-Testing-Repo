import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Upload, FileText, Download, Trash, Check, Edit } from "lucide-react";
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


type CertificationFormValues = z.infer<typeof certificationSchema>;

// === MODIFIED: Added 'file' property to hold the actual File object ===
type CertificationState = Omit<CertificationFormValues, "issueDate" | "expiryDate"> & {
  issueDate: Date;
  expiryDate?: Date;
  file?: File;
};

const initialCertifications: CertificationState[] = [
  {
    id: "1",
    name: "ISO 9001:2015",
    issuingOrganization: "Quality Council of India",
    issueDate: new Date("2021-05-15"),
    expiryDate: new Date("2024-05-14"),
    documentName: "ISO9001_Certificate.pdf",
    isVerified: true,
    // Note: No 'file' object for initial static data, so download will be disabled.
  },
  {
    id: "2",
    name: "ISA/IEC 62443 Cybersecurity Expert",
    issuingOrganization: "International Society of Automation",
    issueDate: new Date("2022-08-10"),
    expiryDate: new Date("2025-08-09"),
    documentName: "ISA_Cybersecurity_Cert.pdf",
    isVerified: true,
  },
];

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCertification, setEditingCertification] = useState<CertificationState | null>(null);

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuingOrganization: "",
      issueDate: "",
      expiryDate: "",
      documentName: "",
      isVerified: false,
    },
    mode: 'onTouched',
  });

  const issueDateValue = form.watch("issueDate");

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
    setIsDialogOpen(true);
  };

  const onSubmit = (values: CertificationFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingCertification) {
        // === MODIFIED: Added 'file' property to updated object ===
        const updatedCertification: CertificationState = {
          ...editingCertification,
          ...values,
          issueDate: new Date(values.issueDate),
          expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
          documentName: selectedFile ? selectedFile.name : editingCertification.documentName,
          file: selectedFile || editingCertification.file, 
        };

        setCertifications(
          certifications.map((cert) =>
            cert.id === editingCertification.id ? updatedCertification : cert
          )
        );
        toast.success("Certification updated successfully!");
      } else {
        // === MODIFIED: Added 'file' property to new object ===
        const newCertification: CertificationState = {
          ...values,
          id: `${Date.now()}`,
          issueDate: new Date(values.issueDate),
          expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
          documentName: selectedFile ? selectedFile.name : undefined,
          file: selectedFile || undefined, 
          isVerified: false
        };
        setCertifications([...certifications, newCertification]);
        toast.success("Certification added successfully!");
      }
      
      setIsDialogOpen(false);
      setIsSubmitting(false);
      setEditingCertification(null);
    }, 1000);
  };

  const handleDeleteCertification = (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      setCertifications(certifications.filter((cert) => cert.id !== id));
      toast.success("Certification deleted successfully!");
    }
  };

  // === NEW: Function to handle file download ===
  const handleDownload = (certification: CertificationState) => {
    if (!certification.file) {
      toast.error("No file available for download for this entry.");
      return;
    }
    const url = URL.createObjectURL(certification.file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', certification.documentName || 'certificate-document');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Certifications</CardTitle>
            <CardDescription>
              Manage your company certifications and licenses
            </CardDescription>
          </div>
          <Button onClick={openAddCertificationDialog} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Certification
          </Button>
        </CardHeader>
        
        <CardContent>
          {certifications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No certifications added yet. Click "Upload Certification" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((certification) => (
                <Card key={certification.id} className="overflow-hidden border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{certification.name}</h3>
                          {certification.isVerified && (
                            <Badge className="bg-green-100 text-green-600 hover:bg-green-200">
                              <Check className="mr-1 h-3 w-3" /> Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Issued by: <span className="font-medium">{certification.issuingOrganization}</span>
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <span>
                            Issue Date: <span className="font-medium">
                              {format(new Date(certification.issueDate), "MMM dd, yyyy")}
                            </span>
                          </span>
                          {certification.expiryDate && (
                            <span>
                              Expiry Date: <span className="font-medium">
                                {format(new Date(certification.expiryDate), "MMM dd, yyyy")}
                              </span>
                            </span>
                          )}
                        </div>
                        
                        {certification.documentName && (
                          <div className="flex items-center gap-2 mt-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-600">{certification.documentName}</span>
                            {/* === MODIFIED: Download button is now functional === */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 ml-2 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleDownload(certification)}
                              disabled={!certification.file}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-shrink-0 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditCertificationDialog(certification)}
                          className="h-8 w-8 text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteCertification(certification.id!)}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* ... The rest of the Dialog and Form code remains unchanged ... */}
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingCertification ? 'Edit Certification' : 'Upload Certification'}</DialogTitle>
            <DialogDescription>
              {editingCertification
                ? "Update the details of your company certification"
                : "Add a new certification to showcase your company's credentials"}
            </DialogDescription>
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
                      <Input placeholder="E.g., ISO 9001:2015" {...field} />
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
                      <Input placeholder="E.g., Quality Council of India" {...field} />
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
              
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Drag and drop certification document or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, JPG or PNG up to 5MB
                </p>
                <Input
                  id="certificationDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("certificationDocument")?.click()}
                >
                  Browse Files
                </Button>
                {selectedFile ? (
                  <div className="flex items-center gap-2 mt-4">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                  </div>
                ) : (
                  editingCertification?.documentName && (
                    <div className="flex items-center gap-2 mt-4">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">{editingCertification.documentName}</span>
                    </div>
                  )
                )}
              </div>
              
              <DialogFooter className="pt-4">
                
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting
                    ? "Saving..."
                    : editingCertification
                    ? "Update Certification"
                    : "Upload Certification"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationsSection;