import React, { children, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  addressBox: {
    width: "80vw",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
  },
  addressChildren: {
    fontSize: { default: "large", ":focus": "medium" },
    color: "gray",
    height: "50%",
  },
  addressInput: { border: 0, height: "50%", outline: "none" },
});
const MyInput = ({ type, placeHolder, variant, children }) => {
  
    const [full, setFull] = useState(null)
  return (
    <div {...stylex.props(styles[variant + "Box"])}>
      <div {...stylex.props(styles[variant + "Children"])}>{children}</div>
      <input
        {...stylex.props(styles[variant + "Input"])}
        placeholder={placeHolder ? placeHolder : ""}
        type={type ? type : null}
        
      />
    </div>
  );
};

export default MyInput;
