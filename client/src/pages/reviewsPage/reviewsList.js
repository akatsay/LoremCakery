import React, { useState } from "react";

import { Review } from "./review";

export const ReviewsList = ({reviews}) => {

    const [firstReviewIndex, setFirstReviewIndex] = useState(0)
    const amountOfReviewsOnPage = 5

    const currentReviews = reviews.slice(firstReviewIndex, firstReviewIndex + amountOfReviewsOnPage)

    const handleShowPrevious = () => {
        if (firstReviewIndex <= 0) {
            return
        } else {
            setFirstReviewIndex(firstReviewIndex - amountOfReviewsOnPage)
        }
    }

    const handleShowMore = () => {
        if (firstReviewIndex >= (reviews.length - amountOfReviewsOnPage)) {
            return
        } else {
            setFirstReviewIndex(firstReviewIndex + amountOfReviewsOnPage)
        }
    }

    return (
        <>
            <div className="reviews-list-container">
                {currentReviews.map((reviewItem, i) => 
                        <Review
                            key={reviewItem._id}
                            id = {reviewItem._id}
                            rating = {reviewItem.rating}
                            name = {reviewItem.name}
                            comment = {reviewItem.comment}
                            date = {reviewItem.date}
                        />
                )}
                <div className="link-buttons-wrapper">
                    <button
                    className={(firstReviewIndex <= 0) ? "hidden" : ""}
                    onClick={handleShowPrevious}
                    >
                    {"<-"} Show previous
                    </button>
                    <button 
                    className={(firstReviewIndex >= (reviews.length - amountOfReviewsOnPage)) ? "hidden" : ""}
                    onClick={handleShowMore}
                    >
                    Show more{"->"}
                    </button>
                </div>
            </div>
        </>
    )
}