// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// export type StepType = 1 | 2 | 3 | 4 | 5 | 6;

// export interface Document {
//   id: string;
//   name: string;
//   url: string;
//   type: string;
//   size: number;
//   documentType: "specification" | "drawing" | "reference" | "compliance" | "other";
//   version: number;
//   uploadedAt: Date;
//   uploadedBy: string;
// }

// export interface RequirementFormData {
//   id: string;
//   title?: string;
//   category?: "Product" | "Services" | "Expert" | "Logistics";
//   priority?: "low" | "medium" | "high" | "critical";
//   description?: string;
//   specialization?: string;
//   productSpecifications?: string;
//   quantity?: number;
//   serviceDescription?: string;
//   scopeOfWork?: string;
//   equipmentType?: string;
//   pickupLocation?: string;
//   deliveryLocation?: string;
//   documents?: Document[];
//   submissionDeadline?: Date;
//   evaluationCriteria?: string[];
//   visibility?: "all" | "selected";
//   invitedSuppliers?: string[];
//   notifyByEmail?: boolean;
//   notifyByApp?: boolean;
//   termsAccepted?: boolean;
//   budget?: number;
//   createdDate?: string;
//   deadline?: string;
//   applicants?: number;
//   complianceRequired?: boolean;
//   riskLevel?: "low" | "medium" | "high" | "critical";
//   isUrgent?: boolean;
//   approvalWorkflowId?: string;
//   approvalStatus?: 'not_required' | 'pending' | 'approved' | 'rejected' | 'Draft';
//   emergencyPublished?: boolean;
//   approvalDeadline?: Date;
//   certifications?: string[];
//   duration?: number;
//   startDate?: Date;
//   endDate?: Date;
//   technicalStandards?: string[];
//   productDeliveryDate?: Date;
//   qualityRequirements?: string;
//   performanceMetrics?: string;
//   serviceStartDate?: Date;
//   serviceEndDate?: Date;
//   serviceBudget?: number;
//   location?: string;
//   weight?: number;
//   dimensions?: string;
//   pickupDate?: Date;
//   deliveryDate?: Date;
//   specialHandling?: string;
//   businessJustification?: string;
//   department?: string;
//   costCenter?: string;
//   requestedBy?: string;
//   urgency?: boolean;
//   estimatedBudget?: number;
//   budgetApproved?: boolean;
//   status?: 'Draft' | 'Active' | 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Closed';
//   lastModified?: Date;
//   modifiedBy?: string;
//   version?: number;
//   referenceNumber?: string;
//   attachments?: Document[];
//   notes?: string;
//   tags?: string[];
//   relatedRequirements?: string[];
//   procurementMethod?: 'direct' | 'tender' | 'auction' | 'framework';
//   contractType?: 'fixed_price' | 'time_materials' | 'milestone';
//   paymentTerms?: string;
//   warranty?: string;
//   slaTerms?: string;
//   penaltyClauses?: string;
//   terminationClauses?: string;
//   forceMajeure?: string;
//   governingLaw?: string;
//   disputeResolution?: string;
//   confidentiality?: boolean;
//   insuranceRequirements?: string;
//   subcontractingAllowed?: boolean;
//   keyPersonnel?: string[];
//   reportingRequirements?: string;
//   acceptanceCriteria?: string;
//   kpis?: string[];
//   milestones?: { name: string; date: Date; deliverable: string }[];
//   publishedDate?: Date;
//   submittedForApprovalAt?: Date;
//   approvedAt?: Date;
//   rejectedAt?: Date;
//   closedAt?: Date;
//   reopenedAt?: Date;
//   revisionHistory?: {
//     version: number;
//     modifiedAt: Date;
//     modifiedBy: string;
//     changes: string[];
//   }[];
//   approvalComments?: {
//     comment: string;
//     commentedBy: string;
//     commentedAt: Date;
//     isResolved: boolean;
//   }[];
//   collaborationComments?: {
//     comment: string;
//     commentedBy: string;
//     commentedAt: Date;
//     replies: {
//       reply: string;
//       repliedBy: string;
//       repliedAt: Date;
//     }[];
//   }[];
//   linkedProjects?: string[];
//   costBreakdown?: {
//     item: string;
//     cost: number;
//     quantity: number;
//     total: number;
//   }[];
//   riskAssessment?: {
//     risk: string;
//     probability: 'low' | 'medium' | 'high';
//     impact: 'low' | 'medium' | 'high';
//     mitigationStrategy: string;
//   }[];
//   customFields?: Record<string, any>;
//   additionalInstructions?: string;
// }

// interface RequirementContextType {
//   formData: RequirementFormData;
//   setFormData: (data: RequirementFormData) => void;
//   formModified: boolean;
//   setFormModified: (modified: boolean) => void;
//   currentStep: StepType;
//   setCurrentStep: (step: StepType) => void;
//   visitedSteps: number[];
//   setVisitedSteps: (steps: number[]) => void;
//   goToNextStep: () => void;
//   goToPrevStep: () => void;
//   updateFormData: (data: Partial<RequirementFormData>) => void;
//   resetForm: () => void;
//   validateStep: (step: number) => boolean;
//   stepErrors: Record<string, string>;
//   isFormValid: () => boolean;
//   saveAsDraft: () => Promise<void>;
//   isStepFilled: (stepId: number) => boolean;
//   loadDraft: (id: string) => void;
//   publishRequirement: () => Promise<void>;
//   emergencyPublishRequirement: () => Promise<void>;
//   deleteDraft: (id: string) => Promise<void>;
//   duplicateRequirement: (id: string) => Promise<void>;
//   getDrafts: () => RequirementFormData[];
//   getPublishedRequirements: () => RequirementFormData[];
//   addAttachment: (file: File) => Promise<void>;
//   removeAttachment: (id: string) => void;
//   addNote: (note: string) => void;
//   addMilestone: (milestone: { name: string; date: Date; deliverable: string }) => void;
//   removeMilestone: (index: number) => void;
//   updateMilestone: (index: number, milestone: { name: string; date: Date; deliverable: string }) => void;
//   addTag: (tag: string) => void;
//   removeTag: (tag: string) => void;
//   saveCurrentState: () => void;
//   loadFromHistory: (version: number) => void;
//   getHistory: () => RequirementFormData[];
//   isEditing: boolean;
//   addRevision: (changes: string[]) => Promise<void>;
//   addApprovalComment: (comment: string, commentedBy: string) => Promise<void>;
//   resolveApprovalComment: (commentIndex: number) => Promise<void>;
//   addCollaborationComment: (comment: string, commentedBy: string) => Promise<void>;
//   replyToCollaborationComment: (commentIndex: number, reply: string, repliedBy: string) => Promise<void>;
//   addLinkedProject: (projectId: string) => Promise<void>;
//   removeLinkedProject: (projectId: string) => Promise<void>;
//   addCostBreakdownItem: (item: string, cost: number, quantity: number) => Promise<void>;
//   updateCostBreakdownItem: (index: number, updates: Partial<{ item: string; cost: number; quantity: number }>) => Promise<void>;
//   removeCostBreakdownItem: (index: number) => Promise<void>;
//   addRiskAssessment: (risk: string, probability: 'low' | 'medium' | 'high', impact: 'low' | 'medium' | 'high', mitigationStrategy: string) => Promise<void>;
//   updateRiskAssessment: (index: number, updates: Partial<{ risk: string; probability: 'low' | 'medium' | 'high'; impact: 'low' | 'medium' | 'high'; mitigationStrategy: string }>) => Promise<void>;
//   removeRiskAssessment: (index: number) => Promise<void>;
//   setCustomField: (key: string, value: any) => Promise<void>;
//   removeCustomField: (key: string) => Promise<void>;
//   submitForApproval: () => Promise<void>;
//   approveRequirement: (comment?: string) => Promise<void>;
//   rejectRequirement: (comment: string) => Promise<void>;
//   closeRequirement: () => Promise<void>;
//   reopenRequirement: () => Promise<void>;
//   searchRequirements: (query: string, filters?: Record<string, any>) => RequirementFormData[];
//   notifyStakeholders: (message: string, recipients: string[]) => Promise<void>;
//   exportToPDF: () => Promise<void>;
//   exportToExcel: () => Promise<void>;
// }

// const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

// const generateNewReferenceNumber = (): string => {
//   const currentYear = new Date().getFullYear();
//   const countersKey = 'requirement_counters';
//   let counters: Record<string, number> = {};

//   try {
//     counters = JSON.parse(localStorage.getItem(countersKey) || '{}');
//   } catch (e) {
//     console.error("Could not parse requirement counters from localStorage", e);
//     counters = {};
//   }

//   const nextNumber = (counters[currentYear] || 0) + 1;
//   counters[currentYear] = nextNumber;
//   localStorage.setItem(countersKey, JSON.stringify(counters));

//   const paddedNumber = String(nextNumber).padStart(4, '0');
//   return `REQ-${currentYear}-${paddedNumber}`;
// };

// const getDefaultFormData = (): RequirementFormData => ({
//   id: generateNewReferenceNumber(),
//   title: '',
//   category: undefined,
//   priority: undefined,
//   description: '',
//   businessJustification: '',
//   department: '',
//   costCenter: '',
//   requestedBy: '',
//   estimatedBudget: 0,
//   budgetApproved: false,
//   isUrgent: false,
//   urgency: false,
//   specialization: '',
//   productSpecifications: '',
//   quantity: 0,
//   serviceDescription: '',
//   scopeOfWork: '',
//   equipmentType: '',
//   pickupLocation: '',
//   deliveryLocation: '',
//   documents: [],
//   submissionDeadline: undefined,
//   evaluationCriteria: [],
//   visibility: 'all',
//   invitedSuppliers: [],
//   notifyByEmail: false,
//   notifyByApp: true,
//   termsAccepted: false,
//   performanceMetrics: '',
//   location: '',
//   approvalStatus: 'not_required',
//   certifications: [],
//   duration: 0,
//   startDate: undefined,
//   endDate: undefined,
//   technicalStandards: [],
//   productDeliveryDate: undefined,
//   qualityRequirements: '',
//   serviceStartDate: undefined,
//   serviceEndDate: undefined,
//   serviceBudget: 0,
//   weight: 0,
//   dimensions: '',
//   pickupDate: undefined,
//   deliveryDate: undefined,
//   specialHandling: '',
//   riskLevel: undefined,
//   complianceRequired: false,
//   approvalWorkflowId: '',
//   emergencyPublished: false,
//   approvalDeadline: undefined,
//   createdDate: new Date().toISOString(),
//   deadline: '',
//   applicants: 0,
//   budget: 0,
//   status: 'Draft',
//   lastModified: new Date(),
//   modifiedBy: '',
//   version: 1,
//   referenceNumber: '',
//   attachments: [],
//   notes: '',
//   tags: [],
//   relatedRequirements: [],
//   procurementMethod: 'tender',
//   contractType: 'fixed_price',
//   paymentTerms: '',
//   warranty: '',
//   slaTerms: '',
//   penaltyClauses: '',
//   terminationClauses: '',
//   forceMajeure: '',
//   governingLaw: '',
//   disputeResolution: '',
//   confidentiality: false,
//   insuranceRequirements: '',
//   subcontractingAllowed: false,
//   keyPersonnel: [],
//   reportingRequirements: '',
//   acceptanceCriteria: '',
//   kpis: [],
//   milestones: [],
//   revisionHistory: [],
//   approvalComments: [],
//   collaborationComments: [],
//   linkedProjects: [],
//   costBreakdown: [],
//   riskAssessment: [],
//   customFields: {},
//   publishedDate: undefined,
//   submittedForApprovalAt: undefined,
//   approvedAt: undefined,
//   rejectedAt: undefined,
//   closedAt: undefined,
//   reopenedAt: undefined,
//   additionalInstructions: '',
// });

