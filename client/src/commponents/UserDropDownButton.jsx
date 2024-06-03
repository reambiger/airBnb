import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { style } from "@mui/system";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
const styles = stylex.create({
  button: {
    minWidth: "90px",
    height: "50px",
    borderTopLeftRadius: "27px",
    borderTopRightRadius: "27px",
    borderBottomRightRadius: "27px",
    borderBottomLeftRadius: "27px",
    // border: "1px solid black",
    border: "inherit",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  container: {
    position: "relative",
  },
  menu: {
    fontSize: "x-large",
    marginTop: "5%",
  },
  user: {
    marginTop: "5%",
    fontSize: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: "small", marginRight: "5%" },
  clicked: {
    boxShadow: " rgba(0, 0, 0, 0.3) 0px 2px 4px 0px inset",
  },
});

const UserDropDownButton = () => {
  const [clicked, setClicked] = useState(false);
  const userName = useSelector(selectUser).userName;

  return (
    <div {...stylex.props(styles.container)}>
      <button
        onClick={() => setClicked(!clicked)}
        {...stylex.props(styles.button, clicked && styles.clicked)}
      >
        <span {...stylex.props(styles.menu)}>
          <IoMdMenu />
        </span>
        <span {...stylex.props(styles.user)}>
          {userName && <span {...stylex.props(styles.name)}>{userName}</span>}
          <FaUserCircle />
        </span>
      </button>
      {clicked && <UserDropDown />}
    </div>
  );
};

export default UserDropDownButton;
