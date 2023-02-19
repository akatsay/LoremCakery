import React from "react";
import {motion} from "framer-motion"

export const HomePage = () => {
    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            <div className="page-container">
                <h2>This is Home Page</h2>
            </div>
        </motion.div>
    )
}