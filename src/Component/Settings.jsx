import { Switch, Button, message  } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FaRegEdit  } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";

  const Settings = () => {

    const [ messageAPI, contextHolder ] = message.useMessage();

    const onChange = (checked) => {
      console.log(`switch to ${checked}`);
    };

    const handleClick = ()=> {
      if(readOnly){
        messageAPI.warning('Click the Edit Button to Enter Edit Mode')
      }
    }

    const [readOnly , setReadonly] = useState(true);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

  const [ data, setData] = useState({})

  const handleEdit = ()=>{
    setReadonly(!readOnly);
  }

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const onSavePassword = () => {
    console.log("Password Saved!");
    setShowPasswordForm(false);
  }

  const handleSubmit = ()=> {
    setReadonly(!readOnly);
    console.log('ada')
  }

  return (
    <div className="w-full h-full ">
      {contextHolder}

      <div className="flex items-center h-14">
        <h1 className="font-bold text-blue-600 text-xl p-4">Settings</h1>
        {readOnly ? (
          <FaRegEdit className='p-0 text-blue-600 cursor-pointer'onClick={handleEdit }/>
        ):
        (
          <IoSaveOutline className='p-0 text-blue-600 cursor-pointer' onClick={handleSubmit}/>
        )
        }
      </div>

      <div className='h-screen w-full bg-bg_primary p-5 rounded-xl' onClick={handleClick}>
        <div className="border border-gray-200 bg-white grid grid-cols-2 gap-2 p-6 w-fit rounded-md">
          {/* <div className=""> */}

            <label htmlFor="platformFee">Platform Fee:</label>
            <div className="relative">
              <input id="platformFee" type="text" className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.platformFee} onChange={handleChange} name='platformFee'/>
              <span className="absolute right-3 text-gray-700">$</span>
            </div>

            <label htmlFor="">Withdraw Fee:</label>
            <div className="relative">
                <input type="text"  className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.withdrawFee} onChange={handleChange} name='withdrawFee' />
                <span className="absolute right-3 text-gray-700">%</span>
            </div>

            <label htmlFor="">Internal Transaction Fee:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.internalTransactionFee} onChange={handleChange} name='internalTransactionFee' />
              <span className="absolute right-3 text-gray-700">$</span>
            </div>

            <label htmlFor="">Minimum Crypto Deposit:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.minimumCryptoTransaction} onChange={handleChange} name='minimumCryptoTransaction' />
              <span className="absolute right-3 text-gray-700">$</span>
            </div>

            <label htmlFor="">Minimum Internal Trasaction:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.minimumInternalTransaction} onChange={handleChange} name='minimumInternalTransaction' />
              <span className="absolute right-3 text-gray-700">$</span>
            </div>

            <label htmlFor="">Spacer:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.spacer} onChange={handleChange} name='spacer' />
              <span className="absolute right-3 text-gray-700">Gap</span>
            </div>

            <label htmlFor="">Withdraw Internal:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.withdrawInternal} onChange={handleChange} name='withdrawInternal' />
              <span className="absolute right-3 text-gray-700">Days</span>
            </div>

            <label htmlFor="">Minimum Withdraw:</label>
            <div className="relative">
              <input type="text"   className={`bg-gray-200 border rounded-md px-4 outline-none ${readOnly ? 'cursor-text' : 'cursor-pointer'}`} readOnly={readOnly} value={data.minimumWithdrae} onChange={handleChange} name='minimumWithdrae' />
              <span className="absolute right-3">$</span>
            </div>

            <label htmlFor="">Allow new Sign-Up:</label>
            <Switch disabled={readOnly} onChange={onChange} name="AllownewSignUp" value={data.allowNewSignUp} className='w-7'/> 

            <label htmlFor="">Allow new FC slot:</label>
            <Switch disabled={readOnly} onChange={onChange} value={data.allowNewSlots} name="AllownewFCslot" className='w-7'/>

            <label htmlFor="">Maintenance Mode:</label>
            <Switch disabled={readOnly} onChange={onChange} value={data.maintenanceMode} name="MaintenanceMode" className='w-7'/>

            <label htmlFor="">Referral Commission Slot:</label>
            <div className='relative'>
              <input type="text"  className="bg-gray-200 border  w-full rounded-md" name="referralComission" readOnly={readOnly} value={data.referralComission} onChange={handleChange} />
              <span className='absolute right-3 '>$</span>
            </div>

            <label htmlFor="">Change Password:</label> 
              {showPasswordForm && (
                <>
                <div className="absolute right-0 grid  bottom-16 p-4 bg-white border border-gray-200 ">
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input type="text" name="currentPassword" className='bg-gray-200 border rounded-md px-4 outline-none'  onChange={handleChange} />
                  <label htmlFor="newPassword">New Password:</label>
                  <input type="password" name="newPassword" className='bg-gray-200 border rounded-md px-4 outline-none' onChange={handleChange}/>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="text" name="confirmPassword" className='bg-gray-200 border rounded-md px-4 outline-none'  onChange={handleChange}/>
                  <Button type="primary" onClick={onSavePassword}>Save</Button>
                  </div>   
                </>
              )}

              {!showPasswordForm && !readOnly  ?(
                <Button type="primary" onClick={togglePasswordForm}>Tap To Change Password</Button>
              ):(
                <Button type="primary">Enable Edit To Change</Button>
              )}
          {/* </div> */}
        </div>
      </div>

    </div>
  )
  }

export default Settings;
