
import ExpertDetails from "./Experts";
import LogisticsDetails from "./Logistics";
import ServiceDetails from "./Services";
import ProductDetails from "./Product";

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

interface DetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DetailsStep1: React.FC<DetailsStepProps> = ({ onNext, onPrevious }) => {
  const { formData, validateStep, stepErrors } = useRequirement();

  const handleNext = () => {
    if (validateStep(2)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Requirement Details</h2>
        <p className="text-gray-600">
          Complete the specific details for your {formData.category} requirement
        </p>
      </div>

      {formData.category === "expert" && <ExpertDetails />}
      {formData.category === "product" && <ProductDetails />}
      {formData.category === "service" && <ServiceDetails />}
      {formData.category === "logistics" && <LogisticsDetails />}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default DetailsStep1;
