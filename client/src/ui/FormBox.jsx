import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  FormBox: {
    backgroundColor: colors.background,
    width: "50vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: `2px solid ${colors.myGray}`,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
  },
});
const FormBox = ({ children }) => {
  return (
    <div {...stylex.props(styles.FormBox)}>
      <main {...stylex.props(styles.inputs)}>{children}</main>
    </div>
  );
};

export default FormBox;
