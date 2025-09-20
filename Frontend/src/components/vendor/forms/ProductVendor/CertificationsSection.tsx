import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Upload, Calendar, Search, Building, Check, AlertTriangle, Pencil, Trash, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

const certificationSchema = z.object({
  id: z.string().optional(),
  certificateName: z.string().min(1, { message: "Certificate name is required" }),
  issuingOrganization: z.string().min(1, { message: "Issuing organization is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional(),
  certificationType: z.string().min(1, { message: "Certification type is required" }),
  linkedProducts: z.array(z.string()).optional(),
  documentFile: z.any().optional(),
}).refine(data => {
    if (!data.expiryDate) return true;
    return new Date(data.expiryDate) > new Date(data.issueDate);
  }, {
    message: "Expiry date must be after the issue date.",
    path: ["expiryDate"],
  });

type CertificationFormValues = z.infer<typeof certificationSchema>;

const mockCertifications = [
  {
    id: "1",
    name: "ISO 9001:2015 - Quality Management System",
    organization: "Bureau Veritas",
    issueDate: "2021-06-10",
    expiryDate: "2024-06-09",
    type: "Company",
    status: "Verified",
    document: "ISO9001_Certificate.pdf",
    documentUrl: "https://example.com/ISO9001_Certificate.pdf",
    linkedProducts: [],
  },
  {
    id: "2",
    name: "CE Marking - Electromagnetic Compatibility",
    organization: "TÜV SÜD",
    issueDate: "2022-03-15",
    expiryDate: "2027-03-14",
    type: "Product",
    status: "Verified",
    document: "CE_EMC_Certificate.pdf",
    documentUrl: "https://example.com/CE_EMC_Certificate.pdf",
    linkedProducts: ["Industrial Bearing Kit", "Electronic Motor Controller"],
  },
  {
    id: "3",
    name: "RoHS Compliance",
    organization: "Intertek",
    issueDate: "2022-08-22",
    expiryDate: "2025-08-21",
    type: "Product",
    status: "Pending Verification",
    document: "RoHS_Compliance_Certificate.pdf",
    documentUrl: "https://example.com/RoHS_Compliance_Certificate.pdf",
    linkedProducts: ["Pressure Sensor Array"],
  },
];

type Certification = typeof mockCertifications[0];

const productOptions = [
  { label: "Industrial Bearing Kit", value: "bearing_kit" },
  { label: "Electronic Motor Controller", value: "motor_controller" },
  { label: "Pressure Sensor Array", value: "pressure_sensor" },
  { label: "Stainless Steel Pipe Fittings", value: "pipe_fittings" },
  { label: "Safety Harness Kit", value: "safety_harness" },
];

const CertificationsSection = () => {
  const [isAddCertDialogOpen, setIsAddCertDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [certTab, setCertTab] = useState("all");
  const [documentFile, setDocumentFile] = useState<{ name: string; url: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const formDefaultValues = {
    id: undefined,
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    expiryDate: "",
    certificationType: "",
    linkedProducts: [],
    documentFile: undefined,
  };

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: formDefaultValues,
  });

  const handleAddClick = () => {
    setEditingCertification(null);
    form.reset(formDefaultValues);
    setDocumentFile(null);
    setIsAddCertDialogOpen(true);
  };

  const handleEditClick = (certification: Certification) => {
    setEditingCertification(certification);
    form.reset({
      id: certification.id,
      certificateName: certification.name,
      issuingOrganization: certification.organization,
      issueDate: certification.issueDate,
      expiryDate: certification.expiryDate,
      certificationType: certification.type,
      linkedProducts: certification.linkedProducts
        ? productOptions.filter(po => certification.linkedProducts.includes(po.label)).map(po => po.value)
        : [],
      documentFile: undefined,
    });
    setDocumentFile({ name: certification.document, url: certification.documentUrl });
    setIsAddCertDialogOpen(true);
  };

  const onSubmit = (values: CertificationFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      const linkedProductLabels = values.linkedProducts
        ? values.linkedProducts.map(p => productOptions.find(po => po.value === p)?.label || p)
        : [];

      if (editingCertification) {
        const updatedCert = {
          ...editingCertification,
          name: values.certificateName,
          organization: values.issuingOrganization,
          issueDate: values.issueDate,
          expiryDate: values.expiryDate || "No Expiry",
          type: values.certificationType,
          document: documentFile?.name || editingCertification.document,
          documentUrl: documentFile?.url || editingCertification.documentUrl,
          linkedProducts: linkedProductLabels,
        };
        setCertifications(certifications.map(c => c.id === editingCertification.id ? updatedCert : c));
        toast.success("Certification updated successfully!");
      } else {
        const newCertification = {
          id: (certifications.length + 1).toString(),
          name: values.certificateName,
          organization: values.issuingOrganization,
          issueDate: values.issueDate,
          expiryDate: values.expiryDate || "No Expiry",
          type: values.certificationType,
          status: "Pending Verification",
          document: documentFile?.name || "Certificate.pdf",
          documentUrl: documentFile?.url || "https://example.com/new_cert.pdf",
          linkedProducts: linkedProductLabels,
        };
        setCertifications([newCertification, ...certifications]);
        toast.success("Certification added successfully!");
      }

      setIsLoading(false);
      setIsAddCertDialogOpen(false);
    }, 1500);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile({ name: file.name, url: URL.createObjectURL(file) });
      form.setValue("documentFile", file);
      toast.success("Document selected successfully!");
    }
  };

  const handleDeleteCertification = (id: string) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      setCertifications(certifications.filter(cert => cert.id !== id));
      toast.success("Certification deleted successfully!");
    }
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      certTab === "all" ||
      (certTab === "company" && cert.type === "Company") ||
      (certTab === "product" && cert.type === "Product");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Certifications</CardTitle>
              <CardDescription>Manage your company and product certifications.</CardDescription>
            </div>
            <Button onClick={handleAddClick} className="gap-2 bg-yellow-600 hover:bg-yellow-700">
              <Plus size={16} />
              <span>Upload Certification</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setCertTab}>
                <TabsList>
                  <TabsTrigger value="all">All Certifications</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="product">Product</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search certifications..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
            {filteredCertifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No certifications found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery ? "Try a different search term" : "Upload your first certification"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCertifications.map((cert) => (
                  // --- MODIFICATION START ---
                  // 1. Added `flex flex-col` to the Card component to make it a flex container.
                  <Card key={cert.id} className="overflow-hidden border flex flex-col">
                    {/* 2. Changed CardContent to a flex column container that grows to fill available space. */}
                    <CardContent className="p-0 flex-grow flex flex-col">
                      {/* 3. The main content area now grows to push the new footer to the bottom. */}
                      <div className="p-6 space-y-4 flex-grow">
                        {/* Section 1: Title and Issuer */}
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-1">
                            <h3 className="font-semibold text-lg">{cert.name}</h3>
                            <Badge variant="secondary" className={cert.status === "Verified" ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200" : "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"}>
                              {cert.status === "Verified" 
                                ? <div className="flex items-center gap-1.5"><Check size={12} /><span>Verified</span></div>
                                : <div className="flex items-center gap-1.5"><AlertTriangle size={12} /><span>Pending</span></div>
                              }
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Issued by <span className="font-medium">{cert.organization}</span></p>
                        </div>

                        {/* Section 2: Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm pt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Issue Date</p>
                            <p className="font-medium mt-1">{new Date(cert.issueDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Expiry Date</p>
                            <p className="font-medium mt-1">{cert.expiryDate === "No Expiry" ? "No Expiry" : new Date(cert.expiryDate).toLocaleDateString()}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs text-muted-foreground">Document</p>
                            <p className="font-medium mt-1 truncate">{cert.document}</p>
                          </div>
                        </div>

                        {/* Section 3: Linked Products */}
                        {cert.linkedProducts.length > 0 && (
                          <div className="pt-2">
                            <p className="text-xs text-muted-foreground">Linked Products</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {cert.linkedProducts.map((product, index) => (
                                <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 font-normal">{product}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4. This is the new footer for the action buttons. It's centered and has a top border. */}
                      <div className="border-t p-3 flex items-center justify-center gap-6 bg-slate-50">
                        <a href={cert.documentUrl} download={cert.document}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600 hover:text-slate-900">
                            <Download size={16} />
                          </Button>
                        </a>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600 hover:text-slate-900" onClick={() => handleEditClick(cert)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:text-red-700" onClick={() => handleDeleteCertification(cert.id)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                      {/* --- MODIFICATION END --- */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Certification Dialog */}
      <Dialog open={isAddCertDialogOpen} onOpenChange={setIsAddCertDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCertification ? "Edit Certification" : "Add New Certification"}</DialogTitle>
            <DialogDescription>{editingCertification ? "Update certification details." : "Add details and upload the certificate document."}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
              <FormField control={form.control} name="certificateName" render={({ field }) => (<FormItem><FormLabel>Certificate Name</FormLabel><FormControl><Input placeholder="e.g., ISO 9001:2015" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="issuingOrganization" render={({ field }) => (<FormItem><FormLabel>Issuing Organization</FormLabel><FormControl><div className="relative"><Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="e.g., Bureau Veritas" className="pl-10" {...field} /></div></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="certificationType" render={({ field }) => (<FormItem><FormLabel>Certification Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Company">Company Certificate</SelectItem><SelectItem value="Product">Product Certificate</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="issueDate" render={({ field }) => (<FormItem><FormLabel>Issue Date</FormLabel><FormControl><div className="relative"><Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="date" className="pl-10" {...field} /></div></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="expiryDate" render={({ field }) => (<FormItem><FormLabel>Expiry Date (Optional)</FormLabel><FormControl><div className="relative"><Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="date" className="pl-10" {...field} /></div></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="linkedProducts" render={({ field }) => (<FormItem><FormLabel>Link to Products (for product certifications)</FormLabel><FormControl><MultiSelect options={productOptions} selected={field.value || []} onChange={field.onChange} placeholder="Select products to link" /></FormControl><FormMessage /></FormItem>)} />
              <div className="space-y-3">
                <FormLabel>Certificate Document</FormLabel>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground text-center mb-2">Upload your certification document</p><p className="text-xs text-muted-foreground mb-4">PDF, JPG or PNG up to 10MB</p>
                  <Input id="certificationDocument" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleDocumentUpload} />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("certificationDocument")?.click()}>Browse Files</Button>
                  {documentFile && (<div className="w-full mt-4 p-3 border rounded-md bg-muted/30 flex items-center justify-between"><span className="text-sm font-medium">{documentFile.name}</span><Button type="button" variant="ghost" size="icon" onClick={() => setDocumentFile(null)}><Trash size={14} /></Button></div>)}
                </div>
              </div>
              <DialogFooter>
                
                <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>
                  {isLoading ? (editingCertification ? 'Updating...' : 'Adding...') : (editingCertification ? 'Update Certification' : 'Add Certification')}
                </Button>
                <Button variant="outline" type="button" onClick={() => setIsAddCertDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsSection;