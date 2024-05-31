import { Pagination } from "antd"
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const UserList = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("");
    const [ pageSize, setPageSize ] = useState(10);
    
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

    const [ data, setData] = useState(sdata.slice(0,10));

    const handleSearch = (e)=> {
        setPage(1);
        setSearchText(e.target.value)
    }

    return (
        <div className="flex flex-col w-full font-poppins">
            <div className="h-16 bg-white flex justify-between px-10 items-center">
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-700"/>
                <h1 className="text-xl font-semibold text-blue-700">UserList</h1>
              </div>
              <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none px-4 py-1" id="searchText" onChange={handleSearch}/>
            </div>  

            <div className="p-10 bg-bg_primary flex h-full flex-col gap-5 rounded-tr-xl rounded-tl-xl">
                <table cellPadding={10} cellSpacing={50} >  
                    <thead className="font-semibold bg-blue-200"> 
                      <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>MW Balance</td>
                        <td>Total Yield</td>
                        <td>Status</td>
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
        </div>
  )
}

export default UserList 
