// import React, { useEffect, useState } from "react";
// import { Flex, Progress } from "antd";
// import { getFCSlots } from "../services/services";

// const FCSlots = () => {
//   const [activeTab, setActiveTab] = useState("active");
//   const [activeSlots, setActiveSlots] = useState([]);
//   const [pendingSlots, setPendingSlots] = useState([]);
//   const [completedSlots, setCompletedSlots] = useState([]);
//   const [data, setData] = useState([]);
//   const [tabs, setTabs] = useState("Activated");

//   const fcSlots = async () => {
//     try {
//       const datas = await getFCSlots(tabs);
//       setData(datas.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fcSlots();
//   }, [tabs]);

//   useEffect(() => {
//     const active = data.filter((item) => item.status === "Activated");
//     setActiveSlots(active);
//     const pending = data.filter((item) => item.status === "Pending");
//     setPendingSlots(pending);
//     const completed = data.filter((item) => item.status === "Completed");
//     setCompletedSlots(completed);
//   }, [data]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="w-full h-full font-poppins text-sm overflow-y-auto bg-white">
//       <div className="bg-primary pt-5  w-full">
//         <div className="flex relative justify-between  px-6 items-center w-full">
//           {/* <div> */}
//           <button
//             onClick={() => {handleTabClick("active"), setTabs("Activated")}}
//             className={`py-2 w-28 focus:outline-none ${
//               activeTab === "active"
//                 ? "bg-white text-pribg-primary rounded-t-md"
//                 : "text-white"
//             }`}
//           >
//             {/* <span className="border-pribg-primary border-b-2 inline-block py-2" >Active</span> */}
//             Active
//           </button>
//           {/* </div> */}
//           <button
//             onClick={() => {handleTabClick("completed"), setTabs("Completed")}}
//             className={`py-2 w-28 focus:outline-none ${
//               activeTab === "completed"
//                 ? "bg-white text-pribg-primary rounded-t-md "
//                 : "text-white"
//             }`}
//           >
//             Completed
//             {/* <span className="h-1 bg-black inline-block" >Completed</span> */}
//           </button>
//           <span
//             className={`h-0.5 bg-primary absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${
//               activeTab === "active" ? "left-10 w-20" : "right-10 w-20 "
//             }`}
//           ></span>
//         </div>
//       </div>
//       <div className="bg-white">
//         <div>
//           {data&&data.map((item, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <Progress
//                 strokeColor="#3B5998"
//                 key={index}
//                 type="circle"
//                 strokeWidth={15}
//                 size={80}
//                 percent={
//                   (item.currentYield?.toFixed(3) / item.totalYield) * 100
//                 }
//                 className="h-28 w-28  flex justify-center items-center"
//                 format={(percent) => (
//                   <span className="text-xs text-primary font-semibold">{`${percent}`}</span>
//                 )}
//               />
//               <div>
//                 <p className="font-semibold text-sm text-primary">
//                   {item.slotId.slice(0, 5)}
//                 </p>
//                 <p className="text-xs text-slate-400">
//                   Yield: {item.currentYield?.toFixed(4)}/{item.totalYield}
//                 </p>
//                 <p className="text-xs text-slate-400">{item.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* {activeTab === 'completed' && (
//           <div>
//             {completedSlots.map((item, index) => (
//               <div key={index} className='flex items-center gap-3'>
//                 <Progress strokeColor="#3B5998" key={index} type='circle' strokeWidth={15}  size={80} percent={item.percent} className='h-28 w-28 flex justify-center items-center'
//                 format={(percent) => (
//                   <span className='text-xs text-primary font-semibold'>{`${percent}`}</span>
//                 )}
//                 />
//                 <div>
//                   <p className='font-semibold text-sm text-primary'>{item.slotId}</p>
//                   <p className='text-xs text-slate-400'>Yield: {item.yield}/200</p>
//                   <p className='text-xs text-slate-400'>{item.date}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default FCSlots;

import React, { useEffect, useState } from "react";
import { getFCSlots } from "../services/services";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FCSlots = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeSlots, setActiveSlots] = useState([]);
  const [pendingSlots, setPendingSlots] = useState([]);
  const [completedSlots, setCompletedSlots] = useState([]);
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState("Activated");

  const fcSlots = async () => {
    try {
      const datas = await getFCSlots(tabs);
      setData(datas.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fcSlots();
  }, [tabs]);

  useEffect(() => {
    const active = data.filter((item) => item.status === "Activated");
    setActiveSlots(active);
    const pending = data.filter((item) => item.status === "Pending");
    setPendingSlots(pending);
    const completed = data.filter((item) => item.status === "Completed");
    setCompletedSlots(completed);
  }, [data]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // (
  //   <div className="w-full h-full font-poppins text-sm overflow-y-auto bg-white">
  //     <div className="bg-primary pt-5 w-full">
  //       <div className="flex relative justify-between px-6 items-center w-full">
  //         <button
  //           onClick={() => { handleTabClick("active"); setTabs("Activated"); }}
  //           className={`py-2 px-5 focus:outline-none transition-all duration-300 ${
  //             activeTab === "active"
  //               ? "bg-white text-black rounded-t-md transform scale-105"
  //               : "text-white hover:bg-gray-700 hover:text-white"
  //           }`}
  //         >

  return (
    <div className="w-full h-full font-poppins text-sm overflow-y-auto bg-white">
      <div className="bg-primary pt-5 w-full">
        <div className="flex relative justify-between px-6 items-center w-full">
          <button
            onClick={() => { handleTabClick("active"); setTabs("Activated"); }}
            className={`py-3 px-5 focus:outline-none ${
              activeTab === "active"
                ? "bg-white text-black rounded-t-[2.5px] "
                : "text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => { handleTabClick("completed"); setTabs("Completed"); }}
            className={`py-3 px-3 focus:outline-none ${
              activeTab === "completed"
                ? "bg-white text-black rounded-t-[2.5px] "
                : "text-white"
            }`}
          >
            Completed
          </button>
          <span
            className={`h-0.5 bg-primary absolute w-12 rounded-lg bottom-2 transition-all duration-75 ${
              activeTab === "active" ? "left-10 w-12" : "right-8 w-20"
            }`}
          ></span>
        </div>
      </div>
      <div className="bg-white">
        <div>
          {data && data.map((item, index) => {
            const percent = (item.currentYield / item.totalYield) * 100;
            return (
              <div key={index} className="flex items-center gap-5 pl-4 pt-5">
                <div style={{ width: 56, height: 56 }}>
                  <CircularProgressbar
                    value={percent}
                    text={`${percent.toFixed(2)}%`}
                    strokeWidth={16.5}
                    styles={buildStyles({
                      pathColor: "#3b5998",
                      textSize: "18px",
                      textColor: "#3b5998",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#f6f6f6",
                    })}
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">
                    {item.slotId.slice(0, 5)}
                  </p>
                  <p className="text-xs text-slate-400">
                    Yield: {item.currentYield?.toFixed(4)}/{item.totalYield}
                  </p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FCSlots;
