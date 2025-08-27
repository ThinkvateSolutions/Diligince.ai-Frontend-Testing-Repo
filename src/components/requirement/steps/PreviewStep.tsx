// import React from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { format } from "date-fns";
// import { 
//   Package, 
//   User, 
//   Wrench, 
//   Truck, 
//   Edit, 
//   File, 
//   Globe, 
//   CalendarDays, 
//   Users, 
//   ClipboardCheck
// } from "lucide-react";
// import { StepType } from "@/pages/CreateRequirement";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";

// interface PreviewStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
//   onEdit: (step: StepType) => void;
// }

// const PreviewStep: React.FC<PreviewStepProps> = ({ 
//   onNext, 
//   onPrevious,
//   onEdit 
// }) => {
//   const { formData, saveAsDraft } = useRequirement();

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

//   const getCategoryIcon = () => {
//     switch (formData.category) {
//       case "Expert":
//         return <User className="h-5 w-5 text-blue-600" />;
//       case "Product":
//         return <Package className="h-5 w-5 text-green-600" />;
//       case "Services":
//         return <Wrench className="h-5 w-5 text-purple-600" />;
//       case "Logistics":
//         return <Truck className="h-5 w-5 text-orange-600" />;
//       default:
//         return null;
//     }
//   };

//   const formatDate = (date: Date | null | undefined) => {
//     if (!date) return "Not specified";
//     return format(new Date(date), "dd-MM-yyyy");
//   };

//   const formatList = (list: string[] | undefined) => {
//     if (!list || list.length === 0) return "None specified";
//     return list.join(", ");
//   };

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Preview Requirement</h2>
//             <p className="text-gray-600 mt-1">
//               Review all details before proceeding to the final approval step.
//             </p>
//           </div>
//           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//             Step 5 of 6
//           </Badge>
//         </div>
//       </div>

//       {/* Basic Info Summary */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="h-8 gap-1 text-gray-500 hover:text-blue-600"
//             onClick={() => onEdit(1)}
//           >
//             <Edit className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900">
//                 {formData.title || "Untitled Requirement"}
//               </h3>
//             </div>
//             <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
//               {getCategoryIcon()}
//               <span className="capitalize">{formData.category || "No Category"}</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Details Summary */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-lg font-medium">Requirement Details</CardTitle>
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="h-8 gap-1 text-gray-500 hover:text-blue-600"
//             onClick={() => onEdit(2)}
//           >
//             <Edit className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {(formData.category === "Expert") && (
//               <>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Specialization</p>
//                     <p className="mt-1">{formData.specialization || "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Budget</p>
//                     <p className="mt-1">{formData.budget ? `$${formData.budget.toLocaleString()}` : "Not specified"}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Description</p>
//                   <p className="mt-1 whitespace-pre-line">{formData.description || "Not specified"}</p>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Duration</p>
//                     <p className="mt-1">{formData.duration ? `${formData.duration} days` : "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Certifications</p>
//                     <p className="mt-1">{formatList(formData.certifications)}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Start Date</p>
//                     <p className="mt-1">{formatDate(formData.startDate)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">End Date</p>
//                     <p className="mt-1">{formatDate(formData.endDate)}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {(formData.category === "Product") && (
//               <>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Product Specifications</p>
//                   <p className="mt-1 whitespace-pre-line">{formData.productSpecifications || "Not specified"}</p>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Quantity</p>
//                     <p className="mt-1">{formData.quantity || "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Budget</p>
//                     <p className="mt-1">{formData.budget ? `$${formData.budget.toLocaleString()}` : "Not specified"}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Delivery Date</p>
//                     <p className="mt-1">{formatDate(formData.deliveryDate)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Quality Requirements</p>
//                     <p className="mt-1">{formData.qualityRequirements || "Not specified"}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {(formData.category === "Services") && (
//               <>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Service Description</p>
//                   <p className="mt-1 whitespace-pre-line">{formData.serviceDescription || "Not specified"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Scope of Work</p>
//                   <p className="mt-1 whitespace-pre-line">{formData.scopeOfWork || "Not specified"}</p>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Budget</p>
//                     <p className="mt-1">{formData.serviceBudget ? `$${formData.serviceBudget.toLocaleString()}` : "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Location</p>
//                     <p className="mt-1">{formData.location || "Not specified"}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Start Date</p>
//                     <p className="mt-1">{formatDate(formData.serviceStartDate)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">End Date</p>
//                     <p className="mt-1">{formatDate(formData.serviceEndDate)}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {(formData.category === "Logistics") && (
//               <>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Equipment Type</p>
//                     <p className="mt-1">{formData.equipmentType || "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Weight</p>
//                     <p className="mt-1">{formData.weight ? `${formData.weight} kg` : "Not specified"}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Dimensions</p>
//                     <p className="mt-1">{formData.dimensions || "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Special Handling</p>
//                     <p className="mt-1 whitespace-pre-line">{formData.specialHandling || "None"}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Pickup Location</p>
//                     <p className="mt-1">{formData.pickupLocation || "Not specified"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Delivery Location</p>
//                     <p className="mt-1">{formData.deliveryLocation || "Not specified"}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Pickup Date</p>
//                     <p className="mt-1">{formatDate(formData.pickupDate)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Delivery Date</p>
//                     <p className="mt-1">{formatDate(formData.deliveryDate)}</p>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Documents Summary */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-lg font-medium">Documents</CardTitle>
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="h-8 gap-1 text-gray-500 hover:text-blue-600"
//             onClick={() => onEdit(3)}
//           >
//             <Edit className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//         </CardHeader>
//         <CardContent>
//           {formData.documents.length === 0 ? (
//             <p className="text-gray-500">No documents attached</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//               {formData.documents.map((doc) => (
//                 <div
//                   key={doc.id}
//                   className="flex items-center gap-3 rounded-md border p-3"
//                 >
//                   <File className="h-5 w-5 text-blue-600" />
//                   <div className="flex-1 truncate">
//                     <p className="font-medium text-gray-900 truncate">{doc.name}</p>
//                     <p className="text-xs text-gray-500 capitalize">{doc.documentType}</p>
//                   </div>
//                   <a
//                     href={doc.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs font-medium text-blue-600 hover:underline"
//                   >
//                     View
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Publish Settings Summary */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-lg font-medium">Publish Settings</CardTitle>
//           <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500 hover:text-blue-600" onClick={() => onEdit(4)}>
//             <Edit className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//         </CardHeader>
//         <CardContent className="pt-4 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex items-start gap-3">
             
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Visibility</p>
//                 <p className="mt-1 capitalize">{formData.visibility === 'selected' ? 'Selected Vendors Only' : 'All Relevant Vendors'}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
              
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Submission Deadline</p>
//                 <p className="mt-1">{formatDate(formData.submissionDeadline)}</p>
//               </div>
//             </div>
//           </div>
//           {formData.visibility === 'selected' && (
//             <div className="flex items-start gap-3 pt-2">
              
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Invited Vendors</p>
//                 <p className="mt-1">{formatList(formData.invitedSuppliers) || "No vendors selected"}</p>
//               </div>
//             </div>
//           )}
//           <div className="space-y-3 pt-2">
//             <div className="flex items-start gap-3">
              
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Evaluation Criteria</p>
//                 {formData.evaluationCriteria && formData.evaluationCriteria.length > 0 ? (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {formData.evaluationCriteria.map(criterion => (
//                       <Badge key={criterion} variant="secondary">{criterion}</Badge>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="mt-1">No criteria selected</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
      
