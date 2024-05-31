import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';
import { Outlet } from 'react-router';

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(()=> {

  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-[100vh] w-full overflow-hidden flex flex-col sm:rounded-tl-3xl sm:rounded-tr-3xl">
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${isSidebarOpen ? 'ml-3/4' : ''} transition-all duration-300`}>
      <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
