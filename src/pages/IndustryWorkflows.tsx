
// import React, { useState } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import IndustryHeader from "@/components/industry/IndustryHeader";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { FileText, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, User, ShoppingCart, Brain, Users, MessageSquare } from "lucide-react";

// interface WorkflowItem {
//   id: string;
//   title: string;
//   type: "requirement" | "purchase_order" | "project";
//   status: "draft" | "active" | "review" | "completed" | "approved";
//   progress: number;
//   amount?: number;
//   deadline?: string;
//   assignee: string;
//   lastUpdated: string;
//   nextAction: string;
// }

// const mockWorkflows: WorkflowItem[] = [
//   {
//     id: "REQ-001",
//     title: "Industrial Valve Procurement",
//     type: "requirement",
//     status: "active",
//     progress: 75,
//     amount: 25000,
//     deadline: "2024-01-15",
//     assignee: "John Smith",
//     lastUpdated: "2 hours ago",
//     nextAction: "Vendor evaluation pending"
//   },
//   {
//     id: "PO-042",
//     title: "Safety Equipment Purchase Order",
//     type: "purchase_order", 
//     status: "approved",
//     progress: 100,
//     amount: 15000,
//     deadline: "2024-01-10",
//     assignee: "Sarah Johnson",
//     lastUpdated: "1 day ago",
//     nextAction: "Awaiting delivery"
//   },
//   {
//     id: "PROJ-123",
//     title: "Pipeline Inspection Service",
//     type: "project",
//     status: "active",
//     progress: 45,
//     amount: 35000,
//     deadline: "2024-02-01",
//     assignee: "Mike Wilson",
//     lastUpdated: "3 hours ago",
//     nextAction: "Milestone 2 in progress"
//   }
// ];

// const IndustryWorkflows = () => {
//   const [selectedTab, setSelectedTab] = useState("all");

//   const filteredWorkflows = mockWorkflows.filter(workflow => {
//     if (selectedTab === "all") return true;
//     return workflow.type === selectedTab;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active": return "bg-green-100 text-green-800";
//       case "review": return "bg-yellow-100 text-yellow-800";
//       case "completed": return "bg-blue-100 text-blue-800";
//       case "approved": return "bg-purple-100 text-purple-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "requirement": return <FileText className="h-4 w-4" />;
//       case "purchase_order": return <ShoppingCart className="h-4 w-4" />;
//       case "project": return <CheckCircle className="h-4 w-4" />;
//       default: return <FileText className="h-4 w-4" />;
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active": return <Clock className="h-4 w-4 text-green-600" />;
//       case "review": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
//       case "completed": 
//       case "approved": return <CheckCircle className="h-4 w-4 text-blue-600" />;
//       default: return <Clock className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Helmet>
//         <title>Workflow Management | Diligince.ai</title>
//       </Helmet>
      
//       <IndustryHeader />
      
//       <main className="flex-1 container mx-auto px-4 py-8 pt-20">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Management</h1>
//           <p className="text-gray-600">Track and manage all procurement workflows from requirements to completion</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Requirements</p>
//                   <p className="text-2xl font-bold text-gray-900">8</p>
//                 </div>
//                 <FileText className="h-8 w-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">AI Matching</p>
//                   <p className="text-2xl font-bold text-gray-900">5</p>
//                 </div>
//                 <Brain className="h-8 w-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">RFQ Sent</p>
//                   <p className="text-2xl font-bold text-gray-900">12</p>
//                 </div>
//                 <MessageSquare className="h-8 w-8 text-orange-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Quote Review</p>
//                   <p className="text-2xl font-bold text-gray-900">3</p>
//                 </div>
//                 <AlertCircle className="h-8 w-8 text-yellow-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Purchase Orders</p>
//                   <p className="text-2xl font-bold text-gray-900">7</p>
//                 </div>
//                 <ShoppingCart className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Work & Payments</p>
//                   <p className="text-2xl font-bold text-gray-900">$2.4M</p>
//                 </div>
//                 <DollarSign className="h-8 w-8 text-indigo-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
//           <TabsList>
//             <TabsTrigger value="all">All Workflows</TabsTrigger>
//             <TabsTrigger value="requirements">Requirements</TabsTrigger>
//             <TabsTrigger value="ai_matching">AI Matching</TabsTrigger>
//             <TabsTrigger value="rfq_sent">RFQ Sent</TabsTrigger>
//             <TabsTrigger value="quote_review">Quote Review</TabsTrigger>
//             <TabsTrigger value="purchase_orders">Purchase Orders</TabsTrigger>
//             <TabsTrigger value="work_payments">Work & Payments</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <div className="space-y-4">
//           {filteredWorkflows.map((workflow) => (
//             <Card key={workflow.id} className="hover:shadow-md transition-shadow">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start gap-4">
//                     <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
//                       {getTypeIcon(workflow.type)}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg text-gray-900">{workflow.title}</h3>
//                       <p className="text-sm text-gray-600 mb-2">ID: {workflow.id}</p>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <User className="h-4 w-4" />
//                           {workflow.assignee}
//                         </div>
//                         {workflow.deadline && (
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4" />
//                             Due: {new Date(workflow.deadline).toLocaleDateString()}
//                           </div>
//                         )}
//                         {workflow.amount && (
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="h-4 w-4" />
//                             ${workflow.amount.toLocaleString()}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {getStatusIcon(workflow.status)}
//                     <Badge className={getStatusColor(workflow.status)}>
//                       {workflow.status.replace('_', ' ').toUpperCase()}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="font-medium">Progress</span>
//                     <span>{workflow.progress}%</span>
//                   </div>
//                   <Progress value={workflow.progress} className="h-2" />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-600">
//                     <p>Next Action: <span className="font-medium">{workflow.nextAction}</span></p>
//                     <p>Last Updated: {workflow.lastUpdated}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" asChild>
//                       <Link to={`/industry-project-workflow/${workflow.id}`}>
//                         View Details
//                       </Link>
//                     </Button>
//                     {workflow.status === "completed" && workflow.type === "requirement" && (
//                       <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
//                         <Link to={`/create-purchase-order?requirementId=${workflow.id}`}>
//                           Create PO
//                         </Link>
//                       </Button>
//                     )}
//                     {workflow.type === "project" && workflow.progress === 100 && (
//                       <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
//                         <Link to={`/work-completion-payment/${workflow.id}`}>
//                           Process Payment
//                         </Link>
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default IndustryWorkflows;

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, User, ShoppingCart, Brain, MessageSquare, Users, Briefcase } from 'lucide-react';