// const getAllRequirements = (): RequirementFormData[] => {
//   const rawData = localStorage.getItem('requirements-list');
//   return rawData ? JSON.parse(rawData) : [];
// };

// const saveAllRequirements = (requirements: RequirementFormData[]) => {
//   localStorage.setItem('requirements-list', JSON.stringify(requirements));
// };

// export const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formModified, setFormModified] = useState(false);
//   const [formData, setFormData] = useState<RequirementFormData>(() => {
//     const editData = location.state?.requirement;
//     if (editData) {
//       return editData;
//     }

//     const savedDraft = localStorage.getItem('requirement-draft-form');
//     if (savedDraft) {
//       return JSON.parse(savedDraft);
//     }
    
//     return getDefaultFormData();
//   });
  
//   const [currentStep, setCurrentStep] = useState<StepType>(1);
//   const [visitedSteps, setVisitedSteps] = useState<number[]>([]);
//   const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
//   const [isEditing, setIsEditing] = useState<boolean>(!!location.state?.requirement);

//   useEffect(() => {
//     setIsEditing(!!location.state?.requirement);
//   }, [location.state]);

//   useEffect(() => {
//     localStorage.setItem('requirement-draft-form', JSON.stringify(formData));
//   }, [formData]);

//   const updateFormData = useCallback((data: Partial<RequirementFormData>) => {
//     setFormData(prev => ({ 
//       ...prev, 
//       ...data,
//       lastModified: new Date(),
//       version: (prev.version || 1) + 1
//     }));
//     setStepErrors({});
//     setFormModified(true);
//   }, []);
    
//   const resetForm = useCallback(() => {
//     setFormData(getDefaultFormData());
//     setCurrentStep(1);
//     setVisitedSteps([]);
//     setStepErrors({});
//     localStorage.removeItem('requirement-draft-form');
//     setIsEditing(false);
//     navigate('/create-requirement', { replace: true });
//   }, [navigate]);

//   const validateStep = useCallback((step: number) => {
//     const errors: Record<string, string> = {};
    
//     try {
//       switch (step) {
//         case 1:
//           if (!formData.title || formData.title.trim() === '') {
//             errors.title = "Title is required";
//           }
//           if (!formData.category) {
//             errors.category = "Category is required";
//           }
//           if (!formData.priority) {
//             errors.priority = "Priority is required";
//           }
//           if (!formData.businessJustification || formData.businessJustification.trim() === '') {
//             errors.businessJustification = "Business justification is required";
//           }
//           if (!formData.department || formData.department.trim() === '') {
//             errors.department = "Department is required";
//           }
//           if (!formData.costCenter || formData.costCenter.trim() === '') {
//             errors.costCenter = "Cost center is required";
//           } else if (!/^[A-Z0-9]{3,10}$/.test(formData.costCenter)) {
//             errors.costCenter = "Cost center must be 3-10 alphanumeric characters in uppercase";
//           }
//           if (!formData.estimatedBudget || formData.estimatedBudget <= 0) {
//             errors.estimatedBudget = "Valid estimated budget is required";
//           }
//           break;
          
//         case 2:
//           if (formData.category === "Expert") {
//             if (!formData.description || formData.description.trim() === '') {
//               errors.description = "Detailed Description is required";
//             }
//             if (!formData.specialization || formData.specialization.trim() === '') {
//               errors.specialization = "Specialization is required";
//             }
//             if (!formData.budget || formData.budget <= 0) {
//               errors.budget = "Valid budget is required";
//             }
//             if (!formData.duration || formData.duration <= 0) {
//               errors.duration = "Valid duration is required";
//             }
//             if (!formData.startDate) {
//               errors.startDate = "Start date is required";
//             }
//             if (!formData.certifications || formData.certifications.length === 0) {
//               errors.certifications = "At least one certification is required";
//             }
//           } else if (formData.category === "Product") {
//             if (!formData.productSpecifications || formData.productSpecifications.trim() === '') {
//               errors.productSpecifications = "Product specifications are required";
//             }
//             if (!formData.quantity || formData.quantity <= 0) {
//               errors.quantity = "Valid quantity is required";
//             }
//             if (!formData.technicalStandards || formData.technicalStandards.length === 0) {
//               errors.technicalStandards = "At least one technical standard is required";
//             }
//             if (!formData.productDeliveryDate) {
//               errors.productDeliveryDate = "Delivery date is required";
//             }
//             if (!formData.budget || formData.budget <= 0) {
//               errors.budget = "Valid budget is required";
//             }
//             if (!formData.qualityRequirements) {
//               errors.qualityRequirements = "Quality requirements are required";
//             }
//           } else if (formData.category === "Services") {
//             if (!formData.serviceDescription || formData.serviceDescription.trim() === '') {
//               errors.serviceDescription = "Service description is required";
//             }
//             if (!formData.scopeOfWork || formData.scopeOfWork.trim() === '') {
//               errors.scopeOfWork = "Scope of work is required";
//             }
//             if (!formData.performanceMetrics || formData.performanceMetrics.trim() === '') {
//               errors.performanceMetrics = "Performance metrics are required";
//             }
//             if (!formData.serviceStartDate) {
//               errors.serviceStartDate = "Start date is required";
//             }
//             if (!formData.serviceEndDate) {
//               errors.serviceEndDate = "End date is required";
//             }
//             if (!formData.location || formData.location.trim() === '') {
//               errors.location = "Location is required";
//             }
//             if (!formData.budget || formData.budget <= 0) {
//               errors.budget = "Valid budget is required";
//             }
//           } else if (formData.category === "Logistics") {
//             if (!formData.equipmentType || formData.equipmentType.trim() === '') {
//               errors.equipmentType = "Equipment type is required";
//             }
//             if (!formData.pickupLocation || formData.pickupLocation.trim() === '') {
//               errors.pickupLocation = "Pickup location is required";
//             }
//             if (!formData.deliveryLocation || formData.deliveryLocation.trim() === '') {
//               errors.deliveryLocation = "Delivery location is required";
//             }
//             if (!formData.pickupDate) {
//               errors.pickupDate = "Pickup date is required";
//             }
//             if (!formData.deliveryDate) {
//               errors.deliveryDate = "Delivery date is required";
//             }
//           }
//           break;
          
//         case 3:
//           // Documents step is optional - no validation required
//           break;
          
//         case 4:
//           if (!formData.submissionDeadline) {
//             errors.submissionDeadline = "Submission deadline is required";
//           }
//           if (!formData.evaluationCriteria || formData.evaluationCriteria.length === 0) {
//             errors.evaluationCriteria = "At least one evaluation criterion must be selected";
//           }
//           if (formData.visibility === "selected") {
//             if (!formData.invitedSuppliers || formData.invitedSuppliers.length === 0) {
//               errors.invitedSuppliers = "Please select at least one supplier to invite";
//             }
//           }
//           break;
          
//         case 5:
//           // Preview step - no validation required
//           break;
          
//         case 6:
//           if (!formData.termsAccepted) {
//             errors.termsAccepted = "You must accept the terms and conditions";
//           }
//           break;
//       }

//       setStepErrors(errors);
//       return Object.keys(errors).length === 0;
//     } catch (error) {
//       setStepErrors({ general: "Validation error occurred" });
//       return false;
//     }
//   }, [formData]);

//   const isFormValid = useCallback(() => {
//     for (let step = 1; step <= 6; step++) {
//       if (!validateStep(step)) {
//         return false;
//       }
//     }
//     return true;
//   }, [validateStep]);

//   const isStepFilled = useCallback((stepId: number): boolean => {
//     switch (stepId) {
//       case 1:
//         return !!formData.title && !!formData.category && !!formData.priority && 
//              !!formData.businessJustification && !!formData.department && 
//              !!formData.costCenter && /^[A-Z0-9]{3,10}$/.test(formData.costCenter) && 
//              !!formData.estimatedBudget;
      
//       case 2: {
//         if (formData.category === "Expert") {
//           return !!formData.description && !!formData.specialization && !!formData.budget && 
//                  !!formData.duration && !!formData.startDate && 
//                  (formData.certifications?.length ?? 0) > 0;
//         } else if (formData.category === "Product") {
//           return !!formData.productSpecifications && !!formData.quantity && 
//                  !!formData.productDeliveryDate && !!formData.qualityRequirements && 
//                  (formData.technicalStandards?.length ?? 0) > 0;
//         } else if (formData.category === "Services") {
//           return !!formData.serviceDescription && !!formData.scopeOfWork && 
//                  !!formData.performanceMetrics && !!formData.serviceStartDate && 
//                  !!formData.serviceEndDate && !!formData.location;
//         } else if (formData.category === "Logistics") {
//           return !!formData.equipmentType && !!formData.pickupLocation && 
//                  !!formData.deliveryLocation && !!formData.pickupDate && 
//                  !!formData.deliveryDate && !!formData.budget;
//         }
//         return false;
//       }
      
//       case 3:
//         // Documents step is optional
//         return true;
        
//       case 4:
//         const basePublishValid = !!formData.submissionDeadline && 
//                (formData.evaluationCriteria?.length ?? 0) > 0;
        
//         if (formData.visibility === "selected") {
//           return basePublishValid && (formData.invitedSuppliers?.length ?? 0) > 0;
//         }
//         return basePublishValid;
        
//       case 5:
//         // Preview step is always considered filled
//         return true;
        
//       case 6:
//         return !!formData.termsAccepted;
      
//       default:
//         return true;
//     }
//   }, [formData]);

//   const goToNextStep = useCallback(() => {
//     if (validateStep(currentStep)) {
//       setVisitedSteps(prev => [...new Set([...prev, currentStep])]);
//       setCurrentStep(prev => (prev < 6 ? (prev + 1) as StepType : prev));
//     } else {
//       toast.error("Please fill all required fields before proceeding.");
//     }
//   }, [currentStep, validateStep]);

//   const goToPrevStep = useCallback(() => {
//     setCurrentStep(prev => (prev > 1 ? (prev - 1) as StepType : prev));
//   }, []);

//   const saveAsDraft = useCallback(async () => {
//     try {
//       const newDraft = {
//         ...formData,
//         status: 'Draft' as const,
//         lastModified: new Date(),
//         version: (formData.version || 0) + 1,
//       };

//       const allRequirements = getAllRequirements();
//       const existingIndex = allRequirements.findIndex(req => req.id === newDraft.id);

//       if (existingIndex > -1) {
//         allRequirements[existingIndex] = newDraft;
//       } else {
//         allRequirements.push(newDraft);
//       }

//       saveAllRequirements(allRequirements);
//       toast.success('Draft saved successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error saving draft:', error);
//       toast.error('Failed to save draft');
//       return Promise.reject(error);
//     }
//   }, [formData]);

//   const publishRequirement = useCallback(async () => {
//     try {
//       if (!isFormValid()) {
//         toast.error('Please fix all errors before publishing');
//         return Promise.reject(new Error('Form validation failed'));
//       }

//       const allRequirements = getAllRequirements();
//       const publishedRequirement = {
//         ...formData,
//         status: 'Active' as const,
//         approvalStatus: 'approved' as const,
//         publishedDate: new Date(),
//         lastModified: new Date(),
//         version: (formData.version || 0) + 1,
//       };

//       const updatedRequirements = allRequirements.filter(req => req.id !== publishedRequirement.id);
//       updatedRequirements.push(publishedRequirement);
      
//       saveAllRequirements(updatedRequirements);
//       resetForm();
//       toast.success(isEditing ? 'Requirement updated successfully' : 'Requirement published successfully');
      
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error publishing requirement:', error);
//       toast.error('Failed to publish requirement');
//       return Promise.reject(error);
//     }
//   }, [formData, isFormValid, resetForm, isEditing]);

//   const emergencyPublishRequirement = useCallback(async () => {
//     try {
//       if (!isFormValid()) {
//         toast.error('Please fix all errors before publishing');
//         return Promise.reject(new Error('Form validation failed'));
//       }

//       const allRequirements = getAllRequirements();
//       const emergencyRequirement = {
//         ...formData,
//         status: 'Pending' as const,
//         approvalStatus: 'pending' as const,
//         emergencyPublished: true,
//         publishedDate: new Date(),
//         lastModified: new Date(),
//         version: (formData.version || 0) + 1,
//       };

//       const updatedRequirements = allRequirements.filter(req => req.id !== emergencyRequirement.id);
//       updatedRequirements.push(emergencyRequirement);
      
//       saveAllRequirements(updatedRequirements);
//       resetForm();
//       toast.warning('Requirement published under emergency protocol! It is now pending final approval.');
      
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error emergency publishing requirement:', error);
//       toast.error('Failed to emergency publish requirement');
//       return Promise.reject(error);
//     }
//   }, [formData, isFormValid, resetForm]);

//   const getDrafts = useCallback((): RequirementFormData[] => {
//     return getAllRequirements().filter(req => req.status === 'Draft');
//   }, []);

//   const getPublishedRequirements = useCallback((): RequirementFormData[] => {
//     return getAllRequirements().filter(req => 
//       ['Active', 'Pending', 'Under Review', 'Approved'].includes(req.status || '')
//     );
//   }, []);

//   const loadDraft = useCallback((id: string) => {
//     const draftToLoad = getAllRequirements().find(draft => draft.id === id);
    
//     if (draftToLoad) {
//       setFormData(draftToLoad);
//       setIsEditing(true);
//       toast.success('Draft loaded successfully');
//     } else {
//       toast.error('Draft not found');
//     }
//   }, [setFormData, setIsEditing]);

//   const deleteDraft = useCallback(async (id: string) => {
//     try {
//       const allRequirements = getAllRequirements();
//       const updatedRequirements = allRequirements.filter(req => req.id !== id);
//       saveAllRequirements(updatedRequirements);
      
//       if (formData.id === id) {
//         resetForm();
//       }
      
//       toast.success('Item deleted successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error deleting draft:', error);
//       toast.error('Failed to delete draft');
//       return Promise.reject(error);
//     }
//   }, [formData.id, resetForm]);

//   const duplicateRequirement = useCallback(async (id: string) => {
//     try {
//       const allRequirements = getAllRequirements();
//       const requirementToDuplicate = allRequirements.find(req => req.id === id);
      
//       if (requirementToDuplicate) {
//         const duplicatedRequirement = {
//           ...requirementToDuplicate,
//           id: generateNewReferenceNumber(),
//           status: 'Draft' as const,
//           title: `${requirementToDuplicate.title} (Copy)`,
//           lastModified: new Date(),
//           version: 1,
//         };
        
//         const updatedRequirements = [...allRequirements, duplicatedRequirement];
//         saveAllRequirements(updatedRequirements);
//         setFormData(duplicatedRequirement);
//         setIsEditing(true);
//         toast.success('Requirement duplicated successfully');
//         return Promise.resolve();
//       } else {
//         toast.error('Requirement not found');
//         return Promise.reject(new Error('Requirement not found'));
//       }
//     } catch (error) {
//       console.error('Error duplicating requirement:', error);
//       toast.error('Failed to duplicate requirement');
//       return Promise.reject(error);
//     }
//   }, [setFormData, setIsEditing]);

//   const addAttachment = useCallback(async (file: File) => {
//     try {
//       const mockFileUrl = URL.createObjectURL(file);
      
//       const newAttachment: Document = {
//         id: `ATT-${Date.now()}`,
//         name: file.name,
//         url: mockFileUrl,
//         type: file.type,
//         size: file.size,
//         documentType: 'other',
//         version: 1,
//         uploadedAt: new Date(),
//         uploadedBy: 'current-user'
//       };

//       updateFormData({
//         attachments: [...(formData.attachments || []), newAttachment]
//       });
      
//       toast.success('File uploaded successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding attachment:', error);
//       toast.error('Failed to upload file');
//       return Promise.reject(error);
//     }
//   }, [formData.attachments, updateFormData]);

//   const removeAttachment = useCallback((id: string) => {
//     updateFormData({
//       attachments: (formData.attachments || []).filter(attachment => attachment.id !== id)
//     });
//     toast.success('Attachment removed');
//   }, [formData.attachments, updateFormData]);

//   const addNote = useCallback((note: string) => {
//     updateFormData({
//       notes: note
//     });
//   }, [updateFormData]);

//   const addMilestone = useCallback((milestone: { name: string; date: Date; deliverable: string }) => {
//     updateFormData({
//       milestones: [...(formData.milestones || []), milestone]
//     });
//   }, [formData.milestones, updateFormData]);

//   const removeMilestone = useCallback((index: number) => {
//     const updatedMilestones = [...(formData.milestones || [])];
//     updatedMilestones.splice(index, 1);
//     updateFormData({
//       milestones: updatedMilestones
//     });
//   }, [formData.milestones, updateFormData]);

//   const updateMilestone = useCallback((index: number, milestone: { name: string; date: Date; deliverable: string }) => {
//     const updatedMilestones = [...(formData.milestones || [])];
//     updatedMilestones[index] = milestone;
//     updateFormData({
//       milestones: updatedMilestones
//     });
//   }, [formData.milestones, updateFormData]);

//   const addTag = useCallback((tag: string) => {
//     updateFormData({
//       tags: [...new Set([...(formData.tags || []), tag])]
//     });
//   }, [formData.tags, updateFormData]);

//   const removeTag = useCallback((tag: string) => {
//     updateFormData({
//       tags: (formData.tags || []).filter(t => t !== tag)
//     });
//   }, [formData.tags, updateFormData]);

//   const saveCurrentState = useCallback(() => {
//     const history = JSON.parse(localStorage.getItem('requirement-history') || '[]');
//     const newHistory = [...history, formData];
//     localStorage.setItem('requirement-history', JSON.stringify(newHistory));
//   }, [formData]);

//   const loadFromHistory = useCallback((version: number) => {
//     const history = JSON.parse(localStorage.getItem('requirement-history') || '[]');
//     const historicalState = history.find((item: RequirementFormData) => item.version === version);
    
//     if (historicalState) {
//       setFormData(historicalState);
//       toast.success(`Loaded version ${version}`);
//     } else {
//       toast.error('Version not found in history');
//     }
//   }, []);

//   const getHistory = useCallback((): RequirementFormData[] => {
//     return JSON.parse(localStorage.getItem('requirement-history') || '[]');
//   }, []);

//   const addRevision = useCallback(async (changes: string[]) => {
//     try {
//       const newRevision = {
//         version: (formData.version || 1) + 1,
//         modifiedAt: new Date(),
//         modifiedBy: 'current-user',
//         changes
//       };

//       updateFormData({
//         revisionHistory: [...(formData.revisionHistory || []), newRevision],
//         version: newRevision.version
//       });
      
//       toast.success('Revision added successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding revision:', error);
//       toast.error('Failed to add revision');
//       return Promise.reject(error);
//     }
//   }, [formData.revisionHistory, updateFormData]);

//   const addApprovalComment = useCallback(async (comment: string, commentedBy: string) => {
//     try {
//       const newComment = {
//         comment,
//         commentedBy,
//         commentedAt: new Date(),
//         isResolved: false
//       };

//       updateFormData({
//         approvalComments: [...(formData.approvalComments || []), newComment]
//       });
      
//       toast.success('Comment added successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding approval comment:', error);
//       toast.error('Failed to add comment');
//       return Promise.reject(error);
//     }
//   }, [formData.approvalComments, updateFormData]);

//   const resolveApprovalComment = useCallback(async (commentIndex: number) => {
//     try {
//       const updatedComments = [...(formData.approvalComments || [])];
//       if (commentIndex >= 0 && commentIndex < updatedComments.length) {
//         updatedComments[commentIndex].isResolved = true;
//         updateFormData({
//           approvalComments: updatedComments
//         });
//         toast.success('Comment resolved');
//         return Promise.resolve();
//       }
//       toast.error('Invalid comment index');
//       return Promise.reject(new Error('Invalid comment index'));
//     } catch (error) {
//       console.error('Error resolving approval comment:', error);
//       toast.error('Failed to resolve comment');
//       return Promise.reject(error);
//     }
//   }, [formData.approvalComments, updateFormData]);

//   const addCollaborationComment = useCallback(async (comment: string, commentedBy: string) => {
//     try {
//       const newComment = {
//         comment,
//         commentedBy,
//         commentedAt: new Date(),
//         replies: []
//       };

//       updateFormData({
//         collaborationComments: [...(formData.collaborationComments || []), newComment]
//       });
      
//       toast.success('Comment added successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding collaboration comment:', error);
//       toast.error('Failed to add comment');
//       return Promise.reject(error);
//     }
//   }, [formData.collaborationComments, updateFormData]);

//   const replyToCollaborationComment = useCallback(async (commentIndex: number, reply: string, repliedBy: string) => {
//     try {
//       const updatedComments = [...(formData.collaborationComments || [])];
//       if (commentIndex >= 0 && commentIndex < updatedComments.length) {
//         const newReply = {
//           reply,
//           repliedBy,
//           repliedAt: new Date()
//         };
//         updatedComments[commentIndex].replies.push(newReply);
//         updateFormData({
//           collaborationComments: updatedComments
//         });
//         toast.success('Reply added successfully');
//         return Promise.resolve();
//       }
//       toast.error('Invalid comment index');
//       return Promise.reject(new Error('Invalid comment index'));
//     } catch (error) {
//       console.error('Error replying to collaboration comment:', error);
//       toast.error('Failed to add reply');
//       return Promise.reject(error);
//     }
//   }, [formData.collaborationComments, updateFormData]);

