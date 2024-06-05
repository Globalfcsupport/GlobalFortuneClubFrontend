import ActiveFCSlotLog from "../Component/ActiveFCSlotLog";
import AllTransaction from "../Component/AllTransaction";
import CompletedFCSlotLog from "../Component/CompletedFCSlotLog";
import CompletedWithdrawRequest from "../Component/CompletedWithdrawRequest";
import CryptoTransaction from "../Component/CryptoTransaction";
import Dashboard from "../Component/Dashboard";
import FCSlotLog from "../Component/FCSlotLog";
import InternalTransaction from "../Component/InternalTransaction";
import Logout from "../Component/Logout";
import PendingWithdrawRequest from "../Component/PendingWithdrawRequest";
import Settings from "../Component/Settings";
import SupportAdminChart from "../Component/SupportAdminChart";
import TransectionLog from "../Component/TransactionLog";
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
          nestedNestedRoutes: [
            {
              nestedNestedPath: 'all',
              nestedNestedElement: <AllTransaction />
            },
            {
              nestedNestedPath: 'crypto',
              nestedNestedElement: <CryptoTransaction />
            },
            {
              nestedNestedPath: 'internal',
              nestedNestedElement: <InternalTransaction />
            }
          ]
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