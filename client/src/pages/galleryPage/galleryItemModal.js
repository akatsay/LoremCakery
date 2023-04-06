import React from 'react';
import GalleryItemModalForm from './galleryItemModalForm';

export const GalleryItemModal = ({id, imageSrc, title, description, price, open, onClose, fetchItems}) => {
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
                    className="gallery-modal-container"
                    >
                        <h2 className="title">Edit Item</h2>

                        <GalleryItemModalForm
                            id={id}
                            imageSrc={imageSrc}
                            title={title}
                            description={description}
                            price={price}
                            onClose={onClose}
                            fetchItems={fetchItems}
                        />

                    </div>
            </div>
        }
    </>
    );
}
 
export default GalleryItemModal;