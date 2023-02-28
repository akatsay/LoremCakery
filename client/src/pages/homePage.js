import React, {useState} from "react";
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'

import videoHead from "../images/head-video.mp4"

import { ContactModal } from "../components/contactModal/contactModal";

export const HomePage = () => {

    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)

    const handleOpen = () => {
        setOpenModal(!openModal)
    }

    return (
        <>
            <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
            >
                <div className="page-container">
                    <div className="video-head-wrapper">
                        <video src={videoHead} className="video-head" autoPlay loop muted playsInline />
                        <div className="video-head-content">
                            <h2>We are Lorem Cakery</h2>
                            <button onClick={() => navigate("/about")} className="action-btn">Tell me more</button>
                        </div>
                    </div>
                    <div className="home-content">
                        <img className="home-pic" alt="Cake" src={require("../images/home-1.jpg")} />
                        <div className="home-text-content">
                            <p className="description">
                            <span className="title">Lorem Cakery </span>
                            is a non-existent boutique bakery for stunning and delicious cakes of all kinds.
                            </p>
                            <p className="notion"> * don't try to find us, we don't exist :{"("}</p>
                            <hr />
                            <button className="link-btn" onClick={() => navigate("/gallery")}>
                            Browse gallery
                            </button>
                            <span> to see our unreal cakes</span>
                            <hr />
                            <button className="link-btn" onClick={() => navigate("/gallery")}>
                            check out reviews
                            </button>
                            <span> to see what our customers think</span>
                            <hr />
                            <button onClick={handleOpen} className="action-btn">Contact us</button>
                        </div>
                    </div>
                </div>
            </motion.div>
            <ContactModal open={openModal} onClose={handleOpen} />
        </>
    )
}