import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, Calendar, DollarSign, MapPin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Product' | 'Services' | 'Logistics' | 'Expert';
  budget: number;
  deadline: string;
  location: string;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
  requirements: string[];
}

interface ProjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholderName: string;
  stakeholderId: string;
  stakeholderType: 'Product' | 'Services' | 'Logistics' | 'Expert';
}

export const ProjectSelectionModal: React.FC<ProjectSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  stakeholderName, 
  stakeholderId,
  stakeholderType
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [invitationMessage, setInvitationMessage] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("requirements-list");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed)) {
          const mappedProjects: Project[] = parsed.map((item: any) => ({
            id: item.id || "",
            title: item.title || "Untitled Project",
            description: item.description || "",
            category: item.category || "service",
            budget: item.budget || item.estimatedBudget || 0,
            deadline: item.deadline || item.endDate || "",
            location: item.location || item.deliveryLocation || "Not specified",
            status: (item.status?.toLowerCase() as Project["status"]) || "open",
            requirements: item.certifications || []
          }));
          setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Error parsing requirements-list from localStorage:", err);
      }
    }
  }, []);

  const filteredProjects = projects.filter(project => 
    (project.category === stakeholderType) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Product': return 'bg-purple-100 text-purple-800';
      case 'Services': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      case 'Logistics': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSendInvitation = () => {
    if (!selectedProject) {
      toast.error('Please select a project first');
      return;
    }

    const invitationData = {
      stakeholderId,
      stakeholderName,
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      message: invitationMessage,
      invitedAt: new Date().toISOString()
    };

    console.log('Sending project invitation:', invitationData);

    toast.success(`Project invitation sent to ${stakeholderName}!`, {
      description: `${stakeholderName} has been invited to participate in "${selectedProject.title}"`
    });

    navigate(`/create-requirement?project=${selectedProject.id}&stakeholder=${stakeholderId}`);
    onClose();
  };

  const handleCreateNewRequirement = () => {
    navigate('/create-requirement');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Invite {stakeholderName} to Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Projects List */}
          <div className="max-h-96 overflow-y-auto space-y-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all ${
                  selectedProject?.id === project.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleProjectSelect(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span>${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>{project.requirements.length} requirements</span>
                    </div>
                  </div>
                  
                  {project.requirements.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.requirements.slice(0, 3).map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {project.requirements.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? "No projects match your search criteria."
                    : `No ${stakeholderType} projects available.`}
                </p>
                <Button onClick={handleCreateNewRequirement} className="bg-blue-600 hover:bg-blue-700">
                  Create New Requirement
                </Button>
              </div>
            )}
          </div>

          {/* Selected Project Details */}
          {selectedProject && (
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-3">Add Personal Message (Optional)</h4>
              <Textarea
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                placeholder="Add a personal message to include with the project invitation..."
                className="min-h-[100px]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvitation}
              disabled={!selectedProject}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Send Project Invitation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};