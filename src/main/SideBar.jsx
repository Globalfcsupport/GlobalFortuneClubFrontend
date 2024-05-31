import React, { useState } from "react";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { IoIosClose } from "react-icons/io";
import {
  FaHome,
  FaUser,
  FaRegMoneyBillAlt,
  FaListAlt,
  FaHistory,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaXRay
} from "react-icons/fa";
import { Button } from "antd";


const SideBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ show, setShow ] = useState(true);
  const location = useLocation()

  const admin = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Userlist",
      icon: <FaUser />,
      path: "/userlist",
    },
    {
      title: "Withdraw Request",
      icon: <FaRegMoneyBillAlt />,
      path: "/withdraw",
    },
    {
      title: "FC Slot Log",
      icon: <FaListAlt />,
      path: "/slotlog",
    },
    {
      title: "Transaction Log",
      icon: <FaHistory />,
      path: "/transaction",
    },
    {
      title: "Support (Admin Chat)",
      icon: <FaHeadset />,
      path: "/support",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("gfcadmintoken");
    navigate("/");
  };

  const toggleCollapse = () => {
    if(window.innerWidth>=1024){
      setIsCollapsed(!isCollapsed);
    }
    else{
      setIsCollapsed(true)
    }
  };


  return (
    <>
    
    {
      <div className="absolute md:hidden h-screen w-14 bg-blue-600 -top-10 flex flex-col gap-10 items-center justify-center p-5">
        {admin.map((menu, id) => (
          <NavLink key={id} to={menu.path} className="navs text-sm w-full text-gray-400"> {menu.icon}</NavLink>
        ))}
        <Button className="text-gray-700 font-semibold text-xs h-6 px-1 p-0" onClick={handleLogout}>Logout</Button>
      </div>
    }
    <div className="font-poppins w-fit md:block hidden bg-white">
      <div className="flex flex-col gap-5 justify-center items-center py-2">     
        <img
          src={logo}
          alt="Logo"
          className={`w-14 h-20 cursor-pointer p-2`}
        />
        <h1 className="text-base text-center lg:block hidden font-bold text-blue-600">{!isCollapsed?'Global Fortune Club' : ''}</h1>
      </div>
      <div className={`${isCollapsed?'w-14': 'w-full'} lg:w-full w-14 flex flex-col gap-5 justify-between  py-5`}>
        {admin.map((menu, id) => (
          <div key={id} className="w-full transition-all duration-150 navs">
            <NavLink
              to={menu.path}
              className={`flex items-center gap-3 lg:${isCollapsed?'pl-0': 'pl-6'} pl-6 p-2 text-sm w-full text-gray-400`}
            >
              <span>{menu.icon}</span>
              <span className={`font-semibold lg:${isCollapsed?'hidden': 'block'} hidden`}>{menu.title}</span>
              <div className={`absolute left-0 h-7 w-1 ml-2 border rounded-full bg-blue-500 ${menu.path===location.pathname + location.search ? 'block':'hidden'}`}></div>
            </NavLink>
          </div>
        ))}
        <div className="p-1 flex justify-center items-center">
          <Button className="text-gray-700 font-semibold px-5" onClick={handleLogout}></Button>
        </div>
        <div className="flex justify-center text-gray-400 items-center mt-2 cursor-pointer " onClick={toggleCollapse}>
          <FaAngleDoubleRight className={`transition-all duration-500 ${isCollapsed?'rotate-0': 'rotate-180'}`}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default SideBar;
