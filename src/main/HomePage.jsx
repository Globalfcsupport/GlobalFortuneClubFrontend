import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
// import { DataProvider, useDataContext } from "../context/HomeContext";

const HomePage = () => {
  // const {isCollapsed} = useDataContext();
  
  return (
    <>
      <section className="w-full h-full flex relative bg-white">
        <div className="h-screen sticky top-0">
          <SideBar />
        </div>
        <div className="flex-1 w-full ">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default HomePage;
