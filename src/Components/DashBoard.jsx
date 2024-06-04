import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { FiAlertCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const [userData, setUserData] = useState({
    name: '',
    id: '',
    wallet: 0,
    reserveWallet: 0,
    CrowdStacking: 0,
    ActiveSlots: 0,
    CompletedSlots: 0,
    YieldToday: 0,
    YieldOverall: 0,
    ReferralIncomeToday: 0,
    ReferralIncomeOverall: 0,
    TotalCryptoTopUp: 10800,
    TotalCryptoWithdraw: 223,
    TotalInternalTransferIn: 0
  });

  useEffect(() => {

  }, []);

  return (
    <div className="h-full p-2 font-poppins">
      <div className="bg-blue-500 p-3 flex justify-between items-center text-white rounded-lg">
        <div>
          <p className="text-sm font-semibold">User Name: Tamizh</p>
          <p className='text-sm'>ID: {userData.id}</p>
        </div>
        <button className="bg-white text-blue-500 px-4 py-1 rounded">Start</button>
      </div>

      <div className="h-full overflow-auto space-y-1 mt-2 "
        style={{
          height: 'calc(97vh - 180px)',
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none" // For Internet Explorer and Edge
        }}
      >

        {/* Wallet Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex items-center space-x-2">
            <FiAlertCircle />
            <span>My Wallet</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{userData.wallet.toFixed(4)}</span>
            <FaArrowRight className="text-gray-400" />
          </div>
        </div>

        {/* Reserve - My Wallet Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex items-center space-x-2">
            <FiAlertCircle />
            <span>Reserve - My Wallet</span>
          </div>
          <div className="bg-blue-500 text-white px-6 py-1 rounded">
            ${userData.reserveWallet.toFixed(2)}
          </div>
        </div>

        {/* Crowd - Stacking Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Crowd Stacking</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.CrowdStacking.toFixed(4)}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        {/* Active Slots */}
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Active Slots</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.ActiveSlots}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        {/* Completed Slots */}
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Completed Slots</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.CompletedSlots}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Yield - Today</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.YieldToday}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Yield - Overall</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.YieldOverall}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Referral Income -Today</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.ReferralIncomeToday}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
       
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Referral Income -Overall</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.ReferralIncomeOverall}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Crypto Top-Up</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.TotalCryptoTopUp}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Crypto Withdraw</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.TotalCryptoWithdraw}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Internal Transfer IN</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.TotalInternalTransferIn}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.CompletedSlots}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.CompletedSlots}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>${userData.CompletedSlots}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full mb-3 p-2 shadow-lg flex justify-around"
          style={{
            width: '350px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
        <Link to='/app/TopUp' className="bg-blue-500 text-white px-5 py-1 rounded-md">TopUp</Link>
        <Link to='/app/Withdraw' className="bg-blue-500 text-white px-5 py-1 rounded-md">Withdraw</Link>
        <Link to='Transfer' className="bg-blue-500 text-white px-5 py-1 rounded-md">Transfer</Link>
      </div>
    </div>
  );
};

export default DashBoard;
