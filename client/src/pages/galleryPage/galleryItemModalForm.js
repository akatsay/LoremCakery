import React from "react";
import { toast, Slide } from "react-toastify"
import { Formik, Form } from 'formik';
import { useHttp } from "../../hooks/httpHook"


import { galleryItemSchema } from '../../Validations/galleryItemValidation';

import { Input } from "../../components/forms/input"
import { TextArea } from '../../components/forms/textArea';
import { FileInput } from "../../components/forms/fileInput";

export const GalleryItemModalForm = ({imageSrc, title, description, price, onClose}) => {
    const {loading, request, clearError} = useHttp()

    return (
      <Formik
        initialValues={{
          image: '',
          imageAsString: imageSrc,
          title: title,
          description: description,
          price: price,
        }}
        validationSchema={galleryItemSchema}

        // onSubmit={ async (values) => {

        //     const data = {
        //       imageAsString: values.imageAsString,
        //       title: values.title,
        //       description: values.description,
        //       price: values.price,
        //     }

        //     try {
        //         console.log(data)
        //         await request("api/gallery", "post", data)
        //         toast.success("Contact request sent", {
        //             style: {backgroundColor: "#555", color: "white"},
        //             position: "bottom-right",
        //             autoClose: 2000,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //             transition: Slide,
        //         })

        //         fetchItems()
        //         clearError()
                
        //     } catch (e) {
        //         console.log(e.message)
        //     }
        // }}
      >
        {({ values, setFieldValue }) => (
          <>
            <Form className="gallery-item-form">
              <FileInput 
                label="image(*will be cropped to 350x350px)" 
                name="image" 
                values={values} 
                imagePlaceholder={imageSrc} 
                setFieldValue={setFieldValue} 
                multiple={false} 
              />
              <Input label="title" name="title" type="text" />
              <TextArea rows={5} label="description" name="description" type="text"></TextArea>
              <Input label="price" name="price" type="number" />

              <button disabled={loading ? true : false} className="action-btn" type="submit">Create</button>
              <button disabled={loading ? true : false} className="action-btn reset" type="reset">Reset</button>
            </Form>
          </>
        )}
      </Formik>
    )
}
 
export default GalleryItemModalForm;