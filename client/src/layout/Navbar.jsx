import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { FaHotel } from "react-icons/fa";
import UserDropDownButton from "../commponents/UserDropDownButton";
import { useNavigate } from "react-router-dom";
const styles = stylex.create({
  navContainer: {
    display: "flex ",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "30%",
    margin: "0 auto",
    padding: "0 auto",
    width: "93vw",
  },

  myLogo: {
    paddingTop: "5vh",
    fontSize: "xx-large",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "130px",
    color: colors.bold,
  },
  side: {
    paddingTop: "5vh",
  },
});
const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const navToPage = (page) => {
    navigate(page);
  };
  return (
    <nav {...stylex.props(styles.navContainer)}>
      <span onClick={() => navToPage("/")} {...stylex.props(styles.myLogo)}>
        <FaHotel />
        airbnb
      </span>
      {children}
      <span {...stylex.props(styles.side)}>
        <UserDropDownButton />
      </span>
    </nav>
  );
};

export default Navbar;
