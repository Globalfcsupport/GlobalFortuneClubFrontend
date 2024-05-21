// import React, { useEffect, useState } from 'react';

// const Wallet = () => {
//   const [todayReferral, setTodayReferral] = useState(0);
//   const [overallReferral, setOverallReferral] = useState(0);
//   const [activeTab, setActiveTab] = useState('active');
//   const [activeData, setActiveData] = useState([]);
//   const [completedData, setCompletedData] = useState([]);

//   useEffect(() => {
//     // Replace with your actual backend API call
//     const fetchReferralData = async () => {
//       // Simulated backend response
//       const response = {
//         todayReferral: 0,
//         overallReferral: 0,
//         allData: ['allData Item 1', 'allData Item 2'],
//         cryptoData: ['cryptoData Item 1', 'cryptoData Item 2'],
//         internalData:['internalData Item 1', 'internalData Item 2']
//       };

//       // Set the data from the backend to the state
//       setTodayReferral(response.todayReferral);
//       setOverallReferral(response.overallReferral);
//       setActiveData(response.allData);
//       setActiveData(response.cryptoData);
//       setCompletedData(response.internalData);
//     };

//     fetchReferralData();
//   }, []);

//   const handleTodayReferralChange = (event) => {
//     setTodayReferral(event.target.value);
//   };

//   const handleOverallReferralChange = (event) => {
//     setOverallReferral(event.target.value);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className=" text-sm w-full">
//       <div className='bg-blue-800 pt-3'>
//       <div className=" flex justify-between">
//         <div className="flex flex-col justify-center items-center ml-5">
//           <span className='text-white'>Transaction Date</span>
//           <input
//             type="number"
//             name="todayReferral"
//             value={todayReferral}
//             onChange={handleTodayReferralChange}
//             className="mt-1 border rounded-md w-24 pl-2"
//           />
//         </div>
//         <div className="flex flex-col justify-center items-center mr-5">
//           <span className='text-white'>My Wallet</span>
//           <input
//             type="number"
//             name="overallReferral"
//             value={overallReferral}
//             onChange={handleOverallReferralChange}
//             className="mt-1 border rounded-md w-24 pl-2 "
//           />
//         </div>
//       </div>
//       <div className="flex justify-between items-center w-full mt-4">
//       <button onClick={() => handleTabClick('All')}
//             className={`py-2 px-5 focus:outline-none ${activeTab === 'All' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
//             {/* <span className="border-blue-800 border-b-2 inline-block py-2" >Active</span> */}
//             All
//           </button>
//         {/* </div> */}
//         <button
//           onClick={() => handleTabClick('Crypto')}
//           className={`py-2 px-5 focus:outline-none ${
//             activeTab === 'Crypto' ? 'bg-white text-blue-800 rounded-t-md ' : 'text-white'
//           }`}
//         >
//           Crypto
//           {/* <span className="h-1 bg-black inline-block" >Completed</span> */}
//         </button>
//         <button
//           onClick={() => handleTabClick('Internal')}
//           className={`py-2 px-5 focus:outline-none ${
//             activeTab === 'Internal' ? 'bg-white text-blue-800 rounded-t-md ' : 'text-white'
//           }`}
//         >
//           Internal
//           {/* <span className="h-1 bg-black inline-block" >Completed</span> */}
//         </button>
//           <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='active'? 'left-10': 'right-11 w-20'}`}></span>
     
//         {/* <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='active'? 'left-10': 'right-11 w-20'}`}></span> */}
//       </div>
//         </div>
//       <div className="p-5 ">
//         {activeTab === 'all' && (
//           <div>
//             {allData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//          {activeTab === 'active' && (
//           <div>
//             {activeData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//         {activeTab === 'completed' && (
//           <div>
//             {completedData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
//     </div>
//   );
// };

// export default Wallet;


// import React, { useEffect, useState } from 'react';

// const Wallet = () => {
  
//   // const [activeTab, setActiveTab] = useState('active');
//   const [todayReferral, setTodayReferral] = useState(0);
//   const [overallReferral, setOverallReferral] = useState(0);
//   const [activeTab, setActiveTab] = useState('All');
//   const [allData, setAllData] = useState([]);
//   const [cryptoData, setCryptoData] = useState([]);
//   const [internalData, setInternalData] = useState([]);

//   useEffect(() => {
//     const fetchReferralData = async () => {
      
//       const response = {
//         todayReferral: 0,
//         overallReferral: 0,
//         allData: ['allData Item 1', 'allData Item 2'],
//         cryptoData: ['cryptoData Item 1', 'cryptoData Item 2'],
//         internalData: ['internalData Item 1', 'internalData Item 2']
//       };

//       // Set the data from the backend to the state
//       setTodayReferral(response.todayReferral);
//       setOverallReferral(response.overallReferral);
//       setAllData(response.allData);
//       setCryptoData(response.cryptoData);
//       setInternalData(response.internalData);
//     };

//     fetchReferralData();
//   }, []);

//   const handleTodayReferralChange = (event) => {
//     setTodayReferral(event.target.value);
//   };

