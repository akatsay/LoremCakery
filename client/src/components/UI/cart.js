import React, {useRef, useContext, useCallback, useEffect, useState} from "react";

import { useNavigate } from 'react-router-dom'
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import {useCart} from "../../context/CartProvider";
import {useHttp} from "../../hooks/httpHook";
import {SmallLoader} from "../loaders/smallLoader";

export const Cart = () => {

    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);
    const {cart} = useCart()
    const {loading, request} = useHttp()

    const fetchItems = useCallback( async () => {
        try {
            const fetchedItems = await request("api/gallery/getMany", "post", cart)
            setItems(fetchedItems)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])

    useEffect(() => {
        if (open) {
            fetchItems()
        }
    }, [fetchItems, cart, open])

    const handleOpen = () => setOpen(!open)

    return(
                <div className={`dropdown`} ref={dropdownRef} style={{marginRight: "50px"}}>
                    <button
                        style={{cursor: "pointer"}}
                        className={`dropdown-trigger ${open ? "active" : ""}`}
                        onClick={handleOpen}
                    >
                        <i
                            style={{
                                position: "absolute",
                                left: "10px",
                                bottom: "10px",
                                fontSize: "2rem",
                                color: "white",
                            }}
                            className="fa fa-shopping-cart"
                        />
                    </button>

                    {
                        loading &&
                        <SmallLoader />
                    }

                    <ul className={`dropdown-menu ${open ? "show" : "hide"}`}>
                        {/*{*/}
                        {/*    items.map((i) =>*/}
                        {/*        <p key={i.id}>{i}</p>*/}
                        {/*    )*/}
                        {/*}*/}
                    </ul>
                </div>
    )
}
