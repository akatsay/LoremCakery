import React, {useState, useEffect, useCallback, useContext} from 'react';
import { AuthContext } from '../../context/authContext'
import {motion} from "framer-motion"
import { useHttp } from "../../hooks/httpHook"

import GalleryItem from "./galleryItem";
import CreateAreaModal from './createAreaModal'
import { SmallLoader } from '../../components/loaders/smallLoader';

export const GalleryPage = () => {

    const {loading, request} = useHttp()

    const [items, setItems] = useState("")
    const [openCreateAreaModal, setOpenCreateAreaModal] = useState(false)


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
        <>
            <motion.div
                initial = {{x: "-100%", height: 0}}
                animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
                exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
            >
                <div className="page-container">
                    {loading ? <SmallLoader /> :
                    <div className="gallery-items-container">
                        {isAdmin && 
                        <div
                        className="create-area-trigger"
                        onClick={() => setOpenCreateAreaModal(true)}
                        >
                            <div className='plus-sign'>+</div>
                            <p>Add Item</p>
                        </div>    
                        }
                        {items && items.map((item) => 
                            <GalleryItem 
                                key={item._id}
                                id={item._id}
                                imageSrc={item.url}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                fetchItems={fetchItems}
                            />
                        )}
                    </div>
                    }   
                </div>
            </motion.div>
            <CreateAreaModal 
            open={openCreateAreaModal} 
            onClose={() => setOpenCreateAreaModal(false)} 
            fetchItems={fetchItems}
            />
        </>
    )
}