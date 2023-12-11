import React, { useState, useEffect, useContext, createContext } from 'react';
import {useAuth} from "../hooks/authHook";
import {AuthContext} from "./authContext";
import {AppLoader} from "../components/loaders/appLoader";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { ready, userName } = useContext(AuthContext)
    console.log(userName)

    useEffect(() => {
        const prevCart = JSON.parse(localStorage.getItem(`cart_null`)) || [];
        const storedCart = JSON.parse(localStorage.getItem(`cart_${userName}`)) || [];

        // If userName has changed (user logged in/out), transfer contents and clear previous cart
        if (userName !== null) {
            localStorage.removeItem(`cart_${null}`);
            setCart([...storedCart, ...prevCart]);
        } else {
            setCart(storedCart);
        }
    }, [userName]);
    // Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem(`cart_${userName}`, JSON.stringify(cart));
    }, [cart, userName]);

    const addToCart = (productId) => {
        setCart((prevCart) => {
            if (prevCart.length) {
                if (prevCart.find((item) => item.productId === productId)) {
                    return prevCart
                }
            }
            return [...prevCart, {productId, quantity: 1 }]
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            // Check if the product exists in the cart
            const existingItem = prevCart.find((item) => item.productId === productId);

            // If the product exists, remove it from the cart
            if (existingItem) {
                const updatedCart = prevCart.filter((item) => item.productId !== productId);
                return updatedCart;
            }

            // If the product doesn't exist, return the current cart
            return prevCart;
        });
    };

    const addToCartExistingItem = (productId) => {
        setCart((prevCart) => {
            // Check if the product already exists in the cart
            const existingItem = prevCart.find((item) => item.productId === productId);

            // If the product exists, update the quantity
            if (existingItem) {
                const updatedCart = prevCart.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return updatedCart;
            }

            // If the product doesn't exist, add it to the cart with quantity 1
            return [...prevCart, { productId, quantity: 1 }];
        });
    };

    const removeFromCartExistingItem = (productId) => {
        setCart((prevCart) => {
            // Check if the product already exists in the cart
            const existingItem = prevCart.find((item) => item.productId === productId);

            // If the product exists, update the quantity
            if (existingItem) {
                const updatedCart = prevCart.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                return updatedCart;
            }

            // If the product doesn't exist, add it to the cart with quantity 1
            return [...prevCart, { productId, quantity: 1 }];
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, addToCartExistingItem, removeFromCartExistingItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};