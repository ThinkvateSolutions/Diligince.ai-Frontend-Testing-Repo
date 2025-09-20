import { Outlet } from "react-router-dom";
import ProductVendorHeader from "@/components/vendor/ProductVendorHeader";


const ProductVendorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Renders the fixed header for all vendor pages */}
      <ProductVendorHeader />

      
      {/* This div adds the necessary padding to prevent content from overlapping with the fixed header */}
      <div className="pt-16">
        {/* The Outlet renders the specific child route component (e.g., ServiceVendorProfile, VendorDashboardPage) */}
        <Outlet />
      </div>
    </div>
  );

};

export default ProductVendorLayout;