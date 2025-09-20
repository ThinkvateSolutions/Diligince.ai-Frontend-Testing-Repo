import {
  User,
  CreditCard,
  LogOut,
  Settings,
  FileText,
  Users,
  Building,
  Lock,
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
    navigate(`/industry-profile?section=${section}`);
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
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
            {userInitials}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Steel Plant Ltd.</span>
            <span className="text-xs text-gray-500">industry@example.com</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleNavigation("company")}>
          <Building className="mr-2 h-4 w-4" />
          <span>Company Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("team")}
          className="flex md:hidden"
        >
          <Users className="mr-2 h-4 w-4" />
          <span>Team Members</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("documents")}
          className="flex md:hidden"
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Documents</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("payment")}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Payment Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("security")}
          className="cursor-pointer"
        >
          <Lock className="mr-2 h-4 w-4" />
          <span>Security & Login</span>
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

export default ProfileDropdown;
