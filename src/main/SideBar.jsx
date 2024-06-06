  import React, { useEffect, useState } from "react";
  import { Link, NavLink,useLocation, useNavigate } from "react-router-dom";
  import logo from "../assets/Images/logo.png";
  import { IoIosClose } from "react-icons/io";
  import { Button } from "antd";
  import { admin } from "../utils/adminSideBar";
  import { FaAngleDoubleRight } from "react-icons/fa";
  import { useSideBar } from "../context/SideBarContext";

  const SideBar = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isSideBarOpen, closeSideBar } = useSideBar();
    const location = useLocation()

    useEffect(()=> {
      const link = []
      document.querySelectorAll('.navs').forEach((item)=> {
        link.push(item.getAttribute('href'))
      })
      console.log(link);
    },[])

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

    const handleClick = (e)=> {
      document.getElementById('bg').style.top = `${e.target.closest('div').getAttribute('data-index')*15}%`
    }

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
            <div className="flex flex-col gap-5 justify-between relative">
              {admin.map((menu, id) => (
                <div data-index={id} key={id} className="lg:pl-5 relative w-full transition-all duration-150 navs text-gray-400" onClick={handleClick}>
                  <NavLink
                    to={`/homepage${menu.path}`}
                    className={`navs flex items-center gap-3 lg:${isCollapsed?'pl-0': 'pl-6'} pl-6 p-2 text-sm w-full rounded-tl-full rounded-bl-full`}
                  >
                    <span>{menu.icon}</span>
                    <span className={`font-semibold lg:${isCollapsed?'hidden': 'block'} hidden`}>{menu.title}</span>
                    <div className={`absolute left-0 h-7 w-1 ml-2 border rounded-full bg-blue-500 ${menu.path===location.pathname + location.search ? 'block':'hidden'}`}></div>
                  </NavLink>
                </div>
              ))}
              <div id="bg" className="absolute h-9 transition-all duration-300 bg-[#5270b02d] w-[90%] ml-[10%] rounded-tl-full rounded-bl-full"></div>

            </div>
            <div className="p-1 flex justify-center items-center">
              <Button className="text-gray-700 font-semibold px-5" onClick={handleLogout}></Button>
            </div>
            <div className="flex justify-center text-gray-400 items-center mt-2 cursor-pointer " onClick={toggleCollapse}>
              <FaAngleDoubleRight className={`transition-all duration-500 ${isCollapsed?'rotate-0': 'rotate-180'}`}/>
            </div>
          </div>
        </div>
        {isSideBarOpen && 
          <div className="absolute font-poppins md:hidden w-52 h-full right-0 top-0 z-10 transition-all duration-500" id="sideBar">
            <div className=" bg-blue-500 flex-col h-full flex gap-10 p-5">
              <IoIosClose className='text-white' size={20} onClick={closeSideBar}/>
              {admin.map((menu, id) => (
                <div key={id} className="w-full transition-all duration-150 navs text-white">
                  <Link
                  to={`/homepage${menu.path}`}
                  className={` flex items-center gap-3 text-sm w-full rounded-tl-full rounded-bl-full`}
                  >
                  <span>{menu.icon}</span>
                  <span className={`font-semibold`}>{menu.title}</span>
                  {/* <div className={`absolute left-0 h-7 w-1 ml-2 border rounded-full bg-blue-500 ${menu.path===location.pathname + location.search ? 'block':'hidden'}`}></div> */}
                  </Link>
                </div>
              ))}
            </div>
          </div>  
        }
      </>
    );
  };

  export default SideBar;
