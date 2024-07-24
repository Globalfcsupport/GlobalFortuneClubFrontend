import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSaveOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {
  getSettingInfo,
  getUserByAuth,
  Withdrawrequest,
} from "../services/services";

const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [editUSDTAddress, setEditUSDTAddress] = useState(true);
  const [networkFee, setNetworkFee] = useState(0);
  const [receivableAmount, setReceivableAmount] = useState("");
  const [data, setData] = useState({});
  const [myDetails, setMydetails] = useState({});
  const [settting, setSetting] = useState({});
  const [usdtNetwork, setUsdtNetwork] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const handleUSDTAddress = () => {
    setEditUSDTAddress(!editUSDTAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure the value is a number and doesn't exceed myDetails.myWallet
    if (name === "amount") {
      if (Number(value) > myDetails.myWallet) {
        messageApi.warning(`Insufficient balance`);
        return;
      }
    }
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const GetMydetails = async () => {
    try {
      let datas = await getUserByAuth();
      setMydetails(datas.data);
      console.log(datas.data, "LPLPLP");
    } catch (error) {}
  };

  const getSettings = async () => {
    try {
      let datas = await getSettingInfo();
      setSetting(datas.data);
      setNetworkFee(
        datas.data.internalTransactionFee
          ? datas.data.internalTransactionFee
          : 2
      );
    } catch (error) {}
  };

  useEffect(() => {
    const rmount = data.amount - (data.amount / 100) * networkFee;
    setReceivableAmount(rmount);
  }, [data.amount]);

  useEffect(() => {
    GetMydetails();
    getSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usdtNetwork) {
      messageApi.error("Please select a USDT network.");
      return;
    }

    let paymentData = {
      requestAmt: data.amount,
      receivableAmt: receivableAmount,
      usdtNetwork: usdtNetwork,
    };

    setLoading(true);
    if (data.amount <= 0) {
      messageApi.error("Can't Withdraw Amount Less than $0");
      setLoading(false);
    } else {
      try {
        let val = await Withdrawrequest(paymentData);
        console.log(val.data);
        setLoading(false);
        GetMydetails();

        messageApi.success("Requested Raised Successfully");
      } catch (error) {
        setLoading(false);
        messageApi.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    
    
    <div
      className="w-full pt-1 pb-5  bg-white flex flex-col h-full font-poppins text-[12px] overflow-y-auto "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {contextHolder}

      <div className="bg-primary pt-4 w-full h-screen">
        <div className="flex relative justify-between px-6 items-center w-full">
          <NavLink
            to="/app/TopUp"
            className="py-2 px-5 focus:outline-none text-white"
          >
            TopUp
          </NavLink>
          <NavLink
            // to="/app/Withdraw"

            className="py-2 px-4 focus:outline-none bg-white text-black rounded-tl-md rounded-tr-md "
          >
            Withdraw
          </NavLink>
          <span className={`h-0.5 bg-primary absolute w-[60px] rounded-lg bottom-1 transition-all duration-75 ${activeTab==='Withdraw'? 'left-[15%]': 'right-[12%] w-20'}`}></span>

        </div>
      </div>

      <div className="px-5 flex flex-col gap-5">
        <div className="flex justify-end flex-col ">
          <p className="text-primary font-semibold py-2 text-[14px]">My Wallet</p>
          <p className="text-center w-full bg-primary  text-white px-5 py-2 rounded-md">
            ${myDetails.myWallet ? myDetails.myWallet : 0 }
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="USDTAddress"
                className="text-primary font-semibold text-[14px]"
              >
                Enter Your USDT Address (TRC - 20)
              </label>
              <input
                placeholder="Enter USDT Address"
                readOnly={editUSDTAddress}
                id="USDTAddress"
                name="USDTAddress"
                type="text"
                className="px-3 py-1 rounded-md hover:bg-gray-50 focus:bg-white border-none"
                onChange={handleChange}
                value={myDetails.USDTAddress ? myDetails.USDTAddress : ""}
              />
              {editUSDTAddress ? (
                <HiOutlinePencil
                  size={15}
                  className="absolute bottom-2 right-2"
                  onClick={handleUSDTAddress}
                />
              ) : (
                <IoSaveOutline
                  size={15}
                  className="absolute bottom-2 right-2"
                  onClick={handleUSDTAddress}
                />
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="usdtNetwork"
                className="text-primary font-semibold text-[14px]"
              >
                USDT Network
              </label>
              <select
                id="usdtNetwork"
                name="usdtNetwork"
                className="px-3 py-1 rounded-md"
                style={{ color: usdtNetwork === "" ? "#999" : "#000" }}
                value={usdtNetwork}
                onChange={(e) => setUsdtNetwork(e.target.value)}
              >
                <option value="" disabled>
                  Select Network
                </option>
                <option value="TRC20">TRC20</option>
                <option value="BEP20">BEP20</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="amount" className="text-primary text-[14px] font-semibold">
                Enter Amount
              </label>
              <div className="relative">
                <input
                  placeholder="Enter Amount"
                  required
                  id="amount"
                  name="amount"
                  type="number"
                  className="px-3 py-1 rounded-md w-full hover:bg-gray-50"
                  onChange={handleChange}
                  value={data.amount}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  USDT
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-primary text-[14px] font-semibold">
                Admin & Network Fee
              </label>
              <div className="relative">
                <input
                  id="networkfee"
                  value={networkFee + "%"}
                  className="px-3 py-1 rounded-md border-primary w-full border-none hover:bg-gray-50 bg-customLightGray"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  USDT
                </span>
              </div>
              </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-primary text-[14px] font-semibold">
                Receivable Amount
              </label>
              <div className="relative">
                <input
                  id="ramount"
                  readOnly={true}
                  value={receivableAmount ? receivableAmount : 0}
                  type="text"
                  className="px-3 py-1 rounded-md w-full border-none hover:bg-gray-50 bg-customLightGray"
                />

                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  USDT
                </span>
              </div>
            </div>

            <Button
              loading={loading}
              htmlType="submit"
              className="bg-gray-400 px-4 h-10  rounded-lg text-white text-xl font-semibold hover:bg-gray-300">
              {loading ? "Loading" : "Withdraw"}
            </Button>
          </form>
        </div>
        <div className="px-2  py-2 text-[9px]   bg-customLightGray rounded-xl">
            <p > Minimum Withdraw is 12 Withdraw allowed only once in 24 hours Withdraw processing time is 24 hours</p>
        </div>
      </div>
    </div>
   
  );
};

export default Withdraw;
