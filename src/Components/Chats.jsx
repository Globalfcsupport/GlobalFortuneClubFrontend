import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { susers } from "../utils/Users";
import { getUsersForChats } from "../services/services";
import { FaSearch, FaUser } from "react-icons/fa";
import { BaseURL } from "../utils/const";

const Chats = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const [datas, setDatas] = useState([]);

  const handleChat = (item) => {
    setActiveChat(item.userName);
    handleNavigate(item._id);
  };

  const handleNavigate = (item) => {
    navigate(`${item}`);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const getUsers_ForChats = async () => {
    try {
      let apiResponse = await getUsersForChats();
      setDatas(apiResponse.data);
      setUsers(apiResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers_ForChats();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filteredUsers = users.filter((item) =>
        item.userName.toLowerCase().includes(searchText.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(datas);
    }
  }, [searchText]);

  console.log(users, "users");

  return (
    <div className="rounded-bl-3xl rounded-br-3xl flex flex-col relative h-full">
      <div className="px-3 py-3 sticky top-0 bg-primary">
        <div className="relative h-fit">
          <input
            type="text"
            onChange={handleSearch}
            className="px-4 py-2 text-sm w-full hover:bg-gray-100 focus:bg-white border-none rounded-md"
            placeholder="Search User by UserId"
          />
          <FaSearch className="absolute top-2 right-2 text-primary" />
        </div>
      </div>
      <div className="w-full h-full overflow-scroll flex flex-col gap-[6px] py-2 pl-2 pr-1">
        {users.length == 0 ? (
          <p className="h-full justify-center flex items-center">No Users</p>
        ) : (
          users?.map((item, index) => (
            <div
              key={index}
              className={`bg-white flex gap-5 p-2 items-center cursor-pointer rounded-md`}
              onClick={() => handleChat(item)}
            >
              {item.image ? (
                <img
                  src={`${BaseURL}/${item.image}`}
                  alt="user profile pic"
                  className="cursor-pointer h-10 w-10 object-cover rounded-full"
                />
              ) : (
                <div className="bg-gray-300 rounded-full h-10 w-10 grid justify-center items-center ">
                  <span className="font-semibold text-2xl h-full w-full text-primary flex justify-center items-center">
                    {item.userName.toUpperCase().split("")[0]}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">{item.userName}</p>
                {/* <p className="text-xs">Last Message</p> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chats;
