import { useState, useMemo, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Upload, Calendar, Tag, Trash, Edit, Grid, List, FileText, X, Download, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const VALID_LOGO_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const VALID_LOGO_EXTENSIONS_STRING = ".png, .jpeg, .jpg";
const VALID_DOC_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const VALID_DOC_EXTENSIONS_STRING = ".pdf, .doc, .docx, .jpg, .jpeg, .png";

const brandSchema = z.object({
  brandName: z.string().min(1, { message: "Brand name is required" }),
  relationshipType: z.string().min(1, { message: "Relationship type is required" }),
  productCategories: z.array(z.string()).min(1, { message: "At least one product category is required" }),
  partnershipStartDate: z.string().min(1, { message: "Partnership start date is required" }),
  partnershipEndDate: z.string().optional(),
})// THIS IS THE VALIDATION BLOCK
.refine(data => {
  // This check only runs if both dates are provided.
  if (data.partnershipStartDate && data.partnershipEndDate) {
    // This returns 'true' (passes validation) only if end date is the same day or later than start date.
    return new Date(data.partnershipEndDate) >= new Date(data.partnershipStartDate);
  }
  // If there's no end date, the validation passes automatically.
  return true;
}, {
  // This is the error message the user will see if the check fails.
  message: "End date cannot be before the start date.", 
  // This tells Zod to display the error message under the `partnershipEndDate` field.
  path: ["partnershipEndDate"], 
});

type BrandFormValues = z.infer<typeof brandSchema>;

const relationshipOptions = [ { value: "authorized_dealer", label: "Authorized Dealer" }, { value: "distributor", label: "Distributor" }, { value: "reseller", label: "Reseller" }, { value: "service_partner", label: "Service Partner" }, { value: "manufacturer_rep", label: "Manufacturer's Representative" }, { value: "oem_partner", label: "OEM Partner" }, { value: "var", label: "Value-Added Reseller (VAR)" }, ];
const categoryOptions = [ { label: "Electrical Components", value: "electrical" }, { label: "Mechanical Parts", value: "mechanical" }, { label: "Pneumatic Systems", value: "pneumatic" }, { label: "Hydraulic Components", value: "hydraulic" }, { label: "Safety Equipment", value: "safety" }, { label: "Instrumentation", value: "instrumentation" }, { label: "Process Control", value: "process_control" }, { label: "Pumps & Valves", value: "pumps_valves" }, { label: "Motors & Drives", value: "motors_drives" }, { label: "Maintenance Tools", value: "maintenance_tools" }, { label: "Laboratory Equipment", value: "laboratory" }, { label: "Raw Materials", value: "raw_materials" }, ].sort();

type DocumentFile = { name: string; file?: File };

interface Brand {
  id: string;
  logo: string;
  name: string;
  relationshipType: string;
  categories: string[];
  partnershipStartDate: string;
  partnershipEndDate?: string;
  documents: DocumentFile[];
}

const mockBrands: Brand[] = [
  { id: "1", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop", name: "MechaPro Systems", relationshipType: "Distributor", categories: ["Mechanical Parts", "Motors & Drives"], partnershipStartDate: "2020-02-10", partnershipEndDate: "2025-12-31", documents: [{ name: "MechaPro_Agreement.pdf" }], },
  { id: "2", logo: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=300&h=300&fit=crop", name: "SafeGuard Equipment", relationshipType: "Manufacturer's Representative", categories: ["Safety Equipment"], partnershipStartDate: "2022-08-22", documents: [{ name: "SafeGuard_Intro.pdf" }], },
  { id: "3", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=300&fit=crop", name: "TechFlex Industries", relationshipType: "Authorized Dealer", categories: ["Electrical Components", "Process Control"], partnershipStartDate: "2021-05-15", partnershipEndDate: "2023-05-14", documents: [], },
];

const DragAndDropZone = ({ onFilesSelected, accept, mainText, subText, IconComponent }: { onFilesSelected: (files: File[]) => void; accept: string; mainText: string; subText: string; IconComponent: React.ElementType }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); if (e.type === "dragenter" || e.type === "dragover") { setIsDragging(true); } else if (e.type === "dragleave") { setIsDragging(false); } };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { onFilesSelected(Array.from(e.dataTransfer.files)); e.dataTransfer.clearData(); } };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) { onFilesSelected(Array.from(e.target.files)); } };
  return ( <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-colors ${isDragging ? "border-yellow-600 bg-yellow-50" : "border-gray-300"}`}> <IconComponent className="h-8 w-8 text-muted-foreground mb-2" /> <p className="text-sm text-muted-foreground text-center mb-2">{mainText}</p> <p className="text-xs text-muted-foreground text-center mb-2">{subText}</p> <Input ref={inputRef} type="file" className="hidden" accept={accept} multiple onChange={handleChange} /> <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>Browse Files</Button> </div> );
};

const BrandsPartnersSection = () => {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('name_asc');
  const [showBrandsInfo, setShowBrandsInfo] = useState(false);
  
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: { brandName: "", relationshipType: "", productCategories: [], partnershipStartDate: "", partnershipEndDate: "" },
  });

  useEffect(() => {
    if (isFormOpen) {
      if (editingBrand) {
        const relationshipValue = relationshipOptions.find(opt => opt.label === editingBrand.relationshipType)?.value;
        const categoryValues = editingBrand.categories.map(catLabel => categoryOptions.find(opt => opt.label === catLabel)?.value).filter(Boolean) as string[];
        form.reset({
          brandName: editingBrand.name,
          relationshipType: relationshipValue || "",
          productCategories: categoryValues,
          partnershipStartDate: editingBrand.partnershipStartDate,
          partnershipEndDate: editingBrand.partnershipEndDate || "",
        });
        setLogoPreview(editingBrand.logo);
        setDocumentFiles(editingBrand.documents);
      } else {
        form.reset({ brandName: "", relationshipType: "", productCategories: [], partnershipStartDate: "", partnershipEndDate: "" });
        setLogoPreview(null);
        setDocumentFiles([]);
      }
    }
  }, [editingBrand, isFormOpen, form]);
  
  const handleOpenFormDialog = (brand: Brand | null) => { setEditingBrand(brand); setIsFormOpen(true); };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!VALID_LOGO_TYPES.includes(file.type)) { toast.error("Invalid file type. Please upload a PNG, JPG, or JPEG file."); return; }
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(URL.createObjectURL(file));
      toast.success("Logo preview updated.");
    }
  };

  const handleDocumentFilesChange = (incomingFiles: File[]) => {
    const validFiles: File[] = [], invalidFiles: File[] = [];
    incomingFiles.forEach(file => { const extension = `.${file.name.split('.').pop()?.toLowerCase()}`; if (VALID_DOC_EXTENSIONS.includes(extension)) { validFiles.push(file); } else { invalidFiles.push(file); } });
    if (invalidFiles.length > 0) { toast.error(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`); }
    if (validFiles.length > 0) { const newDocs: DocumentFile[] = validFiles.map(file => ({ name: file.name, file })); setDocumentFiles(prev => [...prev, ...newDocs]); toast.success(`${validFiles.length} document(s) added.`); }
  };
  
  const handleDownloadDocument = (doc: DocumentFile) => {
    if (!doc.file) { toast.info(`'${doc.name}' is a placeholder.`, { description: "This document doesn't have an uploaded file. Please edit the brand to upload it.", icon: <Info className="h-4 w-4" /> }); return; }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(doc.file);
    link.setAttribute('download', doc.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const onSubmit = (values: BrandFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      const brandData = {
        name: values.brandName,
        relationshipType: relationshipOptions.find(r => r.value === values.relationshipType)?.label || values.relationshipType,
        categories: values.productCategories.map(c => categoryOptions.find(cat => cat.value === c)?.label || c),
        partnershipStartDate: values.partnershipStartDate,
        partnershipEndDate: values.partnershipEndDate || undefined,
        documents: documentFiles,
        logo: logoPreview || "https://via.placeholder.com/300x200.png?text=No+Logo",
      };

      if (editingBrand) {
        const updatedBrands = brands.map(b => b.id === editingBrand.id ? { ...b, ...brandData } : b);
        setBrands(updatedBrands);
        toast.success("Brand updated successfully!");
      } else {
        const newBrand = { ...brandData, id: Date.now().toString() };
        setBrands(prev => [newBrand, ...prev]);
        toast.success("Brand added successfully!");
      }
      setIsLoading(false);
      setIsFormOpen(false);
    }, 1000);
  };

  const handleDeleteBrand = (id: string) => { setBrands(brands.filter(brand => brand.id !== id)); toast.success("Brand deleted successfully!"); };

  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => {
      switch (sortBy) {
        case 'name_asc': return a.name.localeCompare(b.name);
        case 'name_desc': return b.name.localeCompare(a.name);
        case 'date_desc': return new Date(b.partnershipStartDate).getTime() - new Date(a.partnershipStartDate).getTime();
        case 'date_asc': return new Date(a.partnershipStartDate).getTime() - new Date(b.partnershipStartDate).getTime();
        default: return 0;
      }
    });
  }, [brands, sortBy]);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
  <div className="flex items-center">
    <CardTitle className="mr-2 text-xl font-bold text-gray-800">Brands & Partners</CardTitle>
    <button
      type="button"
      onClick={() => setShowBrandsInfo(prev => !prev)}
      className="text-muted-foreground hover:text-blue-600 transition"
      aria-label="Toggle brands information"
    >
      <Info className="h-5 w-5" />
    </button>
  </div>

  {/* Fixed space for description (prevents layout shift) */}
  <div className="min-h-[20px]">
    {showBrandsInfo && (
      <CardDescription className="text-sm text-muted-foreground">
        Manage your represented brands, partnerships and distributorships.
      </CardDescription>
    )}
  </div>
