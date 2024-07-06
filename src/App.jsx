import React, { useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import Routers from "./routers";
import "./App.css";
import { SideBarProvider } from "./context/SideBarContext";

const App = () => {
  const navigate = useNavigate();
  // const AuthGuard = async () => {
  //   let token = localStorage.getItem("gfcadmintoken");
  //   if (token) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // };

  useEffect(() => {
      // AuthGuard();
  }, []);

  return (
    <SideBarProvider>
      <Routers />
    </SideBarProvider>
  );
};

export default App;
