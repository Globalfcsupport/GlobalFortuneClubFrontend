import React, { useState, useEffect } from 'react';
import OTPInput from "react-otp-input";
import Logo from '../assets/Image/logo-remove.png';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplateNoReload, LoadCanvasTemplate } from 'react-simple-captcha';
import { Link, useNavigate } from 'react-router-dom';
import { Login, sendOTP } from '../services/services';
import { message, Button } from 'antd';
import { IoReload } from 'react-icons/io5';

const FormikSignIn = () => {
  
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showOTPInput, setOTPShowInput] = useState(false);
  const [OTP, setOTP] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [changeCaptcha, setChangeCaptcha] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    captchaGenerator();
  }, [changeCaptcha]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleSendOTP = async () => {
    if (timer > 0) return;
    
    setSendOTPLoading(true);
    if (email) {
      setOTPShowInput(false);
      await sendOTP({ email }).then((response) => {
        setSendOTPLoading(false);
        setOTPShowInput(true);
        messageApi.success("OTP Sent Successfully!");
        setTimer(60);
      }).catch((error) => {
        messageApi.warning(error.response.data.message);
        setSendOTPLoading(false);
      });
    } else {
      setSendOTPLoading(false);
      messageApi.error('Enter Valid Email ID');
    }
  };

  const handleInput = (e) => {
    const target = e.target;
    const val = target.value;

    if (isNaN(val)) {
      target.value = "";
      return;
    }

    if (val !== "") {
      handleOTP();
      const next = target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  };

  const handleOTP = () => {
    let text = '';
    const tags = document.querySelectorAll('.inputs input');
    tags.forEach((item) => {
      text += item.value;
    });
    setOTP(text);
  };

  const handleBackSpace = (e) => {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key === "backspace" || key === "delete") {
      target.value = "";
      const prev = target.previousElementSibling;
      if (prev) {
        prev.focus();
      }
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    if (OTP.length === 4) {
      if (captcha === captchaText) {
        Login({ email, otp: OTP })
          .then((response) => {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refId', response.data.data.refId);
            localStorage.setItem('userName', response.data.data.userName);
            localStorage.setItem('email', response.data.data.email);
            messageApi.success("Logged In Successfully!");
            navigate('app/DashBoard');
          })
          .catch((error) => {
            message.error(error.response.data.message);
          });
      } else {
        message.error('Please Enter Valid Captcha');
      }
    } else {
      message.error('Please Enter OTP');
    }
    setSubmitLoading(false);
  };

  const captchaGenerator = () => {
    let text = '';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 1; i <= 6; i++) {
      let random = Math.floor(Math.random() * letters.length);
      text += letters[random];
    }

    setCaptchaText(text);
  };

  return (
    <>
      {contextHolder}
      <div className='h-full py-5 overflow-y-scroll w-full flex justify-center items-center'>
        <div className="px-5 gap-5 font-poppins flex flex-col justify-center items-center">
          <div className='flex justify-center items-center flex-col gap-1'>
            <img src={Logo} className='w-28' alt="Logo" />
            <h2 className='text-xl font-medium text-blue-600'>Welcome Back!</h2>
            <p className='text-xs'>Please Enter Your Email and OTP</p>
          </div>
          <div className='flex justify-center items-center w-full'>
            <form className="flex flex-col justify-center items-start w-full gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 relative w-full">
                <label htmlFor='email' className='font-semibold text-blue-800'>Email</label>
                <input required type="email" name="email" placeholder='Enter Your Email' className='w-full py-3 rounded-md pl-4 pr-32 text-sm' onChange={(e) => setEmail(e.target.value)} />
                <Button loading={sendOTPLoading} className='absolute bg-blue-700 text-white px-5 py-1 rounded-md bottom-[0.375rem] h-9 right-[0.325rem]' onClick={handleSendOTP} disabled={timer > 0}>
                  {timer > 0 ? `(${timer})` : sendOTPLoading ? 'Sending' : 'Send OTP'}
                </Button>
              </div>
              {showOTPInput && (
                <div className='flex flex-col gap-2 justify-center w-full'>
                  <label htmlFor='email' className='font-semibold text-blue-800 text-center'>OTP</label>
                  <div className='inputs flex justify-center gap-3'>
                    <input onKeyUp={handleBackSpace} onInput={handleInput} maxLength={1} placeholder='' type='text' className='w-10 h-10 rounded-md' />
                    <input onKeyUp={handleBackSpace} onInput={handleInput} maxLength={1} placeholder='' type='text' className='w-10 h-10 rounded-md' />
                    <input onKeyUp={handleBackSpace} onInput={handleInput} maxLength={1} placeholder='' type='text' className='w-10 h-10 rounded-md' />
                    <input onKeyUp={handleBackSpace} onInput={handleInput} maxLength={1} placeholder='' type='text' className='w-10 h-10 rounded-md' />
                  </div>
                </div>
              )}
              <div className='flex flex-col gap-2 items-start w-full'>
                <h1 className='font-semibold text-blue-800'>Enter Captcha</h1>
                <p className='text-center w-full py-1 text-sm rounded-md mx-auto tracking-[1rem] bg-white relative select-none'>{captchaText}<IoReload onClick={() => setChangeCaptcha(!changeCaptcha)} className='absolute top-0 right-1 translate-y-1/2' /></p>
                <input
                  placeholder='Enter Captcha'
                  className='py-2 w-full rounded-md pl-2 text-xs'
                  onChange={(e) => setCaptcha(e.target.value)}
                />
              </div>

              <div className='flex w-full justify-center items-center mt-5'>
                <Button
                  loading={submitLoading}
                  className="bg-blue-700 w-fit mx-auto text-white px-5 py-1 rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className='flex text-sm items-center justify-center w-full'>
                <p className='text-blue-500'>Don't you have an account? <Link to={`/Signup`} className='text-blue-800'>Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormikSignIn;
