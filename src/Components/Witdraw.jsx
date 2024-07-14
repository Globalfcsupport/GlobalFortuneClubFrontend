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
    <div className="w-full flex flex-col h-full font-poppins text-sm overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {contextHolder}

      <div className="bg-primary pt-3 w-full h-screen">
        <div className="flex relative justify-between px-6 items-center w-full">
          <NavLink
            to="/app/TopUp"
            className="py-2 px-5 focus:outline-none text-white"
          >
            TopUp
          </NavLink>
          <NavLink
            to="/app/withdraw"
            className="py-2 px-5 focus:outline-none bg-white text-primary rounded-tr-lg rounded-tl-lg"
          >
            Withdraw
          </NavLink>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        <div className="flex justify-end flex-col">
          <p className="text-primary font-semibold py-2">My Wallet</p>
          <p className="text-center w-full bg-primary text-white px-5 py-1 rounded-lg">
            ${myDetails.myWallet ? myDetails.myWallet : 0}
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="USDTAddress" className="text-primary font-semibold">
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
              <label htmlFor="usdtNetwork" className="text-primary font-semibold">
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
              <label htmlFor="amount" className="text-primary font-semibold">
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
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">USDT</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-primary font-semibold">
                Admin & Network Fee
              </label>
              <div className="relative">
                <input
                  id="networkfee"
                  value={networkFee + "%"}
                  className="px-3 py-1 rounded-md border-primary w-full bg-white"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">USDT</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-primary font-semibold">
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
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">USDT</span>
              </div>
            </div>
            
            <Button
              loading={loading}
              htmlType="submit"
              className="bg-primary px-4 h-10 font-semibold rounded-lg text-white"
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
