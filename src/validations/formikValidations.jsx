import * as Yup from 'yup'
import { useFormik } from 'formik'
import axiosInstance from '../interceptors/axios'

export const signUpInitialValues = {
    email: '',
    OTP: ''
}

export const signUpSchema = Yup.object({
    email: Yup.string().required('Please Enter Your Email ID').email('Enter Valid Email ID'),
    OTP: Yup.string().length(4, 'OTP must be 4 Digits').required("Enter Your OTP")
})
