import React, { useEffect, useState } from 'react'
import { useSlotSearch } from '../context/SlotSearchContext'
import { sdata } from '../utils/sdata';
import { Pagination } from 'antd';

const ActiveFCSlotLog = () => {
    const { searchText } = useSlotSearch();
    console.log(searchText);

    const [ page, setPage ] = useState(0);
    const [ pageSize, setPageSize ] = useState(10);
    
    const handleClick = (status)=> {
      setActive(status)
    }
    
    useEffect(()=> {
      const data = {
        "limit": pageSize,
        "currentPage": page,
        "searchText": searchText
      }
  
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
  
    const copyData = sdata.slice();
    const initialData = copyData.splice(page, pageSize)
  
    const [ data, setData] = useState(initialData);
  
    const handleSearch = (e)=> {
      setPage(1);
      setSearchText(e.target.value)
    }

    return (
        <div className="bg-bg_primary h-full p-5 ">
            <div className="p-2 md:p-5 flex flex-col gap-5 overflow-x-auto" id="pendingS">
            <div className="">
                <table cellPadding={10} cellSpacing={50} className="rounded-table">  
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

export default ActiveFCSlotLog