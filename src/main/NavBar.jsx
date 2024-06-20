import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';
import Sidebar from '../main/SideBar'; // Adjust the import path if necessary
import { useLocation, useNavigate } from 'react-router';
import useCustomHistory from '../Components/useCustomHistory';

const NavBar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/');
  const navigate = useNavigate();
  const [ customHistory, setCustomHistory ] = useState(new Set());
  // const { navigateBack } = useCustomHistory();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const handleNavigate = ()=> {
    
    const uniquePaths = Array.from(customHistory);
    // console.log(uniquePaths);
    if(uniquePaths[uniquePaths.length-1]===location.pathname){
      navigate(uniquePaths[uniquePaths.length-2])
      uniquePaths.pop();
      setCustomHistory(new Set(uniquePaths));
    }
    else{
      navigate(uniquePaths[uniquePaths.length-1])
      uniquePaths.pop()
      setCustomHistory(new Set(uniquePaths));
    }
  }
  
  useEffect(()=> {
    if(customHistory.has(location.pathname)){
      customHistory.delete(location.pathname);
    }
    customHistory.add(location.pathname);
    customHistory.delete()
    // console.log("set", customHistory);  
  }, [location])

  return (
    <div className="h-full w-full rounded-tr-xl rounded-tl-xl bg-[#5270b02d]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <GiFlowerEmblem
            className="text-xl text-black cursor-pointer"
            onClick={toggleSidebar}
          />
          <FaArrowLeft className="text-xl text-black cursor-pointer" onClick={handleNavigate}/>
        </div>
        <h1 className="text-lg font-semibold text-black -ml-5">{currentPage[2]}</h1>
        <FaEnvelope onClick={()=>navigate('/app/Chats')} className="text-xl text-black cursor-pointer" />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
    </div>
  );
};

export default NavBar;
