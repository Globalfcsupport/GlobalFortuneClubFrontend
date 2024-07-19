import React, { useEffect, useState } from "react";
import { FaArrowRight, FaWallet } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ActivateClub } from "../services/services";
import { getDashboardDetails, UpdateProfile } from "../services/services";
import { message, Tooltip } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";

const DashBoard = () => {
  const [data, setData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [editReserveMyWallet, setEditReserveMyWallet] = useState(false);
  const [reserveWallet, setReserveMyWallet] = useState(null);
  const ClubActivation = async () => {
    try {
      let datas = await ActivateClub();
      // console.log(datas);
      if (datas.data) {
        // console.log('inside if');
        messageApi.success(datas.status);
        // console.log(datas.data);
        window.location.reload();
      }
    } catch (error) {}
    console.log("clicked");
  };

  const dashboardDetails = async () => {
    try {
      const datas = await getDashboardDetails();
      setData(datas.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dashboardDetails();
  }, []);

  const handleReserveMyWallet = () => {
    setEditReserveMyWallet(!editReserveMyWallet);
  };

  const handleCancel = () => {
    setEditReserveMyWallet(!editReserveMyWallet);
  };

  const handleConfirm = async () => {
    let data = { reserveMywallet: parseInt(reserveWallet ? reserveWallet : 0) };
    try {
      let values = await UpdateProfile(data);
      if (values.data) {
        dashboardDetails();
      }
    } catch (error) {
    } finally {
      setEditReserveMyWallet(!editReserveMyWallet);
    }

    // try {

    // } catch (error) {

    // }
  };

  const handleClick = (e) => {
    // console.log(e.target.closest("div").className.includes('div'));
    if (!e.target.closest("div").className.includes("div")) {
      setEditReserveMyWallet(!editReserveMyWallet);
    }
  };

  const navigate = useNavigate();
  const Nav = async (path) => {
    navigate(path);
  };

  return (
    <div className="h-full relative  font-poppins">
      {contextHolder}
      <div className="bg-primary p-3 flex justify-between items-center text-white">
        <div>
          <p className="text-sm font-semibold"> {data?.userName}</p>
          <p className="text-sm"> {data.refId}</p>
        </div>
        <button
          disabled={data.started ? true : false}
          className="bg-white text-primary px-5 font-medium py-1 rounded"
          onClick={ClubActivation}
        >
          {data.started ? "Running" : "Start"}
        </button>
      </div>

      <div
        className="h-full overflow-auto space-y-2 mt-2 p-2 "
        style={{
          height: "calc(97vh - 180px)",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        {/* Wallet Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm ">
          <div className="flex justify-between px-1 w-full ">
            <div className="flex px-2 gap-6 items-center">
              <Tooltip
                title="Your primary wallet for all transactions within the platform. You can top up funds, buy slots, and make internal transfers using the balance in your My Wallet."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-textColour cursor-pointer"></FiAlertCircle>
              </Tooltip>
              <span>My Wallet</span>
            </div>

            <div className="flex items-center ">
              <span>{data.wallet?.toFixed(4)}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        {/* Reserve - My Wallet Section */}
        <div
          onClick={handleReserveMyWallet}
          className="bg-white p-1 flex justify-between items-center rounded-lg shadow text-sm"
        >
          <div className="flex justify-between w-full px-1  ">
            <div className="flex px-3 gap-6 items-center">
              <Tooltip
                title="Set a reserve amount to safeguard a portion of your funds. If your My Wallet balance falls below this reserve amount, automatic slot purchases will be paused to prevent overspending."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>
              <span>Reserve - My Wallet</span>
            </div>

            <p className="bg-primary text-white px-9 py-[6px] rounded cursor-pointer">
              ${data.reserveMywallet ? data.reserveMywallet : 0}
            </p>
          </div>
        </div>

        {/* Crowd - Stacking Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center ">
            <div className="flex gap-6 px-2 items-center">
              <Tooltip
                title="A dedicated wallet where 50% of the split amounts from slot purchases are deposited. Funds in Crowd Stack cannot be withdrawn but can only be used to buy slots.."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>
              <span>Crowd Stacking</span>
            </div>

            <div className="flex items-center ">
              <span>${data?.crowdStock?.toFixed(4)}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        {/* Active Slots */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center ">
              <Tooltip
                title="Displays the number of slots currently active and generating dividends for you."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                {" "}
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>

              <span>Active Slots</span>
            </div>
            <div className="flex items-center ">
              <span>{data.activatedTotal}</span>
              <p
                onClick={() => {
                  Nav("/app/FCSLots");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        {/* Completed Slots */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center ">
              <Tooltip
                title="Shows the number of slots you have successfully exited, earning you dividends and platform fees."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>
              <span>Completed Slots</span>
            </div>
            <div className="flex items-center ">
              <span>{data.completedTotal}</span>
              <p
                onClick={() => {
                  Nav("/app/FCSLots");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl cursor-pointer" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center ">
              <Tooltip
                title="The amount of dividend income earned from slot purchases within the current day."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                {" "}
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>

              <span>Yield - Today</span>
            </div>
            <div className=" md:mr-3 ">
              <span>{data.todayYeild?.toFixed(4)}</span>

            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <Tooltip
                title="    Total dividend income earned from slot purchases since joining the platform"
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-textColour cursor-pointer" />
              </Tooltip>
              <span>Yield - Overall</span>
            </div>
            <div className="md:mr-3">
              <span>{data.Yield?.toFixed(4)}</span>
              {/* <MdKeyboardArrowRight className="text-textColour text-2xl" /> */}
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center ">
              <FiAlertCircle className="text-textColour cursor-pointer" />
              <span>Referral Income -Today</span>
            </div>
            <div className="flex items-center ">
              <span>${data.refIncomeToday}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <FiAlertCircle className="text-textColour cursor-pointer" />
              <span>Referral Income -Overall</span>
            </div>
            <div className="flex items-center ">
              <span>${data.refIncomeAll}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <FiAlertCircle className="text-textColour" />
              <span>Total Crypto Top-Up</span>
            </div>
            <div className="flex items-center">
              <span>${data.totalCryptoTopup}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <FiAlertCircle className="text-textColour" />
              <span>Total Crypto Withdraw</span>
            </div>
            <div className="flex items-center">
              <span>$0</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <FiAlertCircle className="text-textColour" />
              <span>Total Internal Transfer IN</span>
            </div>
            <div className="flex items-center">
              <span>${data.internalIn}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
          <div className="flex w-full justify-between px-1 items-center">
            <div className="flex gap-6 px-2 items-center">
              <FiAlertCircle className="text-textColour" />
              <span>Total Internal Transfer OUT</span>
            </div>
            <div className="flex items-center">
              <span>${data.internalOut}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-textColour text-2xl" />
              </p>
            </div>
          </div>
        </div>

        {/* <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
        <div className='flex w-full justify-between px-1 items-center'>
          <div className='flex gap-6 px-2 items-center'>
          <FiAlertCircle className='text-textColour' />
            <span>More Content</span>
          </div>
          <div className='flex items-center'>
            <span>$0</span>
            <MdKeyboardArrowRight className="text-textColour text-2xl" />
          </div>
          </div>
         
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
        <div className='flex w-full justify-between px-1 items-center'>
          <div className='flex gap-6 px-2 items-center'>
          <FiAlertCircle className='text-textColour' />
            <span>More Content</span>
          </div>
          <div className='flex items-center'>
            <span>$0</span>
            <MdKeyboardArrowRight className="text-textColour text-2xl" />
          </div>
          </div>
          
        </div>
        
        <div className='bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm'>
        <div className='flex w-full justify-between px-1 items-center'>
          <div className='flex gap-6 px-2 items-center'>
          <FiAlertCircle className='text-textColour' />
            <span>More Content</span>
          </div>
          <div className='flex items-center '>
            <span>$0</span>
            <MdKeyboardArrowRight className="text-textColour text-2xl" />
          </div>
          </div>
         
        </div> */}
      </div>

      <div
        className="absolute bottom-0 left-0 w-full shadow-none  p-3 gap-2  grid grid-cols-3 bg-secondary rounded-b-3xl justify-between"
        style={{
          width: "350px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Link
          to="/app/TopUp"
          className="bg-primary text-center text-white py-3 px-3 text-sm rounded-md"
        >
          Top Up
        </Link>
        <Link
          to="/app/chats"
          className="bg-primary text-center text-white py-3 text-sm px-3  rounded-md"
        >
          Transfer
        </Link>

        <Link
          to="/app/Withdraw"
          className="bg-primary text-center text-white py-3 px-3 text-sm rounded-md"
        >
          Withdraw
        </Link>
      </div>
      {editReserveMyWallet ? (
        <div
          className="absolute flex justify-center items-center h-full w-full bg-transparent top-0 left-0"
          onClick={handleClick}
        >
          <div className="div bg-white p-5 border border-black rounded-xl h-fit flex flex-col gap-5">
            <p>Reserve - My Wallet</p>
            <input
              type="text"
              className="px-3 py-1 text-sm rounded-lg"
              placeholder="Enter Amount"
              value={reserveWallet}
              onChange={(e) => setReserveMyWallet(e.target.value)}
            />
            <div className="div flex justify-around">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 px-5 rounded-full text-sm py-1 text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-green-600 px-5 rounded-full text-sm py-1 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard;
