import React, { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { addComasInNumbers } from "../../utils";
import { useDispatch } from "react-redux";
import { setPrice } from "../redux/slices/bookingSlice";
const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "3vh",
  },
  billing: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: "15%",
    fontSize: "large",
  },
  calc: { borderBottom: "1px solid black" },
  total: {
    paddingVertical: "3vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: `2px solid ${colors.myGray}`,
  },
});
const BookingBillingZone = ({ price, numDays }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPrice({
        nightPrice: price,
        numDays: numDays,
        total: price * numDays + Math.round(price * numDays * 0.2),
      })
    );
  }, []);

  return (
    <>
      <div {...stylex.props(styles.billing)}>
        <div {...stylex.props(styles.section)}>
          <div {...stylex.props(styles.calc)}>
            ${price} x {numDays} nights
          </div>
          <div>{addComasInNumbers(price * numDays)}$</div>
        </div>
        <div {...stylex.props(styles.section)}>
          <div {...stylex.props(styles.calc)}>Taxes</div>
          <div>{addComasInNumbers(Math.round(price * numDays * 0.2))}$</div>
        </div>
        <div {...stylex.props(styles.total)}>
          <div {...stylex.props(styles.calc)}>Total</div>
          <div>
            {addComasInNumbers(
              price * numDays + Math.round(price * numDays * 0.2)
            )}
            $
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingBillingZone;
