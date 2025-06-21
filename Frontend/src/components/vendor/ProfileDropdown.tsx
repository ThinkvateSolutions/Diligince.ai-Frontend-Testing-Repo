import {
  User, // For Company Info
  CreditCard,
  LogOut,
  Settings,
  Users, // For Team Members
  Briefcase, // For Services & Skills
  Award, // For Certifications
  Folder, // For Projects Portfolio
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

interface ProfileDropdownProps {
  userInitials: string;
}

const ProfileDropdown = ({ userInitials }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleNavigation = (section: string) => {
    navigate(`/service-vendor-profile?section=${section}`);
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
        {/* Header Section */}
        <div className="flex items-center gap-2 p-2">
          <div className="h-10 w-10 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm">
            {"TS"}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">TechServe Solutions</span>
            <span className="text-xs text-gray-500">techserve.com</span>
          </div>
        </div>
        
        {/* Main Navigation Items */}
        {/* "Company Info" is visible on all screen sizes */}
        <DropdownMenuItem onClick={() => handleNavigation("company-info")}>
          <User className="mr-2 h-4 w-4" />
          <span>Company Info</span>
        </DropdownMenuItem>

        {/* These items are hidden on medium screens and up (PC view) */}
        <DropdownMenuItem
          onClick={() => handleNavigation("team-members")}
          className="md:hidden"
        >
          <Users className="mr-2 h-4 w-4" />
          <span>Team Members</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("services-skills")}
          className="md:hidden"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          <span>Services & Skills</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("certifications")}
          className="md:hidden"
        >
          <Award className="mr-2 h-4 w-4" />
          <span>Certifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("projects-portfolio")}
          className="md:hidden"
        >
          <Folder className="mr-2 h-4 w-4" />
          <span>Projects Portfolio</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings */}
        <DropdownMenuItem
          onClick={() => handleNavigation("payment-settings")}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Payment Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
           onClick={() => handleNavigation("account-settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:!text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;