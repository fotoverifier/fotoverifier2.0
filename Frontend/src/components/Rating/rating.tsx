import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./rating.module.css";

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={styles.starButton}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          <FaStar
            color={(hover || rating) >= star ? "#ffc107" : "#e4e5e9"}
            size={35}
          />
        </div>
      ))}
    </div>
  );
};

export default Rating;
