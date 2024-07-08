import { useEffect, useState } from "react";
import { FaBars, FaHistory, FaListAlt } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useTransactionSearch, TransactionSearchProvider } from "../context/TransactionSearchContext";
import { getTransaction } from "../services/servicces";

const TransactionLogContent = () => { 
  const { toggleSideBar } = useSideBar();
  const { handleSearch } = useTransactionSearch(); // Use the context here

  const [active, setActive] = useState('all');
  const [transaction, setTransaction] = useState()
  const navigate = useNavigate();

  const handleClick = (status) => {
    setActive(status);
    navigate(status);
  };
  const getTransactionDetails = async ()=>{
    try {
      let value = await getTransaction()
      setTransaction(value.data)
      console.log(value.data,"API RES");
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getTransactionDetails()

  },[]) 
  return (
    <div className="flex flex-col w-full h-screen font-poppins">
      <div className="h-16 bg-white flex justify-between px-5 md:px-10 items-center">
        <div className="flex items-center gap-3">
          <FaHistory className="text-blue-700"/>
          <h1 className="md:text-xl font-semibold text-blue-700">Transaction Log</h1>
        </div>
        <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none text-xs px-2 md:px-4 py-1 md:py-2" id="searchText" onChange={handleSearch}/>
        <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
          <FaBars/>
        </div>
      </div>  

      <div className="flex flex-col h-full text-sm md:text-base rounded-tr-xl rounded-tl-xl">
        <div className='w-full flex text-center relative wr'>
          <div className="flex w-full relative">
              <p className="w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg" onClick={()=>handleClick('all')} id="all">All</p>
              <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg' onClick={()=>handleClick('crypto')} id="crypto">Crypto</p>
              <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg' onClick={()=>handleClick('internal')} id="internal">Internal</p>
          </div>
          {/* <span className={`${active==='all' ? 'left-0': 'left-[50%]'} absolute inline-block top-0 bg-bg_primary w-1/2 h-full rounded-tr-lg rounded-tl-lg -z-10`} id="span"></span> */}
          <span className={`${active==='all'? 'left-0': active==='crypto' ? 'left-[33%]' : 'left-[66%]'} absolute inline-block transition-all duration-300 top-0 bg-bg_primary w-1/3 h-full rounded-tr-lg rounded-tl-lg`} id="span"></span>
          <span className={`${active==='all'? 'left-0': active==='crypto' ? 'left-[33%]' : 'left-[66%]'} absolute inline-block transition-all duration-300 top-[100%] bg-blue-700 w-1/3 h-[0.125rem]`} id="span"></span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const TransactionLog = () => {
  return (
    <TransactionSearchProvider>
      <TransactionLogContent />
    </TransactionSearchProvider>
  );
};

export default TransactionLog;
