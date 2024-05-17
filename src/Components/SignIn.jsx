import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import Logo from '../../public/vite.svg';
import Button from 'react-bootstrap/Button';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, otp });
  };

  return (
    <div className='w-full h-full'>
      <div className='flex justify-center items-center flex-col p-10'>
        <img src={Logo} className='w-20' alt="" />
        <h1 className='text-xl font-medium mt-5 text-blue-600'>Login</h1>
        <h2 className='text-lg font-medium mt-3 text-blue-600'>Welcome Back !</h2>
      </div>
      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-blue-600 mb-2'>Email</label>
            <div className='relative flex items-center mb-6'>
              <input
                type="text"
                name="email"
                id="email"
                className='pl-4 pr-24 py-2 border border-gray-300 rounded-md w-full h-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className='absolute right-0 h-full px-3 bg-blue-600 text-white rounded-r-md'
              >
                Send OTP
              </button>
            </div>
            <label htmlFor="otp" className='text-blue-600 mb-2'>OTP</label>
            <div className="flex justify-between mb-4">
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                // renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
                isInputNum
                shouldAutoFocus
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 0.5rem',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(0,0,0,0.3)',
                  textAlign: 'center',
                }}
              />
            </div>
            <Button className="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
