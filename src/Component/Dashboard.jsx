// import { useState } from "react";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import admin from "../utils/adminSideBar";
import { Button } from "antd";

const UserList = () => {

  const navigate = useNavigate();

    const sdata = [
        {
          id: 1,
          title: 'Total Users',
          today: 10,
          overall: 10
        },
        {
          id: 2,
          title: 'Yield',
          today: 10,
          overall: 10
        },
        {
          id: 3,
          title: 'User Main Wallet Balance',
          today: 10,
          overall: 10
        },
        {
          id: 4,
          title: 'User Crowd Stack Balance',
          today: 10,
          overall: 10
        },
        {
          id: 5,
          title: 'Admin Wallet Balance',
          today: 10,
          overall: 10
        },
        {
          id: 6,
          title: 'Admin Comission',
          today: 10,
          overall: 10
        },
        {
          id: 7,
          title: 'Active Slots',
          today: 10,
          overall: 10
        },
        {
          id: 8,
          title: 'Completed Slots',
          today: 10,
          overall: 10
        },
        {
          id: 9,
          title: 'Crypto Deposit',
          today: 10,
          overall: 10
        },
        {
          id: 10,
          title: 'Crypto Withdraw',
          today: 10,
          overall: 10
        },
        {
          id: 11,
          title: 'Internal Transaction',
          today: 10,
          overall: 10
        },
        {
          id: 12,
          title: 'Leftover Wallet',
          today: 10,
          overall: 10
        },
    ]

    const [ showSideBar, setShowSideBar ] = useState(false);

    const handleClick = ()=> {
      setShowSideBar(!showSideBar)
      // console.log(showSideBar);
    }

    const handleLogout = ()=> {
      localStorage.removeItem('userAuthToken');
      navigate('/');
    }

    return (
        <div className="flex flex-col w-full h-screen font-poppins relative">
          {showSideBar &&
            <div className="absolute h-screen w-44 right-0 top-0 bg-blue-600 flex-col gap-10 items-center justify-center p-5">
              {admin.map((menu, id) => (
                <NavLink key={id} to={menu.path} className="navs text-sm w-full text-gray-400"> {menu.icon}</NavLink>
              ))}
              <Button className="text-gray-700 font-semibold text-xs h-6 px-1 p-0" onClick={handleLogout}>Logout</Button>
            </div>
          }
            <div className="h-12 md:h-16 bg-white flex justify-between px-5 md:px-10 items-center">
              <div className="flex items-center gap-3">
                <FaHome className="text-blue-700"/>
                <h1 className="md:text-2xl font-semibold text-blue-700">Dashboard</h1>
              </div>
              <div onClick={handleClick}>
                <FaBars className="md:hidden text-blue-500"/>
              </div>
            </div>

            <div className="p-5 md:p-10 bg-bg_primary flex flex-col gap-5 md:text-base text-xs h-full rounded-tr-xl rounded-tl-xl">
                <table cellPadding={10} cellSpacing={50} >  
                    <thead className="font-semibold bg-blue-200"> 
                      <tr>
                        <td>Title</td>
                        <td>Today</td>
                        <td>Overall</td>
                      </tr>         
                    </thead>
                    <tbody className="bg-white">
                      {
                        sdata.map((item)=> (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.today}</td>
                                <td>{item.overall}</td>
                                {/* <td className={`${item.status ? 'text-green-500' : 'text-red-500'}`}>{item.status ? "true" : "false"}</td> */}
                            </tr>
                        ))
                      }
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default UserList 
