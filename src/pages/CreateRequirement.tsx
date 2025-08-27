<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IndustryHeader from "@/components/industry/IndustryHeader";
import RequirementStepIndicator from "@/components/requirement/RequirementStepIndicator";
import EnhancedBasicInfoStep from "@/components/requirement/steps/EnhancedBasicInfoStep";
import DetailsStep from "@/components/requirement/steps/DetailsStep";
import DocumentsStep from "@/components/requirement/steps/DocumentsStep";
<<<<<<< HEAD
import PublishStep from "@/components/requirement/steps/PublishStep";
import PreviewStep from "@/components/requirement/steps/PreviewStep";
import ApprovalWorkflowStep from "@/components/requirement/steps/ApprovalWorkflowStep";
=======
<<<<<<< HEAD
import ApprovalWorkflowStep from "@/components/requirement/steps/ApprovalWorkflowStep";
import PreviewStep from "@/components/requirement/steps/PreviewStep";
import PublishStep from "@/components/requirement/steps/PublishStep";
=======
import PublishStep from "@/components/requirement/steps/PublishStep";
import PreviewStep from "@/components/requirement/steps/PreviewStep";
import ApprovalWorkflowStep from "@/components/requirement/steps/ApprovalWorkflowStep";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import SuccessScreen from "@/components/requirement/SuccessScreen";
import { RequirementProvider } from "@/contexts/RequirementContext";
import { StakeholderProvider } from "@/contexts/StakeholderContext";
import { ApprovalProvider } from "@/contexts/ApprovalContext";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

<<<<<<< HEAD
export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Total steps are 7 with success as step 7

const CreateRequirement = () => {
  console.log("CreateRequirement component mounting...");

=======
<<<<<<< HEAD
export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const CreateRequirement = () => {
  console.log("CreateRequirement component mounting...");
  
=======
export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Total steps are 7 with success as step 7

const CreateRequirement = () => {
  console.log("CreateRequirement component mounting...");

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Current step:", currentStep);
    if (currentStep < 7) {
      const nextStep = (currentStep + 1) as StepType;
      console.log("Moving to step:", nextStep);
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = (currentStep - 1) as StepType;
      console.log("Moving back to step:", prevStep);
      setCurrentStep(prevStep);
    }
  };

  const handleGoToStep = (step: StepType) => {
    console.log("Jumping to step:", step);
    setCurrentStep(step);
  };

  const handleReturnToDashboard = () => {
    navigate("/industry-dashboard");
  };

  const renderStep = () => {
    console.log("Rendering step:", currentStep);
<<<<<<< HEAD

    try {
      switch (currentStep) {
=======
<<<<<<< HEAD
    
    try {
      switch(currentStep) {
=======

    try {
      switch (currentStep) {
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        case 1:
          return <EnhancedBasicInfoStep onNext={handleNext} />;
        case 2:
          return <DetailsStep onNext={handleNext} onPrevious={handlePrevious} />;
        case 3:
          return <DocumentsStep onNext={handleNext} onPrevious={handlePrevious} />;
        case 4:
<<<<<<< HEAD
          return <PublishStep onNext={handleNext} onPrevious={handlePrevious} />;
=======
<<<<<<< HEAD
          return <ApprovalWorkflowStep onNext={handleNext} onPrevious={handlePrevious} />;
>>>>>>> 9b0ce35 (Initial commit)
        case 5:
          return (
            <PreviewStep
              onNext={handleNext}
              onPrevious={handlePrevious}
              onEdit={handleGoToStep}
            />
          );
        case 6:
          return <ApprovalWorkflowStep onNext={handleNext} onPrevious={handlePrevious} />;
        case 7:
          return (
<<<<<<< HEAD
=======
            <SuccessScreen 
              onCreateAnother={() => setCurrentStep(1)} 
              onViewRequirement={() => navigate("/industry-requirements")} 
              onReturnToDashboard={handleReturnToDashboard} 
=======
          return <PublishStep onNext={handleNext} onPrevious={handlePrevious} />;
        case 5:
          return (
            <PreviewStep
              onNext={handleNext}
              onPrevious={handlePrevious}
              onEdit={handleGoToStep}
            />
          );
        case 6:
          return <ApprovalWorkflowStep onNext={handleNext} onPrevious={handlePrevious} />;
        case 7:
          return (
>>>>>>> 9b0ce35 (Initial commit)
            <SuccessScreen
              onCreateAnother={() => setCurrentStep(1)}
              onViewRequirement={() => navigate("/industry-requirements")}
              onReturnToDashboard={handleReturnToDashboard}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            />
          );
        default:
          console.error("Invalid step:", currentStep);
          return <div>Invalid step</div>;
      }
    } catch (error) {
      console.error("Error rendering step:", error);
      return (
        <div className="p-8 text-center">
          <p className="text-red-600 mb-4">Error rendering step {currentStep}</p>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <p className="text-sm text-gray-600 mb-4">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onClick={() => setCurrentStep(1)} className="px-4 py-2 bg-blue-600 text-white rounded">
=======
>>>>>>> 9b0ce35 (Initial commit)
          <p className="text-sm text-gray-600 mb-4">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            Return to Step 1
          </button>
        </div>
      );
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  console.log("Creating provider chain...");

=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  return (
    <ErrorBoundary>
      <ApprovalProvider>
        <StakeholderProvider>
          <RequirementProvider>
            <div className="flex min-h-screen flex-col bg-gray-50">
              <IndustryHeader />
              <div className="container mx-auto px-4 py-8 md:px-6 pt-20">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        Create Procurement Requirement
                      </h1>
                      <p className="mt-2 text-lg text-gray-700">
                        Enterprise-grade requirement management system
                      </p>
                    </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Draft auto-saved</p>
                      <p className="text-xs text-gray-400">Last saved: Just now</p>
                    </div>
>>>>>>> 9b0ce35 (Initial commit)
                  </div>
                </div>

                <RequirementStepIndicator
                  currentStep={currentStep}
                  onStepClick={handleGoToStep}
                />

                <div className="mt-8 rounded-xl bg-white shadow-sm border border-gray-100">
<<<<<<< HEAD
                  <div className="p-8">{renderStep()}</div>
=======
                  <div className="p-8">
                    {renderStep()}
                  </div>
=======
                  </div>
                </div>

                <RequirementStepIndicator
                  currentStep={currentStep}
                  onStepClick={handleGoToStep}
                />

                <div className="mt-8 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="p-8">{renderStep()}</div>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </div>
              </div>
              <Toaster />
            </div>
          </RequirementProvider>
        </StakeholderProvider>
      </ApprovalProvider>
    </ErrorBoundary>
  );
};

<<<<<<< HEAD
export default CreateRequirement;
=======
<<<<<<< HEAD
export default CreateRequirement;
=======
export default CreateRequirement;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
