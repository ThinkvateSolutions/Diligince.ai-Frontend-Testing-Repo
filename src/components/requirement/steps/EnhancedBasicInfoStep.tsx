import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { AlertTriangle, User, Package, Wrench, Truck, Building, FileText } from "lucide-react";
=======
<<<<<<< HEAD
import { AlertTriangle, User, Package, Wrench, Truck, DollarSign, Building, FileText } from "lucide-react";
=======
import { AlertTriangle, User, Package, Wrench, Truck, Building, FileText } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { toast } from "sonner";

interface EnhancedBasicInfoStepProps {
  onNext: () => void;
}

<<<<<<< HEAD
const EnhancedBasicInfoStep: React.FC<EnhancedBasicInfoStepProps> = ({ onNext }) => {
=======
<<<<<<< HEAD
const EnhancedBasicInfoStep: React.FC<EnhancedBasicInfoStepProps> = ({
  onNext
}) => {
=======
const EnhancedBasicInfoStep: React.FC<EnhancedBasicInfoStepProps> = ({ onNext }) => {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const {
    formData,
    updateFormData,
    validateStep,
    stepErrors,
<<<<<<< HEAD
    saveAsDraft,
    isStepFilled,
    saveCurrentState,
    getHistory,
    loadFromHistory,
    isWorkflowLocked,
=======
<<<<<<< HEAD
    saveAsDraft
>>>>>>> 9b0ce35 (Initial commit)
  } = useRequirement();

  const [showHistory, setShowHistory] = React.useState(false);
  const history = getHistory();

  const handleNext = () => {
    if (validateStep(1)) {
<<<<<<< HEAD
      saveCurrentState();
=======
=======
    saveAsDraft,
    isStepFilled,
    saveCurrentState,
    getHistory,
    loadFromHistory,
    isWorkflowLocked,
  } = useRequirement();

  const [showHistory, setShowHistory] = React.useState(false);
  const history = getHistory();

  const handleNext = () => {
    if (validateStep(1)) {
      saveCurrentState();
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

<<<<<<< HEAD
  const handleSaveAsDraft = () => {
    if (!formData.title || formData.title.trim() === '') {
      toast.error("Please enter a title before saving a draft.");
      return;
    }
=======
<<<<<<< HEAD
  const handleSaveDraft = () => {
>>>>>>> 9b0ce35 (Initial commit)
    saveAsDraft();
    toast.success("Requirement saved as a draft!");
  };

  const handleLoadFromHistory = (version: number) => {
    loadFromHistory(version);
    setShowHistory(false);
    toast.success(`Loaded version ${version}`);
  };

  const categoryOptions = [{
<<<<<<< HEAD
    id: "Expert",
=======
    id: "expert",
=======
  const handleSaveAsDraft = () => {
    if (!formData.title || formData.title.trim() === '') {
      toast.error("Please enter a title before saving a draft.");
      return;
    }
    saveAsDraft();
    toast.success("Requirement saved as a draft!");
  };

  const handleLoadFromHistory = (version: number) => {
    loadFromHistory(version);
    setShowHistory(false);
    toast.success(`Loaded version ${version}`);
  };

  const categoryOptions = [{
    id: "Expert",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    title: "Expert Services",
    description: "Professional consulting & technical expertise",
    icon: User,
    color: "bg-blue-50 border-blue-200 text-blue-700"
  }, {
<<<<<<< HEAD
    id: "Product",
=======
<<<<<<< HEAD
    id: "product",
=======
    id: "Product",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    title: "Products & Materials",
    description: "Equipment, spare parts & raw materials",
    icon: Package,
    color: "bg-green-50 border-green-200 text-green-700"
  }, {
<<<<<<< HEAD
    id: "Services",
=======
<<<<<<< HEAD
    id: "service",
=======
    id: "Services",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    title: "Contract Services",
    description: "Maintenance, construction & support services",
    icon: Wrench,
    color: "bg-purple-50 border-purple-200 text-purple-700"
  }, {
<<<<<<< HEAD
    id: "Logistics",
=======
<<<<<<< HEAD
    id: "logistics",
=======
    id: "Logistics",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    title: "Logistics & Transport",
    description: "Transportation, warehousing & distribution",
    icon: Truck,
    color: "bg-orange-50 border-orange-200 text-orange-700"
  }];
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const priorityOptions = [{
    value: "critical",
    label: "Critical",
    color: "bg-red-100 text-red-800",
<<<<<<< HEAD
    description: "Immediate action required, major impact."
=======
<<<<<<< HEAD
    description: "Immediate action required"
=======
    description: "Immediate action required, major impact."
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  }, {
    value: "high",
    label: "High",
    color: "bg-orange-100 text-orange-800",
<<<<<<< HEAD
    description: "Urgent, significant impact."
=======
<<<<<<< HEAD
    description: "High priority, urgent"
=======
    description: "Urgent, significant impact."
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  }, {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
<<<<<<< HEAD
    description: "Standard priority, moderate impact."
=======
<<<<<<< HEAD
    description: "Standard priority"
=======
    description: "Standard priority, moderate impact."
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  }, {
    value: "low",
    label: "Low",
    color: "bg-gray-100 text-gray-800",
<<<<<<< HEAD
    description: "Non-urgent, minimal impact."
=======
<<<<<<< HEAD
    description: "Low priority, flexible timing"
>>>>>>> 9b0ce35 (Initial commit)
  }];
  
  const riskLevels = [{
<<<<<<< HEAD
    value: "critical",
    label: "Critical Risk",
    color: "text-red-600"
=======
    value: "low",
    label: "Low Risk",
    color: "text-green-600"
  }, {
    value: "medium",
    label: "Medium Risk",
    color: "text-yellow-600"
=======
    description: "Non-urgent, minimal impact."
  }];
  
  const riskLevels = [{
    value: "critical",
    label: "Critical Risk",
    color: "text-red-600"
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  }, {
    value: "high",
    label: "High Risk",
    color: "text-orange-600"
  }, {
<<<<<<< HEAD
    value: "medium",
    label: "Medium Risk",
    color: "text-yellow-600"
  }, {
    value: "low",
    label: "Low Risk",
    color: "text-green-600"
  }];
=======
<<<<<<< HEAD
    value: "critical",
    label: "Critical Risk",
    color: "text-red-600"
  }];
  const departments = ["Engineering", "Procurement", "Operations", "Maintenance", "Quality", "Safety", "IT", "Finance", "HR", "Management"];
=======
    value: "medium",
    label: "Medium Risk",
    color: "text-yellow-600"
  }, {
    value: "low",
    label: "Low Risk",
    color: "text-green-600"
  }];
>>>>>>> 9b0ce35 (Initial commit)
  
  const departments = [
    "Engineering",
    "Finance",
    "HR",
    "IT",
    "Maintenance",
    "Management",
    "Operations",
    "Procurement",
    "Quality",
    "Safety"
  ];
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            <p className="text-gray-600 mt-1">
              Provide essential details for your procurement requirement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 1 of 6
            </Badge>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Version History Panel */}
      {showHistory && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
              Version History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-gray-500">No history available</p>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        !isWorkflowLocked ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-not-allowed'
                      }`}
                      onClick={() => !isWorkflowLocked && handleLoadFromHistory(item.version || index + 1)}
                    >
                      <div>
                        <p className="font-medium">{item.title || 'Untitled Draft'}</p>
                        <p className="text-sm text-gray-500">
                          Version {item.version} - {new Date(item.lastModified || '').toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {item.status || 'draft'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
=======
<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Requirement Title */}
=======
      {/* Version History Panel */}
      {showHistory && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
              Version History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-gray-500">No history available</p>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        !isWorkflowLocked ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-not-allowed'
                      }`}
                      onClick={() => !isWorkflowLocked && handleLoadFromHistory(item.version || index + 1)}
                    >
                      <div>
                        <p className="font-medium">{item.title || 'Untitled Draft'}</p>
                        <p className="text-sm text-gray-500">
                          Version {item.version} - {new Date(item.lastModified || '').toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {item.status || 'draft'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <FileText className="h-5 w-5" />
                Requirement Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-700">
                  Requirement Title <span className="text-red-500">*</span>
                </Label>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <Input 
                  id="title" 
                  placeholder="Enter a clear and descriptive title" 
                  value={formData.title || ''} 
                  onChange={e => updateFormData({ title: e.target.value })} 
                  className="text-base bg-gray-50" 
=======
>>>>>>> 9b0ce35 (Initial commit)
                <Input
                  id="title"
                  placeholder="Enter a clear and descriptive title"
                  value={formData.title || ''}
                  onChange={e => updateFormData({ title: e.target.value })}
                  className="text-base bg-gray-50"
                  disabled={isWorkflowLocked}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
                {stepErrors?.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.title}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
<<<<<<< HEAD
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
=======
<<<<<<< HEAD
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
>>>>>>> 9b0ce35 (Initial commit)
                  {categoryOptions.map(category => (
                    <Card
                      key={category.id}
                      className={`flex items-center p-4 transition-all border-2 ${
                        formData.category === category.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent bg-white"
                      } ${
                        isWorkflowLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'cursor-pointer hover:shadow-md hover:border-gray-200'
                      }`}
                      onClick={() => !isWorkflowLocked && updateFormData({ category: category.id as "Product" | "Services" | "Expert" | "Logistics" })}
                    >
<<<<<<< HEAD
=======
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryOptions.map(category => (
                    <Card
                      key={category.id}
                      className={`flex items-center p-4 transition-all border-2 ${
                        formData.category === category.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent bg-white"
                      } ${
                        isWorkflowLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'cursor-pointer hover:shadow-md hover:border-gray-200'
                      }`}
                      onClick={() => !isWorkflowLocked && updateFormData({ category: category.id as "Product" | "Services" | "Expert" | "Logistics" })}
                    >
>>>>>>> 9b0ce35 (Initial commit)
                      <input
                        type="radio"
                        name="category"
                        checked={formData.category === category.id}
                        readOnly
                        className="mr-4 flex-shrink-0"
                      />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                      <div className="flex items-start gap-3">
                        <div className={`rounded-lg p-2 ${category.color}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-xl">{category.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
<<<<<<< HEAD
                    </Card>
=======
<<<<<<< HEAD
                    </div>
=======
                    </Card>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  ))}
                </div>
                {stepErrors?.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.category}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessJustification" className="text-base font-medium text-gray-700">
                  Business Justification <span className="text-red-500">*</span>
                </Label>
<<<<<<< HEAD
                <Textarea
                  id="businessJustification"
                  placeholder="Explain the business need and expected benefits (max 1000 characters)"
                  value={formData.businessJustification || ''}
                  onChange={e => {
                    if (e.target.value.length <= 1000) {
                      updateFormData({ businessJustification: e.target.value });
                    }
                  }}
                  rows={4}
                  className="resize-none bg-gray-50"
                  disabled={isWorkflowLocked}
                />
=======
<<<<<<< HEAD
                <Textarea 
                  id="businessJustification" 
                  placeholder="Explain the business need and expected benefits" 
                  value={formData.businessJustification || ''} 
                  onChange={e => updateFormData({ businessJustification: e.target.value })} 
                  rows={4} 
                  className="resize-none bg-gray-50" 
                />
                {stepErrors?.businessJustification && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.businessJustification}
                  </p>
                )}
=======
                <Textarea
                  id="businessJustification"
                  placeholder="Explain the business need and expected benefits (max 1000 characters)"
                  value={formData.businessJustification || ''}
                  onChange={e => {
                    if (e.target.value.length <= 1000) {
                      updateFormData({ businessJustification: e.target.value });
                    }
                  }}
                  rows={4}
                  className="resize-none bg-gray-50"
                  disabled={isWorkflowLocked}
                />
>>>>>>> 9b0ce35 (Initial commit)
                <div className="flex justify-between items-center">
                  <div>
                    {stepErrors?.businessJustification && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {stepErrors.businessJustification}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs ${(formData.businessJustification?.length || 0) >= 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                    {(formData.businessJustification?.length || 0)}/1000
                  </span>
                </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </CardContent>
          </Card>

<<<<<<< HEAD
=======
<<<<<<< HEAD
          {/* Organization Details */}
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Building className="h-5 w-5" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-base font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </Label>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <Select value={formData.department || ''} onValueChange={value => updateFormData({ department: value })}>
=======
>>>>>>> 9b0ce35 (Initial commit)
                  <Select
                    value={formData.department || ''}
                    onValueChange={value => updateFormData({ department: value })}
                    disabled={isWorkflowLocked}
                  >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {stepErrors?.department && (
                    <p className="text-sm text-red-500">{stepErrors.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costCenter" className="text-base font-medium text-gray-700">
                    Cost Center <span className="text-red-500">*</span>
                  </Label>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <Input 
                    id="costCenter" 
                    placeholder="e.g., CC-001-ENG" 
                    value={formData.costCenter || ''} 
                    onChange={e => updateFormData({ costCenter: e.target.value })} 
                    className="bg-gray-50" 
=======
>>>>>>> 9b0ce35 (Initial commit)
                  <Input
                    id="costCenter"
                    placeholder="e.g., CC-001-ENG"
                    value={formData.costCenter || ''}
                    onChange={e => updateFormData({ costCenter: e.target.value })}
                    className="bg-gray-50"
                    disabled={isWorkflowLocked}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  />
                  {stepErrors?.costCenter && (
                    <p className="text-sm text-red-500">{stepErrors.costCenter}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestedBy" className="text-base font-medium text-gray-700">
                  Requested By
                </Label>
                <Input 
<<<<<<< HEAD
                  readOnly
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
                  id="requestedBy" 
                  placeholder="Ram" 
                  value={formData.requestedBy || ''} 
                  onChange={e => updateFormData({ requestedBy: e.target.value })} 
                  className="bg-gray-50" 
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
=======
                  readOnly
                  id="requestedBy" 
                  placeholder="Ram" 
                  value={formData.requestedBy || ''} 
                  onChange={e => updateFormData({ requestedBy: e.target.value })} 
                  className="bg-gray-50" 
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Priority & Budget */}
        <div className="space-y-6">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <AlertTriangle className="h-5 w-5" />
                Priority & Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
<<<<<<< HEAD
              <div className="rounded-lg border bg-orange-50 border-orange-200 p-3 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urgency" className="font-medium text-orange-800">
                      Emergency Requirement
                    </Label>
                    <p className="text-xs mt-1 text-orange-600">
                      Requires expedited processing
                    </p>
                  </div>
                  <Switch
                    id="urgency"
                    checked={formData.urgency || false}
                    onCheckedChange={(checked) => updateFormData({ urgency: checked })}
                    disabled={isWorkflowLocked}
                  />
                </div>
              </div>
              
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Priority Level <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {priorityOptions.map((priority) => (
                    <Card
                      key={priority.value}
                      className={`p-3 transition-all border-2 ${
                        formData.priority === priority.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent bg-white"
                      } ${
                        isWorkflowLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'cursor-pointer hover:shadow-sm hover:border-gray-200'
                      }`}
                      onClick={() => !isWorkflowLocked && updateFormData({ priority: priority.value as "low" | "medium" | "high" | "critical" })}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          className="mr-3 flex-shrink-0"
                          checked={formData.priority === priority.value}
                          readOnly
                        />
                        <div className="flex-1">
                          <Badge
                            className={
                              formData.priority === priority.value
                                ? "bg-blue-600 text-white"
                                : priority.color
                            }
                          >
                            {priority.label}
                          </Badge>
                          <p
                            className={`text-xs mt-1 ${
                              formData.priority === priority.value
                                ? "text-blue-700"
                                : "text-gray-600"
                            }`}
                          >
                            {priority.description}
                          </p>
                        </div>
                      </div>
<<<<<<< HEAD
                    </Card>
=======
                    </div>
=======
              <div className="rounded-lg border bg-orange-50 border-orange-200 p-3 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urgency" className="font-medium text-orange-800">
                      Emergency Requirement
                    </Label>
                    <p className="text-xs mt-1 text-orange-600">
                      Requires expedited processing
                    </p>
                  </div>
                  <Switch
                    id="urgency"
                    checked={formData.urgency || false}
                    onCheckedChange={(checked) => updateFormData({ urgency: checked })}
                    disabled={isWorkflowLocked}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Priority Level <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {priorityOptions.map((priority) => (
                    <Card
                      key={priority.value}
                      className={`p-3 transition-all border-2 ${
                        formData.priority === priority.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent bg-white"
                      } ${
                        isWorkflowLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'cursor-pointer hover:shadow-sm hover:border-gray-200'
                      }`}
                      onClick={() => !isWorkflowLocked && updateFormData({ priority: priority.value as "low" | "medium" | "high" | "critical" })}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          className="mr-3 flex-shrink-0"
                          checked={formData.priority === priority.value}
                          readOnly
                        />
                        <div className="flex-1">
                          <Badge
                            className={
                              formData.priority === priority.value
                                ? "bg-blue-600 text-white"
                                : priority.color
                            }
                          >
                            {priority.label}
                          </Badge>
                          <p
                            className={`text-xs mt-1 ${
                              formData.priority === priority.value
                                ? "text-blue-700"
                                : "text-gray-600"
                            }`}
                          >
                            {priority.description}
                          </p>
                        </div>
                      </div>
                    </Card>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  ))}
                </div>
                {stepErrors?.priority && (
                  <p className="text-sm text-red-500">{stepErrors.priority}</p>
                )}
              </div>

              <div className="space-y-3">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <Label className="text-base font-medium text-gray-700">Risk Assessment</Label>
                <Select value={formData.riskLevel} onValueChange={value => updateFormData({ riskLevel: value as any })}>
=======
>>>>>>> 9b0ce35 (Initial commit)
                <Label className="text-base font-medium text-gray-700">
                  Risk Assessment
                </Label>
                <Select
                  value={formData.riskLevel || ""}
                  onValueChange={(value) =>
                    updateFormData({
                      riskLevel: value as "low" | "medium" | "high" | "critical",
                    })
                  }
                  disabled={isWorkflowLocked}
                >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
<<<<<<< HEAD
                    {riskLevels.map((risk) => (
=======
<<<<<<< HEAD
                    {riskLevels.map(risk => (
=======
                    {riskLevels.map((risk) => (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                      <SelectItem key={risk.value} value={risk.value}>
                        <span className={risk.color}>{risk.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <Label htmlFor="urgency" className="font-medium text-orange-800">
                    Urgent Requirement
                  </Label>
                  <p className="text-xs text-orange-600">Requires expedited processing</p>
                </div>
                <Switch id="urgency" checked={formData.urgency} onCheckedChange={checked => updateFormData({ urgency: checked })} className="bg-blue-700 hover:bg-blue-600 text-gray-300" />
              </div>
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <DollarSign className="h-5 w-5" />
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                Budget Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget" className="text-base font-medium text-gray-700">
                  Estimated Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="estimatedBudget" 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.estimatedBudget || ""} 
                    onChange={e => updateFormData({ estimatedBudget: parseFloat(e.target.value) || 0 })} 
                    className="pl-10 bg-gray-50" 
=======
>>>>>>> 9b0ce35 (Initial commit)
                  <Input
                    id="estimatedBudget"
                    type="number"
                    placeholder="0.00"
                    value={formData.estimatedBudget || ""}
                    onChange={e => updateFormData({ estimatedBudget: parseFloat(e.target.value) || 0 })}
                    className="bg-gray-50"
                    disabled={isWorkflowLocked}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  />
                </div>
                {stepErrors?.estimatedBudget && (
                  <p className="text-sm text-red-500">{stepErrors.estimatedBudget}</p>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <Label htmlFor="budgetApproved" className="font-medium text-green-800">
                    Budget Pre-approved
                  </Label>
                  <p className="text-xs text-green-600">Budget already approved by finance</p>
                </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <Switch id="budgetApproved" checked={formData.budgetApproved} onCheckedChange={checked => updateFormData({ budgetApproved: checked })} className="bg-blue-700 hover:bg-blue-600 text-gray-300" />
=======
>>>>>>> 9b0ce35 (Initial commit)
                <Switch
                  id="budgetApproved"
                  checked={formData.budgetApproved || false}
                  onCheckedChange={checked => updateFormData({ budgetApproved: checked })}
                  disabled={isWorkflowLocked}
                />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label htmlFor="complianceRequired" className="font-medium text-blue-800">
                    Compliance Required
                  </Label>
                  <p className="text-xs text-blue-600">Subject to regulatory compliance</p>
                </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <Switch id="complianceRequired" checked={formData.complianceRequired} onCheckedChange={checked => updateFormData({ complianceRequired: checked })} className="bg-blue-700 hover:bg-blue-600 text-gray-300" />
=======
>>>>>>> 9b0ce35 (Initial commit)
                <Switch
                  id="complianceRequired"
                  checked={formData.complianceRequired || false}
                  onCheckedChange={checked => updateFormData({ complianceRequired: checked })}
                  disabled={isWorkflowLocked}
                />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600">
          <FileText className="h-4 w-4" />
          Save as Draft
        </Button>
        <Button onClick={handleNext} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-medium">
          Continue to Details
        </Button>
=======
>>>>>>> 9b0ce35 (Initial commit)
      <div className="flex justify-end w-full">
        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            className="font-medium"
            onClick={handleSaveAsDraft}
            disabled={!formData.title || isWorkflowLocked}
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={!isStepFilled(1) }
          >
            {isWorkflowLocked ? 'Continue' : 'Continue to Details'}
          </Button>
        </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </div>
    </div>
  );
};

export default EnhancedBasicInfoStep;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)
// import React from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { AlertTriangle, User, Package, Wrench, Truck, Building, FileText } from "lucide-react";
// import { toast } from "sonner";

// interface EnhancedBasicInfoStepProps {
//   onNext: () => void;
// }

// const EnhancedBasicInfoStep: React.FC<EnhancedBasicInfoStepProps> = ({ onNext }) => {
//   const {
//     formData,
//     updateFormData,
//     validateStep,
//     stepErrors,
//     saveAsDraft,
//     isStepFilled,
//     saveCurrentState,
//     getHistory,
//     loadFromHistory
//   } = useRequirement();

//   const [showHistory, setShowHistory] = React.useState(false);
//   const history = getHistory();

//   const handleNext = () => {
//     if (validateStep(1)) {
//       saveCurrentState();
//       onNext();
//     } else {
//       toast.error("Please fill in all required fields");
//     }
//   };

//   const handleSaveAsDraft = () => {
//     if (!formData.title || formData.title.trim() === '') {
//       toast.error("Please enter a title before saving a draft.");
//       return;
//     }
//     saveAsDraft();
//     toast.success("Requirement saved as a draft!");
//   };

//   const handleLoadFromHistory = (version: number) => {
//     loadFromHistory(version);
//     setShowHistory(false);
//     toast.success(`Loaded version ${version}`);
//   };

//   const categoryOptions = [{
//     id: "Expert",
//     title: "Expert Services",
//     description: "Professional consulting & technical expertise",
//     icon: User,
//     color: "bg-blue-50 border-blue-200 text-blue-700"
//   }, {
//     id: "Product",
//     title: "Products & Materials",
//     description: "Equipment, spare parts & raw materials",
//     icon: Package,
//     color: "bg-green-50 border-green-200 text-green-700"
//   }, {
//     id: "Services",
//     title: "Contract Services",
//     description: "Maintenance, construction & support services",
//     icon: Wrench,
//     color: "bg-purple-50 border-purple-200 text-purple-700"
//   }, {
//     id: "Logistics",
//     title: "Logistics & Transport",
//     description: "Transportation, warehousing & distribution",
//     icon: Truck,
//     color: "bg-orange-50 border-orange-200 text-orange-700"
//   }];

//   const priorityOptions = [{
//     value: "critical",
//     label: "Critical",
//     color: "bg-red-100 text-red-800",
//     description: "Immediate action required, major impact."
//   }, {
//     value: "high",
//     label: "High",
//     color: "bg-orange-100 text-orange-800",
//     description: "Urgent, significant impact."
//   }, {
//     value: "medium",
//     label: "Medium",
//     color: "bg-yellow-100 text-yellow-800",
//     description: "Standard priority, moderate impact."
//   }, {
//     value: "low",
//     label: "Low",
//     color: "bg-gray-100 text-gray-800",
//     description: "Non-urgent, minimal impact."
//   }];
  
//   const riskLevels = [{
//     value: "critical",
//     label: "Critical Risk",
//     color: "text-red-600"
//   }, {
//     value: "high",
//     label: "High Risk",
//     color: "text-orange-600"
//   }, {
//     value: "medium",
//     label: "Medium Risk",
//     color: "text-yellow-600"
//   }, {
//     value: "low",
//     label: "Low Risk",
//     color: "text-green-600"
//   }];
  
//   const departments = [
//     "Engineering",
//     "Finance",
//     "HR",
//     "IT",
//     "Maintenance",
//     "Management",
//     "Operations",
//     "Procurement",
//     "Quality",
//     "Safety"
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
//             <p className="text-gray-600 mt-1">
//               Provide essential details for your procurement requirement
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//               Step 1 of 6
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* Version History Panel */}
//       {showHistory && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
//               Version History
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {history.length === 0 ? (
//                 <p className="text-gray-500">No history available</p>
//               ) : (
//                 <div className="space-y-3">
//                   {history.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//                       onClick={() => handleLoadFromHistory(item.version || index + 1)}
//                     >
//                       <div>
//                         <p className="font-medium">{item.title || 'Untitled Draft'}</p>
//                         <p className="text-sm text-gray-500">
//                           Version {item.version} - {new Date(item.lastModified || '').toLocaleString()}
//                         </p>
//                       </div>
//                       <Badge variant="outline">
//                         {item.status || 'draft'}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Form Section */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="bg-white border border-gray-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
//                 <FileText className="h-5 w-5" />
//                 Requirement Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="title" className="text-base font-medium text-gray-700">
//                   Requirement Title <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="title"
//                   placeholder="Enter a clear and descriptive title"
//                   value={formData.title || ''}
//                   onChange={e => updateFormData({ title: e.target.value })}
//                   className="text-base bg-gray-50"
//                 />
//                 {stepErrors?.title && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertTriangle className="h-4 w-4" />
//                     {stepErrors.title}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-3">
//                 <Label className="text-base font-medium text-gray-700">
//                   Category <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {categoryOptions.map(category => (
//                     <Card
//                       key={category.id}
//                       className={`flex items-center cursor-pointer p-4 transition-all hover:shadow-md border-2 ${
//                         formData.category === category.id
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-transparent bg-white hover:border-gray-200"
//                       }`}
//                       onClick={() => updateFormData({ category: category.id as "Product" | "Services" | "Expert" | "Logistics" })}
//                     >
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={formData.category === category.id}
//                         readOnly
//                         className="mr-4 flex-shrink-0"
//                       />
//                       <div className="flex items-start gap-3">
//                         <div className={`rounded-lg p-2 ${category.color}`}>
//                           <category.icon className="h-5 w-5" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-900 text-xl">{category.title}</h3>
//                           <p className="text-sm text-gray-600 mt-1">{category.description}</p>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//                 {stepErrors?.category && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertTriangle className="h-4 w-4" />
//                     {stepErrors.category}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="businessJustification" className="text-base font-medium text-gray-700">
//                   Business Justification <span className="text-red-500">*</span>
//                 </Label>
//                 <Textarea
//                   id="businessJustification"
//                   placeholder="Explain the business need and expected benefits (max 1000 characters)"
//                   value={formData.businessJustification || ''}
//                   onChange={e => {
//                     if (e.target.value.length <= 1000) {
//                       updateFormData({ businessJustification: e.target.value });
//                     }
//                   }}
//                   rows={4}
//                   className="resize-none bg-gray-50"
//                 />
//                 <div className="flex justify-between items-center">
//                   <div>
//                     {stepErrors?.businessJustification && (
//                       <p className="text-sm text-red-500 flex items-center gap-1">
//                         <AlertTriangle className="h-4 w-4" />
//                         {stepErrors.businessJustification}
//                       </p>
//                     )}
//                   </div>
//                   <span className={`text-xs ${(formData.businessJustification?.length || 0) >= 1000 ? 'text-red-500' : 'text-gray-500'}`}>
//                     {(formData.businessJustification?.length || 0)}/1000
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white border border-gray-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
//                 <Building className="h-5 w-5" />
//                 Organization Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="department" className="text-base font-medium text-gray-700">
//                     Department <span className="text-red-500">*</span>
//                   </Label>
//                   <Select
//                     value={formData.department || ''}
//                     onValueChange={value => updateFormData({ department: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select department" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {departments.map(dept => (
//                         <SelectItem key={dept} value={dept}>
//                           {dept}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {stepErrors?.department && (
//                     <p className="text-sm text-red-500">{stepErrors.department}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="costCenter" className="text-base font-medium text-gray-700">
//                     Cost Center <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="costCenter"
//                     placeholder="e.g., CC-001-ENG"
//                     value={formData.costCenter || ''}
//                     onChange={e => updateFormData({ costCenter: e.target.value })}
//                     className="bg-gray-50"
//                   />
//                   {stepErrors?.costCenter && (
//                     <p className="text-sm text-red-500">{stepErrors.costCenter}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="requestedBy" className="text-base font-medium text-gray-700">
//                   Requested By
//                 </Label>
//                 <Input readOnly
//                   id="requestedBy" 
//                   placeholder="Ram" 
//                   value={formData.requestedBy || ''} 
//                   onChange={e => updateFormData({ requestedBy: e.target.value })} 
//                   className="bg-gray-50" 
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar - Priority & Budget */}
//         <div className="space-y-6">
//           <Card className="bg-white border border-gray-100 shadow-sm">
//             <CardHeader className="pb-4">
//                <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
//                  <AlertTriangle className="h-5 w-5" />
//                  Priority & Risk
//                </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//                 <div className="rounded-lg border bg-orange-50 border-orange-200 p-3 transition-all hover:shadow-sm">
//                     <div className="flex items-center justify-between ">
//                         <div>
//                             <Label
//                                 htmlFor="urgency"
//                                 className="font-medium text-orange-800 "
//                             >
//                                 Emergency Requirement
//                             </Label>
//                             <p className="text-xs mt-1 text-orange-600">
//                                 Requires expedited processing
//                             </p>
//                         </div>
//                         <Switch
//                             id="urgency"
//                             checked={formData.urgency || false}
//                             onCheckedChange={(checked) => updateFormData({ urgency: checked })}
//                         />
//                     </div>
//                 </div>
//               <div className="space-y-3">
//                 <Label className="text-base font-medium text-gray-700">
//                   Priority Level <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="space-y-3">
//                   {priorityOptions.map((priority) => (
//                     <Card
//                       key={priority.value}
//                       className={`cursor-pointer p-3 transition-all hover:shadow-sm border-2 ${
//                         formData.priority === priority.value
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-transparent bg-white hover:border-gray-200"
//                       }`}
//                       onClick={() =>
//                         updateFormData({
//                           priority: priority.value as "low" | "medium" | "high" | "critical",
//                         })
//                       }
//                     >
//                       <div className="flex items-center">
//                         <input
//                           type="radio"
//                           name="priority"
//                           className="mr-3 flex-shrink-0"
//                           checked={formData.priority === priority.value}
//                           readOnly
//                         />
//                         <div className="flex-1">
//                             <Badge
//                                 className={
//                                     formData.priority === priority.value
//                                     ? "bg-blue-600 text-white"
//                                     : priority.color
//                                 }
//                             >
//                                 {priority.label}
//                             </Badge>
//                             <p
//                                 className={`text-xs mt-1 ${
//                                     formData.priority === priority.value
//                                     ? "text-blue-700"
//                                     : "text-gray-600"
//                                 }`}
//                             >
//                                 {priority.description}
//                             </p>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//                 {stepErrors?.priority && (
//                   <p className="text-sm text-red-500">{stepErrors.priority}</p>
//                 )}
//               </div>

//               <div className="space-y-3">
//                 <Label className="text-base font-medium text-gray-700">
//                   Risk Assessment
//                 </Label>
//                 <Select
//                   value={formData.riskLevel || ""}
//                   onValueChange={(value) =>
//                     updateFormData({
//                       riskLevel: value as "low" | "medium" | "high" | "critical",
//                     })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select risk level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {riskLevels.map((risk) => (
//                       <SelectItem key={risk.value} value={risk.value}>
//                         <span className={risk.color}>{risk.label}</span>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white border border-gray-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
//                 Budget Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="estimatedBudget" className="text-base font-medium text-gray-700">
//                   Estimated Budget <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="estimatedBudget"
//                     type="number"
//                     placeholder="0.00"
//                     value={formData.estimatedBudget || ""}
//                     onChange={e => updateFormData({ estimatedBudget: parseFloat(e.target.value) || 0 })}
//                     className="bg-gray-50"
//                   />
//                 </div>
//                 {stepErrors?.estimatedBudget && (
//                   <p className="text-sm text-red-500">{stepErrors.estimatedBudget}</p>
//                 )}
//               </div>

//               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
//                 <div>
//                   <Label htmlFor="budgetApproved" className="font-medium text-green-800">
//                     Budget Pre-approved
//                   </Label>
//                   <p className="text-xs text-green-600">Budget already approved by finance</p>
//                 </div>
//                 <Switch
//                   id="budgetApproved"
//                   checked={formData.budgetApproved || false}
//                   onCheckedChange={checked => updateFormData({ budgetApproved: checked })}
//                 />
//               </div>

//               <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
//                 <div>
//                   <Label htmlFor="complianceRequired" className="font-medium text-blue-800">
//                     Compliance Required
//                   </Label>
//                   <p className="text-xs text-blue-600">Subject to regulatory compliance</p>
//                 </div>
//                 <Switch
//                   id="complianceRequired"
//                   checked={formData.complianceRequired || false}
//                   onCheckedChange={checked => updateFormData({ complianceRequired: checked })}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end w-full">
//         <div className="flex items-center gap-x-3">
//           <Button
//             variant="outline"
//             className="font-medium"
//             onClick={handleSaveAsDraft}
//             disabled={!formData.title}
//           >
//             Save as Draft
//           </Button>
//           <Button
//             onClick={handleNext}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
//             disabled={!isStepFilled(1)}
//           >
//             Continue to Details
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
// export default EnhancedBasicInfoStep;
=======
// export default EnhancedBasicInfoStep;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
