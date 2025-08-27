import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HeaderConfig } from "@/utils/navigationConfigs";
import { NotificationBell } from "@/components/shared/notifications/NotificationBell";
import ProfileDropdown from "./ProfileDropDown";

interface GenericHeaderProps {
  config: HeaderConfig;
  className?: string;
}
const getProfileTypeFromHref = (href: string): "industry" | "professional" | "service-vendor" | "product-vendor"|"logistics-vendor" | null => {
  if (href.includes("industry")) return "industry";
  if (href.includes("professional")) return "professional";
  if (href.includes("service-vendor")) return "service-vendor";
  if (href.includes("product-vendor")) return "product-vendor";
  if (href.includes("logistics-vendor")) return "logistics-vendor";
  return null;
};

const getThemeFromHref = (href: string) => {
  if (href.includes("industry")) {
    return {
      navActiveBg: "bg-[#005A9E]",
      navHoverBg: "hover:bg-[#005A9E]",
      layout: "w-full px-[50px]",
    };
  } else if (href.includes("service-vendor")) {
    return {
      navActiveBg: "bg-[#993C00]",
      navHoverBg: "hover:bg-[#F78F4D]",
      layout: "w-full px-[50px]",
    };
  } else if (href.includes("product-vendor")) {
    return {
      navActiveBg: "bg-[#B37400]",
      navHoverBg: "hover:bg-[#DDAA33]",
      layout: "w-full px-[50px]",
    };
  } else if (href.includes("logistics-vendor")) {
    return {
      // navActiveBg: "bg-[#eb2f96]",
      // navHoverBg: "hover:bg-[#F58BAD]",
      // layout: "w-full px-[50px]",
      navActiveBg: "bg-[#eb2f96]",
      navHoverBg: "hover:bg-[#F58BAD]",
      layout: "w-full px-[50px]",
    };
  } else if (href.includes("professional")) {
    return {
      navActiveBg: "bg-[#453262]",
      navHoverBg: "hover:bg-[#B39DDB]",
      layout: "w-full px-[50px]",
    };
  }

  return {
    navActiveBg: "bg-[#333]",
    navHoverBg: "hover:bg-[#555]",
    layout: "container mx-auto px-6",
  };
};

export const GenericHeader = ({ config, className = "" }: GenericHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const profileType = getProfileTypeFromHref(config.brandHref);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const { navActiveBg, navHoverBg, layout } = getThemeFromHref(config.brandHref);

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${config.theme.bgColor} ${config.theme.textColor} z-50 shadow-md ${className}`}>
      <div className={`h-full flex items-center justify-between ${layout}`}>
        {/* Left Section */}
        <div className="flex items-center gap-10 ml-[40px]">
          <Link to={config.brandHref} className="text-xl font-bold">
            {config.brandName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {config.navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  location.pathname === item.href || item.active
                    ? `${navActiveBg} text-white font-semibold`
                    : `${navHoverBg} hover:bg-opacity-90 text-white`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${config.theme.buttonHoverColor}`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <NotificationBell theme={config.theme} />
          {profileType && (
  <ProfileDropdown userInitials={config.avatarInitials} profileType={profileType} />
)}

        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${config.theme.bgColor} border-t border-opacity-20`}>
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {config.navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-2 px-3 rounded text-sm transition-colors ${
                  location.pathname === item.href || item.active
                    ? `${config.theme.textColor} font-medium bg-black bg-opacity-10`
                    : `${config.theme.hoverColor} hover:bg-black hover:bg-opacity-10`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
