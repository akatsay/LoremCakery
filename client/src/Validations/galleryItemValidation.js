import * as yup from "yup"

const SUPPORTED_FORMATS = ['image/png', 'image/jpeg', 'image/jpg']

export const galleryItemSchema = yup.object().shape({
    image: yup
        .mixed()
        .nullable()
        .test(
            "FILE_FORMAT",
            "Only PNG and JPEG/JPG files are allowed",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        )
        .test(
            "FILE_SIZE",
            "File size should be no larger than 2MB",
            (value) => !value || (value && value.size <= 1024 * 1024)
        ),
    title: yup
        .string()
        .required("*Required")
        .max(30, "Must be 30 characters or less"),
    description: yup
        .string()
        .required("*Required"),
    price: yup
        .number()
        .required("*Required")
})