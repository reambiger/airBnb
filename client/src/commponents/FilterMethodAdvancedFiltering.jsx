import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { selectFilter, setFilterMethod } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../ui/FormButton";
const styles = stylex.create({
  filterMethod: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: `1px ${colors.myGray} solid`,
    minHeight: "15vh",
    justifyContent: "space-around",
  },
  filterButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    width:"40%"
  },
});
const FilterMethodAdvancedFiltering = () => {
  const dispatch = useDispatch();
  const currentFilterMethod = useSelector(selectFilter).filterMethod;
  const onClickContractor = (filterMethod) => {
    const customOnClick = () => {
      dispatch(setFilterMethod(filterMethod));
    };
    return customOnClick;
  };
  return (
    <div {...stylex.props(styles.filterMethod)}>
      <span>advanced filtering</span>
      <div {...stylex.props(styles.filterButtons)}>
        <FormButton
          clickedByDefault={currentFilterMethod === "lowToHigh"}
          onClick={onClickContractor("lowToHigh")}
        >
          low to high
        </FormButton>
        <FormButton
          clickedByDefault={currentFilterMethod === "reviews"}
          onClick={onClickContractor("reviews")}
        >
          reviews
        </FormButton>
      </div>
    </div>
  );
};

export default FilterMethodAdvancedFiltering;
