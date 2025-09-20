import { useState } from "react";
import {
  Building,
  FileText,
  Users,
  CreditCard,
  Bell,
  Lock,
  Mail,
  User,
  Home,
  Menu,
  X,
} from "lucide-react";

  import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PurchaseOrderHeader from "@/components/purchase-order/PurchaseOrderHeader";
import CompanyProfile from "@/pages/industry-profile/Companyprofile";
import PaymentSettings from "@/pages/industry-profile/Payment";
import Teammembers from "@/pages/industry-profile/Teammembers";
import Documents from "@/pages/industry-profile/Documents";
import Notification from "@/pages/industry-profile/Notification";
import Security from "@/pages/industry-profile/Security";
import { ContentType } from "@/pages/industry-profile/Contenttype";

const IndustryProfile = () => {
  const [activeMenu, setActiveMenu] = useState<ContentType>(() => {
  return (localStorage.getItem("activeMenu") as ContentType) || "Company Profile";
});
  const [profileCompletion] = useState(90);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [companyName] = useState("Steel Plant Ltd.");
  const [industryType] = useState("Manufacturing - Steel Processing");


  useEffect(() => {
  localStorage.setItem("activeMenu", activeMenu);
}, [activeMenu]);

  const location = useLocation();

    const sectionMap: Record<string, ContentType> = {
      company: "Company Profile",
      team: "Team Members",
      documents: "Documents & Certification",
      payment: "Payment Settings",
      security: "Security & Login",
    };

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const section = params.get("section");
      if (section && sectionMap[section]) {
        setActiveMenu(sectionMap[section]);
      }
    }, [location.search]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = [
    { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
    { name: "Team Members", icon: <Users className="w-5 h-5" /> },
    { name: "Documents & Certification", icon: <FileText className="w-5 h-5" /> },
    { name: "Payment Settings", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Notification Preferences", icon: <Bell className="w-5 h-5" /> },
    { name: "Security & Login", icon: <Lock className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "Company Profile":
        return <CompanyProfile />;
      case "Team Members":
        return <Teammembers />;
      case "Documents & Certification":
        return <Documents />;
      case "Payment Settings":
        return <PaymentSettings />;
      case "Notification Preferences":
        return <Notification />;
      case "Security & Login":
        return <Security />;
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20">
        {/* Mobile Sidebar Toggle */}
        <button className="lg:hidden text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <PurchaseOrderHeader />

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
            {getInitials(companyName)}
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-grow pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto z-10`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-3xl font-bold mb-4">
              {getInitials(companyName)}
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">{companyName}</h2>
            <span className="bg-blue-50 text-blue-500 text-sm px-4 py-1 rounded-full border border-blue-200 mb-6">
              {industryType.split(" - ")[0]}
            </span>

            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Profile Completion</span>
                <span className="text-sm text-blue-500">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                      activeMenu === item.name
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveMenu(item.name as ContentType);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 overflow-y-auto">
         <div className="max-w-8xl mx-auto">
            
            <Card className="p-6">{renderContent()}</Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndustryProfile;
