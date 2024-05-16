import React, { useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import Routers from "./routers";
import { DataProvider } from "./context/HomeContext";
import "./App.css";
import LoginPage from "./main/LoginPage";

const App = () => {
  const navigate = useNavigate();
  const AuthGuard = async () => {
    let token = localStorage.getItem("gfcadmintoken");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    AuthGuard();
  }, []);

  return (
    <DataProvider>
      <div>
        <Routers />
      </div>
    </DataProvider>
  );
};

export default App;
