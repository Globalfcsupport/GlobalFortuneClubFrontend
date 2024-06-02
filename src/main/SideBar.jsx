import React, { useState } from "react";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { IoIosClose } from "react-icons/io";
import { Button } from "antd";
import { admin } from "../utils/adminSideBar";
import { FaAngleDoubleRight } from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ show, setShow ] = useState(true);
  const location = useLocation()

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
    <div className="font-poppins w-fit h-full hidden md:flex flex-col justify-center bg-white">
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
          <div key={id} className="lg:pl-5 w-full transition-all duration-150 navs text-gray-400 ">
            <NavLink
              to={`/homepage${menu.path}`}
              className={` flex items-center gap-3 lg:${isCollapsed?'pl-0': 'pl-6'} pl-6 p-2 text-sm w-full rounded-tl-full rounded-bl-full`}
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
