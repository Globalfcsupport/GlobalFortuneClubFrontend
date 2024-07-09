import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { getWithdrawRequest } from "../services/servicces";

const PendingWithdrawRequest = () => {
  const { toggleSideBar } = useSideBar();
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await getWithdrawRequest();
        setWithdrawRequests(response.data);
        console.log(response.data, "data");
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
      }
    };

    fetchWithdrawRequests();
  }, []);

  return (
    <div className="bg-bg_primary h-full p-5">
      <div
        className="md:hidden text-blue-500"
        onClick={toggleSideBar}
        id="bars"
      >
        <FaBars />
      </div>
      <div className="rounded-md overflow-hidden">
        <table className="w-full" cellPadding={10} cellSpacing={0}>
          <thead className="font-semibold bg-blue-200">
            <tr>
              <th className="">User ID</th>
              <th className="">Requested Date</th>
              <th className="">Requested Amount</th>
              <th className="">USDT Wallet ID</th>
              <th className="">Transaction Ref. No</th>
              <th className="">Status</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.isArray(withdrawRequests) &&
              withdrawRequests.map((item,index) => (
                <tr key={index}>
                  <td className="">{item.userId}</td>
                  <td className="">{new Date(item._id.toString().substring(0, 8)).toLocaleDateString()}</td>
                  <td className="">${item.requestAmt}</td>
                  <td className="">{item.USDTAddress}</td>
                  <td className="">{item.refId}</td>
                  <td className="">{item.status}</td>
                  <td className="">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingWithdrawRequest;