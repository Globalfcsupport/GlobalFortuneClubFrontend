import React, { useEffect, useState } from "react";
import { FaTelegramPlane, FaUser } from "react-icons/fa";

const Chat = () => {
  const [user, setUser] = useState({});
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  // const roomId = "123";

  const sendMessage = () => {
    setMessage('')
  };

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
          ) : <div className='bg-white rounded-full h-8 w-8 flex justify-center items-center'><span className='font-semibold text-sm text-blue-700'>GFC</span></div>}
          <p className="text-blue-600 text-sm">Global FC Support</p>
        </div>
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
          value={message}
        />
      </div>
      
    </div>
  );
};

export default Chat;
