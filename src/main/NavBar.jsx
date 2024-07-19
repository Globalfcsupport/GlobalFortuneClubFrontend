import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';
import Sidebar from '../main/SideBar'; // Adjust the import path if necessary
import { useLocation, useNavigate } from 'react-router';
import useCustomHistory from '../Components/useCustomHistory';
import { IoGrid } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

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
    <div className="h-full w-full rounded-tr-3xl rounded-tl-3xl bg-white">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center justify-center gap-6">
          <div className='flex gap-2'>
          <div className='p-2 bg-white rounded-full'><IoGrid
            className="text-xl text-primary cursor-pointer"
            onClick={toggleSidebar}
          /></div>
          
          <div className='p-2 text-center bg-white rounded-full'>
          <IoIosArrowBack className="text-[20px] text-primary cursor-pointer" onClick={handleNavigate}/>

          </div>
          </div>
          

        </div >
        <h1 className="text-lg font-semibold text-textColour -ml-5">{currentPage[2]}</h1>

        <div className='p-2 bg-white rounded-full'>
        <BiSolidMessageRoundedDetail onClick={()=>navigate('/app/Chats')} className="text-[22px] text-primary cursor-pointer" />

        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
    </div>
  );
};

export default NavBar;
