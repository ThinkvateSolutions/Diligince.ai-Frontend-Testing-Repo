<<<<<<< HEAD
// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import  toast,{Toaster} from 'react-hot-toast';
// // import { toast } from "sonner";
// // import 'react-toastify/dist/ReactToastify.css';
// import IndustryHeader from '@/components/industry/IndustryHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Search, Filter, Eye, Edit, Trash } from 'lucide-react';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Input } from '@/components/ui/input';

// // --- MOCK DATA (Expanded & Updated) ---
// const initialRequirements = [
//   // Original Data (with priority updated)
//   {
//     id: 'REQ-2024-001',
//     title: 'Industrial Equipment Procurement for the New Hydro-Processing Plant Unit #7',
//     category: 'Product',
//     priority: 'Critical' as const, // <-- Changed from 'High' to 'Critical'
//     status: 'Active' as const,
//     budget: 150000,
//     createdDate: '2024-01-15',
//     submissionDeadline: '2024-03-01',
//     description: 'Procurement of industrial valves and pressure control systems for the new hydro-processing unit.',
//   },
//   {
//     id: 'REQ-2024-002',
//     title: 'Pipeline Inspection Services',
//     category: 'Services',
//     priority: 'Medium' as const,
//     status: 'Draft' as const,
//     budget: 75000,
//     createdDate: '2024-01-20',
//     submissionDeadline: '2024-02-28',
//     description: 'Comprehensive pipeline inspection and maintenance services for the northern sector pipeline.',
//   },
//   {
//     id: 'REQ-2024-003',
//     title: 'Safety Compliance Audit for All On-site and Off-site Operations',
//     category: 'Expert',
//     priority: 'High' as const, // <-- Kept as 'High' to show orange
//     status: 'Completed' as const,
//     budget: 25000,
//     createdDate: '2024-01-10',
//     submissionDeadline: '2024-01-30',
//     description: 'Full safety compliance audit and certification in accordance with ISO 45001 standards.',
//   },
//   {
//     id: 'REQ-2024-004',
//     title: 'Equipment Transportation',
//     category: 'Logistics',
//     priority: 'Low' as const,
//     status: 'Pending' as const,
//     budget: 30000,
//     createdDate: '2024-01-18',
//     submissionDeadline: '2024-02-15',
//     description: 'Transportation of heavy industrial equipment from the port to the main plant.',
//   },
//   // New Data...
//   {
//     id: 'REQ-2024-005',
//     title: 'Supply of High-Temperature Gaskets and Seals',
//     category: 'Product',
//     priority: 'Medium' as const,
//     status: 'Active' as const,
//     budget: 45000,
//     createdDate: '2024-02-01',
//     submissionDeadline: '2024-03-10',
//     description: 'Urgent need for high-temperature resistant gaskets for the furnace assembly line.',
//   },
//   {
//     id: 'REQ-2024-009',
//     title: 'Non-Destructive Testing (NDT) for Welded Joints',
//     category: 'Services',
//     priority: 'High' as const,
//     status: 'Pending' as const,
//     budget: 95000,
//     createdDate: '2024-02-12',
//     submissionDeadline: '2024-03-20',
//     description: 'On-site NDT services, including ultrasonic and radiographic testing, for critical welded joints.',
//   },
//   {
//     id: 'REQ-2024-013',
//     title: 'Transportation of Oversized Cargo (ODC)',
//     category: 'Logistics',
//     priority: 'High' as const,
//     status: 'Active' as const,
//     budget: 85000,
//     createdDate: '2024-02-11',
//     submissionDeadline: '2024-03-05',
//     description: 'Urgent requirement for a logistics partner with experience in handling oversized dimensional cargo.',
//   },
// ];

// type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
// type RequirementPriority = 'Critical' | 'High' | 'Medium' | 'Low' ;
// type Requirement = typeof initialRequirements[0];
// type RequirementKey = keyof Requirement;

// const IndustryRequirements = () => {
//   const navigate = useNavigate();

//   const [requirements, setRequirements] = useState<Requirement[]>(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: RequirementKey }>({ key: 'title' });

//   useEffect(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     if (!savedRequirements) {
//       localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('requirements-list', JSON.stringify(requirements));
//   }, [requirements]);

//   const sortedRequirements = useMemo(() => {
//     let sortableItems = [...requirements];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         let comparison = 0;
//         if (typeof aValue === 'number' && typeof bValue === 'number') {
//           comparison = aValue - bValue;
//         } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
//           comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
//         } else {
//           comparison = String(aValue).localeCompare(String(bValue));
//         }
//         return comparison;
//       });
//     }
//     return sortableItems;
//   }, [requirements, sortConfig]);

//   const filteredRequirements = useMemo(() => {
//     return sortedRequirements
//       .filter(req =>
//         req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         req.category.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .filter(req => statusFilter === 'all' || req.status === statusFilter);
//   }, [sortedRequirements, searchQuery, statusFilter]);

//   const requestSort = (key: RequirementKey) => {
//     setSortConfig({ key });
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleViewRequirement = (requirement: Requirement) => {
//     if (requirement.status === 'Draft') {
//       toast('Requirement is in draft status and cannot be viewed yet.');
//       return;
//     }
    
//     if (requirement.status === 'Completed') {
//       toast('Requirement is already completed.');
//       return;
//     }
    
//     const categoryQueryParam = encodeURIComponent(requirement.category);
//     navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
//   };

//   const handleCreateRequirement = () => {
//     localStorage.removeItem('requirement-draft-form');
//     navigate('/create-requirement');
//   };

//   const handleEditRequirement = (requirement: Requirement) => {
//     navigate('/create-requirement', { state: { requirement } });
//   };

//   const openDeleteDialog = (requirement: Requirement) => {
//     setSelectedRequirement(requirement);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteRequirement = () => {
//     if (!selectedRequirement) return;
//     const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
//     setRequirements(updatedRequirements);
//     setIsDeleteDialogOpen(false);
//     setSelectedRequirement(null);
//   };

//   const getStatusBadgeClass = (status: RequirementStatus) => {
//     switch (status) {
//       case 'Active': return 'bg-blue-500 text-white hover:bg-blue-600';
//       case 'Completed': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
//       case 'Pending': return 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100';
//       case 'Draft': return 'bg-red-500 text-white hover:bg-red-600';
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   // --- MODIFIED FUNCTION ---
//   const getPriorityBadgeClass = (priority: RequirementPriority) => {
//     switch (priority) {
//       case 'Critical': return 'bg-red-500 text-white hover:bg-red-600'; // Red for Critical
//       case 'High': return 'bg-orange-500 text-white hover:bg-orange-600'; // Orange for High
//       case 'Medium': return 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'; // Yellow for Medium
//       case 'Low': return 'bg-green-500 text-white hover:bg-green-600'; // Green for Low
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <IndustryHeader />
//       <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
//         <div className="mb-8">
//           <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
//           <div className="flex items-center justify-between">
//             <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements.</p></div>
//             <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
//           </div>
//         </div>
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" /><Input type="text" placeholder="Search requirements..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
//               <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <Card className="bg-white shadow-sm border border-gray-200">
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50 hover:bg-gray-100">
//                   <TableHead onClick={() => requestSort('title')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Title</TableHead>
//                   <TableHead onClick={() => requestSort('category')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Category</TableHead>
//                   <TableHead onClick={() => requestSort('priority')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Priority</TableHead>
//                   <TableHead onClick={() => requestSort('status')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Status</TableHead>
//                   <TableHead onClick={() => requestSort('budget')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Budget</TableHead>
//                   <TableHead onClick={() => requestSort('submissionDeadline')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Deadline</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredRequirements.map((requirement) => (
//                   <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
//                     <TableCell className="font-medium text-gray-800 max-w-[300px] truncate" title={requirement.title}>{requirement.title}</TableCell>
//                     <TableCell className="text-gray-600">{requirement.category}</TableCell>
//                     <TableCell><Badge className={getPriorityBadgeClass(requirement.priority)}>{requirement.priority}</Badge></TableCell>
//                     <TableCell><Badge className={getStatusBadgeClass(requirement.status)}>{requirement.status}</Badge></TableCell>
//                     <TableCell className="text-gray-600">{`${requirement.budget.toLocaleString('en-IN')}`}</TableCell>
//                     <TableCell className="text-gray-600">{formatDate(requirement.submissionDeadline)}</TableCell>
//                     <TableCell>
//                       <div className="flex justify-center gap-2">
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleViewRequirement(requirement)}><Eye className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleEditRequirement(requirement)}><Edit className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(requirement)}><Trash className="h-4 w-4" /></Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the requirement.</AlertDialogDescription></AlertDialogHeader>
//           <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRequirement}>Continue</AlertDialogAction></AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       <Toaster
//         position="bottom-right"
//         reverseOrder={false}
//       />
//     </div>
//   );
// };

