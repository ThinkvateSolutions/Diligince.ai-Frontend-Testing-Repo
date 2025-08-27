
// import React from "react";
// import { cn } from "@/lib/utils";
// import { POStepType } from "@/pages/CreatePurchaseOrder";

// interface StepIndicatorProps {
//   currentStep: POStepType;
//   onStepClick: (step: POStepType) => void;
// }

// const steps = [
//   { id: 1, name: "RFQ Info" },
//   { id: 2, name: "Compare Quotes" },
//   { id: 3, name: "PO Details" },
//   { id: 4, name: "Review" },
//   { id: 5, name: "Issue" },
// ];

// const PurchaseOrderStepIndicator: React.FC<StepIndicatorProps> = ({
//   currentStep,
//   onStepClick,
// }) => {
//   const isStepCompleted = (stepId: number) => {
//     return stepId < currentStep;
//   };

//   const isStepActive = (stepId: number) => {
//     return stepId === currentStep;
//   };

//   const isStepAccessible = (stepId: number) => {
//     // First step is always accessible
//     if (stepId === 1) return true;
    
//     // Current step and previous steps are always accessible
//     if (stepId <= currentStep) return true;
    
//     // Allow access to the next step
//     return stepId === currentStep + 1;
//   };

//   return (
//     <div className="w-full">
//       <div className="hidden md:block">
//         <nav aria-label="Progress">
//           <ol className="flex items-center">
//             {steps.map((step, index) => (
//               <li
//                 key={step.id}
//                 className={cn(
//                   "relative flex items-center",
//                   index === 0 ? "pr-8" : "px-8",
//                   index === steps.length - 1 ? "w-10" : "w-full"
//                 )}
//               >
//                 <button
//                   type="button"
//                   onClick={() => isStepAccessible(step.id) && onStepClick(step.id as POStepType)}
//                   className={cn(
//                     "group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 font-medium focus:outline-none",
//                     isStepCompleted(step.id)
//                       ? "border-blue-600 bg-blue-600 text-white"
//                       : isStepActive(step.id)
//                       ? "border-blue-600 bg-white text-blue-600"
//                       : "border-gray-300 bg-white text-gray-500",
//                     !isStepAccessible(step.id) && "cursor-not-allowed opacity-50"
//                   )}
//                   disabled={!isStepAccessible(step.id)}
//                 >
//                   <span className="text-sm">{step.id}</span>
//                 </button>
//                 <div className="absolute -bottom-8 text-center" style={{ width: "100px", marginLeft: "-45px" }}>
//                   <span className={cn(
//                     "text-xs font-medium",
//                     isStepActive(step.id) ? "text-blue-600" : "text-gray-700"
//                   )}>
//                     {step.name}
//                   </span>
//                 </div>
//                 {index !== steps.length - 1 && (
//                   <div className={cn(
//                     "absolute right-0 top-0 hidden h-0.5 w-full md:block",
//                     isStepCompleted(step.id)
//                       ? "bg-blue-600"
//                       : "bg-gray-300"
//                   )} style={{ transform: "translateY(20px)" }} />
//                 )}
//               </li>
//             ))}
//           </ol>
//         </nav>
//       </div>

//       {/* Mobile version */}
//       <div className="md:hidden">
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium text-gray-700">
//             Step {currentStep} of {steps.length}
//           </span>
//           <span className="text-sm font-medium text-blue-600">
//             {steps.find(step => step.id === currentStep)?.name}
//           </span>
//         </div>
//         <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
//           <div
//             className="h-2 rounded-full bg-blue-600"
//             style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseOrderStepIndicator;
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { POStepType } from "@/pages/CreatePurchaseOrder";

interface StepIndicatorProps {
  currentStep: POStepType;
  onStepClick: (step: POStepType) => void;
}

const steps = [
  { id: 1, name: "RFQ Info" },
  { id: 2, name: "Compare Quotes" },
  { id: 3, name: "PO Details" },
  { id: 4, name: "Review" },
  { id: 5, name: "Issue" },
];

const PurchaseOrderStepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  const [maxReachedStep, setMaxReachedStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep > maxReachedStep) {
      setMaxReachedStep(currentStep);
    }
  }, [currentStep, maxReachedStep]);


  const isStepCompleted = (stepId: number) => {
    return stepId < currentStep;
  };

  const isStepActive = (stepId: number) => {
    return stepId === currentStep;
  };

  const isStepAccessible = (stepId: number) => {
    // Any step that has been reached or is the next one is clickable
    return stepId <= maxReachedStep + 1;
  };

  return (
    <div className="w-full">
      {/* --- REPLACEMENT START --- */}
      {/* New Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-start w-full">
            {steps.map((step, index) => {
                const completed = isStepCompleted(step.id);
                const active = isStepActive(step.id);
                const accessible = isStepAccessible(step.id);

                const circleClasses = cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-colors duration-300",
                    completed ? "bg-green-600 border-green-600 text-white"
                              : active ? "bg-white border-blue-600 text-blue-600"
                                       : "bg-gray-200 border-gray-200 text-gray-500",
                    accessible && "cursor-pointer hover:border-blue-700",
                    !accessible && "cursor-not-allowed"
                );

                const textClasses = cn(
                    "mt-2 text-xs font-medium transition-colors duration-300",
                    completed ? "text-green-700"
                              : active ? "text-blue-600"
                                       : "text-gray-500"
                );
                
                const connectorClasses = completed ? 'bg-green-600' : 'bg-gray-200';
                
                return (
                    <React.Fragment key={step.name}>
                        <div className="flex flex-col items-center text-center w-32">
                            <button
                              type="button"
                              onClick={() => accessible && onStepClick(step.id as POStepType)}
                              className={circleClasses}
                              disabled={!accessible}
                            >
                                {step.id}
                            </button>
                            <p className={textClasses}>
                                {step.name}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mt-6 mx-2 rounded ${connectorClasses} transition-colors duration-300`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
      </div>
      {/* --- REPLACEMENT END --- */}


      {/* Mobile version (Unchanged - it's already a great design for mobile) */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {steps.find(step => step.id === currentStep)?.name}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${((maxReachedStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderStepIndicator;