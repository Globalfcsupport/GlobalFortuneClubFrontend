import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTachometerAlt, FaWallet, FaDice, FaUserFriends, FaComments, FaLifeRing, FaCog, FaShareAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [ data, setData ] = useState({});

  useEffect(()=> {
    data['userName'] = localStorage.getItem('userName');
    data['email'] = localStorage.getItem('email');
    data['refId'] = localStorage.getItem('refId');
  }, [])
  
  return (
    <div
      className={`font-poppins absolute top-0 left-0 h-[96.7vh] rounded-l-3xl rounded-r-3xl z-50 bg-gray-200 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '75%' }}
    >
      <button
        className="absolute top-4 right-4 text-xl flex justify-center items-center"
        onClick={toggleSidebar}
      >
        <FaArrowLeft />
      </button>
      <div className="pt-6">
        {/* User Info */}
        <div className="flex items-center mt-6 bg-blue-800 w-full p-2  text-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <div className="font-bold text-white">{data.userName}</div>
            <div className="text-gray-300 text-[10px]">{data.email}</div>
            <div className="text-gray-300 text-[10px]">{data.refId}</div>
          </div>
        </div>
        {/* Sidebar Links */}
        <ul className=' text-sm navs'>         
          <NavLink to="DashBoard" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaTachometerAlt className="mr-3" />
            <p>DashBoard</p>
          </NavLink>                  
          <NavLink to="Wallet" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaWallet className="mr-3" />
            <p>Wallet</p>
          </NavLink>                  
          <NavLink to="FCSLots" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaDice className="mr-3" />
            <p>FC Slots</p>
          </NavLink>                  
          <NavLink to="MyReferrals" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaUserFriends className="mr-3" />
            <p>Referrals</p>
          </NavLink>                  
          <NavLink to="Chats" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaComments className="mr-3" />
            <p>Chats</p>
          </NavLink>                  
          <NavLink to="Support" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaLifeRing className="mr-3" />
            <p>Support</p>
          </NavLink>                  
          <NavLink to="Settings" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaCog className="mr-3" />
            <p>Settings</p>
          </NavLink>                  
        </ul>
        {/* Invite Section */}
        <div className="mt-4  bg-blue-600 text-white text-center py-3  rounded-lg  text-sm">
          Invite your friends and earn $1 for every slot they create!
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full flex items-center mx-auto">
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