// export default IndustryRequirements;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner";
// import IndustryHeader from '@/components/industry/IndustryHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Search, Filter, Eye, Edit, Trash, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Input } from '@/components/ui/input';

// // --- MOCK DATA ---
// const initialRequirements = [
//     { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves...' },
//     { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection...' },
//     { id: 'REQ-2024-003', title: 'Safety Compliance Audit', category: 'Expert', priority: 'high' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit...' },
//     { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'N/A' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy equipment...' },
//     { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets', category: 'Product', priority: 'medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for gaskets...' },
//     { id: 'REQ-2024-009', title: 'Non-Destructive Testing (NDT)', category: 'Services', priority: 'high' as const, status: 'Pending' as const, budget: 95000, createdDate: '2024-02-12', submissionDeadline: '2024-03-20', description: 'On-site NDT services...' },
//     { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo', category: 'Logistics', priority: 'high' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for ODC partner...' },
//     { id: 'REQ-2024-014', title: 'Data Analytics Platform Subscription', category: 'Services', priority: 'medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-03-01', submissionDeadline: '2024-03-25', description: 'Cloud-based analytics platform...' },
//     { id: 'REQ-2024-015', title: 'Rental of Heavy-Duty Cranes', category: 'Logistics', priority: 'high' as const, status: 'Pending' as const, budget: 120000, createdDate: '2024-03-05', submissionDeadline: '2024-03-20', description: 'Rental of three 50-ton cranes...' },
//     { id: 'REQ-2024-016', title: 'Green Energy Transition Consultation', category: 'Expert', priority: 'low' as const, status: 'Draft' as const, budget: null, createdDate: '2024-03-10', submissionDeadline: '2024-04-01', description: 'Consulting for renewable energy...' },
//     { id: 'REQ-2024-017', title: 'Custom Fabricated Steel Components', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 250000, createdDate: '2024-03-12', submissionDeadline: '2024-04-15', description: 'Fabrication of steel supports...' },
//     { id: 'REQ-2024-018', title: 'Cybersecurity Audit & Pen Testing', category: 'Services', priority: 'high' as const, status: 'Active' as const, budget: 80000, createdDate: '2024-03-15', submissionDeadline: '2024-04-10', description: 'Comprehensive cybersecurity audit...' },
// ];

// type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
// type RequirementPriority = 'critical' | 'high' | 'medium' | 'low' | 'N/A' ;
// type Requirement = typeof initialRequirements[0];
// type RequirementKey = keyof Requirement;

// const IndustryRequirements = () => {
//   const navigate = useNavigate();

//   const [requirements, setRequirements] = useState<Requirement[]>(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: RequirementKey; direction: 'asc' | 'desc' }>({ key: 'title', direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const ROWS_PER_PAGE = 10;

//   useEffect(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     if (!savedRequirements || JSON.parse(savedRequirements).length < 12) {
//       localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('requirements-list', JSON.stringify(requirements));
//   }, [requirements]);
  
//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, statusFilter, sortConfig]);

//   const handleSort = (key: RequirementKey) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedRequirements = useMemo(() => {
//     let sortableItems = [...requirements];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         let comparison = 0;
        
//         if (aValue === null || bValue === null) {
//             if (aValue === null && bValue !== null) comparison = -1;
//             else if (aValue !== null && bValue === null) comparison = 1;
//             else comparison = 0;
//         } else if (typeof aValue === 'number' && typeof bValue === 'number') {
//           comparison = aValue - bValue;
//         } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
//           comparison = new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
//         } else {
//           comparison = String(aValue).localeCompare(String(bValue));
//         }

//         return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
//       });
//     }
//     return sortableItems;
//   }, [requirements, sortConfig]);

//   const filteredRequirements = useMemo(() => {
//     return sortedRequirements
//       .filter(req =>
//         req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         req.category.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .filter(req => statusFilter === 'all' || req.status === statusFilter);
//   }, [sortedRequirements, searchQuery, statusFilter]);
  
//   const totalPages = useMemo(() => {
//     return Math.ceil(filteredRequirements.length / ROWS_PER_PAGE);
//   }, [filteredRequirements]);

//   const paginatedRequirements = useMemo(() => {
//     const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
//     return filteredRequirements.slice(startIndex, startIndex + ROWS_PER_PAGE);
//   }, [filteredRequirements, currentPage]);

//   const capitalize = (s: string) => {
//     if (typeof s !== 'string' || s.length === 0) return '';
//     return s.charAt(0).toUpperCase() + s.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleViewRequirement = (requirement: Requirement) => {
//     if (requirement.status === 'Draft') {
//       toast.success('Requirement is in draft status and cannot be viewed yet.');
//       return;
//     }
    
//     if (requirement.status === 'Completed') {
//       toast.success('Requirement is already completed.');
//       return;
//     }
    
//     const categoryQueryParam = encodeURIComponent(requirement.category);
//     navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
//   };

//   const handleCreateRequirement = () => {
//     localStorage.removeItem('requirement-draft-form');
//     navigate('/create-requirement');
//   };

//   const handleEditRequirement = (requirement: Requirement) => {
//     navigate('/create-requirement', { state: { requirement } });
//   };

//   const openDeleteDialog = (requirement: Requirement) => {
//     setSelectedRequirement(requirement);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteRequirement = () => {
//     if (!selectedRequirement) return;
//     const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
//     setRequirements(updatedRequirements);
//     setIsDeleteDialogOpen(false);
//     setSelectedRequirement(null);
//   };

//   const getStatusBadgeClass = (status: RequirementStatus) => {
//     const layoutClasses = 'w-24 justify-center'; 
//     switch (status) {
//       case 'Active': return `${layoutClasses} bg-blue-500 text-white hover:bg-blue-600`;
//       case 'Completed': return `${layoutClasses} bg-green-800 text-white hover:bg-green-900`;
//       case 'Pending': return `${layoutClasses} bg-gray-600 text-white border border-gray-300 hover:bg-gray-100`;
//       case 'Draft': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
//       default: return `${layoutClasses} bg-gray-500 text-white`;
//     }
//   };

