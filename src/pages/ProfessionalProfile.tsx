import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  User,
  Home,
  Calendar,
  Award,
  Briefcase,
  Wallet,
  Settings,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import ProfessionalSIdebar from "@/components/professional/ProfessionalSidebar";
import PersonalInfoForm from "@/components/professional/forms/PersonalInfoForm";
import SkillsForm from "@/components/professional/forms/SkillsForm";
import CertificationsForm from "@/components/professional/forms/CertificationsForm";
import ExperienceForm from "@/components/professional/forms/ExperienceForm";
// import AvailabilityCalendar from "@/components/professional/forms/AvailabilityCalendar";
import PaymentSettingsForm from "@/components/professional/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/professional/forms/AccountSettingsForm";
import ProfessionalSidebar from "@/components/professional/ProfessionalSidebar";

// Type for the menu and content sections
export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type ContentType =
  | "personal-info"
  | "skills"
  | "certifications"
  | "experience"
  | "availability"
  | "payment"
  | "account";

const ProfessionalProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get initial content type from URL or fallback
  const initialSection =
    (searchParams.get("section") as ContentType) || "personal-info";
  const [activeContent, setActiveContent] =
    useState<ContentType>(initialSection);

  const [profileCompletion, setProfileCompletion] = useState(35);

  const expertData = {
    name: "Rahul Sharma",
    expertise: "Mechanical Engineering",
    initials: "RS",
  };

  const menuItems: SidebarMenuItem[] = [
    { id: "personal-info", label: "Personal Info", icon: <User size={18} /> },
    {
      id: "skills",
      label: "Skills & Expertise",
      icon: <LayoutGrid size={18} />,
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: <Award size={18} />,
    },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    // {
    //   id: "availability",
    //   label: "Availability Calendar",
    //   icon: <Calendar size={18} />,
    // },
    { id: "payment", label: "Payment Settings", icon: <Wallet size={18} /> },
    { id: "account", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile", active: true },
  ];

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
    navigate(`/professional-profile?section=${contentType}`);
  };

  // Sync with URL on mount or URL change
  useEffect(() => {
    const section = searchParams.get("section") as ContentType;
    if (section && section !== activeContent) {
      setActiveContent(section);
    }
  }, [searchParams]);

  const renderContent = () => {
    switch (activeContent) {
      case "personal-info":
        return <PersonalInfoForm />;
      case "skills":
        return <SkillsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "experience":
        return <ExperienceForm />;
     
      case "payment":
        return <PaymentSettingsForm />;
      case "account":
        return <AccountSettingsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />

      <div className="flex flex-grow pt-16">
        <ProfessionalSidebar
          expertData={expertData}
          menuItems={menuItems}
          activeMenuItem={activeContent}
          onMenuItemClick={handleMenuItemClick}
          profileCompletion={profileCompletion}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Card className="w-full max-w-8xl mx-auto shadow-sm">
            {renderContent()}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
