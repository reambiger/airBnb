import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { format } from "date-fns";
import StarRating from "../ui/StarRating";
import { faker } from "@faker-js/faker";

const styles = stylex.create({
  reviewsBox: {
    minHeight: "150px",
    width: "400px",
    // border: `1px solid ${colors.myGray}`,
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "0 auto",
  },
  reviewScore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "1%",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    paddingRight: "5%",
    height: "60px",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  text: {
    // overflow: "hidden",
  },
});
const ReviewBox = ({ review }) => {
  return (
    <div {...stylex.props(styles.reviewsBox)}>
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.user)}>
          <img
            {...stylex.props(styles.avatar)}
            src={faker.image.avatarLegacy()}
          />
          <span>{review.user.fullName}</span>
        </div>
        <div>{format(review.recommendationDate, "MM/dd/yyyy")}</div>
      </div>
      <div {...stylex.props(styles.reviewScore)}>
        <span>{review.overAllStars.toFixed(1)}</span>
        <StarRating value={review.overAllStars} />
      </div>
      <p {...stylex.props(styles.text)}>{review.text}</p>
    </div>
  );
};

export default ReviewBox;