//   const getPriorityBadgeClass = (priority: RequirementPriority) => {
//     const layoutClasses = 'w-24 justify-center'; 
//     switch (priority) {
//       case 'critical': return `${layoutClasses} bg-red-700 text-white hover:bg-red-800`;
//       case 'high': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
//       case 'medium': return `${layoutClasses} bg-orange-400 text-white hover:bg-orange-500`;
//       case 'low': return `${layoutClasses} bg-yellow-500 text-white hover:bg-yellow-600`;
//       default: return `${layoutClasses} bg-gray-500 text-white`;
//     }
//   };

//   const renderPagination = () => {
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     if (totalPages <= 5) {
//         return pageNumbers.map(page => (
//             <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
//             >
//                 {page}
//             </Button>
//         ));
//     }

//     const pagesToShow = [1];
//     if (currentPage > 3) pagesToShow.push(0);
//     if (currentPage > 2) pagesToShow.push(currentPage - 1);
//     if (currentPage !== 1 && currentPage !== totalPages) pagesToShow.push(currentPage);
//     if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);
//     if (currentPage < totalPages - 2) pagesToShow.push(0);
//     pagesToShow.push(totalPages);
//     const uniquePages = [...new Set(pagesToShow)];

//     return uniquePages.map((page, idx) =>
//         page === 0 ? (
//             <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">...</span>
//         ) : (
//             <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
//             >
//                 {page}
//             </Button>
//         )
//     );
//   };

//   const SortButton = ({ field, label }: { field: RequirementKey, label: string }) => (
//     <Button 
//       variant="ghost" 
//       size="sm" 
//       className="flex items-center gap-1"
//       onClick={() => handleSort(field)}
//     >
//       <span>{label}</span>
//       <ArrowUpDown className="h-4 w-4" />
//       {sortConfig.key === field && (
//         <span className="text-xs font-bold">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
//       )}
//     </Button>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <IndustryHeader />
//       <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
//         <div className="mb-8">
//           <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
//           <div className="flex items-center justify-between">
//             <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements</p></div>
//             <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
//           </div>
//         </div>
        
//         <div className="mb-6 flex flex-col gap-4">
//           <div className="flex items-center gap-4">
// <div className="relative w-[450px] max-w-full">
//   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
//   <Input
//     type="text"
//     placeholder="Search requirements..."
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//     className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//   />
// </div>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
//               <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           <div className="flex gap-2 flex-wrap  pt-4">
//             <SortButton field="title" label="Title" />
//             <SortButton field="category" label="Category" />
//             <SortButton field="status" label="Status" />
//             <SortButton field="budget" label="Budget" />
//             <SortButton field="submissionDeadline" label="Deadline" />
//           </div>
//         </div>
        
//          {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mb-4">
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
//                 {renderPagination()}
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
//             </div>
//         )}

//         <Card className="bg-white shadow-sm border border-gray-200">
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50 hover:bg-gray-100">
//                   <TableHead className="font-semibold text-gray-700">Title</TableHead>
//                   <TableHead className="font-semibold text-gray-700">Category</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Priority</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Budget</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Deadline</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedRequirements.map((requirement) => (
//                   <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
//                     <TableCell className="font-medium text-gray-800 max-w-[250px] truncate" title={requirement.title}>{requirement.title}</TableCell>
//                     <TableCell className="text-gray-600">{requirement.category}</TableCell>
//                     <TableCell className="text-gray-600 text-center">
//                       {requirement.priority && requirement.priority !== 'N/A' ? (
//                         <Badge className={getPriorityBadgeClass(requirement.priority as RequirementPriority)}>
//                           {capitalize(requirement.priority)}
//                         </Badge>
//                       ) : ( 'N/A' )}
//                     </TableCell>
//                     <TableCell className="text-center"><Badge className={getStatusBadgeClass(requirement.status)}>{requirement.status}</Badge></TableCell>
//                     <TableCell className="text-gray-600 text-center">{requirement.budget ? `${requirement.budget.toLocaleString('en-IN')}` : 'N/A'}</TableCell>
//                     <TableCell className="text-gray-600 text-center">{formatDate(requirement.submissionDeadline)}</TableCell>
//                     <TableCell>
//                       <div className="flex justify-center gap-2">
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleViewRequirement(requirement)}><Eye className="h-4 w-4 text-blue-500" /></Button>
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleEditRequirement(requirement)}><Edit className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(requirement)}><Trash className="h-4 w-4" /></Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
        
//         {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
//                 {renderPagination()}
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
//             </div>
//         )}

//       </main>
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the requirement.</AlertDialogDescription></AlertDialogHeader>
//           <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRequirement}>Continue</AlertDialogAction></AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default IndustryRequirements;

import React, { useState, useEffect, useMemo } from 'react';
=======
<<<<<<< HEAD
import React, { useState } from 'react';
>>>>>>> 9b0ce35 (Initial commit)
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
<<<<<<< HEAD
=======
import { Plus, Search, Filter, Eye, Edit, Trash2, FileText, Calendar, DollarSign } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
=======
// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import  toast,{Toaster} from 'react-hot-toast';
// // import { toast } from "sonner";
// // import 'react-toastify/dist/ReactToastify.css';
// import IndustryHeader from '@/components/industry/IndustryHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Search, Filter, Eye, Edit, Trash } from 'lucide-react';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Input } from '@/components/ui/input';

// // --- MOCK DATA (Expanded & Updated) ---
// const initialRequirements = [
//   // Original Data (with priority updated)
//   {
//     id: 'REQ-2024-001',
//     title: 'Industrial Equipment Procurement for the New Hydro-Processing Plant Unit #7',
//     category: 'Product',
//     priority: 'Critical' as const, // <-- Changed from 'High' to 'Critical'
//     status: 'Active' as const,
//     budget: 150000,
//     createdDate: '2024-01-15',
//     submissionDeadline: '2024-03-01',
//     description: 'Procurement of industrial valves and pressure control systems for the new hydro-processing unit.',
//   },
//   {
//     id: 'REQ-2024-002',
//     title: 'Pipeline Inspection Services',
//     category: 'Services',
//     priority: 'Medium' as const,
//     status: 'Draft' as const,
//     budget: 75000,
//     createdDate: '2024-01-20',
//     submissionDeadline: '2024-02-28',
//     description: 'Comprehensive pipeline inspection and maintenance services for the northern sector pipeline.',
//   },
//   {
//     id: 'REQ-2024-003',
//     title: 'Safety Compliance Audit for All On-site and Off-site Operations',
//     category: 'Expert',
//     priority: 'High' as const, // <-- Kept as 'High' to show orange
//     status: 'Completed' as const,
//     budget: 25000,
//     createdDate: '2024-01-10',
//     submissionDeadline: '2024-01-30',
//     description: 'Full safety compliance audit and certification in accordance with ISO 45001 standards.',
//   },
//   {
//     id: 'REQ-2024-004',
//     title: 'Equipment Transportation',
//     category: 'Logistics',
//     priority: 'Low' as const,
//     status: 'Pending' as const,
//     budget: 30000,
//     createdDate: '2024-01-18',
//     submissionDeadline: '2024-02-15',
//     description: 'Transportation of heavy industrial equipment from the port to the main plant.',
//   },
//   // New Data...
//   {
//     id: 'REQ-2024-005',
//     title: 'Supply of High-Temperature Gaskets and Seals',
//     category: 'Product',
//     priority: 'Medium' as const,
//     status: 'Active' as const,
//     budget: 45000,
//     createdDate: '2024-02-01',
//     submissionDeadline: '2024-03-10',
//     description: 'Urgent need for high-temperature resistant gaskets for the furnace assembly line.',
//   },
//   {
//     id: 'REQ-2024-009',
//     title: 'Non-Destructive Testing (NDT) for Welded Joints',
//     category: 'Services',
//     priority: 'High' as const,
//     status: 'Pending' as const,
//     budget: 95000,
//     createdDate: '2024-02-12',
//     submissionDeadline: '2024-03-20',
//     description: 'On-site NDT services, including ultrasonic and radiographic testing, for critical welded joints.',
//   },
//   {
//     id: 'REQ-2024-013',
//     title: 'Transportation of Oversized Cargo (ODC)',
//     category: 'Logistics',
//     priority: 'High' as const,
//     status: 'Active' as const,
//     budget: 85000,
//     createdDate: '2024-02-11',
//     submissionDeadline: '2024-03-05',
//     description: 'Urgent requirement for a logistics partner with experience in handling oversized dimensional cargo.',
//   },
// ];

