import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    // <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">
    //   <div className="flex jagan overflow-hidden">
    //     <Sidebar />
    //     <main className="flex-1 h-screen overflow-y-auto transition-all duration-300 bg-[#f2f2f2] scrollable">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <div className="h-screen w-screen overflow-hidden flex bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto bg-[#f2f2f2]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;