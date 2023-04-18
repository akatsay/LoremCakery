import React, { useState, useRef, useEffect } from "react";
import { useHttp } from "../../hooks/httpHook";
import { toast, Slide } from "react-toastify"

import { StarRating } from "./starRating";

export const ReviewCreateArea = ({  onCreateReviewUpdateList  }) => {

  const {loading, request, clearError} = useHttp()

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    name: "",
    comment: ""
  })

  const errorRef = useRef(null)

  const handleRatingChange = (newRating) => {
    setReviewForm({...reviewForm, rating: newRating})
  }

  const handleFormChange = (e) => {
    setReviewForm({...reviewForm, [e.target.name] : e.target.value})
  };

  useEffect(() => {
    errorRef.current.style.display = "none"
  }, [reviewForm.rating])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      errorRef.current.style.display = "block"
      return;
    }

    try {
        const data = await request("/api/review", "post", {...reviewForm})
        toast.success(data.message, {
            style: {backgroundColor: "#555", color: "white"},
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        onCreateReviewUpdateList()
        setReviewForm({
          rating: 0,
          name: "",
          comment: ""
        })
    } catch (e) {
        toast.error(e.message, {
            style: {backgroundColor: "#555", color: "white"},
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        console.log(e.message)
    }

    clearError()

  };

  const expandTextAreaWhenTyping = () => {
    const textarea = document.getElementById("comment")
    textarea.addEventListener("keyup", e => {
        let scHeight = e.target.scrollHeight
        textarea.style.height = `${scHeight}px`
    })
  }

  return (
    <div className="create-area-container">
      <form className="review-form" onSubmit={handleSubmit}>

          <label className="input-label" htmlFor="rating">Rate us:</label>
          <StarRating value={reviewForm.rating} onValueChange={handleRatingChange} />
          <div ref={errorRef} className="error">* Required</div>
          <label className="input-label" htmlFor="name">Your name:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={reviewForm.name}
            onChange={handleFormChange}
            autoComplete="off"
            required
          />

          <label className="input-label" htmlFor="comment">Leave a comment:</label>
          <textarea
            className="input textarea"
            id="comment"
            name="comment"
            value={reviewForm.comment}
            onChange={handleFormChange}
            onKeyUp={expandTextAreaWhenTyping}
            required
          />

        <button disabled={ loading ? true : false} className="action-btn" type="submit">Submit Review</button>
      </form>
    </div>
  );
}