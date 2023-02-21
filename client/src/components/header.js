import React, {useRef, useContext} from "react";

import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/authContext";
import { useNavigate } from 'react-router-dom'
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";

export const Header = () => {

    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const dropdownRef = useRef(null)
    
    const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);

    const handleOpen = () => setOpen(!open)

    const logoutHandler = () => {
        auth.logout()
        toast.warning("Mere mortal mode on", {
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
            })
      }

    return(
        <header className="header">
            <div className="brand-title">
            <h1>Lorem Cakery</h1>
            <i className="fa-solid fa-cake-candles"></i>
            </div>
            <nav className="navbar">
                <div className={`dropdown`} ref={dropdownRef}>
                    <button className={`dropdown-trigger ${open ? "active" : ""}`} onClick={handleOpen}>
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-3"></span>
                    </button>
                    
                    <ul className={`dropdown-menu ${open ? "show" : "hide"}`}>
                        <li 
                        className="menu-item" 
                        onClick={() => {
                        navigate("/home")
                        handleOpen()
                        }}
                        >
                        Home
                        </li>

                        <li 
                        className="menu-item" 
                        onClick={() => {
                        navigate("/about")
                        handleOpen()
                        }}
                        >
                        About
                        </li>

                        <li 
                        className="menu-item" 
                        onClick={() => {
                        navigate("/contact")
                        handleOpen()
                        }}
                        >
                        Contact
                        </li>

                        <li 
                        className="menu-item" 
                        onClick={() => {
                        navigate("/gallery")
                        handleOpen()
                        }}
                        >
                        Gallery
                        </li>

                        <li 
                        className="menu-item" 
                        onClick={() => {
                        navigate("/reviews")
                        handleOpen()
                        }}
                        >
                        Reviews
                        </li>

                        {
                            auth.isAdmin 

                            ?

                            <div className="admin-nav-items-wrapper">
                                <li 
                                className="menu-item admin-menu-item" 
                                onClick={() => {
                                navigate("/adminPanel")
                                handleOpen()
                                }}
                                >
                                Admin Panel
                                </li>

                                <li 
                                className="menu-item admin-menu-item" 
                                onClick={() => {
                                navigate("/adminGallery")
                                handleOpen()
                                }}
                                >
                                Gallery Editor
                                </li>

                                <li 
                                className="menu-item admin-menu-item" 
                                onClick={() => {
                                navigate("/home")
                                handleOpen()
                                logoutHandler()
                                }}
                                >
                                Log Out
                                </li>
                            </div>

                            :

                            null
                        }

                    </ul>
                </div>
            </nav>
        </header>
    )
}