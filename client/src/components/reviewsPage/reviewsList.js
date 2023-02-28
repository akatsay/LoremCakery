import React, {useCallback, useEffect, useState} from "react";
import { useHttp } from "../../hooks/httpHook";

import { Review } from "./review";

export const ReviewsList = () => {

    const [reviews, setReviews] = useState([])

    const {loading, request, error, clearError} = useHttp()

    const fetchReviews = useCallback( async () => {
        try {
            const data = await request("/api/review/review", "get")
            setReviews(data)
        } catch(e) {

        }
    })

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <>
            {reviews.map((reviewItem, i) => 
                <Review
                    key={reviewItem._id}
                    id = {reviewItem._id}
                    rating = {reviewItem.rating}
                    name = {reviewItem.name}
                    comment = {reviewItem.comment}
                />
            )}
        </>
    )
}