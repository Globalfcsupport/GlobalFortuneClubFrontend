import React, { useState } from "react";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { useDataContext } from "../context/HomeContext";
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
  FaAngleDoubleRight
} from "react-icons/fa";
import { Button } from "antd";


const SideBar = () => {
  const navigate = useNavigate();
  const {isCollapsed, setIsCollapsed} = useDataContext();
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
      title: "Support(Admin Chat)",
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

  const roleList = {
    admin: admin,
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const role = 'admin';

  return (
    <div className={` h-full overflow-hidden ${isCollapsed ? 'w-14' : 'w-full'}`}>
      <div className="grid flex-col place-items-center  pt-2">
        <div className="w-13">
          <img
            src={logo}
            alt="Logo"
            className={`w-10 h-full cursor-pointer  `}
          />
        </div>
        <h1 className="text-xl text-center font-bold mt-[6px] text-blue-600">
          {isCollapsed?<abbr className="no-underline" title="Global Fortune Club">GFC</abbr>:"Global Fortune Club"}
        </h1>
      </div>
      <div className="h-[80%] w-full grid overflow-hidden">
        <div className={`w-full mr-6 grid place-items-center grid-cols-1 mt-2  text-black h-full ${isCollapsed ? 'w-16' : 'w-full'}`}>
          {roleList &&
            roleList[role]?.map((menu, id) => (
              <div key={id} className="w-[100%]">
                <NavLink
                  to={menu.path}
                  activeClassName={(location.pathname === menu.path) ? 'bg-blue-200 text-blue-900' :''}
                  className={`flex items-center ${isCollapsed ? 'justify-center':"justify-left pl-2"} gap-3 py-2 focus:bg-blue-50 focus:text-blue-900 text-gray-400  w-full`}
                >
                  <span className="text-grey-400 ml-4">{menu.icon}</span>
                  <span className={`text-gray-500 font-semibold ${isCollapsed ? 'hidden' : 'hidden md:inline'}`}>{menu.title}</span>
                  <div className={`absolute left-0 h-7 w-1 ml-2 border rounded-full bg-blue-500 ${menu.path===location.pathname + location.search ? 'block':'hidden'}`}></div>
                </NavLink>
              </div>
            ))}
            <Button className="text-gray-500 font-semibold" onClick={handleLogout}>LogOut</Button>
            <abbr title="Mode Of View">
            <div className="flex justify-center text-gray-400 items-center mt-2 cursor-pointer" onClick={toggleCollapse}>
              {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
            </div>
            </abbr>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
