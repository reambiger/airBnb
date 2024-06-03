import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  buttons: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    border: "1px solid black",
    height: "40px",
    fontSize:"x-large",
    width: "40px",
    textAlign: "center",
    textJustify: "center",
    backgroundColor: "white",
    color:"rgb(135,135,135)"
  },
  display: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    height: "40vh",
  },
  name: { fontSize: "x-large" },
  box: {
    width: "100%",
    borderBottom: `1px solid ${colors.myGray}`,
    paddingBottom: "5vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countZone: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10%",
    height: "80%",
  },
  number: {fontSize:"larger"},
});

const FacilitiesField = ({ fieldName }) => {
  const [count, setCount] = useState(0);
  return (
    <div {...stylex.props(styles.box)}>
      <span {...stylex.props(styles.name)}>{fieldName}</span>
      <span {...stylex.props(styles.countZone)}>
        <button
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
          {...stylex.props(styles.buttons)}
        >
          -
        </button>
        <span {...stylex.props(styles.number)}>{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          {...stylex.props(styles.buttons)}
        >
          +
        </button>
      </span>
    </div>
  );
};

export default FacilitiesField;
