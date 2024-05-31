import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import Logo from '../../public/vite.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useNavigate } from 'react-router-dom';
import { Login, sendOTP } from '../services/services';
import { message, Button } from 'antd';


const FormikSignIn = () => {

  const [ sendOTPLoading, setSendOTPLoading ] = useState(false);
  const [ submitLoading, setSubmitLoading ] = useState(false);

  const [ data, setData ] = useState({}); 
  const [ email, setEmail ] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [ showOTPInput, setOTPShowInput ] = useState(false);
  const [ OTP, setOTP ] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6);
    document.getElementById('reload_href').textContent = 'Reload'
  }, []);

  const handleSendOTP = async ()=> {
    setSendOTPLoading(true);
    // console.log(email);
    if(email){
      setOTPShowInput(false);
      await sendOTP({email: email}).then((response)=> {
        setSendOTPLoading(false)
        setOTPShowInput(true)
        // console.log(response);
      }).catch((error)=> {
        messageApi.warning(error.response.data.message)
      })
    }
    else{
      setSendOTPLoading(false)
      // console.log((data.email));
      messageApi.error('Enter Valid Email ID')
    }
  }

   const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    const user_captcha_value = document.getElementById('user_captcha_input').value;
    if (OTP.length == 4) {
        if(validateCaptcha(user_captcha_value)){
            Login({
              email: email,
              otp: OTP
          }).then((response)=>{
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('refId', response.data.data.refId);
                navigate('/DashBoard')
                // setSubmitLoading(false);
            })
            .catch((error)=>{
              // setSubmitLoading(false)
              message.error(error.response.data.message)
            }
            )
        }
        else{
            message.error('Please Enter Valid Captcha')
        }
    }
    else {
        message.error('Please Enter OTP');
    }
    setSubmitLoading(false);

  };

  return (
    <>
      {contextHolder}
    
    <div  className="h-full px-5 gap-5 font-poppins flex flex-col justify-center" 
      style={{
        height: 'calc(100vh - 90px)',
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none" // For Internet Explorer and Edge
      }}>
      <div className='flex justify-center items-center flex-col gap-3'>
        <img src={Logo} className='w-20' alt="Logo" />
        <h1 className='text-xl font-bold text-blue-600'>Login</h1>
        <h2 className='text-lg font-medium text-blue-600'>Welcome Back!</h2>
      </div>
      <div className='flex justify-center items-center w-full'>
        <form className="flex flex-col justify-center items-start w-full gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 relative w-full">
            <label htmlFor='email' className='text-blue-800'>Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder='Enter Your Email'
              className='w-full py-3 rounded-md pl-4 pr-32 outline-none text-sm'
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Button
              loading={sendOTPLoading}
              className='absolute bg-blue-700 text-white px-5 py-1 rounded-md bottom-[0.375rem] right-1'
              onClick={handleSendOTP}
            >
              {sendOTPLoading ? 'Sending' : 'Send OTP'}
            </Button>
          </div>
          {showOTPInput && (
            <div className='flex justify-center w-full'>
              <OTPInput
                name='OTP'
                value={OTP}
                onChange={(e)=>setOTP(e)}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputType='number'
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
          <div className='flex flex-row gap-2 justify-center items-start w-full'>
            <LoadCanvasTemplate />
            <input
            //   type="text"
              id="user_captcha_input"
              name="user_captcha_input"
              placeholder='Enter Captcha'
              className='py-2 w-full rounded-md pl-2 outline-none text-xs'
              onChange={(e) =>setCaptchaText(e.target.value)}
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
            <p className='text-blue-500'>Don't you have an account ? <Link to={`/Signup`} className='text-blue-800'>Sign Up</Link></p>
            
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default FormikSignIn;
