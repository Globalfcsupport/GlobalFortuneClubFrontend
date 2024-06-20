import React, { useEffect, useState } from "react";
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

  return (
    <div className="flex flex-col justify-between overflow-hidden h-full">
      <div className="bg-blue-300 h-12 flex px-5 py-2 gap-5 items-center">
        {user.image ? (
          <img
            src={user.image}
            alt=""
            className="h-8 w-8 object-cover rounded-full"
          />
        ) : (
          <FaUser />
        )}
        <p>{user.userName}</p>
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
    </div>
  );
};

export default Chat;
