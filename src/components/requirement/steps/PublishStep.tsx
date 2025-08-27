import React, { useState } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useStakeholder } from "@/contexts/StakeholderContext";
import { useApproval } from "@/contexts/ApprovalContext";
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
>>>>>>> 9b0ce35 (Initial commit)
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { toast } from "sonner";
<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
=======
import { cn } from "@/lib/utils";
=======
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

interface PublishStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({ onNext, onPrevious }) => {
<<<<<<< HEAD
  const { 
    formData, 
    updateFormData, 
    validateStep, 
    stepErrors, 
    saveAsDraft,
    isWorkflowLocked
  } = useRequirement();
=======
<<<<<<< HEAD
  console.log("PublishStep rendering...");
>>>>>>> 9b0ce35 (Initial commit)
  
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Available evaluation criteria based on ISO 9001 procurement standards
  const availableEvaluationCriteria = [
    "Price Competitiveness",
    "Technical Compliance",
    "Quality Standards",
    "Delivery Timeline",
<<<<<<< HEAD
    "Past Experience",
=======
    "Past Performance/Experience",
=======
  const { 
    formData, 
    updateFormData, 
    validateStep, 
    stepErrors, 
    saveAsDraft,
    isWorkflowLocked
  } = useRequirement();
  
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Available evaluation criteria based on ISO 9001 procurement standards
  const availableEvaluationCriteria = [
    "Price Competitiveness",
    "Technical Compliance",
    "Quality Standards",
    "Delivery Timeline",
    "Past Experience",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    "Technical Capability",
    "Financial Stability",
    "Compliance & Certifications",
    "Risk Assessment",
    "Sustainability Practices"
  ];

  const handleEvaluationCriteriaChange = (criterion: string, checked: boolean) => {
<<<<<<< HEAD
    if (isWorkflowLocked) return;
    
=======
<<<<<<< HEAD
=======
    if (isWorkflowLocked) return;
    
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    let updatedCriteria = [...(formData.evaluationCriteria || [])];
    if (checked) {
      updatedCriteria.push(criterion);
    } else {
      updatedCriteria = updatedCriteria.filter(c => c !== criterion);
    }
    updateFormData({ evaluationCriteria: updatedCriteria });
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleEmergencyPublish = async () => {
    if (!formData.isUrgent) {
      toast.error("Emergency publish is only available for urgent requirements");
=======
>>>>>>> 9b0ce35 (Initial commit)
  const handleNext = () => {
    if (isWorkflowLocked || validateStep(4)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields to continue.");
    }
  };

  const handleSaveDraft = async () => {
    if (isWorkflowLocked) {
      toast.error("Cannot save draft after workflow is confirmed.");
      return;
    }

    if (!formData.title || formData.title.trim() === '') {
      toast.error("A title is required to save a draft.");
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      return;
    }
    
    try {
<<<<<<< HEAD
      setIsSavingDraft(true);
      await saveAsDraft();
      toast.success("Draft saved successfully!");
=======
<<<<<<< HEAD
      setIsPublishing(true);
      const success = await emergencyPublish(formData.title || 'unknown');
      if (success) {
        // Safely notify stakeholders with error handling
        try {
          notifyStakeholders(formData);
        } catch (error) {
          console.warn("Failed to notify stakeholders:", error);
          // Don't block the publish process for notification failures
        }
        toast.success("Requirement published under emergency protocol!");
        onNext();
      }
>>>>>>> 9b0ce35 (Initial commit)
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vendor 
Criterion</h2>
            <p className="text-gray-600 mt-1">
              Configure how your requirement will be published to vendors.
            </p>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                Publish settings are now read-only as the workflow has been confirmed.
              </p>
            )}
          </div>
<<<<<<< HEAD
=======
        )}
=======
      setIsSavingDraft(true);
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vendor 
Criterion</h2>
            <p className="text-gray-600 mt-1">
              Configure how your requirement will be published to vendors.
            </p>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                Publish settings are now read-only as the workflow has been confirmed.
              </p>
            )}
          </div>
>>>>>>> 9b0ce35 (Initial commit)
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 4 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Requirement Visibility</Label>
          <RadioGroup
            value={formData.visibility || "all"}
            onValueChange={(value: "all" | "selected") => updateFormData({ visibility: value })}
            className="space-y-3"
<<<<<<< HEAD
            disabled={isWorkflowLocked}
          >
=======
<<<<<<< HEAD
          >
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="all" id="all-vendors" />
=======
            disabled={isWorkflowLocked}
          >
>>>>>>> 9b0ce35 (Initial commit)
            <div className={`flex items-start space-x-3 rounded-md border p-3 ${
              isWorkflowLocked ? "opacity-70" : ""
            }`}>
              <RadioGroupItem value="all" id="all-vendors" disabled={isWorkflowLocked} />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              <div className="space-y-1">
                <Label htmlFor="all-vendors" className="font-medium">
                  All Relevant Vendors
                </Label>
                <p className="text-sm text-gray-500">
                  Your requirement will be visible to all approved vendors that match the category.
                </p>
              </div>
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="selected" id="selected-vendors" />
=======
>>>>>>> 9b0ce35 (Initial commit)
            <div className={`flex items-start space-x-3 rounded-md border p-3 ${
              isWorkflowLocked ? "opacity-70" : ""
            }`}>
              <RadioGroupItem value="selected" id="selected-vendors" disabled={isWorkflowLocked} />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              <div className="space-y-1">
                <Label htmlFor="selected-vendors" className="font-medium">
                  Selected Vendors Only
                </Label>
                <p className="text-sm text-gray-500">
<<<<<<< HEAD
                  Only vendors you specifically invite will see this requirement.
=======
<<<<<<< HEAD
                  Only vendors you specifically invite will see your requirement.
=======
                  Only vendors you specifically invite will see this requirement.
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </p>
              </div>
            </div>
          </RadioGroup>
<<<<<<< HEAD
          {formData.visibility === "selected" && (
            <div className="mt-2">
              <Label className="text-sm font-medium">
                Invited Suppliers <span className="text-red-500">*</span>
              </Label>
              <Input 
                placeholder="Search and add suppliers..."
                disabled={isWorkflowLocked}
              />
              {stepErrors.invitedSuppliers && (
                <p className="text-sm text-red-500 mt-1">{stepErrors.invitedSuppliers}</p>
              )}
            </div>
          )}
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
        </div>

