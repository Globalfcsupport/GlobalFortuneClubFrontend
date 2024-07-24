import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {

   const token = localStorage.getItem("accessToken");
   
  let auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;