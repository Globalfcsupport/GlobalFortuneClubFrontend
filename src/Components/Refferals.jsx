import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Refferals = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);

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

  const handleTodayReferralChange = (event) => {
    setTodayReferral(event.target.value);
  };

  const handleOverallReferralChange = (event) => {
    setOverallReferral(event.target.value);
  };

  return (
    <div className="bg-blue-500 p-5 ">
      <div className="relative mb-5">
        <input
          name='name'
          type="text"
          id='name'
          placeholder="Search ID/Name"
          className="w-full p-2 pr-10 border rounded-md"
        />
        <button>
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center ">
          <span>Referral - Today</span>
          <input
            type="number"
            name='todayReferral'
            value={todayReferral}
            onChange={handleTodayReferralChange}
            className="mt-1 border rounded-md w-16 pl-7"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span>Referral - Overall</span>
          <input
            type="number"
            name='overallReferral'
            value={overallReferral}
            onChange={handleOverallReferralChange}
            className="mt-1 border rounded-md w-16 flex pl-7"
          />
        </div>
      </div>
    </div>
  );
};

export default Refferals;
