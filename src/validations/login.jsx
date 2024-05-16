import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().required("Enter Name "),
  password: Yup.string().required("Enter phone number"),
});

export const LoginInitValues = {
  email: "",
  password: "",
};
