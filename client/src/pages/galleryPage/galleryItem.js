import React from 'react';
import {motion} from "framer-motion"

const GalleryItem = ({imageSrc, title, description, price}) => {
    return ( 
        <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div 
        className="gallery-item"
        >
            <img className='gallery-item-img' src={imageSrc} alt="item"></img>
            <div className='gallery-item-info'>
                <h2 className="title">{title}</h2>
                <p className="content">{description}</p>
                <i className='price'>{"$" + price}</i>
            </div>
        </div>
        </motion.div>
    </>
     );
}
 
export default GalleryItem;