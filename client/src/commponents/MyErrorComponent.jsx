import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useDispatch } from "react-redux";
import { closeMidScreenModel } from "../redux/slices/midScreenSlice";

const styles = stylex.create({
  MidScreenModel: {
    position: "fixed",
    zIndex: "999",
    top: "30vh",
    left: "40vw",
    width: "20vw",
    height: "40VH",
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
  error: {padding:"10%"},
  button: {
    width:'50%',
    height:"20%",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    color: "white",
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
    backgroundColor: colors.bold,
  },
  head:{fontSize:"xx-large"}
});
const MyErrorComponent = ({ children }) => {
  const dispatch = useDispatch();
  const closeError=()=>{
    dispatch(closeMidScreenModel())
  }
  return (
    <div {...stylex.props(styles.MidScreenModel)}>
      <div {...stylex.props(styles.head)}>Error</div>
      <div {...stylex.props(styles.error)}>{children}</div>

      <button onClick={()=>closeError()} {...stylex.props(styles.button)}>close</button>
    </div>
  );
};

export default MyErrorComponent;
