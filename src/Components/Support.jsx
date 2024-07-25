import React, { useEffect, useState } from "react";
import { FaChevronRight, FaTelegramPlane, FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router";
import {
  getUserById,
  getUserByAuth,
  getGroup,
  getChathistories,
  getSettingInfo,
  getAdmin,
} from "../services/services";
import io from "socket.io-client";
import { TiTick } from "react-icons/ti";
import logo from "../assets/Image/logo.jpg";

const SOCKET_SERVER_URL = "wss://gfcapi.globalfc.app";
// const SOCKET_SERVER_URL = "http://localhost:5001";

const Chat = () => {
  const [id, setId] = useState();
  const [user, setUser] = useState({});
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState(id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [minimumInternalTransaction, setMinimumInternalTransaction] =
    useState(10);
  const [internalTransactionFee, setInternalTransactionFee] = useState(1);
  const [amount, setAmount] = useState("");
  const [pay, setPay] = useState(false);
  const [myWallet, setMyWallet] = useState(0);
  const [disabledInput, setDisabledInput] = useState(true);
  const [senderDetails, setSenderDetails] = useState({});
  const [setting, setSetting] = useState();
  const [sendButton, setSendButton] = useState(true);
  // const roomId = "123";

  // useEffect(() => {
  //   getUserById_Chat();
  // }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log(message, "sending message");
      socket.emit("messageToRoom", {
        roomId,
        message,
        senderId: sender,
        receiverId: receiver,
      });
      // setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  const getOldmessages = async () => {
    try {
      let val = await getChathistories(id);
      setMessages(val.data);
    } catch (error) {}
  };

  const getSettings = async () => {
    try {
      let val = await getSettingInfo();
      console.log(val.data);
      setMinimumInternalTransaction(val.data.minimuminternalTransaction);
      setInternalTransactionFee(val.data.internalTransactionFee);
      setSetting(val.data);
    } catch (error) {}
  };

  const getMyDetails = async () => {
    try {
      let apiResponse = await getUserByAuth();
      setSenderDetails(apiResponse.data);
      setSender(apiResponse.data._id);
      setMyWallet(apiResponse.data.myWallet ? apiResponse.data.myWallet : 0);
      setDisabledInput(
        apiResponse.data.myWallet + internalTransactionFee <
          apiResponse.data.myWallet
      );
      console.log(apiResponse.data, "asasas");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getUserById_Chat = async () => {
    try {
      let userData = await getAdmin();
      console.log(userData.data, "lplplp");
      setId(userData.data._id);
      setReceiver(userData.data._id);
      setUser(userData.data);
      if (userData.data._id) {
        try {
          let value = await getGroup(id);
          setRoomId(value.data._id);
        } catch (error) {}
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserById_Chat();
    getSettings();
    getMyDetails();
    getOldmessages();
    if (roomId) {
      socket.emit("joinRoom", roomId);
      console.log("room", roomId);
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

  const socket = io(SOCKET_SERVER_URL, {
    path: "/ws",
    transports: ["websocket"],
  });
  const showPay = () => {
    // console.log('show pay');
    setPay(!pay);
  };
  const handleClick = (e) => {
    // console.log(e.target.closest("div").className.includes('div'));
    if (!e.target.closest("div").className.includes("div")) {
      setPay(!pay);
    }
  };

  const handleCancel = () => {
    setPay(!pay);
  };

  const handleConfirm = () => {
    if (amount >= minimumInternalTransaction) {
      console.log("done");
      if (amount.trim() !== "") {
        console.log(amount, "sending message");
        socket.emit("sendMoney", {
          roomId,
          message: amount,
          money: amount,
          senderId: sender,
          receiverId: receiver,
          payment: true,
        });
        setPay("");
        setMessage("");
      }
      setPay(!pay);
    } else {
      console.log("not done");
    }
  };

  const handlePhonePe = (e) => {
    // console.log(e.target.value)
    if (!isNaN(e.target.value) && e.target.value !== "") {
      setSendButton(false);
      setAmount(e.target.value);
    } else {
      setSendButton(true);
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden h-full relative">
      <div className="bg-primary h-16 flex justify-between px-4 py-1.5 gap-5  items-center">
        <div className="flex justify-between items-center gap-3">
          <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
            <img src={logo} alt="logo" className="rounded-full" />
          </div>
          <p className="text-white text-sm font-semibold">GFC Support</p>
        </div>
        <button
          onClick={showPay}
          className="bg-white px-5 py-1.5 rounded-md text-primary text-[14px] font-medium"
        >
          Pay
        </button>
      </div>
      {/* <div className="flex flex-col gap-2 w-full h-full py-1 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col">
            {msg.msg?.includes("You:") ? (
              <div className="w-full flex justify-end px-2">
                <p className="text-right max-w-60 w-fit px-2 py-1 text-sm bg-black rounded-xl text-white">
                  {msg.msg}
                </p>
              </div>
            ) : (
              <div className="w-full flex justify-start px-2">
                <p className="text-left max-w-60 w-fit px-2 py-1 text-sm bg-black rounded-xl text-white">
                  {msg.msg}
                </p>
              </div>
            )}
          </div>
        ))}
      </div> */}
      <div className="flex flex-col gap-2 w-full h-full py-1 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.senderId === sender ? "items-end" : "items-start"
            }`}
          >
            {/* {console.log(msg.message)} */}
            {msg?.payment ? (
              <div className="w-full flex flex-col px-2 pt-1 bg-white max-w-[45%] h-[100%] rounded-xl  rounded-tr-sm  border-[6px] border-customBlue">
                <h1 className="text-xs">
                  Payment to {msg.senderId === sender ? user.userName : "You"}
                </h1>
                <h1 className="text-xl">${msg.money}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <TiTick className="rounded-full bg-green-600 text-white" />
                    <p>{msg.payment == true ? "Paid" : "Not Paid"}</p>
                  </div>
                  <FaChevronRight className="text-sm" />
                </div>
              </div>
            ) : (
              <div
                className={`flex ${
                  msg.senderId === sender ? "justify-end" : "justify-start"
                } w-full px-2`}
              >
                {/* {console.log(msg.senderId, sender)} */}
                <p
                  className={`max-w-60 w-fit py-1 px-6 pl-3 text-[13px] font-medium bg-white rounded-lg rounded-tr-sm text-customBlue`}
                >
                  {msg.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-2 py-3 flex items-center gap-2 justify-center w-full mb-3">
        <input
          className="w-[80%] px-2 py-3.5 rounded-md text-sm  border-none hover:bg-gray-100 focus:bg-white"
          type="text"
          placeholder="Send the message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handlePhonePe}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") sendMessage();
          // }}
        />
        <style jsx>{`
        input::placeholder {
          font-size: 11px;
          
        }
      `}</style>
        {sendButton ? (
          <button
            onClick={sendMessage}
            className="outline-blue-400 p-2 rounded-full bg-primary"
          >
            <IoMdSend className="text-white cursor-pointer size-6 p-1" />
          </button>
        ) : (
          <button
            onClick={showPay}
            className="bg-primary text-[15px] font-medium text-white px-4 py-[12.5px] rounded-md"
          >
            Pay
          </button>
        )}
      </div>

      {pay ? (
       <div
       className="absolute bg-transparent left-8 h-full w-[80%] flex justify-center items-center"
       onClick={handleClick}
     >
       <div className="div relative w-80 bg-white rounded-xl text-black py-2 px-3 flex flex-col min-h-[20%]">
         <div className="flex px-2 m-[-0.20rem] mb-1 text-customGray justify-between text-[0.6rem] ">
           <p className="">Transfer to {user.userName}</p>
           <p>MW: ${myWallet}</p>
         </div>
         <div>
           <p 
           className="w-full text-[12px] text-center font-medium px-2 py-2 border-none text-gray-500 bg-gray-100 rounded-md"
           value={amount}
           onChange={(e) => {
             setAmount(e.target.value);
           }}>Enter Amount: <span className="text-customBlue">{amount}</span></p>
         </div>
         {/* <input
           readOnly={disabledInput<12}
           value={amount}
           onChange={(e) => {
             setAmount(e.target.value);
           }}
           type="number"
           className="w-full px-2 py-1 border-none bg-gray-100 rounded-lg"
         /> */}
         <ul className="text-xss mt-1 mb-1  text-customGray px-5">
           {amount < minimumInternalTransaction ? (
             <li className="list-disc">
               Minimum Internal Transaction is ${minimumInternalTransaction}
             </li>
           ) : null}
           <li className="list-disc">
             Internal Transaction fee is ${internalTransactionFee}
           </li>
         </ul>
         <div className="   flex justify-around ">
           <button
             type="button"
             onClick={handleCancel}
             className="bg-red-500  px-4 rounded-md text-[10px] font-semibold py-1 text-white"
           >
             Cancel
           </button>
           <button
             type="button"
             onClick={handleConfirm}
             className="bg-green-500 px-4 rounded-md text-[10px] font-semibold py-1 text-white"
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

export default Chat;