//   const addLinkedProject = useCallback(async (projectId: string) => {
//     try {
//       updateFormData({
//         linkedProjects: [...new Set([...(formData.linkedProjects || []), projectId])]
//       });
//       toast.success('Project linked successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding linked project:', error);
//       toast.error('Failed to link project');
//       return Promise.reject(error);
//     }
//   }, [formData.linkedProjects, updateFormData]);

//   const removeLinkedProject = useCallback(async (projectId: string) => {
//     try {
//       updateFormData({
//         linkedProjects: (formData.linkedProjects || []).filter(id => id !== projectId)
//       });
//       toast.success('Project unlinked successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error removing linked project:', error);
//       toast.error('Failed to unlink project');
//       return Promise.reject(error);
//     }
//   }, [formData.linkedProjects, updateFormData]);

//   const addCostBreakdownItem = useCallback(async (item: string, cost: number, quantity: number) => {
//     try {
//       const newItem = {
//         item,
//         cost,
//         quantity,
//         total: cost * quantity
//       };

//       updateFormData({
//         costBreakdown: [...(formData.costBreakdown || []), newItem]
//       });
      
//       toast.success('Cost item added successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding cost breakdown item:', error);
//       toast.error('Failed to add cost item');
//       return Promise.reject(error);
//     }
//   }, [formData.costBreakdown, updateFormData]);

//   const updateCostBreakdownItem = useCallback(async (index: number, updates: Partial<{ item: string; cost: number; quantity: number }>) => {
//     try {
//       const updatedBreakdown = [...(formData.costBreakdown || [])];
//       if (index >= 0 && index < updatedBreakdown.length) {
//         updatedBreakdown[index] = {
//           ...updatedBreakdown[index],
//           ...updates,
//           total: (updates.cost || updatedBreakdown[index].cost) * 
//                  (updates.quantity || updatedBreakdown[index].quantity)
//         };
//         updateFormData({
//           costBreakdown: updatedBreakdown
//         });
//         toast.success('Cost item updated successfully');
//         return Promise.resolve();
//       }
//       toast.error('Invalid item index');
//       return Promise.reject(new Error('Invalid item index'));
//     } catch (error) {
//       console.error('Error updating cost breakdown item:', error);
//       toast.error('Failed to update cost item');
//       return Promise.reject(error);
//     }
//   }, [formData.costBreakdown, updateFormData]);

//   const removeCostBreakdownItem = useCallback(async (index: number) => {
//     try {
//       const updatedBreakdown = [...(formData.costBreakdown || [])];
//       if (index >= 0 && index < updatedBreakdown.length) {
//         updatedBreakdown.splice(index, 1);
//         updateFormData({
//           costBreakdown: updatedBreakdown
//         });
//         toast.success('Cost item removed successfully');
//         return Promise.resolve();
//       }
//       toast.error('Invalid item index');
//       return Promise.reject(new Error('Invalid item index'));
//     } catch (error) {
//       console.error('Error removing cost breakdown item:', error);
//       toast.error('Failed to remove cost item');
//       return Promise.reject(error);
//     }
//   }, [formData.costBreakdown, updateFormData]);

//   const addRiskAssessment = useCallback(async (
//     risk: string, 
//     probability: 'low' | 'medium' | 'high', 
//     impact: 'low' | 'medium' | 'high', 
//     mitigationStrategy: string
//   ) => {
//     try {
//       const newRisk = {
//         risk,
//         probability,
//         impact,
//         mitigationStrategy
//       };

//       updateFormData({
//         riskAssessment: [...(formData.riskAssessment || []), newRisk]
//       });
      
//       toast.success('Risk assessment added successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error adding risk assessment:', error);
//       toast.error('Failed to add risk assessment');
//       return Promise.reject(error);
//     }
//   }, [formData.riskAssessment, updateFormData]);

//   const updateRiskAssessment = useCallback(async (
//     index: number, 
//     updates: Partial<{ 
//       risk: string; 
//       probability: 'low' | 'medium' | 'high'; 
//       impact: 'low' | 'medium' | 'high'; 
//       mitigationStrategy: string 
//     }>
//   ) => {
//     try {
//       const updatedAssessment = [...(formData.riskAssessment || [])];
//       if (index >= 0 && index < updatedAssessment.length) {
//         updatedAssessment[index] = {
//           ...updatedAssessment[index],
//           ...updates
//         };
//         updateFormData({
//           riskAssessment: updatedAssessment
//         });
//         toast.success('Risk assessment updated successfully');
//         return Promise.resolve();
//       }
//       toast.error('Invalid risk index');
//       return Promise.reject(new Error('Invalid risk index'));
//     } catch (error) {
//       console.error('Error updating risk assessment:', error);
//       toast.error('Failed to update risk assessment');
//       return Promise.reject(error);
//     }
//   }, [formData.riskAssessment, updateFormData]);

//   const removeRiskAssessment = useCallback(async (index: number) => {
//     try {
//       const updatedAssessment = [...(formData.riskAssessment || [])];
//       if (index >= 0 && index < updatedAssessment.length) {
//         updatedAssessment.splice(index, 1);
//         updateFormData({
//           riskAssessment: updatedAssessment
//         });
//         toast.success('Risk assessment removed successfully');
//         return Promise.resolve();
//       }
//       toast.error('Invalid risk index');
//       return Promise.reject(new Error('Invalid risk index'));
//     } catch (error) {
//       console.error('Error removing risk assessment:', error);
//       toast.error('Failed to remove risk assessment');
//       return Promise.reject(error);
//     }
//   }, [formData.riskAssessment, updateFormData]);

//   const setCustomField = useCallback(async (key: string, value: any) => {
//     try {
//       updateFormData({
//         customFields: {
//           ...(formData.customFields || {}),
//           [key]: value
//         }
//       });
//       toast.success('Custom field set successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error setting custom field:', error);
//       toast.error('Failed to set custom field');
//       return Promise.reject(error);
//     }
//   }, [formData.customFields, updateFormData]);

//   const removeCustomField = useCallback(async (key: string) => {
//     try {
//       const newCustomFields = { ...(formData.customFields || {}) };
//       delete newCustomFields[key];
//       updateFormData({
//         customFields: newCustomFields
//       });
//       toast.success('Custom field removed successfully');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error removing custom field:', error);
//       toast.error('Failed to remove custom field');
//       return Promise.reject(error);
//     }
//   }, [formData.customFields, updateFormData]);

//   const submitForApproval = useCallback(async () => {
//     try {
//       if (!isFormValid()) {
//         toast.error('Please fix all errors before submitting for approval');
//         return Promise.reject(new Error('Form validation failed'));
//       }

//       updateFormData({
//         status: 'Under Review',
//         approvalStatus: 'pending' as const,
//         submittedForApprovalAt: new Date()
//       });
      
//       toast.success('Requirement submitted for approval');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error submitting for approval:', error);
//       toast.error('Failed to submit for approval');
//       return Promise.reject(error);
//     }
//   }, [isFormValid, updateFormData]);

//   const approveRequirement = useCallback(async (comment?: string) => {
//     try {
//       if (comment) {
//         await addApprovalComment(comment, 'approver');
//       }
      
//       updateFormData({
//         status: 'Approved' as const,
//         approvalStatus: 'approved' as const,
//         approvedAt: new Date()
//       });
      
//       toast.success('Requirement approved');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error approving requirement:', error);
//       toast.error('Failed to approve requirement');
//       return Promise.reject(error);
//     }
//   }, [addApprovalComment, updateFormData]);

//   const rejectRequirement = useCallback(async (comment: string) => {
//     try {
//       await addApprovalComment(comment, 'approver');
      
//       updateFormData({
//         status: 'Rejected' as const,
//         approvalStatus: 'rejected' as const,
//         rejectedAt: new Date()
//       });
      
//       toast.error('Requirement rejected');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error rejecting requirement:', error);
//       toast.error('Failed to reject requirement');
//       return Promise.reject(error);
//     }
//   }, [addApprovalComment, updateFormData]);

//   const closeRequirement = useCallback(async () => {
//     try {
//       updateFormData({
//         status: 'Closed' as const,
//         closedAt: new Date()
//       });
      
//       toast.success('Requirement closed');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error closing requirement:', error);
//       toast.error('Failed to close requirement');
//       return Promise.reject(error);
//     }
//   }, [updateFormData]);

//   const reopenRequirement = useCallback(async () => {
//     try {
//       updateFormData({
//         status: 'Active' as const,
//         reopenedAt: new Date()
//       });
      
//       toast.success('Requirement reopened');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error reopening requirement:', error);
//       toast.error('Failed to reopen requirement');
//       return Promise.reject(error);
//     }
//   }, [updateFormData]);

//   const searchRequirements = useCallback((query: string, filters?: Record<string, any>): RequirementFormData[] => {
//     const allRequirements = getAllRequirements();
//     const lowerQuery = query.toLowerCase();
    
//     return allRequirements.filter(req => {
//       const matchesText = 
//         req.title?.toLowerCase().includes(lowerQuery) ||
//         req.description?.toLowerCase().includes(lowerQuery) ||
//         req.businessJustification?.toLowerCase().includes(lowerQuery) ||
//         req.referenceNumber?.toLowerCase().includes(lowerQuery);
      
//       let matchesFilters = true;
//       if (filters) {
//         Object.entries(filters).forEach(([key, value]) => {
//           if (value !== undefined && req[key as keyof RequirementFormData] !== value) {
//             matchesFilters = false;
//           }
//         });
//       }
      
//       return matchesText && matchesFilters;
//     });
//   }, []);

//   const notifyStakeholders = useCallback(async (message: string, recipients: string[]) => {
//     try {
//       console.log(`Notifying stakeholders: ${recipients.join(', ')} with message: ${message}`);
//       toast.success('Notifications sent to stakeholders');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error notifying stakeholders:', error);
//       toast.error('Failed to notify stakeholders');
//       return Promise.reject(error);
//     }
//   }, []);

//   const exportToPDF = useCallback(async () => {
//     try {
//       console.log('Exporting to PDF:', formData);
//       toast.success('PDF export started');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error exporting to PDF:', error);
//       toast.error('Failed to export to PDF');
//       return Promise.reject(error);
//     }
//   }, [formData]);

//   const exportToExcel = useCallback(async () => {
//     try {
//       console.log('Exporting to Excel:', formData);
//       toast.success('Excel export started');
//       return Promise.resolve();
//     } catch (error) {
//       console.error('Error exporting to Excel:', error);
//       toast.error('Failed to export to Excel');
//       return Promise.reject(error);
//     }
//   }, [formData]);

