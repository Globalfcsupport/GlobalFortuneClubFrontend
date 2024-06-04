import React, { useState } from 'react';
import { Flex, Progress } from 'antd'

const FCSlots = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeData = [
    {
      yield: 21,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 120,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 76,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 198,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
  ];

  const completedData = [
    {
      yield: 200,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 200,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 200,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
    {
      yield: 200,
      slotId: 'ACB01',
      date: '04/23/12 12:23'
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='w-full h-full font-poppins  text-sm '>
      <div className='bg-blue-800 pt-3 w-full'>
      <div className='flex relative justify-between px-6 items-center w-full'>
        {/* <div> */}
          <button onClick={() => handleTabClick('active')}
            className={`py-2 px-5 focus:outline-none ${activeTab === 'active' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
            {/* <span className="border-blue-800 border-b-2 inline-block py-2" >Active</span> */}
            Active
          </button>
        {/* </div> */}
        <button
          onClick={() => handleTabClick('completed')}
          className={`py-2 px-5 focus:outline-none ${
            activeTab === 'completed' ? 'bg-white text-blue-800 rounded-t-md ' : 'text-white'
          }`}
        >
          Completed
          {/* <span className="h-1 bg-black inline-block" >Completed</span> */}
        </button>
          <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='active'? 'left-10': 'right-11 w-20'}`}></span>
      </div>
      </div>
      <div className='p-5'>
        {activeTab === 'active' && (
          <div>
            {activeData.map((item, index) => (
              <div className='flex justify-between items-center'>
                <Progress key={index} type='circle' size={80} percent={20} className='h-32 w-32'/>
                <div>
                  <p className='font-semibold text-lg'>{item.slotId}</p>
                  <p>{item.yield}/200</p>
                  <p>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'completed' && (
          <div>
            {completedData.map((item, index) => (
              <div key={index} className='p-2'>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FCSlots;
