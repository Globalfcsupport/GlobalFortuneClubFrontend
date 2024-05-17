// import React from 'react'

import { useState } from "react"
import { FaMoneyBillAlt } from "react-icons/fa"

const WithdrawRequest = () => {

    const handleClick = ()=> {
        setActive('pending')
        document.getElementById('pending').classList.add('active')
        document.getElementById('completed').classList.remove('active')
    }
    const handleClick2 = ()=> {
        setActive('completed')
        // document.getElementById("span").style.left = '50%';
        document.getElementById('completed').classList.add('active')
        document.getElementById('pending').classList.remove('active')
        // document.getElementById('pendingS').style.transform = 'translateX(-100%)'
        // document.getElementById('completedS').style.transform = 'translateX(100%)'
    }

    const value = 100

    const [ active, setActive ] = useState('pending');
    
    return (
        <div className="flex flex-col w-full h-screen font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaMoneyBillAlt className="text-blue-700"/>
                <h1 className="text-xl font-semibold text-blue-700">WithDraw Request</h1>
              </div>
            </div>
            <div className="h-full flex flex-col">
                <div className='w-full flex text-center relative wr'>
                    <div className="flex w-full">
                        <p className="w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg active" onClick={handleClick} id="pending">Pending</p>
                        <p className='w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg ' onClick={handleClick2} id="completed">Completed</p>
                    </div>
                    {/* <span className="absolute inline-block top-[100%] bg-blue-700 w-1/2 h-1" id="span"></span> */}
                </div>
                <div className="p-5 bg-bg_primary h-full">
                    { active === 'pending' ?
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="pendingS">
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3 md:text-base text-sm">
                                <p><span className="text-blue-600">Pending</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                        </div>
                        :                   
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="completedS">
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3 md:text-base text-sm">
                                <p><span className="text-blue-600">Completed</span> {}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                            <div className="border border-blue-400 bg-slate-100 p-5 rounded-md flex flex-col gap-3">
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                                <p><span className="text-blue-600">Withdraw Amount:</span> {value}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default WithdrawRequest
