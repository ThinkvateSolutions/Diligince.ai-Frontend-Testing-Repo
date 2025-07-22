import { useState, useEffect } from "react";
import { ProductVendorHeader } from "@/components/vendor/ProductVendorHeader";
import { ProductVendorSidebar } from "@/components/vendor/product/ProductVendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/ProductVendor/CompanyInfoForm";
import ProductCatalogSection from "@/components/vendor/forms/ProductVendor/ProductCatalogSection";
import BrandsPartnersSection from "@/components/vendor/forms/ProductVendor/BrandsPartnersSection";
import CertificationsSection from "@/components/vendor/forms/ProductVendor/CertificationsSection";
import ShippingReturnsSection from "@/components/vendor/forms/ProductVendor/ShippingReturnsSection";
import PaymentSettingsForm from "@/components/vendor/forms/ProductVendor/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/ProductVendor/AccountSettingsForm";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

import { calculateProfileCompleteness } from "@/utils/profileCompleteness";

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
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const user={
    "Name":"Lokesh"
  }
  
  const [activeContent, setActiveContent] = useState<ContentType>("company-info");
  
  // Redirect if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/signin');
  //   }
  // }, [isAuthenticated, navigate]);
  
  // Calculate actual profile completion based on current user data
  const location = useLocation(); // ← Add this line

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const section = params.get("section");

  const validSections: ContentType[] = [
    "company-info",
    "product-catalog",
    "brands-partners",
    "certifications",
    "shipping-returns",
    "payment-settings",
    "account-settings",
  ];

  if (section && validSections.includes(section.toLowerCase() as ContentType)) {
    setActiveContent(section.toLowerCase() as ContentType);
  }
}, [location]);


  const profileCompletion = user ? calculateProfileCompleteness(user) : {
    percentage: 0,
    isComplete: false,
    missingFields: [],
    completedFields: []
  };
  
  // Vendor data from user context
  const vendorData = {
    companyName: user?.profile?.businessName || "TechPro Supplies",
    specialization: user?.profile?.specialization || "Industrial Components",
    initials: user?.initials || "TS",
    isVerified: true
  };

  // Handle profile completion action
  const handleCompleteProfile = () => {
    navigate('/profile-completion');
  };

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProductVendorHeader />
      
      <div className="flex flex-grow pt-16">
        <ProductVendorSidebar
          activeSection={activeContent}
          onSectionChange={handleMenuItemClick}
          vendorData={vendorData}
          profileCompletion={profileCompletion.percentage}
        />
        
          <main className="flex-1 overflow-y-auto bg-gray-50 px-6 lg:px-8">
  <div className="max-w-screen-2xl w-full mx-auto py-8 space-y-6">
    {/* <ProfileCompletionWidget
      completion={profileCompletion}
      onCompleteProfile={handleCompleteProfile}
      showCompleteButton={!profileCompletion.isComplete}
    /> */}

    {renderContent()}
  </div>
</main>
      </div>
    </div>
  );
};

export default ProductVendorProfile;
