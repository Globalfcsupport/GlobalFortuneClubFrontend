import { Pagination } from "antd"
import { useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";

const UserList = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("");
    const [ pageSize, setPageSize ] = useState(10);
    const { toggleSideBar, isSideBarOpen } = useSideBar();
    
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
        <div className="flex flex-col justify-between h-full font-poppins">
            <div className="h-12 md:h-16 bg-white flex justify-between px-5 md:px-10 items-center">
              <div className="flex items-center gap-3">
                <FaUser className="md:text-xl text-blue-700"/>
                <h1 className="md:text-xl font-semibold text-blue-700">UserList</h1>
              </div>
              <input type="text" placeholder="Search Name" className="bg-blue-100 rounded-md outline-none text-xs px-2 md:px-4 py-1 md:py-2" id="searchText" onChange={handleSearch}/>
              <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
                <FaBars/>
              </div>
            </div>  

            <div className="p-5 md:p-10 bg-bg_primary flex md:text-base text-xs h-full flex-col gap-5 rounded-tr-xl rounded-tl-xl">
              <div className="rounded-md overflow-hidden">                
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
              </div>
              
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
