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


const ServiceDetails = () => {
  const { formData, updateFormData, stepErrors } = useRequirement();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="serviceDescription" className="text-base">
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
        <Label htmlFor="scopeOfWork" className="text-base">
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
          <Label className="text-base">End Date</Label>
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="serviceBudget" className="text-base">Budget</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <Input
              id="serviceBudget"
              type="number"
              placeholder="Enter budget amount"
              className="pl-8"
              value={formData.serviceBudget || ""}
              onChange={(e) => updateFormData({ serviceBudget: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-base">
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            placeholder="Service location"
            value={formData.location || ""}
            onChange={(e) => updateFormData({ location: e.target.value })}
          />
          {stepErrors.location && (
            <p className="text-sm text-red-500">{stepErrors.location}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails ;