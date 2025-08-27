<<<<<<< HEAD
// import React from "react";
// // --- MODIFICATION: Icons imported from lucide-react ---
// import {
//   Info,
//   FileText,
//   Upload,
//   GitBranch,
//   Eye,
//   Send,
//   Check,
// } from "lucide-react";
// import { StepType } from "@/pages/CreateRequirement";
// import { cn } from "@/lib/utils";
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)

// interface StepIndicatorProps {
//   // Example: pass 3 to see "Documents" as the current step
//   currentStep: StepType;
// }

// // --- MODIFICATION: Added the 'icon' property to each step ---
// const steps = [
//   { id: 1, name: "Basic Info", description: "Project details", icon: Info },
//   { id: 2, name: "Details", description: "Specifications", icon: FileText },
//   { id: 3, name: "Documents", description: "Supporting files", icon: Upload },
//   { id: 4, name: "Workflow", description: "Approval process", icon: GitBranch },
//   { id: 5, name: "Preview", description: "Review requirement", icon: Eye },
//   { id: 6, name: "Publish", description: "Submit & publish", icon: Send },
// ];

// const RequirementStepIndicator: React.FC<StepIndicatorProps> = ({
//   currentStep,
// }) => {
//   // A step is 'completed' if its ID is less than the current step.
//   const getStepStatus = (stepId: number): "completed" | "current" | "upcoming" => {
//     if (stepId < currentStep) return "completed";
//     if (stepId === currentStep) return "current";
//     return "upcoming";
//   };

//   return (
//     // Card container is kept for the prominent style
//     <div className="bg-white rounded-xl shadow-md p-6">
     
//       <div className="flex items-start w-full">
//         {steps.map((step, index) => {
//           const status = getStepStatus(step.id);
//           // --- MODIFICATION: Get the Icon component for the current step ---
//           const Icon = step.icon;

//           const isCompleted = status === 'completed';
//           const isActive = status === 'current';

//           const circleClasses = cn(
//             "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
//             isCompleted ? "bg-green-500"
//                         : isActive ? "bg-blue-600"
//                                    : "bg-gray-100",
//           );

//           // --- MODIFICATION: Classes for the icon itself ---
//           const iconClasses = cn(
//             "w-8 h-8 transition-colors duration-300",
//             isActive ? "text-white" : "text-gray-500"
//           );

//           const nameTextClasses = cn(
//             "mt-3 text-sm font-semibold text-center",
//             isCompleted ? "text-green-600"
//                         : isActive ? "text-blue-600"
//                                    : "text-gray-600"
//           );

//           const descriptionTextClasses = "mt-1 text-xs text-center text-gray-500";
          
//           const connectorClasses = isCompleted ? 'bg-green-500' : 'bg-gray-200';

//           return (
//             <React.Fragment key={step.id}>
//               {/* Adjusted width to better accommodate 6 steps */}
//               <div className="flex flex-col items-center" style={{ width: '130px' }}>
//                 <div className={circleClasses}>
//                   {/* --- MODIFICATION: Replaced step.id number with icons --- */}
//                   {isCompleted ? (
//                     <Check className="w-9 h-9 text-white" />
//                   ) : (
//                     <Icon className={iconClasses} />
//                   )}
//                 </div>
//                 <h3 className={nameTextClasses}>
//                   {step.name}
//                 </h3>
//                 <p className={descriptionTextClasses}>
//                   {step.description}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 // Adjusted margin for tighter fit
//                 <div className={`flex-1 h-1.5 mt-7 mx-1 rounded ${connectorClasses}`}></div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RequirementStepIndicator;
import React from "react";
import {
  Info,
  FileText,
  Upload,
  Send, // Corresponds to Publish
  Eye,  // Corresponds to Preview
  GitBranch, // Corresponds to Workflow
  Check,
} from "lucide-react";
import { StepType } from "@/pages/CreateRequirement";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: StepType;
}

