import React, { useState, useEffect } from 'react';

const ImagePreview = ({ file, setFieldValue }) => {

    const [previewSource, setPreviewSource] = useState("");

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFieldValue("imageAsString", reader.result )
        };
    }, [file])

    return ( 
        <>
            {previewSource 
                ?
                <img
                    src={previewSource}
                    alt="preview"
                    style={{ height: '300px', width: "300px" }}
                    className='preview-image'
                />
                :
                <p>loading...</p>
            }
        </>
     );
}
 
export default ImagePreview;