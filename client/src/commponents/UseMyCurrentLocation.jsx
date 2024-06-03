import React from "react";
import * as stylex from "@stylexjs/stylex";
import { CiLocationOn } from "react-icons/ci";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  box: {
    width: "100%",
    border: `2px solid rgb(176,176,176)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "10vh",
    marginBottom: "5vh",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    backgroundColor:{default:"white",":hover":colors.myGray}
  },
  text: { fontSize: "x-large" },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: "5%",
  },
  icon: { fontSize: "xx-large" },
});
const UseMyCurrentLocation = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      {...stylex.props(styles.box)}
    >
      <div {...stylex.props(styles.container)}>
        <span {...stylex.props(styles.text)}>Use My Current Location</span>

        <span {...stylex.props(styles.icon)}>
          <CiLocationOn />
        </span>
      </div>
    </div>
  );
};

export default UseMyCurrentLocation;
