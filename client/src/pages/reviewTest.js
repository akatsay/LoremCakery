import React, { useState } from "react";

function CreateReview() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5.");
      return;
    }
    // code to submit review data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <StarRating value={rating} onValueChange={handleRatingChange} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

function StarRating({ value, onValueChange }) {
  const [hoveredValue, setHoveredValue] = useState(0);

  const handleMouseEnter = (newValue) => {
    setHoveredValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoveredValue(0);
  };

  const handleClick = (newValue) => {
    onValueChange(newValue);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starClass = "star";
    if (i <= (hoveredValue || value)) {
      starClass += " filled";
    }
    stars.push(
      <span
        key={i}
        className={starClass}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleClick(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
}

export default CreateReview;

// .star-rating {
//     font-size: 24px;
//     line-height: 1;
//     display: inline-block;
//   }
  
//   .star {
//     display: inline-block;
//     color: #ccc;
//     cursor: pointer;
//     transition: color 0.2s ease-in-out;
//   }
  
//   .star.filled {
//     color: yellow;
//   }