import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Signup = () => {
  return (
    <div className="w-full h-full font-poppins mt-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between px-4">
        <button className="text-blue-800">
          <FaArrowLeft size={18} />
        </button>
        </div>
        <div className="flex flex-col items-center flex-grow mt-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <span className="text-gray-600">Create an Account</span>
        <div className="w-8"></div>
      </div>
    </div>
  );
};

export default Signup;
