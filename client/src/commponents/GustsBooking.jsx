import React, { useReducer, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import GustsModel from "./GustsModel";
import { useSelector } from "react-redux";
import { selectBooking } from "../redux/slices/bookingSlice";
const styles = stylex.create({
  gusts: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  model: {
    zIndex: "100",
    // position: "absolute",
    width: "80%",
    marginTop: "3%",
    backgroundColor: "white",
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    border: `2px solid ${colors.myGray}`,

    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
});
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, [action.payload]: state[action.payload] + 1 };

    case "decrement":
      if (state[action.payload] > 0) {
        return { ...state, [action.payload]: state[action.payload] - 1 };
      }

    default:
      return state;
  }
};
const GustsBooking = ({ beds}) => {
  const [model, setModel] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    adults: 0,
    children: 0,
    infants: 0,
  });
  const selectGusts = useSelector(selectBooking).gusts;

  const toggleModel = () => {
    setModel(!model);
  };

  const shouldDisable = () => {
    return selectGusts.overall === beds ? true : false;
  };
  return (
    <div onClick={toggleModel} id="gusts" {...stylex.props(styles.gusts)}>
      <span>Gusts</span>
      <span>{selectGusts.overall > 0 ? selectGusts.overall : "num of gusts"}</span>
      {model && (
        <GustsModel
          beds={beds}
        />
      )}
    </div>
  );
};

export default GustsBooking;
