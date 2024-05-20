import React from 'react';
import { FaArrowLeft, FaTachometerAlt, FaWallet, FaDice, FaUserFriends, FaComments, FaLifeRing, FaCog, FaShareAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-[96vh] rounded-l-3xl rounded-r-3xl z-50 bg-gray-200 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } `}
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
        <div className="flex items-center mt-7 bg-blue-800 w-full p-2">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 "></div>
          <div>
            <div className="font-bold text-white">User Name</div>
            <div className="text-gray-300">user@mail.com</div>
            <div className="text-gray-300">ID: 12345</div>
          </div>
        </div>
        {/* Sidebar Links */}
        <ul>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaTachometerAlt className="mr-3" /> DashBoard
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaWallet className="mr-3" /> Wallet
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaDice className="mr-3" /> FC Slots
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaUserFriends className="mr-3" /> Referrals
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaComments className="mr-3" /> Chat
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaLifeRing className="mr-3" /> Support
          </li>
          <li className="py-3 px-4 border-b border-gray-200 flex items-center">
            <FaCog className="mr-3" /> Settings
          </li>
        </ul>
        {/* Invite Section */}
        <div className="mt-6 p-2 bg-blue-600 text-white text-center py-3 mx-4 rounded-lg">
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
