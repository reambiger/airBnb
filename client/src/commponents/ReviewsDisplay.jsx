import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import ReviewBox from "./ReviewBox";
const styles = stylex.create({
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    width:"70%",
    rowGap: "10%",
    // columnGap:"0"
  },
});
const ReviewsDisplay = ({ reviews }) => {
  return (
    <div {...stylex.props(styles.reviewsGrid)}>
      {reviews.map((review, i) => (
        <ReviewBox key={i} review={review} />
      ))}
    </div>
  );
};

export default ReviewsDisplay;
