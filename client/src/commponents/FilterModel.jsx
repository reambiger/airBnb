import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import FilterMethodAdvancedFiltering from "./FilterMethodAdvancedFiltering";
import FilterMethodAmentias from "./FilterMethodAmentias";
import FilterMethodPriceRange from "./FilterMethodPriceRange";
import FilterMethodRooms from "./FilterMethodRooms";
import FilterMethodGusts from "./FilterMethodGusts";

const styles = stylex.create({
  filterBox: {
    position: "relative",
    // top:"50px",
    left: "750px",
    height: "350px",
    width: "400px",
    border: `2px solid ${colors.myGray}`,
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,

    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    fontSize: "larger",
    marginTop: "-7vh",

  },
  close: {
    height: "3vh",
    width: "3vw",
    position: "absolute",
    top: "1vh",
    right: "2vw",
    border: "0",
    background: "inherit",
    fontSize: "large",
  },
});

const FilterModel = ({ setClicked }) => {
  return (
    <div {...stylex.props(styles.filterBox)}>
      <button onClick={() => setClicked(null)} {...stylex.props(styles.close)}>
        close
      </button>

      <FilterMethodAdvancedFiltering />
      <FilterMethodGusts/>
      <FilterMethodRooms />
      <FilterMethodPriceRange />
      <FilterMethodAmentias />

    </div>
  );
};

export default FilterModel;
