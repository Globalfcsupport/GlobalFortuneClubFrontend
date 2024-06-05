import React from 'react'

const CompletedFCSlotLog = () => {
    return (
        <div className="bg-bg_primary h-full p-5 ">
            <div className="p-5 flex flex-col gap-5" id="completedS">
                <div className="rounded-md overflow-hidden">
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

export default CompletedFCSlotLog