// type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
// type RequirementPriority = 'Critical' | 'High' | 'Medium' | 'Low' ;
// type Requirement = typeof initialRequirements[0];
// type RequirementKey = keyof Requirement;

// const IndustryRequirements = () => {
//   const navigate = useNavigate();

//   const [requirements, setRequirements] = useState<Requirement[]>(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: RequirementKey }>({ key: 'title' });

//   useEffect(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     if (!savedRequirements) {
//       localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('requirements-list', JSON.stringify(requirements));
//   }, [requirements]);

//   const sortedRequirements = useMemo(() => {
//     let sortableItems = [...requirements];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         let comparison = 0;
//         if (typeof aValue === 'number' && typeof bValue === 'number') {
//           comparison = aValue - bValue;
//         } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
//           comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
//         } else {
//           comparison = String(aValue).localeCompare(String(bValue));
//         }
//         return comparison;
//       });
//     }
//     return sortableItems;
//   }, [requirements, sortConfig]);

//   const filteredRequirements = useMemo(() => {
//     return sortedRequirements
//       .filter(req =>
//         req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         req.category.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .filter(req => statusFilter === 'all' || req.status === statusFilter);
//   }, [sortedRequirements, searchQuery, statusFilter]);

//   const requestSort = (key: RequirementKey) => {
//     setSortConfig({ key });
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleViewRequirement = (requirement: Requirement) => {
//     if (requirement.status === 'Draft') {
//       toast('Requirement is in draft status and cannot be viewed yet.');
//       return;
//     }
    
//     if (requirement.status === 'Completed') {
//       toast('Requirement is already completed.');
//       return;
//     }
    
//     const categoryQueryParam = encodeURIComponent(requirement.category);
//     navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
//   };

//   const handleCreateRequirement = () => {
//     localStorage.removeItem('requirement-draft-form');
//     navigate('/create-requirement');
//   };

//   const handleEditRequirement = (requirement: Requirement) => {
//     navigate('/create-requirement', { state: { requirement } });
//   };

//   const openDeleteDialog = (requirement: Requirement) => {
//     setSelectedRequirement(requirement);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteRequirement = () => {
//     if (!selectedRequirement) return;
//     const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
//     setRequirements(updatedRequirements);
//     setIsDeleteDialogOpen(false);
//     setSelectedRequirement(null);
//   };

//   const getStatusBadgeClass = (status: RequirementStatus) => {
//     switch (status) {
//       case 'Active': return 'bg-blue-500 text-white hover:bg-blue-600';
//       case 'Completed': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
//       case 'Pending': return 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100';
//       case 'Draft': return 'bg-red-500 text-white hover:bg-red-600';
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   // --- MODIFIED FUNCTION ---
//   const getPriorityBadgeClass = (priority: RequirementPriority) => {
//     switch (priority) {
//       case 'Critical': return 'bg-red-500 text-white hover:bg-red-600'; // Red for Critical
//       case 'High': return 'bg-orange-500 text-white hover:bg-orange-600'; // Orange for High
//       case 'Medium': return 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'; // Yellow for Medium
//       case 'Low': return 'bg-green-500 text-white hover:bg-green-600'; // Green for Low
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <IndustryHeader />
//       <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
//         <div className="mb-8">
//           <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
//           <div className="flex items-center justify-between">
//             <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements.</p></div>
//             <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
//           </div>
//         </div>
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" /><Input type="text" placeholder="Search requirements..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
//               <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <Card className="bg-white shadow-sm border border-gray-200">
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50 hover:bg-gray-100">
//                   <TableHead onClick={() => requestSort('title')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Title</TableHead>
//                   <TableHead onClick={() => requestSort('category')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Category</TableHead>
//                   <TableHead onClick={() => requestSort('priority')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Priority</TableHead>
//                   <TableHead onClick={() => requestSort('status')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Status</TableHead>
//                   <TableHead onClick={() => requestSort('budget')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Budget</TableHead>
//                   <TableHead onClick={() => requestSort('submissionDeadline')} className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-200">Deadline</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredRequirements.map((requirement) => (
//                   <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
//                     <TableCell className="font-medium text-gray-800 max-w-[300px] truncate" title={requirement.title}>{requirement.title}</TableCell>
//                     <TableCell className="text-gray-600">{requirement.category}</TableCell>
//                     <TableCell><Badge className={getPriorityBadgeClass(requirement.priority)}>{requirement.priority}</Badge></TableCell>
//                     <TableCell><Badge className={getStatusBadgeClass(requirement.status)}>{requirement.status}</Badge></TableCell>
//                     <TableCell className="text-gray-600">{`${requirement.budget.toLocaleString('en-IN')}`}</TableCell>
//                     <TableCell className="text-gray-600">{formatDate(requirement.submissionDeadline)}</TableCell>
//                     <TableCell>
//                       <div className="flex justify-center gap-2">
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleViewRequirement(requirement)}><Eye className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleEditRequirement(requirement)}><Edit className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(requirement)}><Trash className="h-4 w-4" /></Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the requirement.</AlertDialogDescription></AlertDialogHeader>
//           <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRequirement}>Continue</AlertDialogAction></AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       <Toaster
//         position="bottom-right"
//         reverseOrder={false}
//       />
//     </div>
//   );
// };

// export default IndustryRequirements;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner";
// import IndustryHeader from '@/components/industry/IndustryHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Search, Filter, Eye, Edit, Trash, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Input } from '@/components/ui/input';

