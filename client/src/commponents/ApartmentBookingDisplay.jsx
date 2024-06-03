import React from "react";
import { fetchApartmentById } from "../api";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  img: {
    height: "100%",
    width: "40%",
    borderRadius: "20px",
    boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  ApartmentBookingDisplay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "5%",
    height: "20vh",
    paddingBottom: "5%",
    borderBottom: `1px solid ${colors.myGray}`,
  },
});
const ApartmentBookingDisplay = ({ apartmentId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => fetchApartmentById(apartmentId),
  });
  return (
    <div {...stylex.props(styles.ApartmentBookingDisplay)}>
      <img {...stylex.props(styles.img)} src={data.imgs.mainImg} alt="" />
      <section {...stylex.props(styles.data)}>
        <div>
          {data.address}
          {data.city.cityName}
        </div>
        <div>
          {`${data.reviews.overall} `}
          <FaStar />
          {` (${data.reviews.numOfReview} reviews)`}
        </div>
      </section>
    </div>
  );
};

export default ApartmentBookingDisplay;
