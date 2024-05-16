// import React from 'react'

const UserList2 = () => {

    const data = [
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

    return (
        <div>
            <table>
                <thead>          
                    <td>ID</td>
                    <td>Name</td>
                    <td>MW Balance</td>
                    <td>Total Yield</td>
                    <td>Status</td>
                </thead>
                <tbody>
                    {
                        data.map((item)=> {
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.mwbalance}</td>
                                <td>{item.totalYield}</td>
                                <td>{item.status}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
  )
}

export default UserList2
