import React, { useState } from "react";

export const StarRating = ({ value, onValueChange }) => {

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