<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
=======
<<<<<<< HEAD

import React, { useState } from 'react';
import { BaseModal } from '@/components/shared/modals/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Calendar, DollarSign, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
>>>>>>> 9b0ce35 (Initial commit)
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
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface Project {
  id: string;
  title: string;
  description: string;
<<<<<<< HEAD
  category: 'Product' | 'Services' | 'Logistics' | 'Expert';
  budget: number;
  deadline: string;
  location: string;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
=======
<<<<<<< HEAD
  category: 'product' | 'service' | 'logistics' | 'expert';
  budget: number;
  deadline: string;
  location: string;
  status: 'open' | 'in-progress' | 'closed';
=======
  category: 'Product' | 'Services' | 'Logistics' | 'Expert';
  budget: number;
  deadline: string;
  location: string;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  requirements: string[];
}

interface ProjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholderName: string;
  stakeholderId: string;
<<<<<<< HEAD
  stakeholderType: 'Product' | 'Services' | 'Logistics' | 'Expert';
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
}

export const ProjectSelectionModal: React.FC<ProjectSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  stakeholderName, 
<<<<<<< HEAD
  stakeholderId,
  stakeholderType
}) => {
=======
  stakeholderId 
}: ProjectSelectionModalProps) => {
=======
  stakeholderType: 'Product' | 'Services' | 'Logistics' | 'Expert';
}

export const ProjectSelectionModal: React.FC<ProjectSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  stakeholderName, 
  stakeholderId,
  stakeholderType
}) => {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [invitationMessage, setInvitationMessage] = useState('');
<<<<<<< HEAD
  const [projects, setProjects] = useState<Project[]>([]);
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)

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

<<<<<<< HEAD
=======
  const filteredProjects = mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
=======
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

>>>>>>> 9b0ce35 (Initial commit)
  const filteredProjects = projects.filter(project => 
    (project.category === stakeholderType) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()))
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      case 'product': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-green-100 text-green-800';
      case 'logistics': return 'bg-amber-100 text-amber-800';
=======
>>>>>>> 9b0ce35 (Initial commit)
      case 'Product': return 'bg-purple-100 text-purple-800';
      case 'Services': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      case 'Logistics': return 'bg-amber-100 text-amber-800';
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
    // Create project-specific invitation
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
    // Navigate to requirement creation with pre-filled data
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    navigate(`/create-requirement?project=${selectedProject.id}&stakeholder=${stakeholderId}`);
    onClose();
  };

  const handleCreateNewRequirement = () => {
    navigate('/create-requirement');
    onClose();
  };

  return (
<<<<<<< HEAD
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Invite {stakeholderName} to Project</DialogTitle>
        </DialogHeader>
=======
<<<<<<< HEAD
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invite ${stakeholderName} to Project`}
      maxWidth="max-w-4xl"
    >
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
>>>>>>> 9b0ce35 (Initial commit)

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

<<<<<<< HEAD
=======
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            onClick={handleCreateNewRequirement}
            variant="outline"
          >
            Create New Requirement
          </Button>
          
          <div className="flex gap-3">
=======
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

>>>>>>> 9b0ce35 (Initial commit)
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
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
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
<<<<<<< HEAD
      </DialogContent>
    </Dialog>
  );
};
=======
<<<<<<< HEAD
      </div>
    </BaseModal>
  );
};
=======
      </DialogContent>
    </Dialog>
  );
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
