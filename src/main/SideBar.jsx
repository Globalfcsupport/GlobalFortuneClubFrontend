import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Images/logo.png";
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

const SideBar = () => {
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
    {
      title: "Logout",
      icon: <FaSignOutAlt />,
      path: "/logout",
    },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);

  const roleList = {
    admin: admin,
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const role = 'admin';

  return (
    <div className={`w-full bg-blue-900 h-full overflow-hidden ${isCollapsed ? 'w-14' : 'w-full'}`}>
      <div className="grid flex-col place-items-center bg-blue-900 pt-2">
        <div className="w-13">
          <img
            src={logo}
            alt="Logo"
            className={`w-10 h-full cursor-pointer bg-blue-900 `}
          />
        </div>
        <h1 className="text-xl text-center font-bold mt-[6px] text-white">
          {isCollapsed?<abbr className="no-underline" title="Global Fortune Club">GFC</abbr>:"Global Fortune Club"}
        </h1>
      </div>
      <div className="h-[80%] w-full grid overflow-hidden">
        <div className={`w-full mr-6 grid place-items-center grid-cols-1 mt-2 bg-blue-900 h-full ${isCollapsed ? 'w-16' : 'w-full'}`}>
          {roleList &&
            roleList[role]?.map((menu, id) => (
              <div key={id} className="w-[90%]">
                <NavLink
                  to={menu.path}
                  activeClassName="bg-red-400 text-white "
                  className={`flex items-center ${isCollapsed ? 'justify-center':"justify-left pl-2"} gap-3 py-2 rounded-md border border-gray-400 text-gray-200 hover:text-white w-full`}
                >
                  <span className="text-grey-400">{menu.icon}</span>
                  <span className={`text-grey-400 ${isCollapsed ? 'hidden' : 'hidden md:inline'}`}>{menu.title}</span>
                </NavLink>
              </div>
            ))}
            <abbr title="Mode Of View">
            <div className="flex justify-center text-gray-200 items-center mt-2 cursor-pointer" onClick={toggleCollapse}>
              {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
            </div>
            </abbr>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
