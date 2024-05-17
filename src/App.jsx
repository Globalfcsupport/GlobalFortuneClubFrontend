import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./Components/Signup";
import DashBoard from "./Components/DashBoard";
import Chat from "./Components/Chat";
import FCSlots from "./Components/FCSlots";
import Refferals from "./Components/Refferals";
import Settings from "./Components/Settings";
import Support from "./Components/Support";
import SignIn from "./Components/SignIn";
import TopUp from "./Components/TopUp";
import Wallet from "./Components/Wallet";
import Witdraw from "./Components/Witdraw";

function App() {
  return(
  <>
  <Routes>
  <Route path="/" element={<SignIn/>}>
    <Route path="/DashBoard" element={DashBoard}>Dashboard</Route>
    <Route path="/Chat" element={Chat}></Route>
    <Route path="/FCSlots" element={FCSlots}></Route>
    <Route path="/Refferals" element={Refferals}></Route>
    <Route path="/Settings" element={Settings}></Route>
    <Route path="/SignIn" element={SignIn}></Route>
    <Route path="/Signup" element={Signup}></Route>
    <Route path="/Support" element={Support}></Route>
    <Route path="/TopUp" element={TopUp}></Route>
    <Route path="/Wallet" element={Wallet}></Route>
    <Route path="/Witdraw" element={Witdraw}></Route>
  </Route>
  </Routes>
  </>
  )
}

export default App;
