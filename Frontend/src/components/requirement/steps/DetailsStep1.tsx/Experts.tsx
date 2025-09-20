import React from "react";
import { useEffect } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { addDays, differenceInDays } from "date-fns";


const ExpertDetails = () => {
  const { formData, updateFormData, stepErrors } = useRequirement();

  const expertSpecializations = [
    "Automation Engineer", 
    "Electrical Engineer", 
    "Mechanical Engineer",
    "Process Engineer",
    "Quality Control Engineer",
    "Safety Engineer",
    "Environmental Engineer"
  ];

  const certificationOptions = [
    "ISO 9001",
    "ISO 14001",
    "OHSAS 18001",
    "API",
    "ASME",
    "Six Sigma",
    "PMP",
    "Professional Engineer"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="specialization" className="text-base">
          Specialization <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.specialization}
          onValueChange={(value) => updateFormData({ specialization: value })}
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
        <Label htmlFor="description" className="text-base">
          Detailed Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Describe the expertise required and tasks to be performed"
          value={formData.description || ""}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
        {stepErrors.description && (
          <p className="text-sm text-red-500">{stepErrors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-base">Required Certifications</Label>
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
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base">Budget</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <Input
              id="budget"
              type="number"
              placeholder="Enter budget amount"
              className="pl-8"
              value={formData.budget || ""}
              onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-base">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="Enter project duration"
            value={formData.duration || ""}
            onChange={(e) => updateFormData({ duration: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base">Start Date</Label>
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
          <Label className="text-base">End Date</Label>
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
                onSelect={(date) => {
                  if (
                    formData.startDate &&
                    date &&
                    date <= new Date(new Date(formData.startDate).setDate(formData.startDate.getDate()))
                  ) {
                    return;
                  }
                  updateFormData({ endDate: date });
                }}
                disabled={(date) =>
                  formData.startDate
                    ? date <= new Date(new Date(formData.startDate).setDate(formData.startDate.getDate()))
                    : false
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;