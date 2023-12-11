import React from "react";
import {useCart} from "../../context/CartProvider";

export const CartItem = ({item, quantity}) => {

    const { removeFromCart, addToCartExistingItem, removeFromCartExistingItem } = useCart()

    return (
        <div
            style={{
                minWidth: "250px",
                maxWidth: "250px",
                display:"flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <div style={{width: "100%"}}>
                <p>{item.title}</p>
                <p>${item.price * quantity}</p>
                <div style={{ backgroundColor:"black", width: "100%", margin: "auto", display: "flex", flexDirection: "row", justifyContent:"center", alignItems: "center"}}>
                <button
                    onClick={() => addToCartExistingItem(item._id)}
                    style={{color: "white", cursor: "pointer" , fontSize: "3rem"}}
                >+
                </button>
                    <p>{quantity}</p>
                <button
                    onClick={() => {
                        if (quantity > 1) {
                            removeFromCartExistingItem(item._id)
                        } else {
                            removeFromCart(item._id)
                        }
                    }
                }
                    style={{color: "white", cursor: "pointer" , fontSize: "3rem"}}
                >
                    -
                </button>
                </div>
            </div>
            <img
                alt="" src={item.url}
                width={100} height={100}
                style={{minWidth: "100px"}}
            />
        </div>
    )
}