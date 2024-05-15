// import React from 'react'

import { useState } from "react"

const WithdrawRequest = () => {

    const handleClick = ()=> {
        setActive('pending')
        document.getElementById("span").style.left = '0%'
        document.getElementById('pending').classList.add('active')
        document.getElementById('completed').classList.remove('active')
        // document.getElementById('pendingS').style.transform = 'translateX(100%)'
        // document.getElementById('completedS').style.transform = 'translateX(-100%)'
    }
    const handleClick2 = ()=> {
        setActive('completed')
        document.getElementById("span").style.left = '50%';
        document.getElementById('completed').classList.add('active')
        document.getElementById('pending').classList.remove('active')
        // document.getElementById('pendingS').style.transform = 'translateX(-100%)'
        // document.getElementById('completedS').style.transform = 'translateX(100%)'
    }

    const value = 100

    const [ active, setActive ] = useState('pending');
    return (
        <div className="p-5 flex flex-col gap-5">
            <h1 className="text-blue-800 font-bold text-xl md:text-2xl">Withdraw Request</h1>
            <div className='w-full flex text-center relative wr'>
                <div className='w-1/2 cursor-pointer p-2 hover:bg-slate-100 active' onClick={handleClick} id="pending"><p>Pending</p></div>
                <div className='w-1/2 cursor-pointer p-2 hover:bg-slate-100' onClick={handleClick2} id="completed"><p>Completed</p></div>
                <span className="absolute inline-block top-[100%] bg-blue-700 w-1/2 h-1" id="span"></span>
            </div>
            <div>
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
    )
}

export default WithdrawRequest
