import React, {useContext} from "react";
import { AuthContext } from '../../context/authContext'
import { toast, Slide } from "react-toastify"
import { Formik, Form } from 'formik';
import { useHttp } from "../../hooks/httpHook"


import { galleryItemSchema } from '../../Validations/galleryItemValidation';

import { Input } from "../../components/forms/input"
import { TextArea } from '../../components/forms/textArea';
import { FileInput } from "../../components/forms/fileInput";

export const GalleryItemModalForm = ({id, imageSrc, title, description, price, onClose, fetchItems}) => {

    const {loading, request, clearError} = useHttp()

    const auth = useContext(AuthContext)

    const deleteItem = async () => {
      try {
          await request("api/gallery/", "delete", {id}, {
              Authorization: `Bearer ${auth.token}`
          })
          toast.success("Item deleted", {
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
  }

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

        onSubmit={ async (values) => {

            const data = {
              id,
              imageAsString: values.imageAsString,
              title: values.title,
              description: values.description,
              price: values.price,
            }

            try {
                await request("api/gallery", "put", data, {
                  Authorization: `Bearer ${auth.token}`
                })
                toast.success("Item updated", {
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
                toast.error("Error processing your request", {
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

              <button disabled={loading ? true : false} className="action-btn" type="submit">Update</button>
              <button disabled={loading ? true : false} className="action-btn reset" type="reset">Reset</button>
              <button disabled={loading ? true : false} onClick={deleteItem} className="action-btn delete" type="button">Delete</button>
            </Form>
          </>
        )}
      </Formik>
    )
}
 
export default GalleryItemModalForm;