// // --- MOCK DATA ---
// const initialRequirements = [
//     { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves...' },
//     { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection...' },
//     { id: 'REQ-2024-003', title: 'Safety Compliance Audit', category: 'Expert', priority: 'high' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit...' },
//     { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'N/A' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy equipment...' },
//     { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets', category: 'Product', priority: 'medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for gaskets...' },
//     { id: 'REQ-2024-009', title: 'Non-Destructive Testing (NDT)', category: 'Services', priority: 'high' as const, status: 'Pending' as const, budget: 95000, createdDate: '2024-02-12', submissionDeadline: '2024-03-20', description: 'On-site NDT services...' },
//     { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo', category: 'Logistics', priority: 'high' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for ODC partner...' },
//     { id: 'REQ-2024-014', title: 'Data Analytics Platform Subscription', category: 'Services', priority: 'medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-03-01', submissionDeadline: '2024-03-25', description: 'Cloud-based analytics platform...' },
//     { id: 'REQ-2024-015', title: 'Rental of Heavy-Duty Cranes', category: 'Logistics', priority: 'high' as const, status: 'Pending' as const, budget: 120000, createdDate: '2024-03-05', submissionDeadline: '2024-03-20', description: 'Rental of three 50-ton cranes...' },
//     { id: 'REQ-2024-016', title: 'Green Energy Transition Consultation', category: 'Expert', priority: 'low' as const, status: 'Draft' as const, budget: null, createdDate: '2024-03-10', submissionDeadline: '2024-04-01', description: 'Consulting for renewable energy...' },
//     { id: 'REQ-2024-017', title: 'Custom Fabricated Steel Components', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 250000, createdDate: '2024-03-12', submissionDeadline: '2024-04-15', description: 'Fabrication of steel supports...' },
//     { id: 'REQ-2024-018', title: 'Cybersecurity Audit & Pen Testing', category: 'Services', priority: 'high' as const, status: 'Active' as const, budget: 80000, createdDate: '2024-03-15', submissionDeadline: '2024-04-10', description: 'Comprehensive cybersecurity audit...' },
// ];

// type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
// type RequirementPriority = 'critical' | 'high' | 'medium' | 'low' | 'N/A' ;
// type Requirement = typeof initialRequirements[0];
// type RequirementKey = keyof Requirement;

// const IndustryRequirements = () => {
//   const navigate = useNavigate();

//   const [requirements, setRequirements] = useState<Requirement[]>(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: RequirementKey; direction: 'asc' | 'desc' }>({ key: 'title', direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const ROWS_PER_PAGE = 10;

//   useEffect(() => {
//     const savedRequirements = localStorage.getItem('requirements-list');
//     if (!savedRequirements || JSON.parse(savedRequirements).length < 12) {
//       localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('requirements-list', JSON.stringify(requirements));
//   }, [requirements]);
  
//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, statusFilter, sortConfig]);

//   const handleSort = (key: RequirementKey) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedRequirements = useMemo(() => {
//     let sortableItems = [...requirements];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         let comparison = 0;
        
//         if (aValue === null || bValue === null) {
//             if (aValue === null && bValue !== null) comparison = -1;
//             else if (aValue !== null && bValue === null) comparison = 1;
//             else comparison = 0;
//         } else if (typeof aValue === 'number' && typeof bValue === 'number') {
//           comparison = aValue - bValue;
//         } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
//           comparison = new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
//         } else {
//           comparison = String(aValue).localeCompare(String(bValue));
//         }

//         return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
//       });
//     }
//     return sortableItems;
//   }, [requirements, sortConfig]);

//   const filteredRequirements = useMemo(() => {
//     return sortedRequirements
//       .filter(req =>
//         req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         req.category.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .filter(req => statusFilter === 'all' || req.status === statusFilter);
//   }, [sortedRequirements, searchQuery, statusFilter]);
  
//   const totalPages = useMemo(() => {
//     return Math.ceil(filteredRequirements.length / ROWS_PER_PAGE);
//   }, [filteredRequirements]);

//   const paginatedRequirements = useMemo(() => {
//     const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
//     return filteredRequirements.slice(startIndex, startIndex + ROWS_PER_PAGE);
//   }, [filteredRequirements, currentPage]);

//   const capitalize = (s: string) => {
//     if (typeof s !== 'string' || s.length === 0) return '';
//     return s.charAt(0).toUpperCase() + s.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleViewRequirement = (requirement: Requirement) => {
//     if (requirement.status === 'Draft') {
//       toast.success('Requirement is in draft status and cannot be viewed yet.');
//       return;
//     }
    
//     if (requirement.status === 'Completed') {
//       toast.success('Requirement is already completed.');
//       return;
//     }
    
//     const categoryQueryParam = encodeURIComponent(requirement.category);
//     navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
//   };

//   const handleCreateRequirement = () => {
//     localStorage.removeItem('requirement-draft-form');
//     navigate('/create-requirement');
//   };

//   const handleEditRequirement = (requirement: Requirement) => {
//     navigate('/create-requirement', { state: { requirement } });
//   };

//   const openDeleteDialog = (requirement: Requirement) => {
//     setSelectedRequirement(requirement);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteRequirement = () => {
//     if (!selectedRequirement) return;
//     const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
//     setRequirements(updatedRequirements);
//     setIsDeleteDialogOpen(false);
//     setSelectedRequirement(null);
//   };

//   const getStatusBadgeClass = (status: RequirementStatus) => {
//     const layoutClasses = 'w-24 justify-center'; 
//     switch (status) {
//       case 'Active': return `${layoutClasses} bg-blue-500 text-white hover:bg-blue-600`;
//       case 'Completed': return `${layoutClasses} bg-green-800 text-white hover:bg-green-900`;
//       case 'Pending': return `${layoutClasses} bg-gray-600 text-white border border-gray-300 hover:bg-gray-100`;
//       case 'Draft': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
//       default: return `${layoutClasses} bg-gray-500 text-white`;
//     }
//   };

//   const getPriorityBadgeClass = (priority: RequirementPriority) => {
//     const layoutClasses = 'w-24 justify-center'; 
//     switch (priority) {
//       case 'critical': return `${layoutClasses} bg-red-700 text-white hover:bg-red-800`;
//       case 'high': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
//       case 'medium': return `${layoutClasses} bg-orange-400 text-white hover:bg-orange-500`;
//       case 'low': return `${layoutClasses} bg-yellow-500 text-white hover:bg-yellow-600`;
//       default: return `${layoutClasses} bg-gray-500 text-white`;
//     }
//   };

