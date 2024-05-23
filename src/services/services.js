import useAxiosInterceptors from "../interceptors/axios";

export const Register = async (data) => {
  let ApiResponse = await useAxiosInterceptors.post("auth/register", data);
  return ApiResponse;
};
