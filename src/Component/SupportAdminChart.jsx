import profile1 from "../assets/Images/profile 1.jpg";
import profile2 from "../assets/Images/profile 2.jpg";
import profile3 from "../assets/Images/profile 3.jpeg";
import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { GetUsersList } from "../services/servicces";

const SupportAdminChart = () => {
  const susers = [
    {
      image: profile1,
      name: "User 1",
    },
    {
      image: profile2,
      name: "User 2",
    },
    {
      image: profile3,
      name: "User 3",
    },
  ];

  const chat1 = [
    {
      sender: "Suhail",
      receiver: "User 1",
      message: "Hi From Suhail",
    },
    {
      sender: "User 1",
      receiver: "Suhail",
      message: "Hi from User 1",
    },
  ];

  const chat2 = [
    {
      sender: "Suhail",
      receiver: "User 2",
      message: "Hi From Suhail",
    },
    {
      sender: "User 2",
      receiver: "Suhail",
      message: "Hi from User 2",
    },
  ];

  const chat3 = [
    {
      sender: "Suhail",
      receiver: "User 3",
      message: "Hi From Suhail",
    },
    {
      sender: "User 3",
      receiver: "Suhail",
      message: "Hi from User 3",
    },
  ];

  const chats = [chat1, chat2, chat3];

  const [sender, setSender] = useState("Suhail");
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(0);
  const [chatstate, setchatstate] = useState(chats[activeChat]);
  const [receiver, setReceiver] = useState(susers[activeChat].name);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      let val = await GetUsersList();
      setUsers(val.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (searchText) {
      const filteredUsers = susers.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(filteredUsers);
      setUsers(filteredUsers);
    } else {
      setUsers(susers);
    }
  }, [searchText]);

  const switchChat = (e) => {
    const activeIndex = e.target.closest("div").getAttribute("data-index");
    setActiveChat(activeIndex);
  };

  useEffect(() => {
    setchatstate(chats[activeChat]);
    setReceiver(susers[activeChat].name);
  }, [activeChat]);

  const handleSend = () => {
    const text = document.getElementById("text").value;
    const chat = {
      sender: "Suhail",
      receiver: receiver,
      message: text,
    };
    console.log(chat);
    console.log(chats[activeChat]);
    chats[activeChat].push(chat);
    document.getElementById("text").value = "";
    setchatstate((prev) => [...prev, chat]);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="w-[30%] bg-[#5270b02d] flex flex-col gap-3">
        <div className="p-2">
          <input
            type="text"
            value={searchText}
            placeholder="Search User"
            onChange={handleSearch}
            className="w-[90%] mx-auto block rounded-lg px-4 py-2 outline-none text-sm"
          />
        </div>
        <div className="flex flex-col">
          {users.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`flex px-4 py-2 gap-2 ${
                activeChat == index && "bg-blue-200"
              }`}
              onClick={switchChat}
            >
              <img
                src={item.image}
                className="object-cover h-10 w-10 rounded-full"
              />
              <div>
                <p>{item.name}</p>
                <p>{}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%] bg-blue-200 flex flex-col">
        <div className="bg-blue-400 h-16 py-8 px-5 flex gap-3 items-center">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={users[activeChat].image}
          />
          <p className="text-white">{users[activeChat].name}</p>
        </div>
        <div className="w-full h-full flex flex-col gap-2 overflow-y-auto p-5">
          {chatstate.map((item, index) => (
            <div key={index} className="flex flex-col">
              {item.sender == sender && item.receiver === receiver ? (
                <div className="w-full flex justify-end items-end">
                  <p className="bg-white text-black w-[40%] px-4 py-1 rounded-xl text-wrap">
                    {item.message}
                  </p>
                </div>
              ) : item.sender === receiver && item.receiver == sender ? (
                <div className="w-full flex justify-start items-end">
                  <p className="bg-white text-black w-[40%] px-4 py-1 rounded-xl text-wrap">
                    {item.message}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex w-full pb-3 items-center justify-center gap-2 bottom-0">
          <input
            onKeyDown={handleEnter}
            id="text"
            className="w-[90%] block px-5 py-2 rounded-xl outline-none"
            type="text"
            placeholder="Type Text...."
          />
          <FaTelegramPlane
            size={30}
            className="text-blue-600"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportAdminChart;
