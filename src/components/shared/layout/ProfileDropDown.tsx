import {
  User,
  CreditCard,
  LogOut,
  Settings,
  FileText,
  Users,
  Building,
  Lock,
  Bell,
  Calendar,
  Briefcase,
  Award,
  LayoutGrid,
  Folder,
  Box,
  Tag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

type ProfileType = "industry" | "professional" | "service-vendor" | "product-vendor";

interface ProfileDropdownProps {
  userInitials: string;
  profileType: ProfileType;
}

const ProfileDropdown = ({ userInitials, profileType }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  const getProfileData = () => {
    switch (profileType) {
      case "industry":
        return {
          name: "Steel Plant Ltd.",
          subtext: "industry@example.com",
          color: "bg-blue-600",
          baseRoute: "/industry-profile",
          menuItems: [
            { label: "Company Profile", icon: <Building />, section: "company" },
            { label: "Team Members", icon: <Users />, section: "team", hideOnDesktop: true },
            { label: "Documents", icon: <FileText />, section: "documents", hideOnDesktop: true },
            { label: "Payment Settings", icon: <CreditCard />, section: "payment" },
            { label: "Notification Preferences", icon: <Bell />, section: "notifications", hideOnDesktop: true },
            { label: "Security & Login", icon: <Lock />, section: "security" },
          ],
        };

      case "professional":
        return {
          name: "Rahul Sharma",
          subtext: "rahul@example.com",
          color: "bg-purple-800",
          baseRoute: "/professional-profile",
          menuItems: [
            { label: "Profile", icon: <User />, section: "personal-info" },
            { label: "Skills & Expertise", icon: <LayoutGrid />, section: "skills", hideOnDesktop: true },
            { label: "Certifications", icon: <Award />, section: "certifications", hideOnDesktop: true },
            { label: "Experience", icon: <Briefcase />, section: "experience", hideOnDesktop: true },
            { label: "Calendar", icon: <Calendar />, section: "calendar", hideOnDesktop: true },
            { label: "Payment Settings", icon: <CreditCard />, section: "payment" },
            { label: "Account Settings", icon: <Settings />, section: "account" },
          ],
        };

      case "service-vendor":
        return {
          name: "TechServe Solutions",
          subtext: "techserve.com",
          color: "bg-orange-400",
          baseRoute: "/service-vendor-profile",
          menuItems: [
            { label: "Company Info", icon: <User />, section: "company-info" },
            { label: "Team Members", icon: <Users />, section: "team-members", hideOnDesktop: true },
            { label: "Services & Skills", icon: <Briefcase />, section: "services-skills", hideOnDesktop: true },
            { label: "Certifications", icon: <Award />, section: "certifications", hideOnDesktop: true },
            { label: "Projects Portfolio", icon: <Folder />, section: "projects-portfolio", hideOnDesktop: true },
            { label: "Payment Settings", icon: <CreditCard />, section: "payment-settings" },
            { label: "Account Settings", icon: <Settings />, section: "account-settings" },
          ],
        };

      case "product-vendor":
        return {
          name: "TechPro Solutions",
          subtext: "techPro.com",
          color: "bg-orange-400",
          baseRoute: "/product-vendor-profile",
          menuItems: [
            { label: "Company Info", icon: <User />, section: "company-info" },
            { label: "Product Catalog", icon: <Box />, section: "product-catalog", hideOnDesktop: true },
            { label: "Brands & Partners", icon: <Tag />, section: "brands-partners", hideOnDesktop: true },
            { label: "Certifications", icon: <Award />, section: "certifications", hideOnDesktop: true },
            { label: "Shipping & Returns", icon: <Truck />, section: "shipping-returns", hideOnDesktop: true },
            { label: "Payment Settings", icon: <CreditCard />, section: "payment-settings" },
            { label: "Account Settings", icon: <Settings />, section: "account-settings" },
          ],
        };

      default:
        return {
          name: "User",
          subtext: "example@example.com",
          color: "bg-gray-400",
          baseRoute: "/profile",
          menuItems: [],
        };
    }
  };

  const profile = getProfileData();

  const handleNavigation = (section: string) => {
    navigate(`${profile.baseRoute}?section=${section}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-black text-sm">
            {userInitials}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-2 p-2">
          <div className={`h-10 w-10 rounded-full ${profile.color} flex items-center justify-center text-white text-sm`}>
            {userInitials}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{profile.name}</span>
            <span className="text-xs text-gray-500">{profile.subtext}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {profile.menuItems.map(({ label, icon, section, hideOnDesktop }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => handleNavigation(section)}
            className={hideOnDesktop ? "md:hidden" : ""}
          >
            {icon}
            <span className="ml-2">{label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
