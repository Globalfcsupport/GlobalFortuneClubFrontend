import React, { useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useSideBar } from "../context/SideBarContext";

const HomePage = () => {
  const { closeSideBar } = useSideBar();
  const sidebarRef = useRef(null);
  // console.log(sidebarRef.current)

  const handleClickOutside = (event) => {
    if (!sidebarRef.current.contains(event.target)) {
      closeSideBar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full h-full flex bg-white">
      <div className="h-screen md:sticky md:w-fit top-0" ref={sidebarRef}>
        <SideBar />
      </div>
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default HomePage;
