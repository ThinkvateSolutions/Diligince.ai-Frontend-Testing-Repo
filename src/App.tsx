import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { NotificationStoreProvider } from "@/contexts/NotificationStoreContext";
import { UserProvider } from "@/contexts/UserContext";
import { VendorSpecializationProvider } from "@/contexts/VendorSpecializationContext";
import { ApprovalProvider } from "@/contexts/ApprovalContext";
import { EnhancedApprovalProvider } from "@/contexts/EnhancedApprovalContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { RequirementProvider } from "@/contexts/RequirementContext";
import { StakeholderProvider } from "@/contexts/StakeholderContext";
import RouteErrorBoundary from '@/components/RouteErrorBoundary';

// Public Routes
const HomePage = React.lazy(() => import("@/pages/Index"));
const About = React.lazy(() => import("@/pages/About"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogArticle = React.lazy(() => import("@/pages/BlogArticle"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Legal = React.lazy(() => import("@/pages/Legal"));

// Auth Routes
const SignIn = React.lazy(() => import("@/pages/SignIn"));
const SignUp = React.lazy(() => import("@/pages/SignUp"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));
const PendingApproval = React.lazy(() => import("@/pages/PendingApproval"));

// Industry Routes
const IndustryDashboard = React.lazy(() => import("@/pages/IndustryDashboard"));
const IndustryProfile = React.lazy(() => import("@/pages/IndustryProfile/IndustryProfile"));
const IndustryRequirements = React.lazy(() => import("@/pages/IndustryRequirements"));
const IndustryWorkflows = React.lazy(() => import("@/pages/IndustryWorkflows"));
const IndustryProjectWorkflow = React.lazy(() => import("@/pages/IndustryProjectWorkflow"));
const IndustryStakeholders = React.lazy(() => import("@/pages/IndustryStakeholders"));
const IndustryDocuments = React.lazy(() => import("@/pages/IndustryDocuments"));
const IndustryMessages = React.lazy(() => import("@/pages/IndustryMessages"));
const IndustryApprovalMatrix = React.lazy(() => import("@/pages/IndustryApprovalMatrix"));
const CreateRequirement = React.lazy(() => import("@/pages/CreateRequirement"));
const CreatePurchaseOrder = React.lazy(() => import("@/pages/CreatePurchaseOrder"));
const WorkCompletionPayment = React.lazy(() => import("@/pages/WorkCompletionPayment"));

// Professional/Expert Routes
const ProfessionalDashboard = React.lazy(() => import("@/pages/ProfessionalDashboard"));
const ProfessionalProfile = React.lazy(() => import("@/pages/ProfessionalProfile"));
const ProfessionalCalendar = React.lazy(() => import("@/pages/ProfessionalCalendar"));
const ProfessionalMessages = React.lazy(() => import("@/pages/ProfessionalMessages"));
const ProfessionalOpportunities = React.lazy(() => import("@/pages/ProfessionalOpportunities"));
const ProfessionalDetails = React.lazy(() => import("@/pages/ProfessionalDetails"));
const Experts = React.lazy(() => import("@/pages/Experts"));

// Service Vendor Routes
const ServiceVendorDashboard = React.lazy(() => import("@/pages/ServiceVendorDashboard"));
const ServiceVendorProfile = React.lazy(() => import("@/pages/ServiceVendorProfile"));
const ServiceVendorMessages = React.lazy(() => import("@/pages/ServiceVendorMessages"));
const ServiceVendorProjects = React.lazy(() => import("@/pages/ServiceVendorProjects"));
const ServiceVendorRFQs = React.lazy(() => import("@/pages/ServiceVendorRFQs"));
const ServiceVendorServices = React.lazy(() => import("@/pages/ServiceVendorServices"));

// Product Vendor Routes
const ProductVendorDashboard = React.lazy(() => import("@/pages/ProductVendorDashboard"));
const ProductVendorProfile = React.lazy(() => import("@/pages/ProductVendorProfile"));
const ProductVendorCatalog = React.lazy(() => import("@/pages/ProductVendorCatalog"));
const ProductVendorMessages = React.lazy(() => import("@/pages/ProductVendorMessages"));
const ProductVendorOrders = React.lazy(() => import("@/pages/ProductVendorOrders"));
const ProductVendorRFQs = React.lazy(() => import("@/pages/ProductVendorRFQs"));

// Logistics Vendor Routes
const LogisticsVendorDashboard = React.lazy(() => import("@/pages/LogisticsVendorDashboard"));
const LogisticsVendorProfile = React.lazy(() => import("@/pages/LogisticsVendorProfile"));
const LogisticsVendorDeliveries = React.lazy(() => import("@/pages/LogisticsVendorDeliveries"));
const LogisticsVendorFleet = React.lazy(() => import("@/pages/LogisticsVendorFleet"));
const LogisticsVendorMessages = React.lazy(() => import("@/pages/LogisticsVendorMessages"));
const LogisticsVendorRequests = React.lazy(() => import("@/pages/LogisticsVendorRequests"));

// Vendor Management & Listings
const Vendors = React.lazy(() => import("@/pages/Vendors"));
const VendorDetails = React.lazy(() => import("@/pages/VendorDetails"));
const VendorProfile = React.lazy(() => import("@/pages/VendorProfile"));

// Requirement & Purchase Order Management
const RequirementDetails = React.lazy(() => import("@/pages/RequirementDetails"));

// Profile & Onboarding
const StakeholderOnboarding = React.lazy(() => import("@/pages/StakeholderOnboarding"));

// Test Route
const TestPage = React.lazy(() => import("@/pages/TestPage"));

// 404 Route
const NotFound = React.lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <UserProvider>
          <NotificationStoreProvider>
            <NotificationProvider>
              <EnhancedApprovalProvider>
                <RequirementProvider>
                  <ApprovalProvider>
                    <StakeholderProvider>
                      <VendorSpecializationProvider>
                        <div className="App">
                          <Suspense fallback={<FastLoadingState />}>
                            <Routes>
                              {/* Public Routes */}
                              <Route path="/" element={<RouteErrorBoundary><HomePage /></RouteErrorBoundary>} />
                              <Route path="/about" element={<RouteErrorBoundary><About /></RouteErrorBoundary>} />
                              <Route path="/contact" element={<RouteErrorBoundary><Contact /></RouteErrorBoundary>} />
                              <Route path="/pricing" element={<RouteErrorBoundary><Pricing /></RouteErrorBoundary>} />
                              <Route path="/blog" element={<RouteErrorBoundary><Blog /></RouteErrorBoundary>} />
                              <Route path="/blog/:slug" element={<RouteErrorBoundary><BlogArticle /></RouteErrorBoundary>} />
                              <Route path="/careers" element={<RouteErrorBoundary><Careers /></RouteErrorBoundary>} />
                              <Route path="/legal" element={<RouteErrorBoundary><Legal /></RouteErrorBoundary>} />
                              <Route path="/privacy" element={<RouteErrorBoundary><Privacy /></RouteErrorBoundary>} />
                              <Route path="/terms" element={<RouteErrorBoundary><Terms /></RouteErrorBoundary>} />
                              
                              {/* Auth Routes */}
                              <Route path="/signup" element={<RouteErrorBoundary><SignUp /></RouteErrorBoundary>} />
                              <Route path="/signin" element={<RouteErrorBoundary><SignIn /></RouteErrorBoundary>} />
                              <Route path="/forgot-password" element={<RouteErrorBoundary><ForgotPassword /></RouteErrorBoundary>} />
                              <Route path="/reset-password" element={<RouteErrorBoundary><ResetPassword /></RouteErrorBoundary>} />
                              <Route path="/pending-approval" element={<RouteErrorBoundary><PendingApproval /></RouteErrorBoundary>} />
                              
                              {/* Profile and Onboarding */}
                              <Route path="/stakeholder-onboarding/:token" element={<RouteErrorBoundary><StakeholderOnboarding /></RouteErrorBoundary>} />
                              
                              {/* Industry Routes */}
                              <Route path="/industry-dashboard" element={<RouteErrorBoundary><IndustryDashboard /></RouteErrorBoundary>} />
                              <Route path="/industry-profile" element={<RouteErrorBoundary><IndustryProfile /></RouteErrorBoundary>} />
                              <Route path="/industry-requirements" element={<RouteErrorBoundary><IndustryRequirements /></RouteErrorBoundary>} />
                              <Route path="/create-requirement" element={<RouteErrorBoundary><CreateRequirement /></RouteErrorBoundary>} />
                              <Route path="/create-purchase-order" element={<RouteErrorBoundary><CreatePurchaseOrder /></RouteErrorBoundary>} />
                              <Route path="/industry-workflows" element={<RouteErrorBoundary><IndustryWorkflows /></RouteErrorBoundary>} />
                              <Route path="/industry-project-workflow/:id" element={<RouteErrorBoundary><IndustryProjectWorkflow /></RouteErrorBoundary>} />
                              <Route path="/industry-stakeholders" element={<RouteErrorBoundary><IndustryStakeholders /></RouteErrorBoundary>} />
                              <Route path="/industry-documents" element={<RouteErrorBoundary><IndustryDocuments /></RouteErrorBoundary>} />
                              <Route path="/industry-messages" element={<RouteErrorBoundary><IndustryMessages /></RouteErrorBoundary>} />
                              <Route path="/industry-approval-matrix" element={<RouteErrorBoundary><IndustryApprovalMatrix /></RouteErrorBoundary>} />
                              <Route path="/work-completion-payment/:id" element={<RouteErrorBoundary><WorkCompletionPayment /></RouteErrorBoundary>} />
                              <Route path="/requirement/:id" element={<RouteErrorBoundary><RequirementDetails /></RouteErrorBoundary>} />

                              {/* Vendor Routes */}
                              <Route path="/service-vendor-dashboard" element={<RouteErrorBoundary><ServiceVendorDashboard /></RouteErrorBoundary>} />
                              <Route path="/service-vendor-profile" element={<RouteErrorBoundary><ServiceVendorProfile /></RouteErrorBoundary>} />
                              <Route path="/service-vendor-messages" element={<RouteErrorBoundary><ServiceVendorMessages /></RouteErrorBoundary>} />
                              <Route path="/service-vendor-projects" element={<RouteErrorBoundary><ServiceVendorProjects /></RouteErrorBoundary>} />
                              <Route path="/service-vendor-rfqs" element={<RouteErrorBoundary><ServiceVendorRFQs /></RouteErrorBoundary>} />
                              <Route path="/service-vendor-services" element={<RouteErrorBoundary><ServiceVendorServices /></RouteErrorBoundary>} />

                              <Route path="/product-vendor-dashboard" element={<RouteErrorBoundary><ProductVendorDashboard /></RouteErrorBoundary>} />
                              <Route path="/product-vendor-profile" element={<RouteErrorBoundary><ProductVendorProfile /></RouteErrorBoundary>} />
                              <Route path="/product-vendor-catalog" element={<RouteErrorBoundary><ProductVendorCatalog /></RouteErrorBoundary>} />
                              <Route path="/product-vendor-messages" element={<RouteErrorBoundary><ProductVendorMessages /></RouteErrorBoundary>} />
                              <Route path="/product-vendor-orders" element={<RouteErrorBoundary><ProductVendorOrders /></RouteErrorBoundary>} />
                              <Route path="/product-vendor-rfqs" element={<RouteErrorBoundary><ProductVendorRFQs /></RouteErrorBoundary>} />

                              <Route path="/logistics-vendor-dashboard" element={<RouteErrorBoundary><LogisticsVendorDashboard /></RouteErrorBoundary>} />
                              <Route path="/logistics-vendor-profile" element={<RouteErrorBoundary><LogisticsVendorProfile /></RouteErrorBoundary>} />
                              <Route path="/logistics-vendor-deliveries" element={<RouteErrorBoundary><LogisticsVendorDeliveries /></RouteErrorBoundary>} />
                              <Route path="/logistics-vendor-fleet" element={<RouteErrorBoundary><LogisticsVendorFleet /></RouteErrorBoundary>} />
                              <Route path="/logistics-vendor-messages" element={<RouteErrorBoundary><LogisticsVendorMessages /></RouteErrorBoundary>} />
                              <Route path="/logistics-vendor-requests" element={<RouteErrorBoundary><LogisticsVendorRequests /></RouteErrorBoundary>} />

                              {/* Vendor Management Routes */}
                              <Route path="/vendors" element={<RouteErrorBoundary><Vendors /></RouteErrorBoundary>} />
                              <Route path="/vendor-details/:id" element={<RouteErrorBoundary><VendorDetails /></RouteErrorBoundary>} />
                              <Route path="/vendor-profile" element={<RouteErrorBoundary><VendorProfile /></RouteErrorBoundary>} />

                              {/* Professional Routes */}
                              <Route path="/professional-dashboard" element={<RouteErrorBoundary><ProfessionalDashboard /></RouteErrorBoundary>} />
                              <Route path="/professional-profile" element={<RouteErrorBoundary><ProfessionalProfile /></RouteErrorBoundary>} />
                              <Route path="/professional-calendar" element={<RouteErrorBoundary><ProfessionalCalendar /></RouteErrorBoundary>} />
                              <Route path="/professional-messages" element={<RouteErrorBoundary><ProfessionalMessages /></RouteErrorBoundary>} />
                              <Route path="/professional-opportunities" element={<RouteErrorBoundary><ProfessionalOpportunities /></RouteErrorBoundary>} />
                              <Route path="/professional-details/:id" element={<RouteErrorBoundary><ProfessionalDetails /></RouteErrorBoundary>} />
                              <Route path="/experts" element={<RouteErrorBoundary><Experts /></RouteErrorBoundary>} />
                              
                              {/* Test and 404 */}
                              <Route path="/test" element={<RouteErrorBoundary><TestPage /></RouteErrorBoundary>} />
                              <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
                            </Routes>
                          </Suspense>
                          <Toaster />
                        </div>
                      </VendorSpecializationProvider>
                    </StakeholderProvider>
                  </ApprovalProvider>
                </RequirementProvider>
              </EnhancedApprovalProvider>
            </NotificationProvider>
          </NotificationStoreProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;