// import React from 'react'
import { Pagination } from "antd"
import { useEffect, useState } from "react";
// import { Collapse } from "antd"

const page_size= 10;

const UserList2 = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("")
    
    useEffect(()=> {
        // const text = document.getElementById('searchText').value;
        // console.log(searchText);
        if(!searchText){
            const res = sdata.splice((page-1)*page_size, page_size);
            setData(res);
        }
        else{
            const filteredData = sdata.filter((item)=> (
                item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            );
            // console.log(filteredData.length);
            const res = filteredData.splice((page-1)*page_size, page_size);
            // console.log(res.length);
            setData(res)
        }
        // console.log(data);
    }, [page, searchText])
    
    const sdata = [
        {
          id: 1,
          name: 'Aadhya',
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
          name: 'Anika',
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
          name: 'Anusha',
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
          name: 'Ekanksha',
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
          name: 'Krisha',
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
          name: 'Janani',
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
          name: 'Kritika',
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
          name: 'Madhavi',
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
          name: 'Nidra',
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
          name: 'Nikitha',
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
            <div className="h-20 bg-white flex justify-between px-10 items-center">
                <h1 className="text-3xl font-semibold text-blue-700">UserList</h1>
                {/* <div className="flex gap-5"> */}
                    <input type="text" className="bg-blue-100 rounded-md outline-none px-4 py-1" id="searchText" onChange={handleSearch}/>
                    {/* <button className="bg-blue-700 px-4 py-1 rounded-md text-white" onClick={()=>setPage(1)}>Search</button> */}
                {/* </div> */}
            </div>

            <div className="p-10 bg-blue-100 flex flex-col gap-5 h-full">
                <table cellPadding={10} cellSpacing={50} >  
                    <thead className="font-semibold">          
                        <td>ID</td>
                        <td>Name</td>
                        <td>MW Balance</td>
                        <td>Total Yield</td>
                        <td>Status</td>
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
        </div>
  )
}

export default UserList2
