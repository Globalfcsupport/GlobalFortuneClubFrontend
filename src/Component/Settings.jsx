import { Switch,Button,message  } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FaRegEdit  } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
const Settings = () => {
  const [readOnly , setReadonly] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const initialValues = {
    platformFee: 10,
    withdrawFee: 8,
    internalTransactionFee: 6,
    minimumCryptoTransaction: 12,
    minimumInternalTransaction:4,
    spacer: 3,
    withdrawInternal: 9,
    minimumWithdrae: 15,
    allowNewSignUp: true,
    allowNewSlots: true,
    maintenanceMode: false,
    referralComission: 10,
    confirmPassword:"",
    newPassword:"",
    currentPassword:""
  }

  const [ data, setData] = useState(initialValues)

  const handleEdit = ()=>{
    setReadonly(!readOnly);
    if (readOnly) {
      message.warning('Please enable editing to make changes.');
    }
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


    // if (passwords.newPassword === passwords.confirmPassword) {
    //   // Send Axios POST request
    //   axios.post('http://localhost:8000/setting', {
    //     newPassword: passwords.newPassword,
    //     confirmPassword: passwords.confirmPassword,
    //   })
    //   .then(response => {
    //     console.log('Password changed successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error changing password:', error);
    //   });
    //   setShowPasswordForm(false);
    // } else {
    //   console.log("New password and confirm password do not match.");
    // }


  return (
    <div className="w-full h-full ">

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

      <div className='h-screen w-full bg-bg_primary p-5 rounded-xl'>
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
            <Switch onChange={onChange} name="AllownewSignUp" value={data.allowNewSignUp} className='w-7'/> 

            <label htmlFor="">Allow new FC slot:</label>
            <Switch onChange={onChange} value={data.allowNewSlots} name="AllownewFCslot" className='w-7'/>

            <label htmlFor="">Maintenance Mode:</label>
            <Switch onChange={onChange} value={data.maintenanceMode} name="MaintenanceMode" className='w-7'/>

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
