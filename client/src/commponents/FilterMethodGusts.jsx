import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementGusts, incrementGusts, selectFilter } from "../redux/slices/filterSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  gusts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottom: `1px ${colors.myGray} solid`,
    minHeight:"15vh",
    justifyContent:"space-around"
    

  },
  gustsButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  circle: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    border: "1px solid black",
    height: "30px",
    width: "30px",
    textAlign: "center",
    textJustify: "center",
  },
});
const FilterMethodGusts = () => {
  const dispatch = useDispatch();
  const selectGusts=useSelector(selectFilter).gusts
  return (
    <div {...stylex.props(styles.gusts)}>
      <div>number of gusts</div>
      <div {...stylex.props(styles.gustsButtons)}>
        <button
          {...stylex.props(styles.circle)}
          onClick={() => dispatch(decrementGusts())}
        >
          -
        </button>
        <span >{selectGusts}</span>
        <button
          {...stylex.props(styles.circle)}
          onClick={() => dispatch(incrementGusts())}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FilterMethodGusts;
