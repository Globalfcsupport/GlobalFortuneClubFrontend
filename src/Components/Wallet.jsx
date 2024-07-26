import React, { useEffect, useState } from "react";
import { Fa500Px, FaAccessibleIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { getMywallet } from "../services/services";
import DateComponent from "./datePipeline";
import TimeComponents from "./timePipeline";
import { getDateFilterByMywallet } from "../services/services";


const Wallet = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showDatePicker, setShowDatePicker] = useState(false);


  const allDataStatic = [
    {
      name: "Internal",
      type: "Credit",
      date: "30/05/2024",
      time: "04:34",
      amount: 234.0,
    },
    {
      name: "Crypto",
      type: "Debit",
      date: "30/05/2024",
      time: "04:34",
      amount: 234.0,
    },
    {
      name: "Crypto",
      type: "Credit",
      date: "30/05/2024",
      time: "04:34",
      amount: 234.0,
    },
    {
      name: "Internal",
      type: "Debit",
      date: "30/05/2024",
      time: "04:34",
      amount: 234.0,
    },
  ];

  const [allData, setAllData] = useState(allDataStatic);
  const [cryptoData, setCryptoData] = useState(
    allData.filter((item) => item.name == "Crypto")
  );
  const [internalData, setInternalData] = useState(
    allData.filter((item) => item.name == "Internal")
  );
  const [query, setQuery] = useState("all");
  const [data, SetData] = useState([]);
  const [wallet, setWallet] = useState(0);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getWalletDatas = async () => {
    try {
      let val = await getMywallet(query);
      setWallet(val.data.myWallet);
      SetData(val.data.allTransactions);
    } catch (error) {}
  };

  useEffect(() => {
    getWalletDatas();
  }, [query]);

  const getWalletDataByDateFilter = async (date) => {
    await getDateFilterByMywallet(query, date)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setWallet(res.data.myWallet);
          SetData(res.data.allTransactions);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDateFilter = (e) => {
    const getDate = e.target.value;
    getWalletDataByDateFilter(getDate);
  };
  return (
    <div className="  w-full flex flex-col  bg-white ">
      <div className="flex justify-between   h-25 bg-primary pb-3 pt-1 px-3 text-[12px]  ">
        <div className="flex flex-col justify-center ">
          <label className="text-white" id="calendar">
            Transaction Date
          </label>
          {showDatePicker ? (
          <input
            type="date"
            name="todayReferral"
            id="calendar"
            className="h-5 mt-1 bg-white border rounded-md w-24 text-center px-1"
            onChange={handleDateFilter}
            onBlur={() => setShowDatePicker(false)} 
          />
        ) : (
          <button
            type="button"
            className="h-5 mt-1 bg-white border rounded-md w-24 text-center px-1"
            onClick={() => setShowDatePicker(true)}
          >
          All Day
          </button>
        )}
        </div>
        <div className="flex flex-col justify-end items-end py-1">
          <p className="text-white text-[12px] ">My Wallet</p>
          <p className="bg-white text-right text-xs text-gray-700 rounded-md font-normal h-[1.45rem] w-[85px] px-2 py-1">
          {wallet ? wallet.toFixed(4) : "0.0000"}        
            </p>
        </div>
      </div>
      <div className="flex duration-200 relative justify-between px-0 bg-primary h-7  items-center w-full  ">
        <button
          onClick={() => {
            handleTabClick("All"), setQuery("all");
          }}
          className={`w-28 py-1 flex flex-col gap-2 justify-center items-center focus:outline-bg-none text-xs transition duration-700 ease-in-out ${
            activeTab === "All"
              ? "bg-[#eeeeee] text-black  rounded-t-md"
              : "text-white"
          }`}
        >
          All{" "}
          <p className="w-7 h-0.5 bg-primary rounded-full flex justify-center items-center "></p>
        </button>
        <button
          onClick={() => {
            handleTabClick("Crypto"), setQuery("Crypto");
          }}
          className={`w-28 py-1 flex flex-col gap-2 justify-center items-center  focus:outline-none text-[12px] transition duration-700 ease-in-out ${
            activeTab === "Crypto"
              ? "bg-[#eeeeee] text-black rounded-t-md"
              : "text-white"
          }`}
        >
          Crypto{" "}
          <p className="w-10 h-0.5 bg-primary rounded-md flex justify-center items-center"></p>
        </button>
        <button
          onClick={() => {
            handleTabClick("Internal"), setQuery("Internal");
          }}
          className={`w-28 py-1 flex flex-col gap-2 justify-center items-center  focus:outline-none text-[12px] transition duration-700 ease-in-out  ${
            activeTab === "Internal"
              ? "bg-[#eeeeee] text-black rounded-t-md"
              : "text-white"
          }`}
        >
          Internal{" "}
          <p className="w-12 h-0.5 bg-primary rounded-full flex justify-center items-center"></p>
        </button>

        {/* <span className={h-1 absolute bottom-0 transition-all duration-75 ${activeTab === 'All' ? 'left-0 w-12' : activeTab === 'Crypto' ? 'left-1/3 w-16' : 'right-0 w-20'}}></span> */}
      </div>

      <div>
        {/* {activeTab === "All" && (
          <div>
            {allData.map((item, index) => (
              <div
                key={index}
                className="p-2 flex justify-between items-center"
              >
                {item.type === "Credit" ? (
                  <CiCirclePlus size={30} className="text-green-600" />
                ) : (
                  <CiCircleMinus size={30} className="text-red-600" />
                )}
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.date}&nbsp;&nbsp;{item.time}
                  </p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        )} */}
        {/* {activeTab === "Crypto" && (
          <div>
            {cryptoData.map((item, index) => (
              <div
                key={index}
                className="p-2 flex justify-between items-center"
              >
                {item.type === "Credit" ? (
                  <CiCirclePlus size={30} className="text-green-600" />
                ) : (
                  <CiCircleMinus size={30} className="text-red-600" />
                )}
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.date}&nbsp;&nbsp;{item.time}
                  </p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        )} */}

<div className="w-full h-[410px] bg-[#eeeeee] overflow-y-scroll flex flex-col p-3">
  {data &&
    data.map((item, index) => (
      <div
        key={index}
        className="p-3 flex justify-between items-center text-[10px] "
      >
        {item.received ? (
          <CiCirclePlus size={35} className="text-green-600 " />
        ) : (
          <CiCircleMinus size={35} className="text-red-600 " />
        )}
        <div>
          <p className="text-[12px] text-primary ">
            {item.received ? `${item.type} - IN` : `${item.type} - OUT`}
          </p>
          <p className="text-[9px]">
            <DateComponent date={item.date} />
            &nbsp;&nbsp;
            <TimeComponents date={item.date} />
          </p>
        </div>
        {item.received ? (
          <p className="text-green-600 ">{`+${parseFloat(item.amount).toFixed(4)}`}</p>
        ) : (
          <p className="text-red-600 ">{`-${parseFloat(item.amount).toFixed(4)}`}</p>
        )}
      </div>
    ))}
</div>



      </div>
      <div
      
        className="absolute bottom-0 left-2 w-full shadow-none  pt-1 pb-4  gap-1 selection:  grid grid-cols-3 bg-[#eeeeee] rounded-b-2xl justify-between"
        style={{
          width: "300px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Link
          to="/app/TopUp"
          className="h-7 bg-primary text-center text-white text-[12px] rounded   p-1 text-nowrap  "
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
    </div>
  );
};

export default Wallet;