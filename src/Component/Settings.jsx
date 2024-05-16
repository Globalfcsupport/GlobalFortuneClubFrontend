import { Switch,Button } from 'antd';
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
    password: 'Leo Dass'
  }

  const [ data, setData] = useState(initialValues)

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
    <div className="w-full h-full relative">
      <div className="flex items-center ">
        <h1 className="font-bold text-blue-600 text-2xl p-4">Settings</h1>
        {readOnly ? (
          <FaRegEdit className='p-0 text-blue-600'onClick={handleEdit }/>
        ):
        (
          <IoSaveOutline className='p-0 text-blue-600' onClick={handleSubmit}/>
        )
        }
      </div>
    <div className="border border-gray-200 ml-10 p-6 w-fit">
      <div className="grid grid-cols-2 gap-2">
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
            <input type="text"  className="bg-gray-200 border  w-full rounded-md" name="ReferralCommissionSlot" readOnly={readOnly} value={data.referralComission} onChange={handleChange} name='platformFee'/>
            <span className='absolute right-3 '>$</span>
            </div>
            <label htmlFor="">Change Password:</label>
            <div className="flex">
            {showPasswordForm && (
            <>
            <div className="absolute right-0 top-0 p-6 bg-white border border-gray-200 z-10">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handleChange} />
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
              <Button type="primary" onClick={onSavePassword}>Save</Button>
              </div>   
            </>
          )}
          {!showPasswordForm && (
            <Button type="primary" onClick={togglePasswordForm}>Tap To Change Password</Button>
          )}
      </div>
      </div>
    </div>
    </div>
  )
}

export default Settings;
