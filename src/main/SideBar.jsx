import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/Image/human.png';
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";

import { FaArrowLeft, FaTachometerAlt, FaWallet, FaDice, FaUserFriends, FaComments, FaLifeRing, FaCog, FaShareAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [ data, setData ] = useState({});

  useEffect(()=> {
    data['userName'] = localStorage.getItem('userName');
    data['email'] = localStorage.getItem('email');
    data['refId'] = localStorage.getItem('refId');
  }, [])
  
  return (
    <div
      className={` absolute top-0 left-0 h-screen rounded-[30px] z-50 bg-white overflow-hidden  transform transition-transform duration-300  ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '75%' }}
    >
      <button
        className="absolute right-5 top-4 text-xl flex justify-center items-center"
        onClick={toggleSidebar}
      >
            <MdKeyboardArrowLeft className="text-textColour text-3xl" />
            </button>
      <div className="pt-8 overflow-y-scroll  h-screen">
        {/* User Info */}
        <div className="flex items-center mt-6 bg-primary w-full p-2  text-sm">
          <div className="w-12 h-12 bg-white p-1 rounded-full mr-4">
            <img src={Logo} alt="" />
          </div>
          <div>
            <div className="font-bold text-white">{data.userName}</div>
            <div className="text-gray-300 text-[10px]">{data.email}</div>
            <div className="text-gray-300 text-[10px]">{data.refId}</div>
          </div>
        </div>
        {/* Sidebar Links */}
        <ul className=' text-sm space-y-1 navs p-5'>         
          <NavLink to="DashBoard" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaTachometerAlt className="mr-3 text-primary" />
            <p>DashBoard</p>
          </NavLink>                  
          <NavLink to="Wallet" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaWallet className="mr-3 text-primary" />
            <p>Wallet</p>
          </NavLink>                  
          <NavLink to="FCSLots" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaDice className="mr-3 text-primary" />
            <p>FC Slots</p>
          </NavLink>                  
          <NavLink to="MyReferrals" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <BsFillPeopleFill className="mr-3 text-primary" />
            <p>Referrals</p>
          </NavLink>                  
          <NavLink to="Chats" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <HiMiniChatBubbleLeftRight className="mr-3 text-primary" />
            <p>Chats</p>
          </NavLink>                  
          <NavLink to="Support" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <RiCustomerService2Fill className="mr-3 text-primary" />
            <p>Support</p>
          </NavLink>                  
          <NavLink to="Settings" className='px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaCog className="mr-3 text-primary" />
            <p>Settings</p>
          </NavLink>                  
        </ul>
        {/* Invite Section */}
        <div className="p-3">
        <div className="mt-4  bg-primary text-white text-center py-2 px-3  rounded-xl  text-sm">
          Invite your friends and earn $1 for every slot they create!
          <button className="mt-2 bg-white  px-5 py-1 text-black rounded-full flex items-center mx-auto">
            <FaShareAlt className="mr-2 text text-black" /> Share
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
