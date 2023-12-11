import React, {useRef, useContext, useCallback, useEffect, useState} from "react";

import { useNavigate } from 'react-router-dom'
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import {useCart} from "../../context/CartProvider";
import {useHttp} from "../../hooks/httpHook";
import {SmallLoader} from "../loaders/smallLoader";
import {CartItem} from "./CartItem";
import {Slide, toast} from "react-toastify";

export const Cart = () => {

    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);
    const {cart} = useCart()
    const { clearCart } = useCart()
    const {loading, request} = useHttp()

    const fetchItems = useCallback( async () => {
        try {
            const mappedIds = cart.map((item) => item.productId)
            const fetchedItems = await request("api/gallery/getMany", "post", mappedIds)
            setItems(fetchedItems)
        } catch (e) {
            console.log(e.message)
        }
    }, [request, cart])

    useEffect(() => {
        if (open) {
            fetchItems()
        }
    }, [open, cart])

    const calculateTotal = () => {
        if (items.length) {
            return items.reduce((acc, item, currentIndex) => {
                return acc + item.price * (cart[currentIndex]?.quantity || 0);
            }, 0);
        }

        return 0; // Return 0 if items.length is 0
    };

    const handlePurchase = () => {
        if (cart.length) {
            setOpen(false)
            clearCart()
            toast.success("Purchase complete, cakes are on the way!", {
                style: {backgroundColor: "#555", color: "white"},
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }

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
                                cursor: "pointer",
                                position: "absolute",
                                left: "10px",
                                bottom: "10px",
                                fontSize: "2rem",
                                color: "white",
                            }}
                            className="fa fa-shopping-cart"
                        />
                    </button>

                    <ul
                        className={`dropdown-menu`}
                        style={{
                            minWidth: "250px", minHeight: "150px",  maxHeight: "500px",
                            right: "-500px",
                            transform: open && 'translateX(-405px)',
                            overflowY: "scroll"
                    }}
                    >
                        {
                            loading &&
                            <SmallLoader />
                        }
                        {
                            items.map((i, index) =>
                                <CartItem key={i._id} item={i} quantity={cart[index]?.quantity} />
                            )
                        }
                        <p style={{marginTop: "20px"}}>Total: ${calculateTotal()}</p>
                        <button onClick={handlePurchase} className="action-btn">purchase</button>
                    </ul>
                </div>
    )
}
