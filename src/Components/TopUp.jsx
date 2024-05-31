import React, { useEffect, useState } from 'react';
import { getPaymentHistoryByUser, topUp } from '../services/services';
import { CiCirclePlus } from "react-icons/ci";
import { Button, message } from 'antd';
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSaveOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const TopUp = () => {

  const [activeTab, setActiveTab] = useState('topUp');
  const [ amount , setAmount ] = useState('');
  const [ paymentsHistory , setpaymentsHistory ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ editUSDTAddress, setEditUSDTAddress ] = useState(true);
  const [ data, setData ] = useState({});

  const handleSubmit = (e)=> {
    e.preventDefault();
    setLoading(!loading);
    const data = {
      refId: localStorage.getItem('refId'),
      amount: amount
    }
    topUp(data).then((response)=> {
      setLoading(false) 
      window.location.href = response.data.payLink
    }).catch((error)=> {
      // console.log(error);
      messageApi.error('An Unknown Error Occured')
      setLoading(false) 
    })
  }

  const handleAmount = (e)=> {
    let amount = e.target.id;
    document.getElementById('amount').value = amount;
    setAmount(amount);
  }

  const handleChange = (e)=> {
    setAmount(e.target.value)
  }

  useEffect(()=> {
    // getPaymenthistory()
  }, [])

  return (
    <div className='w-full flex flex-col h-full font-poppins text-sm overflow-hidden'>
      {contextHolder}
      
      <div className='bg-blue-800 pt-3 w-full'>
        <div className='flex relative justify-between px-6 items-center w-full'>
          <NavLink to='/app/TopUp'
            className={`py-2 px-5 focus:outline-none ${activeTab === 'topUp' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
            TopUp
          </NavLink>
          <NavLink to='/app/withdraw'
            className={`py-2 px-5 focus:outline-none ${activeTab === 'withdraw' ? 'bg-white text-blue-800 rounded-t-md ' : 'text-white'}`}>
            Withdraw
          </NavLink>
          {/* <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='topUp'? 'left-[13%]': 'right-[12%] w-20'}`}></span> */}
        </div>
      </div>
        <div className='flex flex-col gap-4'>
          <div className='w-[90%] mx-auto bg-slate-400 rounded-md flex flex-col gap-3 mt-5 p-3'>
            <h1 className='font-semibold text-lg'>Select Top Up</h1>
            <div className='flex justify-between'>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='50'>50</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='100'>100</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='200'>200</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='500'>500</button>
            </div>
            <div className='relative w-full h-fit'>
              <form onSubmit={handleSubmit}>
                <input required type='number' placeholder='Enter Amount' className='px-4 py-2 text-sm rounded-md w-full outline-none' id='amount' onChange={handleChange} value={amount}/>
                <Button loading={loading} htmlType='submit' className='absolute bg-blue-700 px-4 py-1 rounded-lg right-[0.1rem] bottom-[0.12rem] text-white'>{loading? 'Loading' : 'Proceed'}</Button>
              </form>
            </div>
          </div>
          <div className='px-5'>
            <h1 className='p-3 bg-blue-400 text-white'>Recent Top Ups</h1>
            <div className='bg-white h-full w-full'>
              {paymentsHistory.map((item)=> (
                <div className='flex justify-between h-14 px-3 items-center'>
                  <CiCirclePlus size={25} />
                  <div>
                    <p className='text-xs text-blue-600'>C - In, track Id: {item.trackId}</p>
                    <p className='text-xs'>Completed {new Date(item.updatedAt).toLocaleString()}</p>
                  </div>
                  <p className='text-xs'>{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div> 

    </div>
  );
};

export default TopUp;
