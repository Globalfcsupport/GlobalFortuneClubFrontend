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