        <div className="space-y-3">
          <Label htmlFor="submissionDeadline" className="text-base">
            Submission Deadline <span className="text-red-500">*</span>
          </Label>
          <Input
            id="submissionDeadline"
            type="date"
            value={formData.submissionDeadline ? format(new Date(formData.submissionDeadline), 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              if (isWorkflowLocked) return;
              const dateString = e.target.value;
              const date = dateString ? new Date(`${dateString}T00:00:00`) : undefined;
              updateFormData({ submissionDeadline: date });
            }}
            min={format(new Date(), 'yyyy-MM-dd')}
            disabled={isWorkflowLocked}
          />
          {stepErrors?.submissionDeadline && (
<<<<<<< HEAD
            <p className="text-sm text-red-500 mt-1">{stepErrors.submissionDeadline}</p>
=======
            <p className="text-sm text-red-500">{stepErrors.submissionDeadline}</p>
=======
          {formData.visibility === "selected" && (
            <div className="mt-2">
              <Label className="text-sm font-medium">
                Invited Suppliers <span className="text-red-500">*</span>
              </Label>
              <Input 
                placeholder="Search and add suppliers..."
                disabled={isWorkflowLocked}
              />
              {stepErrors.invitedSuppliers && (
                <p className="text-sm text-red-500 mt-1">{stepErrors.invitedSuppliers}</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="submissionDeadline" className="text-base">
            Submission Deadline <span className="text-red-500">*</span>
          </Label>
          <Input
            id="submissionDeadline"
            type="date"
            value={formData.submissionDeadline ? format(new Date(formData.submissionDeadline), 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              if (isWorkflowLocked) return;
              const dateString = e.target.value;
              const date = dateString ? new Date(`${dateString}T00:00:00`) : undefined;
              updateFormData({ submissionDeadline: date });
            }}
            min={format(new Date(), 'yyyy-MM-dd')}
            disabled={isWorkflowLocked}
          />
          {stepErrors?.submissionDeadline && (
            <p className="text-sm text-red-500 mt-1">{stepErrors.submissionDeadline}</p>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base">
            Evaluation Criteria <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-600">
<<<<<<< HEAD
            Select the criteria that will be used to evaluate proposals (ISO 9001 compliant).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableEvaluationCriteria.map((criterion) => (
=======
<<<<<<< HEAD
            Select the criteria that will be used to evaluate vendor proposals (ISO 9001 compliant)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableEvaluationCriteria.map((criterion) => (
              <div key={criterion} className="flex items-center space-x-2">
=======
            Select the criteria that will be used to evaluate proposals (ISO 9001 compliant).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableEvaluationCriteria.map((criterion) => (
>>>>>>> 9b0ce35 (Initial commit)
              <div 
                key={criterion} 
                className={`flex items-center space-x-2 ${
                  isWorkflowLocked ? "opacity-70" : ""
                }`}
              >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <Checkbox
                  id={criterion}
                  checked={(formData.evaluationCriteria || []).includes(criterion)}
                  onCheckedChange={(checked) => handleEvaluationCriteriaChange(criterion, !!checked)}
<<<<<<< HEAD
                  disabled={isWorkflowLocked}
                />
=======
<<<<<<< HEAD
                />
                <Label htmlFor={criterion} className="text-sm font-normal cursor-pointer">
=======
                  disabled={isWorkflowLocked}
                />
>>>>>>> 9b0ce35 (Initial commit)
                <Label 
                  htmlFor={criterion} 
                  className={`text-sm font-normal ${
                    isWorkflowLocked ? "cursor-default" : "cursor-pointer"
                  }`}
                >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  {criterion}
                </Label>
              </div>
            ))}
          </div>
          {stepErrors?.evaluationCriteria && (
<<<<<<< HEAD
            <p className="text-sm text-red-500 mt-1">{stepErrors.evaluationCriteria}</p>
=======
<<<<<<< HEAD
            <p className="text-sm text-red-500">{stepErrors.evaluationCriteria}</p>
>>>>>>> 9b0ce35 (Initial commit)
          )}
        </div>
      </div>

      <div className="flex justify-between items-center w-full pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            className="font-medium"
            onClick={handleSaveDraft}
            disabled={!formData.title || isSavingDraft || isWorkflowLocked}
          >
            {isSavingDraft ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Continue to Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
// import React, { useState } from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { Badge, Input } from "@/components/ui";

// interface PublishStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// const PublishStep: React.FC<PublishStepProps> = ({ onNext, onPrevious }) => {
//   const { 
//     formData, 
//     updateFormData, 
//     validateStep, 
//     stepErrors, 
//     saveAsDraft 
//   } = useRequirement();
  
//   const [isSavingDraft, setIsSavingDraft] = useState(false);

//   // Available evaluation criteria based on ISO 9001 procurement standards
//   const availableEvaluationCriteria = [
//     "Price Competitiveness",
//     "Technical Compliance",
//     "Quality Standards",
//     "Delivery Timeline",
//     "Past Experience",
//     "Technical Capability",
//     "Financial Stability",
//     "Compliance & Certifications",
//     "Risk Assessment",
//     "Sustainability Practices"
//   ];

//   const handleEvaluationCriteriaChange = (criterion: string, checked: boolean) => {
//     let updatedCriteria = [...(formData.evaluationCriteria || [])];
//     if (checked) {
//       updatedCriteria.push(criterion);
//     } else {
//       updatedCriteria = updatedCriteria.filter(c => c !== criterion);
//     }
//     updateFormData({ evaluationCriteria: updatedCriteria });
//   };

//   const handleNext = () => {
//     if (validateStep(4)) {
//       onNext();
//     } else {
//       toast.error("Please fill in all required fields to continue.");
//     }
//   };

//   const handleSaveDraft = async () => {
//     if (!formData.title || formData.title.trim() === '') {
//       toast.error("A title is required to save a draft.");
//       return;
//     }
    
//     try {
//       setIsSavingDraft(true);
//       await saveAsDraft();
//       toast.success("Draft saved successfully!");
//     } catch (error) {
//       console.error("Error saving draft:", error);
//       toast.error("Failed to save draft. Please try again.");
//     } finally {
//       setIsSavingDraft(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Publish Settings</h2>
//             <p className="text-gray-600 mt-1">
//               Configure how your requirement will be published to vendors.
//             </p>
//           </div>
//           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//             Step 4 of 6
//           </Badge>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="space-y-3">
//           <Label className="text-base">Requirement Visibility</Label>
//           <RadioGroup
//             value={formData.visibility || "all"}
//             onValueChange={(value: "all" | "selected") => updateFormData({ visibility: value })}
//             className="space-y-3"
//           >
//             <div className="flex items-start space-x-3 rounded-md border p-3">
//               <RadioGroupItem value="all" id="all-vendors" />
//               <div className="space-y-1">
//                 <Label htmlFor="all-vendors" className="font-medium">
//                   All Relevant Vendors
//                 </Label>
//                 <p className="text-sm text-gray-500">
//                   Your requirement will be visible to all approved vendors that match the category.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-3 rounded-md border p-3">
//               <RadioGroupItem value="selected" id="selected-vendors" />
//               <div className="space-y-1">
//                 <Label htmlFor="selected-vendors" className="font-medium">
//                   Selected Vendors Only
//                 </Label>
//                 <p className="text-sm text-gray-500">
//                   Only vendors you specifically invite will see this requirement.
//                 </p>
//               </div>
//             </div>
//           </RadioGroup>
//           {formData.visibility === "selected" && (
//             <div className="mt-2">
//               <Label className="text-sm font-medium">
//                 Invited Suppliers <span className="text-red-500">*</span>
//               </Label>
//               <Input placeholder="Search and add suppliers..."/>
//               {stepErrors.invitedSuppliers && (
//                 <p className="text-sm text-red-500 mt-1">{stepErrors.invitedSuppliers}</p>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="submissionDeadline" className="text-base">
//             Submission Deadline <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="submissionDeadline"
//             type="date"
//             value={formData.submissionDeadline ? format(new Date(formData.submissionDeadline), 'yyyy-MM-dd') : ''}
//             onChange={(e) => {
//               const dateString = e.target.value;
//               const date = dateString ? new Date(`${dateString}T00:00:00`) : undefined;
//               updateFormData({ submissionDeadline: date });
//             }}
//             min={format(new Date(), 'yyyy-MM-dd')}
//           />
//           {stepErrors?.submissionDeadline && (
//             <p className="text-sm text-red-500 mt-1">{stepErrors.submissionDeadline}</p>
//           )}
//         </div>

//         <div className="space-y-4">
//           <Label className="text-base">
//             Evaluation Criteria <span className="text-red-500">*</span>
//           </Label>
//           <p className="text-sm text-gray-600">
//             Select the criteria that will be used to evaluate proposals (ISO 9001 compliant).
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {availableEvaluationCriteria.map((criterion) => (
//               <div key={criterion} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={criterion}
//                   checked={(formData.evaluationCriteria || []).includes(criterion)}
//                   onCheckedChange={(checked) => handleEvaluationCriteriaChange(criterion, !!checked)}
//                 />
//                 <Label htmlFor={criterion} className="text-sm font-normal cursor-pointer">
//                   {criterion}
//                 </Label>
//               </div>
//             ))}
//           </div>
//           {stepErrors?.evaluationCriteria && (
//             <p className="text-sm text-red-500 mt-1">{stepErrors.evaluationCriteria}</p>
//           )}
//         </div>

        {/* <div className="space-y-4">
          <Label className="text-base">Notification Preferences</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-gray-500">
<<<<<<< HEAD
                  Receive updates about proposals via email.
=======
                  Receive updates about proposals via email
=======
            <p className="text-sm text-red-500 mt-1">{stepErrors.evaluationCriteria}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center w-full pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            className="font-medium"
            onClick={handleSaveDraft}
            disabled={!formData.title || isSavingDraft || isWorkflowLocked}
          >
            {isSavingDraft ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Continue to Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
// import React, { useState } from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { Badge, Input } from "@/components/ui";

// interface PublishStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// const PublishStep: React.FC<PublishStepProps> = ({ onNext, onPrevious }) => {
//   const { 
//     formData, 
//     updateFormData, 
//     validateStep, 
//     stepErrors, 
//     saveAsDraft 
//   } = useRequirement();
  
//   const [isSavingDraft, setIsSavingDraft] = useState(false);

//   // Available evaluation criteria based on ISO 9001 procurement standards
//   const availableEvaluationCriteria = [
//     "Price Competitiveness",
//     "Technical Compliance",
//     "Quality Standards",
//     "Delivery Timeline",
//     "Past Experience",
//     "Technical Capability",
//     "Financial Stability",
//     "Compliance & Certifications",
//     "Risk Assessment",
//     "Sustainability Practices"
//   ];

//   const handleEvaluationCriteriaChange = (criterion: string, checked: boolean) => {
//     let updatedCriteria = [...(formData.evaluationCriteria || [])];
//     if (checked) {
//       updatedCriteria.push(criterion);
//     } else {
//       updatedCriteria = updatedCriteria.filter(c => c !== criterion);
//     }
//     updateFormData({ evaluationCriteria: updatedCriteria });
//   };

//   const handleNext = () => {
//     if (validateStep(4)) {
//       onNext();
//     } else {
//       toast.error("Please fill in all required fields to continue.");
//     }
//   };

//   const handleSaveDraft = async () => {
//     if (!formData.title || formData.title.trim() === '') {
//       toast.error("A title is required to save a draft.");
//       return;
//     }
    
//     try {
//       setIsSavingDraft(true);
//       await saveAsDraft();
//       toast.success("Draft saved successfully!");
//     } catch (error) {
//       console.error("Error saving draft:", error);
//       toast.error("Failed to save draft. Please try again.");
//     } finally {
//       setIsSavingDraft(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Publish Settings</h2>
//             <p className="text-gray-600 mt-1">
//               Configure how your requirement will be published to vendors.
//             </p>
//           </div>
//           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//             Step 4 of 6
//           </Badge>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="space-y-3">
//           <Label className="text-base">Requirement Visibility</Label>
//           <RadioGroup
//             value={formData.visibility || "all"}
//             onValueChange={(value: "all" | "selected") => updateFormData({ visibility: value })}
//             className="space-y-3"
//           >
//             <div className="flex items-start space-x-3 rounded-md border p-3">
//               <RadioGroupItem value="all" id="all-vendors" />
//               <div className="space-y-1">
//                 <Label htmlFor="all-vendors" className="font-medium">
//                   All Relevant Vendors
//                 </Label>
//                 <p className="text-sm text-gray-500">
//                   Your requirement will be visible to all approved vendors that match the category.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-3 rounded-md border p-3">
//               <RadioGroupItem value="selected" id="selected-vendors" />
//               <div className="space-y-1">
//                 <Label htmlFor="selected-vendors" className="font-medium">
//                   Selected Vendors Only
//                 </Label>
//                 <p className="text-sm text-gray-500">
//                   Only vendors you specifically invite will see this requirement.
//                 </p>
//               </div>
//             </div>
//           </RadioGroup>
//           {formData.visibility === "selected" && (
//             <div className="mt-2">
//               <Label className="text-sm font-medium">
//                 Invited Suppliers <span className="text-red-500">*</span>
//               </Label>
//               <Input placeholder="Search and add suppliers..."/>
//               {stepErrors.invitedSuppliers && (
//                 <p className="text-sm text-red-500 mt-1">{stepErrors.invitedSuppliers}</p>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="submissionDeadline" className="text-base">
//             Submission Deadline <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="submissionDeadline"
//             type="date"
//             value={formData.submissionDeadline ? format(new Date(formData.submissionDeadline), 'yyyy-MM-dd') : ''}
//             onChange={(e) => {
//               const dateString = e.target.value;
//               const date = dateString ? new Date(`${dateString}T00:00:00`) : undefined;
//               updateFormData({ submissionDeadline: date });
//             }}
//             min={format(new Date(), 'yyyy-MM-dd')}
//           />
//           {stepErrors?.submissionDeadline && (
//             <p className="text-sm text-red-500 mt-1">{stepErrors.submissionDeadline}</p>
//           )}
//         </div>

//         <div className="space-y-4">
//           <Label className="text-base">
//             Evaluation Criteria <span className="text-red-500">*</span>
//           </Label>
//           <p className="text-sm text-gray-600">
//             Select the criteria that will be used to evaluate proposals (ISO 9001 compliant).
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {availableEvaluationCriteria.map((criterion) => (
//               <div key={criterion} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={criterion}
//                   checked={(formData.evaluationCriteria || []).includes(criterion)}
//                   onCheckedChange={(checked) => handleEvaluationCriteriaChange(criterion, !!checked)}
//                 />
//                 <Label htmlFor={criterion} className="text-sm font-normal cursor-pointer">
//                   {criterion}
//                 </Label>
//               </div>
//             ))}
//           </div>
//           {stepErrors?.evaluationCriteria && (
//             <p className="text-sm text-red-500 mt-1">{stepErrors.evaluationCriteria}</p>
//           )}
//         </div>

        {/* <div className="space-y-4">
          <Label className="text-base">Notification Preferences</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about proposals via email.
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </p>
              </div>
              <Switch
                id="notify-email"
                checked={formData.notifyByEmail || false}
                onCheckedChange={(checked) => updateFormData({ notifyByEmail: checked })}
              />
            </div>
<<<<<<< HEAD
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform.
=======
<<<<<<< HEAD
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform
=======
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform.
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </p>
              </div>
              <Switch
                id="notify-app"
<<<<<<< HEAD
                checked={formData.notifyByApp !== false}
=======
<<<<<<< HEAD
                checked={formData.notifyByApp || true}
=======
                checked={formData.notifyByApp !== false}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
              />
            </div>
          </div>
<<<<<<< HEAD
        </div> */}
//       </div>
=======
<<<<<<< HEAD
        </div>
>>>>>>> 9b0ce35 (Initial commit)

//       <div className="flex items-center justify-between gap-4 pt-6">
//         <Button
//           variant="outline"
//           onClick={onPrevious}
//           disabled={isSavingDraft}
//         >
//           Previous
//         </Button>
        
//         <div className="flex items-center gap-3">
//           <Button
//             variant="outline"
//             onClick={handleSaveDraft}
//             disabled={isSavingDraft}
//           >
//             {isSavingDraft ? "Saving..." : "Save as Draft"}
//           </Button>
          
//           <Button 
//             onClick={handleNext}
//             disabled={isSavingDraft}
//             className="bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Continue to Preview
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
// export default PublishStep;
=======
      <div className="flex items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPublishing}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isPublishing}
          >
            Save as Draft
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {formData.isUrgent && !approvalCheck.canPublish && (
            <Button 
              onClick={handleEmergencyPublish}
              disabled={isPublishing}
              variant="outline"
              className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Publish
            </Button>
          )}
          <Button 
            onClick={handlePublish}
            disabled={isPublishing || !approvalCheck.canPublish}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPublishing ? "Publishing..." : "Publish & Notify Stakeholders"}
          </Button>
        </div>
      </div>
      
      {!approvalCheck.canPublish && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              {approvalCheck.reason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishStep;
=======
        </div> */}
//       </div>

//       <div className="flex items-center justify-between gap-4 pt-6">
//         <Button
//           variant="outline"
//           onClick={onPrevious}
//           disabled={isSavingDraft}
//         >
//           Previous
//         </Button>
        
//         <div className="flex items-center gap-3">
//           <Button
//             variant="outline"
//             onClick={handleSaveDraft}
//             disabled={isSavingDraft}
//           >
//             {isSavingDraft ? "Saving..." : "Save as Draft"}
//           </Button>
          
//           <Button 
//             onClick={handleNext}
//             disabled={isSavingDraft}
//             className="bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Continue to Preview
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishStep;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
