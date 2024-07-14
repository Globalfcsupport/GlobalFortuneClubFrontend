import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { susers } from '../utils/Users';
import { getUserByRefId } from '../services/services';
import { BaseURL } from '../utils/const';
import userIcon from "../assets/Image/user.png"
const Referrals = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);
  const [ users, setUsers ] = useState([]);


  const getRefDetails = async ()=>{
    try {
      let values = await getUserByRefId()
      console.log(values.data,"ref");
      setTodayReferral(values.data.todayCount)
      setOverallReferral(values.data.overallCount)
      setUsers(values.data.overallData)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getRefDetails()
  }, []);

  return (
    <div className='h-full'>
      <div className="flex flex-col bg-primary p-3 gap-2">
        <div className="relative">
          <input name='name' type="text" id='name' placeholder="Search ID/Name" className="w-full px-3 py-2  text-sm pr-10 border rounded-md outline-none" />
          <button>
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-MainSection pointer-events-none" />
          </button>
        </div>

        <div className="flex justify-between text-sm px-4">
          <div className="flex flex-col gap-2  justify-center items-center ">
            <p className='text-white'>Referral - Today</p>
            <p className="bg-white rounded-md w-16 text-center">{todayReferral}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center ">
            <p className='text-white'>Referral - Overall</p>
            <p className="bg-white rounded-md w-16 text-center">{overallReferral}</p>
          </div>
        </div>

      </div>
      <div className='w-full h-full bg-white flex flex-col overflow-scroll'>
        {Array.isArray(users) && users.map((item, index)=> (
          <div key={index} className='px-5 flex gap-5 p-2 items-center rounded-xl'>
            <img src={item.image?`${BaseURL}${item.image}`:`${userIcon}`} className='h-10 w-10 rounded-full object-cover'/>
            <div className='text-xs'>
              <p>{item.userName}</p>
              <p>Ref ID: {item.refId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referrals;
