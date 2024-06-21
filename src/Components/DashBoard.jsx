import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { FiAlertCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ActivateClub } from '../services/services';
import { getDashboardDetails } from '../services/services';
import { message } from 'antd';

const DashBoard = () => {
  
  const [data, setData] = useState({});
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ editReserveMyWallet, setEditReserveMyWallet ] = useState(false);

  const ClubActivation = async () => {
    try {
      let datas = await ActivateClub();
      // console.log(datas);
      if (datas.data) {
        // console.log('inside if');
        messageApi.success(datas.status);
        // console.log(datas.data);
        window.location.reload();
      }
    } catch (error) {}
    console.log('clicked');
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

  const handleReserveMyWallet = ()=> {
    setEditReserveMyWallet(!editReserveMyWallet);
  }

  const handleCancel = ()=> {
    setEditReserveMyWallet(!editReserveMyWallet)
  }

  const handleConfirm = ()=> {
    if(true){
      console.log('done');
    }
    else{
      console.log('not done');
    }
  }

  const handleClick = (e)=> {
    // console.log(e.target.closest("div").className.includes('div'));
    if(!e.target.closest("div").className.includes('div')){
      setEditReserveMyWallet(!editReserveMyWallet)
    }
  }

  return (
    <div className="h-full p-2 font-poppins">
      {contextHolder}
      <div className="bg-blue-500 p-3 flex justify-between items-center text-white rounded-lg">
        <div>
          <p className="text-sm font-semibold">User Name: {data?.userName}</p>
          <p className='text-sm'>ID: {data.refId}</p>
        </div>
        <button disabled={data.started ? true : false}
          className="bg-white text-blue-500 px-4 py-1 rounded"
          onClick={ClubActivation}
        >
          {data.started ? "Started" : "Start"}
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
        <div onClick={handleReserveMyWallet} className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
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
      {editReserveMyWallet ? 
        <div className='absolute flex justify-center items-center h-full w-full bg-transparent top-0 left-0' onClick={handleClick}>
          <div className='div bg-white p-5 border border-black rounded-xl h-fit flex flex-col gap-5'>
            <p>Reserve - My Wallet</p>
            <input type="text" className='px-3 py-1 text-sm rounded-lg' placeholder='Enter Amount' />
            <div className="div flex justify-around">
              <button type="button" onClick={handleCancel} className="bg-red-600 px-5 rounded-full text-sm py-1 text-white">Cancel</button>
              <button type="button" onClick={handleConfirm} className="bg-green-600 px-5 rounded-full text-sm py-1 text-white">Confirm</button>
            </div>
          </div>
        </div> : null
      }
    </div>
  );
};

export default DashBoard;
