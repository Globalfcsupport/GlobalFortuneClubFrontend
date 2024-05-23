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
import NavBar from "./main/NavBar";
import Homepage from "./main/HomePage";

function App() {
  return(
  <Routes>
  {/* <Route path="/" element={localStorage.getItem('accessToken')?<Homepage />:<SignIn />}> */}
  <Route path="/" element={<SignIn />}></Route>
  <Route path="/Homepage" element={<Homepage/>}>
    <Route path="/Homepage/DashBoard" index element={<DashBoard/>}></Route>
    <Route path="/Homepage/Chat" element={<Chat />}></Route>
    <Route path="/Homepage/FCSlots" element={<FCSlots />}></Route>
    <Route path="/Homepage/Refferals" element={<Refferals />}></Route>
    <Route path="/Homepage/Settings" element={<Settings />}></Route>
    <Route path="/Homepage/Signup" element={<Signup />}></Route>
    <Route path="/Homepage/Support" element={<Support />}></Route>
    <Route path="/Homepage/TopUp" element={<TopUp />}></Route>
    <Route path="/Homepage/Wallet" element={<Wallet />}></Route>
    <Route path="/Homepage/Witdraw" element={<Witdraw />}></Route>
    <Route path="/Homepage/Navbar" element={<NavBar />}></Route>
  </Route>
  </Routes>
  )
}

export default App;
