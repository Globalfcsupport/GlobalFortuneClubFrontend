import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useSideBar } from "../context/SideBarContext";
import { GetUsersList } from "../services/servicces";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const { toggleSideBar } = useSideBar();
  const [sdata, setsData] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    setPage(1);
    setSearchText(e.target.value);
  };

  const fetchUserList = async () => {
    try {
      let values = await GetUsersList();
      setsData(values.data);
      setData(values.data.slice(0, pageSize));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    let filteredData = sdata;

    if (searchText) {
      filteredData = sdata.filter((item) =>
        item.userName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
    setData(paginatedData);
  }, [page, searchText, pageSize, sdata]);

  return (
    <div className="flex flex-col justify-between h-full font-poppins">
      <div className="h-12 md:h-16 bg-white flex justify-between px-5 md:px-10 items-center">
        <div className="flex items-center gap-3">
          <FaUser className="md:text-xl text-blue-700" />
          <h1 className="md:text-xl font-semibold text-blue-700">UserList</h1>
        </div>
        <input
          type="text"
          placeholder="Search Name"
          className="bg-blue-100 rounded-md outline-none text-xs px-2 md:px-4 py-1 md:py-2"
          id="searchText"
          onChange={handleSearch}
        />
        <div className="md:hidden text-blue-500" onClick={toggleSideBar} id="bars">
          <FaBars />
        </div>
      </div>

      <div className="p-5 md:p-10 bg-bg_primary flex md:text-base text-xs h-full flex-col gap-5 overflow-hidden rounded-tr-xl rounded-tl-xl">
        <div className="p-2 overflow-x-auto">
          <table cellPadding={10} cellSpacing={50} className="rounded-table">
            <thead className="font-semibold bg-blue-200">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>MW Balance</td>
                <td>Total Yield</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((item, i) => (
                <tr key={item._id}>
                  <td>{(page - 1) * pageSize + i + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.myWallet}</td>
                  <td>{item.totalYield}</td>
                  <td className={`${item.active ? "text-green-500" : "text-red-500"}`}>
                    {item.active ? "true" : "false"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          className="flex justify-end"
          total={searchText ? data.length : sdata.length}
          pageSize={pageSize}
          showSizeChanger
          onShowSizeChange={(current, value) => setPageSize(value)}
          current={page}
          showQuickJumper={true}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default UserList;
