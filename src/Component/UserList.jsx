import { Pagination } from "antd"
import { useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { sdata } from "../utils/sdata";

const UserList = () => {

    const [ page, setPage ] = useState(0);
    const [ searchText, setSearchText ] = useState("");
    const [ pageSize, setPageSize ] = useState(10);
    const { toggleSideBar, isSideBarOpen } = useSideBar();
    
    useEffect(()=> {
      if(!searchText){
        const startIndex = (page-1) * pageSize;
        console.log(startIndex);
        const res =   data.slice(startIndex, startIndex+pageSize);
        setData(res);
      }
      else{
        const filteredData = data.filter((item)=> (
          item.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        const res = filteredData.slice((page-1)*pageSize, pageSize);
        setData(res)
      }
    }, [page, searchText, pageSize])

    const [ data, setData] = useState(sdata);

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

        <div className="p-5 md:p-10 bg-bg_primary flex md:text-base text-xs h-full flex-col gap-5 overflow-hidden  rounded-tr-xl rounded-tl-xl">
          <div className="p-2 overflow-x-auto">                
            <table cellPadding={10} cellSpacing={50} className="rounded-table">  
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
