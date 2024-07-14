import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  getUserById,
  getUserByAuth,
  getGroup,
  getChathistories,
  getSettingInfo,
} from "../services/services";
import { FaTelegramPlane, FaUser } from "react-icons/fa";
import io from "socket.io-client";
import { v4 } from "uuid";
import { TiTick } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

const SOCKET_SERVER_URL = "wss://gfcapi.globalfc.app";

const Chat = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState(id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [pay, setPay] = useState(false);
  const [minimumInternalTransaction, setMinimumInternalTransaction] =
    useState(10);
  const [internalTransactionFee, setInternalTransactionFee] = useState(1);
  const [amount, setAmount] = useState("");
  const [senderDetails, setSenderDetails] = useState({});
  const [sendButton, setSendButton] = useState(true);
  const [settings, setSetting] = useState({});
  const [myWallet, setMyWallet] = useState(0);
  const [disabledInput, setDisabledInput] = useState(true)
  

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
      setSetting(val.data)
    } catch (error) {}
  };

  

  const getRoom = async () => {
    try {
      let value = await getGroup(id);
      setRoomId(value.data._id);
    } catch (error) {}
  };

  const getMyDetails = async () => {
    try {
      let apiResponse = await getUserByAuth();
      setSenderDetails(apiResponse.data);
      setSender(apiResponse.data._id);
      setMyWallet(apiResponse.data.myWallet ? apiResponse.data.myWallet : 0);
      setDisabledInput(apiResponse.data.myWallet+internalTransactionFee< apiResponse.data.myWallet )
      console.log(apiResponse.data, "asasas");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getUserById_Chat = async () => {
    try {
      let userData = await getUserById(id);
      setUser(userData.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const socket = io(SOCKET_SERVER_URL, {
    path: "/ws",
    transports: ["websocket"],
  });

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
  useEffect(() => {
    getSettings();
    getUserById_Chat();
    getMyDetails();
    getRoom();
    getOldmessages();

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
    <div className="flex flex-col justify-between overflow-hidden h-full relative font-poppins">
      <div className="bg-primary h-16 flex justify-between px-5 py-2 gap-5 items-center">
        <div className="flex justify-between items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="h-8 w-8 object-cover rounded-full"
            />
          ) : (
            <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center">
              <span className="font-semibold text-2xl flex justify-center items-center text-primary -mt-1">
                {user.userName?.split("")[0]}
              </span>
            </div>
          )}
          <p className="text-white font-medium">{user.userName}</p>
        </div>
        <button
          onClick={showPay}
          className="bg-white px-5 py-1 rounded-lg text-primary font-medium"
        >
          Pay
        </button>
      </div>
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
              <div className="w-full flex flex-col mx-2 p-3 gap-2 bg-slate-100 max-w-60 rounded-xl">
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
                  className={`max-w-60 w-fit px-2 py-1 text-sm bg-white rounded-xl text-black`}
                >
                  {msg.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-5 py-2 flex items-center gap-2 justify-center w-full">
        <input
          className="w-[90%] block px-5 py-2 rounded-xl text-sm "
          type="text"
          placeholder="Type Text or Amount..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handlePhonePe}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") sendMessage();
          // }}
        />
        {sendButton ? (
          <button onClick={sendMessage} className="outline-blue-400">
            <IoMdSend
              size={25}
              className="text-primary cursor-pointer"
            />
          </button>
        ) : (
          <button
            onClick={showPay}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Pay
          </button>
        )}
      </div>

      {pay ? (
        <div
          className="absolute bg-transparent h-full w-full flex justify-center items-center"
          onClick={handleClick}
        >
          <div className="div relative w-80 bg-white rounded-lg text-black py-4 px-3 flex flex-col gap-2 border border-black">
            <div className="flex div justify-between text-sm font-medium">
              <p className="">Transfer to {user.userName}</p>
              <p>MW: ${myWallet}</p>
            </div>
            <input
              disabled={disabledInput}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              className="w-full px-2 py-1 rounded-lg"
            />
            <ul className="text-xss px-5">
              {amount < minimumInternalTransaction ? (
                <li className="list-disc">
                  Minimum Internal Transaction is ${minimumInternalTransaction}
                </li>
              ) : null}
              <li className="list-disc">
                Internal Transaction fee is ${internalTransactionFee}
              </li>
            </ul>
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

export default Chat;
