import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useDispatch } from "react-redux";
import { closeMidScreenModel } from "../redux/slices/midScreenSlice";

const styles = stylex.create({
  popUp: {
    position: "fixed",
    zIndex: "999",
    top: "20vh",
    left: "40vw",
    width: "20vw",
    minHeight: "40VH",
    maxHeight: "85VH",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white",
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
  },
  children: {
  },
  close: {
    width: "min-content",
    border: 0,
    backgroundColor: "white",
    color: "black",
    fontSize: "medium",
    marginBottom: "4%",
    borderBottom: "2px solid black",
    alignSelf: "flex-end",
    marginRight: "8%",
    // marginLeft: "80%",
  },
});
const GeneralPopUp = ({ children }) => {
  const dispatch = useDispatch();
  const closeModel = () => {
    dispatch(closeMidScreenModel())
  };
  return (
    <div {...stylex.props(styles.popUp)}>
      <div {...stylex.props(styles.children)}>{children}</div>
      <span {...stylex.props(styles.close)} onClick={() => closeModel()}>
        close
      </span>
    </div>
  );
};

export default GeneralPopUp;
