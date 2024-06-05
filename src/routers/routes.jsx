import ActiveFCSlotLog from "../Component/ActiveFCSlotLog";
import CompletedFCSlotLog from "../Component/CompletedFCSlotLog";
import CompletedWithdrawRequest from "../Component/CompletedWithdrawRequest";
import Dashboard from "../Component/Dashboard";
import FCSlotLog from "../Component/FCSlotLog";
import Logout from "../Component/Logout";
import PendingWithdrawRequest from "../Component/PendingWithdrawRequest";
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
          nestedNestedRoutes: [
            {
              nestedNestedPath: 'pending',
              nestedNestedElement: <PendingWithdrawRequest />
            },
            {
              nestedNestedPath: 'completed',
              nestedNestedElement: <CompletedWithdrawRequest />
            }
          ]
        },
        {
          nestedPath: "slotlog",
          nestedElement: <FCSlotLog/>,
          nestedNestedRoutes: [
            {
              nestedNestedPath: 'active',
              nestedNestedElement: <ActiveFCSlotLog />
            },
            {
              nestedNestedPath: 'completed',
              nestedNestedElement: <CompletedFCSlotLog />
            }
          ]
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