// --- MOCK DATA (This is the fallback if localStorage is empty) ---
const initialRequirements = [
  { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement for the New Hydro-Processing Plant Unit #7', category: 'Product', priority: 'High' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves and pressure control systems for the new hydro-processing unit.' },
  { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'Medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection and maintenance services for the northern sector pipeline.' },
  { id: 'REQ-2024-003', title: 'Safety Compliance Audit for All On-site and Off-site Operations', category: 'Expert', priority: 'High' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit and certification in accordance with ISO 45001 standards.' },
  { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'Low' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy industrial equipment from the port to the main plant.' },
  { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets and Seals', category: 'Product', priority: 'Medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for high-temperature resistant gaskets for the furnace assembly line.' },
  { id: 'REQ-2024-008', title: 'Annual Maintenance Contract for HVAC Systems', category: 'Services', priority: 'Medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-02-10', submissionDeadline: '2024-03-15', description: 'A comprehensive annual maintenance contract (AMC) for all industrial HVAC units across the facility.' },
  { id: 'REQ-2024-011', title: 'Environmental Impact Assessment (EIA) for Plant Expansion', category: 'Expert', priority: 'High' as const, status: 'Active' as const, budget: 55000, createdDate: '2024-02-08', submissionDeadline: '2024-03-30', description: 'A certified consultant is required to conduct a full EIA study and report for the proposed plant expansion.' },
  { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo (ODC)', category: 'Logistics', priority: 'High' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for a logistics partner with experience in handling oversized dimensional cargo.' },
];

// --- Type Definitions to match the data ---
type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
type Requirement = typeof initialRequirements[0];

const IndustryWorkflows = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<Requirement[]>([]);
  const [selectedTab, setSelectedTab] = useState<RequirementStatus | "all">("all");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRequirements = localStorage.getItem('requirements-list');
    const data = savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
    setWorkflows(data);
  }, []);

  // Filter workflows based on the selected tab
  const filteredWorkflows = useMemo(() => {
    if (selectedTab === "all") return workflows;
    return workflows.filter(workflow => workflow.status === selectedTab);
  }, [workflows, selectedTab]);

  // Calculate counts for the summary cards
  const summaryCounts = useMemo(() => {
    return workflows.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
      return acc;
    }, {} as Record<RequirementStatus | 'all', number>);
  }, [workflows]);

  const getStatusBadgeClass = (status: RequirementStatus) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Draft": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Product": return <ShoppingCart className="h-6 w-6 text-blue-600" />;
      case "Services": return <Users className="h-6 w-6 text-green-600" />;
      case "Logistics": return <Briefcase className="h-6 w-6 text-orange-600" />;
      case "Expert": return <Brain className="h-6 w-6 text-purple-600" />;
      default: return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  // Corrected navigation function
  const handleViewDetails = (workflow: Requirement) => {
    const categoryQueryParam = encodeURIComponent(workflow.category);
    navigate(`/industry-project-workflow/${workflow.id}?category=${categoryQueryParam}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Management</h1>
          <p className="text-gray-600">Track and manage all procurement workflows from requirements to completion.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Active</p><p className="text-2xl font-bold text-gray-900">{summaryCounts.Active || 0}</p></div><Clock className="h-8 w-8 text-blue-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Pending</p><p className="text-2xl font-bold text-gray-900">{summaryCounts.Pending || 0}</p></div><AlertCircle className="h-8 w-8 text-yellow-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Completed</p><p className="text-2xl font-bold text-gray-900">{summaryCounts.Completed || 0}</p></div><CheckCircle className="h-8 w-8 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Drafts</p><p className="text-2xl font-bold text-gray-900">{summaryCounts.Draft || 0}</p></div><FileText className="h-8 w-8 text-red-600" /></div></CardContent></Card>
        </div>

        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Workflows ({summaryCounts.all || 0})</TabsTrigger>
            <TabsTrigger value="Active">Active ({summaryCounts.Active || 0})</TabsTrigger>
            <TabsTrigger value="Pending">Pending ({summaryCounts.Pending || 0})</TabsTrigger>
            <TabsTrigger value="Completed">Completed ({summaryCounts.Completed || 0})</TabsTrigger>
            <TabsTrigger value="Draft">Drafts ({summaryCounts.Draft || 0})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                      {getCategoryIcon(workflow.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{workflow.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">ID: {workflow.id}</p>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5"><FileText className="h-4 w-4" />{workflow.category}</div>
                        {workflow.submissionDeadline && <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Due: {formatDate(workflow.submissionDeadline)}</div>}
                        {workflow.budget && <div className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" />₹{workflow.budget.toLocaleString('en-IN')}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Badge className={getStatusBadgeClass(workflow.status)}>{workflow.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Last Updated: <span className="font-medium">{formatDate(workflow.createdDate)}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(workflow)}>
                        View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IndustryWorkflows;