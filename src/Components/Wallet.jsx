import React, { useEffect, useState } from 'react';
import { Fa500Px, FaAccessibleIcon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('All');

  const allDataStatic = [
    {
      name: 'Internal',
      type: 'Credit',
      date: '30/05/2024',
      time: '04:34',
      amount: 234.00
    },
    {
      name: 'Crypto',
      type: 'Debit',
      date: '30/05/2024',
      time: '04:34',
      amount: 234.00
    },
    {
      name: 'Crypto',
      type: 'Credit',
      date: '30/05/2024',
      time: '04:34',
      amount: 234.00
    },
    {
      name: 'Internal',
      type: 'Debit',
      date: '30/05/2024',
      time: '04:34',
      amount: 234.00
    }
  ]

  const [allData, setAllData] = useState(allDataStatic);
  const [cryptoData, setCryptoData] = useState(allData.filter(item=>item.name=='Crypto'));
  const [internalData, setInternalData] = useState(allData.filter(item=>item.name=='Internal'));

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="font-poppins text-sm w-full flex flex-col">
      <div className="flex justify-between bg-blue-700 p-5">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white">Transaction Date</p>
          <input
            type="date"
            name="todayReferral"
            className="mt-1 border rounded-md w-28 py-1 -px-2 outline-none"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-white">My Wallet</p>
          <p className="mt-1 bg-white border rounded-md w-20 text-right py-1 px-2">1234</p>
        </div>
      </div>
      <div className="flex relative justify-between px-6 bg-blue-700 items-center w-full">
        <button onClick={() => handleTabClick('All')} className={`py-2 px-5 focus:outline-none ${activeTab === 'All' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
          All
        </button>
        <button onClick={() => handleTabClick('Crypto')} className={`py-2 px-5 focus:outline-none ${activeTab === 'Crypto' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
          Crypto
        </button>
        <button onClick={() => handleTabClick('Internal')} className={`py-2 px-5 focus:outline-none ${activeTab === 'Internal' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
          Internal
        </button>
        {/* <span className={`h-1 absolute bottom-0 transition-all duration-75 ${activeTab === 'All' ? 'left-0 w-12' : activeTab === 'Crypto' ? 'left-1/3 w-16' : 'right-0 w-20'}`}></span> */}
      </div>
      
      <div className="p-2">
        {activeTab === 'All' && (
          <div>
            {allData.map((item, index) => (
              <div key={index} className="p-2 flex justify-between items-center">
                {item.type==='Credit' ? <CiCirclePlus size={30} className='text-green-600'/> : <CiCircleMinus size={30} className='text-red-600'/>}
                <div>
                  <p>{item.name}</p>
                  <p>{item.date}&nbsp;&nbsp;{item.time}</p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Crypto' && (
          <div>
            {cryptoData.map((item, index) => (
              <div key={index} className="p-2 flex justify-between items-center">
                {item.type==='Credit' ? <CiCirclePlus size={30} className='text-green-600'/> : <CiCircleMinus size={30} className='text-red-600'/>}
                <div>
                  <p>{item.name}</p>
                  <p>{item.date}&nbsp;&nbsp;{item.time}</p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Internal' && (
          <div>
            {internalData.map((item, index) => (
              <div key={index} className="p-2 flex justify-between items-center">
                {item.type==='Credit' ? <CiCirclePlus size={30} className='text-green-600'/> : <CiCircleMinus size={30} className='text-red-600'/>}
                <div>
                  <p>{item.name}</p>
                  <p>{item.date}&nbsp;&nbsp;{item.time}</p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full mb-3 p-2 shadow-lg flex justify-around"
          style={{
            width: '350px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
        <Link to='/app/TopUp' className="bg-blue-500 text-white px-5 py-2 rounded-md">TopUp</Link>
        <Link to='/app/WithDraw' className="bg-blue-500 text-white px-5 py-2 rounded-md">Withdraw</Link>
        <Link to='/app/Transfer' className="bg-blue-500 text-white px-5 py-2 rounded-md">Transfer</Link>
      </div>
    </div>
  );
};

export default Wallet;
