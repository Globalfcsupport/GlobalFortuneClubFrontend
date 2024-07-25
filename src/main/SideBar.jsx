import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/Image/human.png';
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";

import { FaArrowLeft, FaTachometerAlt, FaWallet, FaDice, FaUserFriends, FaComments, FaLifeRing, FaCog, FaShareAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdTry } from "react-icons/md";
import { getUserById} from "../services/services"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [ data, setData ] = useState({});


  const [showPopup, setShowPopup] = useState(false);

  const [ user, setuser] =  useState([])

  const getUser = async () => {
    try {
      let value = await getUserById()
      setuser(value.data)
      console.log(value.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  // const handleShareClick = () => {
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 2000); // Hide the popup after 2 seconds
  // };

  const handleShareClick = () => {
    const refId = data.refId;
    const url = `${window.location.origin}/Signup?refId=${refId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    });
  };

  useEffect(()=>{
    handleShareClick()
  },[])


//old code 
  // useEffect(()=> {
  //   data['userName'] = localStorage.getItem('userName');
  //   data['email'] = localStorage.getItem('email');
  //   data['refId'] = localStorage.getItem('refId');
  // }, [])
//updated
  useEffect(() => {
    const capitalizeFirstLetter = (string) => {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    setData({
      userName: capitalizeFirstLetter(localStorage.getItem('userName')),
      email: localStorage.getItem('email'),
      refId: localStorage.getItem('refId'),
    });
  }, []);
  
  return (
    <div
      className={` absolute top-0 left-0 h-[624px] md:h-[624px] rounded-[25px] z-50 bg-white overflow-hidden  transform transition-transform duration-300  ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '80%' }}
    >
      <button
        className="absolute right-5 top-4 text-xl flex justify-center items-center"
        onClick={toggleSidebar}
      >
            <MdKeyboardArrowLeft className="text-customGray text-3xl hover:bg-gray-200 hover:rounded-full " />
            </button>
      <div className=" pt-8  h-auto">
        {/* User Info */}
        <div className="flex items-center mt-6 gap-1 bg-primary w-full p-3 text-sm">
          <div className="w-12 h-12 bg-white p-1.5 rounded-full mr-4">
            <img src={Logo} alt="" />
          </div>
          <div className=' text-white'>
          
          
            <div className="font-bold text-[15px] pl-1 mt-[0.20rem] mb-1  ">{data.userName}</div>
            <div className=" text-[10px] pl-1 mt-[-0.20rem] font-medium">{data.email}</div>
            <div className=" text-[10px] mt-[-0.30rem] font-medium pl-1">ID: {data.refId}</div>
          </div>
        </div>
        {/* Sidebar Links */}
        <ul className=' text-sm space-y-1 navs p-5'>         
          <NavLink to="DashBoard" className='mt-2 px-4 py-3 flex items-center' onClick={toggleSidebar}>
            <FaTachometerAlt className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>DashBoard</p>
          </NavLink>                  
          <NavLink to="Wallet" className='px-4 py-3 mt-2 flex items-center' onClick={toggleSidebar}>
            <FaWallet className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>Wallet</p>
          </NavLink>                  
          <NavLink to="FCSLots" className='px-4 py-3 mt-2 flex items-center' onClick={toggleSidebar}>
            <FaDice className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>FC Slots</p>
          </NavLink>                  
          <NavLink to="MyReferrals" className='px-4 mt-2 py-3 flex items-center' onClick={toggleSidebar}>
            <BsFillPeopleFill className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>Referrals</p>
          </NavLink>                  
          <NavLink to="Chats" className='px-4 py-3 mt-2 flex items-center' onClick={toggleSidebar}>
            <HiMiniChatBubbleLeftRight className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>Chats</p>
          </NavLink>                  
          <NavLink to="Support" className='px-4 py-3 mt-2 flex items-center' onClick={toggleSidebar}>
            <RiCustomerService2Fill className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>Support</p>
          </NavLink>                  
          <NavLink to="Settings" className='px-4 py-3 mt-3 flex items-center' onClick={toggleSidebar}>
            <FaCog className="mr-3 text-primary" />
            <p className='text-gray-600 font-medium'>Settings</p>
          </NavLink>                  
        </ul>
        {/* Invite Section */}
        <div className="p-4 mt-[-1rem] " >
        <div className=" bg-primary text-white text-center py-2 px-3 rounded-xl text-[12px] font-medium">
          Invite your friends and earn $1 for every slot they create!
        <button className="mt-2 bg-white px-5 py-1 text-black rounded-lg flex items-center mx-auto"
        onClick={handleShareClick} >
        <FaShareAlt className="mr-2 text-black" /> Share
        </button>
        {showPopup && (
        <div id='showPopup' className="absolute text-[13px] font-semibold bottom-[30px]  w-[84%] transform -translate-x-1/2 left-1/2 bg-primary p-2 text-white rounded-lg shadow-md">
          Link copied to the clipboard
        </div>
      )}
    </div>


        </div>
        
      </div>
    </div>
   
  );
};

export default Sidebar;
