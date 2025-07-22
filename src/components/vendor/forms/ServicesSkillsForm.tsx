import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Edit, Trash, Plus, X, Loader2, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Define a constant for the max length
const MAX_DESCRIPTION_LENGTH = 500;

// Define service schema
const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Service name must be at least 2 characters" }),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(MAX_DESCRIPTION_LENGTH, { message: `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters` }),
  pricingModel: z.string().min(1, { message: "Pricing model is required" }),
  tags: z.array(z.string()).min(1, { message: "Add at least one service tag" }),
});

type Service = z.infer<typeof serviceSchema>;

// --- DEMO DATA & MOCK API SETUP ---
// This section simulates a backend API for demonstration purposes.
// It populates the component with initial data and handles add/update/delete actions.
// In a real application, you would remove this and connect to your actual backend API.

// Here is our initial demo data
const demoServices: Service[] = [
  {
    id: 'service-1',
    name: 'Residential Plumbing Repair',
    description: 'Comprehensive plumbing repair services for homes, including leak detection, pipe repair, and fixture installation. We ensure your plumbing system runs smoothly.',
    pricingModel: 'Time & Materials',
    tags: ['Plumbing', 'Residential', 'Repair', 'Leak Detection'],
  },
  {
    id: 'service-2',
    name: 'Commercial HVAC Installation',
    description: 'Full-scale HVAC system design and installation for commercial properties. We specialize in energy-efficient systems tailored to your business needs.',
    pricingModel: 'Fixed Price + Materials',
    tags: ['HVAC', 'Commercial', 'Installation', 'Energy-Efficient'],
  },
  {
    id: 'service-3',
    name: 'Electrical System Audits',
    description: 'Detailed safety and performance audits of electrical systems for both residential and commercial buildings. Includes a full report with recommendations.',
    pricingModel: 'Fixed Price',
    tags: ['Electrical', 'Audit', 'Safety', 'Commercial', 'Residential'],
  },
];

