import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { susers } from '../utils/Users';

const Referrals = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);
  const [ users, setUsers ] = useState(susers);

  useEffect(() => {
    // Replace with your actual backend API call
    const fetchReferralData = async () => {
      // Simulated backend response
      const response = {
        todayReferral: 0,
        overallReferral: 0
      };
      
      // Set the data from the backend to the state
      setTodayReferral(response.todayReferral);
      setOverallReferral(response.overallReferral);
    };

    fetchReferralData();
  }, []);

  return (
    <div className='h-full'>
      <div className="flex flex-col bg-blue-500 p-5 gap-2">
        <div className="relative ">
          <input name='name' type="text" id='name' placeholder="Search ID/Name" className="w-full px-2 py-1 text-sm pr-10 border rounded-md outline-none" />
          <button>
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </button>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2 justify-center items-center ">
            <p className='text-white'>Referral - Today</p>
            <p className="bg-white rounded-md w-16 text-center">10</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center ">
            <p className='text-white'>Referral - Overall</p>
            <p className="bg-white rounded-md w-16 text-center">100</p>
          </div>
        </div>

      </div>
      <div className='w-full h-full bg-white flex flex-col overflow-scroll'>
        {users.map((item, index)=> (
          <div key={index} className='px-5 flex gap-5 p-2 items-center rounded-xl'>
            <img src={item.image} className='h-10 w-10 rounded-full object-cover'/>
            <div className='text-xs'>
              <p>{item.name}</p>
              <p>Ref ID: AA0001</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referrals;
