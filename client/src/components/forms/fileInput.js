import React, {useState, useRef} from 'react';
import { ErrorMessage, useField } from 'formik';
import ImagePreview from '../../pages/galleryPage/imagePreview';
import ImagePlaceholderInEditForm from '../../pages/galleryPage/imagePlaceholderInEditForm';

export const FileInput = ({label, values, setFieldValue, imagePlaceholder, ...props }) => {
    const [field, meta] = useField(props);
    const [filesDraggedIn, setFilesDraggedIn] = useState(false)
    const fileInputLabelRef = useRef(null)
    const dragTipRef = useRef(null)

    const handleFileInputChange = (e) => {
      setFieldValue("image", e.target.files[0])
    };

    const handleFileDragEnter = () => {
      setFilesDraggedIn(true)
      fileInputLabelRef.current.style.backgroundColor = "grey"
      dragTipRef.current.style.color = "white"
    }

    const handleFileDragLeave = () => {
      setFilesDraggedIn(false)
      fileInputLabelRef.current.style.backgroundColor = ""
      dragTipRef.current.style.color = ""
    }

    return (
      <>
        <label className="input-label">{label}</label>
        <label 
        className={`file-input-label ${meta.touched && meta.error && 'invalid'}`}
        htmlFor={field.name}
        ref={fileInputLabelRef}
        >
          <h3 ref={dragTipRef} className='drag-tip'>{filesDraggedIn ? "Drop file here" : "Drag file here"}</h3>
          <input
            className={`input file-input ${meta.touched && meta.error && 'invalid'}`}
            onChange={handleFileInputChange}
            value={values.file}
            type="file"
            id={field.name}
            onDragEnter={handleFileDragEnter}
            onDragLeave={handleFileDragLeave}
            onDrop={handleFileDragLeave}
            {...props}
          >
          
          </input>
          {(values.image) && 
            <ImagePreview file={values.image} setFieldValue={setFieldValue} />
          }
          {(!values.image && imagePlaceholder) && 
            <ImagePlaceholderInEditForm imagePlaceholder={imagePlaceholder} />}
        </label>

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