import React from "react";
import {motion} from "framer-motion"

import { ReviewsList } from "../components/reviewsPage/reviewsList";
import { ReviewCreateArea } from "../components/reviewsPage/reviewCreateArea";

export const ReviewsPage = () => {
    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            <div className="page-container">
                <h2 className="page-title">Our reviews</h2>
                    <div className="create-area-container">
                        <ReviewCreateArea />
                    </div>
                <div className="reviews-list-container">
                    <ReviewsList />
                </div>
            </div>
        </motion.div>
    )
}