//   const handleOverallReferralChange = (event) => {
//     setOverallReferral(event.target.value);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="text-sm w-full">
//       <div className='bg-blue-800 pt-3'>
//         <div className="flex justify-between">
//           <div className="flex flex-col justify-center items-center ml-5">
//             <span className='text-white'>Transaction Date</span>
//             <input
//               type="number"
//               name="todayReferral"
//               value={todayReferral}
//               onChange={handleTodayReferralChange}
//               className="mt-1 border rounded-md w-24 pl-2"
//             />
//           </div>
//           <div className="flex flex-col justify-center items-center mr-5">
//             <span className='text-white'>My Wallet</span>
//             <input
//               type="number"
//               name="overallReferral"
//               value={overallReferral}
//               onChange={handleOverallReferralChange}
//               className="mt-1 border rounded-md w-24 pl-2"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between items-center w-full mt-4">
//           <button onClick={() => handleTabClick('All')}
//             className={`py-2 px-5 focus:outline-none ${activeTab === 'All' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}>
//             All
//           </button>
//           <button
//             onClick={() => handleTabClick('Crypto')}
//             className={`py-2 px-5 focus:outline-none ${
//               activeTab === 'Crypto' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'
//             }`}
//           >
//             Crypto
//           </button>
//           <button
//             onClick={() => handleTabClick('Internal')}
//             className={`py-2 px-5 focus:outline-none ${
//               activeTab === 'Internal' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'
//             }`}
//           >
//             Internal
//           </button>
//           <span className={`h-1 bg-blue-800 absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${activeTab==='All'? 'left-10': 'right-11 w-20'}`}></span>
//         </div>
//       </div>
//       <div className="p-5">
//         {activeTab === 'All' && (
//           <div>
//             {allData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//         {activeTab === 'Crypto' && (
//           <div>
//             {cryptoData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//         {activeTab === 'Internal' && (
//           <div>
//             {internalData.map((item, index) => (
//               <div key={index} className="p-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wallet;
import React, { useEffect, useState } from 'react';

const Wallet = () => {
  const [todayReferral, setTodayReferral] = useState(0);
  const [overallReferral, setOverallReferral] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const [allData, setAllData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [internalData, setInternalData] = useState([]);

  useEffect(() => {
    const fetchReferralData = async () => {
      const response = {
        todayReferral: 0,
        overallReferral: 0,
        allData: ['allData Item 1', 'allData Item 2'],
        cryptoData: ['cryptoData Item 1', 'cryptoData Item 2'],
        internalData: ['internalData Item 1', 'internalData Item 2']
      };

      setTodayReferral(response.todayReferral);
      setOverallReferral(response.overallReferral);
      setAllData(response.allData);
      setCryptoData(response.cryptoData);
      setInternalData(response.internalData);
    };

    fetchReferralData();
  }, []);

  const handleTodayReferralChange = (event) => {
    setTodayReferral(event.target.value);
  };

  const handleOverallReferralChange = (event) => {
    setOverallReferral(event.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-sm w-full">
      <div className="bg-blue-800 pt-3">
        <div className="flex justify-between ">
          <div className="flex flex-col justify-center items-center px-6">
            <span className="text-white">Transaction Date</span>
            <input
              type="number"
              name="todayReferral"
              value={todayReferral}
              onChange={handleTodayReferralChange}
              className="mt-1 border rounded-md w-24 pl-2"
            />
          </div>
          <div className="flex flex-col justify-center items-center mr-5">
            <span className="text-white">My Wallet</span>
            <input
              type="number"
              name="overallReferral"
              value={overallReferral}
              onChange={handleOverallReferralChange}
              className="mt-1 border rounded-md w-24 pl-2"
            />
          </div>
        </div>
        <div className="flex relative justify-between px-6 mt-6 items-center w-full">
          <button
            onClick={() => handleTabClick('All')}
            className={`py-2 px-5 focus:outline-none ${activeTab === 'All' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => handleTabClick('Crypto')}
            className={`py-2 px-5 focus:outline-none ${activeTab === 'Crypto' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}
          >
            Crypto
          </button>
          <button
            onClick={() => handleTabClick('Internal')}
            className={`py-2 px-5 focus:outline-none ${activeTab === 'Internal' ? 'bg-white text-blue-800 rounded-t-md' : 'text-white'}`}
          >
            Internal
          </button>
          <span
            className={`h-1 bg-blue-800 absolute bottom-0 transition-all duration-75 ${activeTab === 'All' ? 'left-0 w-12' : activeTab === 'Crypto' ? 'left-1/3 w-16' : 'right-0 w-20'}`}
          ></span>
        </div>
      </div>
      <div className="p-5">
        {activeTab === 'All' && (
          <div>
            {allData.map((item, index) => (
              <div key={index} className="p-2">
                {item}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Crypto' && (
          <div>
            {cryptoData.map((item, index) => (
              <div key={index} className="p-2">
                {item}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Internal' && (
          <div>
            {internalData.map((item, index) => (
              <div key={index} className="p-2">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
