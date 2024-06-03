import React from "react";
import { useDispatch } from "react-redux";
import { setHighPrice, setLowPrice } from "../redux/slices/filterSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  priceInput: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    height: "30px",
    border: "1px solid black ",
    width: "100px",
    textAlign: "center",
    fontSize: "large",
  },
  inputContainer: { display: "flex", flexDirection: "row" },
  priceRange: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottom: `1px ${colors.myGray} solid`,
    minHeight: "15vh",
    justifyContent: "space-around",
  },
});
const FilterMethodPriceRange = () => {
  const dispatch = useDispatch();
  return (
    <div {...stylex.props(styles.priceRange)}>
      <span>specify a price range</span>
      <div {...stylex.props(styles.inputContainer)}>
        <input
          {...stylex.props(styles.priceInput)}
          type="number"
          onChange={(e) => dispatch(setLowPrice(e.target.value))}
        />
        <span>-</span>
        <input
          {...stylex.props(styles.priceInput)}
          type="number"
          onChange={(e) => dispatch(setHighPrice(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FilterMethodPriceRange;
