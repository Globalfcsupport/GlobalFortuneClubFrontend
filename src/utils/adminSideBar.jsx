import {
    FaHome,
    FaUser,
    FaRegMoneyBillAlt,
    FaListAlt,
    FaHistory,
    FaHeadset,
    FaCog,
    FaSignOutAlt,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaXRay
  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const admin = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Userlist",
      icon: <FaUser />,
      path: "/userlist",
    },
    {
      title: "Withdraw Request",
      icon: <FaRegMoneyBillAlt />,
      path: "/withdraw",
    },
    {
      title: "FC Slot Log",
      icon: <FaListAlt />,
      path: "/slotlog",
    },
    {
      title: "Transaction Log",
      icon: <FaHistory />,
      path: "/transaction",
    },
    {
      title: "Support (Admin Chat)",
      icon: <FaHeadset />,
      path: "/support",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  export default admin