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

export const getuserById = async (id)=>{
  let response = await useAxiosInterceptors.get("/user/"+id);
  return response
}