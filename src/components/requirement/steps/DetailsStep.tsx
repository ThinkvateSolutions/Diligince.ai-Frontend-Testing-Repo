import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
<<<<<<< HEAD
import { format, addDays } from "date-fns";
=======
<<<<<<< HEAD
import { format } from "date-fns";
=======
import { format, addDays } from "date-fns";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<<<<<<< HEAD
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
=======
<<<<<<< HEAD
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
=======
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface DetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ onNext, onPrevious }) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  const { formData, updateFormData, validateStep, stepErrors } = useRequirement();
=======
>>>>>>> 9b0ce35 (Initial commit)
  const { 
    formData, 
    updateFormData, 
    validateStep, 
    isStepFilled, 
    stepErrors, 
    saveAsDraft,
    isWorkflowLocked
  } = useRequirement();
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  const handleNext = () => {
    if (validateStep(2)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

<<<<<<< HEAD
  const handleSaveAsDraft = async () => {
    if (!formData.title || formData.title.trim() === '') {
      toast.error("A title is required to save a draft.");
      return;
    }
    
    try {
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    }
  };

  const toDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    return new Date(`${dateString}T00:00:00`);
  };

  const handleDurationChange = (days: number) => {
    const duration = days >= 0 ? days : 0;
    updateFormData({ duration });
    if (formData.startDate) {
      updateFormData({ endDate: addDays(formData.startDate, duration) });
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    updateFormData({ startDate: date });
    if (date && formData.duration) {
      updateFormData({ endDate: addDays(date, formData.duration) });
    }
    if (!date) {
      updateFormData({ endDate: undefined, duration: 0 });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    updateFormData({ endDate: date });
    if (date && formData.startDate) {
      const diffInMs = date.getTime() - formData.startDate.getTime();
      const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
      updateFormData({ duration: diffInDays >= 0 ? diffInDays : 0 });
    }
  };

=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
  const expertSpecializations = [
    "Automation Engineer",
    "Electrical Engineer", 
    "Environmental Engineer",
    "Mechanical Engineer",
    "Process Engineer",
    "Quality Control Engineer",
    "Safety Engineer"
  ];

  const equipmentTypes = [
    "Container",
    "Crane",
    "Excavator", 
    "Forklift",
    "Loader",
    "Specialized Equipment",
    "Trailer",
    "Truck"
  ];

  const qualityRequirements = [ 
    "ISO 9001", 
    "Industry Standard", 
    "Premium Quality", 
    "Standard Quality", 
    "Economy" 
  ];

  const technicalStandardsOptions = [ 
    "ISO 9001:2015", 
    "ISO 14001:2015", 
    "ISO 45001:2018", 
    "ASME Standards", 
    "API Standards", 
    "ASTM Standards", 
    "IEC Standards", 
    "IEEE Standards", 
    "ANSI Standards", 
    "EN Standards" 
  ];

<<<<<<< HEAD
=======
  const certificationOptions = [
    "ISO 9001",
    "ISO 14001",
    "OHSAS 18001",
    "API",
    "ASME",
    "Six Sigma",
    "PMP",
    "Professional Engineer"
=======
  const handleSaveAsDraft = async () => {
    if (!formData.title || formData.title.trim() === '') {
      toast.error("A title is required to save a draft.");
      return;
    }
    
    try {
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    }
  };

  const toDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    return new Date(`${dateString}T00:00:00`);
  };

  const handleDurationChange = (days: number) => {
    const duration = days >= 0 ? days : 0;
    updateFormData({ duration });
    if (formData.startDate) {
      updateFormData({ endDate: addDays(formData.startDate, duration) });
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    updateFormData({ startDate: date });
    if (date && formData.duration) {
      updateFormData({ endDate: addDays(date, formData.duration) });
    }
    if (!date) {
      updateFormData({ endDate: undefined, duration: 0 });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    updateFormData({ endDate: date });
    if (date && formData.startDate) {
      const diffInMs = date.getTime() - formData.startDate.getTime();
      const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
      updateFormData({ duration: diffInDays >= 0 ? diffInDays : 0 });
    }
  };

  const expertSpecializations = [
    "Automation Engineer",
    "Electrical Engineer", 
    "Environmental Engineer",
    "Mechanical Engineer",
    "Process Engineer",
    "Quality Control Engineer",
    "Safety Engineer"
  ];

  const equipmentTypes = [
    "Container",
    "Crane",
    "Excavator", 
    "Forklift",
    "Loader",
    "Specialized Equipment",
    "Trailer",
    "Truck"
  ];

  const qualityRequirements = [ 
    "ISO 9001", 
    "Industry Standard", 
    "Premium Quality", 
    "Standard Quality", 
    "Economy" 
  ];

  const technicalStandardsOptions = [ 
    "ISO 9001:2015", 
    "ISO 14001:2015", 
    "ISO 45001:2018", 
    "ASME Standards", 
    "API Standards", 
    "ASTM Standards", 
    "IEC Standards", 
    "IEEE Standards", 
    "ANSI Standards", 
    "EN Standards" 
  ];

>>>>>>> 9b0ce35 (Initial commit)
  const certificationOptions = [ 
    "ISO 9001", 
    "ISO 14001", 
    "OHSAS 18001", 
    "API", 
    "ASME", 
    "Six Sigma", 
    "PMP", 
    "Professional Engineer" 
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
<<<<<<< HEAD
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Requirement Details</h2>
            <p className="text-gray-600 mt-1">
              Complete the specific details for your {formData.category} requirement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 2 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Expert Fields */}
      {formData.category === "Expert" && (
=======
<<<<<<< HEAD
        <h2 className="text-2xl font-bold text-gray-900">Requirement Details</h2>
        <p className="text-gray-600">
          Complete the specific details for your {formData.category} requirement
        </p>
      </div>

      {/* Expert Fields */}
      {formData.category === "expert" && (
=======
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Requirement Details</h2>
            <p className="text-gray-600 mt-1">
              Complete the specific details for your {formData.category} requirement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 2 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Expert Fields */}
      {formData.category === "Expert" && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Expert Services Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-base font-medium text-gray-700">
                Specialization <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => updateFormData({ specialization: value })}
<<<<<<< HEAD
                disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {expertSpecializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {stepErrors.specialization && (
                <p className="text-sm text-red-500">{stepErrors.specialization}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium text-gray-700">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
<<<<<<< HEAD
                placeholder="Describe the expertise required and tasks to be performed (max 1000 characters)"
=======
<<<<<<< HEAD
                placeholder="Describe the expertise required and tasks to be performed"
>>>>>>> 9b0ce35 (Initial commit)
                value={formData.description || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ description: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
              <div className="flex justify-between items-center">
                {stepErrors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.description}
                  </p>
                )}
                <span 
                  className={`text-xs ml-auto ${
                    (formData.description?.length || 0) >= 1000 
                      ? "text-red-500" 
                      : "text-gray-500"
                  }`}
                >
                  {formData.description?.length || 0}/1000
                </span>
              </div>
            </div>

            <div className="space-y-2">
<<<<<<< HEAD
              <Label className="text-base font-medium text-gray-700">
                Required Certifications <span className="text-red-500">*</span>
              </Label>
=======
              <Label className="text-base font-medium text-gray-700">Required Certifications</Label>
=======
                placeholder="Describe the expertise required and tasks to be performed (max 1000 characters)"
                value={formData.description || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ description: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
              <div className="flex justify-between items-center">
                {stepErrors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.description}
                  </p>
                )}
                <span 
                  className={`text-xs ml-auto ${
                    (formData.description?.length || 0) >= 1000 
                      ? "text-red-500" 
                      : "text-gray-500"
                  }`}
                >
                  {formData.description?.length || 0}/1000
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Required Certifications <span className="text-red-500">*</span>
              </Label>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {certificationOptions.map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cert-${cert}`}
                      checked={(formData.certifications || []).includes(cert)}
                      onCheckedChange={(checked) => {
                        const currentCerts = [...(formData.certifications || [])];
                        if (checked) {
                          currentCerts.push(cert);
                        } else {
                          const index = currentCerts.indexOf(cert);
                          if (index !== -1) currentCerts.splice(index, 1);
                        }
                        updateFormData({ certifications: currentCerts });
                      }}
<<<<<<< HEAD
                      disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                      disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    />
                    <label
                      htmlFor={`cert-${cert}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
<<<<<<< HEAD
              {stepErrors.certifications && (
                <p className="text-sm text-red-500">{stepErrors.certifications}</p>
              )}
=======
<<<<<<< HEAD
=======
              {stepErrors.certifications && (
                <p className="text-sm text-red-500">{stepErrors.certifications}</p>
              )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center text-gray-500"></span>
=======
<<<<<<< HEAD
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">Budget</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
=======
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center text-gray-500"></span>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    className="pl-8"
>>>>>>> 9b0ce35 (Initial commit)
                    value={formData.budget || ""}
                    onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
              </div>
              
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="duration" className="text-base font-medium text-gray-700">
                  Duration (days) <span className="text-red-500">*</span>
                </Label>
=======
                <Label htmlFor="duration" className="text-base font-medium text-gray-700">Duration (days)</Label>
=======
                    value={formData.budget || ""}
                    onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-base font-medium text-gray-700">
                  Duration (days) <span className="text-red-500">*</span>
                </Label>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter project duration"
                  value={formData.duration || ""}
<<<<<<< HEAD
                  onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
                  min="1"
                  disabled={isWorkflowLocked}
                />
                {stepErrors.duration && (
                  <p className="text-sm text-red-500">{stepErrors.duration}</p>
                )}
=======
<<<<<<< HEAD
                  onChange={(e) => updateFormData({ duration: parseInt(e.target.value) || 0 })}
                />
=======
                  onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
                  min="1"
                  disabled={isWorkflowLocked}
                />
                {stepErrors.duration && (
                  <p className="text-sm text-red-500">{stepErrors.duration}</p>
                )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="startDate" className="text-base font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => handleStartDateChange(toDate(e.target.value))}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.startDate && (
                  <p className="text-sm text-red-500">{stepErrors.startDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
=======
<<<<<<< HEAD
                <Label className="text-base font-medium text-gray-700">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate || undefined}
                      onSelect={(date) => updateFormData({ startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate || undefined}
                      onSelect={(date) => updateFormData({ endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
=======
                <Label htmlFor="startDate" className="text-base font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => handleStartDateChange(toDate(e.target.value))}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.startDate && (
                  <p className="text-sm text-red-500">{stepErrors.startDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
>>>>>>> 9b0ce35 (Initial commit)
                <Label htmlFor="endDate" className="text-base font-medium text-gray-700">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => handleEndDateChange(toDate(e.target.value))}
                  min={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : undefined}
                  disabled={!formData.startDate || isWorkflowLocked}
                />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Fields */}
<<<<<<< HEAD
      {formData.category === "Product" && (
=======
<<<<<<< HEAD
      {formData.category === "product" && (
=======
      {formData.category === "Product" && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productSpecifications" className="text-base font-medium text-gray-700">
                Product Specifications <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="productSpecifications"
                rows={4}
<<<<<<< HEAD
                placeholder="Detailed specifications of the required product (max 1000 characters)"
=======
<<<<<<< HEAD
                placeholder="Detailed specifications of the required product"
>>>>>>> 9b0ce35 (Initial commit)
                value={formData.productSpecifications || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ productSpecifications: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
<<<<<<< HEAD
=======
              {stepErrors.productSpecifications && (
                <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
              )}
=======
                placeholder="Detailed specifications of the required product (max 1000 characters)"
                value={formData.productSpecifications || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ productSpecifications: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
>>>>>>> 9b0ce35 (Initial commit)
              <div className="flex justify-between items-center">
                {stepErrors.productSpecifications ? (
                  <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
                ) : (
                  <div></div>
                )}
                <p className={`text-xs ${
                  (formData.productSpecifications?.length || 0) >= 1000 
                    ? "text-red-500" 
                    : "text-gray-500"
                }`}>
                  {formData.productSpecifications?.length || 0}/1000
                </p>
              </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Technical Standards <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {technicalStandardsOptions.map((standard) => (
                  <div key={standard} className="flex items-center space-x-2">
                    <Checkbox
                      id={`standard-${standard}`}
                      checked={(formData.technicalStandards || []).includes(standard)}
                      onCheckedChange={(checked) => {
                        const currentStandards = [...(formData.technicalStandards || [])];
                        if (checked) {
                          currentStandards.push(standard);
                        } else {
                          const index = currentStandards.indexOf(standard);
                          if (index !== -1) currentStandards.splice(index, 1);
                        }
                        updateFormData({ technicalStandards: currentStandards });
                      }}
<<<<<<< HEAD
                      disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                      disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    />
                    <label
                      htmlFor={`standard-${standard}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {standard}
                    </label>
                  </div>
                ))}
              </div>
              {stepErrors.technicalStandards && (
                <p className="text-sm text-red-500">{stepErrors.technicalStandards}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-base font-medium text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity required"
                  value={formData.quantity || ""}
                  onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 0 })}
<<<<<<< HEAD
                  min="1"
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  min="1"
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
                {stepErrors.quantity && (
                  <p className="text-sm text-red-500">{stepErrors.quantity}</p>
                )}
              </div>
              
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
=======
<<<<<<< HEAD
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">Budget</Label>
=======
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    className="pl-8"
                    value={formData.budget || ""}
                    onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
<<<<<<< HEAD
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
=======
<<<<<<< HEAD
                  />
                </div>
=======
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="productDeliveryDate" className="text-base font-medium text-gray-700">
                  Delivery Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productDeliveryDate"
                  type="date"
                  value={formData.productDeliveryDate ? format(formData.productDeliveryDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ productDeliveryDate: toDate(e.target.value) })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.productDeliveryDate && (
                  <p className="text-sm text-red-500">{stepErrors.productDeliveryDate}</p>
                )}
=======
<<<<<<< HEAD
                <Label className="text-base font-medium text-gray-700">Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.productDeliveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.productDeliveryDate ? (
                        format(formData.productDeliveryDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.productDeliveryDate || undefined}
                      onSelect={(date) => updateFormData({ productDeliveryDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
>>>>>>> 9b0ce35 (Initial commit)
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qualityRequirements" className="text-base font-medium text-gray-700">
                  Quality Requirements <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.qualityRequirements}
                  onValueChange={(value) => updateFormData({ qualityRequirements: value })}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
=======
                <Label htmlFor="productDeliveryDate" className="text-base font-medium text-gray-700">
                  Delivery Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productDeliveryDate"
                  type="date"
                  value={formData.productDeliveryDate ? format(formData.productDeliveryDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ productDeliveryDate: toDate(e.target.value) })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.productDeliveryDate && (
                  <p className="text-sm text-red-500">{stepErrors.productDeliveryDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qualityRequirements" className="text-base font-medium text-gray-700">
                  Quality Requirements <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.qualityRequirements}
                  onValueChange={(value) => updateFormData({ qualityRequirements: value })}
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality level" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityRequirements.map((quality) => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
<<<<<<< HEAD
                {stepErrors.qualityRequirements && (
                  <p className="text-sm text-red-500">{stepErrors.qualityRequirements}</p>
                )}
=======
<<<<<<< HEAD
=======
                {stepErrors.qualityRequirements && (
                  <p className="text-sm text-red-500">{stepErrors.qualityRequirements}</p>
                )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Fields */}
<<<<<<< HEAD
      {formData.category === "Services" && (
=======
<<<<<<< HEAD
      {formData.category === "service" && (
=======
      {formData.category === "Services" && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
<<<<<<< HEAD
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="serviceDescription" className="text-base font-medium text-gray-700">
                  Service Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="serviceDescription"
                  rows={3}
                  placeholder="Describe the service required (max 1000 characters)"
                  value={formData.serviceDescription || ""}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      updateFormData({ serviceDescription: e.target.value });
                    }
                  }}
                  className="resize-none"
                  disabled={isWorkflowLocked}
                />
                <div className="flex justify-between items-center">
                  {stepErrors.serviceDescription ? (
                    <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
                  ) : (
                    <div></div>
                  )}
                  <p className={`text-xs ${
                    (formData.serviceDescription?.length || 0) >= 1000 
                      ? "text-red-500" 
                      : "text-gray-500"
                  }`}>
                    {formData.serviceDescription?.length || 0}/1000
                  </p>
                </div>
              </div>

=======
<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="serviceDescription" className="text-base font-medium text-gray-700">
                Service Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="serviceDescription"
                rows={3}
                placeholder="Describe the service required"
                value={formData.serviceDescription || ""}
                onChange={(e) => updateFormData({ serviceDescription: e.target.value })}
              />
              {stepErrors.serviceDescription && (
                <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scopeOfWork" className="text-base font-medium text-gray-700">
                Scope of Work <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="scopeOfWork"
                rows={4}
                placeholder="Detailed scope of work, including deliverables and milestones"
                value={formData.scopeOfWork || ""}
                onChange={(e) => updateFormData({ scopeOfWork: e.target.value })}
              />
              {stepErrors.scopeOfWork && (
                <p className="text-sm text-red-500">{stepErrors.scopeOfWork}</p>
              )}
=======
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="serviceDescription" className="text-base font-medium text-gray-700">
                  Service Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="serviceDescription"
                  rows={3}
                  placeholder="Describe the service required (max 1000 characters)"
                  value={formData.serviceDescription || ""}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      updateFormData({ serviceDescription: e.target.value });
                    }
                  }}
                  className="resize-none"
                  disabled={isWorkflowLocked}
                />
                <div className="flex justify-between items-center">
                  {stepErrors.serviceDescription ? (
                    <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
                  ) : (
                    <div></div>
                  )}
                  <p className={`text-xs ${
                    (formData.serviceDescription?.length || 0) >= 1000 
                      ? "text-red-500" 
                      : "text-gray-500"
                  }`}>
                    {formData.serviceDescription?.length || 0}/1000
                  </p>
                </div>
              </div>

>>>>>>> 9b0ce35 (Initial commit)
              <div className="space-y-2">
                <Label htmlFor="scopeOfWork" className="text-base font-medium text-gray-700">
                  Scope of Work <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="scopeOfWork"
                  rows={4}
                  placeholder="Detailed scope of work, including deliverables and milestones (max 1000 characters)"
                  value={formData.scopeOfWork || ""}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      updateFormData({ scopeOfWork: e.target.value });
                    }
                  }}
                  className="resize-none"
                  disabled={isWorkflowLocked}
                />
                <div className="flex justify-between items-center">
                  {stepErrors.scopeOfWork ? (
                    <p className="text-sm text-red-500">{stepErrors.scopeOfWork}</p>
                  ) : (
                    <div></div>
                  )}
                  <p className={`text-xs ${
                    (formData.scopeOfWork?.length || 0) >= 1000 
                      ? "text-red-500" 
                      : "text-gray-500"
                  }`}>
                    {formData.scopeOfWork?.length || 0}/1000
                  </p>
                </div>
              </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>

            <div className="space-y-2">
              <Label htmlFor="performanceMetrics" className="text-base font-medium text-gray-700">
                Performance Metrics <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="performanceMetrics"
                rows={3}
                placeholder="Define measurable performance indicators and success criteria"
                value={formData.performanceMetrics || ""}
                onChange={(e) => updateFormData({ performanceMetrics: e.target.value })}
<<<<<<< HEAD
                disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              />
              {stepErrors.performanceMetrics && (
                <p className="text-sm text-red-500">{stepErrors.performanceMetrics}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="serviceStartDate" className="text-base font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="serviceStartDate"
                  type="date"
                  value={formData.serviceStartDate ? format(formData.serviceStartDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const startDate = e.target.value ? new Date(e.target.value) : null;
                    updateFormData({ 
                      serviceStartDate: startDate,
                      serviceEndDate: formData.serviceEndDate && startDate && formData.serviceEndDate < startDate 
                        ? null 
                        : formData.serviceEndDate
                    });
                  }}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                  disabled={isWorkflowLocked}
                />
                {stepErrors.serviceStartDate && (
                  <p className="text-sm text-red-500">{stepErrors.serviceStartDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
=======
<<<<<<< HEAD
                <Label className="text-base font-medium text-gray-700">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.serviceStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.serviceStartDate ? (
                        format(formData.serviceStartDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.serviceStartDate || undefined}
                      onSelect={(date) => updateFormData({ serviceStartDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.serviceEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.serviceEndDate ? (
                        format(formData.serviceEndDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.serviceEndDate || undefined}
                      onSelect={(date) => updateFormData({ serviceEndDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
=======
                <Label htmlFor="serviceStartDate" className="text-base font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="serviceStartDate"
                  type="date"
                  value={formData.serviceStartDate ? format(formData.serviceStartDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const startDate = e.target.value ? new Date(e.target.value) : null;
                    updateFormData({ 
                      serviceStartDate: startDate,
                      serviceEndDate: formData.serviceEndDate && startDate && formData.serviceEndDate < startDate 
                        ? null 
                        : formData.serviceEndDate
                    });
                  }}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                  disabled={isWorkflowLocked}
                />
                {stepErrors.serviceStartDate && (
                  <p className="text-sm text-red-500">{stepErrors.serviceStartDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
>>>>>>> 9b0ce35 (Initial commit)
                <Label htmlFor="serviceEndDate" className="text-base font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="serviceEndDate"  
                  type="date"
                  value={formData.serviceEndDate ? format(formData.serviceEndDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ serviceEndDate: e.target.value ? new Date(e.target.value) : null })}
                  min={formData.serviceStartDate 
                    ? format(formData.serviceStartDate, 'yyyy-MM-dd') 
                    : format(new Date(), 'yyyy-MM-dd')
                  }
                  disabled={!formData.serviceStartDate || isWorkflowLocked}
                  required
                />
                {stepErrors.serviceEndDate && (
                  <p className="text-sm text-red-500">{stepErrors.serviceEndDate}</p>
                )}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
=======
<<<<<<< HEAD
                <Label htmlFor="serviceBudget" className="text-base font-medium text-gray-700">Budget</Label>
>>>>>>> 9b0ce35 (Initial commit)
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    className="pl-8"
                    value={formData.budget || ""}
                    onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
<<<<<<< HEAD
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
=======
=======
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    className="pl-8"
                    value={formData.budget || ""}
                    onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Service location"
                  value={formData.location || ""}
                  onChange={(e) => updateFormData({ location: e.target.value })}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
                {stepErrors.location && (
                  <p className="text-sm text-red-500">{stepErrors.location}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Logistics Fields */}
<<<<<<< HEAD
      {formData.category === "Logistics" && (
=======
<<<<<<< HEAD
      {formData.category === "logistics" && (
=======
      {formData.category === "Logistics" && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Logistics Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="equipmentType" className="text-base font-medium text-gray-700">
                Equipment Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.equipmentType}
                onValueChange={(value) => updateFormData({ equipmentType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment type" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map((equip) => (
                    <SelectItem key={equip} value={equip}>{equip}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {stepErrors.equipmentType && (
                <p className="text-sm text-red-500">{stepErrors.equipmentType}</p>
              )}
=======
>>>>>>> 9b0ce35 (Initial commit)
            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <Label htmlFor="equipmentType" className="text-base font-medium text-gray-700">
                  Equipment Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.equipmentType}
                  onValueChange={(value) => updateFormData({ equipmentType: value })}
                  disabled={isWorkflowLocked}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((equip) => (
                      <SelectItem key={equip} value={equip}>
                        {equip}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {stepErrors.equipmentType && (
                  <p className="text-sm text-red-500">{stepErrors.equipmentType}</p>
                )}
              </div>

              <div className="w-1/2 space-y-2">
                <Label htmlFor="budget" className="text-base font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    className="pl-8"
                    value={formData.budget || ""}
                    onChange={(e) =>
                      updateFormData({ budget: parseFloat(e.target.value) || 0 })
                    }
                    min="0"
                    step="0.01"
                    disabled={isWorkflowLocked}
                  />
                </div>
                {stepErrors.budget && (
                  <p className="text-sm text-red-500">{stepErrors.budget}</p>
                )}
              </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="weight" className="text-base font-medium text-gray-700">
                  Weight (kg)
                </Label>
=======
<<<<<<< HEAD
                <Label htmlFor="weight" className="text-base font-medium text-gray-700">Weight (kg)</Label>
=======
                <Label htmlFor="weight" className="text-base font-medium text-gray-700">
                  Weight (kg)
                </Label>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight || ""}
                  onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || 0 })}
<<<<<<< HEAD
                  min="0"
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  min="0"
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
              </div>
              
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="dimensions" className="text-base font-medium text-gray-700">
                  Dimensions
                </Label>
=======
<<<<<<< HEAD
                <Label htmlFor="dimensions" className="text-base font-medium text-gray-700">Dimensions</Label>
=======
                <Label htmlFor="dimensions" className="text-base font-medium text-gray-700">
                  Dimensions
                </Label>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <Input
                  id="dimensions"
                  placeholder="Length x Width x Height"
                  value={formData.dimensions || ""}
                  onChange={(e) => updateFormData({ dimensions: e.target.value })}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation" className="text-base font-medium text-gray-700">
                  Pickup Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pickupLocation"
                  placeholder="Enter pickup location"
                  value={formData.pickupLocation || ""}
                  onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
                {stepErrors.pickupLocation && (
                  <p className="text-sm text-red-500">{stepErrors.pickupLocation}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryLocation" className="text-base font-medium text-gray-700">
                  Delivery Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deliveryLocation"
                  placeholder="Enter delivery location"
                  value={formData.deliveryLocation || ""}
                  onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
                  disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                />
                {stepErrors.deliveryLocation && (
                  <p className="text-sm text-red-500">{stepErrors.deliveryLocation}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="pickupDate" className="text-base font-medium text-gray-700">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ pickupDate: toDate(e.target.value) })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.pickupDate && (
                  <p className="text-sm text-red-500">{stepErrors.pickupDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
=======
<<<<<<< HEAD
                <Label className="text-base font-medium text-gray-700">Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.pickupDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.pickupDate ? (
                        format(formData.pickupDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.pickupDate || undefined}
                      onSelect={(date) => updateFormData({ pickupDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deliveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deliveryDate ? (
                        format(formData.deliveryDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deliveryDate || undefined}
                      onSelect={(date) => updateFormData({ deliveryDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
=======
                <Label htmlFor="pickupDate" className="text-base font-medium text-gray-700">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ pickupDate: toDate(e.target.value) })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  disabled={isWorkflowLocked}
                />
                {stepErrors.pickupDate && (
                  <p className="text-sm text-red-500">{stepErrors.pickupDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
>>>>>>> 9b0ce35 (Initial commit)
                <Label htmlFor="deliveryDate" className="text-base font-medium text-gray-700">
                  Delivery Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate ? format(formData.deliveryDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => updateFormData({ deliveryDate: toDate(e.target.value) })}
                  min={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : undefined}
                  disabled={!formData.pickupDate || isWorkflowLocked}
                />
                {stepErrors.deliveryDate && (
                  <p className="text-sm text-red-500">{stepErrors.deliveryDate}</p>
                )}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
            </div>

            <div className="space-y-2">
<<<<<<< HEAD
              <Label htmlFor="specialHandling" className="text-base font-medium text-gray-700">
                Special Handling Requirements
              </Label>
=======
<<<<<<< HEAD
              <Label htmlFor="specialHandling" className="text-base font-medium text-gray-700">Special Handling Requirements</Label>
>>>>>>> 9b0ce35 (Initial commit)
              <Textarea
                id="specialHandling"
                rows={3}
                placeholder="Any special handling instructions (max 1000 characters)"
                value={formData.specialHandling || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ specialHandling: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
<<<<<<< HEAD
=======
=======
              <Label htmlFor="specialHandling" className="text-base font-medium text-gray-700">
                Special Handling Requirements
              </Label>
              <Textarea
                id="specialHandling"
                rows={3}
                placeholder="Any special handling instructions (max 1000 characters)"
                value={formData.specialHandling || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateFormData({ specialHandling: e.target.value });
                  }
                }}
                className="resize-none"
                disabled={isWorkflowLocked}
              />
>>>>>>> 9b0ce35 (Initial commit)
              <div className="flex justify-end">
                <p className={`text-xs ${
                  (formData.specialHandling?.length || 0) >= 1000 
                    ? "text-red-500" 
                    : "text-gray-500"
                }`}>
                  {formData.specialHandling?.length || 0}/1000
                </p>
              </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>
          </CardContent>
        </Card>
      )}

<<<<<<< HEAD
      <div className="flex justify-between items-center pt-6">
=======
<<<<<<< HEAD
      <div className="flex justify-between pt-6">
>>>>>>> 9b0ce35 (Initial commit)
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
<<<<<<< HEAD
=======
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Next
        </Button>
=======
      <div className="flex justify-between items-center pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
>>>>>>> 9b0ce35 (Initial commit)

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
            disabled={(!isStepFilled(2) && !isWorkflowLocked) || (isWorkflowLocked && !isStepFilled(2))}
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

export default DetailsStep;
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
// import { toast } from "sonner";
// import { format, addDays } from "date-fns";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AlertTriangle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface DetailsStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// const DetailsStep: React.FC<DetailsStepProps> = ({ onNext, onPrevious }) => {
//   const { formData, updateFormData, validateStep,isStepFilled, stepErrors, saveAsDraft } = useRequirement();

//   const handleNext = () => {
//     if (validateStep(2)) {
//       onNext();
//     } else {
//       toast.error("Please fill in all required fields");
//     }
//   };

//   const handleSaveAsDraft = async () => {
//     if (!formData.title || formData.title.trim() === '') {
//       toast.error("A title is required to save a draft.");
//       return;
//     }
    
//     try {
//       await saveAsDraft();
//       toast.success("Draft saved successfully!");
//     } catch (error) {
//       console.error("Error saving draft:", error);
//       toast.error("Failed to save draft. Please try again.");
//     }
//   };

//   const toDate = (dateString: string): Date | undefined => {
//     if (!dateString) return undefined;
//     return new Date(`${dateString}T00:00:00`);
//   };

//   const handleDurationChange = (days: number) => {
//     const duration = days >= 0 ? days : 0;
//     updateFormData({ duration });
//     if (formData.startDate) {
//       updateFormData({ endDate: addDays(formData.startDate, duration) });
//     }
//   };

//   const handleStartDateChange = (date: Date | undefined) => {
//     updateFormData({ startDate: date });
//     if (date && formData.duration) {
//       updateFormData({ endDate: addDays(date, formData.duration) });
//     }
//     if (!date) {
//       updateFormData({ endDate: undefined, duration: 0 });
//     }
//   };

//   const handleEndDateChange = (date: Date | undefined) => {
//     updateFormData({ endDate: date });
//     if (date && formData.startDate) {
//       const diffInMs = date.getTime() - formData.startDate.getTime();
//       const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
//       updateFormData({ duration: diffInDays >= 0 ? diffInDays : 0 });
//     }
//   };

//   const expertSpecializations = [
//     "Automation Engineer",
//     "Electrical Engineer", 
//     "Environmental Engineer",
//     "Mechanical Engineer",
//     "Process Engineer",
//     "Quality Control Engineer",
//     "Safety Engineer"
//   ];

//   const equipmentTypes = [
//     "Container",
//     "Crane",
//     "Excavator", 
//     "Forklift",
//     "Loader",
//     "Specialized Equipment",
//     "Trailer",
//     "Truck"
//   ];

//   const qualityRequirements = [ 
//     "ISO 9001", 
//     "Industry Standard", 
//     "Premium Quality", 
//     "Standard Quality", 
//     "Economy" 
//   ];

//   const technicalStandardsOptions = [ 
//     "ISO 9001:2015", 
//     "ISO 14001:2015", 
//     "ISO 45001:2018", 
//     "ASME Standards", 
//     "API Standards", 
//     "ASTM Standards", 
//     "IEC Standards", 
//     "IEEE Standards", 
//     "ANSI Standards", 
//     "EN Standards" 
//   ];

//   const certificationOptions = [ 
//     "ISO 9001", 
//     "ISO 14001", 
//     "OHSAS 18001", 
//     "API", 
//     "ASME", 
//     "Six Sigma", 
//     "PMP", 
//     "Professional Engineer" 
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Requirement Details</h2>
//             <p className="text-gray-600 mt-1">
//               Complete the specific details for your {formData.category} requirement
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//               Step 2 of 6
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* Expert Fields */}
//       {formData.category === "Expert" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Expert Services Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="specialization" className="text-base font-medium text-gray-700">
//                 Specialization <span className="text-red-500">*</span>
//               </Label>
//               <Select
//                 value={formData.specialization}
//                 onValueChange={(value) => updateFormData({ specialization: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select specialization" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {expertSpecializations.map((spec) => (
//                     <SelectItem key={spec} value={spec}>{spec}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {stepErrors.specialization && (
//                 <p className="text-sm text-red-500">{stepErrors.specialization}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description" className="text-base font-medium text-gray-700">
//                 Detailed Description <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="description"
//                 rows={4}
//                 placeholder="Describe the expertise required and tasks to be performed (max 1000 characters)"
//                 value={formData.description || ""}
//                 onChange={(e) => {
//                   if (e.target.value.length <= 1000) {
//                     updateFormData({ description: e.target.value });
//                   }
//                 }}
//                 className="resize-none"
//               />
//               <div className="flex justify-between items-center">
//                 {stepErrors.description && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     <AlertTriangle className="h-4 w-4" />
//                     {stepErrors.description}
//                   </p>
//                 )}
//                 <span 
//                   className={`text-xs ml-auto ${
//                     (formData.description?.length || 0) >= 1000 
//                       ? "text-red-500" 
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {formData.description?.length || 0}/1000
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-base font-medium text-gray-700">
//                 Required Certifications <span className="text-red-500">*</span>
//               </Label>
//               <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                 {certificationOptions.map((cert) => (
//                   <div key={cert} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`cert-${cert}`}
//                       checked={(formData.certifications || []).includes(cert)}
//                       onCheckedChange={(checked) => {
//                         const currentCerts = [...(formData.certifications || [])];
//                         if (checked) {
//                           currentCerts.push(cert);
//                         } else {
//                           const index = currentCerts.indexOf(cert);
//                           if (index !== -1) currentCerts.splice(index, 1);
//                         }
//                         updateFormData({ certifications: currentCerts });
//                       }}
//                     />
//                     <label
//                       htmlFor={`cert-${cert}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {cert}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {stepErrors.certifications && (
//                 <p className="text-sm text-red-500">{stepErrors.certifications}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center text-gray-500"></span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
                    
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="duration" className="text-base font-medium text-gray-700">
//                   Duration (days) <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="duration"
//                   type="number"
//                   placeholder="Enter project duration"
//                   value={formData.duration || ""}
//                   onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
//                   min="1"
//                 />
//                 {stepErrors.duration && (
//                   <p className="text-sm text-red-500">{stepErrors.duration}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="startDate" className="text-base font-medium text-gray-700">
//                   Start Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="startDate"
//                   type="date"
//                   value={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => handleStartDateChange(toDate(e.target.value))}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.startDate && (
//                   <p className="text-sm text-red-500">{stepErrors.startDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="endDate" className="text-base font-medium text-gray-700">
//                   End Date
//                 </Label>
//                 <Input
//                   id="endDate"
//                   type="date"
//                   value={formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => handleEndDateChange(toDate(e.target.value))}
//                   min={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : undefined}
//                   disabled={!formData.startDate}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Product Fields */}
//       {formData.category === "Product" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Product Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="productSpecifications" className="text-base font-medium text-gray-700">
//                 Product Specifications <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="productSpecifications"
//                 rows={4}
//                 placeholder="Detailed specifications of the required product (max 1000 characters)"
//                 value={formData.productSpecifications || ""}
//                 onChange={(e) => {
//                   if (e.target.value.length <= 1000) {
//                     updateFormData({ productSpecifications: e.target.value });
//                   }
//                 }}
//                 className="resize-none"
//               />
//               <div className="flex justify-between items-center">
//                 {stepErrors.productSpecifications ? (
//                   <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
//                 ) : (
//                   <div></div>
//                 )}
//                 <p className={`text-xs ${
//                   (formData.productSpecifications?.length || 0) >= 1000 
//                     ? "text-red-500" 
//                     : "text-gray-500"
//                 }`}>
//                   {formData.productSpecifications?.length || 0}/1000
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-base font-medium text-gray-700">
//                 Technical Standards <span className="text-red-500">*</span>
//               </Label>
//               <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                 {technicalStandardsOptions.map((standard) => (
//                   <div key={standard} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`standard-${standard}`}
//                       checked={(formData.technicalStandards || []).includes(standard)}
//                       onCheckedChange={(checked) => {
//                         const currentStandards = [...(formData.technicalStandards || [])];
//                         if (checked) {
//                           currentStandards.push(standard);
//                         } else {
//                           const index = currentStandards.indexOf(standard);
//                           if (index !== -1) currentStandards.splice(index, 1);
//                         }
//                         updateFormData({ technicalStandards: currentStandards });
//                       }}
//                     />
//                     <label
//                       htmlFor={`standard-${standard}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {standard}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {stepErrors.technicalStandards && (
//                 <p className="text-sm text-red-500">{stepErrors.technicalStandards}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="quantity" className="text-base font-medium text-gray-700">
//                   Quantity <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   placeholder="Enter quantity required"
//                   value={formData.quantity || ""}
//                   onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 0 })}
//                   min="1"
//                 />
//                 {stepErrors.quantity && (
//                   <p className="text-sm text-red-500">{stepErrors.quantity}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
//                     className="pl-8"
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="productDeliveryDate" className="text-base font-medium text-gray-700">
//                   Delivery Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="productDeliveryDate"
//                   type="date"
//                   value={formData.productDeliveryDate ? format(formData.productDeliveryDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ productDeliveryDate: toDate(e.target.value) })}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.productDeliveryDate && (
//                   <p className="text-sm text-red-500">{stepErrors.productDeliveryDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="qualityRequirements" className="text-base font-medium text-gray-700">
//                   Quality Requirements <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.qualityRequirements}
//                   onValueChange={(value) => updateFormData({ qualityRequirements: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select quality level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {qualityRequirements.map((quality) => (
//                       <SelectItem key={quality} value={quality}>{quality}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {stepErrors.qualityRequirements && (
//                   <p className="text-sm text-red-500">{stepErrors.qualityRequirements}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Service Fields */}
//       {formData.category === "Services" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Service Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="serviceDescription" className="text-base font-medium text-gray-700">
//                   Service Description <span className="text-red-500">*</span>
//                 </Label>
//                 <Textarea
//                   id="serviceDescription"
//                   rows={3}
//                   placeholder="Describe the service required (max 1000 characters)"
//                   value={formData.serviceDescription || ""}
//                   onChange={(e) => {
//                     if (e.target.value.length <= 1000) {
//                       updateFormData({ serviceDescription: e.target.value });
//                     }
//                   }}
//                   className="resize-none"
//                 />
//                 <div className="flex justify-between items-center">
//                   {stepErrors.serviceDescription ? (
//                     <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
//                   ) : (
//                     <div></div>
//                   )}
//                   <p className={`text-xs ${
//                     (formData.serviceDescription?.length || 0) >= 1000 
//                       ? "text-red-500" 
//                       : "text-gray-500"
//                   }`}>
//                     {formData.serviceDescription?.length || 0}/1000
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="scopeOfWork" className="text-base font-medium text-gray-700">
//                   Scope of Work <span className="text-red-500">*</span>
//                 </Label>
//                 <Textarea
//                   id="scopeOfWork"
//                   rows={4}
//                   placeholder="Detailed scope of work, including deliverables and milestones (max 1000 characters)"
//                   value={formData.scopeOfWork || ""}
//                   onChange={(e) => {
//                     if (e.target.value.length <= 1000) {
//                       updateFormData({ scopeOfWork: e.target.value });
//                     }
//                   }}
//                   className="resize-none"
//                 />
//                 <div className="flex justify-between items-center">
//                   {stepErrors.scopeOfWork ? (
//                     <p className="text-sm text-red-500">{stepErrors.scopeOfWork}</p>
//                   ) : (
//                     <div></div>
//                   )}
//                   <p className={`text-xs ${
//                     (formData.scopeOfWork?.length || 0) >= 1000 
//                       ? "text-red-500" 
//                       : "text-gray-500"
//                   }`}>
//                     {formData.scopeOfWork?.length || 0}/1000
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="performanceMetrics" className="text-base font-medium text-gray-700">
//                 Performance Metrics <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="performanceMetrics"
//                 rows={3}
//                 placeholder="Define measurable performance indicators and success criteria"
//                 value={formData.performanceMetrics || ""}
//                 onChange={(e) => updateFormData({ performanceMetrics: e.target.value })}
//               />
//               {stepErrors.performanceMetrics && (
//                 <p className="text-sm text-red-500">{stepErrors.performanceMetrics}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="serviceStartDate" className="text-base font-medium text-gray-700">
//                   Start Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="serviceStartDate"
//                   type="date"
//                   value={formData.serviceStartDate ? format(formData.serviceStartDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => {
//                     const startDate = e.target.value ? new Date(e.target.value) : null;
//                     updateFormData({ 
//                       serviceStartDate: startDate,
//                       serviceEndDate: formData.serviceEndDate && startDate && formData.serviceEndDate < startDate 
//                         ? null 
//                         : formData.serviceEndDate
//                     });
//                   }}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                   required
//                 />
//                 {stepErrors.serviceStartDate && (
//                   <p className="text-sm text-red-500">{stepErrors.serviceStartDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="serviceEndDate" className="text-base font-medium text-gray-700">
//                   End Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="serviceEndDate"  
//                   type="date"
//                   value={formData.serviceEndDate ? format(formData.serviceEndDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ serviceEndDate: e.target.value ? new Date(e.target.value) : null })}
//                   min={formData.serviceStartDate 
//                     ? format(formData.serviceStartDate, 'yyyy-MM-dd') 
//                     : format(new Date(), 'yyyy-MM-dd')
//                   }
//                   disabled={!formData.serviceStartDate}
//                   required
//                 />
//                 {stepErrors.serviceEndDate && (
//                   <p className="text-sm text-red-500">{stepErrors.serviceEndDate}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
//                     className="pl-8"
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="location" className="text-base font-medium text-gray-700">
//                   Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="location"
//                   placeholder="Service location"
//                   value={formData.location || ""}
//                   onChange={(e) => updateFormData({ location: e.target.value })}
//                 />
//                 {stepErrors.location && (
//                   <p className="text-sm text-red-500">{stepErrors.location}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Logistics Fields */}
//       {formData.category === "Logistics" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Logistics Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex gap-4">
//                   {/* Equipment Type */}
//                   <div className="w-1/2 space-y-2">
//                     <Label htmlFor="equipmentType" className="text-base font-medium text-gray-700">
//                       Equipment Type <span className="text-red-500">*</span>
//                     </Label>
//                     <Select
//                       value={formData.equipmentType}
//                       onValueChange={(value) => updateFormData({ equipmentType: value })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select equipment type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {equipmentTypes.map((equip) => (
//                           <SelectItem key={equip} value={equip}>
//                             {equip}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     {stepErrors.equipmentType && (
//                       <p className="text-sm text-red-500">{stepErrors.equipmentType}</p>
//                     )}
//                   </div>

//                   {/* Budget */}
//                   <div className="w-1/2 space-y-2">
//                     <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                       Budget <span className="text-red-500">*</span>
//                     </Label>
//                     <div className="relative">
//                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                       <Input
//                         id="budget"
//                         type="number"
//                         placeholder="Enter budget amount"
//                         className="pl-8"
//                         value={formData.budget || ""}
//                         onChange={(e) =>
//                           updateFormData({ budget: parseFloat(e.target.value) || 0 })
//                         }
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                     {stepErrors.budget && (
//                       <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                     )}
//                   </div>
//                 </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="weight" className="text-base font-medium text-gray-700">
//                   Weight (kg)
//                 </Label>
//                 <Input
//                   id="weight"
//                   type="number"
//                   placeholder="Enter weight"
//                   value={formData.weight || ""}
//                   onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || 0 })}
//                   min="0"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="dimensions" className="text-base font-medium text-gray-700">
//                   Dimensions
//                 </Label>
//                 <Input
//                   id="dimensions"
//                   placeholder="Length x Width x Height"
//                   value={formData.dimensions || ""}
//                   onChange={(e) => updateFormData({ dimensions: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="pickupLocation" className="text-base font-medium text-gray-700">
//                   Pickup Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="pickupLocation"
//                   placeholder="Enter pickup location"
//                   value={formData.pickupLocation || ""}
//                   onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
//                 />
//                 {stepErrors.pickupLocation && (
//                   <p className="text-sm text-red-500">{stepErrors.pickupLocation}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryLocation" className="text-base font-medium text-gray-700">
//                   Delivery Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="deliveryLocation"
//                   placeholder="Enter delivery location"
//                   value={formData.deliveryLocation || ""}
//                   onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
//                 />
//                 {stepErrors.deliveryLocation && (
//                   <p className="text-sm text-red-500">{stepErrors.deliveryLocation}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="pickupDate" className="text-base font-medium text-gray-700">
//                   Pickup Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="pickupDate"
//                   type="date"
//                   value={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ pickupDate: toDate(e.target.value) })}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.pickupDate && (
//                   <p className="text-sm text-red-500">{stepErrors.pickupDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryDate" className="text-base font-medium text-gray-700">
//                   Delivery Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="deliveryDate"
//                   type="date"
//                   value={formData.deliveryDate ? format(formData.deliveryDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ deliveryDate: toDate(e.target.value) })}
//                   min={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : undefined}
//                   disabled={!formData.pickupDate}
//                 />
//                 {stepErrors.deliveryDate && (
//                   <p className="text-sm text-red-500">{stepErrors.deliveryDate}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="specialHandling" className="text-base font-medium text-gray-700">
//                 Special Handling Requirements
//               </Label>
//               <Textarea
//                 id="specialHandling"
//                 rows={3}
//                 placeholder="Any special handling instructions (max 1000 characters)"
//                 value={formData.specialHandling || ""}
//                 onChange={(e) => {
//                   if (e.target.value.length <= 1000) {
//                     updateFormData({ specialHandling: e.target.value });
//                   }
//                 }}
//                 className="resize-none"
//               />
//               <div className="flex justify-end">
//                 <p className={`text-xs ${
//                   (formData.specialHandling?.length || 0) >= 1000 
//                     ? "text-red-500" 
//                     : "text-gray-500"
//                 }`}>
//                   {formData.specialHandling?.length || 0}/1000
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex justify-between items-center pt-6">
//         <Button 
//           variant="outline" 
//           onClick={onPrevious}
//         >
//           Previous
//         </Button>

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
//                         onClick={handleNext} 
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
//                         disabled={!isStepFilled(2)}
//                       >
//                         Continue to Details
//                       </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsStep;
// import React from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { format, addDays } from "date-fns";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AlertTriangle } from "lucide-react";
// import { Badge } from "@/components/ui";

// interface DetailsStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// const DetailsStep: React.FC<DetailsStepProps> = ({ onNext, onPrevious }) => {
//   const { formData, updateFormData, validateStep, stepErrors } = useRequirement();

//   const handleNext = () => {
//     if (validateStep(2)) {
//       onNext();
//     } else {
//       toast.error("Please fill in all required fields");
//     }
//   };

//   const toDate = (dateString: string): Date | undefined => {
//     if (!dateString) return undefined;
//     return new Date(`${dateString}T00:00:00`);
//   };

//   const handleDurationChange = (days: number) => {
//     const duration = days >= 0 ? days : 0;
//     updateFormData({ duration });
//     if (formData.startDate) {
//       updateFormData({ endDate: addDays(formData.startDate, duration) });
//     }
//   };

//   const handleStartDateChange = (date: Date | undefined) => {
//     updateFormData({ startDate: date });
//     if (date && formData.duration) {
//       updateFormData({ endDate: addDays(date, formData.duration) });
//     }
//     if (!date) {
//       updateFormData({ endDate: undefined, duration: 0 });
//     }
//   };

//   const handleEndDateChange = (date: Date | undefined) => {
//     updateFormData({ endDate: date });
//     if (date && formData.startDate) {
//       const diffInMs = date.getTime() - formData.startDate.getTime();
//       const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
//       updateFormData({ duration: diffInDays >= 0 ? diffInDays : 0 });
//     }
//   };

//   const expertSpecializations = [
//     "Automation Engineer",
//     "Electrical Engineer", 
//     "Environmental Engineer",
//     "Mechanical Engineer",
//     "Process Engineer",
//     "Quality Control Engineer",
//     "Safety Engineer"
//   ];

//   const equipmentTypes = [
//     "Container",
//     "Crane",
//     "Excavator", 
//     "Forklift",
//     "Loader",
//     "Specialized Equipment",
//     "Trailer",
//     "Truck"
//   ];

//   const qualityRequirements = [ 
//     "ISO 9001", 
//     "Industry Standard", 
//     "Premium Quality", 
//     "Standard Quality", 
//     "Economy" 
//   ];

//   const technicalStandardsOptions = [ 
//     "ISO 9001:2015", 
//     "ISO 14001:2015", 
//     "ISO 45001:2018", 
//     "ASME Standards", 
//     "API Standards", 
//     "ASTM Standards", 
//     "IEC Standards", 
//     "IEEE Standards", 
//     "ANSI Standards", 
//     "EN Standards" 
//   ];

//   const certificationOptions = [ 
//     "ISO 9001", 
//     "ISO 14001", 
//     "OHSAS 18001", 
//     "API", 
//     "ASME", 
//     "Six Sigma", 
//     "PMP", 
//     "Professional Engineer" 
//   ];

//   return (
//     <div className="space-y-8">
//        <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Requirement Details</h2>
//             <p className="text-gray-600 mt-1">
//               Complete the specific details for your {formData.category} requirement
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//               Step 2 of 6
//             </Badge>
//           </div>
//         </div>
//       </div>
     

//       {/* Expert Fields */}
//       {formData.category === "expert" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Expert Services Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="specialization" className="text-base font-medium text-gray-700">
//                 Specialization <span className="text-red-500">*</span>
//               </Label>
//               <Select
//                 value={formData.specialization}
//                 onValueChange={(value) => updateFormData({ specialization: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select specialization" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {expertSpecializations.map((spec) => (
//                     <SelectItem key={spec} value={spec}>{spec}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {stepErrors.specialization && (
//                 <p className="text-sm text-red-500">{stepErrors.specialization}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description" className="text-base font-medium text-gray-700">
//                 Detailed Description <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="description"
//                 rows={4}
//                 placeholder="Describe the expertise required and tasks to be performed (max 1000 characters)"
//                 value={formData.description || ""}
//                 onChange={(e) => {
//                   if (e.target.value.length <= 1000) {
//                     updateFormData({ description: e.target.value });
//                   }
//                 }}
//                 className="resize-none"
//               />
//               <div className="flex justify-between items-center">
//                 {stepErrors.description && (
//                   <p className="text-sm text-red-500 flex items-center gap-1">
//                     {/* <AlertTriangle className="h-4 w-4" /> */}
//                     {stepErrors.description}
//                   </p>
//                 )}
//                 <span 
//                   className={`text-xs ml-auto ${
//                     (formData.description?.length || 0) >= 1000 
//                       ? "text-red-500" 
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {formData.description?.length || 0}/1000
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-base font-medium text-gray-700">
//                 Required Certifications <span className="text-red-500">*</span>
//               </Label>
//               <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                 {certificationOptions.map((cert) => (
//                   <div key={cert} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`cert-${cert}`}
//                       checked={(formData.certifications || []).includes(cert)}
//                       onCheckedChange={(checked) => {
//                         const currentCerts = [...(formData.certifications || [])];
//                         if (checked) {
//                           currentCerts.push(cert);
//                         } else {
//                           const index = currentCerts.indexOf(cert);
//                           if (index !== -1) currentCerts.splice(index, 1);
//                         }
//                         updateFormData({ certifications: currentCerts });
//                       }}
//                     />
//                     <label
//                       htmlFor={`cert-${cert}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {cert}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {stepErrors.certifications && (
//                 <p className="text-sm text-red-500">{stepErrors.certifications}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget ($) <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
//                     className="pl-8"
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="duration" className="text-base font-medium text-gray-700">
//                   Duration (days) <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="duration"
//                   type="number"
//                   placeholder="Enter project duration"
//                   value={formData.duration || ""}
//                   onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
//                   min="1"
//                 />
//                 {stepErrors.duration && (
//                   <p className="text-sm text-red-500">{stepErrors.duration}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="startDate" className="text-base font-medium text-gray-700">
//                   Start Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="startDate"
//                   type="date"
//                   value={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => handleStartDateChange(toDate(e.target.value))}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.startDate && (
//                   <p className="text-sm text-red-500">{stepErrors.startDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="endDate" className="text-base font-medium text-gray-700">
//                   End Date
//                 </Label>
//                 <Input
//                   id="endDate"
//                   type="date"
//                   value={formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => handleEndDateChange(toDate(e.target.value))}
//                   min={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : undefined}
//                   disabled={!formData.startDate}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Product Fields */}
//       {formData.category === "product" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Product Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//   <Label htmlFor="productSpecifications" className="text-base font-medium text-gray-700">
//     Product Specifications <span className="text-red-500">*</span>
//   </Label>
//   <Textarea
//     id="productSpecifications"
//     rows={4}
//     placeholder="Detailed specifications of the required product (max 1000 characters)"
//     value={formData.productSpecifications || ""}
//     onChange={(e) => {
//       if (e.target.value.length <= 1000) {
//         updateFormData({ productSpecifications: e.target.value });
//       }
//     }}
//     className="resize-none" // Disable manual resizing
//   />
//   <div className="flex justify-between items-center">
//     {stepErrors.productSpecifications ? (
//       <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
//     ) : (
//       <div></div> // Empty div to maintain space
//     )}
//     <p className={`text-xs ${
//       (formData.productSpecifications?.length || 0) >= 1000 
//         ? "text-red-500" 
//         : "text-gray-500"
//     }`}>
//       {formData.productSpecifications?.length || 0}/1000
//     </p>
//   </div>
// </div>

//             <div className="space-y-2">
//               <Label className="text-base font-medium text-gray-700">
//                 Technical Standards <span className="text-red-500">*</span>
//               </Label>
//               <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                 {technicalStandardsOptions.map((standard) => (
//                   <div key={standard} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`standard-${standard}`}
//                       checked={(formData.technicalStandards || []).includes(standard)}
//                       onCheckedChange={(checked) => {
//                         const currentStandards = [...(formData.technicalStandards || [])];
//                         if (checked) {
//                           currentStandards.push(standard);
//                         } else {
//                           const index = currentStandards.indexOf(standard);
//                           if (index !== -1) currentStandards.splice(index, 1);
//                         }
//                         updateFormData({ technicalStandards: currentStandards });
//                       }}
//                     />
//                     <label
//                       htmlFor={`standard-${standard}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {standard}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {stepErrors.technicalStandards && (
//                 <p className="text-sm text-red-500">{stepErrors.technicalStandards}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="quantity" className="text-base font-medium text-gray-700">
//                   Quantity <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   placeholder="Enter quantity required"
//                   value={formData.quantity || ""}
//                   onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 0 })}
//                   min="1"
//                 />
//                 {stepErrors.quantity && (
//                   <p className="text-sm text-red-500">{stepErrors.quantity}</p>
//                 )}
//               </div>
              
//                <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget  <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
//                     className="pl-8"
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="productDeliveryDate" className="text-base font-medium text-gray-700">
//                   Delivery Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="productDeliveryDate"
//                   type="date"
//                   value={formData.productDeliveryDate ? format(formData.productDeliveryDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ productDeliveryDate: toDate(e.target.value) })}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.productDeliveryDate && (
//                   <p className="text-sm text-red-500">{stepErrors.productDeliveryDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="qualityRequirements" className="text-base font-medium text-gray-700">
//                   Quality Requirements <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.qualityRequirements}
//                   onValueChange={(value) => updateFormData({ qualityRequirements: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select quality level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {qualityRequirements.map((quality) => (
//                       <SelectItem key={quality} value={quality}>{quality}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {stepErrors.qualityRequirements && (
//                   <p className="text-sm text-red-500">{stepErrors.qualityRequirements}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Service Fields */}
//       {formData.category === "service" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Service Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-6">
//   {/* Service Description */}
//   <div className="space-y-2">
//     <Label htmlFor="serviceDescription" className="text-base font-medium text-gray-700">
//       Service Description <span className="text-red-500">*</span>
//     </Label>
//     <Textarea
//       id="serviceDescription"
//       rows={3}
//       placeholder="Describe the service required (max 1000 characters)"
//       value={formData.serviceDescription || ""}
//       onChange={(e) => {
//         if (e.target.value.length <= 1000) {
//           updateFormData({ serviceDescription: e.target.value });
//         }
//       }}
//       className="resize-none"
//     />
//     <div className="flex justify-between items-center">
//       {stepErrors.serviceDescription ? (
//         <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
//       ) : (
//         <div></div>
//       )}
//       <p className={`text-xs ${
//         (formData.serviceDescription?.length || 0) >= 1000 
//           ? "text-red-500" 
//           : "text-gray-500"
//       }`}>
//         {formData.serviceDescription?.length || 0}/1000
//       </p>
//     </div>
//   </div>

//   {/* Scope of Work */}
//   <div className="space-y-2">
//     <Label htmlFor="scopeOfWork" className="text-base font-medium text-gray-700">
//       Scope of Work <span className="text-red-500">*</span>
//     </Label>
//     <Textarea
//       id="scopeOfWork"
//       rows={4}
//       placeholder="Detailed scope of work, including deliverables and milestones (max 1000 characters)"
//       value={formData.scopeOfWork || ""}
//       onChange={(e) => {
//         if (e.target.value.length <= 1000) {
//           updateFormData({ scopeOfWork: e.target.value });
//         }
//       }}
//       className="resize-none"
//     />
//     <div className="flex justify-between items-center">
//       {stepErrors.scopeOfWork ? (
//         <p className="text-sm text-red-500">{stepErrors.scopeOfWork}</p>
//       ) : (
//         <div></div>
//       )}
//       <p className={`text-xs ${
//         (formData.scopeOfWork?.length || 0) >= 1000 
//           ? "text-red-500" 
//           : "text-gray-500"
//       }`}>
//         {formData.scopeOfWork?.length || 0}/1000
//       </p>
//     </div>
//   </div>
// </div>

//             <div className="space-y-2">
//               <Label htmlFor="performanceMetrics" className="text-base font-medium text-gray-700">
//                 Performance Metrics <span className="text-red-500">*</span>
//               </Label>
//               <Textarea
//                 id="performanceMetrics"
//                 rows={3}
//                 placeholder="Define measurable performance indicators and success criteria"
//                 value={formData.performanceMetrics || ""}
//                 onChange={(e) => updateFormData({ performanceMetrics: e.target.value })}
//               />
//               {stepErrors.performanceMetrics && (
//                 <p className="text-sm text-red-500">{stepErrors.performanceMetrics}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//   {/* Start Date */}
//   <div className="space-y-2">
//     <Label htmlFor="serviceStartDate" className="text-base font-medium text-gray-700">
//       Start Date <span className="text-red-500">*</span>
//     </Label>
//     <Input
//       id="serviceStartDate"
//       type="date"
//       value={formData.serviceStartDate ? format(formData.serviceStartDate, 'yyyy-MM-dd') : ''}
//       onChange={(e) => {
//         const startDate = e.target.value ? new Date(e.target.value) : null;
//         updateFormData({ 
//           serviceStartDate: startDate,
//           // Reset end date if it's before the new start date
//           serviceEndDate: formData.serviceEndDate && startDate && formData.serviceEndDate < startDate 
//             ? null 
//             : formData.serviceEndDate
//         });
//       }}
//       min={format(new Date(), 'yyyy-MM-dd')}
//       required
//     />
//     {stepErrors.serviceStartDate && (
//       <p className="text-sm text-red-500">{stepErrors.serviceStartDate}</p>
//     )}
//   </div>
  
//   {/* End Date */}
//   <div className="space-y-2">
//     <Label htmlFor="serviceEndDate" className="text-base font-medium text-gray-700">
//       End Date <span className="text-red-500">*</span>
//     </Label>
//     <Input
//       id="serviceEndDate"  
//       type="date"
//       value={formData.serviceEndDate ? format(formData.serviceEndDate, 'yyyy-MM-dd') : ''}
//       onChange={(e) => updateFormData({ serviceEndDate: e.target.value ? new Date(e.target.value) : null })}
//       min={formData.serviceStartDate 
//         ? format(formData.serviceStartDate, 'yyyy-MM-dd') 
//         : format(new Date(), 'yyyy-MM-dd')
//       }
//       disabled={!formData.serviceStartDate}
//       required
//     />
//     {stepErrors.serviceEndDate && (
//       <p className="text-sm text-red-500">{stepErrors.serviceEndDate}</p>
//     )}
//   </div>
// </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-base font-medium text-gray-700">
//                   Budget  <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <Input
//                     id="budget"
//                     type="number"
//                     placeholder="Enter budget amount"
//                     className="pl-8"
//                     value={formData.budget || ""}
//                     onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 {stepErrors.budget && (
//                   <p className="text-sm text-red-500">{stepErrors.budget}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="location" className="text-base font-medium text-gray-700">
//                   Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="location"
//                   placeholder="Service location"
//                   value={formData.location || ""}
//                   onChange={(e) => updateFormData({ location: e.target.value })}
//                 />
//                 {stepErrors.location && (
//                   <p className="text-sm text-red-500">{stepErrors.location}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Logistics Fields */}
//       {formData.category === "logistics" && (
//         <Card className="bg-white border border-gray-100 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg text-gray-900">Logistics Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="equipmentType" className="text-base font-medium text-gray-700">
//                 Equipment Type <span className="text-red-500">*</span>
//               </Label>
//               <Select
//                 value={formData.equipmentType}
//                 onValueChange={(value) => updateFormData({ equipmentType: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select equipment type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {equipmentTypes.map((equip) => (
//                     <SelectItem key={equip} value={equip}>{equip}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {stepErrors.equipmentType && (
//                 <p className="text-sm text-red-500">{stepErrors.equipmentType}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="weight" className="text-base font-medium text-gray-700">
//                   Weight (kg)
//                 </Label>
//                 <Input
//                   id="weight"
//                   type="number"
//                   placeholder="Enter weight"
//                   value={formData.weight || ""}
//                   onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || 0 })}
//                   min="0"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="dimensions" className="text-base font-medium text-gray-700">
//                   Dimensions
//                 </Label>
//                 <Input
//                   id="dimensions"
//                   placeholder="Length x Width x Height"
//                   value={formData.dimensions || ""}
//                   onChange={(e) => updateFormData({ dimensions: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="pickupLocation" className="text-base font-medium text-gray-700">
//                   Pickup Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="pickupLocation"
//                   placeholder="Enter pickup location"
//                   value={formData.pickupLocation || ""}
//                   onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
//                 />
//                 {stepErrors.pickupLocation && (
//                   <p className="text-sm text-red-500">{stepErrors.pickupLocation}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryLocation" className="text-base font-medium text-gray-700">
//                   Delivery Location <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="deliveryLocation"
//                   placeholder="Enter delivery location"
//                   value={formData.deliveryLocation || ""}
//                   onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
//                 />
//                 {stepErrors.deliveryLocation && (
//                   <p className="text-sm text-red-500">{stepErrors.deliveryLocation}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="pickupDate" className="text-base font-medium text-gray-700">
//                   Pickup Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="pickupDate"
//                   type="date"
//                   value={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ pickupDate: toDate(e.target.value) })}
//                   min={format(new Date(), 'yyyy-MM-dd')}
//                 />
//                 {stepErrors.pickupDate && (
//                   <p className="text-sm text-red-500">{stepErrors.pickupDate}</p>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryDate" className="text-base font-medium text-gray-700">
//                   Delivery Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="deliveryDate"
//                   type="date"
//                   value={formData.deliveryDate ? format(formData.deliveryDate, 'yyyy-MM-dd') : ''}
//                   onChange={(e) => updateFormData({ deliveryDate: toDate(e.target.value) })}
//                   min={formData.pickupDate ? format(formData.pickupDate, 'yyyy-MM-dd') : undefined}
//                   disabled={!formData.pickupDate}
//                 />
//                 {stepErrors.deliveryDate && (
//                   <p className="text-sm text-red-500">{stepErrors.deliveryDate}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//   <Label htmlFor="specialHandling" className="text-base font-medium text-gray-700">
//     Special Handling Requirements
//   </Label>
//   <Textarea
//     id="specialHandling"
//     rows={3}
//     placeholder="Any special handling instructions (max 1000 characters)"
//     value={formData.specialHandling || ""}
//     onChange={(e) => {
//       if (e.target.value.length <= 1000) {
//         updateFormData({ specialHandling: e.target.value });
//       }
//     }}
//     className="resize-none"
//   />
//   <div className="flex justify-end">
//     <p className={`text-xs ${
//       (formData.specialHandling?.length || 0) >= 1000 
//         ? "text-red-500" 
//         : "text-gray-500"
//     }`}>
//       {formData.specialHandling?.length || 0}/1000
//     </p>
//   </div>
// </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex justify-between items-center pt-6">
//         <Button 
//           variant="outline" 
//           onClick={onPrevious}
//         >
//           Previous
//         </Button>

//         <div className="flex items-center gap-x-3">
//           <Button 
//             variant="outline"
//             className="font-medium"
//           >
//             Save as Draft
//           </Button>
//           <Button 
//             onClick={handleNext} 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
//           >
//             Continue to Documents
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
// export default DetailsStep;
=======
// export default DetailsStep;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
