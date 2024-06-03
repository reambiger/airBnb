import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import SearchBox from "../commponents/SearchBox";
import { BsSearch } from "react-icons/bs";
const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    paddingBottom: "5vh",
    paddingTop: "3vh",
    zIndex: "999",
  },
  searchField: {
    display: "flex",
    flexDirection: "row",
    width: "25vw",
    height: "8vh",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    border: `2px solid ${colors.border}`,
    backgroundColor: "white",
    borderRadius: "30px",
  },
  borderSpan: {
    width: "2px",
    height: "80%",
    backgroundColor: colors.myGray,
    marginTop: "0.5%",
  },
  button: {
    backgroundColor: colors.bold,
    width: "40px",
    height: "40px",
    fontSize: "larger",
    color: "white",
    margin: "5px",
    border: 0,
    alignSelf: "center",
    justifySelf: "center",
    borderRadius: "50%",
  },
});
const ShallowSearchBar = ({ setShow }) => {
  return (
    <div
      onClick={() => {
        setShow("primary");
      }}
      {...stylex.props(styles.container)}
    >
      <div {...stylex.props(styles.searchField)}>
        <SearchBox>Anywhere</SearchBox>
        <span {...stylex.props(styles.borderSpan)}></span>
        <SearchBox>AnyTime</SearchBox>
        <span {...stylex.props(styles.borderSpan)}></span>
        <SearchBox>AnyNeeds</SearchBox>
        <button {...stylex.props(styles.button)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default ShallowSearchBar;