//       <div className="flex justify-between items-center w-full pt-6">
//         <Button variant="outline" onClick={onPrevious}>
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
//             onClick={onNext} 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
//           >
//             Proceed to Approval Workflow
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewStep;
import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { 
  Package, 
  User, 
  Wrench, 
  Truck, 
  Edit, 
  File, 
  Eye,
  Globe, 
  CalendarDays, 
  Users, 
  ClipboardCheck
} from "lucide-react";
import { StepType } from "@/pages/CreateRequirement";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PreviewStepProps {
  onNext: () => void;
  onPrevious: () => void;
  onEdit: (step: StepType) => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ 
  onNext, 
  onPrevious,
  onEdit 
}) => {
  const { formData, saveAsDraft, isWorkflowLocked } = useRequirement();

  const handleSaveAsDraft = async () => {
    if (isWorkflowLocked) {
      toast.error("Cannot save draft after workflow is confirmed.");
      return;
    }

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

  const getCategoryIcon = () => {
    switch (formData.category) {
      case "Expert":
        return <User className="h-5 w-5 text-blue-600" />;
      case "Product":
        return <Package className="h-5 w-5 text-green-600" />;
      case "Services":
        return <Wrench className="h-5 w-5 text-purple-600" />;
      case "Logistics":
        return <Truck className="h-5 w-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Not specified";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const formatList = (list: string[] | undefined) => {
    if (!list || list.length === 0) return "None specified";
    return list.join(", ");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Preview Requirement</h2>
            <p className="text-gray-600 mt-1">
              Review all details before proceeding to the final approval step.
            </p>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                This requirement has been confirmed and is now read-only.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 5 of 6
            </Badge>
            {isWorkflowLocked && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Read-only Mode
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
          {isWorkflowLocked ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(1)}
            >
              <Eye className="h-4 w-4 text-blue-500" />
              <span>View</span>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(1)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {formData.title || "Untitled Requirement"}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              {getCategoryIcon()}
              <span className="capitalize">{formData.category || "No Category"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Requirement Details</CardTitle>
          {isWorkflowLocked ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(2)}
            >
              <Eye className="h-4 w-4 text-blue-500" />
              <span>View</span>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(2)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {(formData.category === "Expert") && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Specialization</p>
                    <p className="mt-1">{formData.specialization || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="mt-1">{formData.budget ? `$${formData.budget.toLocaleString()}` : "Not specified"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="mt-1 whitespace-pre-line">{formData.description || "Not specified"}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="mt-1">{formData.duration ? `${formData.duration} days` : "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Certifications</p>
                    <p className="mt-1">{formatList(formData.certifications)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="mt-1">{formatDate(formData.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">End Date</p>
                    <p className="mt-1">{formatDate(formData.endDate)}</p>
                  </div>
                </div>
              </>
            )}

            {(formData.category === "Product") && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500">Product Specifications</p>
                  <p className="mt-1 whitespace-pre-line">{formData.productSpecifications || "Not specified"}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                    <p className="mt-1">{formData.quantity || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="mt-1">{formData.budget ? `$${formData.budget.toLocaleString()}` : "Not specified"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                    <p className="mt-1">{formatDate(formData.deliveryDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quality Requirements</p>
                    <p className="mt-1">{formData.qualityRequirements || "Not specified"}</p>
                  </div>
                </div>
              </>
            )}

            {(formData.category === "Services") && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service Description</p>
                  <p className="mt-1 whitespace-pre-line">{formData.serviceDescription || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Scope of Work</p>
                  <p className="mt-1 whitespace-pre-line">{formData.scopeOfWork || "Not specified"}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="mt-1">{formData.budget ? `$${formData.budget.toLocaleString()}` : "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1">{formData.location || "Not specified"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="mt-1">{formatDate(formData.serviceStartDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">End Date</p>
                    <p className="mt-1">{formatDate(formData.serviceEndDate)}</p>
                  </div>
                </div>
              </>
            )}

            {(formData.category === "Logistics") && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Equipment Type</p>
                    <p className="mt-1">{formData.equipmentType || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p className="mt-1">{formData.weight ? `${formData.weight} kg` : "Not specified"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dimensions</p>
                    <p className="mt-1">{formData.dimensions || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Special Handling</p>
                    <p className="mt-1 whitespace-pre-line">{formData.specialHandling || "None"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pickup Location</p>
                    <p className="mt-1">{formData.pickupLocation || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery Location</p>
                    <p className="mt-1">{formData.deliveryLocation || "Not specified"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pickup Date</p>
                    <p className="mt-1">{formatDate(formData.pickupDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                    <p className="mt-1">{formatDate(formData.deliveryDate)}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Documents</CardTitle>
          {isWorkflowLocked ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(3)}
            >
              <Eye className="h-4 w-4 text-blue-500" />
              <span>View</span>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(3)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {formData.documents && formData.documents.length === 0 ? (
            <p className="text-gray-500">No documents attached</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {formData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-md border p-3"
                >
                  <File className="h-5 w-5 text-blue-600" />
                  <div className="flex-1 truncate">
                    <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{doc.documentType}</p>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Publish Settings Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Publish Settings</CardTitle>
          {isWorkflowLocked ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(4)}
            >
              <Eye className="h-4 w-4 text-blue-500"  />
              <span>View</span>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(4)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Visibility</p>
                <p className="mt-1 capitalize">{formData.visibility === 'selected' ? 'Selected Vendors Only' : 'All Relevant Vendors'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Deadline</p>
                <p className="mt-1">{formatDate(formData.submissionDeadline)}</p>
              </div>
            </div>
          </div>
          {formData.visibility === 'selected' && (
            <div className="flex items-start gap-3 pt-2">
              <Users className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Invited Vendors</p>
                <p className="mt-1">{formatList(formData.invitedSuppliers) || "No vendors selected"}</p>
              </div>
            </div>
          )}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Evaluation Criteria</p>
                {formData.evaluationCriteria && formData.evaluationCriteria.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.evaluationCriteria.map(criterion => (
                      <Badge key={criterion} variant="secondary">{criterion}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1">No criteria selected</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
            onClick={handleSaveAsDraft}
            disabled={!formData.title || isWorkflowLocked}
          >
            Save as Draft
          </Button>
          <Button 
            onClick={onNext} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Proceed to Approval Workflow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;