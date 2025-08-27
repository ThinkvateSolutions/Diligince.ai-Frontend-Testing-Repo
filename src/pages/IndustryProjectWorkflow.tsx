import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, CheckCircle, Clock, MapPin, Star, Users, Briefcase, RefreshCw, Brain, MessageSquare, ShoppingCart, DollarSign } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { isTopPickAvailable } from '@/components/industry/workflow/QuoteReviewTable';

// Import workflow components
import { QuoteReviewTable } from '@/components/industry/workflow/QuoteReviewTable';
import { POTriggerCard } from '@/components/industry/workflow/POTriggerCard';
import { WorkTimeline } from '@/components/industry/workflow/WorkTimeline';
import { PaymentMilestoneTracker } from '@/components/industry/workflow/PaymentMilestoneTracker';
import { RetentionPaymentCard } from '@/components/industry/workflow/RetentionPaymentCard';
import { SendRFQModal } from '@/components/industry/SendRFQModal';
import { AIEvaluationPanel } from '@/components/industry/workflow/AIEvaluationPanel';
import { QuoteComparisonCard } from '@/components/industry/workflow/QuoteComparisonCard';
import { QuoteStatusTracker } from '@/components/industry/workflow/QuoteStatusTracker';

// Import types
import { ProjectWorkflow, VendorQuote, PaymentMilestone, WorkflowEvent, RetentionPayment } from '@/types/workflow';

