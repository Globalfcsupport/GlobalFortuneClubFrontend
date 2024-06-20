import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { FiAlertCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ActivateClub } from '../services/services';
import { getDashboardDetails } from '../services/services';

const DashBoard = () => {
  
  const [data, setData] = useState({});

  const ClubActivation = async () => {
    try {
      let datas = await ActivateClub();
      if (datas.data) {
        messageApi.success(datas.data);
      }
    } catch (error) {}
  };

  const dashboardDetails = async ()=> {
    try{
      const datas = await getDashboardDetails();
      setData(datas.data)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    dashboardDetails()
  }, [])

  return (
    <div className="h-full p-2 font-poppins">
      <div className="bg-blue-500 p-3 flex justify-between items-center text-white rounded-lg">
        <div>
          <p className="text-sm font-semibold">User Name: {data?.userName}</p>
          <p className='text-sm'>ID: {data.refId}</p>
        </div>
        <button
          className="bg-white text-blue-500 px-4 py-1 rounded"
          onClick={ClubActivation}
        >
          {data.active ? "Started" : "Start"}
        </button>
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
            <span>{data.wallet}</span>
            <FaArrowRight className="text-gray-400" />
          </div>
        </div>

        {/* Reserve - My Wallet Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex items-center space-x-2">
            <FiAlertCircle />
            <span>Reserve - My Wallet</span>
          </div>
          <p className="bg-blue-500 text-white px-6 py-1 rounded">
            0.00
          </p>
        </div>

        {/* Crowd - Stacking Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Crowd Stacking</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>{data?.crowd?.toFixed(4)}</span>
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
            <span>{data.activatedTotal}</span>
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
            <span>{data.completedTotal}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Yield - Today</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Yield - Overall</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>{data.Yield}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>

        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Referral Income -Today</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
       
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Referral Income -Overall</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Crypto Top-Up</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>{data.totalCryptoTopup}</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Crypto Withdraw</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>Total Internal Transfer IN</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
            <FaArrowRight className='text-gray-400' />
          </div>
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
          <div className='flex items-center space-x-2'>
            <FiAlertCircle />
            <span>More Content</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>$0</span>
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
