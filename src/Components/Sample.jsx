import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Register, verifyUplineId, sendOTP, signupOTP } from "../services/services";
import { message, Button } from "antd";
import { IoReload } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const Sample = () => {
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
    if (e.target.name === "uplineId") {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toUpperCase(),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refId = params.get('refId');
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
        messageApi.error(error.response.data.message);
        setRefDetails({});
        setShowRefDetails(false);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };

  const handleSendOTP = async () => {
    setSendOTPLoading(true);
    setShowOTPInput(false);
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
        next.focus();
      }
    }
  };

  const handleOTP = () => {
    const inputs = document.querySelectorAll("#otp > *[id]");
    let otp = "";
    inputs.forEach((input) => {
      otp += input.value;
    });
    setOTP(otp);
  };

  return (
    <div className="auth-container">
      {contextHolder}
      <div className="header">
        <Link to="/" className="back-icon">
          <IoIosArrowBack />
        </Link>
        <h3>Signup</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="userName"
            value={data.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Referral ID</label>
          <div className="ref-input">
            <input
              type="text"
              name="uplineId"
              value={data.uplineId}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <Button
              onClick={() => handleVerify(data.uplineId)}
              disabled={!data.uplineId}
              loading={verifyLoading}
            >
              Verify
            </Button>
          </div>
        </div>
        {showRefDetails && (
          <div className="ref-details">
            <p>{refDetails.userName}</p>
            <p>{refDetails.email}</p>
          </div>
        )}
        <div className="form-group">
          <label>Captcha</label>
          <div className="captcha-container">
            <div className="captcha">{captchaText}</div>
            <IoReload onClick={() => setChangeCaptcha((prev) => !prev)} />
          </div>
          <input
            type="text"
            name="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>OTP</label>
          <div className="otp-container">
            <div id="otp">
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
              <input
                type="text"
                maxLength="1"
                onInput={handleInput}
                onKeyUp={handleBackSpace}
              />
            </div>
            <Button
              onClick={handleSendOTP}
              loading={sendOTPLoading}
              disabled={!data.email}
            >
              Send OTP
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          loading={submitLoading}
          disabled={submitLoading}
        >
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Sample;
