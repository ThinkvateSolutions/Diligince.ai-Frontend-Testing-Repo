import { useState, useEffect, ChangeEvent, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Upload, FileText, Trash, Building, Clock, Download, Edit, X, Loader2, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { format, formatDistance, sub } from "date-fns"; // --- CHANGE: Added formatDistance and sub
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { cn } from "@/lib/utils";
// import * as projectsApi from "@/services/ServiceprojectsApi"; // --- CHANGE: This line is replaced by the mock API below
// Schema for project data validation
const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Project name is required" }),
  client: z.string().min(2, { message: "Client name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  duration: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }).max(500, { message: "Description must be 500 characters or less" }),
  technologies: z.array(z.string()).min(1, { message: "Select at least one technology" }),
  outcomes: z.string().min(10, { message: "Outcomes must be at least 10 characters" }).max(500, { message: "Outcome must be 500 characters or less" }),
  images: z.array(z.any()).optional(),
}).refine(data => {
    return new Date(data.endDate) > new Date(data.startDate);
  }, {
    message: "End date must be after the start date.",
    path: ["endDate"],
});

type ProjectFormValues = z.infer<typeof projectSchema>;
// Type for managing component state with Date objects
type ProjectState = Omit<ProjectFormValues, "startDate" | "endDate"> & {
    startDate: Date;
    endDate: Date;
};

// --- DEMO DATA & MOCK API SETUP ---
// This section simulates a backend API for demonstration purposes.

const today = new Date();

// Demo data for initial projects list
const demoProjects: ProjectState[] = [
  {
    id: 'proj-1',
    name: 'Automated Warehouse System',
    client: 'LogiCorp Inc.',
    startDate: sub(today, { months: 8 }),
    endDate: sub(today, { months: 2 }),
    duration: '6 months',
    description: 'Designed and deployed a fully automated conveyor and sorting system for a major logistics warehouse, increasing throughput by 40%.',
    technologies: ['PLC Programming', 'SCADA', 'Robotics'],
    outcomes: 'Achieved a 40% increase in package sorting efficiency and a 25% reduction in manual handling errors. The system has been running with 99.8% uptime since deployment.',
    images: ['LogiCorp_System_Overview.pdf', 'Warehouse_Robot_Arm.jpg'],
  },
  {
    id: 'proj-2',
    name: 'Smart Building HVAC Control',
    client: 'Greenleaf Properties',
    startDate: sub(today, { years: 1, months: 2 }),
    endDate: sub(today, { months: 9 }),
    duration: '5 months',
    description: 'Upgraded the HVAC control system for a 20-story office building using IoT sensors and a centralized HMI dashboard for real-time monitoring and energy optimization.',
    technologies: ['HMI', 'IoT Sensors', 'Data Analytics'],
    outcomes: 'Resulted in a 22% reduction in annual energy consumption for HVAC systems and improved occupant comfort through more stable temperature regulation.',
    images: ['HVAC_Dashboard_Screenshot.png'],
  },
  {
    id: 'proj-3',
    name: 'Industrial IoT Platform Integration',
    client: 'SteelWorks Manufacturing',
    startDate: sub(today, { months: 5 }),
    endDate: sub(today, { months: 1 }),
    duration: '4 months',
    description: 'Integrated legacy factory machinery with a modern cloud-based IoT platform for predictive maintenance and performance tracking.',
    technologies: ['IoT Sensors', 'Cloud Integration', 'Machine Learning', 'Cybersecurity'],
    outcomes: 'Enabled predictive maintenance alerts, reducing machine downtime by 30%. Provided management with real-time production dashboards.',
    images: [], // Example of a project with no images
  }
];

// A mutable data store to mimic a database
let projectsDataStore: ProjectState[] = [...demoProjects];

const generateId = () => `proj-${Date.now()}`;
const calculateDuration = (start: string | Date, end: string | Date) => formatDistance(new Date(start), new Date(end));

// Mock API object that mimics the behavior of a real API service
const projectsApi = {
  getProjects: (): Promise<ProjectState[]> => {
    console.log("MOCK API: Fetching projects...");
    return new Promise(resolve => setTimeout(() => {
      console.log("MOCK API: Responded with", projectsDataStore);
      resolve([...projectsDataStore]);
    }, 1000));
  },

  addProject: (data: ProjectFormValues, files: File[]): Promise<ProjectState> => {
    console.log("MOCK API: Adding project...", { data, files });
    return new Promise(resolve => setTimeout(() => {
      const newProject: ProjectState = {
        ...data,
        id: generateId(),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        duration: calculateDuration(data.startDate, data.endDate),
        images: files.map(file => file.name),
      };
      projectsDataStore.push(newProject);
      console.log("MOCK API: Added project. New store:", projectsDataStore);
      resolve(newProject);
    }, 500));
  },

  updateProject: (id: string, data: ProjectFormValues & { existingImages: string[] }, files: File[]): Promise<ProjectState> => {
    console.log("MOCK API: Updating project...", { id, data, files });
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = projectsDataStore.findIndex(p => p.id === id);
      if (index !== -1) {
        const updatedProject: ProjectState = {
          ...projectsDataStore[index],
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          duration: calculateDuration(data.startDate, data.endDate),
          images: [...data.existingImages, ...files.map(file => file.name)],
        };
        projectsDataStore[index] = updatedProject;
        console.log("MOCK API: Updated project. New store:", projectsDataStore);
        resolve(updatedProject);
      } else {
        reject(new Error("Project not found"));
      }
    }, 500));
  },

  deleteProject: (id: string): Promise<void> => {
    console.log("MOCK API: Deleting project...", id);
    return new Promise(resolve => setTimeout(() => {
      projectsDataStore = projectsDataStore.filter(p => p.id !== id);
      console.log("MOCK API: Deleted project. New store:", projectsDataStore);
      resolve();
    }, 500));
  },

  getProjectDocumentUrl: (projectId: string, fileName: string): string => {
    console.log(`MOCK API: Generating download URL for ${fileName} from project ${projectId}`);
    // Simulate a file download by creating a blob URL
    const content = `This is a mock file download for: ${fileName}\nProject ID: ${projectId}`;
    const blob = new Blob([content], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }
};
// --- END OF DEMO DATA & MOCK API SETUP ---


// Technology options for the multi-select component
const technologyOptions = [
  { label: "PLC Programming", value: "PLC Programming" },
  { label: "SCADA", value: "SCADA" },
  { label: "HMI", value: "HMI" },
  { label: "IoT Sensors", value: "IoT Sensors" },
  { label: "Robotics", value: "Robotics" },
  { label: "Cloud Integration", value: "Cloud Integration" },
  { label: "Data Analytics", value: "Data Analytics" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Cybersecurity", value: "Cybersecurity" },
].sort((a, b) => a.label.localeCompare(b.label));

// FIX: Define constants for file validation
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;


const ProjectsPortfolioSection = () => {
  const [projects, setProjects] = useState<ProjectState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectState | null>(null);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showProjectsInfo, setShowProjectsInfo] = useState(false);
  
  // Fetch initial data from the API on component mount
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectsApi.getProjects();
        // The mock API already returns Date objects, but this ensures compatibility
        const formattedData = data.map(project => ({
            ...project,
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
        }));
        setProjects(formattedData);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", client: "", startDate: "", endDate: "", description: "", technologies: [], outcomes: "", images: [] },
    mode: 'onTouched',
  });
  
  const startDateValue = form.watch("startDate");
  
  const resetAndCloseDialog = () => {
    form.reset();
    setEditingProject(null);
    setSelectedFiles([]);
    setExistingFiles([]);
    setIsDialogOpen(false);
  };

  const openAddProjectDialog = () => {
    setEditingProject(null);
    form.reset({ name: "", client: "", startDate: "", endDate: "", description: "", technologies: [], outcomes: "", images: [] });
    setSelectedFiles([]);
    setExistingFiles([]);
    setIsDragging(false);
    setIsDialogOpen(true);
  };
  
  const openEditProjectDialog = (project: ProjectState) => {
    setEditingProject(project);
    form.reset({
      ...project,
      startDate: format(project.startDate, 'yyyy-MM-dd'),
      endDate: format(project.endDate, 'yyyy-MM-dd'),
    });
    setExistingFiles(project.images || []);
    setSelectedFiles([]);
    setIsDragging(false);
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingProject) {
        const dataToSend = { ...values, existingImages: existingFiles };
        const updatedProject = await projectsApi.updateProject(editingProject.id!, dataToSend, selectedFiles);
        const newState = { ...updatedProject, startDate: new Date(updatedProject.startDate), endDate: new Date(updatedProject.endDate) };
        setProjects(projects.map(p => p.id === newState.id ? newState : p));
        toast.success("Project updated successfully!");
      } else {
        const newProject = await projectsApi.addProject(values, selectedFiles);
        const newState = { ...newProject, startDate: new Date(newProject.startDate), endDate: new Date(newProject.endDate) };
        setProjects([...projects, newState]);
        toast.success("Project added successfully!");
      }
      resetAndCloseDialog();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectsApi.deleteProject(id);
        setProjects(projects.filter((project) => project.id !== id));
        toast.success("Project deleted successfully!");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete project.");
      }
    }
  };

  const handleProjectFileDownload = (project: ProjectState, fileName: string) => {
      const url = projectsApi.getProjectDocumentUrl(project.id!, fileName);
      window.open(url, '_blank');
  };

  // FIX: Centralized function to handle and validate new files
  const handleNewFiles = (files: File[]) => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Only PDF, JPG, and PNG are allowed.`);
        continue;
      }
      // Check file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`File too large: ${file.name}. Max size is ${MAX_FILE_SIZE_MB}MB.`);
        continue;
      }
      validFiles.push(file);
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added successfully.`);
    }
  };

  // FIX: Use the new validation handler and reset the input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleNewFiles(Array.from(e.target.files));
      // Reset input to allow selecting the same file again
      e.target.value = '';
    }
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

  // FIX: Use the new validation handler for dropped files
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleNewFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveExistingFile = (fileNameToRemove: string) => {
    setExistingFiles(existingFiles.filter((fileName) => fileName !== fileNameToRemove));
  };
  
  const handleRemoveNewFile = (indexToRemove: number) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between">
  {/* Left side - Title + Info */}
  <div className="flex flex-col">
    <div className="flex items-center">
      <CardTitle className="text-2xl font-bold text-gray-800 mr-2">Projects Portfolio</CardTitle>
      <button
        type="button"
        onClick={() => setShowProjectsInfo(prev => !prev)}
        className="text-gray-500 hover:text-blue-600 transition"
      >
        <Info className="h-5 w-5" />
      </button>
    </div>

    {/* Fixed space for description */}
    <div className="min-h-[20px]">
      {showProjectsInfo && (
        <CardDescription>
          Showcase your successful projects and achievements
        </CardDescription>
      )}
    </div>
  </div>

  {/* Right side - Add Project button */}
  <Button 
    onClick={openAddProjectDialog} 
    className="bg-orange-600 hover:bg-orange-700 mt-[10px]"
  >
    <PlusCircle className="mr-2 h-4 w-4" />
    Add Project
  </Button>
</CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No projects added yet. Click "Add Project" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{project.client}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{project.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditProjectDialog(project)}
                          className="h-8 w-8 text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id!)}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Description</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Outcomes</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.outcomes}</p>
                      </div>
                      
                      {project.images && project.images.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Images/Documents</h4>
                          <div className="mt-2 space-y-2">
                            {project.images.map((fileName, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 truncate" title={fileName}>{fileName}</span>
                                  </div>
                                  <Button
                                    variant="ghost" size="sm" className="h-7 text-blue-600"
                                    onClick={() => handleProjectFileDownload(project, fileName)}
                                  >
                                    <Download className="h-4 w-4 mr-1" /> Download
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) resetAndCloseDialog(); else setIsDialogOpen(true); }}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update the details for this project.' : 'Add a new project to showcase your capabilities.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto px-2 [scrollbar-gutter:stable]">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Project Name</FormLabel><FormControl><Input placeholder="Enter project name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="client" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Client Name</FormLabel><FormControl><Input placeholder="Enter client name" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="startDate" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Start Date</FormLabel><FormControl><Input type="date" max={format(new Date(), 'yyyy-MM-dd')} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="endDate" render={({ field }) => (<FormItem><FormLabel className="text-foreground">End Date</FormLabel><FormControl><Input type="date" min={startDateValue} disabled={!startDateValue} {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>

              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Project Description</FormLabel><FormControl><Textarea placeholder="Describe the project scope..." className="h-24 resize-none" {...field} /></FormControl><div className="flex justify-between items-center"><FormMessage /><p className="text-xs text-muted-foreground">{field.value?.length || 0} / 500</p></div></FormItem>)} />
              <FormField control={form.control} name="technologies" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Technologies Used</FormLabel><FormControl><MultiSelect placeholder="Select technologies" options={technologyOptions} selected={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="outcomes" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Results & Outcomes</FormLabel><FormControl><Textarea placeholder="Describe the results achieved..." className="h-24 resize-none" {...field} /></FormControl><div className="flex justify-between items-center"><FormMessage /><p className="text-xs text-muted-foreground">{field.value?.length || 0} / 500</p></div></FormItem>)} />

              <div className="space-y-2">
                  <FormLabel className="text-foreground">Attach Project Documents</FormLabel>
                  
                  {existingFiles.length > 0 && (
                      <div className="pt-2">
                          <FormLabel className="text-sm text-muted-foreground">Current Files</FormLabel>
                          <div className="space-y-2 mt-2">
                              {existingFiles.map((fileName, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 rounded-md border text-sm">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                          <FileText className="h-4 w-4 text-gray-500" />
                                          <span className="truncate">{fileName}</span>
                                      </div>
                                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleRemoveExistingFile(fileName)}>
                                          <X className="h-4 w-4" />
                                      </Button>
                                  </div>
                                ))}
                          </div>
                      </div>
                  )}

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("projectFiles")?.click()}
                    className={cn("border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", isDragging ? "border-orange-500 bg-orange-50" : "border-border hover:border-orange-400")}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or{" "}<span className="font-semibold text-orange-600">click to browse</span></p>
                    <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG up to {MAX_FILE_SIZE_MB}MB</p>
                    <Input id="projectFiles" type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                  </div>

                  {selectedFiles.length > 0 && (
                      <div className="pt-2">
                          <FormLabel className="text-sm text-muted-foreground">New Files to Upload</FormLabel>
                          <div className="space-y-2 mt-2">
                              {selectedFiles.map((file, index) => (
                                  <div key={file.name + index} className="flex items-center justify-between p-2 rounded-md border text-sm">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                          <FileText className="h-4 w-4 text-blue-600" />
                                          <span className="truncate">{file.name}</span>
                                          <span className="text-gray-500 text-xs flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                      </div>
                                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleRemoveNewFile(index)}>
                                          <X className="h-4 w-4" />
                                      </Button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
              
              <DialogFooter className="pt-4 bg-background sticky bottom-0">
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Saving..." : (editingProject ? "Update" : "Add")}
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

export default ProjectsPortfolioSection;