// --- MODIFICATION: The 'steps' array is reordered as requested ---
const steps = [
<<<<<<< HEAD
=======
  { 
    id: 1, 
    name: "Basic Info", 
    description: "Project details and requirements",
    icon: Info 
  },
  { 
    id: 2, 
    name: "Details", 
    description: "Specifications and technical requirements",
    icon: FileText 
  },
  { 
    id: 3, 
    name: "Documents", 
    description: "Upload supporting files",
    icon: Upload 
  },
  { 
    id: 4, 
    name: "Workflow", 
    description: "Set approval workflow",
    icon: GitBranch 
  },
  { 
    id: 5, 
    name: "Preview", 
    description: "Review your requirement",
    icon: Eye 
  },
  { 
    id: 6, 
    name: "Publish", 
    description: "Submit and publish requirement",
    icon: Send 
  },
=======
// import React from "react";
// // --- MODIFICATION: Icons imported from lucide-react ---
// import {
//   Info,
//   FileText,
//   Upload,
//   GitBranch,
//   Eye,
//   Send,
//   Check,
// } from "lucide-react";
// import { StepType } from "@/pages/CreateRequirement";
// import { cn } from "@/lib/utils";

// interface StepIndicatorProps {
//   // Example: pass 3 to see "Documents" as the current step
//   currentStep: StepType;
// }

// // --- MODIFICATION: Added the 'icon' property to each step ---
// const steps = [
//   { id: 1, name: "Basic Info", description: "Project details", icon: Info },
//   { id: 2, name: "Details", description: "Specifications", icon: FileText },
//   { id: 3, name: "Documents", description: "Supporting files", icon: Upload },
//   { id: 4, name: "Workflow", description: "Approval process", icon: GitBranch },
//   { id: 5, name: "Preview", description: "Review requirement", icon: Eye },
//   { id: 6, name: "Publish", description: "Submit & publish", icon: Send },
// ];

// const RequirementStepIndicator: React.FC<StepIndicatorProps> = ({
//   currentStep,
// }) => {
//   // A step is 'completed' if its ID is less than the current step.
//   const getStepStatus = (stepId: number): "completed" | "current" | "upcoming" => {
//     if (stepId < currentStep) return "completed";
//     if (stepId === currentStep) return "current";
//     return "upcoming";
//   };

//   return (
//     // Card container is kept for the prominent style
//     <div className="bg-white rounded-xl shadow-md p-6">
     
//       <div className="flex items-start w-full">
//         {steps.map((step, index) => {
//           const status = getStepStatus(step.id);
//           // --- MODIFICATION: Get the Icon component for the current step ---
//           const Icon = step.icon;

//           const isCompleted = status === 'completed';
//           const isActive = status === 'current';

//           const circleClasses = cn(
//             "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
//             isCompleted ? "bg-green-500"
//                         : isActive ? "bg-blue-600"
//                                    : "bg-gray-100",
//           );

//           // --- MODIFICATION: Classes for the icon itself ---
//           const iconClasses = cn(
//             "w-8 h-8 transition-colors duration-300",
//             isActive ? "text-white" : "text-gray-500"
//           );

//           const nameTextClasses = cn(
//             "mt-3 text-sm font-semibold text-center",
//             isCompleted ? "text-green-600"
//                         : isActive ? "text-blue-600"
//                                    : "text-gray-600"
//           );

//           const descriptionTextClasses = "mt-1 text-xs text-center text-gray-500";
          
//           const connectorClasses = isCompleted ? 'bg-green-500' : 'bg-gray-200';

//           return (
//             <React.Fragment key={step.id}>
//               {/* Adjusted width to better accommodate 6 steps */}
//               <div className="flex flex-col items-center" style={{ width: '130px' }}>
//                 <div className={circleClasses}>
//                   {/* --- MODIFICATION: Replaced step.id number with icons --- */}
//                   {isCompleted ? (
//                     <Check className="w-9 h-9 text-white" />
//                   ) : (
//                     <Icon className={iconClasses} />
//                   )}
//                 </div>
//                 <h3 className={nameTextClasses}>
//                   {step.name}
//                 </h3>
//                 <p className={descriptionTextClasses}>
//                   {step.description}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 // Adjusted margin for tighter fit
//                 <div className={`flex-1 h-1.5 mt-7 mx-1 rounded ${connectorClasses}`}></div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RequirementStepIndicator;
import React from "react";
import {
  Info,
  FileText,
  Upload,
  Send, // Corresponds to Publish
  Eye,  // Corresponds to Preview
  GitBranch, // Corresponds to Workflow
  Check,
} from "lucide-react";
import { StepType } from "@/pages/CreateRequirement";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: StepType;
}