//   const renderPagination = () => {
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     if (totalPages <= 5) {
//         return pageNumbers.map(page => (
//             <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
//             >
//                 {page}
//             </Button>
//         ));
//     }

//     const pagesToShow = [1];
//     if (currentPage > 3) pagesToShow.push(0);
//     if (currentPage > 2) pagesToShow.push(currentPage - 1);
//     if (currentPage !== 1 && currentPage !== totalPages) pagesToShow.push(currentPage);
//     if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);
//     if (currentPage < totalPages - 2) pagesToShow.push(0);
//     pagesToShow.push(totalPages);
//     const uniquePages = [...new Set(pagesToShow)];

//     return uniquePages.map((page, idx) =>
//         page === 0 ? (
//             <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">...</span>
//         ) : (
//             <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
//             >
//                 {page}
//             </Button>
//         )
//     );
//   };

//   const SortButton = ({ field, label }: { field: RequirementKey, label: string }) => (
//     <Button 
//       variant="ghost" 
//       size="sm" 
//       className="flex items-center gap-1"
//       onClick={() => handleSort(field)}
//     >
//       <span>{label}</span>
//       <ArrowUpDown className="h-4 w-4" />
//       {sortConfig.key === field && (
//         <span className="text-xs font-bold">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
//       )}
//     </Button>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <IndustryHeader />
//       <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
//         <div className="mb-8">
//           <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
//           <div className="flex items-center justify-between">
//             <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements</p></div>
//             <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
//           </div>
//         </div>
        
//         <div className="mb-6 flex flex-col gap-4">
//           <div className="flex items-center gap-4">
// <div className="relative w-[450px] max-w-full">
//   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
//   <Input
//     type="text"
//     placeholder="Search requirements..."
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//     className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//   />
// </div>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
//               <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           <div className="flex gap-2 flex-wrap  pt-4">
//             <SortButton field="title" label="Title" />
//             <SortButton field="category" label="Category" />
//             <SortButton field="status" label="Status" />
//             <SortButton field="budget" label="Budget" />
//             <SortButton field="submissionDeadline" label="Deadline" />
//           </div>
//         </div>
        
//          {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mb-4">
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
//                 {renderPagination()}
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
//             </div>
//         )}

//         <Card className="bg-white shadow-sm border border-gray-200">
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50 hover:bg-gray-100">
//                   <TableHead className="font-semibold text-gray-700">Title</TableHead>
//                   <TableHead className="font-semibold text-gray-700">Category</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Priority</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Budget</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Deadline</TableHead>
//                   <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedRequirements.map((requirement) => (
//                   <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
//                     <TableCell className="font-medium text-gray-800 max-w-[250px] truncate" title={requirement.title}>{requirement.title}</TableCell>
//                     <TableCell className="text-gray-600">{requirement.category}</TableCell>
//                     <TableCell className="text-gray-600 text-center">
//                       {requirement.priority && requirement.priority !== 'N/A' ? (
//                         <Badge className={getPriorityBadgeClass(requirement.priority as RequirementPriority)}>
//                           {capitalize(requirement.priority)}
//                         </Badge>
//                       ) : ( 'N/A' )}
//                     </TableCell>
//                     <TableCell className="text-center"><Badge className={getStatusBadgeClass(requirement.status)}>{requirement.status}</Badge></TableCell>
//                     <TableCell className="text-gray-600 text-center">{requirement.budget ? `${requirement.budget.toLocaleString('en-IN')}` : 'N/A'}</TableCell>
//                     <TableCell className="text-gray-600 text-center">{formatDate(requirement.submissionDeadline)}</TableCell>
//                     <TableCell>
//                       <div className="flex justify-center gap-2">
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleViewRequirement(requirement)}><Eye className="h-4 w-4 text-blue-500" /></Button>
//                         <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleEditRequirement(requirement)}><Edit className="h-4 w-4" /></Button>
//                         <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(requirement)}><Trash className="h-4 w-4" /></Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
        
//         {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
//                 {renderPagination()}
//                 <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
//             </div>
//         )}

//       </main>
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the requirement.</AlertDialogDescription></AlertDialogHeader>
//           <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRequirement}>Continue</AlertDialogAction></AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default IndustryRequirements;

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
>>>>>>> 9b0ce35 (Initial commit)
import { Plus, Search, Filter, Eye, Edit, Trash, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

// --- MOCK DATA ---
const initialRequirements = [
    { id: 'REQ-2024-001', title: 'Industrial Equipment Procurement', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 150000, createdDate: '2024-01-15', submissionDeadline: '2024-03-01', description: 'Procurement of industrial valves...' },
    { id: 'REQ-2024-002', title: 'Pipeline Inspection Services', category: 'Services', priority: 'medium' as const, status: 'Draft' as const, budget: 75000, createdDate: '2024-01-20', submissionDeadline: '2024-02-28', description: 'Comprehensive pipeline inspection...' },
    { id: 'REQ-2024-003', title: 'Safety Compliance Audit', category: 'Expert', priority: 'high' as const, status: 'Completed' as const, budget: 25000, createdDate: '2024-01-10', submissionDeadline: '2024-01-30', description: 'Full safety compliance audit...' },
    { id: 'REQ-2024-004', title: 'Equipment Transportation', category: 'Logistics', priority: 'N/A' as const, status: 'Pending' as const, budget: 30000, createdDate: '2024-01-18', submissionDeadline: '2024-02-15', description: 'Transportation of heavy equipment...' },
    { id: 'REQ-2024-005', title: 'Supply of High-Temperature Gaskets', category: 'Product', priority: 'medium' as const, status: 'Active' as const, budget: 45000, createdDate: '2024-02-01', submissionDeadline: '2024-03-10', description: 'Urgent need for gaskets...' },
    { id: 'REQ-2024-009', title: 'Non-Destructive Testing (NDT)', category: 'Services', priority: 'high' as const, status: 'Pending' as const, budget: 95000, createdDate: '2024-02-12', submissionDeadline: '2024-03-20', description: 'On-site NDT services...' },
    { id: 'REQ-2024-013', title: 'Transportation of Oversized Cargo', category: 'Logistics', priority: 'high' as const, status: 'Active' as const, budget: 85000, createdDate: '2024-02-11', submissionDeadline: '2024-03-05', description: 'Urgent requirement for ODC partner...' },
    { id: 'REQ-2024-014', title: 'Data Analytics Platform Subscription', category: 'Services', priority: 'medium' as const, status: 'Active' as const, budget: 60000, createdDate: '2024-03-01', submissionDeadline: '2024-03-25', description: 'Cloud-based analytics platform...' },
    { id: 'REQ-2024-015', title: 'Rental of Heavy-Duty Cranes', category: 'Logistics', priority: 'high' as const, status: 'Pending' as const, budget: 120000, createdDate: '2024-03-05', submissionDeadline: '2024-03-20', description: 'Rental of three 50-ton cranes...' },
    { id: 'REQ-2024-016', title: 'Green Energy Transition Consultation', category: 'Expert', priority: 'low' as const, status: 'Draft' as const, budget: null, createdDate: '2024-03-10', submissionDeadline: '2024-04-01', description: 'Consulting for renewable energy...' },
    { id: 'REQ-2024-017', title: 'Custom Fabricated Steel Components', category: 'Product', priority: 'critical' as const, status: 'Active' as const, budget: 250000, createdDate: '2024-03-12', submissionDeadline: '2024-04-15', description: 'Fabrication of steel supports...' },
    { id: 'REQ-2024-018', title: 'Cybersecurity Audit & Pen Testing', category: 'Services', priority: 'high' as const, status: 'Active' as const, budget: 80000, createdDate: '2024-03-15', submissionDeadline: '2024-04-10', description: 'Comprehensive cybersecurity audit...' },
];

type RequirementStatus = 'Active' | 'Draft' | 'Completed' | 'Pending';
type RequirementPriority = 'critical' | 'high' | 'medium' | 'low' | 'N/A' ;
type Requirement = typeof initialRequirements[0];
type RequirementKey = keyof Requirement;
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

const IndustryRequirements = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    const savedRequirements = localStorage.getItem('requirements-list');
    return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
  });
