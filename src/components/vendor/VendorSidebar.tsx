// 
import { Building, Users, Briefcase, Award, FolderOpen, CreditCard, Settings, Wallet } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ContentType } from "@/pages/ServiceVendorProfile";

interface VendorSidebarProps {
  vendorData: {
    companyName: string;
    specialization: string;
    initials: string;
    isVerified: boolean;
  };
  activeMenuItem: string;
  onMenuItemClick: (id: ContentType) => void;
  profileCompletion: number;
}

const VendorSidebar = ({
  vendorData,
  activeMenuItem,
  onMenuItemClick,
  profileCompletion,
}: VendorSidebarProps) => {
  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <Building size={18} /> },
    { id: "team-members", label: "Team Members", icon: <Users size={18} /> },
    { id: "services-skills", label: "Services & Skills", icon: <Briefcase size={18} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
    { id: "projects-portfolio", label: "Projects Portfolio", icon: <FolderOpen size={18} /> },
    { id: "payment-settings", label: "Payment Settings", icon: <Wallet size={18} /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  if (!vendorData) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    // The layout is correct as per your target style
    <aside className="sticky top-16 w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto max-h-[calc(100vh-4rem)]">

      <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
        <div className="relative">
          {/* --- FIX: Using orange theme and correct vendorData prop --- */}
          <Avatar className="h-24 w-24 mb-4 bg-orange-100">
            <AvatarFallback className="text-orange-600 text-2xl font-medium">
              {vendorData.initials}
            </AvatarFallback>
          </Avatar>
          {/* Added back the verified checkmark logic */}
          {vendorData.isVerified && (
            <div className="absolute bottom-4 right-0 transform translate-x-1/4 translate-y-1/4">
              <div className="flex items-center justify-center h-7 w-7 bg-green-500 rounded-full border-2 border-white">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
              </div>
            </div>
          )}
        </div>
        
        {/* --- FIX: Using correct vendorData.companyName prop --- */}
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">{vendorData.companyName}</h2>
        
        {/* --- FIX: Using consistent orange theme for the badge --- */}
        <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200">
          {vendorData.specialization}
        </Badge>
        
        <div className="w-full mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile Completion</span>
            {/* --- FIX: Using orange theme for percentage text --- */}
            <span className="text-orange-600 font-medium">{profileCompletion}%</span>
          </div>
          {/* --- FIX: Using orange theme for progress bar --- */}
          <Progress value={profileCompletion} className="h-2 bg-orange-100" indicatorClassName="bg-orange-600" />
        </div>
      </div>
      
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuItemClick(item.id as ContentType)}
                // --- FIX: Using orange theme for active/inactive menu items ---
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                  activeMenuItem === item.id
                    ? "bg-orange-50 text-orange-700 border-r-4 border-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {/* --- FIX: Using orange theme for active icon --- */}
                <span className={activeMenuItem === item.id ? "text-orange-600" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default VendorSidebar;