import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { IoReload } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Image/logo-remove.png";
import { Login, sendOTP } from "../services/services";
import { ImSpinner8 } from "react-icons/im";
import classNames from 'classnames';

const FormikSignIn = () => {
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showOTPInput, setOTPShowInput] = useState(false);
  const [OTP, setOTP] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [changeCaptcha, setChangeCaptcha] = useState(false);
  const [timer, setTimer] = useState(0);

  const AuthGuard = () => {
    localStorage.clear();
  };

  useEffect(() => {
    captchaGenerator();
  }, [changeCaptcha]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  useEffect(() => {
    AuthGuard();
  }, []);


  

  const handleSendOTP = async () => {
    if (timer > 0) return;

    setSendOTPLoading(true);
    //for
   
    if (email) {
      
      // setOTPShowInput(false);
      setTimeout(() => {
        setSendOTPLoading(false);
       
      }, 4000);
      await sendOTP({ email })
        .then((response) => {
          setSendOTPLoading(false);
          setOTPShowInput(true);
          messageApi.success("OTP Sent Successfully!");
          setTimer(60);
        })
        .catch((error) => {
          messageApi.warning(error.response.data.message);
          setSendOTPLoading(false);
        });
    } else {
      setSendOTPLoading(false);
      messageApi.error("Enter Valid Email ID");
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
    let text = "";
    const tags = document.querySelectorAll(".inputs input");
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
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("refId", response.data.data.refId);
            localStorage.setItem("userName", response.data.data.userName);
            localStorage.setItem("email", response.data.data.email);
            messageApi.success("Logged In Successfully!");

            navigate("app/DashBoard");
          })
          .catch((error) => {
            message.error(error.response.data.message);
          });
      } else {
        message.error("Please Enter Valid Captcha");
      }
    }
    // else {
    //   message.error("Please Enter OTP");
    // }
    setSubmitLoading(false);
  };

  const captchaGenerator = () => {
    let text = "";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 1; i <= 6; i++) {
      let random = Math.floor(Math.random() * letters.length);
      text += letters[random];
    }

    setCaptchaText(text);
  };

  return (
    <>
      {contextHolder}
      <div className="h-full py-5 overflow-y-scroll w-full flex justify-center items-center">
        <div className="gap-5 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-1">
            <img src={Logo} className="w-[28%]" alt="Logo" />
            <p className="text-blueColor mt-5 text-xl font-semibold">Login</p>
            <h2 className="text-md mt-2.5 font-semibold text-blueColor">
              Welcome Back !
            </h2>
          </div>
          <div className="px-5 flex justify-center items-center w-full">
            <form
              className="flex flex-col justify-center items-start w-full gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1 relative w-full">
                <label
                  htmlFor="email"
                  className="font-semibold text-[12px] text-blueColor"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder=""
                  className="w-full py-2.5 h-[2.5rem] rounded-md pl-[8px] pr-[85px] text-sm border-[1.5px] border-black hover:bg-transparent"
                  focus:bg-white
                  focus:outline-none
                  focus:border-none
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <button
                  loading={sendOTPLoading}
                  className="absolute text-[10px] font-medium bg-customBlue mt-2 text-white rounded-md top-[0.95rem] bottom-[0.375rem] h-10 right-[0.100rem] w-20  hover:shadow-sm"
                  onClick={handleSendOTP}
                  disabled={timer > 0}
                >
                  {timer > 0
                    ? ${timer}
                    : sendOTPLoading
                    ? "Sending"
                    : "Send OTP"}
                </button> */}
                <button
                 loading={sendOTPLoading}
                 className={classNames(
                   "absolute text-[10px] font-bold bg-customBlue mt-2 text-white rounded-sm top-[1rem] h-[2.25rem] right-[0.110rem] w-20 hover:shadow-sm",
                   {   'bg-gray-400': timer > 0,
          'bg-customBlue': timer === 0, 'opacity-50 cursor-not-allowed': timer > 0 }
                 )}
                 onClick={handleSendOTP}
                 disabled={timer > 0}
               >
                 {sendOTPLoading ? (
                   < ImSpinner8 className="animate-spin text-2xl text-white mx-auto" />
                 ) : (
                              timer > 0 ? `${timer}` : "Send OTP"
                 )}
               </button>
              </div>
              {/* {showOTPInput && ( */}
              <div className="flex mt-2 flex-col gap-1 justify-center w-full">
                <label
                  htmlFor="email"
                  className="font-semibold text-[12px] text-blueColor "
                >
                  OTP
                </label>
                <div className="inputs flex justify-center gap-8">
                  <input
                    onKeyUp={handleBackSpace}
                    onInput={handleInput}
                    maxLength={1}
                    placeholder=""
                    type="text"
                    className="w-10 h-10 rounded-md hover:bg-transparent  text-black  focus:bg-white"
                  />
                  <input
                    onKeyUp={handleBackSpace}
                    onInput={handleInput}
                    maxLength={1}
                    placeholder=""
                    type="text"
                    className="w-10 h-10 rounded-md hover:bg-transparent  text-black  focus:bg-white"
                  />
                  <input
                    onKeyUp={handleBackSpace}
                    onInput={handleInput}
                    maxLength={1}
                    placeholder=""
                    type="text"
                    className="w-10 h-10 rounded-md hover:bg-transparent  text-black  focus:bg-white"
                  />
                  <input
                    onKeyUp={handleBackSpace}
                    onInput={handleInput}
                    maxLength={1}
                    placeholder=""
                    type="text"
                    className="w-10 h-10 rounded-md hover:bg-transparent  text-black  focus:bg-white"
                  />
                </div>
              </div>
              {/* )} */}
              <div className="flex mt-2 flex-col gap-1 items-start w-full">
                <h1 className="font-semibold text-[12px] text-blueColor">
                  Enter Captcha
                </h1>
                <p className="text-center w-full py-1 text-sm rounded-md mx-auto tracking-[1rem] bg-white relative select-none">
                  {captchaText}
                  <IoReload
                    onClick={() => setChangeCaptcha(!changeCaptcha)}
                    className="absolute top-0 right-1 translate-y-1/2 "
                  />
                </p>
                <input
                  placeholder="Enter Captcha"
                  className="py-2 mt-1 w-full h-[2.5rem] rounded-md pl-2 text-xs hover:bg-transparent focus:bg-white"
                  onChange={(e) => setCaptcha(e.target.value)}
                />
              </div>

              <div className="flex w-full justify-center items-center mt-4">
                <button
                  loading={submitLoading}
                  className=" bg-buttonbg w-fit mx-auto text-white text-[12px] font-semibold px-6 py-2 rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="flex items-center justify-center w-full">
                <p className="text-blueColor text-[13px]">
                  Don't you have an account?{" "}
                  <Link
                    to={`/Signup`}
                    className="text-[14.5px] font-semibold text-blueColor"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormikSignIn;