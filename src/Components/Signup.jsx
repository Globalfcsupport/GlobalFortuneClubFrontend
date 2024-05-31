
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios'
import { Register, verifyUplineId, sendOTP } from '../services/services';
import { message, Button } from 'antd';

const Signup = () => {

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const navigate = useNavigate();
  const [ readOnly, setReadOnly ] = useState(true)
  const [messageApi, contextHolder] = message.useMessage();
  const [ verifyLoading, setVerifyLoading ] = useState(false);
  const [ sendOTPLoading, setSendOTPLoading ] = useState(false);
  const [ submitLoading, setSubmitLoading ] = useState(false);

  const [ data, setData ] = useState({});

  const handleChange = (e)=> {
    console.log(e.target.name,e.target.value);
    setData(prev=> ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    loadCaptchaEnginge(6); 
  }, []);

  const handleVerify = ()=> {
    setVerifyLoading(true);
    setReadOnly(true);
    verifyUplineId({refId: data.uplineId}).then((response)=> {
      setReadOnly(false);
      messageApi.success('Referral ID Verified')
    }).catch((error)=> {
      console.log(error.response.data.message);
      messageApi.error(error.response.data.message)
      // setReadOnly(!readOnly);
    })
    setVerifyLoading(false);
  }

  const handleSendOTP = async ()=> {
    setShowOTPInput(false);
    await sendOTP({email: data.email}).then((response)=> {
      setShowOTPInput(true)
    }).catch((error)=> {
      console.log((error));
    })
  }

  const handleSubmit = (event) => {
    data.otp = otp;
    event.preventDefault();
    const user_captcha_value = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha_value)) {
      document.getElementById('user_captcha_input').value = "";
      Register(data).then((response)=> {
        // console.log(response);
        navigate('/')
      }).catch((error)=> {
        console.log(error);
      })
    } else {
      alert('Captcha Does Not Match');
      document.getElementById('user_captcha_input').value = "";
    }
  };

  return (
    <>
     {contextHolder}
   
    <div
      className="h-full overflow-auto space-y-1 font-poppins px-5"
      style={{
        height: 'calc(100vh - 90px)',
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none" // For Internet Explorer and Edge
      }}
    >
      {/* <div className="w-full flex justify-between px-4">
        <button className="text-blue-800">
          <FaArrowLeft size={18} />
        </button>
      </div> */}
      <div className="flex flex-col h-full justify-center gap-2 flex-grow text-blue-800 text-sm">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <span className="">Create an Account</span>
        </div>
          <div className="w-full flex flex-col relative ">
            <label htmlFor="refId">Referral ID</label>
            <input
              type="text"
              name="uplineId"
              className="w-full py-2 rounded-md outline-none px-5"
              onChange={handleChange}
            />
            <Button loading={verifyLoading} type='button' className="absolute bg-blue-800 text-white rounded-md bottom-[0.15rem] right-[0.1rem] px-6" onClick={handleVerify}>Verify</Button>
          </div>
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="userName">Enter Your Name</label>
            <input
              type="text"
              name="userName"
              readOnly={readOnly}
              className="w-full py-2 rounded-md outline-none px-5"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              readOnly={readOnly}
              className="w-full py-2 rounded-md outline-none pl-5 pr-24"
              onChange={handleChange}
            />
            <button type='button' className="absolute bg-blue-800 text-white rounded-md bottom-1 right-1 px-3 py-1" onClick={handleSendOTP}>Send OTP</button>
          </div>
          <div>
            {(showOTPInput && !readOnly) && (
              <div className='flex justify-center w-full'>
                <OTPInput
                  value={otp}
                  onChange={(value)=>setOtp(value)}
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
          <div className='flex flex-row gap-2 justify-center items-start w-full'>
            <LoadCanvasTemplate />
            <input
              type="text"
              id="user_captcha_input"
              name="user_captcha_input"
              placeholder='Enter Captcha'
              readOnly={readOnly}
              className='w-full py-2 rounded-md pl-2 outline-none text-xs'
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
            <Link to={`/`} className='text-blue-800'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
