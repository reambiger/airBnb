import React from "react";
import { colors } from "../tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width:"40%",
    paddingTop:"3vh",
    fontSize:"large",
    color:"gray"
  },
});
const AdditionalNavBar = () => {
  return (
    <div {...stylex.props(styles.container)}>
      <span>AnyTime</span>
      <span>Anywhere</span>
      <span>AnyNeeds</span>
    </div>
  );
};

export default AdditionalNavBar;
