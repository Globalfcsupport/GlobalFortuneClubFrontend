import React, { useEffect, useState } from "react";
import { Fa500Px, FaAccessibleIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { getMywallet } from "../services/services";
import DateComponent from "./datePipeline";
import TimeComponents from "./timePipeline";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("All");

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
  return (
    <div className=" text-sm w-full flex flex-col">
      <div className="flex justify-between bg-primary p-5">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white">Transaction Date</p>
          <input
            type="date"
            name="todayReferral"
            className="mt-1 border rounded-md w-28 py-1 px-2 outline-none text-[0.6rem]"
          />
        </div>
        <div className="flex flex-col justify-end items-end">
          <p className="text-white">My Wallet</p>
          <p className="mt-1 bg-white border rounded-md w-28 text-right py-1 px-2 pl-5">
            ${wallet}
          </p>
        </div>
      </div>
      <div className="flex duration-200 relative justify-between px-3 bg-primary items-center w-full">
        <button
          onClick={() => {
            handleTabClick("All"), setQuery("all");
          }}
          className={`w-28 py-2 flex flex-col justify-center items-center duration-200 focus:outline-none ${
            activeTab === "All"
              ? "bg-white text-blue-800 rounded-t-md"
              : "text-white"
          }`}
        >
          All{" "}
          <p className="w-14 h-1 bg-primary rounded-full flex justify-center items-center"></p>
        </button>
        <button
          onClick={() => {
            handleTabClick("Crypto"), setQuery("Crypto");
          }}
          className={`w-28 py-2 flex flex-col justify-center items-center duration-200 focus:outline-none ${
            activeTab === "Crypto"
              ? "bg-white text-blue-800 rounded-t-md"
              : "text-white"
          }`}
        >
          Crypto{" "}
          <p className="w-14 h-1 bg-primary rounded-full flex justify-center items-center"></p>
        </button>
        <button
          onClick={() => {
            handleTabClick("Internal"), setQuery("Internal");
          }}
          className={`w-28 py-2 flex flex-col justify-center items-center duration-200 focus:outline-none ${
            activeTab === "Internal"
              ? "bg-white text-blue-800 rounded-t-md"
              : "text-white"
          }`}
        >
          Internal{" "}
          <p className="w-14 h-1 bg-primary rounded-full flex justify-center items-center"></p>
        </button>

        {/* <span className={`h-1 absolute bottom-0 transition-all duration-75 ${activeTab === 'All' ? 'left-0 w-12' : activeTab === 'Crypto' ? 'left-1/3 w-16' : 'right-0 w-20'}`}></span> */}
      </div>

      <div className="p-2">
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

        <div>
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className="p-2 flex justify-between items-center"
              >
                {item.received ? (
                  <CiCirclePlus size={30} className="text-green-600" />
                ) : (
                  <CiCircleMinus size={30} className="text-red-600" />
                )}
                <div>
                  <p>{item.type}</p>
                  <p>
                    <DateComponent date={item.createdAt} />
                    &nbsp;&nbsp;
                    <TimeComponents date={item.createdAt} />
                  </p>
                </div>
                <p>${item.amount}</p>
              </div>
            ))}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full shadow-none  p-3 gap-2  grid grid-cols-3 bg-secondary rounded-b-full justify-between"
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
    </div>
  );
};

export default Wallet;
