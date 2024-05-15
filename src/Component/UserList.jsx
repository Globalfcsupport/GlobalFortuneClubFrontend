// import React from 'react'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { IoIosSearch } from "react-icons/io";

const UserList = () => {
  
  const [ refresh, setRefresh ] = useState(0);
  
  useEffect(()=> {
    console.log('asd');
  }, [refresh])

  const columns = [
    {
      name: 'ID',
      selector: row=>row.id
    },
    {
      name: 'Name',
      selector: row=>row.name
    },
    {
      name: 'MW Balance',
      selector: row=>row.mwbalance
    },
    {
      name: 'Total Yield',
      selector: row=>row.totalYield
    },
    {
      name: 'Status',
      selector: row=>row.status
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
        // height: '60vh',
        // overflowY: 'scroll'
      }
    },
    headRow: {
      style: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '18px'
        // borderRadius: '10px'
      }
    },
    cells: {
      style: {
        paddingLeft: '20px',
        fontWeight: '600',
        fontSize: '15px',
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
  
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-blue-800 font-bold text-xl md:text-2xl">User List</h1>
      <div className='flex justify-between'>
        <div className='relative'>
          <input type='text' className='border-2 border-black rounded-md p-2 outline-none w-48 sm:w-96' placeholder='Search User ID/Name' id='text' onChange={handleChange}/>
          <IoIosSearch className='absolute right-1 top-1' size={30}/>
        </div>
        <button className='bg-blue-700 text-white px-2 py-1 md:px-5 md:py-2 rounded-md' onClick={handleRefresh}>Refresh</button>
      </div>
      <DataTable columns={columns} data={data} keyField='id' pagination customStyles={customStyles}/>
    </div>
  )
}

export default UserList