=======
<<<<<<< HEAD
  // Mock requirements data
  const [requirements] = useState([
    {
      id: 'REQ-2024-001',
      title: 'Industrial Equipment Procurement',
      category: 'Equipment',
      priority: 'High',
      status: 'Active' as const,
      budget: 150000,
      createdDate: '2024-01-15',
      deadline: '2024-03-01',
      description: 'Procurement of industrial valves and pressure control systems'
    },
    {
      id: 'REQ-2024-002',
      title: 'Pipeline Inspection Services',
      category: 'Services',
      priority: 'Medium',
      status: 'Draft' as const,
      budget: 75000,
      createdDate: '2024-01-20',
      deadline: '2024-02-28',
      description: 'Comprehensive pipeline inspection and maintenance services'
    },
    {
      id: 'REQ-2024-003',
      title: 'Safety Compliance Audit',
      category: 'Professional Services',
      priority: 'High',
      status: 'Completed' as const,
      budget: 25000,
      createdDate: '2024-01-10',
      deadline: '2024-01-30',
      description: 'Full safety compliance audit and certification'
    },
    {
      id: 'REQ-2024-004',
      title: 'Equipment Transportation',
      category: 'Logistics',
      priority: 'Low',
      status: 'Pending' as const,
      budget: 30000,
      createdDate: '2024-01-18',
      deadline: '2024-02-15',
      description: 'Transportation of heavy industrial equipment'
    }
  ]);
