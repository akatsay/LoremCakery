import React from 'react';
import { Formik, Form } from 'formik';

import { contactFormsSchema } from '../Validations/contactFormValidation';

import { Input } from './input';
import { TextArea } from './textArea';

export const ContactForm = () => {

    return (
      <Formik
        initialValues={{
          firstName: '',
          mobile: '',
          email: '',
          message: '',
        }}
        validationSchema={contactFormsSchema}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {formik => (
          <>
            <Form className="contact-form">
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Mobile" name="mobile" type="tel" />
              <Input label="Email" name="email" type="email" />
              <TextArea rows={5} label="Message" name="message" type="text"></TextArea>

              <button className="action-btn" type="submit">Send</button>
              <button className="action-btn reset" type="reset">Reset</button>
              
            </Form>
          </>
        )}
      </Formik>
    )
  }