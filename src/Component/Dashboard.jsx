// import { useState } from "react";
import { FaHome } from "react-icons/fa";

const UserList = () => {

    const sdata = [
        {
          id: 1,
          title: 'Total Users',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Yield',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'User Main Wallet Balance',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'User Crowd Stack Balance',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Admin Wallet Balance',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Admin Comission',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Active Slots',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Completed Slots',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Crypto Deposit',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Crypto Withdraw',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Internal Transaction',
          today: 10,
          overall: 10
        },
        {
          id: 1,
          title: 'Leftover Wallet',
          today: 10,
          overall: 10
        },
    ]

    return (
        <div className="flex flex-col w-full h-screen font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaHome className="text-blue-700"/>
                <h1 className="text-2xl font-semibold text-blue-700">Dashboard</h1>
              </div>
            </div>

            <div className="p-10 bg-bg_primary flex flex-col gap-5 h-full rounded-tr-xl rounded-tl-xl">
                <table cellPadding={10} cellSpacing={50} >  
                    <thead className="font-semibold bg-blue-200">          
                        <td>Title</td>
                        <td>Today</td>
                        <td>Overall</td>
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
