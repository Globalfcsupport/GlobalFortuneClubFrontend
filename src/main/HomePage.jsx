import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { DataProvider, useDataContext } from "../context/HomeContext";

const HomePage = () => {
  const {isCollapsed} = useDataContext();
  
  return (
    <>
        <section className="w-full h-screen flex items-center">
          <div className={`${isCollapsed ?"w-[5%]":"w-[18%]"} h-screen flex items-center justify-start p-0`}>
            <SideBar />
          </div>
          <dir className={`${isCollapsed ?"w-[95%]":"w-[82%]"} h-screen p-0 flex flex-col`}>
            <div className="w-full h-min">
              <NavBar />
            </div>
            <div className="w-full h-[100vh] overflow-hidden bg-blue-50 ">
              <Outlet />
            </div>
          </dir>
        </section>
    </>
  );
};

export default HomePage;
