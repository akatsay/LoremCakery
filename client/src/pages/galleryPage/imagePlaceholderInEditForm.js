import React from 'react';

const ImagePlaceholderInEditForm = ({imagePlaceholder}) => {
    return ( 
        <>
            <img
                src={imagePlaceholder}
                alt="preview"
                style={{ height: '300px', width: "300px" }}
                className='preview-image'
            />
    </>
    );
}
 
export default ImagePlaceholderInEditForm;