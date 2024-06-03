import React from "react";

import { FaWindowClose } from "react-icons/fa";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useState } from "react";
import BookingCalender from "./BookingDatesModel";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  cleanCalender,
  updateEndDate,
  selectApartmentDates,
} from "../redux/slices/apartmentDatesSlice";

const styles = stylex.create({
  dates: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `1px solid black`,
    height: "50px",
    zIndex: "4",
    width: "305px",
    border: `1px solid black`,
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  checkIn: {
    width: "50%",
    borderRight: `1px solid black`,
  },
  checkOut: {
    width: "50%",
  },
  datesInputCont: { display: "flex", flexDirection: "row", width: "100%" },
  datesInputEnter: { display: "flex", flexDirection: "column", width: "100%" },
  datesInputDelete: { border: 0, backgroundColor: "white", fontSize: "larger" },
  input: { width: "80%", border: 0, fontSize: "medium" },
  highlighted: {
    border: `2px solid black`,
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});

const BookingDatesDisplay = ({ calendarClicked, setCalendarClicked }) => {
  return (
    <div {...stylex.props(styles.dates)}>
      {" "}
      <span
        onClick={(e) => setCalendarClicked("checkIn")}
        {...stylex.props(
          styles.checkIn,
          calendarClicked === "checkIn" && styles.highlighted
        )}
      >
        <BookingDatesButton
          calendarClicked={calendarClicked}
          setCalendarClicked={setCalendarClicked}
          type="checkIn"
        />
      </span>
      <span
        onClick={(e) => setCalendarClicked("checkOut")}
        {...stylex.props(
          styles.checkOut,
          calendarClicked === "checkOut" && styles.highlighted
        )}
      >
        <BookingDatesButton
          calendarClicked={calendarClicked}
          setCalendarClicked={setCalendarClicked}
          type="checkOut"
        />
      </span>
    </div>
  );
};

const BookingDatesButton = ({ type, calendarClicked, setCalendarClicked }) => {
  const booking = useSelector(selectApartmentDates)[type];
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  return (
    <span {...stylex.props(styles.datesInputCont)}>
      <div {...stylex.props(styles.datesInputEnter)}>
        {type}
        <span {...stylex.props(styles.input)}>
          {booking ? format(booking, "MM/dd/yy") : "Add date"}
        </span>
      </div>
      {calendarClicked && (
        <button
          {...stylex.props(styles.datesInputDelete)}
          onClick={(e) =>
            type === "checkIn"
              ? dispatch(cleanCalender())
              : dispatch(updateEndDate(null))
          }
        >
          <FaWindowClose />
        </button>
      )}
    </span>
  );
};
export default BookingDatesDisplay;
