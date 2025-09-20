import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // Import Outlet
import Scrolltotop from "@/components/Scrolltotop";

// --- EXISTING PAGE IMPORTS ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import IndustryProfile from "./pages/industry-profile/IndustryProfile";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import VendorProfile from "./pages/VendorProfile";
import ServiceVendorProfile from "./pages/ServiceVendorProfile";
import ProductVendorProfile from "./pages/ProductVendorProfile";
import LogisticsVendorProfile from "./pages/LogisticsVendorProfile";
import CreateRequirement from "./pages/CreateRequirement";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Vendors from "./pages/Vendors";
import Experts from "./pages/Experts";
import WorkCompletionPayment from "./pages/WorkCompletionPayment";
import IndustryDashboard from "./pages/IndustryDashboard";
import Jobdetails from "./pages/Jobdetails";

// --- NEWLY ADDED IMPORTS ---
// 1. Import the VendorHeader that will be used in the layout
import VendorLayout from "@/components/vendor/VendorLayout"; 
import ProductVendorLayout from "@/components/vendor/ProductVendorLayout"; // Import the ProductVendorLayout
// 2. Import the new placeholder pages you created
import Dashboard from "./pages/Dashboard"; // Make sure this path is correct
import Rfq from "./pages/Rfq";
import Catalog from "./pages/Catalog";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";

import ProductDashboard from "./pages/ProductDashboard"; // Make sure this path is correct
import ProductRfq from "./pages/ProductRfq";
import ProductCatalog from "./pages/ProductCatalog";
import ProductOrders from "./pages/ProductOrders";
import ProductMessages from "./pages/ProductMessages";



const queryClient = new QueryClient();



const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Scrolltotop />
          <Routes>
            {/* --- NON-VENDOR ROUTES (Remain unchanged) --- */}
            <Route path="/" element={<Index />} />
            <Route path="/industry-dashboard" element={<IndustryDashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/industry-profile" element={<IndustryProfile />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
            <Route path="/vendor-profile" element={<VendorProfile />} />
            <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
            <Route path="/create-requirement" element={<CreateRequirement />} />
            <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/work-completion-payment/:id" element={<WorkCompletionPayment />} />
            <Route path="/work-completion-payment" element={<WorkCompletionPayment />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/jobdetails/:id" element={<Jobdetails />} />


            {/* --- NEW VENDOR SECTION WITH SHARED LAYOUT --- */}
            {/* 4. Use the VendorLayout as the element for a parent route.
                   All nested routes will now render inside this layout. */}
            <Route element={<VendorLayout />}>
              <Route path="/service-vendor-profile" element={<ServiceVendorProfile />} />
             
              <Route path="/vendor/dashboard" element={<Dashboard />} />
              <Route path="/vendor/rfqs" element={<Rfq />} />
              <Route path="/vendor/catalog" element={<Catalog />} />
              <Route path="/vendor/orders" element={<Orders />} />
              <Route path="/vendor/messages" element={<Messages />} />
            </Route>
            <Route element={<ProductVendorLayout />}>
              <Route path="/product-vendor-profile" element={<ProductVendorProfile />} /> 
              <Route path="/product-vendor-dashboard" element={<ProductDashboard />} />
              <Route path="/product-vendor-rfqs" element={<ProductRfq />} />
              <Route path="/product-vendor-catalog" element={<ProductCatalog />} />
              <Route path="/product-vendor-orders" element={<ProductOrders />} />
              <Route path="/product-vendor-messages" element={<ProductMessages />} />
            </Route>


            {/* CATCH-ALL "*" ROUTE at the end */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;