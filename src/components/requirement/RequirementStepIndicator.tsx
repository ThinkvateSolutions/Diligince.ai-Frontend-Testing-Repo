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
  { id: 1, name: "Basic Info", description: "Project details", icon: Info },
  { id: 2, name: "Details", description: "Specifications", icon: FileText },
  { id: 3, name: "Documents", description: "Supporting files", icon: Upload },
  { id: 4, name: "Criteria", description: "Set visibility", icon: Send },
  { id: 5, name: "Preview", description: "Review requirement", icon: Eye },
  { id: 6, name: "Workflow", description: "Define approvers", icon: GitBranch },
];

const RequirementStepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  // A step is 'completed' if its ID is less than the current step.
  const getStepStatus = (stepId: number): "completed" | "current" | "upcoming" => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
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
              {index < steps.length - 1 && (
                // Adjusted margin for tighter fit
                <div className={`flex-1 h-1.5 mt-7 mx-1 rounded ${connectorClasses}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RequirementStepIndicator;