
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SidebarMenuItem, ContentType } from "@/pages/ProfessionalProfile";

interface ExpertSidebarProps {
  expertData: {
    name: string;
    expertise: string;
    initials: string;
  };
  menuItems: SidebarMenuItem[];
  activeMenuItem: string;
  onMenuItemClick: (id: ContentType) => void;
  profileCompletion: number;
}

const ExpertSidebar = ({
  expertData,
  menuItems,
  activeMenuItem,
  onMenuItemClick,
  profileCompletion,
}: ExpertSidebarProps) => {
  return (
    <aside className="sticky top-16 w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto max-h-[calc(100vh-4rem)]">

      <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
        <Avatar className="h-24 w-24 mb-4 bg-purple-100">
          <AvatarFallback className="text-purple-600 text-2xl font-medium">
            {expertData.initials}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-lg font-semibold text-gray-800">{expertData.name}</h2>
        
        <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200">
          {expertData.expertise}
        </Badge>
        
        <div className="w-full mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile Completion</span>
            <span className="text-purple-600 font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2 bg-purple-100" indicatorClassName="bg-purple-600" />
        </div>
      </div>
      
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuItemClick(item.id as ContentType)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                  activeMenuItem === item.id
                    ? "bg-purple-50 text-purple-700 border-r-4 border-purple-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={activeMenuItem === item.id ? "text-purple-600" : "text-gray-500"}>
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

export default ExpertSidebar;










// import React, { useState } from "react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { SidebarMenuItem, ContentType } from "@/pages/ProfessionalProfile";
// import { Menu } from "lucide-react";

// interface ExpertSidebarProps {
//   expertData: {
//     name: string;
//     expertise: string;
//     initials: string;
//   };
//   menuItems: SidebarMenuItem[];
//   activeMenuItem: string;
//   onMenuItemClick: (id: ContentType) => void;
//   profileCompletion: number;
// }

// const ExpertSidebar = ({
//   expertData,
//   menuItems,
//   activeMenuItem,
//   onMenuItemClick,
//   profileCompletion,
// }: ExpertSidebarProps) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const SidebarContent = (
//     <>
//       <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
//         <Avatar className="h-24 w-24 mb-4 bg-purple-100">
//           <AvatarFallback className="text-purple-600 text-2xl font-medium">
//             {expertData.initials}
//           </AvatarFallback>
//         </Avatar>

//         <h2 className="text-lg font-semibold text-gray-800">{expertData.name}</h2>

//         <Badge
//           variant="secondary"
//           className="mt-2 bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200"
//         >
//           {expertData.expertise}
//         </Badge>

//         <div className="w-full mt-6 space-y-2">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Profile Completion</span>
//             <span className="text-purple-600 font-medium">
//               {profileCompletion}%
//             </span>
//           </div>
//           <Progress
//             value={profileCompletion}
//             className="h-2 bg-purple-100"
//             indicatorClassName="bg-purple-600"
//           />
//         </div>
//       </div>

//       <nav className="py-4">
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => {
//                   onMenuItemClick(item.id as ContentType);
//                   setMobileOpen(false); // auto close on mobile
//                 }}
//                 className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
//                   activeMenuItem === item.id
//                     ? "bg-purple-50 text-purple-700 border-r-4 border-purple-600 font-medium"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <span
//                   className={
//                     activeMenuItem === item.id
//                       ? "text-purple-600"
//                       : "text-gray-500"
//                   }
//                 >
//                   {item.icon}
//                 </span>
//                 <span>{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden p-3 text-purple-700"
//         onClick={() => setMobileOpen(true)}
//       >
//         <Menu size={24} />
//       </button>

//       {/* Desktop Sidebar */}
//       <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
//         {SidebarContent}
//       </aside>

//       {/* Mobile Sidebar Overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* Overlay background */}
//           <div
//             className="fixed inset-0 bg-black opacity-40"
//             onClick={() => setMobileOpen(false)}
//           />
//           {/* Sidebar drawer */}
//           <aside className="relative w-64 bg-white border-r border-gray-200 z-50 h-full overflow-y-auto">
//             <button
//               className="absolute top-2 right-2 text-gray-600"
//               onClick={() => setMobileOpen(false)}
//             >
//               ✕
//             </button>
//             {SidebarContent}
//           </aside>
//         </div>
//       )}
//     </>
//   );
// };

// export default ExpertSidebar;
