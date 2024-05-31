import { Pagination } from "antd"
import { useEffect, useState } from "react";
import { FaHistory, FaUser } from "react-icons/fa";

const FCSlotLog = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("");
    const [ active, setActive ] = useState('all');
    const [ pageSize, setPageSize ] = useState(10);
    
    const handleClick = (status)=> {
      setActive(status)
    }
    
    useEffect(()=> {
      if(!searchText){
        const res = sdata.splice((page-1)*pageSize, pageSize);
        setData(res);
      }
      else{
        const filteredData = sdata.filter((item)=> (
            item.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        const res = filteredData.splice((page-1)*pageSize, pageSize);
        setData(res)
      }
    }, [page, searchText, pageSize])
    
    const sdata = [
        {
          id: 1,
          name: 'Arun',
          mwbalance: 1000,
          totalYield: 2000,
          status: false
        },
        {
          id: 2,
          name: 'Aahana',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 3,
          name: 'Arut',
          mwbalance: 1000,
          totalYield: 2000,
          status: false
        },
        {
          id: 4,
          name: 'Amaira',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 5,
          name: 'Arunachalam',
          mwbalance: 1000,
          totalYield: 2000,
          status: false
        },
        {
          id: 6,
          name: 'Deepa',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 7,
          name: 'Deepak',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 8,
          name: 'Gaurika',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 9,
          name: 'Krishna',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 10,
          name: 'Inaya',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 11,
          name: 'John',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 12,
          name: 'kavya',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 13,
          name: 'Karthik',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 14,
          name: 'Lavanya',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 15,
          name: 'Madhavan',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 16,
          name: 'Meghana',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 17,
          name: 'Nirav',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 18,
          name: 'Niharika',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 19,
          name: 'Nihal',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
        {
          id: 20,
          name: 'Ria',
          mwbalance: 1000,
          totalYield: 2000,
          status: true
        },
    ]
  
    const copyData = sdata.slice();
    const initialData = copyData.splice(page, pageSize)

    const [ data, setData] = useState(initialData);

    const handleSearch = (e)=> {
        setPage(1);
        setSearchText(e.target.value)
    }

    return (
        <div className="flex flex-col w-full h-screen font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaHistory className="text-blue-700"/>
                <h1 className="text-xl font-semibold text-blue-700">Transaction Log</h1>
              </div>
              <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none px-4 py-1" id="searchText" onChange={handleSearch}/>
            </div>  

            <div className="flex flex-col h-full rounded-tr-xl rounded-tl-xl">
              <div className='w-full flex text-center relative wr'>
                <div className="flex w-full relative">
                    <p className="w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg" onClick={()=>handleClick('all')} id="all">All</p>
                    <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg' onClick={()=>handleClick('crypto')} id="crypto">Crypto</p>
                    <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg' onClick={()=>handleClick('internal')} id="internal">Internal</p>
                </div>
                {/* <span className={`${active==='all' ? 'left-0': 'left-[50%]'} absolute inline-block top-0 bg-bg_primary w-1/2 h-full rounded-tr-lg rounded-tl-lg -z-10`} id="span"></span> */}
                <span className={`${active==='all'? 'left-0': active==='crypto' ? 'left-[33%]' : 'left-[66%]'} absolute -z-10 inline-block top-0 bg-bg_primary w-1/3 h-full rounded-tr-lg rounded-tl-lg -z-10`} id="span"></span>
                <span className={`${active==='all'? 'left-0': active==='crypto' ? 'left-[33%]' : 'left-[66%]'} absolute -z-10 inline-block top-[100%] bg-blue-700 w-1/3 h-1`} id="span"></span>
              </div>
              <div className="bg-bg_primary h-full">
                { active==='all' ?
                  <div className="p-5 flex flex-col gap-5" id="allS">
                    <table cellPadding={10} cellSpacing={50}>  
                        <thead className="font-semibold bg-blue-200">  
                          <tr>
                            <td>S. No</td>
                            <td>Date</td>
                            <td>User ID</td>
                            <td>Description</td>
                            <td>Amount</td>
                          </tr>        
                        </thead>
                        <tbody className="bg-white">
                          {
                            data.map((item)=> (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mwbalance}</td>
                                    <td>{item.totalYield}</td>
                                    <td className={`${item.status ? 'text-green-500' : 'text-red-500'}`}>{item.status ? "true" : "false"}</td>
                                </tr>
                            ))
                          }
                        </tbody>
                    </table>
                    <Pagination className="flex justify-end"
                        total={sdata.length}
                        pageSize={pageSize}
                        showSizeChanger
                        onShowSizeChange={(current, value)=>setPageSize(value)}
                        current={page}
                        showQuickJumper={true}
                        onChange={(page)=>setPage(page)}
                    />
                  </div> 
                  : 
                  active=== "crypto" ?
                  <div className="p-5 flex flex-col gap-5" id="cryptoS">
                    <table cellPadding={10} cellSpacing={50}>  
                        <thead className="font-semibold bg-blue-200"> 
                          <tr>
                            <td>S. No</td>
                            <td>Slot ID</td>
                            <td>Joining Date</td>
                            <td>Yield</td>
                            <td>Remaining</td>
                          </tr>         
                        </thead>
                        <tbody className="bg-white">
                          {
                            data.map((item)=> (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mwbalance}</td>
                                    <td>{item.totalYield}</td>
                                    <td className={`${item.status ? 'text-green-500' : 'text-red-500'}`}>{item.status ? "true" : "false"}</td>
                                </tr>
                            ))
                          }
                        </tbody>
                    </table>
                    <Pagination className="flex justify-end"
                        total={sdata.length}
                        pageSize={pageSize}
                        showSizeChanger
                        onShowSizeChange={(current, value)=>setPageSize(value)}
                        current={page}
                        showQuickJumper={true}
                        onChange={(page)=>setPage(page)}
                    />
                  </div> 
                  :
                  <div className="p-5 flex flex-col gap-5" id="internalS">
                    <table cellPadding={10} cellSpacing={50}>  
                        <thead className="font-semibold bg-blue-200">
                          <tr>    
                            <td>S. No</td>
                            <td>Slot ID</td>
                            <td>Joining Date</td>
                            <td>Yield</td>
                            <td>Remaining</td>
                          </tr>          
                        </thead>
                        <tbody className="bg-white">
                          {
                            data.map((item)=> (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mwbalance}</td>
                                    <td>{item.totalYield}</td>
                                    <td className={`${item.status ? 'text-green-500' : 'text-red-500'}`}>{item.status ? "true" : "false"}</td>
                                </tr>
                            ))
                          }
                        </tbody>
                    </table>
                    <Pagination className="flex justify-end"
                        total={sdata.length}
                        pageSize={pageSize}
                        showSizeChanger
                        onShowSizeChange={(current, value)=>setPageSize(value)}
                        current={page}
                        showQuickJumper={true}
                        onChange={(page)=>setPage(page)}
                    />
                  </div> 
                }
              </div>
            </div>
        </div>
  )
}

export default FCSlotLog