// --- MODIFICATION: The 'steps' array is reordered as requested ---
const steps = [
>>>>>>> 9b0ce35 (Initial commit)
  { id: 1, name: "Basic Info", description: "Project details", icon: Info },
  { id: 2, name: "Details", description: "Specifications", icon: FileText },
  { id: 3, name: "Documents", description: "Supporting files", icon: Upload },
  { id: 4, name: "Criteria", description: "Set visibility", icon: Send },
  { id: 5, name: "Preview", description: "Review requirement", icon: Eye },
  { id: 6, name: "Workflow", description: "Define approvers", icon: GitBranch },
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
];

const RequirementStepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
<<<<<<< HEAD
}) => {
  // A step is 'completed' if its ID is less than the current step.
  const getStepStatus = (stepId: number): "completed" | "current" | "upcoming" => {
    if (stepId < currentStep) return "completed";
=======
<<<<<<< HEAD
  onStepClick,
}) => {
  const { formData } = useRequirement();

  const isStepCompleted = (stepId: number) => {
    if (stepId === 1) {
      return !!formData.title && !!formData.category;
    } else if (stepId === 2) {
      if (formData.category === "expert") {
        return !!formData.specialization && !!formData.description;
      } else if (formData.category === "product") {
        return !!formData.productSpecifications && !!formData.quantity;
      } else if (formData.category === "service") {
        return !!formData.serviceDescription && !!formData.scopeOfWork;
      } else if (formData.category === "logistics") {
        return !!formData.equipmentType && !!formData.pickupLocation && !!formData.deliveryLocation;
      }
      return false;
    } else if (stepId === 3) {
      return true; // Documents are optional
    } else if (stepId === 4) {
      return true; // Workflow setup is optional for some requirements
    } else if (stepId === 5) {
      return true; // Preview is just viewing
    } else if (stepId === 6) {
      return formData.termsAccepted;
    }
    return false;
  };

  const isStepAccessible = (stepId: number) => {
    if (stepId === 1) return true;
    if (stepId >= 2 && !isStepCompleted(1)) return false;
    if (stepId >= 3 && !isStepCompleted(2)) return false;
    if (stepId <= currentStep) return true;
    return stepId === currentStep + 1;
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep || isStepCompleted(stepId)) return "completed";
=======
}) => {
  // A step is 'completed' if its ID is less than the current step.
  const getStepStatus = (stepId: number): "completed" | "current" | "upcoming" => {
    if (stepId < currentStep) return "completed";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
<<<<<<< HEAD
    // Card container is kept for the prominent style
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
=======
<<<<<<< HEAD
    <div className="w-full py-8">
      {/* Desktop version */}
      <div className="hidden lg:block">
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const isAccessible = isStepAccessible(step.id);
              const isLastStep = index === steps.length - 1;
              
              return (
                <div key={step.id} className="flex items-center">
                  {/* Step circle and content */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => isAccessible && onStepClick(step.id as StepType)}
                      disabled={!isAccessible}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
                        status === "completed" && "bg-green-500 border-green-500 text-white",
                        status === "current" && "bg-blue-500 border-blue-500 text-white",
                        status === "upcoming" && isAccessible && "bg-white border-gray-300 text-gray-600 hover:border-blue-400",
                        status === "upcoming" && !isAccessible && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </button>
                    
                    <div className="mt-3 text-center">
                      <h3 className={cn(
                        "text-sm font-medium",
                        status === "completed" && "text-green-600",
                        status === "current" && "text-blue-600",
                        status === "upcoming" && "text-gray-500"
                      )}>
                        {step.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-24">
                        {step.description}
                      </p>
                    </div>
                  </div>
>>>>>>> 9b0ce35 (Initial commit)

          const isCompleted = status === 'completed';
          const isActive = status === 'current';

          const circleClasses = cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isCompleted
              ? "bg-green-500"
              : isActive
              ? "bg-blue-600"
              : "bg-gray-100",
          );

          const iconClasses = cn(
            "w-8 h-8 transition-colors duration-300",
            isActive ? "text-white" : "text-gray-500"
          );

          const nameTextClasses = cn(
            "mt-3 text-sm font-semibold text-center",
            isCompleted
              ? "text-green-600"
              : isActive
              ? "text-blue-600"
              : "text-gray-600"
          );

          const descriptionTextClasses = "mt-1 text-xs text-center text-gray-500";
          
          const connectorClasses = isCompleted ? 'bg-green-500' : 'bg-gray-200';

          return (
            <React.Fragment key={step.id}>
              {/* Adjusted width to better accommodate 6 steps */}
              <div className="flex flex-col items-center" style={{ width: '130px' }}>
                <div className={circleClasses}>
                  {isCompleted ? (
                    <Check className="w-9 h-9 text-white" />
                  ) : (
                    <Icon className={iconClasses} />
                  )}
                </div>
                <h3 className={nameTextClasses}>
                  {step.name}
                </h3>
                <p className={descriptionTextClasses}>
                  {step.description}
                </p>
              </div>
<<<<<<< HEAD
=======
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Mobile progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(8, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex justify-center space-x-3">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => isStepAccessible(step.id) && onStepClick(step.id as StepType)}
                  disabled={!isStepAccessible(step.id)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-200",
                    status === "completed" && "bg-green-500",
                    status === "current" && "bg-blue-500",
                    status === "upcoming" && "bg-gray-300"
                  )}
                />
              );
            })}
          </div>
        </div>
