import { useState } from "react";
import {
  Bell,
  MessageSquare,
  FileText,
  LayoutGrid,
  ShoppingCart,
  Home,
  Menu,
  X,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const VendorHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/vendor/dashboard" },
    { label: "RFQs", icon: <FileText size={18} />, href: "/vendor/rfqs" },
    { label: "Catalog", icon: <LayoutGrid size={18} />, href: "/vendor/catalog" },
    { label: "Orders", icon: <ShoppingCart size={18} />, href: "/vendor/orders" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/vendor/messages" },
   
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#faad14] text-white z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-10">
          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="text-xl font-bold">Diligince.ai</Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.label === "Profile") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-yellow-100 hover:text-white transition-colors cursor-not-allowed"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm ${
                      isActive
                        ? "text-white font-medium"
                        : "text-yellow-100 hover:text-white transition-colors"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <ProfileDropdown userInitials="TS" />
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faad14] px-4 pb-4 pt-2">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              if (item.label === "Profile") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-yellow-100 hover:text-white transition-colors cursor-not-allowed"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)} // Close on click
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm ${
                      isActive
                        ? "text-white font-medium"
                        : "text-yellow-100 hover:text-white transition-colors"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default VendorHeader;
