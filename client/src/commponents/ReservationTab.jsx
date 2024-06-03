import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

import { useDispatch, useSelector } from "react-redux";
import {
  cleanCalender,
  initializeCalender,
  selectApartmentDates,
} from "../redux/slices/apartmentDatesSlice";
import { differenceInCalendarDays } from "date-fns";
import BookingBillingZone from "./BookingBillingZone";
import GustsBooking from "./GustsBooking";
import { useNavigate, useParams } from "react-router-dom";
import ApartmentData from "./ApartmentData";
import ApartmentBookingDisplay from "./ApartmentBookingDisplay";

const styles = stylex.create({
  header: {},
  ReservationTab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    position: "sticky",
    left: "65vw",
    width: "30vw",
    minHeight: "75vh",
    border: `2px solid ${colors.myGray}`,
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    top:"18vh"
  },
  priceCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    width: "40%",
  },
  price: {
    fontSize: "x-large",
  },
  night: {
    fontSize: "medium",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderBottom: `1px solid black`,
    height: "50%",
  },
  dateBox: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid black`,
    height: "15vh",
    margin: "7%",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  checkIn: {
    width: "50%",
    borderRight: `1px solid black`,
  },
  checkOut: {
    width: "50%",
  },
  button: {
    backgroundColor: `${colors.bold}`,
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    margin: "10%",
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
const ReservationTab = ({ bookingData }) => {
  const dispatch = useDispatch();
  const { checkIn, checkOut } = useSelector(selectApartmentDates);
  const navigate = useNavigate();

  return (
    <div {...stylex.props(styles.ReservationTab)}>
    <ApartmentBookingDisplay apartmentId={bookingData.apartmentId} />
      <BookingBillingZone
        price={bookingData.pricing.nightPrice}
        numDays={bookingData.pricing.numDays}
      />
    </div>
  );
};

export default ReservationTab;
