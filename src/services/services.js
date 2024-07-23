import useAxiosInterceptors from "../interceptors/axios";

export const Register = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("auth/register", data);
  return ApiResponse;
};

export const Login = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("auth/user/login", data);
  return ApiResponse;
};

export const verifyUplineId = async (data)=> {
  let ApiResponse = await useAxiosInterceptors.post('auth/verifyref', data);
  return ApiResponse;
}

export const sendOTP = async (data)=> {
  let ApiResponse = await useAxiosInterceptors.post('auth/send/otp', data);
  return ApiResponse;
}

export const topUp = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post('/user/payment', data);
  return ApiResponse;
}

export const getPaymentHistoryByUser = async (data) => {
  let ApiResponse = await useAxiosInterceptors.get('/user/getpayment/history/byuser');
  return ApiResponse;
}

export const ActivateClub = async ()=>{
  let response = await useAxiosInterceptors.get("/user/activate/club")
  return response
}

export const getUsersForChats = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/users/chats")
  return response
}

export const getUserById = async (id)=>{
  let response = await useAxiosInterceptors.get("/user/"+id);
  return response
}

export const getUserByAuth = async()=>{
  let response = await useAxiosInterceptors.get("/user/auth/details")
  return response
}

export const getGroup = async (id)=>{
  let responsse = await useAxiosInterceptors.get("/user/create/room/"+id)
  return responsse
}

export const getChathistories = async (id)=>{
  let response = await useAxiosInterceptors.get("/user/get/chat/history/"+id);
  return response
}

export const getFCSlots = async (status)=>{
  let response = await useAxiosInterceptors.get("/user/get/fc/slots?status="+status);
  return response
}

export const getDashboardDetails = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/user/details/dashboard");
  return response
}

export const getTopUpDetails = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/topup/details");
  return response
}

export const UploadProfileImg = async (data)=>{
  let response = await useAxiosInterceptors.post("/user/profile/image/upload", data)
  return response
}

export const UpdateProfile = async (data)=>{
  let response = await useAxiosInterceptors.post("/user/update/userprofile", data)
  return response
}

export const getUserByRefId = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/users/byrefid")
  return response
}

export const getSettingInfo = async ()=>{
  let response = await useAxiosInterceptors.get("/admin/setting")
  return response
}

export const Withdrawrequest = async (data)=>{
  let response = await useAxiosInterceptors.post("/user/withdraw/request", data)
  return response
}

export const getAdmin = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/admin/details")
  return response
}

export const getMywallet = async (query)=>{
  let response = await useAxiosInterceptors.get("/user/get/withdraw/details?type="+query)
  return response
}

export const signupOTP = async (data)=>{
  let response = await useAxiosInterceptors.post("/auth/user/signup/otp", data)
  return response
}

export const getDateFilterByMywallet = async (query, date) => {
  let response = await useAxiosInterceptors.get(
    `/user/get/withdraw/details?type=${query}&date=${date}`
  );
  return response;
};