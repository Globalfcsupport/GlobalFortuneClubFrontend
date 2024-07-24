import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IoGrid } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import Sidebar from '../main/SideBar'; // Adjust the import path if necessary

const NavBar = ({}) => {
  const location = useLocation();
  const currentPage = location.pathname.split('/');
  const navigate = useNavigate();
  const [customHistory, setCustomHistory] = useState(new Set());
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = () => {
    const uniquePaths = Array.from(customHistory);
    const currentPathIndex = uniquePaths.indexOf(location.pathname);

    if (currentPathIndex > 0) {
      const previousPath = uniquePaths[currentPathIndex - 1];
      uniquePaths.splice(currentPathIndex, 1);
      setCustomHistory(new Set(uniquePaths));
      navigate(previousPath);
    } else if (uniquePaths.length > 1) {
      const previousPath = uniquePaths[uniquePaths.length - 2];
      uniquePaths.pop();
      setCustomHistory(new Set(uniquePaths));
      navigate(previousPath);
    }
  };

  useEffect(() => {
    setCustomHistory(prevHistory => {
      const newHistory = new Set(prevHistory);
      if (newHistory.has(location.pathname)) {
        newHistory.delete(location.pathname);
      }
      newHistory.add(location.pathname);
      return newHistory;
    });
  }, [location]);

  const toTitleCase = (str) => {
    const customMappings = {
      "FCSLots": "FC Slots",
      "MyReferrals": "My Referrals",
      
    };
  
    if (customMappings.hasOwnProperty(str)) {
      return customMappings[str];
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const pageTitle = toTitleCase(currentPage[2] || ''); // Safeguard if currentPage[2] is undefined

  return (
    <div className="h-full w-full rounded-tr-3xl rounded-tl-3xl bg-customLightGray">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center justify-center gap-6">
          <div className='flex gap-2'>
            <div className='p-2 bg-white rounded-full'>
              <IoGrid className="text-xl text-primary cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className='p-2 text-center bg-white rounded-full'>
              <IoIosArrowBack className="text-[20px] text-primary cursor-pointer" onClick={handleNavigate} />
            </div>
          </div>
        </div>
        <h1 className="text-[17px] font-normal text-textColour -ml-5">{pageTitle}</h1>
        <div className='p-2 bg-white rounded-full'>
          <BiSolidMessageRoundedDetail onClick={() => navigate('/app/Chats')} className="text-[22px] text-primary cursor-pointer" />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NavBar;
