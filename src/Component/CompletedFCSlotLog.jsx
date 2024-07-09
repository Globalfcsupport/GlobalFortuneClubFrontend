import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useSlotSearch } from "../context/SlotSearchContext";
import { getFcSlotLog } from "../services/servicces";

const CompletedFCSlotLog = () => {
  const { searchText } = useSlotSearch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allTransactions, setAllTransactions] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  useEffect(() => {
    filterAndPaginateTransactions();
  }, [page, searchText, pageSize, allTransactions]);

  const fetchTransactions = async () => {
    try {
      const response = await getFcSlotLog();
      setAllTransactions(response.data.Completed

      );
      console.log(response.data,"values")
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const filterAndPaginateTransactions = () => {
    let filteredData = allTransactions;
    if (searchText) {
      filteredData = allTransactions.filter(
        (item) =>
          item.userName?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
    setDisplayedTransactions(paginatedData);
  };

  return (
    <div className="bg-bg_primary h-full">
      <div className="p-5 flex flex-col gap-5" id="allS">
        <div className="rounded-md overflow-hidden">
          <table cellPadding={10} cellSpacing={50}>
            <thead className="font-semibold bg-blue-200">
              <tr>
                <td>S. No</td>
                <td>Slot ID</td>
                <td>Ref ID</td>
                <td>Joining Date</td>
                <td>Yield</td>
                <td>Remaining</td>
              </tr>
            </thead>
            <tbody className="bg-white">
              {displayedTransactions.map((item, index) => (
                <tr key={item._id}>
                  <td>{(page - 1) * pageSize + index + 1  }</td>
                  <td>{item.slotId}</td>
                  <td>{item.refId}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.totalYield}</td>                                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          className="flex justify-end"
          total={allTransactions.length}
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

export default CompletedFCSlotLog;
