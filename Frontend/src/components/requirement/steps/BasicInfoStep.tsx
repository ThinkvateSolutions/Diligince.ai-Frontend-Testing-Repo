
import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, Wrench, Truck } from "lucide-react";
import { toast } from "sonner";

interface BasicInfoStepProps {
  onNext: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ onNext }) => {
  const { formData, updateFormData, validateStep, stepErrors } = useRequirement();

  const handleNext = () => {
    if (validateStep(1)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const categoryOptions = [
    {
      id: "expert",
      title: "Expert",
      description: "Technical professional services",
      icon: User,
    },
    {
      id: "product",
      title: "Product",
      description: "Spare parts, materials",
      icon: Package,
    },
    {
      id: "service",
      title: "Service",
      description: "Contractor services",
      icon: Wrench,
    },
    {
      id: "logistics",
      title: "Logistics",
      description: "Transport, equipment",
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        <p className="text-gray-600">
          Provide a title and select a category for your requirement
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">
            Requirement Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter a clear title for your requirement"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
          />
          {stepErrors.title && (
            <p className="text-sm text-red-500">{stepErrors.title}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-base">
            Category <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categoryOptions.map((category) => (
              <div
                key={category.id}
                className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-all hover:border-blue-400 hover:shadow-md ${
                  formData.category === category.id
                    ? "border-2 border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => updateFormData({ category: category.id as any })}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-900">{category.title}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
          {stepErrors.category && (
            <p className="text-sm text-red-500">{stepErrors.category}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleNext} size="lg">
          Next
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoStep;
