import { differenceInMonths, format, getDate, getYear } from "date-fns";
import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { formatMyString } from "../../utils";
const styles = stylex.create({
  TripData: {
    borderBottom: `1px solid ${colors.myGray}`,
  },

  box: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8vh",
    marginVertical: "1vh",
  },
  headline: { fontSize: "xx-large" },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  subHead: {
    fontSize: "larger",
  },
  edit: { borderBottom: "1px solid black", fontSize: "larger" },
});
const TripData = ({ bookingData }) => {
  return (
    <div {...stylex.props(styles.TripData)}>
      <div {...stylex.props(styles.headline)}>YourTrip</div>
      <div {...stylex.props(styles.box)}>
        <div {...stylex.props(styles.data)}>
          <div {...stylex.props(styles.subHead)}>Dates</div>
          <span>{formatMyString(relevantDatesPrasnatition(bookingData))}</span>
        </div>
        {/* <span {...stylex.props(styles.edit)}>Edit</span> */}
      </div>
      <div {...stylex.props(styles.box)}>
        <div {...stylex.props(styles.data)}>
          <div {...stylex.props(styles.subHead)}>Gusts</div>
          <div>
            {bookingData.gusts.overall} gust
            {bookingData.gusts.overall > 1 ? "s" : ""}
          </div>
        </div>
        {/* <span {...stylex.props(styles.edit)}>Edit</span> */}
      </div>
    </div>
  );
};

export default TripData;
