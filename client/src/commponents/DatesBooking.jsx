import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useState } from "react";
import BookingDatesModel from "./BookingDatesModel";
import BookingDatesDisplay from "./BookingDatesDisplay";

const styles = stylex.create({
  dates: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderBottom: `1px solid black`,
    height: "50%",
    zIndex: "4",
    width:"305px"
  },
  checkIn: {
    width: "50%",
    borderRight: `1px solid black`,
  },
  checkOut: {
    width: "50%",
  },
});

const DatesBooking = () => {
  const [calendarClicked, setCalendarClicked] = useState(null);

  const onFieldClick = (e) => {
    setCalendarClicked(!calendarClicked);
  };
  return (
    <>
      {calendarClicked ? (
        <BookingDatesModel calendarClicked={calendarClicked} setCalendarClicked={setCalendarClicked}>
          <BookingDatesDisplay calendarClicked={calendarClicked} setCalendarClicked={setCalendarClicked}/>
        </BookingDatesModel >
      ) : (
        <BookingDatesDisplay calendarClicked={calendarClicked} setCalendarClicked={setCalendarClicked}/>
      )}
    </>
  );
};

export default DatesBooking;
