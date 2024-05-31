import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';
import Sidebar from '../main/SideBar'; // Adjust the import path if necessary
import { useLocation } from 'react-router';

const NavBar = () => {

  const location = useLocation();
  const currentPage = location.pathname.split('/')
  // console.log(currentPage);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" h-12 w-full overflow-hidden bg-[#5270b02d]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <GiFlowerEmblem
            className="text-xl text-black cursor-pointer"
            onClick={toggleSidebar}
          />
          <FaArrowLeft className="text-xl text-black cursor-pointer" />
        </div>
        <h1 className="text-lg font-semibold text-black">{currentPage[2]}</h1>
        <FaEnvelope className="text-xl text-black cursor-pointer" />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
    </div>
  );
};

export default NavBar;
