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

export const getFCSlots = async ()=>{
  let response = await useAxiosInterceptors.get("/user/get/fc/slots");
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