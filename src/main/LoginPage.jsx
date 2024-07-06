// import React, { useState } from "react";
import ill from "../assets/Images/gfcauth.png";
import { LoginInitValues, LoginSchema } from "../validations/login";
import { useFormik } from "formik";
import { Login } from "../services/servicces";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const forms = useFormik({
    initialValues: LoginInitValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => submitForms(values),
  });

  const submitForms = async (val) => {
    try {
      let response = await Login(val);
      if (response.data) {
        localStorage.setItem("gfcadmintoken", response.data.token);
        messageApi.open({
          type: "success",
          content: "Logged In Successfully",
        });
        navigate("/homepage/dashboard")
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <div className="w-full h-screen bg-bg_primary flex flex-col md:flex-row justify-between">
        <div className="hidden md:flex w-[50%]">
          <img src={ill} alt="" className="h-full w-full" />
        </div>

        <div className="w-full md:w-[50%] m-auto flex justify-center items-center">
          <form className="w-full px-4 sm:px-8 md:px-0 justify-center">
            <h1 className="text-center font-poppins text-3xl mb-6 font-bold ">
              Admin Login
            </h1>
            <div className="w-full m-auto">
              <div className="flex justify-center p-4 m-auto items-center">
                <input
                  type="email"
                  required
                  className="h-12 w-full md:w-[40%] rounded-full pl-5 outline-none font-poppins"
                  placeholder="E-mail"
                  name="email"
                  id="email"
                  value={forms.values.email}
                  onChange={forms.handleChange}
                />
              </div>
              <div className="flex justify-center p-4 m-auto items-center">
                <input
                  type="password"
                  required
                  className="h-12 w-full md:w-[40%] rounded-full pl-5 outline-none font-poppins"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={forms.values.password}
                  onChange={forms.handleChange}
                />
              </div>
              {(forms.errors.email && forms.touched.email) ||
              (forms.errors.password && forms.touched.password) ? (
                <div className="text-center text-red-500 font-semibold font-poppins">
                  Please Enter Valid Email & Password!
                </div>
              ) : null}
              <div className="flex justify-center p-4 m-auto items-center">
                <input
                  type="submit"
                  value="Login"
                  className="h-12 w-full md:w-[40%] items-center rounded-full pl-5 outline-none font-poppins bg-primary text-white cursor-pointer font-semibold text-xl"
                  onClick={forms.handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
