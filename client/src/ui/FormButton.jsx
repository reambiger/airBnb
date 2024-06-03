import React, { Children } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAmenity, setAmanitas } from "../redux/slices/filterSlice";
const styles = stylex.create({
  button: {
    height: "50px",
    Width: "70px",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  clicked: {
    backgroundColor: "black",
    color: "white",
    border: "3px solid black",
  },
});
const FormButton = ({ onClick, clicked, children, clickedByDefault }) => {
  return (
    <button
      onClick={() => onClick()}
      {...stylex.props(
        styles.button,
        (clicked || clickedByDefault) && styles.clicked
      )}
    >
      {children}
    </button>
  );
};

export default FormButton;
