// import { useState } from "react";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserList = () => {

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
    }

    return (
        <div className="flex flex-col w-full h-screen font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaHome className="text-blue-700"/>
                <h1 className="text-2xl font-semibold text-blue-700">Dashboard</h1>
              </div>
              <div>
                <FaBars className="md:hidden text-blue-500" onClick={handleClick}/>
              </div>
            </div>
            {showSideBar &&
              <div className="absolute h-screen w-60 bg- right-0">
                <NavLink to='/Da' />
              </div>

            }

            <div className="p-10 bg-bg_primary flex flex-col gap-5 h-full rounded-tr-xl rounded-tl-xl">
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
