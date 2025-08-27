<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
<<<<<<< HEAD

import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { useRequirement } from "@/contexts/RequirementContext";
import { useApproval } from "@/contexts/ApprovalContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Users, Clock, AlertTriangle, Shield, CheckCircle, XCircle, User } from "lucide-react";
=======
>>>>>>> 9b0ce35 (Initial commit)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Users, Clock, AlertTriangle, Shield, CheckCircle, XCircle, User, Bell } from "lucide-react";
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { toast } from "sonner";

interface ApprovalWorkflowStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ApprovalWorkflowStep: React.FC<ApprovalWorkflowStepProps> = ({ onNext, onPrevious }) => {
<<<<<<< HEAD
  const {
    formData,
    updateFormData,
    saveAsDraft,
    isStepFilled,
    formModified,
    isWorkflowLocked,
    setFormLocked
  } = useRequirement();
=======
<<<<<<< HEAD
  const { formData, updateFormData } = useRequirement();
>>>>>>> 9b0ce35 (Initial commit)
  const { createApprovalWorkflow, approvalMatrix, getApprovalWorkflow } = useApproval();

  // Track initial values for comparison
  const initialBudget = useRef(formData.budget);
  const initialPriority = useRef(formData.priority);
  const initialCompliance = useRef(formData.complianceRequired);

  // State management
  const [approvalWorkflow, setApprovalWorkflow] = useState<any>(null);
<<<<<<< HEAD
=======
=======
  const {
    formData,
    updateFormData,
    saveAsDraft,
    isStepFilled,
    formModified,
    isWorkflowLocked,
    setFormLocked
  } = useRequirement();
  const { createApprovalWorkflow, approvalMatrix, getApprovalWorkflow } = useApproval();

  // Track initial values for comparison
  const initialBudget = useRef(formData.budget);
  const initialPriority = useRef(formData.priority);
  const initialCompliance = useRef(formData.complianceRequired);

  // State management
  const [approvalWorkflow, setApprovalWorkflow] = useState<any>(null);
>>>>>>> 9b0ce35 (Initial commit)
  const [isSaving, setIsSaving] = useState(false);
  const [workflowWasCreated, setWorkflowWasCreated] = useState(
    Boolean(formData.approvalWorkflowId)
  );

  const canContinueToPreview = !!formData.approvalWorkflowId && !formModified;
  const [preview, setPreview] = useState(true);

  // Get current workflow
  const currentWorkflow = formData.approvalWorkflowId
    ? getApprovalWorkflow(formData.approvalWorkflowId)
    : null;
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  useEffect(() => {
    const workflow = getApprovalWorkflow(formData.title || 'unknown');
    if (workflow) {
      setApprovalWorkflow(workflow);
<<<<<<< HEAD
      setWorkflowWasCreated(true);
    } else {
      setWorkflowWasCreated(false);
=======
<<<<<<< HEAD
      setWorkflowCreated(true);
>>>>>>> 9b0ce35 (Initial commit)
    }
  }, [formData.title, getApprovalWorkflow]);

  // Reset workflow status if critical fields change
  useEffect(() => {
    if (workflowWasCreated && (
      formData.budget !== initialBudget.current ||
      formData.priority !== initialPriority.current ||
      formData.complianceRequired !== initialCompliance.current
    )) {
      setWorkflowWasCreated(false);
    }
  }, [formData.budget, formData.priority, formData.complianceRequired, workflowWasCreated]);

  const determineApprovalLevel = () => {
    const budget = formData.budget || 0;
    const priority = formData.priority || 'low';
<<<<<<< HEAD

=======
    
=======
      setWorkflowWasCreated(true);
    } else {
      setWorkflowWasCreated(false);
    }
  }, [formData.title, getApprovalWorkflow]);

  // Reset workflow status if critical fields change
  useEffect(() => {
    if (workflowWasCreated && (
      formData.budget !== initialBudget.current ||
      formData.priority !== initialPriority.current ||
      formData.complianceRequired !== initialCompliance.current
    )) {
      setWorkflowWasCreated(false);
    }
  }, [formData.budget, formData.priority, formData.complianceRequired, workflowWasCreated]);

  const determineApprovalLevel = () => {
    const budget = formData.budget || 0;
    const priority = formData.priority || 'low';

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    if (budget >= 100000 || priority === 'critical') return 'critical';
    if (budget >= 25000 || priority === 'high') return 'high';
    if (budget >= 5000 || priority === 'medium') return 'medium';
    return 'low';
  };

  const approvalLevel = determineApprovalLevel();
  const policy = approvalMatrix[approvalLevel as keyof typeof approvalMatrix];
