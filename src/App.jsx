import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Signup from "./Components/Signup";
import DashBoard from "./Components/DashBoard";
import Chat from "./Components/Chat";
import FCSlots from "./Components/FCSlots";
import Refferals from "./Components/Referrals";
import Settings from "./Components/Settings";
import Support from "./Components/Support";
import SignIn from "./Components/SignIn";
import TopUp from "./Components/TopUp";
import Wallet from "./Components/Wallet";
import Withdraw from "./Components/Witdraw";
import NavBar from "./main/NavBar";
import Homepage from "./main/HomePage";
import Chats from "./Components/Chats";

function App() {

  const navigate = useNavigate();
  useEffect(()=> {
    // const authGuard = ()=> {
      let token = localStorage.getItem('accessToken');
      // console.log(token);
      if(!token){
        navigate('/');
      }
      // else{
      //   navigate('app/Dashboard')
      // }
    // }
    // authGuard()
  }, [])

  return(
  <Routes>
    <Route path="/" element={<SignIn />}></Route>
    <Route path="/Signup" element={<Signup />}></Route>
    <Route path="/app" element={<Homepage />}>
      <Route path="DashBoard" index element={<DashBoard/>}></Route>
      <Route path="Chats" element={<Chats />}></Route>
      <Route path="Chats/:id" element={<Chat />}></Route>
      <Route path="FCSlots" element={<FCSlots />}></Route>
      <Route path="MyReferrals" element={<Refferals />}></Route>
      <Route path="Settings" element={<Settings />}></Route>
      <Route path="Support" element={<Support />}></Route>
      <Route path="TopUp" element={<TopUp />}></Route>
      <Route path="Wallet" element={<Wallet />}></Route>
      <Route path="Withdraw" element={<Withdraw />}></Route>
      <Route path="Navbar" element={<NavBar />}></Route>
    </Route>
  </Routes>
  )
}

export default App;
