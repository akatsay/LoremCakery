import React from "react"
import {AnimatePresence, motion} from "framer-motion"

import { StarRatingStatic } from "./starRatingStatic";

export const Review = ({ rating, name, comment, date}) => {
    return (
        <>
            <AnimatePresence>
                <motion.div 
                className="review-container"
                initial = {{opacity: 0}}
                animate = {{opacity: 1, transition: {duration: 0.3, delay: 0.3}}}
                exit = {{opacity: 0,transition: {duration: 0.3}}}
                >
                    <div className="review-header">
                        <StarRatingStatic value={rating} />
                        <h3>{name}</h3>
                    </div>
                        <p className="comment">{comment}</p>
                        <p className="date">{date}</p>
                </motion.div>
            </AnimatePresence>
        </>
    )
}