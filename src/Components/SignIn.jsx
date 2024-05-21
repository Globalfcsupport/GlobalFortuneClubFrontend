import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import Logo from '../../public/vite.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user_captcha_value = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha_value)) {
      alert('Captcha Matched');
      console.log({ email, otp });
      // Reset captcha input and reload captcha
      loadCaptchaEnginge(6);
      document.getElementById('user_captcha_input').value = "";
    } else {
      alert('Captcha Does Not Match');
      document.getElementById('user_captcha_input').value = "";
    }
  };

  const handleGetOTP = (e) => {
    e.preventDefault();
    setShowOTPInput(true);
  };

  return (
    <div className='w-full h-full font-poppins'>
      <div className='flex justify-center items-center flex-col '>
        <img src={Logo} className='w-20' alt="Logo" />
        <h1 className='text-xl font-medium mt-2 text-blue-600'>Login</h1>
        <h2 className='text-lg font-medium mt-2 text-blue-600'>Welcome Back!</h2>
      </div>
      <div className='flex justify-center items-center w-full px-5'>
        <form className="flex flex-col justify-center items-start w-full gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 relative w-full">
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter Your Email'
              className='w-full py-3 rounded-md pl-2 pr-32 outline-none text-sm'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='absolute bg-blue-700 text-white px-5 py-1 rounded-md bottom-[0.375rem] right-1'
              onClick={handleGetOTP}
            >
              Send OTP
            </button>
          </div>
          {showOTPInput && (
            <div className='flex justify-center w-full'>
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
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
          )}
          <div className='flex flex-col justify-center w-full'>
            <label htmlFor='captcha' className='mb-2'>Enter Captcha</label>
            <div className='flex justify-between items-center w-full'>
              <LoadCanvasTemplate />
              <input
                type="text"
                id="user_captcha_input"
                name="user_captcha_input"
                placeholder='Enter Captcha Value'
                className='w-1/2 py-3 rounded-md pl-2 pr-4 outline-none text-sm ml-4'
                value={captchaText}
                onChange={(e) => setCaptchaText(e.target.value)}
              />
            </div>
          </div>
          <div className='flex w-full justify-center items-center mt-5'>
            <button
              className="bg-blue-700 w-fit mx-auto text-white px-5 py-1 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