=======
    // Card container is kept for the prominent style
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          const isCompleted = status === 'completed';
          const isActive = status === 'current';

          const circleClasses = cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isCompleted
              ? "bg-green-500"
              : isActive
              ? "bg-blue-600"
              : "bg-gray-100",
          );

          const iconClasses = cn(
            "w-8 h-8 transition-colors duration-300",
            isActive ? "text-white" : "text-gray-500"
          );

          const nameTextClasses = cn(
            "mt-3 text-sm font-semibold text-center",
            isCompleted
              ? "text-green-600"
              : isActive
              ? "text-blue-600"
              : "text-gray-600"
          );

          const descriptionTextClasses = "mt-1 text-xs text-center text-gray-500";
          
          const connectorClasses = isCompleted ? 'bg-green-500' : 'bg-gray-200';

          return (
            <React.Fragment key={step.id}>
              {/* Adjusted width to better accommodate 6 steps */}
              <div className="flex flex-col items-center" style={{ width: '130px' }}>
                <div className={circleClasses}>
                  {isCompleted ? (
                    <Check className="w-9 h-9 text-white" />
                  ) : (
                    <Icon className={iconClasses} />
                  )}
                </div>
                <h3 className={nameTextClasses}>
                  {step.name}
                </h3>
                <p className={descriptionTextClasses}>
                  {step.description}
                </p>
              </div>
>>>>>>> 9b0ce35 (Initial commit)
              {index < steps.length - 1 && (
                // Adjusted margin for tighter fit
                <div className={`flex-1 h-1.5 mt-7 mx-1 rounded ${connectorClasses}`}></div>
              )}
            </React.Fragment>
          );
        })}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default RequirementStepIndicator;
=======
<<<<<<< HEAD
export default RequirementStepIndicator;
=======
export default RequirementStepIndicator;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
