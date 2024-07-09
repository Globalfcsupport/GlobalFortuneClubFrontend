import { useState } from "react"
import { FaBars, FaMoneyBillAlt } from "react-icons/fa"
import { useSideBar } from "../context/SideBarContext"
import { Outlet, useNavigate } from "react-router-dom";

const WithdrawRequest = () => {

    const { toggleSideBar } = useSideBar();
    const navigate = useNavigate();

    const handleClick = (status)=> {
        setActive(status);
        navigate(status)
    }

    const pendingRequest = [
        {
            amount: 121,
            request_raised_on: '12/12/12',
            USDT_Address: 'adaddasd',
            status: false
        },
    ]

    const [ active, setActive ] = useState('pending');
    
    return (
        <div className="flex flex-col w-full h-full font-poppins">
            <div className="h-12 md:h-16 bg-white flex justify-between px-5 md:px-10 items-center">
              <div className="flex items-center gap-3">
                <FaMoneyBillAlt className="text-blue-700"/>
                <h1 className="md:text-xl font-semibold text-blue-700">WithDraw Request</h1>
              </div>
              <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
                <FaBars/>
              </div>
            </div>
            <div className="h-full flex flex-col overflow-auto text-xs md:text-base py-2">
                <div className='w-full flex text-center relative wr'>
                    <div className="flex w-full">
                        <p className={`w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg `} onClick={()=>handleClick('pending')}>Pending</p>
                        <p className={`w-1/2 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg `} onClick={()=>handleClick('completed')}>Completed</p>
                    </div>
                    {/* <span className="h-full absolute w-1/2 bg-black"></span> */}
                    <span className={`${active==='pending' ? 'left-0': 'left-[50%]'} absolute inline-block transition-all duration-300 top-0 bg-bg_primary w-1/2 h-full rounded-tr-lg rounded-tl-lg`} id="span"></span>
                    <span className={`${active==='pending' ? 'left-0': 'left-[50%]'} absolute inline-block transition-all duration-300 top-[100%] bg-blue-700 w-1/2 h-[0.125rem]`} id="span"></span>
                </div>
                <Outlet />
            </div>
            
        </div>
    )
}

export default WithdrawRequest