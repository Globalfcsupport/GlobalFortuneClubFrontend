import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { getWithdrawRequest } from "../services/servicces";
import { Pagination } from "antd";

const PendingWithdrawRequest = () => {
  const { toggleSideBar } = useSideBar();
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayedRequests, setDisplayedRequests] = useState([]);

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

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const paginatedRequests = withdrawRequests.slice(startIndex, startIndex + pageSize);
    setDisplayedRequests(paginatedRequests);
  }, [page, pageSize, withdrawRequests]);

  return (
    <div className="bg-bg_primary h-full p-5">
      <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
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
              <th className="">Status</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.isArray(displayedRequests) &&
              displayedRequests.map((item, index) => (
                <tr key={index}>
                  <td className="">{item.refId}</td>
                  <td className="">{new Date(item._id.toString().substring(0, 8) * 1000).toLocaleDateString()}</td>
                  <td className="">${item.requestAmt}</td>
                  <td className="">{item.USDTAddress}</td>
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
        <Pagination
          className="flex justify-end mt-4"
          total={withdrawRequests.length}
          pageSize={pageSize}
          showSizeChanger
          onShowSizeChange={(current, size) => setPageSize(size)}
          current={page}
          showQuickJumper={true}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default PendingWithdrawRequest;
