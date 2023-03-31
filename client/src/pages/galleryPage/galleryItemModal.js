import React from 'react';
import GalleryItemModalForm from './galleryItemModalForm';

export const GalleryItemModal = ({imageSrc, title, description, price, open, onClose}) => {
    return ( 
    <>
        {open &&
            <div
                onClick={ () => {
                    onClose()
                }} 
                className='overlay'
            >
                    <div
                    onClick={(e) => {e.stopPropagation()}}
                    className='edit-modal-container'
                    >
                        <h2 className="title">Edit Item</h2>

                        <GalleryItemModalForm
                            imageSrc={imageSrc}
                            title={title}
                            description={description}
                            price={price}
                            onClose={onClose}
                        />

                    </div>
            </div>
        }
    </>
    );
}
 
export default GalleryItemModal;