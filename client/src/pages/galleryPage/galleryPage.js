import React, {useContext} from 'react';
import { AuthContext } from '../../context/authContext'
import {motion} from "framer-motion"

import GalleryItem from "./galleryItem";
import CreateArea from './galleryCreateItem';

import { items } from "./galleryItemsTest";

export const GalleryPage = () => {

    const {isAdmin} = useContext(AuthContext)

    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            {isAdmin && <CreateArea />}
            <div className="page-container">
                <div className="gallery-items-container">
                    {items.map((item, i) => 
                        <GalleryItem 
                            key={i}
                            imageSrc={item.imageSrc}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    )
}