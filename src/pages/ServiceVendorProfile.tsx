
import { useState, useEffect } from "react";
import { ServiceVendorHeader } from "@/components/vendor/ServiceVendorHeader";
import { ServiceVendorSidebar } from "@/components/vendor/service/ServiceVendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/CompanyInfoForm";
import TeamMembersSection from "@/components/vendor/forms/TeamMembersSection";
import ServicesSkillsForm from "@/components/vendor/forms/ServicesSkillsForm";
import CertificationsSection from "@/components/vendor/forms/CertificationsSection";
import ProjectsPortfolioSection from "@/components/vendor/forms/ProjectsPortfolioSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";

import { useNavigate, useLocation } from "react-router-dom";


// Types for content sections
export type ContentType = 
  | "company-info" 
  | "team-members" 
  | "services-skills" 
  | "certifications" 
  | "projects-portfolio" 
  | "payment-settings" 
  | "account-settings";

const ServiceVendorProfile = () => {
  const { isAuthenticated, profileCompletion } = useUser();
  const user={
    "Name":"Lokesh"
  }
  const navigate = useNavigate();
  
  const [activeContent, setActiveContent] = useState<ContentType>("company-info");
  
  console.log("ServiceVendorProfile - user:", user);
  console.log("ServiceVendorProfile - profileCompletion:", profileCompletion);
  
  // Redirect if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/signin');
  //   }
  // }, [isAuthenticated, navigate]);
  
  // Vendor data from user context
  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const section = params.get("section");

  if (section) {
    const validSections: ContentType[] = [
      "company-info",
      "team-members",
      "services-skills",
      "certifications",
      "projects-portfolio",
      "payment-settings",
      "account-settings",
    ];

    if (validSections.includes(section.toLowerCase() as ContentType)) {
      setActiveContent(section.toLowerCase() as ContentType);
    }
  }
}, [location]);



  const vendorData = {
    companyName: user?.profile?.businessName || "TechServe Solutions",
    specialization: user?.profile?.specialization || "Industrial Automation",
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

  if (!user) {
    return null;
  }

    return (
    // 1. Outermost container: Takes up the full screen height and sets up a vertical flex layout.
    //    'overflow-hidden' here is CRITICAL to prevent the body/html scrollbar.
    <div className="h-screen flex flex-col bg-gray-50">
      
      {/* 2. Header: It's now a direct flex item. 
             'flex-shrink-0' prevents it from shrinking if content grows. */}
      <div className="flex-shrink-0">
        <ServiceVendorHeader />
      </div>

      {/* 3. Main Content Wrapper: This container will hold the sidebar and the main area.
             - 'flex-1': This is the magic. It tells this div to grow and take up ALL remaining vertical space.
             - 'flex': Sets up a horizontal flex layout for its children (sidebar and main).
             - 'overflow-hidden': Prevents this container itself from scrolling, forcing the scroll behavior down to its children. */}
      <div className="flex flex-1 pt-16">

        {/* 4. Sidebar: It takes its natural width. */}
        <ServiceVendorSidebar
          activeSection={activeContent}
          onSectionChange={handleMenuItemClick}
          vendorData={vendorData}
          profileCompletion={profileCompletion.percentage}
        />
        
        {/* 5. Main Scrollable Area: This is where the inner scrollbar will live.
               - 'flex-1': Takes up all remaining horizontal space next to the sidebar.
               - 'overflow-y-auto': THIS IS THE KEY. It adds a vertical scrollbar ONLY when the content inside it is taller than the element itself. */}
         <main className="flex-1 overflow-y-auto min-h-0">
          {/* We add padding here inside the scrollable container */}
          <div className="max-w-screen-2xl w-full mx-auto p-6 lg:p-8 space-y-6">
            
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
};

export default ServiceVendorProfile;

function setActiveMenu(matched: string) {
  throw new Error("Function not implemented.");
}
