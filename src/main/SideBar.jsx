// In Sidebar.jsx
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={` absolute top-0 left-0 h-[96vh] rounded-l-3xl rounded-r-3xl bg-gray-200 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } `}
      style={{ width: '75%' }}
    >
      <button
        className="absolute top-4 right-4 text-xl flex justify-center items-center"
        onClick={toggleSidebar}
      >
        {/* &larr; */}
        <FaArrowLeft />
      </button>
      <div className="p-5">
        {/* User Info */}
        <div className="flex items-center mt-7">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <div className="font-bold">User Name</div>
            <div className="text-gray-500">user@mail.com</div>
            <div className="text-gray-500">ID: 12345</div>
          </div>
        </div>
        {/* Sidebar Links */}
        <ul>
          <li className="py-2 px-4 border-b border-gray-200">Link 1</li>
          <li className="py-2 px-4 border-b border-gray-200">Link 2</li>
          <li className="py-2 px-4 border-b border-gray-200">Link 3</li>
          {/* Add more sidebar links here */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
