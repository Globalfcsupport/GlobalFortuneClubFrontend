import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import {
  GetUsersList,
  getUserByAuth,
  getChathistories,
  getGroup,
} from "../services/servicces";
import UserImage from "../assets/Images/user.png";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "wss://gfcapi.globalfc.app";
// const SOCKET_SERVER_URL = "http://localhost:5001";

const SupportAdminChart = () => {
  const [sender, setSender] = useState();
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [chats, setchatstate] = useState([]);
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [minimumInternalTransaction, setMinimumInternalTransaction] =
    useState(10);
  const [internalTransactionFee, setInternalTransactionFee] = useState(1);
  const [amount, setAmount] = useState("");
  const [roomId, setRoomId] = useState("");

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
    fetchUsers();
  }, []);

  const getSenderByAuth = async () => {
    try {
      let data = await getUserByAuth();
      console.log(data.data, "sender");
      setSender(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSenderByAuth();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("Loaded");
      setReceiver(users[0]);
      console.log(users[0], "LPLPLPLPLP");
      const fun = async ()=>{
        try {
          let value = await getGroup(users[0]._id);
          setRoomId(value.data._id);
          setMessages(value.data.messages);
          console.log(value.data, "kiki");
        } catch (error) {}
      }
      fun()
      // getRoom();
      getChatHistory();
    }
  }, [users]);

  const getChatHistory = async () => {
    try {
      // let res = await getChathistories(receiver._id);
      // setchatstate(res.data);
    } catch (error) {}
  };

  const socket = io(SOCKET_SERVER_URL, {
    path: "/ws",
    transports: ["websocket"],
  });

  const getRoom = async () => {
    try {
      let value = await getGroup(receiver._id);
      setRoomId(value.data._id);
      setMessages(value.data.messages);
      console.log(value.data, "kiki");
    } catch (error) {}
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log(message, "sending message");
      socket.emit("messageToRoom", {
        roomId,
        message,
        senderId: sender._id,
        receiverId: receiver._id,
      });
      // setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  // useEffect(() => {
  //   getChatHistory();
  // }, [activeChat]);

  useEffect(() => {
    if (searchText) {
      const filteredUsers = users.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(filteredUsers);
      setUsers(filteredUsers);
    } else {
      setUsers(users);
    }
  }, [searchText]);

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);

      // Listen for new messages
      socket.on("message", (data) => {
        console.log(data, "new room message");
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      // Listen for new transaction messages
      socket.on("Trnsaction", (data) => {
        console.log(data, "new transaction message");
        setMessages((prevMessages) => [...prevMessages, data.data]);
      });

      // Listen for private messages
      socket.on("newMessage", (data) => {
        console.log(data, "new private message");
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      // Clean up on unmount
      return () => {
        socket.off("message");
        socket.off("Trnsaction");
        socket.off("newMessage");
        socket.disconnect();
      };
    }
  }, [roomId]);

  const switchChat = (e) => {
    const activeIndex = e;
    setActiveChat(activeIndex);
    setReceiver(users[activeIndex]);
    const fun = async ()=>{
      try {
        let value = await getGroup(users[activeIndex]._id);
        setRoomId(value.data._id);
        setMessages(value.data.messages);
        console.log(value.data, "kiki");
      } catch (error) {}
    }
    fun()
    // getRoom();
  };

  const handleSend = () => {
    const text = document.getElementById("text").value;
    const chat = {
      sender: "Suhail",
      receiver: receiver,
      message: text,
    };
    console.log(chat);
    // console.log(chats[activeChat]);
    // chats.push(chat);
    document.getElementById("text").value = "";
    setchatstate((prev) => {
      const arr = [...chats, chat];

      return arr;
    });

    console.log(chats);

    // alert(JSON.stringify(chats))
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full flex h-screen">
      <div className="w-[30%] h-full bg-[#5270b02d] flex flex-col gap-3">
        <div className="p-2">
          <input
            type="text"
            value={searchText}
            placeholder="Search User"
            onChange={handleSearch}
            className="w-[90%] mx-auto block rounded-lg px-4 py-2 outline-none text-sm"
          />
        </div>
        <div className="flex h-full overflow-y-scroll flex-col ">
          {users.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`flex items-center cursor-pointer px-4 py-2 gap-2 ${
                activeChat == index && "bg-blue-200"
              }`}
              onClick={() => switchChat(index)}
            >
              <p className="bg-white font-bold w-10 h-10 flex justify-center items-center rounded-full">
                {" "}
                {item.userName.charAt(0)}
              </p>

              <div>
                <p>{item.userName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%] h-full justify-between bg-blue-200  flex flex-col">
        <div className="bg-blue-400 h-[15vh] py-8 px-5 flex gap-3 items-center">
          <p className="bg-white w-10 h-10 flex font-bold justify-center items-center rounded-full">
            {" "}
            {users[activeChat]?.userName.charAt(0)}
          </p>

          <p className="text-lg font-semibold">{users[activeChat]?.userName}</p>
          {/* <img
            className="h-10 w-10 object-cover rounded-full"
            src={users[activeChat].image}
          /> */}
          {/* <p className="text-white">{users[activeChat].name}</p> */}
        </div>
        <div className="w-full relative flex gap-5 overflow-y-scroll  items-end flex-col  h-[75vh] py-3 ">
          {messages &&
            messages?.map((item) => (
              <div className=" flex flex-col gap-2 h-fit  bg-white w-fit px-5 py-1 rounded-full">
                {item.message}
              </div>
            ))}
        </div>
        {/* <div className="w-full h-full flex flex-col gap-2 overflow-y-auto p-5">
          {messagesmessages.map((item, index) => (
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
        </div> */}
        <div className="flex h-[10vh] w-full pb-3 items-center justify-center gap-2 bottom-0">
          <input
            onKeyDown={handleEnter}
            className="w-[90%] block px-5 py-2 rounded-xl outline-none"
            type="text"
            placeholder="Type Text...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FaTelegramPlane
            size={30}
            className="text-blue-600"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportAdminChart;