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


const LogisticsDetails = () => {
  const { formData, updateFormData, stepErrors } = useRequirement();

  const equipmentTypes = [
    "Crane",
    "Forklift",
    "Loader",
    "Excavator",
    "Trailer",
    "Truck",
    "Container",
    "Specialized Equipment"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="equipmentType" className="text-base">
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
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-base">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight"
            value={formData.weight || ""}
            onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dimensions" className="text-base">Dimensions</Label>
          <Input
            id="dimensions"
            placeholder="Length x Width x Height"
            value={formData.dimensions || ""}
            onChange={(e) => updateFormData({ dimensions: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation" className="text-base">
            Pickup Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pickupLocation"
            placeholder="Enter pickup location"
            value={formData.pickupLocation || ""}
            onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
          />
          {stepErrors.pickupLocation && (
            <p className="text-sm text-red-500">{stepErrors.pickupLocation}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deliveryLocation" className="text-base">
            Delivery Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="deliveryLocation"
            placeholder="Enter delivery location"
            value={formData.deliveryLocation || ""}
            onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
          />
          {stepErrors.deliveryLocation && (
            <p className="text-sm text-red-500">{stepErrors.deliveryLocation}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base">Pickup Date</Label>
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
          <Label className="text-base">Delivery Date</Label>
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
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialHandling" className="text-base">Special Handling Requirements</Label>
        <Textarea
          id="specialHandling"
          rows={3}
          placeholder="Any special handling instructions"
          value={formData.specialHandling || ""}
          onChange={(e) => updateFormData({ specialHandling: e.target.value })}
        />
      </div>
    </div>
  );
};

export default LogisticsDetails;