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
  const [paymentInputDisabled, setPaymentInputDisabled] = useState(false);
  const [settting, setSetting] = useState({});
  const [usdtNetwork, setUsdtNetwork] = useState("TRC20");

  const handleUSDTAddress = () => {
    setEditUSDTAddress(!editUSDTAddress);
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
    GetMydetails();
    getSettings();
    const rmount = data.amount - (data.amount / 100) * networkFee;
    setReceivableAmount(rmount);
  }, [data.amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let paymentData = {
      requestAmt: data.amount,
      receivableAmt: receivableAmount,
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
      } catch (error) {}
    }
  };

  return (
    <div className="w-full flex flex-col h-full font-poppins text-sm overflow-y-auto " style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
      {contextHolder}

      <div className="bg-blue-800 pt-3 w-full h-screen scroll-y-auto">
        <div className="flex relative justify-between px-6 items-center w-full">
          <NavLink
            to="/app/TopUp"
            className="py-2 px-5 focus:outline-none  text-white"
          >
            TopUp
          </NavLink>
          <NavLink
            to="/app/withdraw"
            className="py-2 px-5 focus:outline-none bg-white text-blue-700 rounded-tr-lg rounded-tl-lg"
          >
            Withdraw
          </NavLink>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        <div className="flex justify-end flex-col">
          <p className="text-blue-600 font-semibold py-2">My Wallet</p>
          <p className="text-center w-full bg-MainSection text-white px-5 py-1 rounded-lg">
            ${myDetails.myWallet ? myDetails.myWallet : 0}
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="USDTAddress"
                className="text-blue-600 font-semibold"
              >
                Enter Your USDT Address (TRC - 20)
              </label>
              <input
                placeholder="Enter USDT Address"
                readOnly={editUSDTAddress}
                id="USDTAddress"
                name="USDTAddress"
                type="text"
                className="px-3 py-1 rounded-md"
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
              <label htmlFor="usdtNetwork" className="text-blue-600 font-semibold">
                USDT Network
              </label>
              <select
                id="usdtNetwork"
                name="usdtNetwork"
                className="px-3 py-1 rounded-md"
                value={usdtNetwork}
                onChange={(e) => setUsdtNetwork(e.target.value)}
              >
                <option value="TRC20">TRC20</option>
                <option value="BEP20">BEP20</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="amount" className="text-blue-600 font-semibold">
                Enter Amount
              </label>
              <div className="relative">
                <input
                  placeholder="Enter Amount"
                  required
                  id="amount"
                  name="amount"
                  type="number"
                  className="px-3 py-1 rounded-md w-full"
                  onChange={handleChange}
                  value={data.amount}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">USDT</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-blue-600 font-semibold">
                Admin & Network Fee
              </label>
              <div className="relative">
                <input
                  id="networkfee"
                  value={networkFee + "%"}
                  className="px-3 py-1 rounded-md bg-white w-full"
                  readOnly
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">USDT</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-blue-600 font-semibold">
                Receivable Amount
              </label>
              <div className="relative">
                <input
                  id="ramount"
                  readOnly={true}
                  value={receivableAmount ? receivableAmount : 0}
                  type="text"
                  className="px-3 py-1 rounded-md w-full"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">USDT</span>
              </div>
            </div>
            
            <Button
              loading={loading}
              htmlType="submit"
              className="bg-blue-700 px-4 h-10 font-semibold rounded-lg text-white"
            >
              {loading ? "Loading" : "Withdraw"}
            </Button>
          </form>
        </div>
        <div className="px-5 text-xs">
          <ul className="list-disc text-gray-600">
            <li>Minimum Withdraw is 12</li>
            <li>Withdraw allowed only once in 24 hours</li>
            <li>Withdraw processing time is 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
