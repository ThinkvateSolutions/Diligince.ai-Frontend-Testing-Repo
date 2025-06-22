import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Upload, FileText, Trash, Building, Clock, Download, Edit, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect"; 

// Schema with the description limit
const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Project name is required" }),
  client: z.string().min(2, { message: "Client name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  duration: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }).max(200, { message: "Description must be 200 characters or less" }),
  technologies: z.array(z.string()).min(1, { message: "Select at least one technology" }),
  outcomes: z.string().min(10, { message: "Outcomes must be at least 10 characters" }),
  images: z.array(z.any()).optional(),
}).refine(data => {
    return new Date(data.endDate) > new Date(data.startDate);
  }, {
    message: "End date must be after the start date.",
    path: ["endDate"],
});

type ProjectFormValues = z.infer<typeof projectSchema>;
type ProjectState = Omit<ProjectFormValues, "startDate" | "endDate"> & {
    startDate: Date;
    endDate: Date;
};

const initialProjects: ProjectState[] = [
  {
    id: "1",
    name: "Manufacturing Line Automation",
    client: "XYZ Pharmaceuticals",
    startDate: new Date("2022-04-15"),
    endDate: new Date("2022-09-30"),
    duration: "5.5 months",
    description: "Complete modernization of manufacturing line...",
    technologies: ["PLC Programming", "SCADA", "HMI"],
    outcomes: "Increased production efficiency by 35%...",
    images: ["project1-image1.jpg", "project1-image2.jpg"],
  },
  {
    id: "2",
    name: "Energy Management System",
    client: "ABC Cement Ltd.",
    startDate: new Date("2023-01-10"),
    endDate: new Date("2023-04-28"),
    duration: "3.5 months",
    description: "Design and implementation of comprehensive energy monitoring...",
    technologies: ["IoT Sensors", "Data Analytics", "SCADA"],
    outcomes: "Reduced energy consumption by 22%...",
    images: ["project2-image1.jpg"],
  },
];

const technologyOptions = [
  { label: "PLC Programming", value: "PLC Programming" },
  { label: "SCADA", value: "SCADA" },
  { label: "HMI", value: "HMI" },
  { label: "IoT Sensors", value: "IoT Sensors" },
  { label: "Robotics", value: "Robotics" },
  { label: "Cloud Integration", value: "Cloud Integration" },
  { label: "Data Analytics", value: "Data Analytics" },
];

const LOCAL_STORAGE_KEY = "portfolio_projects_data";

const ProjectsPortfolioSection = () => {
  const [projects, setProjects] = useState<ProjectState[]>(() => {
    try {
        const savedProjectsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedProjectsJSON) {
            const savedProjects = JSON.parse(savedProjectsJSON);
            return savedProjects.map((project: ProjectState) => ({
                ...project,
                startDate: new Date(project.startDate),
                endDate: new Date(project.endDate),
            }));
        }
    } catch (error) {
        console.error("Could not load projects from local storage", error);
    }
    return initialProjects;
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectState | null>(null);
  const [existingFiles, setExistingFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error("Could not save projects to local storage", error);
    }
  }, [projects]);

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
    setIsDialogOpen(true);
  };

  const onSubmit = (values: ProjectFormValues) => {
    setIsSubmitting(true);
    
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);
    const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const duration = monthDiff <= 1 ? "1 month" : `${monthDiff} months`;

    const getFileName = (file: File | string): string => (file instanceof File ? file.name : file);
    
    setTimeout(() => {
      if (editingProject) {
        const updatedProject: ProjectState = {
          ...editingProject,
          ...values,
          startDate,
          endDate,
          duration,
          images: [...existingFiles.map(getFileName), ...selectedFiles.map(getFileName)],
        };
        setProjects(
          projects.map((p) => p.id === editingProject.id ? updatedProject : p)
        );
        toast.success("Project updated successfully!");
      } else {
        const newProject: ProjectState = {
          ...values,
          id: `${Date.now()}`,
          startDate,
          endDate,
          duration,
          images: selectedFiles.map(getFileName),
        };
        setProjects([...projects, newProject]);
        toast.success("Project added successfully!");
      }
      
      resetAndCloseDialog();
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    }
  };

  const handleProjectFileDownload = (fileName: string) => {
      toast.info(`Download functionality for "${fileName}" is not implemented.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveExistingFile = (fileNameToRemove: string) => {
    setExistingFiles(existingFiles.filter((file) => (file instanceof File ? file.name : file) !== fileNameToRemove));
  };
  
  const handleRemoveNewFile = (indexToRemove: number) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Projects Portfolio</CardTitle>
            <CardDescription>
              Showcase your successful projects and achievements
            </CardDescription>
          </div>
          <Button onClick={openAddProjectDialog} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        
        <CardContent>
          {projects.length === 0 ? (
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
                            {project.images.map((fileOrString, index) => {
                              const fileName = fileOrString instanceof File ? fileOrString.name : fileOrString;
                              return (
                                <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 truncate" title={fileName}>{fileName}</span>
                                  </div>
                                  <Button
                                    variant="ghost" size="sm" className="h-7 text-blue-600"
                                    onClick={() => handleProjectFileDownload(fileName)}
                                  >
                                    <Download className="h-4 w-4 mr-1" /> Download
                                  </Button>
                                </div>
                              );
                            })}
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
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Start Date</FormLabel>
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">End Date</FormLabel>
                      <FormControl>
                        <Input 
                            type="date"
                            min={startDateValue}
                            disabled={!startDateValue}
                            {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* === THE ONLY CHANGE IS HERE === */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project scope..."
                        className="h-24 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        {field.value?.length || 0} / 200
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              {/* === END OF CHANGE === */}

              <FormField control={form.control} name="technologies" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Technologies Used</FormLabel><FormControl><MultiSelect placeholder="Select technologies" options={technologyOptions} selected={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="outcomes" render={({ field }) => (<FormItem><FormLabel className="text-foreground">Results & Outcomes</FormLabel><FormControl><Textarea placeholder="Describe the results achieved..." className="h-24 resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />

              <div className="space-y-4">
                  {existingFiles.length > 0 && (
                      <div>
                          <FormLabel className="text-foreground">Current Files</FormLabel>
                          <div className="space-y-2 mt-2">
                              {existingFiles.map((file, index) => {
                                const fileName = file instanceof File ? file.name : file as string;
                                return (
                                  <div key={index} className="flex items-center justify-between p-2 rounded-md border text-sm">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                          <FileText className="h-4 w-4 text-gray-500" />
                                          <span className="truncate">{fileName}</span>
                                      </div>
                                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleRemoveExistingFile(fileName)}>
                                          <X className="h-4 w-4" />
                                      </Button>
                                  </div>
                                )})}
                          </div>
                      </div>
                  )}

                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to browse or drag and drop</p>
                    <Input id="projectFiles" type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"/>
                    <Button type="button" variant="outline" className="mt-4" onClick={() => document.getElementById("projectFiles")?.click()}>
                      Browse Files
                    </Button>
                  </div>

                  {selectedFiles.length > 0 && (
                      <div>
                          <FormLabel className="text-foreground">New Files to Upload</FormLabel>
                          <div className="space-y-2 mt-2">
                              {selectedFiles.map((file, index) => (
                                  <div key={file.name + index} className="flex items-center justify-between p-2 rounded-md border text-sm">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                          <FileText className="h-4 w-4 text-blue-600" />
                                          <span className="truncate">{file.name}</span>
                                          <span className="text-gray-500 text-xs flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
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
                  {isSubmitting ? "Saving..." : (editingProject ? "Update Project" : "Add Project")}
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