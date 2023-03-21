import React, { useState, useRef, useEffect } from "react";
import { useHttp } from "../../hooks/httpHook";
import { toast, Slide } from "react-toastify"

import { StarRating } from "./starRating";

export const ReviewCreateArea = ({  onCreateReviewUpdateList  }) => {

  const {loading, request, clearError} = useHttp()

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const errorRef = useRef(null)

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    errorRef.current.style.display = "none"
  }, [rating])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      errorRef.current.style.display = "block"
      return;
    }

    try {
        const data = await request("/api/review", "post", { rating, name, comment})
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
        setRating(0)
        setName("")
        setComment("")
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
          <StarRating value={rating} onValueChange={handleRatingChange} />
          <div ref={errorRef} className="error">* Required</div>
          <label className="input-label" htmlFor="name">Your name:</label>
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
            required
          />

          <label className="input-label" htmlFor="comment">Leave a comment:</label>
          <textarea
            className="input textarea"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyUp={expandTextAreaWhenTyping}
            required
          />

        <button disabled={ loading ? true : false} className="action-btn" type="submit">Submit Review</button>
      </form>
    </div>
  );
}