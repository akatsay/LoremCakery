import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label className="input-label" htmlFor={field.name}>{label}</label>
        <textarea
          className={`input message ${meta.touched && meta.error && 'invalid'}`}
          {...field} {...props}
        />
        <ErrorMessage component="div" name={field.name} className="error" />
      </>
    )
  }