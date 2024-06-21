import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  getUserById,
  getUserByAuth,
  getGroup,
  getChathistories,
} from "../services/services";
import { FaTelegramPlane, FaUser } from "react-icons/fa";
import io from "socket.io-client";
import { v4 } from "uuid";

const socket = io("localhost://5001");

const Chat = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState(id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [ pay, setPay ] = useState(false);
  const [ minimumInternalTransaction, setMinimumInternalTransaction] = useState(10);
  const [ internalTransactionFee, setInternalTransactionFee ] = useState(1);
  const [ amount, setAmount ] = useState('');
  // const roomId = "123";

  const getOldmessages = async () => {
    try {
      let val = await getChathistories(id);
      setMessages(val.data);
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
      setSender(apiResponse.data._id);
      console.log(apiResponse.data._id, "asasas");
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
    getUserById_Chat();
    getMyDetails();
    getRoom();
    getOldmessages();

    if (roomId) {
      socket.emit("joinRoom", roomId);

      // Listen for new messages
      socket.on("message", (data) => {
        console.log(data, "new room message");
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      // Listen for private messages
      socket.on("newMessage", (data) => {
        console.log(data, "new private message");
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      // Clean up on unmount
      return () => {
        socket.off("message");
        socket.off("newMessage");
        socket.disconnect();
      };
    }
  }, [roomId]);

  const showPay = ()=> {
    console.log('show pay');
    setPay(!pay);
  }

  const handleClick = (e)=> {
    // console.log(e.target.closest("div").className.includes('div'));
    if(!e.target.closest("div").className.includes('div')){
      setPay(!pay)
    }
  }

  const handleCancel = ()=> {
    setPay(!pay)
  }

  const handleConfirm = ()=> {
    if(amount >= minimumInternalTransaction){
      console.log('done');
      setPay(!pay)
    }
    else{
      console.log('not done');
    }
  }

  return (
    <div className="flex flex-col justify-between overflow-hidden h-full relative font-poppins">
      <div className="bg-blue-300 h-12 flex justify-between px-5 py-2 gap-5 items-center">
        <div className="flex justify-between items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="h-8 w-8 object-cover rounded-full"
            />
          ) : <div className='bg-white rounded-full h-8 w-8 flex justify-center items-center'><span className='font-semibold text-2xl text-blue-700 -mt-2'>{user.userName?.split("")[0]}</span></div>}
          <p>{user.userName}</p>
        </div>
        <button onClick={showPay} className="bg-blue-600 px-5 py-1 rounded-lg text-white">Pay</button>
      </div>
      <div className="flex flex-col gap-2 w-full h-full py-1 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col">
            {msg.msg.includes("You:") ? (
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
      </div>
      <div className="px-5 py-2 flex items-center gap-2 justify-center w-full">
        <input
          className="w-[90%] block px-5 py-1 rounded-xl"
          type="text"
          placeholder="Type Text...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") sendMessage();
          // }}
        />
        <FaTelegramPlane
          size={25}
          className="text-blue-600 cursor-pointer"
          onClick={sendMessage}
        />
      </div>
      { pay ? 
        <div className="absolute bg-transparent h-full w-full flex justify-center items-center" onClick={handleClick}>
          <div className="div relative w-80 bg-white rounded-lg text-black py-4 px-3 flex flex-col gap-2">
            <div className="flex div justify-between text-sm font-medium">
              <p className="">Transfer to {user.userName}</p>
              <p>MW: 1000.0000</p>
            </div>
            <input value={amount} onChange={(e)=>{setAmount(e.target.value)}} type="number" className="w-full px-2 py-1 rounded-lg"/>
            <ul className="text-xss px-5">
              {amount < minimumInternalTransaction ? 
                <li className="list-disc">Minimum Internal Transaction is ${minimumInternalTransaction}</li> : null }
              <li className="list-disc">Internal Transaction fee is ${internalTransactionFee}</li>
            </ul>
            <div className="div flex justify-around">
              <button type="button" onClick={handleCancel} className="bg-red-600 px-5 rounded-full text-sm py-1 text-white">Cancel</button>
              <button type="button" onClick={handleConfirm} className="bg-green-600 px-5 rounded-full text-sm py-1 text-white">Confirm</button>
            </div>
          </div>
        </div> : null
      }
    </div>
  );
};

export default Chat;
