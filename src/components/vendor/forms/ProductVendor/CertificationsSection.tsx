import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Upload, Calendar, Building, Check, AlertTriangle, Pencil, Trash, Download, MoreVertical, ArrowUpDown, Edit, FileText, Info, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

type Certification = {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  type: string;
  status: "Verified" | "Pending Verification";
  document: string;
  documentUrl: string;
  linkedProducts: string[];
};

type SortField = "name" | "organization" | "issueDate" | "expiryDate";
type SortDirection = "asc" | "desc";

const mockCertifications: Certification[] = [
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
    linkedProducts: ["Pressure Sensor Array", "Electronic Motor Controller", "Safety Harness Kit"],
  },
  {
    id: "4",
    name: "UL Certification",
    organization: "Underwriters Laboratories",
    issueDate: "2023-01-10",
    expiryDate: "2026-01-09",
    type: "Product",
    status: "Verified",
    document: "UL_Certificate.pdf",
    documentUrl: "https://example.com/UL_Certificate.pdf",
    linkedProducts: ["Electronic Motor Controller", "Safety Harness Kit", "Industrial Bearing Kit"],
  },
  {
    id: "5",
    name: "FDA Approval",
    organization: "Food and Drug Administration",
    issueDate: "2022-11-05",
    expiryDate: "No Expiry",
    type: "Product",
    status: "Verified",
    document: "FDA_Approval.pdf",
    documentUrl: "https://example.com/FDA_Approval.pdf",
    linkedProducts: ["Medical Device Component"],
  },
  {
    id: "6",
    name: "ISO 14001:2015 - Environmental Management",
    organization: "SGS",
    issueDate: "2021-09-18",
    expiryDate: "2024-09-17",
    type: "Company",
    status: "Verified",
    document: "ISO14001_Certificate.pdf",
    documentUrl: "https://example.com/ISO14001_Certificate.pdf",
    linkedProducts: [],
  },
  {
    id: "7",
    name: "REACH Compliance",
    organization: "TÜV Rheinland",
    issueDate: "2023-02-28",
    expiryDate: "2026-02-27",
    type: "Product",
    status: "Pending Verification",
    document: "REACH_Compliance.pdf",
    documentUrl: "https://example.com/REACH_Compliance.pdf",
    linkedProducts: ["Industrial Bearing Kit", "Stainless Steel Pipe Fittings"],
  },
];

const productOptions = [
  { label: "Industrial Bearing Kit", value: "bearing_kit" },
  { label: "Electronic Motor Controller", value: "motor_controller" },
  { label: "Pressure Sensor Array", value: "pressure_sensor" },
  { label: "Stainless Steel Pipe Fittings", value: "pipe_fittings" },
  { label: "Safety Harness Kit", value: "safety_harness" },
  { label: "Medical Device Component", value: "medical_device" },
];

const formatDate = (dateString: string) => {
  if (!dateString || dateString === "No Expiry") return dateString;
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ITEMS_PER_PAGE = 6;

const CertificationsSection = () => {
  const [isAddCertDialogOpen, setIsAddCertDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [documentFile, setDocumentFile] = useState<{ name: string; url: string } | null>(null);
  const [sortField, setSortField] = useState<SortField>("issueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New state for "Read More" functionality
  const [showAllProductsDialog, setShowAllProductsDialog] = useState(false);
  const [currentLinkedProducts, setCurrentLinkedProducts] = useState<string[]>([]);


  // Calculate pagination values
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = certifications.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleDownload = (cert: Certification) => {
    toast.info(`Downloading ${cert.document}...`);
    // In a real implementation, you would download the file:
    // window.open(cert.documentUrl, '_blank');
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const sortedCertifications = [...certifications].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "organization":
        comparison = a.organization.localeCompare(b.organization);
        break;
      case "issueDate":
        comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
        break;
      case "expiryDate":
        if (a.expiryDate === "No Expiry" && b.expiryDate === "No Expiry") comparison = 0;
        else if (a.expiryDate === "No Expiry") comparison = 1;
        else if (b.expiryDate === "No Expiry") comparison = -1;
        else comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
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
      expiryDate: certification.expiryDate === "No Expiry" ? "" : certification.expiryDate,
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
  
  // Convert linked product values to labels
  const linkedProductLabels = values.linkedProducts
    ? values.linkedProducts.map(p => 
        productOptions.find(po => po.value === p)?.label || p
      )
    : [];

  if (editingCertification) {
    // Create updated certification object
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

    // Update the certifications state
    setCertifications(certifications.map(c => 
      c.id === editingCertification.id ? updatedCert : c
    ));
    
    toast.success("Certification updated successfully!");
  } else {
    // Add new certification
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
};

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB size limit
        toast.error("File size should not exceed 5MB.");
        return;
      }
      setDocumentFile({ name: file.name, url: URL.createObjectURL(file) });
      form.setValue("documentFile", file);
      toast.success("Document selected successfully!");
    }
  };

  const handleDeleteCertification = (id: string) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      setCertifications(certifications.filter(cert => cert.id !== id));
      // Reset to first page if we deleted the last item on the current page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      toast.success("Certification deleted successfully!");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handler to open the "Read All Products" dialog
  const handleReadAllProducts = (products: string[]) => {
    setCurrentLinkedProducts(products);
    setShowAllProductsDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between p-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <CardTitle className="text-2xl text-gray-800 mr-2">Certifications</CardTitle>
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className="text-muted-foreground hover:text-blue-600 transition"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-[24px]">
              {showInfo && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Manage your company and product certifications.
                </CardDescription>
              )}
            </div>
          </div>
          <Button
            onClick={handleAddClick}
            className="mt-[8px] md:mt-[10px] gap-2 bg-yellow-600 hover:bg-yellow-700"
          >
            <Plus size={16} />
            <span>Upload Certification</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
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
                onClick={() => handleSort("organization")}
              >
                <span>Organization</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "organization" && (
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

            {sortedCertifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No certifications found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload your first certification
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedCertifications.slice(indexOfFirstItem, indexOfLastItem).map((cert) => (
                    <Card key={cert.id} className="overflow-hidden flex flex-col">
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 truncate">
                              <h3 className="font-semibold text-lg truncate">{cert.name}</h3>
                              <Badge
                                variant="secondary"
                                className={
                                  cert.status === "Verified"
                                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                                }
                              >
                                {cert.status === "Verified"
                                  ? <div className="flex items-center gap-1.5"><Check className="mr-1 h-3 w-3" /><span>Verified</span></div>
                                  : <div className="flex items-center gap-1.5"><AlertTriangle className="mr-1 h-3 w-3" /><span>Pending</span></div>
                                }
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDownload(cert)}>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditClick(cert)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCertification(cert.id)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* --- START OF MOVED SECTION --- */}
                       <div className="flex-grow space-y-2 mb-2">
  <p className="text-sm text-gray-600">
    Issued by: <span className="font-medium">{cert.organization}</span>
  </p>
  
  {cert.linkedProducts.length > 0 && (
    <div>
      <p className="text-xs text-muted-foreground">Linked Products</p>
      <div className="flex flex-row flex-wrap items-center gap-2 mt-1">
        {/* Display first 2 products directly */}
        {cert.linkedProducts.slice(0, 2).map((product, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-yellow-100 text-yellow-600 border-yellow-200 font-normal whitespace-nowrap"
          >
            {product}
          </Badge>
        ))}
        {/* "Read More" button if there are more than 2 products */}
        {cert.linkedProducts.length > 2 && (
          <Button
            variant="outline"
            size="sm"
            className="text-yellow-700 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 h-6 px-2 py-0 flex-shrink-0"
            onClick={() => handleReadAllProducts(cert.linkedProducts)}
          >
            +{cert.linkedProducts.length - 2} More
          </Button>
        )}
      </div>
    </div>
  )}
</div>

{cert.document && (
  <div className="flex items-center gap-2 pb-2 mt-4">
    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
    <span className="text-sm text-blue-600 truncate">{cert.document}</span>
  </div>
)}

<div className="mt-auto pt-3 border-t flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
  <span>
    Issued: <span className="font-medium">
      {formatDate(cert.issueDate)}
    </span>
  </span>
  <span>
    Expiry: <span className="font-medium">
      {cert.expiryDate === "No Expiry" ? "No Expiry" : formatDate(cert.expiryDate)}
    </span>
  </span>
</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination controls */}
{totalPages > 1 && (
  <div className="flex flex-col items-center gap-3 mt-6">
    {/* Top: Previous / Next buttons with text */}
    
    {/* Bottom: Numbered buttons */}
    <div className="flex justify-center items-center gap-1">
      {/* Left Arrow (icon only) */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

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
                  ? "bg-blue-500 text-white hover:bg-blue-600"
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

      {/* Right Arrow (icon only) */}
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
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddCertDialogOpen} onOpenChange={setIsAddCertDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                {editingCertification ? 'Edit Certification' : 'Upload Certification'}
              </DialogTitle>
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className="text-muted-foreground hover:text-blue-600 transition"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-[20px] mt-1">
              {showInfo && (
                <DialogDescription>
                  {editingCertification
                    ? "Update the details of your company certification"
                    : "Add a new certification to showcase your company's credentials"}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="certificateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification Name</FormLabel>
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
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                      <div className="relative">

                        <Input placeholder="e.g Quality Council of India" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <div className="relative">

                          <Input type="date" placeholder="dd-mm-yyy" {...field} />
                        </div>
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
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <FormControl>

                        <Input type="date" {...field} />

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="linkedProducts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link to Products (for product certifications)</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={productOptions}
                        selected={field.value || []}
                        onChange={field.onChange}
                        placeholder="Select products to link"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Certification Document</FormLabel>
                <div
                  className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-yellow-600 transition-colors"
                  onClick={() => document.getElementById("certificationDocument")?.click()}
                >
                  <Input
                    id="certificationDocument"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                  />
                  {!documentFile ? (
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-yellow-600" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop document or <span className="font-bold text-yellow-600">click to browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports PDF, JPG, PNG up to 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="w-full p-0 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{documentFile.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDocumentFile(null);
                          form.setValue("documentFile", undefined);
                        }}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-4">

                <Button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddCertDialogOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog for "Read All Products" */}
{/* Dialog for "Read All Products" */}
{/* Dialog for "Read All Products" */}
<Dialog open={showAllProductsDialog} onOpenChange={setShowAllProductsDialog}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>All Linked Products</DialogTitle>
      <DialogDescription>
        A complete list of products linked to this certification.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {currentLinkedProducts.map((product, index) => (
        <Badge
          key={index}
          variant="outline"
          className="w-auto justify-start bg-yellow-100 text-yellow-600 border-yellow-200 font-normal px-3 py-1 text-sm"
        >
          {product}
        </Badge>
      ))}
    </div>
    <DialogFooter>
      <Button onClick={() => setShowAllProductsDialog(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  );
};

export default CertificationsSection;