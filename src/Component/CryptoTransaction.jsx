import React, { useEffect, useState } from 'react'
import { sdata } from '../utils/sdata';
import { Pagination } from 'antd';
import { useTransactionSearch } from '../context/TransactionSearchContext'

const CryptoTransaction = () => {
    const { searchText } = useTransactionSearch();
    const [ page, setPage ] = useState(1);
    const [ pageSize, setPageSize ] = useState(10);
    
    useEffect(()=> {
        const startIndex = (page - 1) * pageSize;
        let filteredData = sdata;

        if (searchText) {
            filteredData = sdata.filter((item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(filteredData);
        }

        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
        setData(paginatedData);
    }, [page, searchText, pageSize])
  
    const [ data, setData] = useState([]);

    return (
        <div className="bg-bg_primary h-full">
            <div className="p-5 flex flex-col gap-5" id="allS">
            <div className="rounded-md overflow-hidden">
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

export default CryptoTransaction