import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
// import { DataProvider, useDataContext } from "../context/HomeContext";

const HomePage = () => {
  // const {isCollapsed} = useDataContext();
  
  return (
    <>
      <section className="w-full h-full flex relative">
        <div className="h-fit sticky top-10">
          <SideBar />
        </div>
        <div className="flex-1 w-full h-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default HomePage;
