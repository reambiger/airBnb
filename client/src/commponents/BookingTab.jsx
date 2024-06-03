import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

import DatesBooking from "./DatesBooking";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeCalender,
  selectApartmentDates,
} from "../redux/slices/apartmentDatesSlice";
import { differenceInCalendarDays } from "date-fns";
import BookingBillingZone from "./BookingBillingZone";
import GustsBooking from "./GustsBooking";
import { useNavigate, useParams } from "react-router-dom";
import { selectBooking, setPrice } from "../redux/slices/bookingSlice";
import { setError } from "../redux/slices/midScreenSlice";

const styles = stylex.create({
  invisibleCont: {
    border: 0,
    backgroundColor: "inherit",
    height: "80vh",
    marginBottom: "-350px",
    marginTop: "-15vh",
    top: "20vh",
    position: "sticky",
    width: "25vw",
    zIndex: 1,
    left: "70vw",
    paddingBottom: "25vh",
  },
  BookingTab: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    minHeight: "65vh",
    maxHeight: "80vh",
    width: "100%",
    border: `2px solid ${colors.myGray}`,
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    backgroundColor:"white"
  },
  priceCont: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "flex-end",
    justifyContent: "center",

    width: "100%",
    paddingTop: "5%",
  },
  price: {
    fontSize: "x-large",
    paddingRight: "2%",
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
const BookingTab = ({ price, renting, beds }) => {
  const dispatch = useDispatch();
  const { checkIn, checkOut } = useSelector(selectApartmentDates);
  const { pricing, gusts } = useSelector(selectBooking);
  const navigate = useNavigate();
  const params = useParams();
  const updateBookingData = () => {
    if (checkIn && checkOut && gusts > 0) {
      const bookingObj = {
        checkIn,
        checkOut,
        gusts,
        apartmentId: params.id,
        pricing,
      };

      sessionStorage.setItem("booking", JSON.stringify(bookingObj));
      navigate(`../bookingPage/${params.id}`);
    } else {
      dispatch(
        setError(
          "you must fill your wanted dates and gusts number to book this apartment"
        )
      );
    }
  };
  useEffect(() => {
    dispatch(
      initializeCalender({
        available: renting.available,
        occupied: renting.occupied,
      })
    );
  }, []);
  return (
    <div {...stylex.props(styles.invisibleCont)}>
      <div {...stylex.props(styles.BookingTab)}>
        <div {...stylex.props(styles.priceCont)}>
          <span {...stylex.props(styles.price)}>$ {price}</span>
          <span {...stylex.props(styles.night)}>night</span>
        </div>
        <div {...stylex.props(styles.dateBox)}>
          <DatesBooking />
          <GustsBooking beds={beds} />
        </div>
        <div
          onClick={() => updateBookingData()}
          {...stylex.props(styles.button)}
        >
          {checkIn && checkOut ? "Reserve" : "Check Availability"}
        </div>
        {checkIn && checkOut && (
          <BookingBillingZone
            price={price}
            numDays={differenceInCalendarDays(checkOut, checkIn)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingTab;
