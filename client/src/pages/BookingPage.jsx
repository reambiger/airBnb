import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import ReservationTab from "../commponents/ReservationTab";
import ReservationZone from "../commponents/ReservationZone";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    height: "100%",
    width: "100%",
    paddingTop:"15vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:"5VW"
  },
  reservationZone:{
    width:"50%"
  }
});
const BookingPage = () => {
  const setBooking = () => {
    const booking = JSON.parse(sessionStorage.getItem("booking"));
    setBookingData(booking);
  };
  const [bookingData, setBookingData] = useState(null);
  useEffect(() => {
    setBooking();
  }, []);
  return bookingData ? (
    
    <main {...stylex.props(styles.page)}>
      <section {...stylex.props(styles.reservationZone)}>
        <ReservationZone bookingData={bookingData} />
      </section>
        <ReservationTab bookingData={bookingData} />
    </main>
  ) : (
    <div>...loading</div>
  );
};

export default BookingPage;
