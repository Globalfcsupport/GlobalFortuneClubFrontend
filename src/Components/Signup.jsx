
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Register, verifyUplineId, sendOTP } from '../services/services';
import { message, Button } from 'antd';
import { IoReload } from 'react-icons/io5';

const Signup = () => {

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [captcha, setCaptcha] = useState('');
  const navigate = useNavigate();
  const [ readOnly, setReadOnly ] = useState(true)
  const [messageApi, contextHolder] = message.useMessage();
  const [ verifyLoading, setVerifyLoading ] = useState(false);
  const [ sendOTPLoading, setSendOTPLoading ] = useState(false);
  const [ submitLoading, setSubmitLoading ] = useState(false);
  const [ OTP, setOTP ] = useState('');
  const [ data, setData ] = useState({
    otp:'',
    email:'',
    uplineId:'',
    userName:''
  });
  const [ refDetails, setRefDetails ] = useState({});
  const [ showRefDetails, setShowRefDetails ] = useState(false);
  const [changeCaptcha, setChangeCaptcha ] = useState(false)

  const handleChange = (e)=> {
    // console.log(e.target.name,e.target.value);
    if(e.target.name=='uplineId'){
      setData(prev=> ({
        ...prev, [e.target.name]: e.target.value.toUpperCase()
      }))
      // console.log('inside if');
    }
    else{
      setData(prev=> ({
        ...prev, [e.target.name]: e.target.value
      }))
    }
  }

  useEffect(() => {
    captchaGenerator();
  }, [changeCaptcha]);

  const handleVerify = ()=> {
    setVerifyLoading(true);
    setReadOnly(true);
    verifyUplineId({refId: data.uplineId}).then((response)=> {
      setReadOnly(false);
      setRefDetails(response.data);
      setShowRefDetails(true)
      messageApi.success('Referral ID Verified')
    }).catch((error)=> {
      // console.log(error.response.data.message);
      messageApi.error(error.response.data.message);
      setRefDetails({});
      setShowRefDetails(false)
      // setReadOnly(!readOnly);
    })
    setVerifyLoading(false);
  }

  const handleSendOTP = async ()=> {
    setSendOTPLoading(true);
    setShowOTPInput(false);
    await sendOTP({email: data.email}).then((response)=> {
      setShowOTPInput(true);
      messageApi.success("OTP Sent Successfully!")
    }).catch((error)=> {
      // console.log((error));
      messageApi.warning("Please Enter Valid Email ID")
    })
    setSendOTPLoading(false);
  }

  const handleSubmit = (event) => {
    // console.log('inside submit');
    data["otp"] = OTP;
    // console.log(data);
    event.preventDefault();
    if (captcha===captchaText) {
      if(data.userName!='' && data.email!=''){
      console.log(data)
        Register(data).then((response)=> {
          // console.log(response);
          navigate('/')
        }).catch((error)=> {
          messageApi.error(error.response.data.message);
        })
      }
      else{
        messageApi.warning('Please Enter All Details')
      }
    } else {
      alert('Captcha Does Not Match');
    }
  };

  const captchaGenerator = ()=> {
    let text = ''
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]

    for( let i = 1; i <= 6; i++){
      let random = Math.ceil(Math.random()*letters.length-1);
      text = text + letters[random]
    }

    setCaptchaText(text)
  }

  const handleBackSpace = (e)=> {
    const target = e.target;
    const key = e.key.toLowerCase();
 
    if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
          // e.target.setAttribute('readOnly', false);
            prev.focus();
        }
        return;
    }
  }

  const handleInput = (e)=> {
    const target = e.target;
    const val = target.value;
 
    if (isNaN(val)) {
        target.value = "";
        return;
    }
 
    if (val != "") {
      handleOTP()
      const next = target.nextElementSibling;
      if (next) {
            // e.target.setAttribute('readOnly', true);
            next.focus();
        }
    }
  }

  const handleOTP = (val)=> {
    let text = ''
    const tags = document.querySelectorAll('.inputs input');
    tags.forEach((item)=> {
      text = text + item.value;
    })
    setOTP(text)
    // console.log(text);
  }

  return (
    <>
     {contextHolder}
   
      <div className="flex flex-col h-fit py-5 justify-center gap-2 flex-grow text-blue-800 text-sm px-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <span className="">Create an Account</span>
        </div>
          <div className="w-full flex flex-col relative ">
            <label htmlFor="refId" className='font-semibold text-blue-800'>Referral ID</label>
            <input
              type="text"
              name="uplineId"
              value={data.uplineId}
              placeholder='Enter Referral ID'
              className="w-full py-2 rounded-md px-5"
              onChange={handleChange}
            />
            <Button loading={verifyLoading} type='button' className="absolute bg-blue-800 text-white rounded-md bottom-[0.20rem] right-[0.25rem] px-6" onClick={handleVerify}>Verify</Button>
          </div>
          {showRefDetails ? 
            <div className='flex flex-col justify-center items-center'>
              <p>User Name: {refDetails.userName}</p>
              <p>Ref ID: {refDetails.refId}</p>
            </div> : null
          }
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="userName" className='font-semibold text-blue-800'>Enter Your Name</label>
            <input
              type="text"
              name="userName"
              placeholder='Enter Your Name'
              readOnly={readOnly}
              className="w-full py-2 rounded-md px-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="email" className='font-semibold text-blue-800'>Email</label>
            <input
              type="text"
              name="email"
              placeholder='Enter Your Email ID'
              readOnly={readOnly}
              className="w-full py-2 rounded-md pl-5 pr-28"
              onChange={handleChange}
              required
            />
            <Button loading={sendOTPLoading} type='button' className="absolute bg-blue-800 text-white rounded-md bottom-1 right-1 px-3 py-1" onClick={handleSendOTP}>Send OTP</Button>
          </div>
          <div>
          {showOTPInput && (
            <div className='flex flex-col gap-2 justify-center w-full'>
              <label htmlFor='email' className='font-semibold text-blue-800 text-center'>OTP</label>
              <div className='inputs flex justify-center gap-3'>
                <input onKeyUp={handleBackSpace} onInput={handleInput} placeholder='' maxLength={1} type='text' className='w-10 h-10 rounded-md'/>
                <input onKeyUp={handleBackSpace} onInput={handleInput} placeholder='' maxLength={1} type='text' className='w-10 h-10 rounded-md'/>
                <input onKeyUp={handleBackSpace} onInput={handleInput} placeholder='' maxLength={1} type='text' className='w-10 h-10 rounded-md'/>
                <input onKeyUp={handleBackSpace} onInput={handleInput} placeholder='' maxLength={1} type='text' className='w-10 h-10 rounded-md'/>
              </div>                                                                                                                                                                                                                                                                                                                 
            </div>
          )}
          </div>
          <div className='flex flex-col gap-2 justify-center items-start w-full'>
            <h1 className='font-semibold text-blue-800'>Enter Captcha</h1>
            <p className='text-center w-full py-1 text-sm rounded-md mx-auto tracking-[1rem] bg-white select-none relative'>{captchaText}<IoReload onClick={()=>setChangeCaptcha(!changeCaptcha)} className='absolute top-0 right-1 translate-y-1/2'/></p>
            <input
              placeholder='Enter Captcha'
              className='py-2 w-full rounded-md pl-2 text-xs'
              onChange={(e)=> setCaptcha(e.target.value)}
              required
              type='text'
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
            <p className='text-blue-500'>Already have an account?
            <Link to={`/`} className='text-blue-800'> Sign In</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
