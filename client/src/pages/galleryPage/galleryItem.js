import React, {useState, useContext} from 'react';
import { AuthContext } from '../../context/authContext'
import {motion} from "framer-motion"
import GalleryItemModal from './galleryItemModal';

const GalleryItem = ({id, imageSrc, title, description, price, fetchItems}) => {

    const [openModal, setOpenModal] = useState(false)

    const {isAdmin} = useContext(AuthContext)

    return ( 
        <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div 
        className="gallery-item"
        onClick={() => isAdmin && setOpenModal(true)}
        >
            <img className='gallery-item-img' src={imageSrc} alt="item"></img>
            <div className='gallery-item-info'>
                <h2 className="title">{title}</h2>
                <p className="content">{description}</p>
                <i className='price'>{"$" + price}</i>
            </div>
        </div>
        </motion.div>
        <GalleryItemModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            id={id}
            imageSrc={imageSrc}
            title={title}
            description={description}
            price={price}
            fetchItems={fetchItems}
        />
    </>
     );
}
 
export default GalleryItem;