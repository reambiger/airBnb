import React, { children, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  box: {
    width: "50vw",
    height: "8vh",
    borderBottom: `2px solid ${colors.myGray}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  children: {
    height: "90%",
    fontSize: "x-large",
    color: "gray",
    height: "65%",
  },
  input: { border: 0, height: "10%", outline: "none" },
  childrenFull: { fontSize: "medium", height: "35%" },
  boxFull: {
    //  border: "2px solid black"
 },
  inputFull: { height: "50%" },
});
const ShrinkingInput = ({ children }) => {
  const [full, setFull] = useState(false);
  return (
    <div {...stylex.props(styles.box, full && styles.boxFull)}>
      <div {...stylex.props(styles.children, full && styles.childrenFull)}>
        {children}
      </div>
      <input
        {...stylex.props(styles.input, full && styles.inputFull)}
        onFocus={() => setFull(true)}
        onBlur={() => setFull(false)}
      />
    </div>
  );
};

export default ShrinkingInput;
