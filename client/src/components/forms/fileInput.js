import React from 'react';
import { ErrorMessage, useField } from 'formik';
import ImagePreview from '../../pages/galleryPage/imagePreview';

export const FileInput = ({label, values, setFieldValue, ...props }) => {
    const [field, meta] = useField(props);

    const handleFileInputChange = (e) => {
      setFieldValue("image", e.target.files[0])
    };

    return (
      <>
        <label className="input-label" htmlFor={field.name}>{label}</label>
        <input
          className={`input ${meta.touched && meta.error && 'invalid'}`}
          onChange={handleFileInputChange}
          value={values.file}
          type="file"
          {...props}
        />
        {values.image && <ImagePreview file={values.image} setFieldValue={setFieldValue} />}
        <ErrorMessage component="div" name={field.name} className="error" />
      </>
    )
  }







  



// import React, { useState } from 'react';

// export const FileInput = ({label, ...props }) => {

//     const [fileInputState, setFileInputState] = useState('');
//     const [previewSource, setPreviewSource] = useState('');

//     const handleFileInputChange = (e) => {
//         const file = e.target.files[0];
//         previewFile(file);
//         setFileInputState(e.target.value);
//         console.log(typeof fileInputState)
//         console.log(typeof previewSource)
//     };

//     const previewFile = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setPreviewSource(reader.result);
//         };
//     };

//     return (
//       <>
//         <label className="input-label">{label}</label>
//         <input
//           className={"input"}
//           onChange={handleFileInputChange}
//           value={fileInputState}
//           {...props}
//         />
//         {previewSource && (
//             <img
//                 src={previewSource}
//                 alt="chosen"
//                 style={{ height: '300px' }}
//             />
//         )}
//       </>
//     )
//   }