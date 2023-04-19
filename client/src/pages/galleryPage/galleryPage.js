import React, {useState, useEffect, useCallback, useContext} from 'react';
import { AuthContext } from '../../context/authContext'
import {motion} from "framer-motion"
import { useHttp } from "../../hooks/httpHook"

import GalleryItem from "./galleryItem";
import CreateAreaModal from './createAreaModal'
import { SmallLoader } from '../../components/loaders/smallLoader';

export const GalleryPage = () => {

    const {loading, request} = useHttp()

    const [items, setItems] = useState([])
    const [sortState, setSortState] = useState("none");
    const [openCreateAreaModal, setOpenCreateAreaModal] = useState(false)

    const sortMethods = {
        none: { method: (a, b) => new Date(a.date) - new Date(b.date) },
        ascending: { method: (a, b) => a.price - b.price },
        descending: { method: (a, b) => b.price - a.price },
      };

    const handleSetSortMethod = (method) => {
        setSortState(method)
    }

    const fetchItems = useCallback( async () => {
        try {
            const fetchedItems = await request("api/gallery", "get")
            setItems(fetchedItems)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

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
                    <>
                        <div className='sort-settings'>
                            <i className="fa fa-solid fa-clock-rotate-left" onClick={() => handleSetSortMethod("none")}> reset</i>
                            <i className="fa fa-sharp fa-solid fa-arrow-up-short-wide" onClick={() => handleSetSortMethod("ascending")}> price-up</i>
                            <i className="fa fa-sharp fa-solid fa-arrow-down-short-wide" onClick={() => handleSetSortMethod("descending")}> price-down</i>  
                        </div>
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
                            {items && items.sort(sortMethods[sortState].method).map((item) => 
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
                    </>
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