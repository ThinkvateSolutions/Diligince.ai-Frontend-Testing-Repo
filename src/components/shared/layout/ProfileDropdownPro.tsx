import {
  User,
  CreditCard,
  LogOut,
  Settings,
  Calendar,
  Briefcase,
  Award,
  LayoutGrid,
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

const ProfileDropdownPro = ({ userInitials }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleNavigation = (section: string) => {
    navigate(`/professional-profile?section=${section}`);
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
          <div className="h-10 w-10 rounded-full bg-purple-800 flex items-center justify-center text-white text-sm">
            {userInitials}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Rahul Sharma</span>
            <span className="text-xs text-gray-500">rahul@example.com</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Main Navigation Items */}
        <DropdownMenuItem
          onClick={() => handleNavigation("personal-info")}
          
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

      

       
        <DropdownMenuItem
          onClick={() => handleNavigation("skills")}
          className="flex md:hidden"
        >
          <LayoutGrid className="mr-2 h-4 w-4" />
          <span>Skills & Expertise</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("certifications")}
          className="flex md:hidden"
        >
          <Award className="mr-2 h-4 w-4" />
          <span>Certifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("experience")}
          className="flex md:hidden"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          <span>Experience</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("calendar")}
          className="flex md:hidden"
        >
          <Calendar className="mr-2 h-4 w-4" />
          <span>Calendar</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings */}
        <DropdownMenuItem
          onClick={() => handleNavigation("payment")}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Payment Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigation("account")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>

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

export default ProfileDropdownPro;