// --- FULL MOCK DATA DEFINED LOCALLY ---
const initialRequirements = [
  { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement for the New Hydro-Processing Plant Unit #7', category: 'Product', priority: 'High' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves and pressure control systems for the new hydro-processing unit.' },
  { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'Medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection and maintenance services for the northern sector pipeline.' },
  { id: 'REQ-2024-003', title: 'Safety Compliance Audit for All On-site and Off-site Operations', category: 'Expert', priority: 'High' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit and certification in accordance with ISO 45001 standards.' },
  { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'Low' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy industrial equipment from the port to the main plant.' },
  { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets and Seals', category: 'Product', priority: 'Medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for high-temperature resistant gaskets for the furnace assembly line.' },
  { id: 'REQ-2024-006', title: 'Procurement of PLC Control Panels for Assembly Line Upgrade', category: 'Product', priority: 'High' as const, status: 'Pending' as const, budget: 220000, createdDate: '2024-02-05', submissionDeadline: '2024-04-01', description: 'Supply and delivery of 15 customized PLC control panels as per technical specification document #PLC-SPEC-08.' },
  { id: 'REQ-2024-007', title: 'Personal Protective Equipment (PPE) Annual Stock Replenishment', category: 'Product', priority: 'Low' as const, status: 'Completed' as const, budget: 18000, createdDate: '2024-01-05', submissionDeadline: '2024-01-25', description: 'Annual replenishment of safety helmets, gloves, and protective eyewear for all plant personnel.' },
  { id: 'REQ-2024-008', title: 'Annual Maintenance Contract for HVAC Systems', category: 'Services', priority: 'Medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-02-10', submissionDeadline: '2024-03-15', description: 'A comprehensive annual maintenance contract (AMC) for all industrial HVAC units across the facility.' },
  { id: 'REQ-2024-009', title: 'Non-Destructive Testing (NDT) for Welded Joints', category: 'Services', priority: 'High' as const, status: 'Pending' as const, budget: 95000, createdDate: '2024-02-12', submissionDeadline: '2024-03-20', description: 'On-site NDT services, including ultrasonic and radiographic testing, for critical welded joints.' },
  { id: 'REQ-2024-010', title: 'On-site Calibration of Pressure Gauges and Sensors', category: 'Services', priority: 'Medium' as const, status: 'Draft' as const, budget: 35000, createdDate: '2024-01-25', submissionDeadline: '2024-02-20', description: 'NABL-accredited on-site calibration for over 200 pressure gauges and temperature sensors.' },
  { id: 'REQ-2024-011', title: 'Environmental Impact Assessment (EIA) for Plant Expansion', category: 'Expert', priority: 'High' as const, status: 'Active' as const, budget: 55000, createdDate: '2024-02-08', submissionDeadline: '2024-03-30', description: 'A certified consultant is required to conduct a full EIA study and report for the proposed plant expansion.' },
  { id: 'REQ-2024-012', title: 'Structural Engineering Consultation for Warehouse Mezzanine', category: 'Expert', priority: 'Medium' as const, status: 'Pending' as const, budget: 40000, createdDate: '2024-02-15', submissionDeadline: '2024-03-18', description: 'A structural engineer is needed to design and approve plans for a new mezzanine floor in Warehouse B.' },
  { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo (ODC)', category: 'Logistics', priority: 'High' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for a logistics partner with experience in handling oversized dimensional cargo.' },
  { id: 'REQ-2024-014', title: 'Cold Chain Logistics for Chemical Reagents', category: 'Logistics', priority: 'Medium' as const, status: 'Completed' as const, budget: 42000, createdDate: '2024-01-22', submissionDeadline: '2024-02-10', description: 'Temperature-controlled transportation for a shipment of sensitive chemical reagents.' },
  { id: 'REQ-2024-015', title: 'Warehousing and Distribution Services for Spare Parts', category: 'Logistics', priority: 'Low' as const, status: 'Draft' as const, budget: 120000, createdDate: '2024-02-18', submissionDeadline: '2024-04-15', description: 'Looking for a long-term partner for warehousing and nationwide distribution of critical spare parts.' }
];

const mockMatchedStakeholders = [
    { id: 'stakeholder-1', name: 'TechValve Solutions', type: 'Product Vendor', location: 'Hyderabad, Telangana', specializations: ['Industrial Valves', 'Pressure Systems', 'Quality Control'], rating: 4.8, totalProjects: 156, description: 'Leading manufacturer of industrial valves and pressure control systems' },
    { id: 'stakeholder-2', name: 'Pipeline Inspection Experts', type: 'Service Vendor', location: 'Mumbai, Maharashtra', specializations: ['Pipeline Inspection', 'NDT Testing', 'Safety Compliance'], rating: 4.9, totalProjects: 89, description: 'Specialized pipeline inspection and non-destructive testing services' },
    { id: 'stakeholder-3', name: 'Dr. Rajesh Kumar', type: 'Professional Expert', location: 'Bangalore, Karnataka', specializations: ['Chemical Engineering', 'Process Optimization', 'ISO Compliance'], rating: 4.7, totalProjects: 67, description: 'Senior Chemical Engineer with 15+ years in industrial process optimization' },
    { id: 'stakeholder-4', name: 'SwiftMove Logistics', type: 'Logistics Vendor', location: 'Chennai, Tamil Nadu', specializations: ['Heavy Equipment Transport', 'Industrial Logistics', 'Warehousing'], rating: 4.6, totalProjects: 234, description: 'Comprehensive logistics solutions for industrial equipment and materials' },
    { id: 'stakeholder-5', name: 'Automation Controls Inc.', type: 'Product Vendor', location: 'Pune, Maharashtra', specializations: ['PLC Systems', 'SCADA Integration', 'Robotic Arms'], rating: 4.9, totalProjects: 210, description: 'Providers of advanced industrial automation and control systems.' },
    { id: 'stakeholder-6', name: 'Precision Bearings Co.', type: 'Product Vendor', location: 'Coimbatore, Tamil Nadu', specializations: ['Ball Bearings', 'Roller Bearings', 'Custom Housings'], rating: 4.7, totalProjects: 305, description: 'High-precision bearing manufacturing for heavy machinery and automotive sectors.' },
    { id: 'stakeholder-7', name: 'SecureWear Safety Gear', type: 'Product Vendor', location: 'Ahmedabad, Gujarat', specializations: ['Personal Protective Equipment (PPE)', 'Fire Safety', 'Gas Detection'], rating: 4.8, totalProjects: 180, description: 'Certified industrial safety equipment and protective gear supplier.' },
    { id: 'stakeholder-8', name: 'Caliber Calibration Labs', type: 'Service Vendor', location: 'Gurugram, Haryana', specializations: ['Instrument Calibration', 'Measurement Audits', 'NABL Certification'], rating: 4.8, totalProjects: 112, description: 'NABL accredited calibration services for industrial and laboratory instruments.' },
    { id: 'stakeholder-9', name: 'HeavyWeld Fabricators', type: 'Service Vendor', location: 'Jamshedpur, Jharkhand', specializations: ['Structural Steel Fabrication', 'On-site Welding', 'Metal Finishing'], rating: 4.7, totalProjects: 95, description: 'Expert fabrication and welding services for industrial infrastructure projects.' },
    { id: 'stakeholder-10', name: 'Proactive Maintenance Group', type: 'Service Vendor', location: 'Vadodara, Gujarat', specializations: ['Predictive Maintenance', 'Shutdown Support', 'Equipment Overhaul'], rating: 4.9, totalProjects: 130, description: 'Offering plant maintenance and operational support to maximize uptime.' },
    { id: 'stakeholder-11', name: 'Anita Desai, P.Eng', type: 'Professional Expert', location: 'Pune, Maharashtra', specializations: ['Mechanical Engineering', 'CAD/CAM Design', 'Product Development'], rating: 4.9, totalProjects: 45, description: 'Mechanical design consultant specializing in new product development for manufacturing.' },
    { id: 'stakeholder-12', name: 'Vikram Singh - Project Mgmt.', type: 'Professional Expert', location: 'New Delhi, Delhi', specializations: ['PMP Certification', 'Agile Project Management', 'Risk Assessment'], rating: 4.8, totalProjects: 82, description: 'Certified Project Management Professional for large-scale industrial projects.' },
    { id: 'stakeholder-13', name: 'Dr. Meena Iyer', type: 'Professional Expert', location: 'Hyderabad, Telangana', specializations: ['Environmental Science', 'Waste Management', 'Regulatory Compliance'], rating: 4.9, totalProjects: 58, description: 'Environmental consultant for industrial waste management and sustainability reporting.' },
    { id: 'stakeholder-14', name: 'ColdChain Express', type: 'Logistics Vendor', location: 'Visakhapatnam, Andhra Pradesh', specializations: ['Refrigerated Transport', 'Pharmaceutical Logistics', 'Cold Storage'], rating: 4.8, totalProjects: 175, description: 'Specialized cold chain logistics for temperature-sensitive industrial goods.' },
    { id: 'stakeholder-15', name: 'HazMat Secure Transit', type: 'Logistics Vendor', location: 'Dahej, Gujarat', specializations: ['Hazardous Materials', 'Chemical Transport', 'Safety Compliance'], rating: 4.9, totalProjects: 99, description: 'Certified and secure transportation for hazardous and chemical materials.' },
    { id: 'stakeholder-16', name: 'PortLink Freight Forwarding', type: 'Logistics Vendor', location: 'Kolkata, West Bengal', specializations: ['Customs Clearance', 'Ocean Freight', 'Air Freight'], rating: 4.7, totalProjects: 310, description: 'International freight forwarding and customs clearance services for industrial imports/exports.' }
];

// Helper to map requirement category to stakeholder type for filtering
const categoryToStakeholderType: { [key: string]: string } = {
  'Product': 'Product Vendor',
  'Services': 'Service Vendor',
  'Logistics': 'Logistics Vendor',
  'Expert': 'Professional Expert'
};

const IndustryProjectWorkflow = () => {
    const navigate = useNavigate();
    const { id: projectId } = useParams();
    const [searchParams] = useSearchParams();
    const { showSuccess, showError } = useNotifications();
    const categoryFilter = searchParams.get('category');

    const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
    const [selectedStakeholder, setSelectedStakeholder] = useState<any>(null);
    const [sentRFQs, setSentRFQs] = useState<Set<string>>(new Set());
    const [rfqStatuses, setRfqStatuses] = useState<any[]>([]);
    const [quotesReceived, setQuotesReceived] = useState(false);
    const [aiEvaluations, setAiEvaluations] = useState<Map<string, any>>(new Map());
    const [projectWorkflow, setProjectWorkflow] = useState<ProjectWorkflow | null>(null);

    const { currentRequirement } = useMemo(() => {
        const allRequirements = JSON.parse(localStorage.getItem('requirements-list') || 'null') || initialRequirements;
        const current = allRequirements.find((req: any) => req.id === projectId);
        return { currentRequirement: current };
    }, [projectId]);

    // This derived state will filter stakeholders based on the current requirement's category
    const matchedStakeholders = useMemo(() => {
        if (!currentRequirement) return [];
        const stakeholderType = categoryToStakeholderType[currentRequirement.category];
        if (!stakeholderType) return [];
        return mockMatchedStakeholders.filter(s => s.type === stakeholderType);
    }, [currentRequirement]);

    useEffect(() => {
        if (currentRequirement) {
            setProjectWorkflow({
                id: currentRequirement.id,
                requirementId: currentRequirement.id,
                projectTitle: currentRequirement.title,
                totalProjectValue: currentRequirement.budget,
                workStatus: 'not_started',
                quotes: [],
                paymentMilestones: [
                    { id: 'm1', name: 'Advance Payment', percentage: 30, amount: currentRequirement.budget * 0.30, status: 'pending', description: 'Initial payment to commence work' },
                    { id: 'm2', name: 'Mid-project Payment', percentage: 40, amount: currentRequirement.budget * 0.40, status: 'pending', description: 'Payment upon 50% project completion' },
                    { id: 'm3', name: 'Completion Payment', percentage: 20, amount: currentRequirement.budget * 0.20, status: 'pending', description: 'Payment upon project completion' }
                ],
                retentionPayment: { amount: currentRequirement.budget * 0.10, percentage: 10, releaseDate: '2024-03-15', status: 'locked', delayPeriodDays: 30 },
                timeline: []
            });
        }
    }, [currentRequirement]);

    useEffect(() => {
        if (projectId === "new" && searchParams.get('vendorId')) {
            // Logic for handling new PO redirect remains the same...
        }
    }, [searchParams, projectId]);

    const generateAIEvaluation = (quote: VendorQuote) => {
        const priceScore = Math.max(1, 10 - (quote.quoteAmount - 140000) / 5000);
        const deliveryScore = Math.max(1, 10 - (quote.deliveryTimeWeeks - 6) * 0.5);
        const ratingScore = quote.vendorRating * 2;
        const specializationScore = 7 + Math.random() * 2;
        const performanceScore = 6 + Math.random() * 3;
        const overallScore = (priceScore * 0.3 + deliveryScore * 0.25 + ratingScore * 0.2 + specializationScore * 0.15 + performanceScore * 0.1);
        let recommendation = null; let reasoning = '';
        if (overallScore >= 8.5) { recommendation = 'top_pick'; reasoning = 'Excellent overall balance of price, delivery speed, and vendor reliability.'; }
        else if (priceScore >= 8) { recommendation = 'best_value'; reasoning = 'Offers competitive pricing while maintaining good quality standards.'; }
        else if (deliveryScore >= 9) { recommendation = 'fastest_delivery'; reasoning = 'Fastest delivery option available.'; }
        else if (ratingScore >= 9) { recommendation = 'highest_rated'; reasoning = 'Top-rated vendor with excellent track record.'; }
        return { overallScore: Math.round(overallScore * 10) / 10, priceScore: Math.round(priceScore * 10) / 10, deliveryScore: Math.round(deliveryScore * 10) / 10, ratingScore: Math.round(ratingScore * 10) / 10, specializationScore: Math.round(specializationScore * 10) / 10, performanceScore: Math.round(performanceScore * 10) / 10, recommendation, reasoning, riskLevel: overallScore >= 8 ? 'low' : 'medium' };
    };

    const simulateQuoteReceiving = () => {
        if (!projectWorkflow) return;
        setTimeout(() => {
            const mockQuotes = [{ id: 'q1', vendorId: 'stakeholder-1', vendorName: 'TechValve Solutions', vendorRating: 4.8, quoteAmount: 145000, deliveryTimeWeeks: 6, proposalSummary: 'Complete industrial valve system with premium quality components and 2-year warranty', submittedDate: new Date().toISOString().split('T')[0], status: 'pending' as const, documents: ['proposal.pdf', 'technical-specs.pdf'] }, { id: 'q2', vendorId: 'stakeholder-5', vendorName: 'Automation Controls Inc.', vendorRating: 4.9, quoteAmount: 155000, deliveryTimeWeeks: 8, proposalSummary: 'Comprehensive PLC systems with full integration support', submittedDate: new Date().toISOString().split('T')[0], status: 'pending' as const, documents: ['proposal.pdf'] }];
            const evaluations = new Map();
            mockQuotes.forEach(quote => { evaluations.set(quote.id, generateAIEvaluation(quote)); });
            setProjectWorkflow(prev => prev ? { ...prev, quotes: mockQuotes, timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'quote_submitted', title: 'Quotes Received & AI Analyzed', description: `${mockQuotes.length} vendor quotes received and analyzed by AI`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
            setAiEvaluations(evaluations);
            setQuotesReceived(true);
            showSuccess(`${mockQuotes.length} quotes received and analyzed by AI!`);
        }, 3000);
    };

    const handleAcceptQuote = (quoteId: string) => {
        if (!projectWorkflow) return;
        const acceptedQuote = projectWorkflow.quotes.find(q => q.id === quoteId);
        if (acceptedQuote) {
            setProjectWorkflow(prev => prev ? { ...prev, acceptedQuote, quotes: prev.quotes.map(q => q.id === quoteId ? { ...q, status: 'accepted' } : { ...q, status: 'rejected' }), timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'quote_accepted', title: 'Quote Accepted', description: `Quote from ${acceptedQuote.vendorName} accepted`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
            showSuccess(`Quote from ${acceptedQuote.vendorName} accepted successfully!`);
        }
    };

    const handleGeneratePO = () => {
        if (!projectWorkflow || !projectWorkflow.acceptedQuote) return;
        const { acceptedQuote } = projectWorkflow;
        const queryParams = new URLSearchParams({ vendorId: acceptedQuote.vendorId, vendorName: acceptedQuote.vendorName, amount: acceptedQuote.quoteAmount.toString(), projectTitle: projectWorkflow.projectTitle, requirementId: projectWorkflow.requirementId });
        navigate(`/create-purchase-order?${queryParams.toString()}`);
    };

    const handleUploadPO = (file: File, poNumber: string) => {
        if (!projectWorkflow || !projectWorkflow.acceptedQuote) return;
        const { acceptedQuote } = projectWorkflow;
        setProjectWorkflow(prev => prev ? { ...prev, purchaseOrder: { id: `po${Date.now()}`, poNumber, vendorId: acceptedQuote.vendorId, amount: acceptedQuote.quoteAmount, status: 'sent', createdDate: new Date().toISOString(), terms: 'Manual upload - terms as per uploaded document', poType: 'uploaded', uploadedDocument: file.name, iso9001Compliance: true }, timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'po_generated', title: 'Manual Purchase Order Uploaded', description: `PO ${poNumber} uploaded and sent to vendor`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
        showSuccess(`Purchase Order ${poNumber} uploaded and sent to vendor successfully!`);
    };

    const handleReleasePayment = (milestoneId: string) => {
        if (!projectWorkflow) return;
        setProjectWorkflow(prev => prev ? { ...prev, paymentMilestones: prev.paymentMilestones.map(m => m.id === milestoneId ? { ...m, status: 'released', releasedDate: new Date().toISOString() } : m), timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'payment_released', title: 'Payment Released', description: `Milestone payment released`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
        showSuccess('Payment released successfully!');
    };

    const handleReleaseRetention = () => {
        if (!projectWorkflow) return;
        setProjectWorkflow(prev => prev ? { ...prev, retentionPayment: { ...prev.retentionPayment, status: 'released' } } : null);
        showSuccess('Retention payment released successfully!');
    };
    
    const handleDownloadCertificate = () => { showSuccess('Completion certificate downloaded!'); };
    const handleBackToDashboard = () => { navigate('/industry-requirements'); };
    const getStakeholderTypeColor = (type: string) => { switch (type) { case 'Product Vendor': return 'bg-purple-100 text-purple-800'; case 'Service Vendor': return 'bg-blue-100 text-blue-800'; case 'Logistics Vendor': return 'bg-orange-100 text-orange-800'; case 'Professional Expert': return 'bg-green-100 text-green-800'; default: return 'bg-gray-100 text-gray-800'; } };
    const renderStarRating = (rating: number) => ( <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => ( <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} /> ))}<span className="text-sm text-gray-600 ml-1">({rating})</span></div> );
    const handleSendRFQ = (stakeholder: any) => { if (!projectWorkflow) return; setSelectedStakeholder(stakeholder); setIsRFQModalOpen(true); };
    
    const handleRFQSent = (stakeholderId: string) => {
        setSentRFQs(prev => new Set(prev).add(stakeholderId));
        const stakeholder = mockMatchedStakeholders.find(s => s.id === stakeholderId);
        if (stakeholder) {
            setRfqStatuses(prev => [...prev, { stakeholderName: stakeholder.name, stakeholderType: stakeholder.type, rfqSentDate: new Date().toLocaleDateString(), quoteStatus: 'sent', expectedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() }]);
            if (!quotesReceived && rfqStatuses.length === 0) { showSuccess('RFQ sent! Quotes expected in 2-3 days...'); simulateQuoteReceiving(); } else { showSuccess('RFQ Sent!'); }
        }
    };

    const handleCheckForQuotes = () => { simulateQuoteReceiving(); };

    if (!projectWorkflow || !currentRequirement) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <IndustryHeader />
                <main className="flex-1 flex items-center justify-center container max-w-7xl mx-auto px-4 py-8 pt-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Requirement Not Found</h1>
                        <p className="text-gray-600 mb-6">The requirement you are looking for does not exist or may have been deleted.</p>
                        <Button onClick={() => navigate('/industry-requirements')}><ArrowLeft className="mr-2 h-4 w-4" />Back to All Requirements</Button>
                    </div>
                </main>
            </div>
        );
    }
    
    const isQuoteAccepted = projectWorkflow.acceptedQuote !== undefined;
    const isPOGenerated = projectWorkflow.purchaseOrder !== undefined;
    const isWorkCompleted = projectWorkflow.workStatus === 'completed' || projectWorkflow.workStatus === 'approved';
    const hasReceivedQuotes = projectWorkflow.quotes.length > 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <IndustryHeader />
            <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
                <div className="mb-8">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={handleBackToDashboard} className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/industry-requirements" className="cursor-pointer text-blue-600 hover:text-blue-700">Requirements</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbPage className="text-gray-700">Project Workflow</BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectWorkflow.projectTitle}</h1>
                            <p className="text-gray-600 text-lg">
                                Requirement ID: <span className="font-medium text-gray-800">{projectWorkflow.requirementId}</span> | 
                                Total Value: <span className="font-semibold text-blue-600">₹{projectWorkflow.totalProjectValue.toLocaleString('en-IN')}</span>
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => navigate('/industry-requirements')} className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                            <ArrowLeft className="h-4 w-4" /> Back to Requirements
                        </Button>
                    </div>
                </div>

                {/* Enhanced Workflow Progress Indicator */}
                <div className="mb-8 p-6 rounded-xl shadow-sm border bg-white">
                    <h2 className="font-semibold mb-6 text-gray-900 text-xl">Workflow Progress</h2>
                    <div className="flex items-start w-full">
                        {[
                            { name: 'Requirements Published', icon: FileText, status: 'completed' },
                            { name: 'AI Matching & RFQ', icon: Brain, status: sentRFQs.size > 0 ? 'completed' : 'active' },
                            { name: 'Quote Review', icon: MessageSquare, status: hasReceivedQuotes ? 'completed' : (sentRFQs.size > 0 ? 'active' : 'upcoming') },
                            { name: 'Purchase Order', icon: ShoppingCart, status: isPOGenerated ? 'completed' : (isQuoteAccepted ? 'active' : 'upcoming') },
                            { name: 'Work & Payments', icon: DollarSign, status: isWorkCompleted ? 'completed' : (isPOGenerated ? 'active' : 'upcoming') },
                        ].map((step, index, arr) => {
                            const isCompleted = step.status === 'completed';
                            const isActive = step.status === 'active';

                            const circleClasses = isCompleted
                                ? 'bg-green-500 text-white'
                                : isActive
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500';

                            const textClasses = isCompleted
                                ? 'text-green-700'
                                : isActive
                                ? 'text-blue-700'
                                : 'text-gray-500';
                            
                            const connectorClasses = isCompleted ? 'bg-green-500' : 'bg-gray-200';
                            
                            const StepIcon = step.icon;

                            return (
                                <React.Fragment key={step.name}>
                                    <div className="flex flex-col items-center text-center w-32">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${circleClasses} transition-colors duration-300`}>
                                            <StepIcon className="w-6 h-6" />
                                        </div>
                                        <p className={`mt-2 text-xs font-medium ${textClasses} transition-colors duration-300`}>
                                            {step.name}
                                        </p>
                                    </div>
                                    {index < arr.length - 1 && (
                                        <div className={`flex-1 h-1 mt-6 mx-2 rounded ${connectorClasses} transition-colors duration-300`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    {isTopPickAvailable && (
                        <div className="p-6 rounded-xl shadow-sm border bg-white">
                            <div className="mb-6">
                                <h2 className="font-semibold text-gray-900 text-xl mb-2">Top Matched Stakeholders (AI-Shortlisted)</h2>
                                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    These stakeholders were shortlisted by our AI based on your requirement's category: <strong>{currentRequirement.category}</strong>.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {matchedStakeholders.map((stakeholder) => (
                                    <Card
  key={stakeholder.id}
  className="hover:shadow-md transition-shadow flex flex-col h-[380px]"
>
  {/* FIXED HEIGHT HEADER */}
  <CardHeader className="pb-3 h-[90px] flex flex-col justify-between">
  <div className="flex items-start justify-between gap-2 min-w-0">
    <CardTitle className="text-lg font-medium text-gray-900 truncate min-w-0">
      {stakeholder.name}
    </CardTitle>
    <Badge className="flex-shrink-0 bg-green-100 text-green-800 text-xs">
      AI Matched
    </Badge>
  </div>
  <Badge className={getStakeholderTypeColor(stakeholder.type)}>
    {stakeholder.type}
  </Badge>
</CardHeader>


  {/* CONTENT */}
  <CardContent className="flex flex-col justify-between flex-1">
    <div className="space-y-3 flex-1 overflow-hidden">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        <span>{stakeholder.location}</span>
      </div>
      <div className="flex items-center justify-between">
        {renderStarRating(stakeholder.rating)}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Briefcase className="h-3 w-3" />
          <span>{stakeholder.totalProjects}</span>
        </div>
      </div>
      <div className="space-y-2 overflow-hidden">
        <p className="font-medium text-sm text-gray-700">Specializations:</p>
        <div className="flex flex-wrap gap-1 max-h-[48px] overflow-y-auto">
          {stakeholder.specializations.map((spec, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>
      </div>
    </div>

    {/* BUTTONS ALWAYS AT SAME HEIGHT */}
    <div className="pt-4 space-y-2">
      <Button size="sm" variant="outline" className="w-full" disabled>
        View Profile
      </Button>
      {sentRFQs.has(stakeholder.id) ? (
        <Button size="sm" variant="outline" className="w-full" disabled>
          RFQ Sent
        </Button>
      ) : (
        <Button
          size="sm"
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => handleSendRFQ(stakeholder)}
        >
          Send RFQ
        </Button>
      )}
    </div>
  </CardContent>
</Card>


                                ))}
                            </div>
                        </div>
                    )}
                    
                    {rfqStatuses.length > 0 && (
                        <div className="mb-8">
                            <QuoteStatusTracker rfqStatuses={rfqStatuses} totalRFQsSent={sentRFQs.size} quotesReceived={projectWorkflow.quotes.length} />
                        </div>
                    )}

                    {sentRFQs.size > 0 && !quotesReceived && (
                        <div className="p-6 rounded-xl shadow-sm border bg-white text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Waiting for Vendor Responses</h3>
                            <p className="text-gray-600 mb-4">Quotes are expected within 2-3 business days</p>
                            <Button onClick={handleCheckForQuotes} className="bg-blue-600 hover:bg-blue-700">
                                <RefreshCw className="h-4 w-4 mr-2" />Check for New Quotes
                            </Button>
                        </div>
                    )}

                    {hasReceivedQuotes && !isQuoteAccepted && (
                        <div className="mb-8">
                            <AIEvaluationPanel />
                        </div>
                    )}

                    {hasReceivedQuotes && !isQuoteAccepted && (
                        <div className="mb-8">
                            <div className="mb-6">
                                <h2 className="font-semibold text-gray-900 text-xl mb-2">AI-Analyzed Quote Comparison</h2>
                                <p className="text-sm text-gray-600">Our AI has analyzed {projectWorkflow.quotes.length} quotes. Review the recommendations and choose the best fit.</p>
                            </div>
                            <QuoteReviewTable quotes={projectWorkflow.quotes} onAcceptQuote={handleAcceptQuote} aiEvaluations={aiEvaluations} />
                            <div className="mt-4 text-center">
                                <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-700 border-gray-300" disabled>Switch to Card View (Coming Soon)</Button>
                            </div>
                        </div>
                    )}

                    {isQuoteAccepted && !isPOGenerated && projectWorkflow.acceptedQuote && (
                        <POTriggerCard acceptedQuote={projectWorkflow.acceptedQuote} onGeneratePO={handleGeneratePO} onUploadPO={handleUploadPO} />
                    )}

                    {isPOGenerated && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <WorkTimeline timeline={projectWorkflow.timeline} workStatus={projectWorkflow.workStatus} />
                            <PaymentMilestoneTracker milestones={projectWorkflow.paymentMilestones} onReleasePayment={handleReleasePayment} totalProjectValue={projectWorkflow.totalProjectValue} />
                        </div>
                    )}

                    {isWorkCompleted && (
                        <RetentionPaymentCard retentionPayment={projectWorkflow.retentionPayment} onReleaseRetention={handleReleaseRetention} onDownloadCertificate={handleDownloadCertificate} projectCompleted={isWorkCompleted} />
                    )}
                </div>
            </main>

            {selectedStakeholder && (
                <SendRFQModal 
                    isOpen={isRFQModalOpen} 
                    onClose={() => setIsRFQModalOpen(false)} 
                    stakeholder={selectedStakeholder} 
                    requirementTitle={projectWorkflow.projectTitle} 
                    onSendRFQ={handleRFQSent} 
                />
            )}
        </div>
    );
};

export default IndustryProjectWorkflow;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
// import IndustryHeader from '@/components/industry/IndustryHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, FileText, CheckCircle, Clock, MapPin, Star, Users, Briefcase, RefreshCw, Brain, MessageSquare, ShoppingCart, DollarSign } from 'lucide-react';
// import { useNotifications } from '@/hooks/useNotifications';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
// import { isTopPickAvailable } from '@/components/industry/workflow/QuoteReviewTable';

// // Import workflow components
// import { QuoteReviewTable } from '@/components/industry/workflow/QuoteReviewTable';
// import { POTriggerCard } from '@/components/industry/workflow/POTriggerCard';
// import { WorkTimeline } from '@/components/industry/workflow/WorkTimeline';
// import { PaymentMilestoneTracker } from '@/components/industry/workflow/PaymentMilestoneTracker';
// import { RetentionPaymentCard } from '@/components/industry/workflow/RetentionPaymentCard';
// import { SendRFQModal } from '@/components/industry/SendRFQModal';
// import { AIEvaluationPanel } from '@/components/industry/workflow/AIEvaluationPanel';
// import { QuoteComparisonCard } from '@/components/industry/workflow/QuoteComparisonCard';
// import { QuoteStatusTracker } from '@/components/industry/workflow/QuoteStatusTracker';

// // Import types
// import { ProjectWorkflow, VendorQuote, PaymentMilestone, WorkflowEvent, RetentionPayment } from '@/types/workflow';

// // --- FULL MOCK DATA DEFINED LOCALLY ---
// const initialRequirements = [
//   { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement for the New Hydro-Processing Plant Unit #7', category: 'Product', priority: 'High' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves and pressure control systems for the new hydro-processing unit.' },
//   { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'Medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection and maintenance services for the northern sector pipeline.' },
//   { id: 'REQ-2024-003', title: 'Safety Compliance Audit for All On-site and Off-site Operations', category: 'Expert', priority: 'High' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit and certification in accordance with ISO 45001 standards.' },
//   { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'Low' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy industrial equipment from the port to the main plant.' },
//   { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets and Seals', category: 'Product', priority: 'Medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for high-temperature resistant gaskets for the furnace assembly line.' },
//   { id: 'REQ-2024-006', title: 'Procurement of PLC Control Panels for Assembly Line Upgrade', category: 'Product', priority: 'High' as const, status: 'Pending' as const, budget: 220000, createdDate: '2024-02-05', submissionDeadline: '2024-04-01', description: 'Supply and delivery of 15 customized PLC control panels as per technical specification document #PLC-SPEC-08.' },
//   { id: 'REQ-2024-007', title: 'Personal Protective Equipment (PPE) Annual Stock Replenishment', category: 'Product', priority: 'Low' as const, status: 'Completed' as const, budget: 18000, createdDate: '2024-01-05', submissionDeadline: '2024-01-25', description: 'Annual replenishment of safety helmets, gloves, and protective eyewear for all plant personnel.' },
//   { id: 'REQ-2024-008', title: 'Annual Maintenance Contract for HVAC Systems', category: 'Services', priority: 'Medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-02-10', submissionDeadline: '2024-03-15', description: 'A comprehensive annual maintenance contract (AMC) for all industrial HVAC units across the facility.' },
//   { id: 'REQ-2024-009', title: 'Non-Destructive Testing (NDT) for Welded Joints', category: 'Services', priority: 'High' as const, status: 'Pending' as const, budget: 95000, createdDate: '2024-02-12', submissionDeadline: '2024-03-20', description: 'On-site NDT services, including ultrasonic and radiographic testing, for critical welded joints.' },
//   { id: 'REQ-2024-010', title: 'On-site Calibration of Pressure Gauges and Sensors', category: 'Services', priority: 'Medium' as const, status: 'Draft' as const, budget: 35000, createdDate: '2024-01-25', submissionDeadline: '2024-02-20', description: 'NABL-accredited on-site calibration for over 200 pressure gauges and temperature sensors.' },
//   { id: 'REQ-2024-011', title: 'Environmental Impact Assessment (EIA) for Plant Expansion', category: 'Expert', priority: 'High' as const, status: 'Active' as const, budget: 55000, createdDate: '2024-02-08', submissionDeadline: '2024-03-30', description: 'A certified consultant is required to conduct a full EIA study and report for the proposed plant expansion.' },
//   { id: 'REQ-2024-012', title: 'Structural Engineering Consultation for Warehouse Mezzanine', category: 'Expert', priority: 'Medium' as const, status: 'Pending' as const, budget: 40000, createdDate: '2024-02-15', submissionDeadline: '2024-03-18', description: 'A structural engineer is needed to design and approve plans for a new mezzanine floor in Warehouse B.' },
//   { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo (ODC)', category: 'Logistics', priority: 'High' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for a logistics partner with experience in handling oversized dimensional cargo.' },
//   { id: 'REQ-2024-014', title: 'Cold Chain Logistics for Chemical Reagents', category: 'Logistics', priority: 'Medium' as const, status: 'Completed' as const, budget: 42000, createdDate: '2024-01-22', submissionDeadline: '2024-02-10', description: 'Temperature-controlled transportation for a shipment of sensitive chemical reagents.' },
//   { id: 'REQ-2024-015', title: 'Warehousing and Distribution Services for Spare Parts', category: 'Logistics', priority: 'Low' as const, status: 'Draft' as const, budget: 120000, createdDate: '2024-02-18', submissionDeadline: '2024-04-15', description: 'Looking for a long-term partner for warehousing and nationwide distribution of critical spare parts.' }
// ];

// const mockMatchedStakeholders = [
//     { id: 'stakeholder-1', name: 'TechValve Solutions', type: 'Product Vendor', location: 'Hyderabad, Telangana', specializations: ['Industrial Valves', 'Pressure Systems', 'Quality Control'], rating: 4.8, totalProjects: 156, description: 'Leading manufacturer of industrial valves and pressure control systems' },
//     { id: 'stakeholder-2', name: 'Pipeline Inspection Experts', type: 'Service Vendor', location: 'Mumbai, Maharashtra', specializations: ['Pipeline Inspection', 'NDT Testing', 'Safety Compliance'], rating: 4.9, totalProjects: 89, description: 'Specialized pipeline inspection and non-destructive testing services' },
//     { id: 'stakeholder-3', name: 'Dr. Rajesh Kumar', type: 'Professional Expert', location: 'Bangalore, Karnataka', specializations: ['Chemical Engineering', 'Process Optimization', 'ISO Compliance'], rating: 4.7, totalProjects: 67, description: 'Senior Chemical Engineer with 15+ years in industrial process optimization' },
//     { id: 'stakeholder-4', name: 'SwiftMove Logistics', type: 'Logistics Vendor', location: 'Chennai, Tamil Nadu', specializations: ['Heavy Equipment Transport', 'Industrial Logistics', 'Warehousing'], rating: 4.6, totalProjects: 234, description: 'Comprehensive logistics solutions for industrial equipment and materials' },
//     { id: 'stakeholder-5', name: 'Automation Controls Inc.', type: 'Product Vendor', location: 'Pune, Maharashtra', specializations: ['PLC Systems', 'SCADA Integration', 'Robotic Arms'], rating: 4.9, totalProjects: 210, description: 'Providers of advanced industrial automation and control systems.' },
//     { id: 'stakeholder-6', name: 'Precision Bearings Co.', type: 'Product Vendor', location: 'Coimbatore, Tamil Nadu', specializations: ['Ball Bearings', 'Roller Bearings', 'Custom Housings'], rating: 4.7, totalProjects: 305, description: 'High-precision bearing manufacturing for heavy machinery and automotive sectors.' },
//     { id: 'stakeholder-7', name: 'SecureWear Safety Gear', type: 'Product Vendor', location: 'Ahmedabad, Gujarat', specializations: ['Personal Protective Equipment (PPE)', 'Fire Safety', 'Gas Detection'], rating: 4.8, totalProjects: 180, description: 'Certified industrial safety equipment and protective gear supplier.' },
//     { id: 'stakeholder-8', name: 'Caliber Calibration Labs', type: 'Service Vendor', location: 'Gurugram, Haryana', specializations: ['Instrument Calibration', 'Measurement Audits', 'NABL Certification'], rating: 4.8, totalProjects: 112, description: 'NABL accredited calibration services for industrial and laboratory instruments.' },
//     { id: 'stakeholder-9', name: 'HeavyWeld Fabricators', type: 'Service Vendor', location: 'Jamshedpur, Jharkhand', specializations: ['Structural Steel Fabrication', 'On-site Welding', 'Metal Finishing'], rating: 4.7, totalProjects: 95, description: 'Expert fabrication and welding services for industrial infrastructure projects.' },
//     { id: 'stakeholder-10', name: 'Proactive Maintenance Group', type: 'Service Vendor', location: 'Vadodara, Gujarat', specializations: ['Predictive Maintenance', 'Shutdown Support', 'Equipment Overhaul'], rating: 4.9, totalProjects: 130, description: 'Offering plant maintenance and operational support to maximize uptime.' },
//     { id: 'stakeholder-11', name: 'Anita Desai, P.Eng', type: 'Professional Expert', location: 'Pune, Maharashtra', specializations: ['Mechanical Engineering', 'CAD/CAM Design', 'Product Development'], rating: 4.9, totalProjects: 45, description: 'Mechanical design consultant specializing in new product development for manufacturing.' },
//     { id: 'stakeholder-12', name: 'Vikram Singh - Project Mgmt.', type: 'Professional Expert', location: 'New Delhi, Delhi', specializations: ['PMP Certification', 'Agile Project Management', 'Risk Assessment'], rating: 4.8, totalProjects: 82, description: 'Certified Project Management Professional for large-scale industrial projects.' },
//     { id: 'stakeholder-13', name: 'Dr. Meena Iyer', type: 'Professional Expert', location: 'Hyderabad, Telangana', specializations: ['Environmental Science', 'Waste Management', 'Regulatory Compliance'], rating: 4.9, totalProjects: 58, description: 'Environmental consultant for industrial waste management and sustainability reporting.' },
//     { id: 'stakeholder-14', name: 'ColdChain Express', type: 'Logistics Vendor', location: 'Visakhapatnam, Andhra Pradesh', specializations: ['Refrigerated Transport', 'Pharmaceutical Logistics', 'Cold Storage'], rating: 4.8, totalProjects: 175, description: 'Specialized cold chain logistics for temperature-sensitive industrial goods.' },
//     { id: 'stakeholder-15', name: 'HazMat Secure Transit', type: 'Logistics Vendor', location: 'Dahej, Gujarat', specializations: ['Hazardous Materials', 'Chemical Transport', 'Safety Compliance'], rating: 4.9, totalProjects: 99, description: 'Certified and secure transportation for hazardous and chemical materials.' },
//     { id: 'stakeholder-16', name: 'PortLink Freight Forwarding', type: 'Logistics Vendor', location: 'Kolkata, West Bengal', specializations: ['Customs Clearance', 'Ocean Freight', 'Air Freight'], rating: 4.7, totalProjects: 310, description: 'International freight forwarding and customs clearance services for industrial imports/exports.' }
// ];

// // Helper to map requirement category to stakeholder type for filtering
// const categoryToStakeholderType: { [key: string]: string } = {
//   'Product': 'Product Vendor',
//   'Services': 'Service Vendor',
//   'Logistics': 'Logistics Vendor',
//   'Expert': 'Professional Expert'
// };

// const IndustryProjectWorkflow = () => {
//     const navigate = useNavigate();
//     const { id: projectId } = useParams();
//     const [searchParams] = useSearchParams();
//     const { showSuccess, showError } = useNotifications();
//     const categoryFilter = searchParams.get('category');

//     const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
//     const [selectedStakeholder, setSelectedStakeholder] = useState<any>(null);
//     const [sentRFQs, setSentRFQs] = useState<Set<string>>(new Set());
//     const [rfqStatuses, setRfqStatuses] = useState<any[]>([]);
//     const [quotesReceived, setQuotesReceived] = useState(false);
//     const [aiEvaluations, setAiEvaluations] = useState<Map<string, any>>(new Map());
//     const [projectWorkflow, setProjectWorkflow] = useState<ProjectWorkflow | null>(null);

//     const { currentRequirement } = useMemo(() => {
//         const allRequirements = JSON.parse(localStorage.getItem('requirements-list') || 'null') || initialRequirements;
//         const current = allRequirements.find((req: any) => req.id === projectId);
//         return { currentRequirement: current };
//     }, [projectId]);

//     // This derived state will filter stakeholders based on the current requirement's category
//     const matchedStakeholders = useMemo(() => {
//         if (!currentRequirement) return [];
//         const stakeholderType = categoryToStakeholderType[currentRequirement.category];
//         if (!stakeholderType) return [];
//         return mockMatchedStakeholders.filter(s => s.type === stakeholderType);
//     }, [currentRequirement]);

//     useEffect(() => {
//         if (currentRequirement) {
//             setProjectWorkflow({
//                 id: currentRequirement.id,
//                 requirementId: currentRequirement.id,
//                 projectTitle: currentRequirement.title,
//                 totalProjectValue: currentRequirement.budget,
//                 workStatus: 'not_started',
//                 quotes: [],
//                 paymentMilestones: [
//                     { id: 'm1', name: 'Advance Payment', percentage: 30, amount: currentRequirement.budget * 0.30, status: 'pending', description: 'Initial payment to commence work' },
//                     { id: 'm2', name: 'Mid-project Payment', percentage: 40, amount: currentRequirement.budget * 0.40, status: 'pending', description: 'Payment upon 50% project completion' },
//                     { id: 'm3', name: 'Completion Payment', percentage: 20, amount: currentRequirement.budget * 0.20, status: 'pending', description: 'Payment upon project completion' }
//                 ],
//                 retentionPayment: { amount: currentRequirement.budget * 0.10, percentage: 10, releaseDate: '2024-03-15', status: 'locked', delayPeriodDays: 30 },
//                 timeline: []
//             });
//         }
//     }, [currentRequirement]);

//     useEffect(() => {
//         if (projectId === "new" && searchParams.get('vendorId')) {
//             // Logic for handling new PO redirect remains the same...
//         }
//     }, [searchParams, projectId]);

//     const generateAIEvaluation = (quote: VendorQuote) => {
//         const priceScore = Math.max(1, 10 - (quote.quoteAmount - 140000) / 5000);
//         const deliveryScore = Math.max(1, 10 - (quote.deliveryTimeWeeks - 6) * 0.5);
//         const ratingScore = quote.vendorRating * 2;
//         const specializationScore = 7 + Math.random() * 2;
//         const performanceScore = 6 + Math.random() * 3;
//         const overallScore = (priceScore * 0.3 + deliveryScore * 0.25 + ratingScore * 0.2 + specializationScore * 0.15 + performanceScore * 0.1);
//         let recommendation = null; let reasoning = '';
//         if (overallScore >= 8.5) { recommendation = 'top_pick'; reasoning = 'Excellent overall balance of price, delivery speed, and vendor reliability.'; }
//         else if (priceScore >= 8) { recommendation = 'best_value'; reasoning = 'Offers competitive pricing while maintaining good quality standards.'; }
//         else if (deliveryScore >= 9) { recommendation = 'fastest_delivery'; reasoning = 'Fastest delivery option available.'; }
//         else if (ratingScore >= 9) { recommendation = 'highest_rated'; reasoning = 'Top-rated vendor with excellent track record.'; }
//         return { overallScore: Math.round(overallScore * 10) / 10, priceScore: Math.round(priceScore * 10) / 10, deliveryScore: Math.round(deliveryScore * 10) / 10, ratingScore: Math.round(ratingScore * 10) / 10, specializationScore: Math.round(specializationScore * 10) / 10, performanceScore: Math.round(performanceScore * 10) / 10, recommendation, reasoning, riskLevel: overallScore >= 8 ? 'low' : 'medium' };
//     };

//     const simulateQuoteReceiving = () => {
//         if (!projectWorkflow) return;
//         setTimeout(() => {
//             const mockQuotes = [{ id: 'q1', vendorId: 'stakeholder-1', vendorName: 'TechValve Solutions', vendorRating: 4.8, quoteAmount: 145000, deliveryTimeWeeks: 6, proposalSummary: 'Complete industrial valve system with premium quality components and 2-year warranty', submittedDate: new Date().toISOString().split('T')[0], status: 'pending' as const, documents: ['proposal.pdf', 'technical-specs.pdf'] }, { id: 'q2', vendorId: 'stakeholder-5', vendorName: 'Automation Controls Inc.', vendorRating: 4.9, quoteAmount: 155000, deliveryTimeWeeks: 8, proposalSummary: 'Comprehensive PLC systems with full integration support', submittedDate: new Date().toISOString().split('T')[0], status: 'pending' as const, documents: ['proposal.pdf'] }];
//             const evaluations = new Map();
//             mockQuotes.forEach(quote => { evaluations.set(quote.id, generateAIEvaluation(quote)); });
//             setProjectWorkflow(prev => prev ? { ...prev, quotes: mockQuotes, timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'quote_submitted', title: 'Quotes Received & AI Analyzed', description: `${mockQuotes.length} vendor quotes received and analyzed by AI`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
//             setAiEvaluations(evaluations);
//             setQuotesReceived(true);
//             showSuccess(`${mockQuotes.length} quotes received and analyzed by AI!`);
//         }, 3000);
//     };

//     const handleAcceptQuote = (quoteId: string) => {
//         if (!projectWorkflow) return;
//         const acceptedQuote = projectWorkflow.quotes.find(q => q.id === quoteId);
//         if (acceptedQuote) {
//             setProjectWorkflow(prev => prev ? { ...prev, acceptedQuote, quotes: prev.quotes.map(q => q.id === quoteId ? { ...q, status: 'accepted' } : { ...q, status: 'rejected' }), timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'quote_accepted', title: 'Quote Accepted', description: `Quote from ${acceptedQuote.vendorName} accepted`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
//             showSuccess(`Quote from ${acceptedQuote.vendorName} accepted successfully!`);
//         }
//     };

//     const handleGeneratePO = () => {
//         if (!projectWorkflow || !projectWorkflow.acceptedQuote) return;
//         const { acceptedQuote } = projectWorkflow;
//         const queryParams = new URLSearchParams({ vendorId: acceptedQuote.vendorId, vendorName: acceptedQuote.vendorName, amount: acceptedQuote.quoteAmount.toString(), projectTitle: projectWorkflow.projectTitle, requirementId: projectWorkflow.requirementId });
//         navigate(`/create-purchase-order?${queryParams.toString()}`);
//     };

//     const handleUploadPO = (file: File, poNumber: string) => {
//         if (!projectWorkflow || !projectWorkflow.acceptedQuote) return;
//         const { acceptedQuote } = projectWorkflow;
//         setProjectWorkflow(prev => prev ? { ...prev, purchaseOrder: { id: `po${Date.now()}`, poNumber, vendorId: acceptedQuote.vendorId, amount: acceptedQuote.quoteAmount, status: 'sent', createdDate: new Date().toISOString(), terms: 'Manual upload - terms as per uploaded document', poType: 'uploaded', uploadedDocument: file.name, iso9001Compliance: true }, timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'po_generated', title: 'Manual Purchase Order Uploaded', description: `PO ${poNumber} uploaded and sent to vendor`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
//         showSuccess(`Purchase Order ${poNumber} uploaded and sent to vendor successfully!`);
//     };

//     const handleReleasePayment = (milestoneId: string) => {
//         if (!projectWorkflow) return;
//         setProjectWorkflow(prev => prev ? { ...prev, paymentMilestones: prev.paymentMilestones.map(m => m.id === milestoneId ? { ...m, status: 'released', releasedDate: new Date().toISOString() } : m), timeline: [...prev.timeline, { id: `t${Date.now()}`, type: 'payment_released', title: 'Payment Released', description: `Milestone payment released`, timestamp: new Date().toISOString(), status: 'completed' }] } : null);
//         showSuccess('Payment released successfully!');
//     };

//     const handleReleaseRetention = () => {
//         if (!projectWorkflow) return;
//         setProjectWorkflow(prev => prev ? { ...prev, retentionPayment: { ...prev.retentionPayment, status: 'released' } } : null);
//         showSuccess('Retention payment released successfully!');
//     };
    
//     const handleDownloadCertificate = () => { showSuccess('Completion certificate downloaded!'); };
//     const handleBackToDashboard = () => { navigate('/industry-requirements'); };
//     const getStakeholderTypeColor = (type: string) => { switch (type) { case 'Product Vendor': return 'bg-purple-100 text-purple-800'; case 'Service Vendor': return 'bg-blue-100 text-blue-800'; case 'Logistics Vendor': return 'bg-orange-100 text-orange-800'; case 'Professional Expert': return 'bg-green-100 text-green-800'; default: return 'bg-gray-100 text-gray-800'; } };
//     const renderStarRating = (rating: number) => ( <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => ( <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} /> ))}<span className="text-sm text-gray-600 ml-1">({rating})</span></div> );
//     const handleSendRFQ = (stakeholder: any) => { if (!projectWorkflow) return; setSelectedStakeholder(stakeholder); setIsRFQModalOpen(true); };
    
//     const handleRFQSent = (stakeholderId: string) => {
//         setSentRFQs(prev => new Set(prev).add(stakeholderId));
//         const stakeholder = mockMatchedStakeholders.find(s => s.id === stakeholderId);
//         if (stakeholder) {
//             setRfqStatuses(prev => [...prev, { stakeholderName: stakeholder.name, stakeholderType: stakeholder.type, rfqSentDate: new Date().toLocaleDateString(), quoteStatus: 'sent', expectedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() }]);
//             if (!quotesReceived && rfqStatuses.length === 0) { showSuccess('RFQ sent! Quotes expected in 2-3 days...'); simulateQuoteReceiving(); } else { showSuccess('RFQ Sent!'); }
//         }
//     };

//     const handleCheckForQuotes = () => { simulateQuoteReceiving(); };

//     if (!projectWorkflow || !currentRequirement) {
//         return (
//             <div className="min-h-screen flex flex-col bg-gray-50">
//                 <IndustryHeader />
//                 <main className="flex-1 flex items-center justify-center container max-w-7xl mx-auto px-4 py-8 pt-20">
//                     <div className="text-center">
//                         <h1 className="text-3xl font-bold text-red-600 mb-4">Requirement Not Found</h1>
//                         <p className="text-gray-600 mb-6">The requirement you are looking for does not exist or may have been deleted.</p>
//                         <Button onClick={() => navigate('/industry-requirements')}><ArrowLeft className="mr-2 h-4 w-4" />Back to All Requirements</Button>
//                     </div>
//                 </main>
//             </div>
//         );
//     }
    
//     const isQuoteAccepted = projectWorkflow.acceptedQuote !== undefined;
//     const isPOGenerated = projectWorkflow.purchaseOrder !== undefined;
//     const isWorkCompleted = projectWorkflow.workStatus === 'completed' || projectWorkflow.workStatus === 'approved';
//     const hasReceivedQuotes = projectWorkflow.quotes.length > 0;

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-50">
//             <IndustryHeader />
//             <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
//                 <div className="mb-8"><Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink onClick={handleBackToDashboard} className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/industry-requirements" className="cursor-pointer text-blue-600 hover:text-blue-700">Requirements</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Project Workflow</BreadcrumbPage></BreadcrumbList></Breadcrumb><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-gray-900 mb-2">{projectWorkflow.projectTitle}</h1><p className="text-gray-600 text-lg">Requirement ID: <span className="font-medium text-gray-800">{projectWorkflow.requirementId}</span> | Total Value: <span className="font-semibold text-blue-600">₹{projectWorkflow.totalProjectValue.toLocaleString('en-IN')}</span></p></div><Button variant="outline" onClick={() => navigate('/industry-requirements')} className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"><ArrowLeft className="h-4 w-4" /> Back to Requirements</Button></div></div>
//                 <div className="mb-8 p-6 rounded-xl shadow-sm border bg-white"><h2 className="font-semibold mb-6 text-gray-900 text-xl">Workflow Progress</h2><div className="flex items-center gap-6 overflow-x-auto"><div className="flex items-center gap-3 min-w-fit"><div className="w-4 h-4 rounded-full bg-green-500"></div><span className="font-medium text-green-600 flex items-center gap-1"><FileText className="h-4 w-4" />Requirements Published</span></div><div className="flex items-center gap-3 min-w-fit"><div className={`w-4 h-4 rounded-full ${sentRFQs.size > 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div><span className={`font-medium flex items-center gap-1 ${sentRFQs.size > 0 ? 'text-green-600' : 'text-blue-600'}`}><Brain className="h-4 w-4" />AI Matching & RFQ</span></div><div className="flex items-center gap-3 min-w-fit"><div className={`w-4 h-4 rounded-full ${hasReceivedQuotes ? 'bg-green-500' : sentRFQs.size > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div><span className={`font-medium flex items-center gap-1 ${hasReceivedQuotes ? 'text-green-600' : sentRFQs.size > 0 ? 'text-blue-600' : 'text-gray-500'}`}><MessageSquare className="h-4 w-4" />Quote Review</span></div><div className="flex items-center gap-3 min-w-fit"><div className={`w-4 h-4 rounded-full ${isPOGenerated ? 'bg-green-500' : isQuoteAccepted ? 'bg-blue-500' : 'bg-gray-300'}`}></div><span className={`font-medium flex items-center gap-1 ${isPOGenerated ? 'text-green-600' : isQuoteAccepted ? 'text-blue-600' : 'text-gray-500'}`}><ShoppingCart className="h-4 w-4" />Purchase Order</span></div><div className="flex items-center gap-3 min-w-fit"><div className={`w-4 h-4 rounded-full ${isWorkCompleted ? 'bg-green-500' : isPOGenerated ? 'bg-blue-500' : 'bg-gray-300'}`}></div><span className={`font-medium flex items-center gap-1 ${isWorkCompleted ? 'text-green-600' : isPOGenerated ? 'text-blue-600' : 'text-gray-500'}`}><DollarSign className="h-4 w-4" />Work & Payments</span></div></div></div>
//                 <div className="space-y-8">
// {isTopPickAvailable && (
//                     <div className="p-6 rounded-xl shadow-sm border bg-white">
//                     <div className="mb-6">
//                     <h2 className="font-semibold text-gray-900 text-xl mb-2">Top Matched Stakeholders (AI-Shortlisted)</h2>
//                     <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">These stakeholders were shortlisted by our AI based on your requirement's category: <strong>{currentRequirement.category}</strong>.</p>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{matchedStakeholders.map((stakeholder) => 
//                         (<Card key={stakeholder.id} className="hover:shadow-md transition-shadow">
//                             <CardHeader className="pb-3"><div className="flex items-start justify-between mb-2">
//                             <CardTitle className="text-lg font-medium text-gray-900">{stakeholder.name}</CardTitle>
//                             <Badge className="bg-green-100 text-green-800 text-xs">AI Matched</Badge></div>
//                             <Badge className={getStakeholderTypeColor(stakeholder.type)}>{stakeholder.type}</Badge>
//                             </CardHeader><CardContent className="space-y-3"><div className="flex items-center gap-2 text-sm text-gray-600">
//                             <MapPin className="h-4 w-4" /><span>{stakeholder.location}</span></div>
//                             <div className="flex items-center justify-between">{renderStarRating(stakeholder.rating)}
//                             <div className="flex items-center gap-1 text-sm text-gray-600"><Briefcase className="h-3 w-3" />
//                             <span>{stakeholder.totalProjects}</span></div></div><div className="space-y-2">
//                             <p className="font-medium text-sm text-gray-700">Specializations:</p>
//                             <div className="flex flex-wrap gap-1">{stakeholder.specializations.map((spec, index) =>
//                                  ( <Badge key={index} variant="outline" className="text-xs">{spec}</Badge>))}</div>
//                                  </div><div className="pt-3 space-y-2"><Button size="sm" variant="outline" className="w-full" disabled>View Profile</Button>
//                                  {sentRFQs.has(stakeholder.id) ? (<Button size="sm" variant="outline" className="w-full" disabled>RFQ Sent</Button>) : (<Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleSendRFQ(stakeholder)}>Send RFQ</Button>)}</div>
//                                  </CardContent></Card>))}</div></div> )}                    
//                                  {rfqStatuses.length > 0 && ( <div className="mb-8"><QuoteStatusTracker rfqStatuses={rfqStatuses} totalRFQsSent={sentRFQs.size} quotesReceived={projectWorkflow.quotes.length} /></div> )}
//                     {sentRFQs.size > 0 && !quotesReceived && ( <div className="p-6 rounded-xl shadow-sm border bg-white text-center"><h3 className="text-lg font-semibold text-gray-900 mb-2">Waiting for Vendor Responses</h3><p className="text-gray-600 mb-4">Quotes are expected within 2-3 business days</p><Button onClick={handleCheckForQuotes} className="bg-blue-600 hover:bg-blue-700"><RefreshCw className="h-4 w-4 mr-2" />Check for New Quotes</Button></div> )}
//                     {hasReceivedQuotes && !isQuoteAccepted && ( <div className="mb-8"><AIEvaluationPanel /></div> )}
//                     {hasReceivedQuotes && !isQuoteAccepted && ( <div className="mb-8"><div className="mb-6"><h2 className="font-semibold text-gray-900 text-xl mb-2">AI-Analyzed Quote Comparison</h2><p className="text-sm text-gray-600">Our AI has analyzed {projectWorkflow.quotes.length} quotes. Review the recommendations and choose the best fit.</p></div><QuoteReviewTable quotes={projectWorkflow.quotes} onAcceptQuote={handleAcceptQuote} aiEvaluations={aiEvaluations} /><div className="mt-4 text-center"><Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-700 border-gray-300" disabled>Switch to Card View (Coming Soon)</Button></div></div> )}
//                     {isQuoteAccepted && !isPOGenerated && projectWorkflow.acceptedQuote && ( <POTriggerCard acceptedQuote={projectWorkflow.acceptedQuote} onGeneratePO={handleGeneratePO} onUploadPO={handleUploadPO} /> )}
//                     {isPOGenerated && ( <div className="grid lg:grid-cols-2 gap-8"><WorkTimeline timeline={projectWorkflow.timeline} workStatus={projectWorkflow.workStatus} /><PaymentMilestoneTracker milestones={projectWorkflow.paymentMilestones} onReleasePayment={handleReleasePayment} totalProjectValue={projectWorkflow.totalProjectValue} /></div> )}
//                     {isWorkCompleted && ( <RetentionPaymentCard retentionPayment={projectWorkflow.retentionPayment} onReleaseRetention={handleReleaseRetention} onDownloadCertificate={handleDownloadCertificate} projectCompleted={isWorkCompleted} /> )}
//                 </div>
//             </main>
//             {selectedStakeholder && ( <SendRFQModal isOpen={isRFQModalOpen} onClose={() => setIsRFQModalOpen(false)} stakeholder={selectedStakeholder} requirementTitle={projectWorkflow.projectTitle} onSendRFQ={handleRFQSent} /> )}
//         </div>
//     );


// };

// export default IndustryProjectWorkflow;