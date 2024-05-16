// import React from 'react'
import { Pagination } from "antd"
import { useEffect, useState } from "react";
// import { Collapse } from "antd"

const page_size= 10;

const UserList2 = () => {

    const [ page, setPage ] = useState(1);
    
    useEffect(()=> {
        const res = sdata.splice((page-1)*page_size, page_size);
        setData(res);
        console.log(data);
    }, [page])
    
    const sdata = [
        {
          id: 1,
          name: 'Poona Mani',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>false</p>
        },
        {
          id: 2,
          name: 'Saara Paambu',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 3,
          name: 'Maatu Ravi',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>false</p>
        },
        {
          id: 4,
          name: 'Revi',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 5,
          name: 'Pushpa Purushan',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>false</p>
        },
        {
          id: 6,
          name: 'Kiruba',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 7,
          name: 'Ruben',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 8,
          name: 'Arut',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 9,
          name: 'Kilimanjarao',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 10,
          name: 'Enthiran',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
        {
          id: 11,
          name: 'Sivaji',
          mwbalance: 1000,
          totalYield: 2000,
          status: <p>true</p>
        },
    ]

    const [ data, setData] = useState(sdata);

    return (
        <div className="p-10 bg-blue-100 flex flex-col gap-5">
            <table cellPadding={10} cellSpacing={50} >
                <thead>          
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
                                <td>{item.status}</td>
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
  )
}

export default UserList2
