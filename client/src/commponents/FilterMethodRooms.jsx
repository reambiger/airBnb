import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementRooms,
  incrementRooms,
  selectFilter,
} from "../redux/slices/filterSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  Room: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottom: `1px ${colors.myGray} solid`,
    minHeight: "15vh",
    justifyContent: "space-around",
  },
  roomsButtons: {
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
const FilterMethodRooms = () => {
  const dispatch = useDispatch();
  const selectRooms = useSelector(selectFilter).rooms;

  return (
    <div {...stylex.props(styles.Room)}>
      <div>number of rooms</div>
      <div {...stylex.props(styles.roomsButtons)}>
        <button
          {...stylex.props(styles.circle)}
          onClick={() => dispatch(decrementRooms())}
        >
          -
        </button>
        <span >{selectRooms}</span>
        <button
          {...stylex.props(styles.circle)}
          onClick={() => dispatch(incrementRooms())}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FilterMethodRooms;
