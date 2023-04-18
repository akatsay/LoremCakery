import React from 'react';
import CreateAreaForm from './createAreaForm';

const createAreaModal = ({open, onClose, fetchItems}) => {
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

                        <CreateAreaForm onClose={onClose} fetchItems={fetchItems}/>

                    </div>
            </div>
        }
    </>
     );
}
 
export default createAreaModal;