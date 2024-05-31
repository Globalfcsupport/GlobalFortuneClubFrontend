import React, { useEffect, useState } from 'react';
import { getPaymentHistoryByUser, topUp } from '../services/services';
import { CiCirclePlus } from "react-icons/ci";
import { Button, message } from 'antd';
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSaveOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Withdraw = () => {

  const initialValues = {
    USDTAddress: '',
    amount: '',
    refId: localStorage.getItem('refId')
  }

  const [ loading, setLoading ] = useState(false);
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ editUSDTAddress, setEditUSDTAddress ] = useState(true);
  const [ networkFee, setNetworkFee ] = useState(2);
  const [ receivableAmount, setReceivableAmount ] = useState('');
  const [ data, setData ] = useState(initialValues);

  const handleUSDTAddress = ()=> {
    setEditUSDTAddress(!editUSDTAddress)
  }

  const handleChange = (e)=> {
    setData(prev=> ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  useEffect(()=> {
    const rmount = data.amount -  (data.amount/100)* networkFee;
    setReceivableAmount(rmount)
  }, [data.amount])

  const handleSubmit = (e)=> {
    e.preventDefault();
    const USDTAddress = document.getElementById('USDTAddress').value;
    const amount = document.getElementById('amount').value;
    const refId = localStorage.getItem('refId');

    const data = {
      USDTAddress: USDTAddress,
      amount: amount,
      refId: refId,
    }
    setLoading(true);
    setTimeout(()=> {
      setLoading(false)
    }, 2000)

    console.log(data)
  }

  useEffect(()=> {
    // getPaymenthistory()
  }, [])

  return (
    <div className='w-full flex flex-col h-full font-poppins text-sm overflow-hidden'>
      {contextHolder}
      
      <div className='bg-blue-800 pt-3 w-full'>
        <div className='flex relative justify-between px-6 items-center w-full'>
          <NavLink to='/app/topup'
            className="py-2 px-5 focus:outline-none text-white">
            TopUp
          </NavLink>
          <NavLink to='/app/withdraw'
            className="py-2 px-5 focus:outline-none bg-white text-blue-700 rounded-tr-lg rounded-tl-lg">
            Withdraw
          </NavLink>
        </div>
      </div>

      <div className='p-5 flex flex-col gap-5'>
        <div className='flex justify-end'>
          <p className='text-right w-fit bg-white px-5 py-1 rounded-lg'>1111.1111</p>
        </div>
        <div>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='USDTAddress' className='text-blue-600 font-semibold'>Enter Your USDT Address (TRC - 20)</label>
              <input readOnly={editUSDTAddress} id='USDTAddress' name='USDTAddress' type='text' className='px-3 py-1 rounded-md outline-none' onChange={handleChange} value={data.USDTAddress}/>
              {editUSDTAddress ?
                <HiOutlinePencil size={15} className='absolute bottom-2 right-2' onClick={handleUSDTAddress}/>
                : <IoSaveOutline size={15} className='absolute bottom-2 right-2' onClick={handleUSDTAddress}/>
              }
            </div>
            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='amount' className='text-blue-600 font-semibold'>Enter Amount</label>
              <input required id='amount' name='amount' type='text' className='px-3 py-1 rounded-md outline-none' onChange={handleChange} value={data.amount}/>
            </div>
            <div className='flex flex-col gap-2 relative'>
              <label className='text-blue-600 font-semibold'>Admin & Network Fee</label>
              <p id='networkfee' className='px-3 py-1 rounded-md outline-none bg-white'>{networkFee} %</p>
            </div>
            <div className='flex flex-col gap-2 relative'>
              <label className='text-blue-600 font-semibold'>Receivable Amount</label>
              <input id='ramount' readOnly={true} value={receivableAmount} type='text' className='px-3 py-1 rounded-md outline-none'/>                
            </div>
            <Button loading={loading} htmlType='submit' className='bg-blue-700 px-4 h-10 font-semibold rounded-lg text-white'>{loading? 'Loading' : 'Withdraw'}</Button>
          </form>
        </div>
        <div className='px-5 text-xs'>
          <ul className='list-disc text-gray-600'>
            <li>Minimum Withdraw is 12</li>
            <li>Withdraw allowed only once in 24 hours</li>
            <li>Withdraw processing time is 24 hours</li>
          </ul>
        </div>
      </div> 
      
    </div>
  );
};

export default Withdraw;
