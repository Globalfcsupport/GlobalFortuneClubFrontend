import useAxiosInterceptors from "../interceptors/axios";

export const Login = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("auth/admin/login", data);
  return ApiResponse;
};

export const GetUsersList = async () => {
  let ApiResponse = await useAxiosInterceptors.get("/user/users/admin");
  return ApiResponse;
};

export const getSetting = async () => {
  let ApiResponse = await useAxiosInterceptors.get("/admin/setting");
  return ApiResponse;
};
 export const getTransaction = async ()=>{
  let ApiResponse = await useAxiosInterceptors.get("/admin/trnsaction/histories")
  return ApiResponse
 }

export const getDashboardReport = async ()=>{
  let ApiResponse = await useAxiosInterceptors.get("/admin/get/appreport/dashboard")
  return ApiResponse
}
 export const getWithdrawRequest = async ()=>{
  let ApiResponse = await useAxiosInterceptors.get("/admin/getwidthdraw/requests")
  return ApiResponse
 }

 export const getFcSlotLog = async ()=>{
  let ApiResponse = await useAxiosInterceptors.get("/admin/getfc/slots/log")
  return ApiResponse
 }

 export const getUserByAuth = async()=>{
  let response = await useAxiosInterceptors.get("/user/auth/details")
  return response
}

export const getChathistories = async (id)=>{
  let response = await useAxiosInterceptors.get("/user/get/chat/history/"+id);
  return response
}

export const getGroup = async (id)=>{
  let responsse = await useAxiosInterceptors.get("/user/create/room/"+id)
  return responsse
}