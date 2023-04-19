import React, {useState} from "react";
import {motion} from "framer-motion"

import { ContactModal } from "../components/contactModal/contactModal";

export const ContactPage = () => {

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
                    <h2 className="page-title">Contact us:</h2>
                    <div className="action-btn-container">
                        <a href="tel:228-148-8888">
                            <button className="action-btn call">Call us</button>
                        </a>
                        <button 
                        onClick={handleOpen} 
                        className="action-btn form"
                        >
                        Call me back
                        </button>
                    </div>
                    <div className="contact-info-wrapper">
                        <div className="address-time-info">
                            <h3>Our address:</h3>
                            <p className="address-line">229 East 5th Lorem Ipsum avenue, NY, 11111</p>
                            <h3>Hours of operation:</h3>
                            <p>Monday-Friday: 10:00 - 22:00</p>
                            <p>Monday-Friday: 10:00 - 20:00</p>
                            <p>Sunday: Closed</p>

                        </div>
                        <hr />
                        <iframe
                        className="map"
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2173.7959649744043!2d-73.99423419012491!3d40.58271523834142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245b77cea447b%3A0x6cf866f41971aada!2sConey%20Island%20Yellow%20Submarine!5e0!3m2!1sen!2sus!4v1676781156032!5m2!1sen!2sus" 
                        allowFullScreen="" 
                        loading="eager" 
                        referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </motion.div>
            <ContactModal open={openModal} onClose={handleOpen} />
        </>
    )
}