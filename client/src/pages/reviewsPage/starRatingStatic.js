import React from "react";

export const StarRatingStatic = ({ value }) => {
  
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = "star";
      if (i <= (value)) {
        starClass += " filled";
      }
      stars.push(
        <span
          key={i}
          className={starClass}
        >
          &#9733;
        </span>
      );
    }
  
    return <div className="star-rating">{stars}</div>;
  }