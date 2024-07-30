import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getUserByRefId } from "../services/services";
import { BaseURL } from "../utils/const";
import userIcon from "../assets/Image/user.png";
import { SearchFilter } from "../utils/SearchComp";
import { IoMdSearch } from "react-icons/io";

const Referrals = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getRefDetails = async () => {
    try {
      let values = await getUserByRefId();
      console.log(values.data, "ref");
      setTodayReferral(values.data.todayCount);
      setOverallReferral(values.data.overallCount);
      setUsers(values.data.overallData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRefDetails();
  }, []);

  useEffect(() => {
    const result = SearchFilter(users, searchTerm);
    setFilteredData(result);
  }, [users, searchTerm]);

  const formatName = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="h-full">
      <div className="flex flex-col bg-primary p-3 gap-3.5">
        <div className="relative">
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Search ID/Name"
            className="w-full px-3 py-2 text-sm pr-10 border hover:bg-gray-100 focus:bg-white rounded-md outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <style jsx>{`
            input::placeholder {
              font-size: 14px;
              color: #4d5561;
            }
          `}</style>
          <button>
            <IoMdSearch className="absolute size-6 top-1.5 right-2 text-primary cursor-pointer" />
          </button>
        </div>

        <div className="flex justify-between text-[12px] px-4 gap-2">
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-white">Referral - Today</p>
            <p className="bg-white rounded-md w-[4.2rem] h-[1.4rem] pt-[0.15rem] text-center">
              {todayReferral}
            </p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-white">Referral - Overall</p>
            <p className="bg-white rounded-md w-[4.2rem] h-[1.4rem] pt-[0.15rem] text-center">
              {overallReferral}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[80%] bg-[#eeeeee] flex flex-col overflow-scroll py-2 pl-2 pr-1 gap-2">
        {Array.isArray(filteredData) &&
          filteredData.map((item, index) => {
            const firstLetter = item.userName
              ? item.userName.charAt(0).toUpperCase()
              : "";
            return (
              <div
                key={index}
                className="px-2 rounded-md shadow-top flex items-center bg-white"
              >
                <div className="border-[3px] rounded-full border-gray-200 ">
                  {item.image ? (
                    <img
                      src={`${BaseURL}${item.image}`}
                      className="size-10 h-12 w-12 rounded-full object-cover"
                      alt="User"
                    />
                  ) : (
                    <div
                      className="h-12 w-12 rounded-full flex items-center text-xl font-bold justify-center text-white"
                      style={{ backgroundColor: "rgb(158, 158, 158)" }}
                    >
                      <p> {firstLetter}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 w-full flex flex-col gap-1">
                  <p className="font-semibold text-[14px] text-blueColor">
                    {formatName(item.userName)}
                  </p>
                  <p className="text-blueColor text-[13px] font-semibold  ">
                    ID: {item.refId}
                  </p>
                  
                  <p className="text-gray-800 text-[10.5px] ">
                    Email: {item.email}
                  </p>
                  <p className="text-gray-800 text-[10px] ">
                    DOJ: {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 text-[10.5px] ">
                      Active slot: 2
                    </p>
                    <p className="text-gray-800 text-[10.5px] ">
                      Completed slot: 1
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Referrals;