>>>>>>> 9b0ce35 (Initial commit)

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: RequirementKey; direction: 'asc' | 'desc' }>({ key: 'title', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  useEffect(() => {
    const savedRequirements = localStorage.getItem('requirements-list');
    if (!savedRequirements || JSON.parse(savedRequirements).length < 12) {
      localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('requirements-list', JSON.stringify(requirements));
  }, [requirements]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortConfig]);

  const handleSort = (key: RequirementKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRequirements = useMemo(() => {
    let sortableItems = [...requirements];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        let comparison = 0;
        
        if (aValue === null || bValue === null) {
            if (aValue === null && bValue !== null) comparison = -1;
            else if (aValue !== null && bValue === null) comparison = 1;
            else comparison = 0;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
          comparison = new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
        } else if (sortConfig.key === 'priority') {
          // Custom sorting for priority
          const priorityOrder = ['critical', 'high', 'medium', 'low', 'N/A'];
          comparison = priorityOrder.indexOf(aValue as string) - priorityOrder.indexOf(bValue as string);
        } else if (sortConfig.key === 'status') {
          // Custom sorting for status
          const statusOrder = ['Active', 'Pending', 'Completed', 'Draft'];
          comparison = statusOrder.indexOf(aValue as string) - statusOrder.indexOf(bValue as string);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
      });
    }
    return sortableItems;
  }, [requirements, sortConfig]);

  const filteredRequirements = useMemo(() => {
    return sortedRequirements
      .filter(req =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(req => statusFilter === 'all' || req.status === statusFilter);
  }, [sortedRequirements, searchQuery, statusFilter]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredRequirements.length / ROWS_PER_PAGE);
  }, [filteredRequirements]);

  const paginatedRequirements = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredRequirements.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredRequirements, currentPage]);

  const capitalize = (s: string) => {
    if (typeof s !== 'string' || s.length === 0) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleViewRequirement = (requirement: Requirement) => {
    if (requirement.status === 'Draft') {
      toast.success('Requirement is in draft status and cannot be viewed yet.');
      return;
    }
    
    if (requirement.status === 'Completed') {
      toast.success('Requirement is already completed.');
      return;
    }
    
    const categoryQueryParam = encodeURIComponent(requirement.category);
    navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
  };

  const handleCreateRequirement = () => {
    localStorage.removeItem('requirement-draft-form');
    navigate('/create-requirement');
  };

  const handleEditRequirement = (requirement: Requirement) => {
    navigate('/create-requirement', { state: { requirement } });
  };

  const openDeleteDialog = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRequirement = () => {
    if (!selectedRequirement) return;
    const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
    setRequirements(updatedRequirements);
    setIsDeleteDialogOpen(false);
    setSelectedRequirement(null);
  };

  const getStatusBadgeClass = (status: RequirementStatus) => {
    const layoutClasses = 'w-24 justify-center'; 
    switch (status) {
      case 'Active': return `${layoutClasses} bg-blue-500 text-white hover:bg-blue-600`;
      case 'Completed': return `${layoutClasses} bg-green-800 text-white hover:bg-green-900`;
      case 'Pending': return `${layoutClasses} bg-gray-600 text-white border border-gray-300 hover:bg-gray-100`;
      case 'Draft': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
      default: return `${layoutClasses} bg-gray-500 text-white`;
    }
  };

  const getPriorityBadgeClass = (priority: RequirementPriority) => {
    const layoutClasses = 'w-24 justify-center'; 
    switch (priority) {
      case 'critical': return `${layoutClasses} bg-red-700 text-white hover:bg-red-800`;
      case 'high': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
      case 'medium': return `${layoutClasses} bg-orange-400 text-white hover:bg-orange-500`;
      case 'low': return `${layoutClasses} bg-yellow-500 text-white hover:bg-yellow-600`;
      default: return `${layoutClasses} bg-gray-500 text-white`;
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 5) {
        return pageNumbers.map(page => (
            <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
            >
                {page}
            </Button>
        ));
    }

    const pagesToShow = [1];
    if (currentPage > 3) pagesToShow.push(0);
    if (currentPage > 2) pagesToShow.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pagesToShow.push(currentPage);
    if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);
    if (currentPage < totalPages - 2) pagesToShow.push(0);
    pagesToShow.push(totalPages);
    const uniquePages = [...new Set(pagesToShow)];

    return uniquePages.map((page, idx) =>
        page === 0 ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">...</span>
        ) : (
            <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
            >
                {page}
            </Button>
        )
    );
  };

  const SortableHeader = ({ field, label }: { field: RequirementKey; label: string }) => (
    <TableHead 
      className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center gap-1">
        {label}
        <ArrowUpDown className="h-4 w-4" />
        {sortConfig.key === field && (
          <span className="text-xs font-bold">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
          <div className="flex items-center justify-between">
            <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements</p></div>
            <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-[450px] max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
              <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
         {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-4">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                {renderPagination()}
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        )}

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100">
                  <SortableHeader field="title" label="Title" />
                  <SortableHeader field="category" label="Category" />
                  <SortableHeader field="priority" label="Priority" />
                  <SortableHeader field="status" label="Status" />
                  <SortableHeader field="budget" label="Budget" />
                  <SortableHeader field="submissionDeadline" label="Deadline" />
                  <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequirements.map((requirement) => (
                  <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="font-medium text-gray-800 max-w-[250px] truncate" title={requirement.title}>{requirement.title}</TableCell>
                    <TableCell className="text-gray-600">{requirement.category}</TableCell>
<<<<<<< HEAD
=======
                    <TableCell className="text-gray-600">{requirement.priority}</TableCell>
                    <TableCell className="text-gray-600">{requirement.status}</TableCell>
                    <TableCell className="text-gray-600">${requirement.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-600">{requirement.deadline}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                          onClick={() => handleViewRequirement(requirement.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
=======
  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    const savedRequirements = localStorage.getItem('requirements-list');
    return savedRequirements ? JSON.parse(savedRequirements) : initialRequirements;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: RequirementKey; direction: 'asc' | 'desc' }>({ key: 'title', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  useEffect(() => {
    const savedRequirements = localStorage.getItem('requirements-list');
    if (!savedRequirements || JSON.parse(savedRequirements).length < 12) {
      localStorage.setItem('requirements-list', JSON.stringify(initialRequirements));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('requirements-list', JSON.stringify(requirements));
  }, [requirements]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortConfig]);

  const handleSort = (key: RequirementKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRequirements = useMemo(() => {
    let sortableItems = [...requirements];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        let comparison = 0;
        
        if (aValue === null || bValue === null) {
            if (aValue === null && bValue !== null) comparison = -1;
            else if (aValue !== null && bValue === null) comparison = 1;
            else comparison = 0;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (sortConfig.key === 'submissionDeadline' || sortConfig.key === 'createdDate') {
          comparison = new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
        } else if (sortConfig.key === 'priority') {
          // Custom sorting for priority
          const priorityOrder = ['critical', 'high', 'medium', 'low', 'N/A'];
          comparison = priorityOrder.indexOf(aValue as string) - priorityOrder.indexOf(bValue as string);
        } else if (sortConfig.key === 'status') {
          // Custom sorting for status
          const statusOrder = ['Active', 'Pending', 'Completed', 'Draft'];
          comparison = statusOrder.indexOf(aValue as string) - statusOrder.indexOf(bValue as string);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
      });
    }
    return sortableItems;
  }, [requirements, sortConfig]);

  const filteredRequirements = useMemo(() => {
    return sortedRequirements
      .filter(req =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(req => statusFilter === 'all' || req.status === statusFilter);
  }, [sortedRequirements, searchQuery, statusFilter]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredRequirements.length / ROWS_PER_PAGE);
  }, [filteredRequirements]);

  const paginatedRequirements = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredRequirements.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredRequirements, currentPage]);

  const capitalize = (s: string) => {
    if (typeof s !== 'string' || s.length === 0) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleViewRequirement = (requirement: Requirement) => {
    if (requirement.status === 'Draft') {
      toast.success('Requirement is in draft status and cannot be viewed yet.');
      return;
    }
    
    if (requirement.status === 'Completed') {
      toast.success('Requirement is already completed.');
      return;
    }
    
    const categoryQueryParam = encodeURIComponent(requirement.category);
    navigate(`/industry-project-workflow/${requirement.id}?category=${categoryQueryParam}`);
  };

  const handleCreateRequirement = () => {
    localStorage.removeItem('requirement-draft-form');
    navigate('/create-requirement');
  };

  const handleEditRequirement = (requirement: Requirement) => {
    navigate('/create-requirement', { state: { requirement } });
  };

  const openDeleteDialog = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRequirement = () => {
    if (!selectedRequirement) return;
    const updatedRequirements = requirements.filter(req => req.id !== selectedRequirement.id);
    setRequirements(updatedRequirements);
    setIsDeleteDialogOpen(false);
    setSelectedRequirement(null);
  };

  const getStatusBadgeClass = (status: RequirementStatus) => {
    const layoutClasses = 'w-24 justify-center'; 
    switch (status) {
      case 'Active': return `${layoutClasses} bg-blue-500 text-white hover:bg-blue-600`;
      case 'Completed': return `${layoutClasses} bg-green-800 text-white hover:bg-green-900`;
      case 'Pending': return `${layoutClasses} bg-gray-600 text-white border border-gray-300 hover:bg-gray-100`;
      case 'Draft': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
      default: return `${layoutClasses} bg-gray-500 text-white`;
    }
  };

  const getPriorityBadgeClass = (priority: RequirementPriority) => {
    const layoutClasses = 'w-24 justify-center'; 
    switch (priority) {
      case 'critical': return `${layoutClasses} bg-red-700 text-white hover:bg-red-800`;
      case 'high': return `${layoutClasses} bg-red-500 text-white hover:bg-red-600`;
      case 'medium': return `${layoutClasses} bg-orange-400 text-white hover:bg-orange-500`;
      case 'low': return `${layoutClasses} bg-yellow-500 text-white hover:bg-yellow-600`;
      default: return `${layoutClasses} bg-gray-500 text-white`;
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 5) {
        return pageNumbers.map(page => (
            <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
            >
                {page}
            </Button>
        ));
    }

    const pagesToShow = [1];
    if (currentPage > 3) pagesToShow.push(0);
    if (currentPage > 2) pagesToShow.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pagesToShow.push(currentPage);
    if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);
    if (currentPage < totalPages - 2) pagesToShow.push(0);
    pagesToShow.push(totalPages);
    const uniquePages = [...new Set(pagesToShow)];

    return uniquePages.map((page, idx) =>
        page === 0 ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">...</span>
        ) : (
            <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
            >
                {page}
            </Button>
        )
    );
  };

  const SortableHeader = ({ field, label }: { field: RequirementKey; label: string }) => (
    <TableHead 
      className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center gap-1">
        {label}
        <ArrowUpDown className="h-4 w-4" />
        {sortConfig.key === field && (
          <span className="text-xs font-bold">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">Dashboard</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage></BreadcrumbList></Breadcrumb>
          <div className="flex items-center justify-between">
            <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Requirements</h1><p className="text-gray-600 text-lg">Manage and track your project requirements</p></div>
            <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /> Create Requirement</Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-[450px] max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4" /> Filter by Status</Button></DropdownMenuTrigger>
              <DropdownMenuContent><DropdownMenuLabel>Status</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Completed')}>Completed</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem><DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
         {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-4">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                {renderPagination()}
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        )}

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100">
                  <SortableHeader field="title" label="Title" />
                  <SortableHeader field="category" label="Category" />
                  <SortableHeader field="priority" label="Priority" />
                  <SortableHeader field="status" label="Status" />
                  <SortableHeader field="budget" label="Budget" />
                  <SortableHeader field="submissionDeadline" label="Deadline" />
                  <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequirements.map((requirement) => (
                  <TableRow key={requirement.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="font-medium text-gray-800 max-w-[250px] truncate" title={requirement.title}>{requirement.title}</TableCell>
                    <TableCell className="text-gray-600">{requirement.category}</TableCell>
>>>>>>> 9b0ce35 (Initial commit)
                    <TableCell className="text-gray-600 text-center">
                      {requirement.priority && requirement.priority !== 'N/A' ? (
                        <Badge className={getPriorityBadgeClass(requirement.priority as RequirementPriority)}>
                          {capitalize(requirement.priority)}
                        </Badge>
                      ) : ( 'N/A' )}
                    </TableCell>
                    <TableCell className="text-center"><Badge className={getStatusBadgeClass(requirement.status)}>{requirement.status}</Badge></TableCell>
                    <TableCell className="text-gray-600 text-center">{requirement.budget ? `${requirement.budget.toLocaleString('en-IN')}` : 'N/A'}</TableCell>
                    <TableCell className="text-gray-600 text-center">{formatDate(requirement.submissionDeadline)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleViewRequirement(requirement)}><Eye className="h-4 w-4 text-blue-500" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 " onClick={() => handleEditRequirement(requirement)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(requirement)}><Trash className="h-4 w-4" /></Button>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
<<<<<<< HEAD
        
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                {renderPagination()}
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        )}

      </main>
=======
<<<<<<< HEAD
      </main>
=======
        
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                {renderPagination()}
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        )}

      </main>
>>>>>>> 9b0ce35 (Initial commit)
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the requirement.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRequirement}>Continue</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    </div>
  );
};

<<<<<<< HEAD
export default IndustryRequirements;
=======
<<<<<<< HEAD
export default IndustryRequirements;
=======
export default IndustryRequirements;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