//   return (
//     <RequirementContext.Provider value={{
//       formData,
//       setFormData,
//       currentStep,
//       setCurrentStep,
//       visitedSteps,
//       setVisitedSteps,
//       goToNextStep,
//       goToPrevStep,
//       updateFormData,
//       resetForm,
//       validateStep,
//       stepErrors,
//       isFormValid,
//       saveAsDraft,
//       isStepFilled,
//       loadDraft,
//       publishRequirement,
//       emergencyPublishRequirement,
//       deleteDraft,
//       duplicateRequirement,
//       getDrafts,
//       getPublishedRequirements,
//       addAttachment,
//       removeAttachment,
//       addNote,
//       addMilestone,
//       removeMilestone,
//       updateMilestone,
//       addTag,
//       removeTag,
//       saveCurrentState,
//       loadFromHistory,
//       getHistory,
//       isEditing,
//       addRevision,
//       addApprovalComment,
//       resolveApprovalComment,
//       addCollaborationComment,
//       replyToCollaborationComment,
//       addLinkedProject,
//       removeLinkedProject,
//       addCostBreakdownItem,
//       updateCostBreakdownItem,
//       removeCostBreakdownItem,
//       addRiskAssessment,
//       updateRiskAssessment,
//       removeRiskAssessment,
//       setCustomField,
//       removeCustomField,
//       submitForApproval,
//       approveRequirement,
//       rejectRequirement,
//       closeRequirement,
//       reopenRequirement,
//       searchRequirements,
//       notifyStakeholders,
//       exportToPDF,
//       exportToExcel,
//       formModified,
//       setFormModified
//     }}>
//       {children}
//     </RequirementContext.Provider>
//   );
// };

// export const useRequirement = () => {
//   const context = useContext(RequirementContext);
//   if (context === undefined) {
//     throw new Error('useRequirement must be used within a RequirementProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type StepType = 1 | 2 | 3 | 4 | 5 | 6;

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  documentType: "specification" | "drawing" | "reference" | "compliance" | "other";
  version: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface RequirementFormData {
  id: string;
  title?: string;
  category?: "Product" | "Services" | "Expert" | "Logistics";
  priority?: "low" | "medium" | "high" | "critical";
  description?: string;
  specialization?: string;
  productSpecifications?: string;
  quantity?: number;
  serviceDescription?: string;
  scopeOfWork?: string;
  equipmentType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  documents?: Document[];
  submissionDeadline?: Date;
  evaluationCriteria?: string[];
  visibility?: "all" | "selected";
  invitedSuppliers?: string[];
  notifyByEmail?: boolean;
  notifyByApp?: boolean;
  termsAccepted?: boolean;
  budget?: number;
  createdDate?: string;
  deadline?: string;
  applicants?: number;
  complianceRequired?: boolean;
  riskLevel?: "low" | "medium" | "high" | "critical";
  isUrgent?: boolean;
  approvalWorkflowId?: string;
  approvalStatus?: 'not_required' | 'pending' | 'approved' | 'rejected' | 'Draft';
  emergencyPublished?: boolean;
  approvalDeadline?: Date;
  certifications?: string[];
  duration?: number;
  startDate?: Date;
  endDate?: Date;
  technicalStandards?: string[];
  productDeliveryDate?: Date;
  qualityRequirements?: string;
  performanceMetrics?: string;
  serviceStartDate?: Date;
  serviceEndDate?: Date;
  serviceBudget?: number;
  location?: string;
  weight?: number;
  dimensions?: string;
  pickupDate?: Date;
  deliveryDate?: Date;
  specialHandling?: string;
  businessJustification?: string;
  department?: string;
  costCenter?: string;
  requestedBy?: string;
  urgency?: boolean;
  estimatedBudget?: number;
  budgetApproved?: boolean;
  status?: 'Draft' | 'Active' | 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Closed';
  lastModified?: Date;
  modifiedBy?: string;
  version?: number;
  referenceNumber?: string;
  attachments?: Document[];
  notes?: string;
  tags?: string[];
  relatedRequirements?: string[];
  procurementMethod?: 'direct' | 'tender' | 'auction' | 'framework';
  contractType?: 'fixed_price' | 'time_materials' | 'milestone';
  paymentTerms?: string;
  warranty?: string;
  slaTerms?: string;
  penaltyClauses?: string;
  terminationClauses?: string;
  forceMajeure?: string;
  governingLaw?: string;
  disputeResolution?: string;
  confidentiality?: boolean;
  insuranceRequirements?: string;
  subcontractingAllowed?: boolean;
  keyPersonnel?: string[];
  reportingRequirements?: string;
  acceptanceCriteria?: string;
  kpis?: string[];
  milestones?: { name: string; date: Date; deliverable: string }[];
  publishedDate?: Date;
  submittedForApprovalAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  closedAt?: Date;
  reopenedAt?: Date;
  revisionHistory?: {
    version: number;
    modifiedAt: Date;
    modifiedBy: string;
    changes: string[];
  }[];
  approvalComments?: {
    comment: string;
    commentedBy: string;
    commentedAt: Date;
    isResolved: boolean;
  }[];
  collaborationComments?: {
    comment: string;
    commentedBy: string;
    commentedAt: Date;
    replies: {
      reply: string;
      repliedBy: string;
      repliedAt: Date;
    }[];
  }[];
  linkedProjects?: string[];
  costBreakdown?: {
    item: string;
    cost: number;
    quantity: number;
    total: number;
  }[];
  riskAssessment?: {
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigationStrategy: string;
  }[];
  customFields?: Record<string, any>;
  additionalInstructions?: string;
}

interface RequirementContextType {
  formData: RequirementFormData;
  setFormData: (data: RequirementFormData) => void;
  formModified: boolean;
  setFormModified: (modified: boolean) => void;
  currentStep: StepType;
  setCurrentStep: (step: StepType) => void;
  visitedSteps: number[];
  setVisitedSteps: (steps: number[]) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (data: Partial<RequirementFormData>) => void;
  resetForm: () => void;
  validateStep: (step: number) => boolean;
  stepErrors: Record<string, string>;
  isFormValid: () => boolean;
  saveAsDraft: () => Promise<void>;
  isStepFilled: (stepId: number) => boolean;
  loadDraft: (id: string) => void;
  publishRequirement: () => Promise<void>;
  emergencyPublishRequirement: () => Promise<void>;
  deleteDraft: (id: string) => Promise<void>;
  duplicateRequirement: (id: string) => Promise<void>;
  getDrafts: () => RequirementFormData[];
  getPublishedRequirements: () => RequirementFormData[];
  addAttachment: (file: File) => Promise<void>;
  removeAttachment: (id: string) => void;
  addNote: (note: string) => void;
  addMilestone: (milestone: { name: string; date: Date; deliverable: string }) => void;
  removeMilestone: (index: number) => void;
  updateMilestone: (index: number, milestone: { name: string; date: Date; deliverable: string }) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  saveCurrentState: () => void;
  loadFromHistory: (version: number) => void;
  getHistory: () => RequirementFormData[];
  isEditing: boolean;
  addRevision: (changes: string[]) => Promise<void>;
  addApprovalComment: (comment: string, commentedBy: string) => Promise<void>;
  resolveApprovalComment: (commentIndex: number) => Promise<void>;
  addCollaborationComment: (comment: string, commentedBy: string) => Promise<void>;
  replyToCollaborationComment: (commentIndex: number, reply: string, repliedBy: string) => Promise<void>;
  addLinkedProject: (projectId: string) => Promise<void>;
  removeLinkedProject: (projectId: string) => Promise<void>;
  addCostBreakdownItem: (item: string, cost: number, quantity: number) => Promise<void>;
  updateCostBreakdownItem: (index: number, updates: Partial<{ item: string; cost: number; quantity: number }>) => Promise<void>;
  removeCostBreakdownItem: (index: number) => Promise<void>;
  addRiskAssessment: (risk: string, probability: 'low' | 'medium' | 'high', impact: 'low' | 'medium' | 'high', mitigationStrategy: string) => Promise<void>;
  updateRiskAssessment: (index: number, updates: Partial<{ risk: string; probability: 'low' | 'medium' | 'high'; impact: 'low' | 'medium' | 'high'; mitigationStrategy: string }>) => Promise<void>;
  removeRiskAssessment: (index: number) => Promise<void>;
  setCustomField: (key: string, value: any) => Promise<void>;
  removeCustomField: (key: string) => Promise<void>;
  submitForApproval: () => Promise<void>;
  approveRequirement: (comment?: string) => Promise<void>;
  rejectRequirement: (comment: string) => Promise<void>;
  closeRequirement: () => Promise<void>;
  reopenRequirement: () => Promise<void>;
  searchRequirements: (query: string, filters?: Record<string, any>) => RequirementFormData[];
  notifyStakeholders: (message: string, recipients: string[]) => Promise<void>;
  exportToPDF: () => Promise<void>;
  exportToExcel: () => Promise<void>;
  isWorkflowLocked: boolean;
  setFormLocked: (locked: boolean) => void;
}

const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

const generateNewReferenceNumber = (): string => {
  const currentYear = new Date().getFullYear();
  const countersKey = 'requirement_counters';
  let counters: Record<string, number> = {};

  try {
    counters = JSON.parse(localStorage.getItem(countersKey) || '{}');
  } catch (e) {
    console.error("Could not parse requirement counters from localStorage", e);
    counters = {};
  }

  const nextNumber = (counters[currentYear] || 0) + 1;
  counters[currentYear] = nextNumber;
  localStorage.setItem(countersKey, JSON.stringify(counters));

  const paddedNumber = String(nextNumber).padStart(4, '0');
  return `REQ-${currentYear}-${paddedNumber}`;
};

const getDefaultFormData = (): RequirementFormData => ({
  id: generateNewReferenceNumber(),
  title: '',
  category: undefined,
  priority: undefined,
  description: '',
  businessJustification: '',
  department: '',
  costCenter: '',
  requestedBy: '',
  estimatedBudget: 0,
  budgetApproved: false,
  isUrgent: false,
  urgency: false,
  specialization: '',
  productSpecifications: '',
  quantity: 0,
  serviceDescription: '',
  scopeOfWork: '',
  equipmentType: '',
  pickupLocation: '',
  deliveryLocation: '',
  documents: [],
  submissionDeadline: undefined,
  evaluationCriteria: [],
  visibility: 'all',
  invitedSuppliers: [],
  notifyByEmail: false,
  notifyByApp: true,
  termsAccepted: false,
  performanceMetrics: '',
  location: '',
  approvalStatus: 'not_required',
  certifications: [],
  duration: 0,
  startDate: undefined,
  endDate: undefined,
  technicalStandards: [],
  productDeliveryDate: undefined,
  qualityRequirements: '',
  serviceStartDate: undefined,
  serviceEndDate: undefined,
  serviceBudget: 0,
  weight: 0,
  dimensions: '',
  pickupDate: undefined,
  deliveryDate: undefined,
  specialHandling: '',
  riskLevel: undefined,
  complianceRequired: false,
  approvalWorkflowId: '',
  emergencyPublished: false,
  approvalDeadline: undefined,
  createdDate: new Date().toISOString(),
  deadline: '',
  applicants: 0,
  budget: 0,
  status: 'Draft',
  lastModified: new Date(),
  modifiedBy: '',
  version: 1,
  referenceNumber: '',
  attachments: [],
  notes: '',
  tags: [],
  relatedRequirements: [],
  procurementMethod: 'tender',
  contractType: 'fixed_price',
  paymentTerms: '',
  warranty: '',
  slaTerms: '',
  penaltyClauses: '',
  terminationClauses: '',
  forceMajeure: '',
  governingLaw: '',
  disputeResolution: '',
  confidentiality: false,
  insuranceRequirements: '',
  subcontractingAllowed: false,
  keyPersonnel: [],
  reportingRequirements: '',
  acceptanceCriteria: '',
  kpis: [],
  milestones: [],
  revisionHistory: [],
  approvalComments: [],
  collaborationComments: [],
  linkedProjects: [],
  costBreakdown: [],
  riskAssessment: [],
  customFields: {},
  publishedDate: undefined,
  submittedForApprovalAt: undefined,
  approvedAt: undefined,
  rejectedAt: undefined,
  closedAt: undefined,
  reopenedAt: undefined,
  additionalInstructions: '',
});

