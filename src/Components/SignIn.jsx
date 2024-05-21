import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import Logo from '../../public/vite.svg';
import ReCAPTCHA from "react-google-recaptcha";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const [isOTPEnabled, setIsOTPEnabled] = useState(false);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, otp });
  };
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleGetOTP = () => {
    setIsOTPEnabled(true);
  };

  return (
    <div className='w-full h-full font-poppins'>
      <div className='flex justify-center items-center flex-col p-10'>
        <img src={Logo} className='w-20' alt="" />
        <h1 className='text-xl font-medium mt-5 text-blue-600'>Login</h1>
        <h2 className='text-lg font-medium mt-3 text-blue-600'>Welcome Back !</h2>
      </div>
      <div className='flex justify-center items-center w-full px-5'>
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        <form className="flex flex-col justify-center items-start w-full gap-5">
          <div className="flex flex-col gap-2 relative w-full">
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" placeholder='Enter Your Email' className='w-full py-3 rounded-md pl-2 pr-32 outline-none text-sm'/>
            <button className='absolute bg-blue-700 text-white px-5 py-1 rounded-md bottom-[0.375rem] right-1 'onClick={handleGetOTP}>Send OTP</button>
          </div>
          <div className='flex justify-center w-full'>
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={4}
              isDisabled={!isOTPEnabled}
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
                outline: 'none',
                fontFamily: 'poppins'
              }}
            />
          </div>
          <div className='flex justify-center w-full'>
            <ReCAPTCHA
              sitekey="your_site_key"
              onChange={handleRecaptchaChange}
            />
           
          </div>
          <div className='flex w-full justify-center items-center'>
               <button className="bg-blue-700 w-fit mx-auto text-white px-5 py-1 rounded-md bottom-[0.375rem] right-1" type="submit"  >
              Submit
            </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default SignIn;
