import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdownPro";
import ProfileDropdown from "./ProfileDropdownPro";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface ExpertHeaderProps {
  navItems: NavItem[];
}

const ExpertHeader = ({ navItems }: ExpertHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#722ed1] text-white z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Icon (Mobile) */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold">Diligince.ai</h1>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to="/some-invalid-path"
                className={`flex items-center gap-2 text-sm ${
                  item.active
                    ? "text-white font-medium"
                    : "text-purple-200 hover:text-white transition-colors"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <ProfileDropdown userInitials="RS" />
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#722ed1] px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to="/some-invalid-path"
              className={`flex items-center gap-2 py-2 text-sm ${
                item.active
                  ? "text-white font-medium"
                  : "text-purple-200 hover:text-white transition-colors"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default ExpertHeader;
