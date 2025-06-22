import { Outlet } from "react-router-dom";
import VendorHeader from "@/components/vendor/VendorHeader";


const VendorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Renders the fixed header for all vendor pages */}
      <VendorHeader />

      
      {/* This div adds the necessary padding to prevent content from overlapping with the fixed header */}
      <div className="pt-16">
        {/* The Outlet renders the specific child route component (e.g., ServiceVendorProfile, VendorDashboardPage) */}
        <Outlet />
      </div>
    </div>
  );

};

export default VendorLayout;