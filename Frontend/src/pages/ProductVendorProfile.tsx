
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductVendorSidebar from "@/components/vendor/ProductVendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/ProductVendor/CompanyInfoForm";
import ProductCatalogSection from "@/components/vendor/forms/ProductVendor/ProductCatalogSection";
import BrandsPartnersSection from "@/components/vendor/forms/ProductVendor/BrandsPartnersSection";
import CertificationsSection from "@/components/vendor/forms/ProductVendor/CertificationsSection";
import ShippingReturnsSection from "@/components/vendor/forms/ProductVendor/ShippingReturnsSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";

// Types for content sections
export type ContentType = 
  | "company-info" 
  | "product-catalog" 
  | "brands-partners" 
  | "certifications" 
  | "shipping-returns" 
  | "payment-settings" 
  | "account-settings";

const ProductVendorProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
    const activeContent = (searchParams.get("section") || "company-info") as ContentType;
  
    // This will now work correctly because useState is imported
    const [profileCompletion] = useState(65);
  // Mock vendor data
  const vendorData = {
    companyName: "TechPro Supplies",
    specialization: "Industrial Components",
    initials: "TS",
    isVerified: true
  };

  // Function to handle menu item click
   const handleMenuItemClick = (contentType: ContentType) => {
      setSearchParams({ section: contentType });
    };

  // Render active content based on selection
  const renderContent = () => {
    switch (activeContent) {
      case "company-info":
        return <CompanyInfoForm />;
      case "product-catalog":
        return <ProductCatalogSection />;
      case "brands-partners":
        return <BrandsPartnersSection />;
      case "certifications":
        return <CertificationsSection />;
      case "shipping-returns":
        return <ShippingReturnsSection />;
      case "payment-settings":
        return <PaymentSettingsForm />;
      case "account-settings":
        return <AccountSettingsForm />;
      default:
        return <CompanyInfoForm />;
    }
  };

  // The 'pt-16' class has been removed from the div below.
  return (
    <div className="flex flex-grow">
      <ProductVendorSidebar
        vendorData={vendorData}
        activeMenuItem={activeContent}
        onMenuItemClick={handleMenuItemClick}
        profileCompletion={profileCompletion}
      />
      
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default ProductVendorProfile;