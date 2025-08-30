import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { menuConfig } from '../config/menuConfig';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hoverSubmenu, setHoverSubmenu] = useState<string | null>(null);

  if (!user) return null;

  const menuItems = menuConfig[user.role];

  const handleLogout = () => {
    logout();
  };

  const toggleAccordion = (itemPath: string) => {
    if (isCollapsed) return;

    setExpandedMenus(prev =>
      prev.includes(itemPath)
        ? prev.filter(path => path !== itemPath)
        : [itemPath]
    );
  };

  const handleHoverSubmenu = (itemPath: string | null) => {
    if (isCollapsed) {
      setHoverSubmenu(itemPath);
    }
  };

  const userProfileItems = [
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      submenu: [
        { label: 'Account Settings', icon: SettingsIcon, path: '/settings/account-settings' },
        { label: 'Logout', icon: LogOut, path: '/logout' }
      ]
    }
  ]
  return (
    <aside className={`${isCollapsed ? 'w-16 justify-center' : 'w-80'} bg-[#1a365d] border-r border-[#E0E0E0] flex flex-col h-screen transition-all duration-300 relative group overflow-y-auto`}>
      {/* Header with Logo */}
      <div className="p-4 border-b border-[#E0E0E0]">
        <div className={`${isCollapsed ? 'justify-center' : 'justify-between'} flex items-center `}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#fff] rounded-md flex items-center justify-center font-bold text-white">
              <img src='./logo-main-no-bg.svg'></img>
            </div>
            {!isCollapsed && (
              // <span className="text-xl font-bold text-[#1A2A4F]">Deligence.ai</span>
              <span className="text-xl font-bold text-[#fff]">Deligence.ai</span>

            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1 text-[#fff] hover:bg-[#FAFAFA] hover:text-[#1a365d] rounded transition-colors ${isCollapsed ? 'absolute' : ''}`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-4 h-4 " />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 relative">
        <nav className="space-y-2 flex-1  overflow-y-auto scrollable scrollable-transparent">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isExpanded = expandedMenus.includes(item.path);
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.path} className="relative group">
                <div
                  onClick={(e) => {
                    if (hasSubmenu && !isCollapsed) {
                      e.preventDefault();
                      toggleAccordion(item.path);
                    } else if (isCollapsed && hasSubmenu) {
                      e.preventDefault();
                      // handleHoverSubmenu(hoverSubmenu === item.path ? item.path : 'q');
                    }
                  }}
                  onMouseEnter={() => isCollapsed && hasSubmenu && setHoverSubmenu(item.path)}
                  onMouseLeave={() => isCollapsed && setHoverSubmenu(null)}
                  className={`flex items-center ${isCollapsed ? 'justify-center h-8 w-8 ' : 'space-x-3 px-2 py-2'}  rounded-lg transition-colors relative ${isActive
                    ? 'bg-[#fff] text-[#1a365d]'
                    : 'text-[#fff] hover:bg-[#fff] hover:text-[#1a365d]'
                    } ${hasSubmenu && !isCollapsed ? 'cursor-pointer' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  {hasSubmenu && !isCollapsed ? (
                    <>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{item.label}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </>
                  ) : (
                    <Link to={item.path} className={`flex items-center w-full ${isCollapsed?' justify-center':''}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium ml-3">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>

                {/* Submenu for expanded state */}
                {!isCollapsed && hasSubmenu && isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu!.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === subItem.path
                          ? 'bg-[#1a365d]/10 text-[#fff]'
                          : 'text-[#fff] hover:bg-[#fff] hover:text-[#1a365d]'
                          }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Hover submenu for collapsed state */}
                {isCollapsed && hoverSubmenu === item.path && hasSubmenu && (
                  <div className="absolute left-full top-0 ml-2 bg-white border border-[#E0E0E0] rounded-lg shadow-lg py-2 z-1000 min-w-48">
                    <div className="px-3 py-2 text-sm font-medium text-[#828282] border-b border-[#E0E0E0]">
                      {item.label}
                    </div>
                    {item.submenu!.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-[#333333] hover:bg-[#FAFAFA] transition-colors"
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E0E0E0]">
        {userProfileItems.map((item) => {
          const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isExpanded = expandedMenus.includes(item.path);
          return (
            <div
              key={item.path}
              className="relative group"
              // onMouseEnter={() => isCollapsed && hasSubmenu && setHoverSubmenu(item.path)}
              // onMouseLeave={() => isCollapsed && hasSubmenu && setHoverSubmenu(null)}
            >
              <div
                className={`flex items-center ${isCollapsed ? 'justify-center h-8 w-8' : 'space-x-3 px-2 py-2'
                  }  rounded-lg text-white hover:bg-[#fff] hover:text-[#1a365d] transition-colors cursor-pointer`}
                title={isCollapsed ? item.label : ''}
                onClick={(e) => {
                  if (hasSubmenu && !isCollapsed) {
                    e.preventDefault();
                    toggleAccordion(item.path);
                  }
                }}
              >
                {/* Main Icon/Menu */}
                {/* <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>} */}
                {hasSubmenu && !isCollapsed ? (
                    <>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{user.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </>
                  ) : (
                    <Link to={item.path} className={`flex items-center w-full ${isCollapsed?' justify-center':''}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium ml-3">{item.label}</span>
                      )}
                    </Link>
                  )}
              </div>

                {/* Submenu for expanded state */}
                {!isCollapsed && hasSubmenu && isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu!.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === subItem.path
                          ? 'bg-[#1a365d]/10 text-[#fff]'
                          : 'text-[#fff] hover:bg-[#fff] hover:text-[#1a365d]'
                          }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}

              {/* Hover submenu inside the same parent so it doesn't lose hover */}
              {isCollapsed && hoverSubmenu === item.path && hasSubmenu && (
                <div className="absolute left-full top-0 ml-2 bg-white border rounded-lg shadow-lg py-2 z-50 min-w-48">
                  <div className="px-3 py-2 text-sm font-medium text-[#828282] border-b">
                    {item.label}
                  </div>
                  {item.submenu.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.path}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-[#333] hover:bg-[#FAFAFA]"
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </aside>
  );
};

export default Sidebar;