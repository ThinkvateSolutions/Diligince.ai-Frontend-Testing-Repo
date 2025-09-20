import { useState } from "react"; // <--- ADD THIS LINE
import { useSearchParams } from "react-router-dom";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/CompanyInfoForm";
import TeamMembersSection from "@/components/vendor/forms/TeamMembersSection";
import ServicesSkillsForm from "@/components/vendor/forms/ServicesSkillsForm";
import CertificationsSection from "@/components/vendor/forms/CertificationsSection";
import ProjectsPortfolioSection from "@/components/vendor/forms/ProjectsPortfolioSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";

export type ContentType =
  | "company-info"
  | "team-members"
  | "services-skills"
  | "certifications"
  | "projects-portfolio"
  | "payment-settings"
  | "account-settings";

const ServiceVendorProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeContent = (searchParams.get("section") || "company-info") as ContentType;

  // This will now work correctly because useState is imported
  const [profileCompletion] = useState(65); 

  const vendorData = {
    companyName: "TechServe Solutions",
    specialization: "Industrial Automation",
    initials: "TS",
    isVerified: true,
  };

  const handleMenuItemClick = (contentType: ContentType) => {
    setSearchParams({ section: contentType });
  };

  const renderContent = () => {
    switch (activeContent) {
      case "company-info":
        return <CompanyInfoForm />;
      case "team-members":
        return <TeamMembersSection />;
      case "services-skills":
        return <ServicesSkillsForm />;
      case "certifications":
        return <CertificationsSection />;
      case "projects-portfolio":
        return <ProjectsPortfolioSection />;
      case "payment-settings":
        return <PaymentSettingsForm />;
      case "account-settings":
        return <AccountSettingsForm />;
      default:
        return <CompanyInfoForm />;
    }
  };

  return (
    <div className="flex flex-grow">
      <VendorSidebar
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

 export default ServiceVendorProfile;