
<<<<<<< HEAD
// import React, { useEffect } from "react";
// import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
// import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";
// import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
// import { useUser } from "@/contexts/UserContext";
// import { useNavigate } from "react-router-dom";

// const LogisticsVendorProfile = () => {
//   const {  profileCompletion } = useUser();
//   const navigate = useNavigate();
//   const user = {
//      name:"Balu"
//   }
 
//   console.log("LogisticsVendorProfile - profileCompletion:", profileCompletion);

//   // Redirect if not authenticated
//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     navigate('/signin');
//   //   }
//   // }, [isAuthenticated, navigate]);

//   // Handle profile completion action
//   const handleCompleteProfile = () => {
//     navigate('/profile-completion');
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-gray-50">
//       <LogisticsVendorHeader />
//       <div className="flex-1 pt-16">
//         <div className="flex">
//           <LogisticsVendorSidebar />
          
//           <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//             <div className="w-full max-w-4xl mx-auto">
//               {/* Profile Completion Widget - Always show for better user experience */}
//               <ProfileCompletionWidget
//                 completion={profileCompletion}
//                 onCompleteProfile={handleCompleteProfile}
//                 showCompleteButton={!profileCompletion.isComplete}
//               />
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogisticsVendorProfile;

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader"; // Assuming this is the correct path
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar"; // Assuming this is the correct path
import { CompanyInfoForm } from "@/components/vendor/logistics/CompanyInfoForm";
import { FleetEquipmentSection } from "@/components/vendor/logistics/FleetEquipmentSection";
import { ServiceAreasSection } from "@/components/vendor/logistics/ServiceAreasSection";
import { LicensesPermitsSection } from "@/components/vendor/logistics/LicensesPermitsSection";
import { DriversPersonnelSection } from "@/components/vendor/logistics/DriversPersonnelSection";
import PaymentSettingsForm from "@/components/vendor/logistics/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/logistics/AccountSettingsForm";
import { SpecializationFeatures } from "@/components/vendor/logistics/SpecializationFeatures";
import { CardContent } from "@/components/ui/card";
=======
<<<<<<< HEAD
import React, { useEffect } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
>>>>>>> 9b0ce35 (Initial commit)
import { useUser } from "@/contexts/UserContext";

type MenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

const LogisticsVendorProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<MenuSection>("company-info");
  const { user } = useUser();
  const profileCompletion = 65; // Example value

  // This useEffect hook listens for changes in the URL and updates the view
  useEffect(() => {
    const sectionFromUrl = searchParams.get('section') as MenuSection;
    if (sectionFromUrl) {
      setActiveSection(sectionFromUrl);
    } else {
      setActiveSection("company-info"); // Default to company-info
    }
  }, [searchParams]); // Re-runs whenever the URL search string changes

  // This function updates the URL when a sidebar item is clicked
  const handleSectionChange = (section: MenuSection) => {
    setSearchParams({ section });
  };

  const vendorData = {
    companyName: user?.name || "TransLog India",
    specialization: "Logistics Provider",
    initials: user?.name?.charAt(0) || "TL",
    isVerified: true
  };

  const renderContent = () => {
    switch (activeSection) {
      case "company-info": return <CompanyInfoForm />;
      case "fleet-equipment": return <FleetEquipmentSection />;
      case "service-areas": return <ServiceAreasSection />;
      case "licenses-permits": return <LicensesPermitsSection />;
      case "drivers-personnel": return <DriversPersonnelSection />;
      case "payment-settings": return <PaymentSettingsForm />;
      case "account-settings": return <AccountSettingsForm />;
      default: return <CompanyInfoForm />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <LogisticsVendorHeader />
<<<<<<< HEAD
=======
      <div className="flex-1 pt-16">
        <div className="flex">
          <LogisticsVendorSidebar />
          
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto">
              {/* Profile Completion Widget - Always show for better user experience */}
              <ProfileCompletionWidget
                completion={profileCompletion}
                onCompleteProfile={handleCompleteProfile}
                showCompleteButton={!profileCompletion.isComplete}
              />
            </div>
          </main>
        </div>
=======
// import React, { useEffect } from "react";
// import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
// import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";
// import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
// import { useUser } from "@/contexts/UserContext";
// import { useNavigate } from "react-router-dom";

// const LogisticsVendorProfile = () => {
//   const {  profileCompletion } = useUser();
//   const navigate = useNavigate();
//   const user = {
//      name:"Balu"
//   }
 
//   console.log("LogisticsVendorProfile - profileCompletion:", profileCompletion);

//   // Redirect if not authenticated
//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     navigate('/signin');
//   //   }
//   // }, [isAuthenticated, navigate]);

//   // Handle profile completion action
//   const handleCompleteProfile = () => {
//     navigate('/profile-completion');
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-gray-50">
//       <LogisticsVendorHeader />
//       <div className="flex-1 pt-16">
//         <div className="flex">
//           <LogisticsVendorSidebar />
          
//           <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//             <div className="w-full max-w-4xl mx-auto">
//               {/* Profile Completion Widget - Always show for better user experience */}
//               <ProfileCompletionWidget
//                 completion={profileCompletion}
//                 onCompleteProfile={handleCompleteProfile}
//                 showCompleteButton={!profileCompletion.isComplete}
//               />
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogisticsVendorProfile;

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader"; // Assuming this is the correct path
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar"; // Assuming this is the correct path
import { CompanyInfoForm } from "@/components/vendor/logistics/CompanyInfoForm";
import { FleetEquipmentSection } from "@/components/vendor/logistics/FleetEquipmentSection";
import { ServiceAreasSection } from "@/components/vendor/logistics/ServiceAreasSection";
import { LicensesPermitsSection } from "@/components/vendor/logistics/LicensesPermitsSection";
import { DriversPersonnelSection } from "@/components/vendor/logistics/DriversPersonnelSection";
import PaymentSettingsForm from "@/components/vendor/logistics/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/logistics/AccountSettingsForm";
import { SpecializationFeatures } from "@/components/vendor/logistics/SpecializationFeatures";
import { CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";

type MenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

const LogisticsVendorProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<MenuSection>("company-info");
  const { user } = useUser();
  const profileCompletion = 65; // Example value

  // This useEffect hook listens for changes in the URL and updates the view
  useEffect(() => {
    const sectionFromUrl = searchParams.get('section') as MenuSection;
    if (sectionFromUrl) {
      setActiveSection(sectionFromUrl);
    } else {
      setActiveSection("company-info"); // Default to company-info
    }
  }, [searchParams]); // Re-runs whenever the URL search string changes

  // This function updates the URL when a sidebar item is clicked
  const handleSectionChange = (section: MenuSection) => {
    setSearchParams({ section });
  };

  const vendorData = {
    companyName: user?.name || "TransLog India",
    specialization: "Logistics Provider",
    initials: user?.name?.charAt(0) || "TL",
    isVerified: true
  };

  const renderContent = () => {
    switch (activeSection) {
      case "company-info": return <CompanyInfoForm />;
      case "fleet-equipment": return <FleetEquipmentSection />;
      case "service-areas": return <ServiceAreasSection />;
      case "licenses-permits": return <LicensesPermitsSection />;
      case "drivers-personnel": return <DriversPersonnelSection />;
      case "payment-settings": return <PaymentSettingsForm />;
      case "account-settings": return <AccountSettingsForm />;
      default: return <CompanyInfoForm />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <LogisticsVendorHeader />
>>>>>>> 9b0ce35 (Initial commit)
      <div className="flex w-full flex-grow pt-16">
        <LogisticsVendorSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          vendorData={vendorData}
          profileCompletion={profileCompletion}
        />
        <main className="flex-1 p-7 overflow-auto">
          <div className="mx-auto space-y-8">
            {activeSection === "company-info" && (
              <div className="mb-8">
                <SpecializationFeatures />
              </div>
            )}
            <CardContent className="p-1">
              {renderContent()}
            </CardContent>
          </div>
        </main>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default LogisticsVendorProfile;
=======
<<<<<<< HEAD
export default LogisticsVendorProfile;
=======
export default LogisticsVendorProfile;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
