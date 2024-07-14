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
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      <div className=''>
        <NavBar toggleSidebar={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${isSidebarOpen ? 'ml-3/4' : ''} w-full h-[88.5vh] transition-all duration-300 rounded-br-3xl rounded-bl-3xl overflow-hidden`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
