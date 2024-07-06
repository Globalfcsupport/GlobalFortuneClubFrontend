import Dashboard from "../Component/Dashboard";
import FCSlotLog from "../Component/FCSlotLog";
import Logout from "../Component/Logout";
import Settings from "../Component/Settings";
import SupportAdminChart from "../Component/SupportAdminChart";
import TransectionLog from "../Component/TransectionLog";
import UserList from "../Component/UserList";
import WithdrawRequest from "../Component/WithdrawRequest";
import HomePage from "../main/HomePage";
import LoginPage from "../main/LoginPage";

const pages = [
    {
        title: "LOGIN",
        path:"",
        element: <LoginPage/>
    },
    {
        title: "HOMEPAGE",
        path:"homepage",
        element: <HomePage/>,
        nestedRoutes: [
            {
              nestedPath: "dashboard",
              nestedElement: <Dashboard/>,
            },
            {
                nestedPath: "userlist",
                nestedElement: <UserList/>,
              },
              {
                nestedPath: "withdraw",
                nestedElement: <WithdrawRequest/>,
              },
              {
                nestedPath: "slotlog",
                nestedElement: <FCSlotLog/>,
              },
              {
                nestedPath: "transaction",
                nestedElement: <TransectionLog/>,
              },
              {
                nestedPath: "support",
                nestedElement: <SupportAdminChart/>,
              },
              {
                nestedPath: "settings",
                nestedElement: <Settings/>,
              },
        ]
    }
]

export default pages;