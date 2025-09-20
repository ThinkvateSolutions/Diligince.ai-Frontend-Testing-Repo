import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Plus, Search, Grid, List, Image, Upload, Box,
  Trash, Edit, ArrowUp, ArrowDown, ChevronsUpDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// MODIFICATION: Import Tooltip components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Schema includes an optional thumbnail for the uploaded image
const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }).max(200, { message: "Description must be 200 characters or less" }),
  specifications: z.string().min(1, { message: "Specifications are required" }),
  price: z.string().min(1, { message: "Price is required" }),
  minOrderQuantity: z.string().min(1, { message: "Minimum order quantity is required" }),
  leadTime: z.string().min(1, { message: "Lead time is required" }),
  stock: z.string().min(1, { message: "Stock availability is required" }),
  thumbnail: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const mockProducts = [
  { id: "1", name: "Industrial Bearing Kit", sku: "BRG-1001", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop", category: "Mechanical Parts", price: 2500, stock: 25, description: "A comprehensive kit of high-quality industrial bearings, designed for durability and performance in heavy machinery. Made from hardened steel for maximum longevity.", specifications: "Material: Chrome Steel\nType: Deep Groove Ball Bearing\nSeals: Double Sided Rubber", minOrderQuantity: 1, leadTime: 5 },
  { id: "2", name: "Electronic Motor Controller", sku: "EMC-2035", thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=120&fit=crop", category: "Electrical Components", price: 15750, stock: 8, description: "Advanced motor controller for precise speed and torque management. Suitable for a wide range of industrial applications.", specifications: "Voltage: 220-240V AC\nFrequency: 50/60Hz\nOutput Power: up to 5kW", minOrderQuantity: 1, leadTime: 10 },
  { id: "3", name: "Pressure Sensor Array", sku: "PSA-3022", thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=120&h=120&fit=crop", category: "Instrumentation", price: 8200, stock: 3, description: "A highly sensitive pressure sensor array for monitoring and data acquisition in fluid and gas systems.", specifications: "Pressure Range: 0-100psi\nAccuracy: ±0.5% FS\nOperating Temp: -20°C to 85°C", minOrderQuantity: 1, leadTime: 7 },
  { id: "4", name: "Stainless Steel Pipe Fittings", sku: "SSP-4017", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=120&fit=crop", category: "Pumps & Valves", price: 950, stock: 0, description: "Corrosion-resistant stainless steel pipe fittings for reliable connections in plumbing and process lines.", specifications: "Material: SS316 Stainless Steel\nSize: 1/2 inch NPT\nPressure Rating: 1000 WOG", minOrderQuantity: 10, leadTime: 3 },
  { id: "5", name: "Safety Harness Kit", sku: "SHK-5099", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=120&fit=crop", category: "Safety Equipment", price: 4250, stock: 12, description: "A complete, OSHA-compliant safety harness kit for working at height. Includes full-body harness, lanyard, and anchor point.", specifications: "Load Capacity: 150kg (330 lbs)\nMaterial: Polyester Webbing\nStandards: ANSI Z359.11", minOrderQuantity: 1, leadTime: 2 },
];
type Product = typeof mockProducts[0];

const categoryOptions = [ { value: "electrical", label: "Electrical Components" }, { value: "hydraulic", label: "Hydraulic Components" }, { value: "instrumentation", label: "Instrumentation" }, { value: "laboratory", label: "Laboratory Equipment" }, { value: "maintenance_tools", label: "Maintenance Tools" }, { value: "mechanical", label: "Mechanical Parts" }, { value: "motors_drives", label: "Motors & Drives" }, { value: "pneumatic", label: "Pneumatic Systems" }, { value: "process_control", label: "Process Control" }, { value: "pumps_valves", label: "Pumps & Valves" }, { value: "raw_materials", label: "Raw Materials" }, { value: "safety", label: "Safety Equipment" }, ].sort((a, b) => a.label.localeCompare(b.label));
type SortableKeys = 'name' | 'sku' | 'category' | 'price' | 'stock';
type SortDirection = 'asc' | 'desc';
const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
const formatStock = (stock: number) => { if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-800" }; if (stock <= 5) return { text: `Low Stock (${stock})`, color: "bg-orange-100 text-orange-800" }; return { text: `In Stock (${stock})`, color: "bg-green-100 text-green-800" }; };

const ProductCatalogSection = () => {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: SortDirection }>({ key: 'name', direction: 'asc' });
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const form = useForm<ProductFormValues>({ resolver: zodResolver(productSchema) });

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    filtered.sort((a, b) => { const { key, direction } = sortConfig; const dir = direction === 'asc' ? 1 : -1; if (key === 'price' || key === 'stock') { return (a[key] - b[key]) * dir; } return a[key].localeCompare(b[key]) * dir; });
    return filtered;
  }, [products, searchQuery, sortConfig]);

  const handleSort = (key: SortableKeys) => { let direction: SortDirection = 'asc'; if (sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  const handleViewClick = (product: Product) => {
    setViewingProduct(product);
    setIsDetailDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    form.reset({ name: "", category: "", description: "", specifications: "", price: "", minOrderQuantity: "", leadTime: "", stock: "", thumbnail: "" });
    setImagePreviews([]);
    setDocumentFiles([]);
    setIsProductDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setEditingProduct(product);
    form.reset({ id: product.id, name: product.name, category: categoryOptions.find(c => c.label === product.category)?.value || "", description: product.description, specifications: product.specifications, price: String(product.price), minOrderQuantity: String(product.minOrderQuantity), leadTime: String(product.leadTime), stock: String(product.stock), thumbnail: product.thumbnail });
    setImagePreviews(product.thumbnail ? [product.thumbnail] : []);
    setDocumentFiles([]);
    setIsProductDialogOpen(true);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const currentPreviews: string[] = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          if (currentPreviews.length === 0) {
            form.setValue('thumbnail', base64String, { shouldValidate: true });
          }
          currentPreviews.push(base64String);
          if (currentPreviews.length === files.length) setImagePreviews(currentPreviews);
        };
        reader.readAsDataURL(file);
      });
      toast.success(`${files.length} image(s) selected.`);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setDocumentFiles(Array.from(e.target.files)); toast.success(`${e.target.files.length} document(s) selected.`); } };

  const onSubmit = (values: ProductFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      const categoryLabel = categoryOptions.find(c => c.value === values.category)?.label || values.category;
      if (editingProduct) {
        const updatedProduct = { ...editingProduct, name: values.name, category: categoryLabel, description: values.description, specifications: values.specifications, price: Number(values.price), minOrderQuantity: Number(values.minOrderQuantity), leadTime: Number(values.leadTime), stock: Number(values.stock), thumbnail: values.thumbnail || editingProduct.thumbnail };
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
        toast.success("Product updated successfully!");
      } else {
        const newProduct: Product = { id: `${Date.now()}`, name: values.name, sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`, thumbnail: values.thumbnail || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop", category: categoryLabel, price: Number(values.price), stock: Number(values.stock), description: values.description, specifications: values.specifications, minOrderQuantity: Number(values.minOrderQuantity), leadTime: Number(values.leadTime) };
        setProducts([newProduct, ...products]);
        toast.success("Product added successfully!");
      }
      setIsLoading(false);
      setIsProductDialogOpen(false);
    }, 1000);
  };
  
  const handleDeleteProduct = (id: string) => { if (window.confirm("Are you sure you want to delete this product?")) { setProducts(products.filter(product => product.id !== id)); toast.success("Product deleted successfully!"); } };
  const handleImportProducts = () => { setIsImporting(true); setTimeout(() => { setIsImporting(false); toast.success("Products imported successfully!"); }, 2000); };
  const SortableHeader = ({ columnKey, children }: { columnKey: SortableKeys, children: React.ReactNode }) => { const isSorted = sortConfig.key === columnKey; const Icon = isSorted ? (sortConfig.direction === 'asc' ? ArrowUp : ArrowDown) : ChevronsUpDown; return (<th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground"><Button variant="ghost" onClick={() => handleSort(columnKey)} className="px-1 py-1 h-auto font-medium text-xs uppercase text-muted-foreground hover:text-foreground">{children}<Icon className={`ml-2 h-4 w-4 ${isSorted ? 'text-foreground' : 'opacity-40'}`} /></Button></th>); };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div><CardTitle className="text-xl font-bold text-gray-800">Product Catalog</CardTitle><CardDescription>Manage your products, add new items or import in bulk.</CardDescription></div>
            <div className="flex items-center gap-2">
              <Button onClick={handleAddClick} className="gap-2 bg-yellow-600 hover:bg-yellow-700"><Plus size={16} /><span>Add Product</span></Button>
              <Button variant="outline" className="gap-2" onClick={handleImportProducts} disabled={isImporting}><Upload size={16} /><span>{isImporting ? "Importing..." : "Import Products"}</span></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative max-w-md w-full"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Search products..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
              
              {/* MODIFICATION: Replaced ToggleGroup with styled Buttons */}
              <div className="flex items-center justify-end gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                        <Grid size={18}/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Grid View</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                        <List size={18}/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>List View</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            {sortedAndFilteredProducts.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 text-center"><Box className="h-12 w-12 text-muted-foreground mb-4" /><h3 className="text-lg font-medium">No products found</h3><p className="text-sm text-muted-foreground mt-1">{searchQuery ? "Try a different search term" : "Add your first product to get started"}</p></div>) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedAndFilteredProducts.map((product) => {
                  const stockInfo = formatStock(product.stock);
                  return (
                    <Card key={product.id} className="overflow-hidden cursor-pointer transition-all hover:shadow-lg" onClick={() => handleViewClick(product)}>
                      <div className="aspect-square relative">
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button onClick={(e) => handleEditClick(e, product)} variant="secondary" size="icon" className="h-8 w-8 opacity-90"><Edit size={14} /></Button>
                          <Button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }} variant="destructive" size="icon" className="h-8 w-8 opacity-90"><Trash size={14} /></Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <Badge className="mb-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{product.category}</Badge>
                        <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
                        <div className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-yellow-700">{formatPrice(product.price)}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${stockInfo.color}`}>{stockInfo.text}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden"><table className="w-full"><thead className="bg-muted/50"><tr><SortableHeader columnKey="name">Product</SortableHeader><SortableHeader columnKey="sku">SKU</SortableHeader><SortableHeader columnKey="category">Category</SortableHeader><SortableHeader columnKey="price">Price</SortableHeader><SortableHeader columnKey="stock">Stock</SortableHeader><th className="text-right p-3 font-medium text-xs uppercase text-muted-foreground">Actions</th></tr></thead><tbody className="divide-y">{sortedAndFilteredProducts.map((product) => { const stockInfo = formatStock(product.stock); return (<tr key={product.id}><td className="p-3"><div className="flex items-center gap-3"><img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded-md object-cover" /><span className="font-medium">{product.name}</span></div></td><td className="p-3 text-sm text-muted-foreground">{product.sku}</td><td className="p-3"><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{product.category}</Badge></td><td className="p-3 font-medium text-yellow-700">{formatPrice(product.price)}</td><td className="p-3"><span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${stockInfo.color}`}>{stockInfo.text}</span></td><td className="p-3"><div className="flex justify-end gap-1"><Button onClick={(e) => handleEditClick(e, product)} variant="ghost" size="icon" title="Edit Product"><Edit size={16} className="text-blue-600" /></Button><Button onClick={() => handleDeleteProduct(product.id)} variant="ghost" size="icon" title="Delete Product"><Trash size={16} className="text-red-600" /></Button></div></td></tr>); })}</tbody></table></div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Product Detail Popup */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{viewingProduct.name}</DialogTitle>
                <div className="flex items-center gap-4 pt-2">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{viewingProduct.category}</Badge>
                  <span className="text-sm text-muted-foreground">SKU: {viewingProduct.sku}</span>
                </div>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8 py-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border">
                    <img src={viewingProduct.thumbnail} alt={viewingProduct.name} className="w-full h-auto object-cover aspect-square"/>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-md mb-2">Product Description</h4>
                    <p className="text-sm text-muted-foreground">{viewingProduct.description}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-md mb-2">Technical Specifications</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{viewingProduct.specifications}</p>
                  </div>
                   <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-bold text-lg text-yellow-700">{formatPrice(viewingProduct.price)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <Badge className={`${formatStock(viewingProduct.stock).color}`}>{formatStock(viewingProduct.stock).text}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min. Order Qty</p>
                      <p className="font-bold">{viewingProduct.minOrderQuantity}</p>
                    </div>
                     <div>
                      <p className="text-muted-foreground">Lead Time</p>
                      <p className="font-bold">{viewingProduct.leadTime} days</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={(e) => { setIsDetailDialogOpen(false); handleEditClick(e, viewingProduct); }}><Edit className="mr-2 h-4 w-4"/> Edit Product</Button>
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Form Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle><DialogDescription>{editingProduct ? "Update the details for this product." : "Fill in all product details below."}</DialogDescription></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Product Name</FormLabel><FormControl><Input placeholder="Enter product name" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent>{categoryOptions.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} /></div>
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Product Description</FormLabel><FormControl><Textarea placeholder="Enter detailed product description (max 200 characters)" className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="specifications" render={({ field }) => (<FormItem><FormLabel>Technical Specifications</FormLabel><FormControl><Textarea placeholder="Enter technical specifications, one per line..." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FormField control={form.control} name="price" render={({ field }) => (<FormItem><FormLabel>Price (₹)</FormLabel><FormControl><Input type="number" placeholder="Enter price" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="stock" render={({ field }) => (<FormItem><FormLabel>Stock Availability</FormLabel><FormControl><Input type="number" placeholder="Enter quantity in stock" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FormField control={form.control} name="minOrderQuantity" render={({ field }) => (<FormItem><FormLabel>Minimum Order Quantity</FormLabel><FormControl><Input type="number" placeholder="Enter minimum order quantity" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="leadTime" render={({ field }) => (<FormItem><FormLabel>Lead Time (days)</FormLabel><FormControl><Input type="number" placeholder="Enter lead time in days" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
              <Separator />
              <div className="space-y-3"><FormLabel>Product Images</FormLabel><div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center"><Image className="h-8 w-8 text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground text-center mb-2">The first image will be the thumbnail.</p><Input id="productImages" type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} /><Button type="button" variant="outline" onClick={() => document.getElementById("productImages")?.click()}>Browse Images</Button></div>{imagePreviews.length > 0 && (<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">{imagePreviews.map((img, i) => (<div key={i} className="relative rounded-md overflow-hidden border h-24"><img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" /><Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => setImagePreviews(imagePreviews.filter((_, idx) => i !== idx))}><Trash size={12} /></Button></div>))}</div>)}</div>
              <div className="space-y-3"><FormLabel>Product Documents</FormLabel><div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center"><Upload className="h-8 w-8 text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground text-center mb-2">Upload datasheets, manuals, etc.</p><Input id="productDocs" type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" multiple onChange={handleDocumentUpload} /><Button type="button" variant="outline" onClick={() => document.getElementById("productDocs")?.click()}>Browse Documents</Button></div>{documentFiles.length > 0 && (<div className="space-y-2 mt-4">{documentFiles.map((doc, i) => (<div key={i} className="flex items-center justify-between p-3 border rounded-md bg-gray-50"><span className="text-sm font-medium">{doc.name}</span><Button type="button" variant="ghost" size="icon" onClick={() => setDocumentFiles(documentFiles.filter((_, idx) => i !== idx))}><Trash size={16} /></Button></div>))}</div>)}</div>
             <DialogFooter>
  <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>
    {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
  </Button>
  <Button variant="outline" type="button" onClick={() => setIsProductDialogOpen(false)}>
    Cancel
  </Button>
</DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCatalogSection;