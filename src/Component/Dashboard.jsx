// import React from 'react'
import DataTable from 'react-data-table-component'

const Dashboard = () => {
  const columns = [
    {
      name: 'Title',
      selector: row=>row.title
    },
    {
      name: 'Today',
      selector: row=>row.today
    },
    {
      name: 'Overall',
      selector: row=>row.overall
    }
  ];

  const data = [
    
      {
        id: 1,
        title: 'Total Users',
        today: 0,
        overall: 0
      },
      {
        id: 2,
        title: 'Yield',
        today: 0,
        overall: 0
      },
      {
        id: 3,
        title: 'User Main Wallet Balance',
        today: 0,
        overall: 0
      },
      {
        id: 4,
        title: 'User Crowd Stack Balance',
        today: 0,
        overall: 0
      },
      {
        id: 5,
        title: 'Admin Wallet Balance',
        today: 0,
        overall: 0
      },
      {
        id: 6,
        title: 'Admin Comission',
        today: 0,
        overall: 0
      },
      {
        id: 7,
        title: 'Active Slots',
        today: 0,
        overall: 0
      },
      {
        id: 8,
        title: 'Completed Slots',
        today: 0,
        overall: 0
      },
      {
        id: 9,
        title: 'Crypto Deposit',
        today: 0,
        overall: 0
      },
      {
        id: 10,
        title: 'Crypto Withdraw',
        today: 0,
        overall: 0
      },
      {
        id: 11,
        title: 'Internal Transaction',
        today: 0,
        overall: 0
      },
      {
        id: 12,
        title: 'Leftover Wallet',
        today: 0,
        overall: 0
      },
    
  ]

  const customStyles = {
    table: {
      style: {
        borderRadius: '10px',
        overflow: 'hidden',
      }
    },
    headRow: {
      style: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '20px',
        // borderRadius: '10px'
        padding: '0px'
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

  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-blue-800 font-bold text-2xl'>Dashboard</h1>
      <DataTable columns={columns} data={data} customStyles={customStyles}/>
    </div>
  )
}

export default Dashboard