</div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}><DialogTrigger asChild>
          <Button className="gap-2 bg-yellow-600 hover:bg-yellow-700" onClick={() => handleOpenFormDialog(null)}>
            <Plus size={16} /><span>Add Brand</span></Button>
            </DialogTrigger><DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
              <DialogHeader className="p-6 pb-4 border-b"><DialogTitle>{editingBrand ? "Edit Brand" : "Add New Brand"}</DialogTitle><DialogDescription>{editingBrand ? "Update details for this brand partnership." : "Add details about a new brand partnership."}</DialogDescription>
              </DialogHeader><Form {...form}><form id="brand-form" onSubmit={form.handleSubmit(onSubmit)} className="flex-grow overflow-y-auto"><div className="p-6 space-y-6"><div className="flex flex-col items-center space-y-3"><div className="h-32 w-32 relative border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden bg-muted/30">{logoPreview ? (<img src={logoPreview} alt="Brand logo preview" className="w-full h-full object-cover" />) : (<div className="text-center text-muted-foreground">
                <Upload className="h-8 w-8 mx-auto mb-1" /><span className="text-xs">Brand Logo</span></div>)}</div><Input id="brandLogo" type="file" className="hidden" accept={VALID_LOGO_EXTENSIONS_STRING} onChange={handleLogoUpload} />
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("brandLogo")?.click()}>{logoPreview ? "Change Logo" : "Upload Logo"}</Button></div>
                      <FormField control={form.control} name="brandName" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Brand Name</FormLabel><FormControl><Input placeholder="Enter brand name" {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name="relationshipType" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Relationship Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select relationship type" /></SelectTrigger></FormControl><SelectContent>{relationshipOptions.map((option) => ( <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name="productCategories" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Product Categories</FormLabel><FormControl><MultiSelect options={categoryOptions} selected={field.value} onChange={field.onChange} placeholder="Select product categories..." /></FormControl><FormMessage /></FormItem> )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField
  control={form.control}
  name="partnershipStartDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-foreground">Partnership Start Date</FormLabel>
      <FormControl>
        <Input type="date" {...field} className="text-black uppercase"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="partnershipEndDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-foreground">Partnership End Date</FormLabel>
      <FormControl>
        <Input type="date" {...field} className="text-black uppercase"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                      </div>
                      <div className="space-y-3"><FormLabel>Partnership Documents</FormLabel><DragAndDropZone onFilesSelected={handleDocumentFilesChange} accept={VALID_DOC_EXTENSIONS_STRING} mainText="Drag and drop files here or click to browse" subText="Accepts PDF, DOCX, DOC, JPG, PNG" IconComponent={Upload} />
                        {documentFiles.length > 0 && (<div className="w-full space-y-2 mt-4"><p className="text-sm font-medium text-muted-foreground">Uploaded Documents:</p>{documentFiles.map((doc, index) => (<div key={index} className="flex items-center justify-between p-2 pl-3 border rounded-md bg-muted/30"><div className="flex items-center gap-2 flex-1 min-w-0"><FileText className="h-4 w-4 text-gray-500 flex-shrink-0" /><span className="text-sm font-medium truncate">{doc.name}</span></div><div className="flex items-center"><TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDownloadDocument(doc)}><Download size={14} className="text-blue-600" /></Button></TooltipTrigger><TooltipContent>Download file</TooltipContent></Tooltip></TooltipProvider><Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDocumentFiles(documentFiles.filter((_, i) => i !== index))}><X size={14} /></Button></div></div>))}</div>)}
                      </div></div></form></Form><DialogFooter className="p-4 border-t bg-muted/50"><Button type="submit" form="brand-form" className="bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>{isLoading ? (editingBrand ? "Updating..." : "Adding...") : (editingBrand ? "Save" : "Add")}</Button><Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button></DialogFooter></DialogContent></Dialog></div></CardHeader>
        <CardContent>
          {brands.length === 0 ? ( <div className="flex flex-col items-center justify-center py-12 text-center"><Tag className="h-12 w-12 text-muted-foreground mb-4" /><h3 className="text-lg font-medium">No brands added yet</h3><p className="text-sm text-muted-foreground mt-1">Add your first brand to get started.</p></div> ) : (
            <><div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div className="flex items-center gap-2"><Select value={sortBy} onValueChange={setSortBy}><SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by..." /></SelectTrigger><SelectContent><SelectItem value="name_asc">Name (A-Z)</SelectItem><SelectItem value="name_desc">Name (Z-A)</SelectItem><SelectItem value="date_desc">Date (Newest)</SelectItem><SelectItem value="date_asc">Date (Oldest)</SelectItem></SelectContent></Select></div><div className="flex items-center justify-end gap-1"><TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}><Grid size={18}/></Button></TooltipTrigger><TooltipContent>Grid View</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}><List size={18}/></Button></TooltipTrigger><TooltipContent>List View</TooltipContent></Tooltip></TooltipProvider></div></div>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {sortedBrands.map((brand) => ( <BrandItem key={brand.id} brand={brand} viewMode={viewMode} onEdit={() => handleOpenFormDialog(brand)} onDelete={() => handleDeleteBrand(brand.id)} onDownloadDocument={handleDownloadDocument} /> ))}
            </div></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// --- BrandItem Component ---
// THIS IS THE REPLACED AND FINAL VERSION OF THE COMPONENT
const BrandItem = ({ brand, viewMode, onEdit, onDelete, onDownloadDocument }: { brand: Brand; viewMode: 'grid' | 'list'; onEdit: () => void; onDelete: () => void; onDownloadDocument: (doc: DocumentFile) => void; }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const isPartnershipEnded = brand.partnershipEndDate && new Date(brand.partnershipEndDate) < new Date();
  const status = isPartnershipEnded ? { text: "Ended", color: "bg-red-100 text-red-800 border-red-200" } : { text: "Active", color: "bg-green-100 text-green-800 border-green-200" };

  const content = (
    <>
      <div className={viewMode === 'grid' ? "aspect-[3/2] bg-muted/20 relative flex items-center justify-center p-4" : "w-24 h-24 flex-shrink-0 bg-muted/20 flex items-center justify-center p-2 rounded-md border"}>
        <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain"/>
        {viewMode === 'grid' && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button variant="secondary" size="icon" className="h-8 w-8 opacity-90" onClick={onEdit}><Edit size={14} /></Button>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}><AlertDialogTrigger asChild><Button variant="destructive" size="icon" className="h-8 w-8 opacity-90"><Trash size={14} /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete '{brand.name}'.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
          </div>
        )}
      </div>
      <div className={viewMode === 'grid' ? 'p-4' : 'p-4 flex-grow'}>
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
            {viewMode === 'list' && ( <div className="flex gap-1 flex-shrink-0 ml-4"><Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}><Edit size={14} className="text-blue-600" /></Button><AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Trash size={14} className="text-red-600" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete '{brand.name}'.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div> )}
        </div>
        <div className={viewMode === 'grid' ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge className={`${status.color} w-fit`}>{status.text}</Badge>
          </div>
          <div><p className="text-xs text-muted-foreground">Relationship</p><Badge className="mt-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{brand.relationshipType}</Badge></div>
          <div className={viewMode === 'list' ? 'lg:col-span-2' : ''}><p className="text-xs text-muted-foreground">Categories</p><div className="flex flex-wrap gap-1 mt-1">{brand.categories.map((c, i) => <Badge key={i} variant="outline" className="bg-gray-100 text-gray-800">{c}</Badge>)}</div></div>
          <div>
            <p className="text-xs text-muted-foreground">Partnership Period</p>
            <p className="text-sm font-medium mt-1">
              {new Date(brand.partnershipStartDate).toLocaleDateString()} - {brand.partnershipEndDate ? new Date(brand.partnershipEndDate).toLocaleDateString() : 'Present'}
            </p>
          </div>
          {brand.documents.length > 0 && viewMode === 'grid' && ( <div><p className="text-xs text-muted-foreground">Documents</p><div className="mt-1 space-y-1">{brand.documents.map((doc, i) => (<div key={i} onClick={() => onDownloadDocument(doc)} className="flex items-center gap-1.5 text-sm text-blue-600 underline cursor-pointer hover:text-blue-800"><Download size={14} className="flex-shrink-0" /><span>{doc.name}</span></div>))}</div></div> )}
        </div>
      </div>
    </>
  );

  if (viewMode === 'list') { return <Card className="overflow-hidden border flex flex-col md:flex-row">{content}</Card>; }
  return <Card className="overflow-hidden border">{content}</Card>;
};

export default BrandsPartnersSection;