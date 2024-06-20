import React, { useEffect, useState } from 'react';
import { Flex, Progress } from 'antd'
import { getFCSlots } from '../services/services';

const FCSlots = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [ activeSlots, setActiveSlots ] = useState([])
  const [ pendingSlots, setPendingSlots ] = useState([])
  const [ completedSlots, setCompletedSlots ] = useState([]);
  const [ data, setData ] = useState([]);

  const fcSlots = async ()=> {
    try{
      const datas = await getFCSlots();
      setData(datas.data)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    fcSlots()
  }, [])

  useEffect(()=> {
    const active = data.filter(item=> (
      item.status === 'Activated'
    ))
    setActiveSlots(active)
    const pending = data.filter(item=> (
      item.status === 'Pending'
    ))
    setPendingSlots(pending)
    const completed = data.filter(item=> (
      item.status === 'Completed'
    ))
    setCompletedSlots(completed)
  }, [data])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='w-full h-full font-poppins text-sm overflow-y-auto'>
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
      <div className=''>
        {activeTab === 'active' && (
          <div>
            {activeSlots.map((item, index) => (
              <div key={index} className='flex items-center gap-5'>
                <Progress key={index} type='circle' size={70} percent={(item.currentYield/item.totalYield)*100} className='h-28 w-28 flex justify-center items-center'/>
                <div>
                  <p className='font-semibold text-sm'>{item.slotId.slice(0,5)}</p>
                  <p className='text-xs'>{item.currentYield}/{item.totalYield}</p>
                  <p className='text-xs'>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'completed' && (
          <div>
            {completedSlots.map((item, index) => (
              <div key={index} className='flex items-center gap-5'>
                <Progress key={index} type='circle' size={70} percent={item.percent} className='h-28 w-28 flex justify-center items-center'/>
                <div>
                  <p className='font-semibold text-sm'>{item.slotId}</p>
                  <p className='text-xs'>{item.yield}/200</p>
                  <p className='text-xs'>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FCSlots;
