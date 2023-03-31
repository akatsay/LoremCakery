import React, {useState, useEffect, useCallback, useContext} from 'react';
import { AuthContext } from '../../context/authContext'
import {motion} from "framer-motion"
import { useHttp } from "../../hooks/httpHook"

import GalleryItem from "./galleryItem";
import CreateArea from './createArea'

export const GalleryPage = () => {

    const {loading, request} = useHttp()

    const [items, setItems] = useState("")

    const fetchItems = useCallback( async () => {
        try {
            const fetchedItems = await request("api/gallery", "get")
            setItems(fetchedItems)
        } catch (e) {
            console.log(e.message)
        }
    })

    useEffect(() => {
        fetchItems()
    }, [])

    const {isAdmin} = useContext(AuthContext)

    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            <div className="page-container">
                {isAdmin && <CreateArea fetchItems={fetchItems} />}
                <div className="gallery-items-container">
                    { items && items.map((item) => 
                        <GalleryItem 
                            key={item._id}
                            imageSrc={item.imageAsString}
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