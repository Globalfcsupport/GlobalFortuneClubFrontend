import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getUserByRefId } from '../services/services';
import { BaseURL } from '../utils/const';
import userIcon from "../assets/Image/user.png";

const Referrals = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);
  const [users, setUsers] = useState([]);

  const getRefDetails = async () => {
    try {
      let values = await getUserByRefId();
      console.log(values.data, "ref");
      setTodayReferral(values.data.todayCount);
      setOverallReferral(values.data.overallCount);
      setUsers(values.data.overallData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRefDetails();
  }, []);

  return (
    <div className='h-full'>
      <div className="flex flex-col bg-primary p-3 gap-2">
        <div className="relative">
          <input
            name='name'
            type="text"
            id='name'
            placeholder="Search ID/Name"
            className="w-full px-3 py-2 text-sm pr-10 border hover:bg-gray-100 focus:bg-white rounded-md outline-none"
          />
          <button>
            <FaSearch className="text-blueColor absolute right-3 top-1/2 transform -translate-y-1/2 text-MainSection pointer-events-none" />
          </button>
        </div>

        <div className="flex justify-between text-sm px-4">
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className='text-white'>Referral - Today</p>
            <p className="bg-white rounded-md w-16 text-center">{todayReferral}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className='text-white'>Referral - Overall</p>
            <p className="bg-white rounded-md w-16 text-center">{overallReferral}</p>
          </div>
        </div>
      </div>

      <div className='w-full h-full bg-white flex flex-col overflow-scroll p-2'>
        {Array.isArray(users) && users.map((item, index) => {
          const firstLetter = item.userName ? item.userName.charAt(0).toUpperCase() : '';
          return (
            <div key={index} className='p-4 m-2 border rounded-xl shadow-md flex items-center bg-white'>
              {item.image ? (
                <img
                  src={`${BaseURL}${item.image}`}
                  className='h-12 w-12 rounded-full object-cover'
                  alt="User"
                />
              ) : (
                <div
                  className='h-12 w-12 rounded-full flex items-center justify-center text-white'
                  style={{ backgroundColor: 'rgb(158, 158, 158)' }}
                >
                  {firstLetter}
                </div>
              )}
              <div className='ml-2 flex flex-col'>
                <div className='flex justify-between items-center'>
                  <p className='font-medium text-lg text-blueColor text-ellipsis line-clamp-1'>{item.userName}</p>
                  <p className='text-blueColor text-xs font-bold '>ID: {item.refId}</p>
                </div>
                <p className='text-black-100 text-xs '>Email: {item.email}</p>
                <p className='text-black-100 text-xs '>DOJ: {new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Referrals;
