import React from 'react';
import { toast, Slide } from "react-toastify"
import { Formik, Form } from 'formik'
import { useHttp } from "../../hooks/httpHook"


import { contactFormsSchema } from '../../Validations/contactFormValidation'

import { Input } from '../forms/input'
import { TextArea } from '../forms/textArea'

export const ContactForm = ({onClose}) => {

    const {loading, request, clearError} = useHttp()

    return (
      <Formik
        initialValues={{
          firstName: '',
          mobile: '',
          email: '',
          message: '',
        }}
        validationSchema={contactFormsSchema}
        onSubmit={ async (values) => {
            try {
                await request("api/contact", "post", {...values})
                onClose()
                toast.success("Contact request sent", {
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
                    });

                clearError()
                
            } catch (e) {
                toast.error(e.message, {
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
                  });
                console.log(e.message)
            }
        }}
      >
        {formik => (
          <>
            <Form className="contact-form">
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Mobile" name="mobile" type="tel" />
              <Input label="Email" name="email" type="email" />
              <TextArea rows={5} label="Message" name="message" type="text"></TextArea>

              <button disabled={loading ? true : false} className="action-btn" type="submit">Send</button>
              <button disabled={loading ? true : false} className="action-btn reset" type="reset">Reset</button>
              
            </Form>
          </>
        )}
      </Formik>
    )
  }