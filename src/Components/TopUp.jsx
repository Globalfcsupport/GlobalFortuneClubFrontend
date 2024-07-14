import React, { useEffect, useState } from "react";
import { getTopUpDetails, topUp } from "../services/services";
import { CiCirclePlus } from "react-icons/ci";
import { Button, message, Select, Radio } from "antd";
import { NavLink } from "react-router-dom";
import { FcExpired } from "react-icons/fc";
import { IoTimeOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";


const { Option } = Select;

const TopUp = () => {
  const [activeTab, setActiveTab] = useState("topUp");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(!loading);
    const data = {
      refId: localStorage.getItem("refId"),
      amount: amount,
    };
    topUp(data)
      .then((response) => {
        setLoading(false);
        window.location.href = response.data.payLink;
      })
      .catch((error) => {
        messageApi.error("An Unknown Error Occured");
        setLoading(false);
      });
  };

  const handleAmount = (e) => {
    let amount = e.target.id;
    document.getElementById("amount").value = amount;
    setAmount(amount);
  };

  const handleChange = (value) => {
    // console.log(value)
    setAmount(value);
  };

  const topUpDetails = async () => {
    const datas = await getTopUpDetails();
    setData(datas.data.Payment);
  };

  useEffect(() => {
    topUpDetails();
  }, []);

  return (
    <div className="w-full flex flex-col h-full font-poppins text-sm overflow-hidden bg-white">
      {contextHolder}

      <div className="bg-[#3d5898] pt-3 w-full">
        <div className="flex relative justify-between px-6 items-center w-full">
          <NavLink
            to="/app/TopUp"
            className={`py-2 px-5 focus:outline-none ${
              activeTab === "topUp"
                ? "bg-white text-pribg-primary rounded-t-md  "
                : "text-white"
            }`}
          >
            TopUp
          </NavLink>
          
          <NavLink
            to="/app/Withdraw"
            className={`py-2 px-5 focus:outline-none ${
              activeTab === "withdraw"
                ? "bg-white text-pribg-primary rounded-t-md "
                : "text-white"
            }`}
          >
            Withdraw
          </NavLink>
          <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='topUp'? 'left-[13%]': 'right-[12%] w-20'}`}></span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-[97%] mx-auto rounded-lg flex flex-col gap-3 mt-5 pb-2 px-1 bg-purple-100 shadow-xl">
          <div className="  px-2 py-3 bg-slate-100">
            <h1 className="font-semibold text-lg text-[#3d5898] px-2 ">
              Select Top Up
            </h1>
            {/* <div className='flex justify-between'>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='50'>50</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='100'>100</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='200'>200</button>
              <button className='px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold' onClick={handleAmount} id='500'>500</button>
            </div> */}
            {/* <div className='relative w-full h-fit'>
              <form onSubmit={handleSubmit}>
                <input required type='number' placeholder='Enter Amount' className='px-4 py-2 text-sm rounded-md w-full' id='amount' onChange={handleChange} value={amount}/>
                <Button loading={loading} htmlType='submit' className='absolute bg-blue-700 px-4 py-1 rounded-lg right-[0.1rem] bottom-[0.20rem] text-white'>{loading? 'Loading' : 'Proceed'}</Button>
              </form>
            </div> */}

            <Select
              className=" mt-3 rounded-md bg-white"
              defaultValue="50"
              style={{ width: 280 }}
              bordered={false}
              suffixIcon={<FaCaretDown className=" text-black text-xl" />}
              onChange={handleChange}
            >
              <Option value="50">50</Option>
              <Option value="100">100</Option>
              <Option value="200">200</Option>
              <Option value="500">500</Option>
            </Select>
          </div>
          <div>
            <div className=" w-[80%] flex justify-evenly  items-center">
              <p className=" capitalize text-[#3d5898] font-semibold ">
                pay with
              </p>
              <Radio defaultChecked className=" rounded-full font-bold text-lg">
                Crypto
              </Radio>
            </div>
            <div className=" capitalize w-full flex justify-end px-8 mt-5">
              <form onSubmit={handleSubmit}>
                <button
                  oading={loading}
                  htmlType="submit"
                  className=" capitalize text-lg font-semibold bg-[#3d5898] text-white py-2 px-6 rounded-full"
                >
                  {loading ? "Loading" : "Proceed"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="px-5 py-3">
          <h1 className="p-3 bg-blue-400 text-white">Recent Top Ups</h1>
          <div className="bg-white w-full max-h-56 overflow-y-scroll">
            {data.length == 0 ? (
              <div>
                <p className="text-center p-5">No TopUp History</p>
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between h-14 px-3 items-center"
                >
                  {item.status == "Paid" ? (
                    <CiCirclePlus size={25} className="text-green-600" />
                  ) : item.status == "Expired" ? (
                    <FcExpired size={20} className="text-red-600" />
                  ) : item.status == "Waiting" ? (
                    <IoTimeOutline className="text-yellow-400" />
                  ) : null}
                  <div>
                    <p className="text-xs text-blue-600">
                      C -{" "}
                      {item.status == "Paid"
                        ? "Paid"
                        : item.status == "Expired"
                        ? "Expired"
                        : item.status == "Waiting"
                        ? "Waiting"
                        : null}
                      , track Id: {item.trackId}
                    </p>
                    <p className="text-xs">
                      Completed {new Date(item.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-blue-600">
                    {item.status == "Paid"
                      ? item.price
                      : item.status == "Expired"
                      ? "-"
                      : item.status == "Waiting"
                      ? "-"
                      : null}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
