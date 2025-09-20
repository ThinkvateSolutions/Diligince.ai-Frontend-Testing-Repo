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


const ProductDetails = () => {
  const { formData, updateFormData, stepErrors } = useRequirement();

  const qualityRequirements = [
    "ISO 9001",
    "Industry Standard",
    "Premium Quality",
    "Standard Quality",
    "Economy"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="productSpecifications" className="text-base">
          Product Specifications <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="productSpecifications"
          rows={4}
          placeholder="Detailed specifications of the required product"
          value={formData.productSpecifications || ""}
          onChange={(e) => updateFormData({ productSpecifications: e.target.value })}
        />
        {stepErrors.productSpecifications && (
          <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-base">
            Quantity <span className="text-red-500">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter quantity required"
            value={formData.quantity || ""}
            onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 0 })}
          />
          {stepErrors.quantity && (
            <p className="text-sm text-red-500">{stepErrors.quantity}</p>
          )}
        </div>
        
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
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base">Delivery Date</Label>
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="qualityRequirements" className="text-base">Quality Requirements</Label>
          <Select
            value={formData.qualityRequirements}
            onValueChange={(value) => updateFormData({ qualityRequirements: value })}
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
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;