const getAllRequirements = (): RequirementFormData[] => {
  const rawData = localStorage.getItem('requirements-list');
  return rawData ? JSON.parse(rawData) : [];
};

const saveAllRequirements = (requirements: RequirementFormData[]) => {
  localStorage.setItem('requirements-list', JSON.stringify(requirements));
};

export const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formModified, setFormModified] = useState(false);
  const [formData, setFormData] = useState<RequirementFormData>(() => {
    const editData = location.state?.requirement;
    if (editData) {
      return editData;
    }

    const savedDraft = localStorage.getItem('requirement-draft-form');
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
    
    return getDefaultFormData();
  });
  
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<boolean>(!!location.state?.requirement);
  const [isWorkflowLocked, setIsWorkflowLocked] = useState<boolean>(false);

  useEffect(() => {
    setIsEditing(!!location.state?.requirement);
  }, [location.state]);

  useEffect(() => {
    if (formData.approvalWorkflowId) {
      setIsWorkflowLocked(true);
    }
  }, [formData.approvalWorkflowId]);

  useEffect(() => {
    localStorage.setItem('requirement-draft-form', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = useCallback((data: Partial<RequirementFormData>) => {
    if (isWorkflowLocked) {
      toast.error('Cannot modify form while workflow is active');
      return;
    }
    
    setFormData(prev => ({ 
      ...prev, 
      ...data,
      lastModified: new Date(),
      version: (prev.version || 1) + 1
    }));
    setStepErrors({});
    setFormModified(true);
  }, [isWorkflowLocked]);
  
  const setFormLocked = useCallback((locked: boolean) => {
    setIsWorkflowLocked(locked);
  }, []);
    
  const resetForm = useCallback(() => {
    setFormData(getDefaultFormData());
    setCurrentStep(1);
    setVisitedSteps([]);
    setStepErrors({});
    localStorage.removeItem('requirement-draft-form');
    setIsEditing(false);
    setIsWorkflowLocked(false);
    navigate('/create-requirement', { replace: true });
  }, [navigate]);

  const validateStep = useCallback((step: number) => {
    const errors: Record<string, string> = {};
    
    try {
      switch (step) {
        case 1:
          if (!formData.title || formData.title.trim() === '') {
            errors.title = "Title is required";
          }
          if (!formData.category) {
            errors.category = "Category is required";
          }
          if (!formData.priority) {
            errors.priority = "Priority is required";
          }
          if (!formData.businessJustification || formData.businessJustification.trim() === '') {
            errors.businessJustification = "Business justification is required";
          }
          if (!formData.department || formData.department.trim() === '') {
            errors.department = "Department is required";
          }
          if (!formData.costCenter || formData.costCenter.trim() === '') {
            errors.costCenter = "Cost center is required";
          } else if (!/^[A-Z0-9]{3,10}$/.test(formData.costCenter)) {
            errors.costCenter = "Cost center must be 3-10 alphanumeric characters in uppercase";
          }
          if (!formData.estimatedBudget || formData.estimatedBudget <= 0) {
            errors.estimatedBudget = "Valid estimated budget is required";
          }
          break;
          
        case 2:
          if (formData.category === "Expert") {
            if (!formData.description || formData.description.trim() === '') {
              errors.description = "Detailed Description is required";
            }
            if (!formData.specialization || formData.specialization.trim() === '') {
              errors.specialization = "Specialization is required";
            }
            if (!formData.budget || formData.budget <= 0) {
              errors.budget = "Valid budget is required";
            }
            if (!formData.duration || formData.duration <= 0) {
              errors.duration = "Valid duration is required";
            }
            if (!formData.startDate) {
              errors.startDate = "Start date is required";
            }
            if (!formData.certifications || formData.certifications.length === 0) {
              errors.certifications = "At least one certification is required";
            }
          } else if (formData.category === "Product") {
            if (!formData.productSpecifications || formData.productSpecifications.trim() === '') {
              errors.productSpecifications = "Product specifications are required";
            }
            if (!formData.quantity || formData.quantity <= 0) {
              errors.quantity = "Valid quantity is required";
            }
            if (!formData.technicalStandards || formData.technicalStandards.length === 0) {
              errors.technicalStandards = "At least one technical standard is required";
            }
            if (!formData.productDeliveryDate) {
              errors.productDeliveryDate = "Delivery date is required";
            }
            if (!formData.budget || formData.budget <= 0) {
              errors.budget = "Valid budget is required";
            }
            if (!formData.qualityRequirements) {
              errors.qualityRequirements = "Quality requirements are required";
            }
          } else if (formData.category === "Services") {
            if (!formData.serviceDescription || formData.serviceDescription.trim() === '') {
              errors.serviceDescription = "Service description is required";
            }
            if (!formData.scopeOfWork || formData.scopeOfWork.trim() === '') {
              errors.scopeOfWork = "Scope of work is required";
            }
            if (!formData.performanceMetrics || formData.performanceMetrics.trim() === '') {
              errors.performanceMetrics = "Performance metrics are required";
            }
            if (!formData.serviceStartDate) {
              errors.serviceStartDate = "Start date is required";
            }
            if (!formData.serviceEndDate) {
              errors.serviceEndDate = "End date is required";
            }
            if (!formData.location || formData.location.trim() === '') {
              errors.location = "Location is required";
            }
            if (!formData.budget || formData.budget <= 0) {
              errors.budget = "Valid budget is required";
            }
          } else if (formData.category === "Logistics") {
            if (!formData.equipmentType || formData.equipmentType.trim() === '') {
              errors.equipmentType = "Equipment type is required";
            }
            if (!formData.pickupLocation || formData.pickupLocation.trim() === '') {
              errors.pickupLocation = "Pickup location is required";
            }
            if (!formData.deliveryLocation || formData.deliveryLocation.trim() === '') {
              errors.deliveryLocation = "Delivery location is required";
            }
            if (!formData.pickupDate) {
              errors.pickupDate = "Pickup date is required";
            }
            if (!formData.deliveryDate) {
              errors.deliveryDate = "Delivery date is required";
            }
          }
          break;
          
        case 3:
          // Documents step is optional - no validation required
          break;
          
        case 4:
          if (!formData.submissionDeadline) {
            errors.submissionDeadline = "Submission deadline is required";
          }
          if (!formData.evaluationCriteria || formData.evaluationCriteria.length === 0) {
            errors.evaluationCriteria = "At least one evaluation criterion must be selected";
          }
          if (formData.visibility === "selected") {
            if (!formData.invitedSuppliers || formData.invitedSuppliers.length === 0) {
              errors.invitedSuppliers = "Please select at least one supplier to invite";
            }
          }
          break;
          
        case 5:
          // Preview step - no validation required
          break;
          
        case 6:
          if (!formData.termsAccepted) {
            errors.termsAccepted = "You must accept the terms and conditions";
          }
          break;
      }

      setStepErrors(errors);
      return Object.keys(errors).length === 0;
    } catch (error) {
      setStepErrors({ general: "Validation error occurred" });
      return false;
    }
  }, [formData]);

  const isFormValid = useCallback(() => {
    for (let step = 1; step <= 6; step++) {
      if (!validateStep(step)) {
        return false;
      }
    }
    return true;
  }, [validateStep]);

  const isStepFilled = useCallback((stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return !!formData.title && !!formData.category && !!formData.priority && 
             !!formData.businessJustification && !!formData.department && 
             !!formData.costCenter && /^[A-Z0-9]{3,10}$/.test(formData.costCenter) && 
             !!formData.estimatedBudget;
      
      case 2: {
        if (formData.category === "Expert") {
          return !!formData.description && !!formData.specialization && !!formData.budget && 
                 !!formData.duration && !!formData.startDate && 
                 (formData.certifications?.length ?? 0) > 0;
        } else if (formData.category === "Product") {
          return !!formData.productSpecifications && !!formData.quantity && 
                 !!formData.productDeliveryDate && !!formData.qualityRequirements && 
                 (formData.technicalStandards?.length ?? 0) > 0;
        } else if (formData.category === "Services") {
          return !!formData.serviceDescription && !!formData.scopeOfWork && 
                 !!formData.performanceMetrics && !!formData.serviceStartDate && 
                 !!formData.serviceEndDate && !!formData.location;
        } else if (formData.category === "Logistics") {
          return !!formData.equipmentType && !!formData.pickupLocation && 
                 !!formData.deliveryLocation && !!formData.pickupDate && 
                 !!formData.deliveryDate && !!formData.budget;
        }
        return false;
      }
      
      case 3:
        // Documents step is optional
        return true;
        
      case 4:
        const basePublishValid = !!formData.submissionDeadline && 
               (formData.evaluationCriteria?.length ?? 0) > 0;
        
        if (formData.visibility === "selected") {
          return basePublishValid && (formData.invitedSuppliers?.length ?? 0) > 0;
        }
        return basePublishValid;
        
      case 5:
        // Preview step is always considered filled
        return true;
        
      case 6:
        return !!formData.termsAccepted;
      
      default:
        return true;
    }
  }, [formData]);

  const goToNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setVisitedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => (prev < 6 ? (prev + 1) as StepType : prev));
    } else {
      toast.error("Please fill all required fields before proceeding.");
    }
  }, [currentStep, validateStep]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep(prev => (prev > 1 ? (prev - 1) as StepType : prev));
  }, []);

  const saveAsDraft = useCallback(async () => {
    try {
      const newDraft = {
        ...formData,
        status: 'Draft' as const,
        lastModified: new Date(),
        version: (formData.version || 0) + 1,
      };

      const allRequirements = getAllRequirements();
      const existingIndex = allRequirements.findIndex(req => req.id === newDraft.id);

      if (existingIndex > -1) {
        allRequirements[existingIndex] = newDraft;
      } else {
        allRequirements.push(newDraft);
      }

      saveAllRequirements(allRequirements);
      toast.success('Draft saved successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
      return Promise.reject(error);
    }
  }, [formData]);

  const publishRequirement = useCallback(async () => {
    try {
      if (!isFormValid()) {
        toast.error('Please fix all errors before publishing');
        return Promise.reject(new Error('Form validation failed'));
      }

      const allRequirements = getAllRequirements();
      const publishedRequirement = {
        ...formData,
        status: 'Active' as const,
        approvalStatus: 'approved' as const,
        publishedDate: new Date(),
        lastModified: new Date(),
        version: (formData.version || 0) + 1,
      };

      const updatedRequirements = allRequirements.filter(req => req.id !== publishedRequirement.id);
      updatedRequirements.push(publishedRequirement);
      
      saveAllRequirements(updatedRequirements);
      resetForm();
      toast.success(isEditing ? 'Requirement updated successfully' : 'Requirement published successfully');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error publishing requirement:', error);
      toast.error('Failed to publish requirement');
      return Promise.reject(error);
    }
  }, [formData, isFormValid, resetForm, isEditing]);

  const emergencyPublishRequirement = useCallback(async () => {
    try {
      if (!isFormValid()) {
        toast.error('Please fix all errors before publishing');
        return Promise.reject(new Error('Form validation failed'));
      }

      const allRequirements = getAllRequirements();
      const emergencyRequirement = {
        ...formData,
        status: 'Pending' as const,
        approvalStatus: 'pending' as const,
        emergencyPublished: true,
        publishedDate: new Date(),
        lastModified: new Date(),
        version: (formData.version || 0) + 1,
      };

      const updatedRequirements = allRequirements.filter(req => req.id !== emergencyRequirement.id);
      updatedRequirements.push(emergencyRequirement);
      
      saveAllRequirements(updatedRequirements);
      resetForm();
      toast.warning('Requirement published under emergency protocol! It is now pending final approval.');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error emergency publishing requirement:', error);
      toast.error('Failed to emergency publish requirement');
      return Promise.reject(error);
    }
  }, [formData, isFormValid, resetForm]);

  const getDrafts = useCallback((): RequirementFormData[] => {
    return getAllRequirements().filter(req => req.status === 'Draft');
  }, []);

  const getPublishedRequirements = useCallback((): RequirementFormData[] => {
    return getAllRequirements().filter(req => 
      ['Active', 'Pending', 'Under Review', 'Approved'].includes(req.status || '')
    );
  }, []);

  const loadDraft = useCallback((id: string) => {
    const draftToLoad = getAllRequirements().find(draft => draft.id === id);
    
    if (draftToLoad) {
      setFormData(draftToLoad);
      setIsEditing(true);
      toast.success('Draft loaded successfully');
    } else {
      toast.error('Draft not found');
    }
  }, [setFormData, setIsEditing]);

  const deleteDraft = useCallback(async (id: string) => {
    try {
      const allRequirements = getAllRequirements();
      const updatedRequirements = allRequirements.filter(req => req.id !== id);
      saveAllRequirements(updatedRequirements);
      
      if (formData.id === id) {
        resetForm();
      }
      
      toast.success('Item deleted successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
      return Promise.reject(error);
    }
  }, [formData.id, resetForm]);

  const duplicateRequirement = useCallback(async (id: string) => {
    try {
      const allRequirements = getAllRequirements();
      const requirementToDuplicate = allRequirements.find(req => req.id === id);
      
      if (requirementToDuplicate) {
        const duplicatedRequirement = {
          ...requirementToDuplicate,
          id: generateNewReferenceNumber(),
          status: 'Draft' as const,
          title: `${requirementToDuplicate.title} (Copy)`,
          lastModified: new Date(),
          version: 1,
        };
        
        const updatedRequirements = [...allRequirements, duplicatedRequirement];
        saveAllRequirements(updatedRequirements);
        setFormData(duplicatedRequirement);
        setIsEditing(true);
        toast.success('Requirement duplicated successfully');
        return Promise.resolve();
      } else {
        toast.error('Requirement not found');
        return Promise.reject(new Error('Requirement not found'));
      }
    } catch (error) {
      console.error('Error duplicating requirement:', error);
      toast.error('Failed to duplicate requirement');
      return Promise.reject(error);
    }
  }, [setFormData, setIsEditing]);

  const addAttachment = useCallback(async (file: File) => {
    try {
      const mockFileUrl = URL.createObjectURL(file);
      
      const newAttachment: Document = {
        id: `ATT-${Date.now()}`,
        name: file.name,
        url: mockFileUrl,
        type: file.type,
        size: file.size,
        documentType: 'other',
        version: 1,
        uploadedAt: new Date(),
        uploadedBy: 'current-user'
      };

      updateFormData({
        attachments: [...(formData.attachments || []), newAttachment]
      });
      
      toast.success('File uploaded successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding attachment:', error);
      toast.error('Failed to upload file');
      return Promise.reject(error);
    }
  }, [formData.attachments, updateFormData]);

  const removeAttachment = useCallback((id: string) => {
    if (isWorkflowLocked) {
      toast.error('Cannot modify attachments while workflow is active');
      return;
    }
    
    updateFormData({
      attachments: (formData.attachments || []).filter(attachment => attachment.id !== id)
    });
    toast.success('Attachment removed');
  }, [formData.attachments, updateFormData, isWorkflowLocked]);

  const addNote = useCallback((note: string) => {
    updateFormData({
      notes: note
    });
  }, [updateFormData]);

  const addMilestone = useCallback((milestone: { name: string; date: Date; deliverable: string }) => {
    if (isWorkflowLocked) {
      toast.error('Cannot modify milestones while workflow is active');
      return;
    }
    
    updateFormData({
      milestones: [...(formData.milestones || []), milestone]
    });
  }, [formData.milestones, updateFormData, isWorkflowLocked]);

  const removeMilestone = useCallback((index: number) => {
    if (isWorkflowLocked) {
      toast.error('Cannot modify milestones while workflow is active');
      return;
    }
    
    const updatedMilestones = [...(formData.milestones || [])];
    updatedMilestones.splice(index, 1);
    updateFormData({
      milestones: updatedMilestones
    });
  }, [formData.milestones, updateFormData, isWorkflowLocked]);

  const updateMilestone = useCallback((index: number, milestone: { name: string; date: Date; deliverable: string }) => {
    if (isWorkflowLocked) {
      toast.error('Cannot modify milestones while workflow is active');
      return;
    }
    
    const updatedMilestones = [...(formData.milestones || [])];
    updatedMilestones[index] = milestone;
    updateFormData({
      milestones: updatedMilestones
    });
  }, [formData.milestones, updateFormData, isWorkflowLocked]);

  const addTag = useCallback((tag: string) => {
    updateFormData({
      tags: [...new Set([...(formData.tags || []), tag])]
    });
  }, [formData.tags, updateFormData]);

  const removeTag = useCallback((tag: string) => {
    updateFormData({
      tags: (formData.tags || []).filter(t => t !== tag)
    });
  }, [formData.tags, updateFormData]);

  const saveCurrentState = useCallback(() => {
    const history = JSON.parse(localStorage.getItem('requirement-history') || '[]');
    const newHistory = [...history, formData];
    localStorage.setItem('requirement-history', JSON.stringify(newHistory));
  }, [formData]);

  const loadFromHistory = useCallback((version: number) => {
    if (isWorkflowLocked) {
      toast.error('Cannot load from history while workflow is active');
      return;
    }
    
    const history = JSON.parse(localStorage.getItem('requirement-history') || '[]');
    const historicalState = history.find((item: RequirementFormData) => item.version === version);
    
    if (historicalState) {
      setFormData(historicalState);
      toast.success(`Loaded version ${version}`);
    } else {
      toast.error('Version not found in history');
    }
  }, [isWorkflowLocked]);

  const getHistory = useCallback((): RequirementFormData[] => {
    return JSON.parse(localStorage.getItem('requirement-history') || '[]');
  }, []);

  const addRevision = useCallback(async (changes: string[]) => {
    try {
      const newRevision = {
        version: (formData.version || 1) + 1,
        modifiedAt: new Date(),
        modifiedBy: 'current-user',
        changes
      };

      updateFormData({
        revisionHistory: [...(formData.revisionHistory || []), newRevision],
        version: newRevision.version
      });
      
      toast.success('Revision added successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding revision:', error);
      toast.error('Failed to add revision');
      return Promise.reject(error);
    }
  }, [formData.revisionHistory, updateFormData]);

  const addApprovalComment = useCallback(async (comment: string, commentedBy: string) => {
    try {
      const newComment = {
        comment,
        commentedBy,
        commentedAt: new Date(),
        isResolved: false
      };

      updateFormData({
        approvalComments: [...(formData.approvalComments || []), newComment]
      });
      
      toast.success('Comment added successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding approval comment:', error);
      toast.error('Failed to add comment');
      return Promise.reject(error);
    }
  }, [formData.approvalComments, updateFormData]);

  const resolveApprovalComment = useCallback(async (commentIndex: number) => {
    try {
      const updatedComments = [...(formData.approvalComments || [])];
      if (commentIndex >= 0 && commentIndex < updatedComments.length) {
        updatedComments[commentIndex].isResolved = true;
        updateFormData({
          approvalComments: updatedComments
        });
        toast.success('Comment resolved');
        return Promise.resolve();
      }
      toast.error('Invalid comment index');
      return Promise.reject(new Error('Invalid comment index'));
    } catch (error) {
      console.error('Error resolving approval comment:', error);
      toast.error('Failed to resolve comment');
      return Promise.reject(error);
    }
  }, [formData.approvalComments, updateFormData]);

  const addCollaborationComment = useCallback(async (comment: string, commentedBy: string) => {
    try {
      const newComment = {
        comment,
        commentedBy,
        commentedAt: new Date(),
        replies: []
      };

      updateFormData({
        collaborationComments: [...(formData.collaborationComments || []), newComment]
      });
      
      toast.success('Comment added successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding collaboration comment:', error);
      toast.error('Failed to add comment');
      return Promise.reject(error);
    }
  }, [formData.collaborationComments, updateFormData]);

  const replyToCollaborationComment = useCallback(async (commentIndex: number, reply: string, repliedBy: string) => {
    try {
      const updatedComments = [...(formData.collaborationComments || [])];
      if (commentIndex >= 0 && commentIndex < updatedComments.length) {
        const newReply = {
          reply,
          repliedBy,
          repliedAt: new Date()
        };
        updatedComments[commentIndex].replies.push(newReply);
        updateFormData({
          collaborationComments: updatedComments
        });
        toast.success('Reply added successfully');
        return Promise.resolve();
      }
      toast.error('Invalid comment index');
      return Promise.reject(new Error('Invalid comment index'));
    } catch (error) {
      console.error('Error replying to collaboration comment:', error);
      toast.error('Failed to add reply');
      return Promise.reject(error);
    }
  }, [formData.collaborationComments, updateFormData]);

  const addLinkedProject = useCallback(async (projectId: string) => {
    try {
      updateFormData({
        linkedProjects: [...new Set([...(formData.linkedProjects || []), projectId])]
      });
      toast.success('Project linked successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding linked project:', error);
      toast.error('Failed to link project');
      return Promise.reject(error);
    }
  }, [formData.linkedProjects, updateFormData]);

  const removeLinkedProject = useCallback(async (projectId: string) => {
    try {
      updateFormData({
        linkedProjects: (formData.linkedProjects || []).filter(id => id !== projectId)
      });
      toast.success('Project unlinked successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing linked project:', error);
      toast.error('Failed to unlink project');
      return Promise.reject(error);
    }
  }, [formData.linkedProjects, updateFormData]);

  const addCostBreakdownItem = useCallback(async (item: string, cost: number, quantity: number) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify cost breakdown while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const newItem = {
        item,
        cost,
        quantity,
        total: cost * quantity
      };

      updateFormData({
        costBreakdown: [...(formData.costBreakdown || []), newItem]
      });
      
      toast.success('Cost item added successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding cost breakdown item:', error);
      toast.error('Failed to add cost item');
      return Promise.reject(error);
    }
  }, [formData.costBreakdown, updateFormData, isWorkflowLocked]);

  const updateCostBreakdownItem = useCallback(async (index: number, updates: Partial<{ item: string; cost: number; quantity: number }>) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify cost breakdown while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const updatedBreakdown = [...(formData.costBreakdown || [])];
      if (index >= 0 && index < updatedBreakdown.length) {
        updatedBreakdown[index] = {
          ...updatedBreakdown[index],
          ...updates,
          total: (updates.cost || updatedBreakdown[index].cost) * 
                 (updates.quantity || updatedBreakdown[index].quantity)
        };
        updateFormData({
          costBreakdown: updatedBreakdown
        });
        toast.success('Cost item updated successfully');
        return Promise.resolve();
      }
      toast.error('Invalid item index');
      return Promise.reject(new Error('Invalid item index'));
    } catch (error) {
      console.error('Error updating cost breakdown item:', error);
      toast.error('Failed to update cost item');
      return Promise.reject(error);
    }
  }, [formData.costBreakdown, updateFormData, isWorkflowLocked]);

  const removeCostBreakdownItem = useCallback(async (index: number) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify cost breakdown while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const updatedBreakdown = [...(formData.costBreakdown || [])];
      if (index >= 0 && index < updatedBreakdown.length) {
        updatedBreakdown.splice(index, 1);
        updateFormData({
          costBreakdown: updatedBreakdown
        });
        toast.success('Cost item removed successfully');
        return Promise.resolve();
      }
      toast.error('Invalid item index');
      return Promise.reject(new Error('Invalid item index'));
    } catch (error) {
      console.error('Error removing cost breakdown item:', error);
      toast.error('Failed to remove cost item');
      return Promise.reject(error);
    }
  }, [formData.costBreakdown, updateFormData, isWorkflowLocked]);

  const addRiskAssessment = useCallback(async (
    risk: string, 
    probability: 'low' | 'medium' | 'high', 
    impact: 'low' | 'medium' | 'high', 
    mitigationStrategy: string
  ) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify risk assessment while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const newRisk = {
        risk,
        probability,
        impact,
        mitigationStrategy
      };

      updateFormData({
        riskAssessment: [...(formData.riskAssessment || []), newRisk]
      });
      
      toast.success('Risk assessment added successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding risk assessment:', error);
      toast.error('Failed to add risk assessment');
      return Promise.reject(error);
    }
  }, [formData.riskAssessment, updateFormData, isWorkflowLocked]);

  const updateRiskAssessment = useCallback(async (
    index: number, 
    updates: Partial<{ 
      risk: string; 
      probability: 'low' | 'medium' | 'high'; 
      impact: 'low' | 'medium' | 'high'; 
      mitigationStrategy: string 
    }>
  ) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify risk assessment while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const updatedAssessment = [...(formData.riskAssessment || [])];
      if (index >= 0 && index < updatedAssessment.length) {
        updatedAssessment[index] = {
          ...updatedAssessment[index],
          ...updates
        };
        updateFormData({
          riskAssessment: updatedAssessment
        });
        toast.success('Risk assessment updated successfully');
        return Promise.resolve();
      }
      toast.error('Invalid risk index');
      return Promise.reject(new Error('Invalid risk index'));
    } catch (error) {
      console.error('Error updating risk assessment:', error);
      toast.error('Failed to update risk assessment');
      return Promise.reject(error);
    }
  }, [formData.riskAssessment, updateFormData, isWorkflowLocked]);

  const removeRiskAssessment = useCallback(async (index: number) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify risk assessment while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const updatedAssessment = [...(formData.riskAssessment || [])];
      if (index >= 0 && index < updatedAssessment.length) {
        updatedAssessment.splice(index, 1);
        updateFormData({
          riskAssessment: updatedAssessment
        });
        toast.success('Risk assessment removed successfully');
        return Promise.resolve();
      }
      toast.error('Invalid risk index');
      return Promise.reject(new Error('Invalid risk index'));
    } catch (error) {
      console.error('Error removing risk assessment:', error);
      toast.error('Failed to remove risk assessment');
      return Promise.reject(error);
    }
  }, [formData.riskAssessment, updateFormData, isWorkflowLocked]);

  const setCustomField = useCallback(async (key: string, value: any) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify custom fields while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      updateFormData({
        customFields: {
          ...(formData.customFields || {}),
          [key]: value
        }
      });
      toast.success('Custom field set successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error setting custom field:', error);
      toast.error('Failed to set custom field');
      return Promise.reject(error);
    }
  }, [formData.customFields, updateFormData, isWorkflowLocked]);

  const removeCustomField = useCallback(async (key: string) => {
    try {
      if (isWorkflowLocked) {
        toast.error('Cannot modify custom fields while workflow is active');
        return Promise.reject(new Error('Workflow is locked'));
      }
      
      const newCustomFields = { ...(formData.customFields || {}) };
      delete newCustomFields[key];
      updateFormData({
        customFields: newCustomFields
      });
      toast.success('Custom field removed successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing custom field:', error);
      toast.error('Failed to remove custom field');
      return Promise.reject(error);
    }
  }, [formData.customFields, updateFormData, isWorkflowLocked]);

  const submitForApproval = useCallback(async () => {
    try {
      if (!isFormValid()) {
        toast.error('Please fix all errors before submitting for approval');
        return Promise.reject(new Error('Form validation failed'));
      }

      updateFormData({
        status: 'Under Review',
        approvalStatus: 'pending' as const,
        submittedForApprovalAt: new Date()
      });
      
      setIsWorkflowLocked(true); // Lock the form when submitted for approval
      toast.success('Requirement submitted for approval');
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting for approval:', error);
      toast.error('Failed to submit for approval');
      return Promise.reject(error);
    }
  }, [isFormValid, updateFormData]);

  const approveRequirement = useCallback(async (comment?: string) => {
    try {
      if (comment) {
        await addApprovalComment(comment, 'approver');
      }
      
      updateFormData({
        status: 'Approved' as const,
        approvalStatus: 'approved' as const,
        approvedAt: new Date()
      });
      
      setIsWorkflowLocked(false); // Unlock the form after approval
      toast.success('Requirement approved');
      return Promise.resolve();
    } catch (error) {
      console.error('Error approving requirement:', error);
      toast.error('Failed to approve requirement');
      return Promise.reject(error);
    }
  }, [addApprovalComment, updateFormData]);

  const rejectRequirement = useCallback(async (comment: string) => {
    try {
      await addApprovalComment(comment, 'approver');
      
      updateFormData({
        status: 'Rejected' as const,
        approvalStatus: 'rejected' as const,
        rejectedAt: new Date()
      });
      
      setIsWorkflowLocked(false); // Unlock the form after rejection
      toast.error('Requirement rejected');
      return Promise.resolve();
    } catch (error) {
      console.error('Error rejecting requirement:', error);
      toast.error('Failed to reject requirement');
      return Promise.reject(error);
    }
  }, [addApprovalComment, updateFormData]);

  const closeRequirement = useCallback(async () => {
    try {
      updateFormData({
        status: 'Closed' as const,
        closedAt: new Date()
      });
      
      setIsWorkflowLocked(false); // Unlock the form when closed
      toast.success('Requirement closed');
      return Promise.resolve();
    } catch (error) {
      console.error('Error closing requirement:', error);
      toast.error('Failed to close requirement');
      return Promise.reject(error);
    }
  }, [updateFormData]);

  const reopenRequirement = useCallback(async () => {
    try {
      updateFormData({
        status: 'Active' as const,
        reopenedAt: new Date()
      });
      
      toast.success('Requirement reopened');
      return Promise.resolve();
    } catch (error) {
      console.error('Error reopening requirement:', error);
      toast.error('Failed to reopen requirement');
      return Promise.reject(error);
    }
  }, [updateFormData]);

  const searchRequirements = useCallback((query: string, filters?: Record<string, any>): RequirementFormData[] => {
    const allRequirements = getAllRequirements();
    const lowerQuery = query.toLowerCase();
    
    return allRequirements.filter(req => {
      const matchesText = 
        req.title?.toLowerCase().includes(lowerQuery) ||
        req.description?.toLowerCase().includes(lowerQuery) ||
        req.businessJustification?.toLowerCase().includes(lowerQuery) ||
        req.referenceNumber?.toLowerCase().includes(lowerQuery);
      
      let matchesFilters = true;
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && req[key as keyof RequirementFormData] !== value) {
            matchesFilters = false;
          }
        });
      }
      
      return matchesText && matchesFilters;
    });
  }, []);

  const notifyStakeholders = useCallback(async (message: string, recipients: string[]) => {
    try {
      console.log(`Notifying stakeholders: ${recipients.join(', ')} with message: ${message}`);
      toast.success('Notifications sent to stakeholders');
      return Promise.resolve();
    } catch (error) {
      console.error('Error notifying stakeholders:', error);
      toast.error('Failed to notify stakeholders');
      return Promise.reject(error);
    }
  }, []);

  const exportToPDF = useCallback(async () => {
    try {
      console.log('Exporting to PDF:', formData);
      toast.success('PDF export started');
      return Promise.resolve();
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      toast.error('Failed to export to PDF');
      return Promise.reject(error);
    }
  }, [formData]);

  const exportToExcel = useCallback(async () => {
    try {
      console.log('Exporting to Excel:', formData);
      toast.success('Excel export started');
      return Promise.resolve();
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export to Excel');
      return Promise.reject(error);
    }
  }, [formData]);

  return (
    <RequirementContext.Provider value={{
      formData,
      setFormData,
      currentStep,
      setCurrentStep,
      visitedSteps,
      setVisitedSteps,
      goToNextStep,
      goToPrevStep,
      updateFormData,
      resetForm,
      validateStep,
      stepErrors,
      isFormValid,
      saveAsDraft,
      isStepFilled,
      loadDraft,
      publishRequirement,
      emergencyPublishRequirement,
      deleteDraft,
      duplicateRequirement,
      getDrafts,
      getPublishedRequirements,
      addAttachment,
      removeAttachment,
      addNote,
      addMilestone,
      removeMilestone,
      updateMilestone,
      addTag,
      removeTag,
      saveCurrentState,
      loadFromHistory,
      getHistory,
      isEditing,
      addRevision,
      addApprovalComment,
      resolveApprovalComment,
      addCollaborationComment,
      replyToCollaborationComment,
      addLinkedProject,
      removeLinkedProject,
      addCostBreakdownItem,
      updateCostBreakdownItem,
      removeCostBreakdownItem,
      addRiskAssessment,
      updateRiskAssessment,
      removeRiskAssessment,
      setCustomField,
      removeCustomField,
      submitForApproval,
      approveRequirement,
      rejectRequirement,
      closeRequirement,
      reopenRequirement,
      searchRequirements,
      notifyStakeholders,
      exportToPDF,
      exportToExcel,
      formModified,
      setFormModified,
      isWorkflowLocked,
      setFormLocked
    }}>
      {children}
    </RequirementContext.Provider>
  );
};

export const useRequirement = () => {
  const context = useContext(RequirementContext);
  if (context === undefined) {
    throw new Error('useRequirement must be used within a RequirementProvider');
  }
  return context;
};