// A simple function to generate unique IDs for new services
const generateId = () => `service-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// A mutable data store to mimic a database
let servicesDataStore: Service[] = [...demoServices];

// Mock API object that mimics the behavior of a real API service
const servicesApi = {
  getServices: (): Promise<Service[]> => {
    console.log("MOCK API: Fetching services...");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("MOCK API: Responded with", servicesDataStore);
        resolve([...servicesDataStore]); // Return a copy to prevent direct mutation
      }, 1000); // Simulate network delay
    });
  },

  addService: (service: Omit<Service, 'id'>): Promise<Service> => {
    console.log("MOCK API: Adding service...", service);
    return new Promise(resolve => {
      setTimeout(() => {
        const newService = { ...service, id: generateId() };
        servicesDataStore.push(newService);
        console.log("MOCK API: Added service, new store:", servicesDataStore);
        resolve(newService);
      }, 500);
    });
  },

  updateService: (id: string, updatedService: Service): Promise<Service> => {
    console.log("MOCK API: Updating service...", id, updatedService);
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = servicesDataStore.findIndex(s => s.id === id);
        if (index !== -1) {
          servicesDataStore[index] = { ...servicesDataStore[index], ...updatedService };
          console.log("MOCK API: Updated service, new store:", servicesDataStore);
          resolve(servicesDataStore[index]);
        } else {
          reject(new Error("Service not found"));
        }
      }, 500);
    });
  },

  deleteService: (id: string): Promise<void> => {
    console.log("MOCK API: Deleting service...", id);
    return new Promise(resolve => {
      setTimeout(() => {
        servicesDataStore = servicesDataStore.filter(s => s.id !== id);
        console.log("MOCK API: Deleted service, new store:", servicesDataStore);
        resolve();
      }, 500);
    });
  },
};
// --- END OF DEMO DATA & MOCK API SETUP ---


// Define pricing model options
const pricingModelOptions = [
  "Hourly Rate",
  "Fixed Price",
  "Fixed Price + Materials",
  "Annual Contract",
  "Time & Materials",
].sort()

const ServicesSkillsForm = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [showServicesInfo, setShowServicesInfo] = useState(false);
  
  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      pricingModel: "",
      tags: [],
    },
    mode: 'onTouched',
  });
  
  // Fetch initial data from the MOCK API on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        // This now calls our mock API
        const fetchedServices = await servicesApi.getServices();
        setServices(fetchedServices);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load services.");
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []); // Empty dependency array ensures this runs only once.


  const openAddServiceDialog = () => {
    form.reset({
      name: "",
      description: "",
      pricingModel: "",
      tags: [],
    });
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const openEditServiceDialog = (service: Service) => {
    form.reset(service);
    setEditingService(service);
    setIsDialogOpen(true);
  };

  // `onSubmit` handler now calls the MOCK API
  const onSubmit = async (values: Service) => {
    setIsSubmitting(true);
    try {
      if (editingService && editingService.id) {
        // UPDATE logic using the mock API
        const updatedService = await servicesApi.updateService(editingService.id, {
          ...values,
          id: editingService.id, // Ensure id is passed
        });
        setServices(services.map((s) => s.id === updatedService.id ? updatedService : s));
        toast.success("Service updated successfully!");
      } else {
        // ADD logic using the mock API
        const newService = await servicesApi.addService(values);
        setServices([...services, newService]);
        toast.success("Service added successfully!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // `handleDeleteService` handler now calls the MOCK API
  const handleDeleteService = async (id: string) => {
    // Using a simple confirm dialog for demonstration
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await servicesApi.deleteService(id);
        // If the API call is successful, then update the UI
        setServices(services.filter((service) => service.id !== id));
        toast.success("Service deleted successfully!");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete service.");
      }
    }
  };


  const addTag = () => {
    if (!currentTag.trim()) return;
    
    const currentTags = form.getValues().tags || [];
    if (!currentTags.includes(currentTag.trim())) {
      form.setValue("tags", [...currentTags, currentTag.trim()], { shouldValidate: true });
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues().tags || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // A loading indicator UI for better user experience
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      );
    }

    if (services.length === 0) {
      return (
        <div className="text-center py-10 text-muted-foreground">
          No services added yet. Click "Add Service" to get started.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader className="bg-orange-50 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openEditServiceDialog(service)}
                    className="h-8 w-8 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteService(service.id!)}
                    className="h-8 w-8 text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">
                  {service.pricingModel}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between">
  {/* Left side - Title + Description */}
  <div className="flex flex-col">
    <div className="flex items-center">
      <CardTitle className="text-2xl font-bold text-gray-800 mr-2">Services & Skills</CardTitle>
      <button
        type="button"
        onClick={() => setShowServicesInfo(prev => !prev)}
        className="text-gray-500 hover:text-blue-600 transition"
      >
        <Info className="h-5 w-5" />
      </button>
    </div>
    
    {/* Fixed space for description */}
    <div className="min-h-[20px]">
      {showServicesInfo && (
        <CardDescription>
          Manage your service offerings and specialized skills
        </CardDescription>
      )}
    </div>
  </div>

  {/* Right side - Add Service button */}
  <Button 
    onClick={openAddServiceDialog} 
    className="bg-orange-600 hover:bg-orange-700 mt-[10px]"
  >
    <PlusCircle className="mr-2 h-4 w-4" />
    Add Service
  </Button>
</CardHeader>
        
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the details of your service offering"
                : "Add a new service to your company profile"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter service name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your service offering in detail..." 
                        className="h-32 resize-none"
                        {...field} 
                      />
                    </FormControl>
                     <div className="flex justify-end text-xs text-muted-foreground">
                        {field.value?.length || 0} / {MAX_DESCRIPTION_LENGTH}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricingModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Pricing Model</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pricingModelOptions.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Service Tags</FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value?.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                            <button
                              type="button"
                              className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                       <div className="flex w-full items-center rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <Input
                            placeholder="Type a tag and press enter"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            className="h-full rounded-none rounded-r-md bg-orange-600 px-3 py-2 text-sm hover:bg-orange-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Saving..." : editingService ? "Update" : "Add"}
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

export default ServicesSkillsForm;