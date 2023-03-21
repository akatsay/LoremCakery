import React, { useState, useEffect, useCallback} from "react";
import {motion} from "framer-motion"
import { useHttp } from "../../hooks/httpHook";

import { ReviewsList } from "./reviewsList";
import { ReviewCreateArea } from "./reviewCreateArea";

export const ReviewsPage = () => {

    const [reviews, setReviews] = useState([])

    const { request } = useHttp()

    const fetchReviews = useCallback( async () => {
        try {
            const data = await request("/api/review", "get")
            setReviews(prev => {
                let newData = [...prev]
                newData = data
                return newData
            })
        } catch(e) {

        }
    }, [request])

    useEffect(() => {
        fetchReviews()
    }, [fetchReviews])

    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            <div className="page-container">
                <h2 className="page-title">Our reviews</h2>
                <ReviewCreateArea onCreateReviewUpdateList={fetchReviews} />
                <ReviewsList reviews={reviews} />
            </div>
        </motion.div>
    )
}