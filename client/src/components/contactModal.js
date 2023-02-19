import React from "react";
import {AnimatePresence, motion} from "framer-motion"

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

                    </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}