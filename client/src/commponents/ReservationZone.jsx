import React, { useEffect, useState } from "react";
import TripData from "./TripData";
import RelevantBookingSection from "./RelevantBookingSection";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
const styles = stylex.create({
  reservationZone: { width: "100%", height: "100%" },
  header: { fontSize: "4rem", paddingBottom: "5%" },
});
const ReservationZone = ({ bookingData }) => {
  const isUserLogged = useSelector(selectUser).userName
    ? "payment"
    : "register";
  const [logged, setLogged] = useState(isUserLogged);

  return (
    <div {...stylex.props(styles.reservationZone)}>
      <header {...stylex.props(styles.header)}>Confirm and pay</header>
      <TripData bookingData={bookingData} />
      <RelevantBookingSection userLogged={logged} setLogged={setLogged} />
    </div>
  );
};

export default ReservationZone;
