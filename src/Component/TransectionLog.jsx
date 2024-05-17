import { Pagination } from "antd"
import { useEffect, useState } from "react";
import { FaHistory, FaUser } from "react-icons/fa";

const page_size= 10;

const FCSlotLog = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("");
    const [ active, setActive ] = useState('all');
    
    const handleClick = ()=> {
      setActive('all')
      document.getElementById('all').classList.add('active')
      document.getElementById('crypto').classList.remove('active')
      document.getElementById('internal').classList.remove('active')
    }
    const handleClick2 = ()=> {
        setActive('crypto')
        document.getElementById('crypto').classList.add('active')
        document.getElementById('all').classList.remove('active')
        document.getElementById('internal').classList.remove('active')
    }
    const handleClick3 = ()=> {
        setActive('internal')
        document.getElementById('internal').classList.add('active')
        document.getElementById('all').classList.remove('active')
        document.getElementById('crypto').classList.remove('active')
    }
    
    useEffect(()=> {
        if(!searchText){
            const res = sdata.splice((page-1)*page_size, page_size);
            setData(res);
        }
        else{
            const filteredData = sdata.filter((item)=> (
                item.name.toLowerCase().includes(searchText.toLowerCase())
            ));
            const res = filteredData.splice((page-1)*page_size, page_size);
            setData(res)
        }
    }, [page, searchText])
    
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

    const [ data, setData] = useState(sdata);

    const handleSearch = (e)=> {
        setPage(1);
        setSearchText(e.target.value)
    }

    return (
        <div className="flex flex-col w-full h-screen font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaHistory className="text-blue-700"/>
                <h1 className="text-2xl font-semibold text-blue-700">Transaction Log</h1>
              </div>
              <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none px-4 py-1" id="searchText" onChange={handleSearch}/>
            </div>  

            <div className="flex flex-col h-full rounded-tr-xl rounded-tl-xl">
              <div className='w-full flex text-center relative wr'>
                <div className="flex w-full">
                    <p className="w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg active" onClick={handleClick} id="all">All</p>
                    <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg ' onClick={handleClick2} id="crypto">Crypto</p>
                    <p className='w-1/3 cursor-pointer p-3 rounded-tr-lg rounded-tl-lg ' onClick={handleClick3} id="internal">Internal</p>
                </div>
              </div>
              <div className="bg-bg_primary h-full">
                { active==='all' ?
                  <div className="p-5 flex flex-col gap-5" id="allS">
                    <table cellPadding={10} cellSpacing={50}>  
                        <thead className="font-semibold bg-blue-200">          
                            <td>S. No</td>
                            <td>Date</td>
                            <td>User ID</td>
                            <td>Description</td>
                            <td>Amount</td>
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
                        pageSize={page_size}
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
                            <td>S. No</td>
                            <td>Slot ID</td>
                            <td>Joining Date</td>
                            <td>Yield</td>
                            <td>Remaining</td>
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
                        pageSize={page_size}
                        current={page}
                        showQuickJumper={true}
                        onChange={(page)=>setPage(page)}
                    />
                  </div> 
                  :
                  <div className="p-5 flex flex-col gap-5" id="internalS">
                    <table cellPadding={10} cellSpacing={50}>  
                        <thead className="font-semibold bg-blue-200">          
                            <td>S. No</td>
                            <td>Slot ID</td>
                            <td>Joining Date</td>
                            <td>Yield</td>
                            <td>Remaining</td>
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
                        pageSize={page_size}
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
