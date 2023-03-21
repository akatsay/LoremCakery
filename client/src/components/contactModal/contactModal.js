import React from "react";
import {AnimatePresence, motion} from "framer-motion"

import { ContactForm } from "./contactForm";

export const ContactModal = ({open, onClose}) => {

    return (
        <AnimatePresence>
        {open && (
            <motion.div
                onClick={ () => {
                    onClose()
                }} 
                className='overlay'            
                initial = {{opacity: 0}}
                animate = {{opacity: 1, transition: {duration: 0.3}}}
                exit = {{opacity: 0,transition: {duration: 0.3}}}
            >
                    <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='modal-container'
                    >
                        <h2 className="title">Email inquiry</h2>

                        <ContactForm onClose={onClose} />

                    </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}