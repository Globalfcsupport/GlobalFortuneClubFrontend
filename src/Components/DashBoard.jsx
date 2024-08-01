import React, { useEffect, useState } from "react";
import { FaArrowRight, FaWallet } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ActivateClub } from "../services/services";
import { getDashboardDetails, UpdateProfile } from "../services/services";
import { message, Tooltip } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

const DashBoard = () => {
  // const [data, setData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [editReserveMyWallet, setEditReserveMyWallet] = useState(false);  
  const [reserveWallet, setReserveMyWallet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ started: false });


  const ClubActivation = async () => {
    setLoading(true);
    try {
      let datas = await ActivateClub();
       // console.log(datas);
      if (datas.data) {
        messageApi.success(datas.status);
         // console.log(datas.data);
        window.location.reload();
        setTimeout(() => {
          setLoading(false);
        }, 6000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
   
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
    if (parseInt(reserveWallet) > data.wallet) {
      setError("Reserve amount exceeds than wallet balance.");
      return;
    }
    let datas = { reserveMywallet: parseInt(reserveWallet ? reserveWallet : 0) };
    try {
      let values = await UpdateProfile(datas);
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

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const yieldToday = data.todayYeild?.toFixed(4)

  const yieldValue = data.Yield?.toFixed(4);


  const getFontSizeClass = (Value) => {
    const length = Value.toString().length;
    if (length > 10) return  element.style.fontSize = '12px';
    else if (length > 7) return element.style.fontSize = '14px';
    else if (length > 4) return element.style.fontSize = '16px';
    else return element.style.fontSize = '18px';
  };

  
  


  return (
    <div className="h-full relative ">
      {contextHolder}
      <div className="bg-primary px-4 py-3 flex justify-between items-center text-white">
        <div>
          <p className="text-[11px] font-semibold"> {capitalizeFirstLetter(data?.userName)}</p>
          <p className="text-[10px]"> ID: {data.refId}</p>
        </div>
        {/* <button
          disabled={data.started ? true : false}
          className={data.started?"bg-white text-green-500 text-[10px] px-6 py-2.5 font-medium rounded ":"bg-white text-primary text-[15px] px-5 font-medium py-1 rounded "}
          onClick={ClubActivation}
        >
          {data.started ? "Running" : "Start"}
        </button> */}
         <button
         loading={loading} 
        disabled={data.started || loading}

        className={
        data.started
          ? "bg-white text-green-500 text-[10px] px-6 py-2.5 font-medium rounded"
          : "bg-white text-primary text-[15px] px-5 font-medium py-1 rounded"
      }
      onClick={ClubActivation}
    >
      {loading ? (
        < ImSpinner8 size={20} className="animate-spin text-2xl text-primary mx-auto"/>
      ) : data.started ? (
        "Running"
      ) : (
        "Start"
      )}
    </button>
      </div>

      <div
        className="h-[80%] bg-customLightGray overflow-auto space-y-1.5 mt-0 pt-1 px-2"
        style={{
          // height: "calc(97vh - 180px)",
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
        {/* Wallet Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center ">
            <div className="flex px-2 pl-1 gap-3 items-center">
              <Tooltip
                title="Your primary wallet for all transactions within the platform. You can top up funds, buy slots, and make internal transfers using the balance in your My Wallet."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip" 
                color="rgba(128, 128, 128, 1)"
                
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer"></FiAlertCircle>
              </Tooltip>
              <span className=" text-[12.5px] text-textColour">My Wallet</span>
            </div>

            <div className="flex items-center">
              <span className="fontweight">${data.wallet?.toFixed(4)}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                   {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2 " /> */}
              </p>
            </div>
          </div>
        </div>

        {/* Reserve - My Wallet Section */}
        <div
          onClick={handleReserveMyWallet}
          className="bg-white p-[3px] flex justify-between items-center rounded-lg  text-sm "
        >
          <div className="flex  justify-between w-full  ">
            <div className="flex px-2 gap-3 items-center">
              <Tooltip
                title="Set a reserve amount to safeguard a portion of your funds. If your My Wallet balance falls below this reserve amount, automatic slot purchases will be paused to prevent overspending."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px]  cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Reserve - My Wallet</span>
            </div>

            <p className="bg-primary  fontweight text-[11px] text-white px-11 py-1.5 items-center rounded-md cursor-pointer mr-[3px]">
              ${data.reserveMywallet ? data.reserveMywallet : 0}
            </p>
          </div>
        </div>

        {/* Crowd - Stacking Section */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex px-2 pl-1 gap-3 items-center">
              <Tooltip
                title="A dedicated wallet where 50% of the split amounts from slot purchases are deposited. Funds in Crowd Stack cannot be withdrawn but can only be used to buy slots.."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px]  cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Crowd Stacking</span>
            </div>

            <div className="flex items-center ">
              <span className="fontweight">${data?.crowdStock?.toFixed(4)}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                 {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* Active Slots */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex px-2 pl-1 gap-3 items-center ">
              <Tooltip
                title="Displays the number of slots currently active and generating dividends foryou."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                {" "}
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>

              <span className="text-textColour text-[12.5px]">Active Slots</span>
            </div>
            <div className="flex items-center ">
              <span className="fontweight">${data.activatedTotal}</span>
              <p
                onClick={() => {
                  Nav("/app/FCSLots");
                }}
                className="cursor-pointer"
              >
                  {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* Completed Slots */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex px-2 pl-1 gap-3 items-center ">
              <Tooltip
                title="Shows the number of slots you have successfully exited, earning you dividends and platform fees."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Completed Slots</span>
            </div>
            <div className="flex items-center ">
              <span className="fontweight">${data.completedTotal}</span>
              <p
                onClick={() => {
                  Nav("/app/FCSLots");
                }}
                className="cursor-pointer"
              >
                   {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* yield today */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex px-2  pl-1 gap-3 items-center">
              <Tooltip
                title="The amount of dividend income earned from slot purchases within the current day."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                {" "}
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
                
              <span className="text-textColour text-[12.5px]">Yield - Today</span>
            </div>
            <div className=" md:mr-[24px]  ">
              <span className={`fontweight ${()=>{getFontSizeClass(yieldToday)}}`}>${yieldToday}</span>
            </div>
          </div>
        </div>
          {/* yield overall */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex px-2  pl-1 gap-3 items-center">
              <Tooltip
                title="    Total dividend income earned from slot purchases since joining the platform"
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Yield - Overall</span>
            </div>
            <div className=" md:mr-[24px] ">
              <span className={`fontweight ${()=>{getFontSizeClass(yieldValue)}}`}>${yieldValue}</span>
              {/* <MdKeyboardArrowRight className="text-textColour text-2xl" /> */}
            </div>
          </div>
        </div>
          {/* Refferal incomne today */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">

           
            <div className="flex px-2  pl-1 gap-3 items-center">
              <Tooltip
                title="The income generated from referrals' 
                slot purchases within the current day."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Refferal Income - Today</span>
            </div>
            <div className="flex items-center ">
              <span className="fontweight">${data.refIncomeToday}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                  {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>
          {/* Referral income overall */}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            
            <div className="flex px-2  pl-1 gap-3 items-center">
              <Tooltip
                title="Total income earned from referrals' slot purchases since joining the platform."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Refferal Income - Overall</span>
            </div>
            <div className="flex items-center ">
              <span className="fontweight">${data.refIncomeAll}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                   {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>
          {/* Toatal crypto top-up*/}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
           
            <div className="flex px-2 pl-1 gap-3 items-center">
              <Tooltip
                title="The total amount of cryptocurrency deposited into your account as top-ups"
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Total Crypto Top-Up</span>
            </div>
            <div className="flex items-center">
              <span className="fontweight">${data.totalCryptoTopup}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                  {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* Toatal crypto withdraw*/}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
           
            <div className="flex px-2 pl-1 gap-3 items-center">
              <Tooltip
                title="The total amount of cryptocurrency withdrawn from your account."
                placement="bottomRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Total Crypto Withdraw</span>
            </div>
            <div className="flex items-center">
              <span className="fontweight">$0</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                  {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-2 flex justify-between items-center rounded-lg shadow text-sm">
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
        </div> */}

        {/* Toatal internal transfer in*/}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            
            <div className="flex px-2 pl-1 gap-3 items-center">
              <Tooltip
                title="The total amount of cryptocurrency received 
                from internal transfers within the platform."
                placement="topRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Total Internal Transfer IN</span>
            </div>
            <div className="flex items-center">
              <span className="fontweight">${data.internalIn}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                   {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>

        {/* Toatal internal transfer out*/}
        <div className="bg-white p-2 flex justify-between items-center rounded-lg text-sm pr-3">
          <div className="flex w-full justify-between items-center">
            
            <div className="flex px-2 pl-1 gap-3 items-center ">
              <Tooltip
                title="The total amount of cryptocurrency sent out through 
                internal transfers within the platform."
                placement="topRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                overlayClassName="custom-tooltip"
                color="rgba(128, 128, 128, 1)"
              >
                <FiAlertCircle className="text-[#9da4af] size-[11px] cursor-pointer" />
              </Tooltip>
              <span className="text-textColour text-[12.5px]">Total Internal Transfer OUT</span>
            </div>
            <div className="flex items-center">
              <span className="fontweight">${data.internalOut}</span>
              <p
                onClick={() => {
                  Nav("/app/Wallet");
                }}
                className="cursor-pointer"
              >
                  {/* <MdKeyboardArrowRight className="text-gray-300 size-6 ml-2" /> */}
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

          
        {/* className="absolute bottom-0 left-2 w-full shadow-none  pt-1 pb-4  gap-1 selection:  grid grid-cols-3 bg-[#eeeeee] rounded-b-2xl justify-between"
        style={{
          width: "300px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      > */}
      
        <div
      className="absolute bottom-0 left-2 w-full shadow-none px-2 pt-1 pb-3  gap-1 selection:  grid grid-cols-3 bg-[#eeeeee] rounded-b-3xl justify-between"
      style={{
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Link
        to="/app/TopUp"
        className="h-7 bg-primary text-center text-white text-[12px] rounded p-1   text-nowrap  "
      >
        Top Up
      </Link>
      <Link
        to="/app/chats"
        className="h-7 bg-primary text-center text-white text-[12px]   rounded   p-1 text-nowrap  "
      >
        Transfer
      </Link>

      <Link
        to="/app/Withdraw"
        className="h-7 bg-primary text-center text-white text-[12px] rounded   p-1 text-nowrap  "
      >
        Withdraw
      </Link>
    </div>
    
      
      {editReserveMyWallet ? (
        <div
          className="absolute flex justify-center items-center h-full w-full bg-gray-400 bg-opacity-40 top-0 left-0"
          onClick={handleClick}
        >
          <div
            className="bg-purple-50 w-[250px] p-8 rounded-xl h-fit opacity-100 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()} 
          >

            
            <p className="text-lg  font-semibold">Reserve - My Wallet</p>
            <input
              type="text"
              className="px-4 py-3 text-sm rounded-lg border"
              placeholder="Enter Amount"
              value={reserveWallet}
              onChange={(e) => setReserveMyWallet(e.target.value)}
            />
             {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
            <div className="flex justify-around">
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-primary w-25 px-5 rounded-lg text-sm py-1.5 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard;