<<<<<<< HEAD
  const requiresApproval = (formData.budget || 0) > 10000 ||
    formData.priority === 'critical' ||
    formData.priority === 'high' ||
    formData.priority === 'medium' ||
    formData.priority === 'low' ||
    formData.complianceRequired;

  const isCritical = formData.priority === 'critical';

=======
<<<<<<< HEAD
  const requiresApproval = (formData.budget || 0) > 10000 || 
                          formData.priority === 'critical' || 
                          formData.priority === 'high' || 
                          formData.complianceRequired;

  const isCritical = formData.priority === 'critical';

  const handleCreateWorkflow = () => {
    if (!formData.title) {
      toast.error("Please complete basic information first");
      return;
    }

    const workflowId = createApprovalWorkflow(formData);
    updateFormData({ approvalWorkflowId: workflowId });
    setWorkflowCreated(true);
    
    if (isCritical) {
      toast.warning("URGENT: Critical requirement workflow created. Director-level approval assigned.");
    } else {
      toast.success("Approval workflow created successfully");
    }
  };

=======
  const requiresApproval = (formData.budget || 0) > 10000 ||
    formData.priority === 'critical' ||
    formData.priority === 'high' ||
    formData.priority === 'medium' ||
    formData.priority === 'low' ||
    formData.complianceRequired;

  const isCritical = formData.priority === 'critical';

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const handleSkipApproval = () => {
    updateFormData({ approvalStatus: 'not_required' });
    onNext();
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)
  const handleSaveAsDraft = async () => {
    if (isWorkflowLocked) {
      toast.error("Cannot save draft after workflow is confirmed.");
      return;
    }

    if (!formData.title || formData.title.trim() === '') {
      toast.error("A title is required to save a draft.");
      return;
    }

    setIsSaving(true);
    try {
      await saveAsDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const getApprovalStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getApprovalProgress = () => {
    if (!approvalWorkflow) return 0;
    return Math.round((approvalWorkflow.completedApprovals / approvalWorkflow.totalApprovals) * 100);
  };

<<<<<<< HEAD
  useEffect(() => {
    if (canContinueToPreview) {
      setPreview(false);
    }
  }, [canContinueToPreview]);

=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
            <p className="text-gray-600 mt-1">
              Configure the approval process for your requirement based on ISO 9001 standards.
            </p>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                This requirement has been confirmed and is now read-only.
              </p>
            )}
          </div>
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
      </div>

<<<<<<< HEAD
=======
      {/* Critical Requirement Alert Banner */}
=======
  useEffect(() => {
    if (canContinueToPreview) {
      setPreview(false);
    }
  }, [canContinueToPreview]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
            <p className="text-gray-600 mt-1">
              Configure the approval process for your requirement based on ISO 9001 standards.
            </p>
            {isWorkflowLocked && (
              <p className="text-sm text-yellow-600 mt-1">
                This requirement has been confirmed and is now read-only.
              </p>
            )}
          </div>
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
      </div>

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      {isCritical && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-red-800">URGENT REQUIREMENT</h3>
          </div>
          <p className="text-sm text-red-700">
            This is an URGENT requirement. Fast approval is required as per ISO 9001 guidelines.
            Director-level approval will be automatically assigned for expedited processing.
          </p>
        </div>
      )}

<<<<<<< HEAD
=======
<<<<<<< HEAD
      {/* Approval Requirements Analysis */}
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Approval Requirements Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
<<<<<<< HEAD
                {(formData.budget || 0).toLocaleString()}
=======
<<<<<<< HEAD
                ${(formData.budget || 0).toLocaleString()}
=======
                {(formData.budget || 0).toLocaleString()}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </div>
              <div className="text-sm text-gray-500">Budget</div>
            </div>
            <div className="text-center">
              <Badge className={
                formData.priority === 'critical' ? 'bg-red-100 text-red-800' :
<<<<<<< HEAD
                  formData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    formData.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
=======
<<<<<<< HEAD
                formData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                formData.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
=======
                  formData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    formData.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              }>
                {formData.priority || 'Not Set'}
              </Badge>
              <div className="text-sm text-gray-500 mt-1">Priority Level</div>
            </div>
            <div className="text-center">
              <Badge className={
                requiresApproval ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
              }>
                {requiresApproval ? 'Required' : 'Not Required'}
              </Badge>
              <div className="text-sm text-gray-500 mt-1">Approval Status</div>
            </div>
          </div>

          {requiresApproval && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-medium text-yellow-800">Approval Required</h3>
              </div>
              <p className="text-sm text-yellow-700">
<<<<<<< HEAD
                This requirement requires approval due to budget ({formData.budget ? `${formData.budget.toLocaleString()}` : 'TBD'}),
                priority level ({formData.priority}) or compliance requirements.
=======
<<<<<<< HEAD
                This requirement requires approval due to budget ({formData.budget ? `$${formData.budget.toLocaleString()}` : 'TBD'}), 
                priority level ({formData.priority}), or compliance requirements.
=======
                This requirement requires approval due to budget ({formData.budget ? `${formData.budget.toLocaleString()}` : 'TBD'}),
                priority level ({formData.priority}) or compliance requirements.
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {requiresApproval && (
        <>
<<<<<<< HEAD
          {workflowWasCreated && approvalWorkflow && (
=======
<<<<<<< HEAD
          {/* Approval Chain Display */}
          {workflowCreated && approvalWorkflow && (
=======
          {workflowWasCreated && approvalWorkflow && (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Approval Chain Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{getApprovalProgress()}%</span>
                  </div>
                  <Progress value={getApprovalProgress()} className="h-2" />
                </div>
<<<<<<< HEAD

=======
<<<<<<< HEAD
                
>>>>>>> 9b0ce35 (Initial commit)
                <div className="space-y-3">
                  {approvalWorkflow.approvalRequests
                    .slice(
                      0,
                      {
                        low: 1,
                        medium: 2,
                        high: 3,
                        critical: 4
                      }[formData.priority?.toLowerCase()] || 0
                    )
                    .map((request: any, index: number) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{request.approverName}</div>
                            <div className="text-sm text-gray-500">{request.approverRole}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getApprovalStatusBadge(request.status)}
                          {request.isUrgent && (
                            <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                          )}
                        </div>
                      </div>
<<<<<<< HEAD
                    ))}
=======
                      <div className="flex items-center gap-2">
                        {getApprovalStatusBadge(request.status)}
                        {request.isUrgent && (
                          <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  ))}
=======

                <div className="space-y-3">
                  {approvalWorkflow.approvalRequests
                    .slice(
                      0,
                      {
                        low: 1,
                        medium: 2,
                        high: 3,
                        critical: 4
                      }[formData.priority?.toLowerCase()] || 0
                    )
                    .map((request: any, index: number) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{request.approverName}</div>
                            <div className="text-sm text-gray-500">{request.approverRole}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getApprovalStatusBadge(request.status)}
                          {request.isUrgent && (
                            <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                          )}
                        </div>
                      </div>
                    ))}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </div>
              </CardContent>
            </Card>
          )}

<<<<<<< HEAD
=======
<<<<<<< HEAD
          {/* Approval Configuration */}
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Approval Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
<<<<<<< HEAD
                <Label className="text-base">Emergency Level</Label>
=======
<<<<<<< HEAD
                <Label className="text-base">Urgency Level</Label>
>>>>>>> 9b0ce35 (Initial commit)
                <RadioGroup
                  value={formData.isUrgent ? "urgent" : "normal"}
                  onValueChange={(value) => {
                    if (isWorkflowLocked) return;
                    updateFormData({ isUrgent: value === "urgent" });
                  }}
                  className="space-y-3"
                  disabled={isWorkflowLocked}
                >
<<<<<<< HEAD
=======
                  <div className="flex items-start space-x-3 rounded-md border p-3">
                    <RadioGroupItem value="normal" id="normal-approval" />
=======
                <Label className="text-base">Emergency Level</Label>
                <RadioGroup
                  value={formData.isUrgent ? "urgent" : "normal"}
                  onValueChange={(value) => {
                    if (isWorkflowLocked) return;
                    updateFormData({ isUrgent: value === "urgent" });
                  }}
                  className="space-y-3"
                  disabled={isWorkflowLocked}
                >
>>>>>>> 9b0ce35 (Initial commit)
                  <div className={`flex items-start space-x-3 rounded-md border p-3 ${
                    isWorkflowLocked ? "opacity-70" : ""
                  }`}>
                    <RadioGroupItem 
                      value="normal" 
                      id="normal-approval" 
                      disabled={isWorkflowLocked} 
                    />
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div className="space-y-1">
                      <Label htmlFor="normal-approval" className="font-medium">
                        Standard Approval Process
                      </Label>
                      <p className="text-sm text-gray-500">
                        Sequential approval process with standard timelines (5-7 business days)
                      </p>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className={`flex items-start space-x-3 rounded-md border p-3 ${
                    isWorkflowLocked ? "opacity-70" : ""
                  }`}>
                    <RadioGroupItem 
                      value="urgent" 
                      id="urgent-approval" 
                      disabled={isWorkflowLocked} 
                    />
                    <div className="space-y-1">
                      <Label htmlFor="urgent-approval" className="font-medium">
                        Emergency Approval Process
=======
<<<<<<< HEAD
                  <div className="flex items-start space-x-3 rounded-md border p-3">
                    <RadioGroupItem value="urgent" id="urgent-approval" />
                    <div className="space-y-1">
                      <Label htmlFor="urgent-approval" className="font-medium">
                        Urgent Approval Process
=======
                  <div className={`flex items-start space-x-3 rounded-md border p-3 ${
                    isWorkflowLocked ? "opacity-70" : ""
                  }`}>
                    <RadioGroupItem 
                      value="urgent" 
                      id="urgent-approval" 
                      disabled={isWorkflowLocked} 
                    />
                    <div className="space-y-1">
                      <Label htmlFor="urgent-approval" className="font-medium">
                        Emergency Approval Process
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                      </Label>
                      <p className="text-sm text-gray-500">
                        Expedited parallel approval with 24-48 hour timeline and emergency publish option
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base">Required Approvers</Label>
                <div className="space-y-2">
<<<<<<< HEAD
                  {policy.requiredApprovers
                    .slice(
                      0,
                      {
                        low: 1,
                        medium: 2,
                        high: 3,
                        critical: 4
                      }[formData.priority?.toLowerCase()] || 0
                    )
                    .map((approver, index) => (
                      <div
                        key={approver}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {approver.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-500">
                            Level {index + 1} • Required for {formData.priority} priority requirements
                          </div>
=======
<<<<<<< HEAD
                  {policy.requiredApprovers.map((approver, index) => (
                    <div key={approver} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">
                          {approver.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-500">
                          Level {index + 1} • Required for {approvalLevel} priority requirements
>>>>>>> 9b0ce35 (Initial commit)
                        </div>
                        <Badge variant="outline">Required</Badge>
                      </div>
<<<<<<< HEAD
                    ))}
=======
                      <Badge variant="outline">Required</Badge>
                    </div>
                  ))}
=======
                  {policy.requiredApprovers
                    .slice(
                      0,
                      {
                        low: 1,
                        medium: 2,
                        high: 3,
                        critical: 4
                      }[formData.priority?.toLowerCase()] || 0
                    )
                    .map((approver, index) => (
                      <div
                        key={approver}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {approver.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-500">
                            Level {index + 1} • Required for {formData.priority} priority requirements
                          </div>
                        </div>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    ))}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compliance-required" className="cursor-pointer">
                      ISO 9001 Compliance Required
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enable additional compliance checks and documentation
                    </p>
                  </div>
                  <Switch
                    id="compliance-required"
                    checked={formData.complianceRequired || false}
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    onCheckedChange={(checked) => updateFormData({ complianceRequired: checked })}
=======
>>>>>>> 9b0ce35 (Initial commit)
                    onCheckedChange={(checked) => {
                      if (isWorkflowLocked) return;
                      updateFormData({ complianceRequired: checked });
                    }}
                    disabled={isWorkflowLocked}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  />
                </div>
              </div>

              {(formData.isUrgent || isCritical) && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <h3 className="font-medium text-orange-800">
                      {isCritical ? 'Critical' : 'Urgent'} Approval Timeline
                    </h3>
                  </div>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Approvers will be notified immediately</li>
                    <li>• Target response time: {policy.urgentApprovalHours} hours</li>
                    <li>• Emergency publish available if approvals are delayed</li>
                    <li>• Auto-escalation after {policy.autoEscalationHours} hours</li>
                    {isCritical && <li>• Director-level approval automatically assigned</li>}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

<<<<<<< HEAD
=======
<<<<<<< HEAD
          {/* Workflow Actions */}
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          <Card>
            <CardHeader>
              <CardTitle>Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
<<<<<<< HEAD
              {!workflowWasCreated && formModified ? (
=======
<<<<<<< HEAD
              {!workflowCreated ? (
=======
              {!workflowWasCreated && formModified ? (
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Approval Workflow Not Created
                  </h3>
                  <p className="text-gray-600 mb-4">
<<<<<<< HEAD
                    {isStepFilled(1) && isStepFilled(2)
                      ? "Click the button below to create and initiate the approval workflow for this requirement."
                      : "Complete all mandatory fields in previous steps to enable workflow creation."}
                  </p>
=======
<<<<<<< HEAD
                    Click the button below to create and initiate the approval workflow for this requirement.
                  </p>
                  <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700">
                    Create Approval Workflow
                  </Button>
=======
                    {isStepFilled(1) && isStepFilled(2)
                      ? "Click the button below to create and initiate the approval workflow for this requirement."
                      : "Complete all mandatory fields in previous steps to enable workflow creation."}
                  </p>
>>>>>>> 9b0ce35 (Initial commit)
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={isWorkflowLocked}
                      >
                        Create Approval Workflow
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Finalize Approval Workflow?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will create the workflow and lock critical fields (e.g., Budget, Priority) from further edits. Ensure all details are correct before proceeding.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            if (!isStepFilled(1) || !isStepFilled(2)) {
                              toast.error("Complete all mandatory fields in previous steps first.");
                              return;
                            }
                            const workflowId = createApprovalWorkflow(formData);
                            updateFormData({ approvalWorkflowId: workflowId });
                            setWorkflowWasCreated(true);
                            setFormLocked(true);
                            setPreview(false);
                            
                            // Update initial values to prevent re-triggering workflow reset
                            initialBudget.current = formData.budget;
                            initialPriority.current = formData.priority;
                            initialCompliance.current = formData.complianceRequired;

                            if (isCritical) {
                              toast.warning("URGENT: Critical workflow created");
                            } else {
                              toast.success("Approval workflow created");
                            }
                          }}
                        >
                          Confirm & Create
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Approval Workflow Created</span>
                  </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  {approvalWorkflow && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Status: <span className="font-medium">{approvalWorkflow.status}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Progress: {approvalWorkflow.completedApprovals}/{approvalWorkflow.totalApprovals} approvals completed
                      </p>
                      <p className="text-sm text-gray-600">
                        Type: <span className="font-medium">{approvalWorkflow.workflowType}</span>
                      </p>
                    </div>
                  )}
=======
>>>>>>> 9b0ce35 (Initial commit)

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <label className="font-bold">Status:</label>{' '}
                      <span>
                        Pending
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <label className="font-bold">Progress:</label>{' '}
                      0 / {
                        { low: 1, medium: 2, high: 3, critical: 4 }[formData.priority?.toLowerCase()] || 0
                      } approvals completed
                    </p>
                    <p className="text-sm text-gray-600">
                      <label className="font-bold">Type:</label>{' '}
                      <span>{formData.isUrgent ? "Parallel" : "Sequential"}</span>
                    </p>
                  </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

<<<<<<< HEAD
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about proposals via email.
                </p>
              </div>
              <Switch
                id="notify-email"
                checked={formData.notifyByEmail || false}
                onCheckedChange={(checked) => updateFormData({ notifyByEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform.
                </p>
              </div>
              <Switch
                id="notify-app"
                checked={formData.notifyByApp !== false}
                onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center w-full pt-6">
        <Button 
          variant="outline" 
=======
<<<<<<< HEAD
      <div className="flex items-center justify-between gap-4 pt-6">
        <Button
          variant="outline"
>>>>>>> 9b0ce35 (Initial commit)
          onClick={onPrevious}
          // disabled={isWorkflowLocked}
        >
          Previous
        </Button>
<<<<<<< HEAD

=======
=======
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about proposals via email.
                </p>
              </div>
              <Switch
                id="notify-email"
                checked={formData.notifyByEmail || false}
                onCheckedChange={(checked) => updateFormData({ notifyByEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform.
                </p>
              </div>
              <Switch
                id="notify-app"
                checked={formData.notifyByApp !== false}
                onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
              />
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

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <div className="flex gap-3">
          {!requiresApproval && (
            <Button
              variant="outline"
              onClick={handleSkipApproval}
<<<<<<< HEAD
              disabled={isWorkflowLocked}
=======
<<<<<<< HEAD
=======
              disabled={isWorkflowLocked}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            >
              Skip Approval
            </Button>
          )}
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <Button 
            onClick={onNext}
            disabled={requiresApproval && !workflowCreated}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue to Preview
          </Button>
=======
>>>>>>> 9b0ce35 (Initial commit)
          <div className="flex items-center gap-x-3">
            <Button
              variant="outline"
              className="font-medium"
              onClick={handleSaveAsDraft}
              disabled={!formData.title || isSaving || isWorkflowLocked}
            >
              {isSaving ? "Saving..." : "Save as Draft"}
            </Button>
            <Button
              onClick={onNext}
              disabled={preview}
              className={`bg-blue-600 text-white hover:bg-blue-700`}
            >
              Publish & Notify Stakeholders
            </Button>
          </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflowStep;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 9b0ce35 (Initial commit)

// import React, { useState, useEffect, useRef } from "react";
// import { useRequirement } from "@/contexts/RequirementContext";
// import { useApproval } from "@/contexts/ApprovalContext";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Progress } from "@/components/ui/progress";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Users, Clock, AlertTriangle, Shield, CheckCircle, XCircle, User, Bell } from "lucide-react";
// import { toast } from "sonner";

// interface ApprovalWorkflowStepProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// const ApprovalWorkflowStep: React.FC<ApprovalWorkflowStepProps> = ({ onNext, onPrevious }) => {
//   const {
//     formData,
//     updateFormData,
//     saveAsDraft,
//     isStepFilled,
//     formModified
//   } = useRequirement();
//   const { createApprovalWorkflow, approvalMatrix, getApprovalWorkflow } = useApproval();

//   // Track initial values for comparison
//   const initialBudget = useRef(formData.budget);
//   const initialPriority = useRef(formData.priority);
//   const initialCompliance = useRef(formData.complianceRequired);

//   // State management
//   const [approvalWorkflow, setApprovalWorkflow] = useState<any>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [workflowWasCreated, setWorkflowWasCreated] = useState(
//     Boolean(formData.approvalWorkflowId)
//   );

//   const canContinueToPreview = !!formData.approvalWorkflowId && !formModified;
//   const [preview, setPreview] = useState(true);

//   // Get current workflow
//   const currentWorkflow = formData.approvalWorkflowId
//     ? getApprovalWorkflow(formData.approvalWorkflowId)
//     : null;

//   useEffect(() => {
//     const workflow = getApprovalWorkflow(formData.title || 'unknown');
//     if (workflow) {
//       setApprovalWorkflow(workflow);
//       setWorkflowWasCreated(true);
//     } else {
//       setWorkflowWasCreated(false);
//     }
//   }, [formData.title, getApprovalWorkflow]);

//   // Reset workflow status if critical fields change
//   useEffect(() => {
//     if (workflowWasCreated && (
//       formData.budget !== initialBudget.current ||
//       formData.priority !== initialPriority.current ||
//       formData.complianceRequired !== initialCompliance.current
//     )) {
//       setWorkflowWasCreated(false);
//     }
//   }, [formData.budget, formData.priority, formData.complianceRequired, workflowWasCreated]);

//   const determineApprovalLevel = () => {
//     const budget = formData.budget || 0;
//     const priority = formData.priority || 'low';

//     if (budget >= 100000 || priority === 'critical') return 'critical';
//     if (budget >= 25000 || priority === 'high') return 'high';
//     if (budget >= 5000 || priority === 'medium') return 'medium';
//     return 'low';
//   };

//   const approvalLevel = determineApprovalLevel();
//   const policy = approvalMatrix[approvalLevel as keyof typeof approvalMatrix];
//   const requiresApproval = (formData.budget || 0) > 10000 ||
//     formData.priority === 'critical' ||
//     formData.priority === 'high' ||
//     formData.priority === 'medium' ||
//     formData.priority === 'low' ||
//     formData.complianceRequired;

//   const isCritical = formData.priority === 'critical';

//   const handleSkipApproval = () => {
//     updateFormData({ approvalStatus: 'not_required' });
//     onNext();
//   };

//   const handleSaveAsDraft = async () => {
//     if (!formData.title || formData.title.trim() === '') {
//       toast.error("A title is required to save a draft.");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       await saveAsDraft();
//       toast.success("Draft saved successfully!");
//     } catch (error) {
//       console.error("Error saving draft:", error);
//       toast.error("Failed to save draft. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getApprovalStatusBadge = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
//       case 'rejected':
//         return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
//       case 'pending':
//         return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
//     }
//   };

//   const getApprovalProgress = () => {
//     if (!approvalWorkflow) return 0;
//     return Math.round((approvalWorkflow.completedApprovals / approvalWorkflow.totalApprovals) * 100);
//   };

//   useEffect(() => {
//     if (canContinueToPreview) {
//       setPreview(false);
//     }
//   }, [canContinueToPreview]);

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
//             <p className="text-gray-600 mt-1">
//               Configure the approval process for your requirement based on ISO 9001 standards.
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//               Step 4 of 6
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {isCritical && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//           <div className="flex items-center gap-2 mb-2">
//             <AlertTriangle className="h-5 w-5 text-red-600" />
//             <h3 className="font-medium text-red-800">URGENT REQUIREMENT</h3>
//           </div>
//           <p className="text-sm text-red-700">
//             This is an URGENT requirement. Fast approval is required as per ISO 9001 guidelines.
//             Director-level approval will be automatically assigned for expedited processing.
//           </p>
//         </div>
//       )}

//       {/* Notification Preferences Section (only part kept from PublishStep) */}


//       {/* Rest of the Approval Workflow content remains unchanged */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Shield className="h-5 w-5" />
//             Approval Requirements Analysis
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">
//                 {(formData.budget || 0).toLocaleString()}
//               </div>
//               <div className="text-sm text-gray-500">Budget</div>
//             </div>
//             <div className="text-center">
//               <Badge className={
//                 formData.priority === 'critical' ? 'bg-red-100 text-red-800' :
//                   formData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
//                     formData.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
//                       'bg-gray-100 text-gray-800'
//               }>
//                 {formData.priority || 'Not Set'}
//               </Badge>
//               <div className="text-sm text-gray-500 mt-1">Priority Level</div>
//             </div>
//             <div className="text-center">
//               <Badge className={
//                 requiresApproval ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
//               }>
//                 {requiresApproval ? 'Required' : 'Not Required'}
//               </Badge>
//               <div className="text-sm text-gray-500 mt-1">Approval Status</div>
//             </div>
//           </div>

//           {requiresApproval && (
//             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <div className="flex items-center gap-2 mb-2">
//                 <AlertTriangle className="h-5 w-5 text-yellow-600" />
//                 <h3 className="font-medium text-yellow-800">Approval Required</h3>
//               </div>
//               <p className="text-sm text-yellow-700">
//                 This requirement requires approval due to budget ({formData.budget ? `${formData.budget.toLocaleString()}` : 'TBD'}),
//                 priority level ({formData.priority}) or compliance requirements.
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {requiresApproval && (
//         <>
//           {workflowWasCreated && approvalWorkflow && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users className="h-5 w-5" />
//                   Approval Chain Progress
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Overall Progress</span>
//                     <span>{getApprovalProgress()}%</span>
//                   </div>
//                   <Progress value={getApprovalProgress()} className="h-2" />
//                 </div>

//                 <div className="space-y-3">
//                   {approvalWorkflow.approvalRequests
//                     .slice(
//                       0,
//                       {
//                         low: 1,
//                         medium: 2,
//                         high: 3,
//                         critical: 4
//                       }[formData.priority?.toLowerCase()] || 0
//                     )
//                     .map((request: any, index: number) => (
//                       <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
//                             <User className="h-4 w-4 text-blue-600" />
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900">{request.approverName}</div>
//                             <div className="text-sm text-gray-500">{request.approverRole}</div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {getApprovalStatusBadge(request.status)}
//                           {request.isUrgent && (
//                             <Badge className="bg-red-100 text-red-800">Urgent</Badge>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Approval Configuration
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-3">
//                 <Label className="text-base">Emergency Level</Label>
//                 <RadioGroup
//                   value={formData.isUrgent ? "urgent" : "normal"}
//                   onValueChange={(value) => {
//                     updateFormData({ isUrgent: value === "urgent" });
//                   }}
//                   className="space-y-3"
//                 >
//                   <div className="flex items-start space-x-3 rounded-md border p-3">
//                     <RadioGroupItem value="normal" id="normal-approval" />
//                     <div className="space-y-1">
//                       <Label htmlFor="normal-approval" className="font-medium">
//                         Standard Approval Process
//                       </Label>
//                       <p className="text-sm text-gray-500">
//                         Sequential approval process with standard timelines (5-7 business days)
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3 rounded-md border p-3">
//                     <RadioGroupItem value="urgent" id="urgent-approval" />
//                     <div className="space-y-1">
//                       <Label htmlFor="urgent-approval" className="font-medium">
//                         Emergency Approval Process
//                       </Label>
//                       <p className="text-sm text-gray-500">
//                         Expedited parallel approval with 24-48 hour timeline and emergency publish option
//                       </p>
//                     </div>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div className="space-y-3">
//                 <Label className="text-base">Required Approvers</Label>
//                 <div className="space-y-2">
//                   {policy.requiredApprovers
//                     .slice(
//                       0,
//                       {
//                         low: 1,
//                         medium: 2,
//                         high: 3,
//                         critical: 4
//                       }[formData.priority?.toLowerCase()] || 0
//                     )
//                     .map((approver, index) => (
//                       <div
//                         key={approver}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                       >
//                         <div>
//                           <div className="font-medium">
//                             {approver.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Level {index + 1} • Required for {formData.priority} priority requirements
//                           </div>
//                         </div>
//                         <Badge variant="outline">Required</Badge>
//                       </div>
//                     ))}
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="compliance-required" className="cursor-pointer">
//                       ISO 9001 Compliance Required
//                     </Label>
//                     <p className="text-sm text-gray-500">
//                       Enable additional compliance checks and documentation
//                     </p>
//                   </div>
//                   <Switch
//                     id="compliance-required"
//                     checked={formData.complianceRequired || false}
//                     onCheckedChange={(checked) => {
//                       updateFormData({ complianceRequired: checked });
//                     }}
//                   />
//                 </div>
//               </div>


//               {(formData.isUrgent || isCritical) && (
//                 <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Clock className="h-5 w-5 text-orange-600" />
//                     <h3 className="font-medium text-orange-800">
//                       {isCritical ? 'Critical' : 'Urgent'} Approval Timeline
//                     </h3>
//                   </div>
//                   <ul className="text-sm text-orange-700 space-y-1">
//                     <li>• Approvers will be notified immediately</li>
//                     <li>• Target response time: {policy.urgentApprovalHours} hours</li>
//                     <li>• Emergency publish available if approvals are delayed</li>
//                     <li>• Auto-escalation after {policy.autoEscalationHours} hours</li>
//                     {isCritical && <li>• Director-level approval automatically assigned</li>}
//                   </ul>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Workflow Status</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {!workflowWasCreated && formModified ? (
//                 <div className="text-center py-6">
//                   <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     Approval Workflow Not Created
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     {isStepFilled(1) && isStepFilled(2)
//                       ? "Click the button below to create and initiate the approval workflow for this requirement."
//                       : "Complete all mandatory fields in previous steps to enable workflow creation."}
//                   </p>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button className="bg-blue-600 hover:bg-blue-700">
//                         Create Approval Workflow
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Finalize Approval Workflow?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This will create the workflow and lock critical fields (e.g., Budget, Priority) from further edits. Ensure all details are correct before proceeding.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           className="bg-blue-600 hover:bg-blue-700"
//                           onClick={() => {
//                             if (!isStepFilled(1) || !isStepFilled(2)) {
//                               toast.error("Complete all mandatory fields in previous steps first.");
//                               return;
//                             }
//                             const workflowId = createApprovalWorkflow(formData);
//                             updateFormData({ approvalWorkflowId: workflowId });
//                             setWorkflowWasCreated(true);
//                             setPreview(false);
                            
//                             // Update initial values to prevent re-triggering workflow reset
//                             initialBudget.current = formData.budget;
//                             initialPriority.current = formData.priority;
//                             initialCompliance.current = formData.complianceRequired;

//                             if (isCritical) {
//                               toast.warning("URGENT: Critical workflow created");
//                             } else {
//                               toast.success("Approval workflow created");
//                             }
//                           }}
//                         >
//                           Confirm & Create
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="h-5 w-5 text-green-600" />
//                     <span className="font-medium text-green-800">Approval Workflow Created</span>
//                   </div>

//                   <div className="space-y-2">
//                     <p className="text-sm text-gray-600">
//                       <label className="font-bold">Status:</label>{' '}
//                       <span>
//                         Pending
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <label className="font-bold">Progress:</label>{' '}
//                       0 / {
//                         { low: 1, medium: 2, high: 3, critical: 4 }[formData.priority?.toLowerCase()] || 0
//                       } approvals completed
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <label className="font-bold">Type:</label>{' '}
//                       <span>{formData.isUrgent ? "Parallel" : "Sequential"}</span>
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//         </>
//       )}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Bell className="h-5 w-5" />
//             Notification Preferences
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-3">
//             <div className="flex items-center justify-between rounded-md border p-3">
//               <div className="space-y-0.5">
//                 <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
//                 <p className="text-sm text-gray-500">
//                   Receive updates about proposals via email.
//                 </p>
//               </div>
//               <Switch
//                 id="notify-email"
//                 checked={formData.notifyByEmail || false}
//                 onCheckedChange={(checked) => updateFormData({ notifyByEmail: checked })}
//               />
//             </div>
//             <div className="flex items-center justify-between rounded-md border p-3">
//               <div className="space-y-0.5">
//                 <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
//                 <p className="text-sm text-gray-500">
//                   Receive updates within the platform.
//                 </p>
//               </div>
//               <Switch
//                 id="notify-app"
//                 checked={formData.notifyByApp !== false}
//                 onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-between items-center w-full pt-6">
//         <Button variant="outline" onClick={onPrevious}>
//           Previous
//         </Button>

//         <div className="flex gap-3">
//           {!requiresApproval && (
//             <Button
//               variant="outline"
//               onClick={handleSkipApproval}
//             >
//               Skip Approval
//             </Button>
//           )}
//           <div className="flex items-center gap-x-3">
//             <Button
//               variant="outline"
//               className="font-medium"
//               onClick={handleSaveAsDraft}
//               disabled={!formData.title || isSaving}
//             >
//               {isSaving ? "Saving..." : "Save as Draft"}
//             </Button>
//             <Button
//               onClick={onNext}
//               disabled={preview}
//               className={`bg-blue-600 text-white hover:bg-blue-700`}
//             >
//               Continue to Preview
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
// export default ApprovalWorkflowStep;
=======
// export default ApprovalWorkflowStep;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
