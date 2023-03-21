import React, { useRef } from "react";
import { toast, Slide } from "react-toastify"
import { Formik, Form } from 'formik';
import { useHttp } from "../../hooks/httpHook"


import { galleryItemSchema } from '../../Validations/galleryItemValidation';

import { Input } from "../../components/forms/input"
import { TextArea } from '../../components/forms/textArea';
import { FileInput } from "../../components/forms/fileInput";


const CreateArea = () => {
    const {loading, request, clearError} = useHttp()

    return (
      <Formik
        initialValues={{
          image: '',
          title: '',
          description: '',
          price: '',
        }}
        validationSchema={galleryItemSchema}
        onSubmit = {(values) => {
            console.log(values)
        }}
        // onSubmit={ async (values) => {
        //     try {
        //         await request("api/contact", "post", {...values})
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

        //         clearError()
                
        //     } catch (e) {
        //         toast.error(e.message, {
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
        //             });
        //     }
        // }}
      >
        {({ values, setFieldValue }) => (
          <>
            <Form className="gallery-item-form">
              <FileInput label="image(*will be cropped to 350x350px)" name="image" values={values} setFieldValue={setFieldValue} multiple={false} />
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
 
export default CreateArea;