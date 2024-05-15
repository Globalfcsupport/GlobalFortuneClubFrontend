// import React from 'react'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { IoIosSearch } from "react-icons/io";

const FCSlotLog = () => {
    const [ refresh, setRefresh ] = useState(0);
  
    useEffect(()=> {
      console.log('asd');
    }, [refresh])
  
    const handleClick = ()=> {
        setActive('pending')
        document.getElementById("span").style.left = '0%'
        document.getElementById('pending').classList.add('active')
        document.getElementById('completed').classList.remove('active')
    }
    const handleClick2 = ()=> {
        setActive('completed')
        document.getElementById("span").style.left = '50%';
        document.getElementById('completed').classList.add('active')
        document.getElementById('pending').classList.remove('active')
    }

    const columns = [
      {
        name: 'S. No',
        selector: row=>row.id,
        sortable: true
      },
      {
        name: 'Slot ID',
        selector: row=>row.name,
        sortable: true
      },
      {
        name: 'Joining Date',
        selector: row=>row.mwbalance,
        sortable: true
      },
      {
        name: 'Yield',
        selector: row=>row.totalYield,
        sortable: true
      },
      {
        name: 'Remaining',
        selector: row=>row.status,
        sortable: true
      }
    ]
  
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
  
    const customStyles = {
      table: {
        style: {
          borderRadius: '10px',
          overflowX: 'hidden',
          height: '60vh',
          overflowY: 'scroll'
        }
      },
      headRow: {
        style: {
          backgroundColor: 'blue',
          color: 'white',
          fontSize: '15px'
          // borderRadius: '10px'
        }
      },
      cells: {
        style: {
          paddingLeft: '20px',
          fontWeight: '600',
          fontSize: '13px',
          // textAlign: 'center',
          backgroundColor: '#e4e7eb'
        }
      }
    }
  
    const [ data, setData] = useState(sdata);
    
    const handleChange = ()=> {
      const text = document.getElementById('text').value.toLowerCase();
      console.log(text);
      if(!text){
        setData(sdata)
      }
      else{
        const filteredData = sdata.filter(data=> 
          data.name.toLowerCase().includes(text)
        )
        setData(filteredData)
      }
    }
    
    const handleRefresh = ()=> {
      setRefresh(prev=>prev+1)
    }

    const [ active, setActive ] = useState('pending');

  return (
    <div className="p-5 flex flex-col gap-3">
            <h1 className="text-blue-800 font-bold text-xl md:text-2xl">FC Slot Log</h1>
            <div className='w-full flex text-center relative wr'>
                <div className='w-1/2 cursor-pointer p-3  hover:bg-slate-100 active' onClick={handleClick} id="pending"><p>Pending</p></div>
                <div className='w-1/2 cursor-pointer p-3  hover:bg-slate-100' onClick={handleClick2} id="completed"><p>Completed</p></div>
                <span className="absolute inline-block top-[100%] bg-blue-700 w-1/2 h-1" id="span"></span>
            </div>
            <div>
                { active === 'pending' ?
                    <div className="py-2 flex flex-col gap-5" id='pendingS'>       
                        <div className='flex justify-between'>
                            <div className='relative'>
                                <input type='text' className='border-2 border-black rounded-md p-1 px-3s outline-none w-48 sm:w-96' placeholder='Search User ID/Name' id='text' onChange={handleChange}/>
                                <IoIosSearch className='absolute right-1 top-1' size={30}/>
                            </div>
                            <button className='bg-blue-700 text-white px-2 py-1 md:px-5 md:py-2 rounded-md' onClick={handleRefresh}>Refresh</button>
                        </div>
                        <DataTable columns={columns} data={data} keyField='id' pagination customStyles={customStyles}/>
                    </div>
                    :                   
                    <div className="p-5 flex flex-col gap-5" id='completedS'>                      
                        <div className='flex justify-between'>
                            <div className='relative'>
                                <input type='text' className='border-2 border-black rounded-md p-2 outline-none w-48 sm:w-96' placeholder='Search User ID/Name' id='text' onChange={handleChange}/>
                                <IoIosSearch className='absolute right-1 top-1' size={30}/>
                            </div>
                            <button className='bg-blue-700 text-white px-2 py-1 md:px-5 md:py-2 rounded-md' onClick={handleRefresh}>Refresh</button>
                        </div>
                        <DataTable columns={columns} data={data} keyField='id' pagination customStyles={customStyles}/>
                    </div>
                }
            </div>
        </div>
  )
}

export default FCSlotLog
