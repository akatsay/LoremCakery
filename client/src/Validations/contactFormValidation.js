import * as yup from "yup"
import "yup-phone-lite"

export const contactFormsSchema = yup.object().shape({
    firstName: yup.string()
        .required("*Required")
        .max(30, "Must be 30 characters or less"),
    mobile: yup.string()
        .required("*Required")
        .phone("US", "Invalid phone number"),
    email: yup.string()
        .required("*Required")
        .email("Invalid email"),
    message: yup.string()
        .required("*Required")
})