import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  X,
  LayoutDashboard,
  ClipboardList,
  Users,
  MessageSquare,
  FileText,
  Briefcase,
  UserCog
} from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const PurchaseOrderHeader: React.FC = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="w-full bg-[#1890ff] text-white fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left: Logo + Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Hamburger only on mobile */}
              <button
                className="lg:hidden text-white"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link to="/industry-dashboard" className="text-xl font-bold">
                Diligince.ai
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link
                  to="/industry-dashboard"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-blue-600 flex items-center gap-2",
                    isActive("/industry-dashboard") && "bg-blue-600"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/create-requirement"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-blue-600 flex items-center gap-2",
                    isActive("/create-requirement") && "bg-blue-600"
                  )}
                >
                  <ClipboardList className="w-4 h-4" />
                  Requirements
                </Link>

                {/* Stakeholders Dropdown */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "text-white bg-transparent hover:bg-blue-600 flex items-center gap-2",
                          (isActive("/vendors") || isActive("/experts")) &&
                            "bg-blue-600"
                        )}
                      >
                        <Users className="w-4 h-4" />
                        Stakeholders
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white p-2 rounded-md shadow-md">
                        <ul className="grid gap-2 w-[200px]">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/vendors"
                                className="block p-2 rounded hover:bg-blue-100 flex items-center gap-2"
                              >
                                <Briefcase className="w-4 h-4" />
                                Vendors
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/experts"
                                className="block p-2 rounded hover:bg-blue-100 flex items-center gap-2"
                              >
                                <UserCog className="w-4 h-4" />
                                Experts
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Link
                  to="/messages"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-blue-600 flex items-center gap-2",
                    isActive("/messages") && "bg-blue-600"
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </Link>

                <Link
                  to="/documents"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-blue-600 flex items-center gap-2",
                    isActive("/documents") && "bg-blue-600"
                  )}
                >
                  <FileText className="w-4 h-4" />
                  Documents
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <ProfileDropdown userInitials="SPL" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-10">
          <nav className="flex flex-col px-4 py-4 text-gray-800 space-y-3">
            <Link
              to="/industry-dashboard"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/create-requirement"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ClipboardList className="w-4 h-4" />
              Requirements
            </Link>
            <Link
              to="/vendors"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <Briefcase className="w-4 h-4" />
              Vendors
            </Link>
            <Link
              to="/experts"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <UserCog className="w-4 h-4" />
              Experts
            </Link>
            <Link
              to="/messages"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <MessageSquare className="w-4 h-4" />
              Messages
            </Link>
            <Link
              to="/documents"
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FileText className="w-4 h-4" />
              Documents
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default PurchaseOrderHeader;