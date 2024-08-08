import React, { useEffect, useState } from "react";
import { getFCSlots } from "../services/services";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment/moment";
import { ImSpinner8 } from "react-icons/im";

const FCSlots = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeSlots, setActiveSlots] = useState([]);
  const [pendingSlots, setPendingSlots] = useState([]);
  const [completedSlots, setCompletedSlots] = useState([]);
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState("Activated");
  const [loading, setLoading] = useState(false);

  const fcSlots = async () => {
    setLoading(true); 
    try {
      const datas = await getFCSlots(tabs);
      setData(datas.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
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

  return (
    <div className="w-full h-full font-poppins text-[12px] overflow-y-auto bg-[#eeeeee]">
      <div className="bg-primary pt-5 w-full">
        <div className="flex relative justify-between px-6 items-center w-full">
          <button
            onClick={() => {
              handleTabClick("active");
              setTabs("Activated");
            }}
            className={`py-2 w-28 focus:outline-none ${
              activeTab === "active"
                ? "bg-[#eeeeee] text-primary rounded-t-md"
                : "text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              handleTabClick("completed");
              setTabs("Completed");
            }}
            className={`py-2 w-28 focus:outline-none ${
              activeTab === "completed"
                ? "bg-[#eeeeee] text-primary rounded-t-md"
                : "text-white"
            }`}
          >
            Completed
          </button>
          <span
            className={`h-0.5 bg-primary absolute w-12 rounded-lg bottom-1 transition-all duration-75 ${
              activeTab === "active" ? "left-10 w-20" : "right-10 w-20"
            }`}
          ></span>
        </div>
      </div>
      <div className="bg-[#eeeeee] border w-full flex flex-col gap-3 items-center rounded-xxl pt-2 px-2 pb-2">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <ImSpinner8 className="text-primary animate-spin" style={{ width: '40px', height: '40px' }} />
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {data &&
              data.map((item, index) => {
                const percent = (item.currentYield / item.totalYield) * 100;
                return (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg shadow-lg bg-white w-full">
                    <div style={{ width: 60, height: 56 }}>
                      <CircularProgressbar
                        value={percent}
                        text={`${Math.round(percent)}%`}
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
                    <div className="p-2 justify-center">
                      <p className="font-semibold text-[15px] text-primary">
                        {item.slotId}
                      </p>
                      <p className="text-xs text-slate-400">
                        Yield: {item.currentYield?.toFixed(4)}/{item.totalYield}
                      </p>
                      <p className="text-xs text-slate-400">
                        {moment(item.date, "DD-MM-YYYY").format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FCSlots;