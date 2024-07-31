import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Register, verifyUplineId, sendOTP, signupOTP } from "../services/services";
import { message, Button } from "antd";
import { IoReload } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import classNames from 'classnames';

const Signup = () => {
  const [timer, setTimer] = useState(0);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [readOnly, setReadOnly] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [data, setData] = useState({
    otp: "",
    email: "",
    uplineId: "",
    userName: "",
  });
  const [refDetails, setRefDetails] = useState({});
  const [showRefDetails, setShowRefDetails] = useState(false);
  const [changeCaptcha, setChangeCaptcha] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "uplineId") {
      setData((prev) => ({
        ...prev,
        [name]: value.toUpperCase(),
      }));
    } else if (name === "userName") {
      let formattedValue = value.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove non-alphanumeric characters except spaces

      // Ensure no more than two consecutive spaces
      formattedValue = formattedValue.replace(/\s{3,}/g, "  ");

      // Capitalize the first letter of each word
      formattedValue = formattedValue
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

      // Limit to 15 characters
      formattedValue = formattedValue.substring(0, 15);

      setData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    captchaGenerator();
  }, [changeCaptcha]);


  // for referal code
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refId = params.get('refId');
    console.log(refId, "ref")
    if (refId) {
      setData((prev) => ({ ...prev, uplineId: refId }));
      handleVerify(refId);
    }
  }, [location.search]);


  const handleVerify = (uplineId) => {
    setVerifyLoading(true);
    setReadOnly(true);
    verifyUplineId({ refId: uplineId })
      .then((response) => {
        if (response.data.activeSlot) {
          setReadOnly(false);
          setRefDetails(response.data);
          setShowRefDetails(true);
          messageApi.success("Referral ID Verified");
        } else {
          messageApi.warning("Invalid Referral ID");
        }
      })
      .catch((error) => {
          // console.log(error.response.data.message);

        messageApi.error(error.response.data.message);
        setRefDetails({});
        setShowRefDetails(false);
         // setReadOnly(!readOnly);

      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };

  const handleSendOTP = async () => {
    setSendOTPLoading(true);
    // setShowOTPInput(false);
    setTimeout(() => {
      setSendOTPLoading(false);
      // setTimer(60); // For example, start a 60-second timer
      const countdown = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }, 3000); 
    await signupOTP({ email: data.email })
      .then((response) => {
        setShowOTPInput(true);
        setTimer(60);
        messageApi.success("OTP Sent Successfully!");
      })
      .catch((error) => {
        messageApi.error(error.response.data.message);
      });
    setSendOTPLoading(false);
    // setTimeout(() => {
    //   setSendOTPLoading(false);
     
    // }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    data["otp"] = OTP;

    if (captcha !== captchaText) {
      alert("Captcha Does Not Match");
      setSubmitLoading(false);
      return;
    }

    if (data.userName === "" || data.email === "") {
      messageApi.warning("Please Enter All Details");
      setSubmitLoading(false);
      return;
    }
    console.log(data);
    Register(data)
      .then((response) => {
        navigate("/app/DashBoard");
      })
      .catch((error) => {
        messageApi.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const captchaGenerator = () => {
    let text = "";
    const letters = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
      "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
      "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];

    for (let i = 1; i <= 6; i++) {
      let random = Math.ceil(Math.random() * letters.length - 1);
      text = text + letters[random];
    }

    setCaptchaText(text);
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
          // e.target.setAttribute('readOnly', true);
        next.focus();
      }
    }
  };

  const handleOTP = () => {
    let text = "";
    const tags = document.querySelectorAll(".inputs input");
    tags.forEach((item) => {
      text = text + item.value;
    });
    setOTP(text);
     // console.log(text);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="w-full h-[580px] overflow-y-auto">
      <>
    
    {contextHolder}
    <div className="flex justify-start pt-5 pl-5 text-blueColor  items-center gap-2">
      <Link to="/"><IoIosArrowBack size={30} className="md:-ml-36 lg:-ml-0" /></Link>
    </div>

    <div className="flex flex-col h-fit py-5 justify-center gap-4 flex-grow text-blueColor text-sm px-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-semibold  text-blueColor ">Sign Up</p>
        <h5 className="text-[16px] font-semibold  text-blueColor ">Create an Account</h5>
      </div>
      <div className="w-full flex flex-col relative">
        <label htmlFor="refId" className="py-2 text-[12px]  font-semibold text-blueColor ">
          Referral ID
        </label>
        <input
          type="text"
          name="uplineId"
          value={data.uplineId}
          placeholder="Enter Referral ID"
          className="w-full py-2  rounded-md px-5 mt-[-0.41rem]  h-[2.5rem] border-[1.5px] border-gray-400 hover:bg-transparent focus:bg-white text-black"
          onChange={handleChange}
        />
        <button
          loading={verifyLoading}
          type="button"
          className="absolute text-[13px] font-semibold bg-buttonbg text-white rounded-sm bottom-[0.15rem] right-[0.11rem] h-[2.25rem] px-6"
          onClick={() => handleVerify(data.uplineId)}
        >
          Verify
        </button>
      </div>
      {showRefDetails && (
        <div className="flex flex-col text-[13px] justify-center  text-blueColor items-center">
          <p>User Name: {capitalizeFirstLetter(refDetails.userName)}</p>
          <p>Ref ID: {refDetails.refId}</p>
        </div>
      )}
      <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2 relative">
          <label htmlFor="userName" className=" text-[12px] font-semibold  text-blueColor">
            Enter Your Name
          </label>
          <input
            type="text"
            name="userName"
            placeholder=""
            readOnly={readOnly}
            className="w-full py-2 mt-[-0.41rem]  h-[2.5rem] rounded-md px-5 hover:bg-transparent border-[1.5px]   border-gray-400 bg-white text-black focus:bg-white"
            onChange={handleChange}
            maxLength={15}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <label htmlFor="email" className="font-semibold text-[12px] text-blueColor">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder=""
            readOnly={readOnly}
            className="w-full py-2 rounded-md mt-[-0.41rem] h-[2.5rem] pl-[8px] pr-[92px] hover:bg-transparent  border-[1.5px] border-gray-300 text-black focus:bg-white"
            onChange={handleChange}
            required
          />
          

          <button
    loading={sendOTPLoading}
    type="button"
    className={classNames("absolute w-[35%] text-[11px] font-bold text-white bg-primary rounded-sm bottom-[0.1rem] right-[0.11rem] h-[2.25rem] px-[17px] py-1 ", {
      'bg-primary': timer > 0,
      'bg-buttonbg': timer === 0,
      ' cursor-not-allowed': timer > 0
    })}
    onClick={handleSendOTP}
    disabled={timer > 0}
  >
    {sendOTPLoading ? (
      <ImSpinner8 className="animate-spin text-2xl text-white mx-auto" />
    ) : (
      timer > 0 ? `${timer}` : "Send OTP"
    )}
  </button>
          
        </div>
        <div>
          {/* {showOTPInput && ( */}
            <div className="flex flex-col gap-1 justify-center w-full">
              <label
                htmlFor="email"
                className="text-[12px] font-semibold   text-blueColor"
              >
                OTP
              </label>
              <div className="inputs flex justify-center gap-8">
                <input
                  onKeyUp={handleBackSpace}
                  onInput={handleInput}
                  placeholder=""
                  maxLength={1}
                  type="text"
                  className="w-10 h-10 rounded-md hover:bg-transparent  text-black focus:bg-white"
                />
                <input
                  onKeyUp={handleBackSpace}
                  onInput={handleInput}
                  placeholder=""
                  maxLength={1}
                  type="text"
                  className="w-10 h-10 rounded-md hover:bg-transparent  text-black focus:bg-white"
                />
                <input
                  onKeyUp={handleBackSpace}
                  onInput={handleInput}
                  placeholder=""
                  maxLength={1}
                  type="text"
                  className="w-10 h-10 rounded-md hover:bg-transparent  text-black focus:bg-white"
                />
                <input
                  onKeyUp={handleBackSpace}
                  onInput={handleInput}
                  placeholder=""
                  maxLength={1}
                  type="text"
                  className="w-10 h-10 rounded-md hover:bg-transparent  text-black focus:bg-white"
                />
              </div>
            </div>
          {/* )} */}
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <h1 className="font-sans font-semibold  text-blueColor">Enter Captcha</h1>
          <p className="text-center w-full py-1 text-sm rounded-md mx-auto tracking-[1rem]  text-black bg-white select-none relative">
            {captchaText}
            <IoReload
              onClick={() => setChangeCaptcha(!changeCaptcha)}
              className="absolute top-0 right-1 translate-y-1/2"
            />
          </p>
          <input
            placeholder=""
            className="py-2 w-full rounded-md pl-2 text-xs hover:bg-transparent h-[2.5rem] focus:bg-white text-black"
            onChange={(e) => setCaptcha(e.target.value)}
            required
            type="text"
          />
        </div>
        <div className="flex w-full justify-center items-center mt-5 relative">
          <button
            className="bg-customBlue text-[13px] font-medium w-fit mx-auto text-white px-6 py-2 rounded-md flex items-center justify-center"
            type="submit"
            disabled={submitLoading}
          >
            {submitLoading && (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            )}
            {submitLoading ? "Submit" : "Submit"}
          </button>
        </div>
        <div className="flex text-sm items-center justify-center w-full">
          <p className="pt-3 text-[13px] text-blueColor">
            Already have an account?
            <Link to={`/`} className="text-[14.5px] font-semibold  text-blueColor">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  </>
    </div>
  );
};

export default Signup;