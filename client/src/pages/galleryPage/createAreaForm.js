import React, {useContext} from "react";
import { AuthContext } from '../../context/authContext'
import { toast, Slide } from "react-toastify"
import { Formik, Form } from 'formik';
import { useHttp } from "../../hooks/httpHook"


import { galleryItemSchema } from '../../Validations/galleryItemValidation';

import { Input } from "../../components/forms/input"
import { TextArea } from '../../components/forms/textArea';
import { FileInput } from "../../components/forms/fileInput";


const CreateAreaForm = ({ onClose, fetchItems }) => {
    const {loading, request, clearError} = useHttp()

    const auth = useContext(AuthContext)

    return (
      <Formik
        initialValues={{
          image: '',
          imageAsString: '',
          title: '',
          description: '',
          price: '',
        }}
        validationSchema={galleryItemSchema}

        onSubmit={ async (values) => {

            const data = {
              imageAsString: values.imageAsString,
              title: values.title,
              description: values.description,
              price: values.price,
            }

            try {
                await request("api/gallery", "post", data, {
                  Authorization: `Bearer ${auth.token}`
                })
                toast.success("Item created", {
                    style: {backgroundColor: "#555", color: "white"},
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                })

                fetchItems()
                clearError()
                onClose()
                
            } catch (e) {
                toast.error("An error processing your request", {
                  style: {backgroundColor: "#555", color: "white"},
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Slide,
                })
                console.log(e.message)
            }
        }}
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
 
export default CreateAreaForm;