import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { VendorSidebarProps } from "@/types/vendor-sidebar";

const getVendorTypeColor = (vendorType: string) => {
  switch (vendorType) {
    case 'service':
      return {
        avatar: 'bg-orange-100',
        text: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200',
        active: 'bg-orange-50 text-orange-700 border-r-4 border-orange-600 font-medium',
        progress: 'bg-orange-100',
        progressIndicator: 'bg-orange-600'
      };
    case 'product':
      return {
        avatar: 'bg-yellow-100',
        text: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200',
        active: 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-600 font-medium',
        progress: 'bg-yellow-100',
        progressIndicator: 'bg-yellow-600'
      };
    case 'logistics':
      return {
        avatar: 'bg-blue-100',
        text: 'text-[#eb2f96]',
        badge: 'bg-[#eb2f96] hover:bg-[#eb2f96]/90 text-white',
        active: 'bg-[#eb2f96]/10 text-[#eb2f96] border-r-4 border-[#eb2f96] font-medium',
        progress: 'bg-[#eb2f96]/10',
        progressIndicator: 'bg-[#eb2f96]'
      };
    default:
      return {
        avatar: 'bg-gray-100',
        text: 'text-gray-600',
        badge: 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200',
        active: 'bg-gray-50 text-gray-700 border-r-4 border-gray-600 font-medium',
        progress: 'bg-gray-100',
        progressIndicator: 'bg-gray-600'
      };
  }
};

export const BaseSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion,
  menuItems,
  vendorType
}: VendorSidebarProps) => {
  const colors = getVendorTypeColor(vendorType);
  const isLogistics = vendorType === 'logistics';

  return (
    <aside className="sticky top-16 w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block h-[calc(100vh-4rem)]">
      {/* <div className="flex flex-col h-full"> */}
        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 px-4 border-b border-gray-200">
          <div className="relative mb-4">
            <Avatar className={`h-24 w-24   ${colors.avatar}`}>
              <AvatarFallback className={`${colors.text} text-2xl font-medium`}>
                {vendorData.initials}
              </AvatarFallback>
            </Avatar>
            {/* {vendorData.isVerified && (
              <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
            )} */}
          </div>
          
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-1 line-clamp-2">
            {vendorData.companyName}
          </h2>
          
          <div className="flex flex-col items-center gap-1.5 mt-1">
            {isLogistics ? (
              <>
                
                <Badge variant="secondary" className={`${colors.badge} text-xs`}>
                  {vendorData.specialization}
                </Badge>
              </>
            ) : (
              <Badge variant="secondary" className={`${colors.badge} text-xs`}>
                {vendorData.specialization}
              </Badge>
            )}
          </div>
          
          <div className="w-full mt-4 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Profile Completion</span>
              <span className={`${colors.text} font-medium`}>{profileCompletion}%</span>
            </div>
            <Progress 
              value={profileCompletion} 
              className={`h-1.5 ${colors.progress}`} 
              indicatorClassName={colors.progressIndicator} 
            />
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 py-3 overflow-hidden hover:overflow-y-auto">
          <ul className="space-y-0.5">
            {menuItems.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => onSectionChange(item.id)} 
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs ${
                    activeSection === item.id 
                      ? `${colors.active}`
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className={activeSection === item.id ? colors.text : "text-gray-500"}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      {/* </div> */}
    </aside>
  );
};