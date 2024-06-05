// FCSlotLog.js
import { useEffect, useState } from "react";
import { FaBars, FaListAlt, FaUser } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { Outlet } from "react-router-dom";
import { SlotSearchProvider, useSlotSearch } from "../context/SlotSearchContext";

const FCSlotLog = () => {
  const { toggleSideBar } = useSideBar();
  // const { handleSearch } = useSlotSearch();

  const [ active, setActive ] = useState('pending');
  
  const handleClick = (status)=> {
    setActive(status)
  }

  return (
    <SlotSearchProvider >
      <div className="flex flex-col w-full h-screen font-poppins">
        <div className="h-12 md:h-16 bg-white flex justify-between px-5 md:px-10 items-center">
          <div className="flex items-center gap-3">
            <FaListAlt className="text-blue-700"/>
            <h1 className="md:text-xl font-semibold text-blue-700">FC Slot Log</h1>
          </div>
          <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none text-xs px-2 md:px-4 py-1 md:py-2" id="searchText"/>
          <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
            <FaBars />
          </div>
        </div>  

        <div className="flex flex-col h-full text-xs md:text-base rounded-tr-xl rounded-tl-xl overflow-hidden py-2">
          <div className='w-full flex text-center relative'>
            <div className="flex w-full">
              <p className={`w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg`} onClick={()=>handleClick('active')}>Active</p>
              <p className={`w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg`} onClick={()=>handleClick('completed')}>Completed</p>
            </div>
            <span className={`${active==='pending' ? 'left-0': 'left-[50%]'} absolute inline-block transition-all duration-300 top-0 bg-bg_primary w-1/2 h-full rounded-tr-lg rounded-tl-lg`} id="spanBG"></span>
            <span className={`${active==='pending' ? 'left-0': 'left-[50%]'} absolute inline-block transition-all duration-300 top-[100%] bg-blue-700 w-1/2 h-[0.125rem]`} id="spanUnderline"></span>
          </div>
          <Outlet />
        </div>
      </div>
    </SlotSearchProvider>
  )
}

export default FCSlotLog;
