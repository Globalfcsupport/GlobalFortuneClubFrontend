
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios'
import { Register } from '../services/services';

const Signup = () => {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    email: '',
    role: 'user',
    refId: ''
  }

  const [ data, setData ] = useState(initialValues);

  const handleChange = (e)=> {
    setData(prev=> ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    loadCaptchaEnginge(6); 
  }, []);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleGetOTP = (e) => {
    e.preventDefault();
    setShowOTPInput(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user_captcha_value = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha_value)) {
      // alert('Captcha Matched');
      document.getElementById('user_captcha_input').value = "";
      Register(data).then((response)=> {
        console.log(response);
        navigate('/Homepage/Dashboard')
      }).catch((error)=> {
        console.log(error);
      })
    } else {
      alert('Captcha Does Not Match');
      document.getElementById('user_captcha_input').value = "";
    }
  };


  return (
    <div
      className="h-full overflow-auto space-y-1 font-poppins mt-2"
      style={{
        height: 'calc(100vh - 90px)',
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none" // For Internet Explorer and Edge
      }}
    >
      <div className="w-full flex justify-between px-4">
        <button className="text-blue-800">
          <FaArrowLeft size={18} />
        </button>
      </div>
      <div className="flex flex-col flex-grow text-blue-800 text-sm">
        <div className="flex flex-col justify-center items-center py-2">
          <h1 className="text-xl font-bold">Sign Up</h1>
          <span className="">Create an Account</span>
        </div>
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col relative px-7">
            <label htmlFor="refId">Referral ID</label>
            <input
              type="text"
              name="refId"
              className="w-full py-3 rounded-md outline-none"
              onChange={handleChange}
            />
            <button className="absolute bg-blue-800 text-white rounded-md bottom-[0.375rem] right-7 px-6 py-2">Verify</button>
          </div>
          <div className="w-full flex flex-col gap-2 relative px-7">
            <label htmlFor="userName">Enter Your Name</label>
            <input
              type="text"
              name="userName"
              className="w-full py-3 rounded-md outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 relative px-7">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="w-full py-3 rounded-md outline-none"
              onChange={handleChange}
            />
            <button className="absolute bg-blue-800 text-white rounded-md bottom-[0.375rem] right-7 px-3 py-2" onClick={handleGetOTP}>Send OTP</button>
          </div>
          <div>
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
          </div>
          <div className='flex flex-col justify-center items-center w-full px-7'>
            <LoadCanvasTemplate />
            <input
              type="text"
              id="user_captcha_input"
              name="user_captcha_input"
              placeholder='Enter Captcha Value'
              className='w-full py-3 rounded-md pl-2 pr-4 outline-none text-sm mt-2'
              value={captchaText}
              onChange={(e) => setCaptchaText(e.target.value)}
            />
          </div>
          <div className='flex w-full justify-center items-center mt-5'>
            <button
              className="bg-blue-700 w-fit mx-auto text-white px-5 py-1 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className='flex text-sm items-center justify-center w-full'>
            <p className='text-blue-500'>Already have an account?</p>
            <Link to={`/SignIn`} className='text-blue-800'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
