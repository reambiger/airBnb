import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { style } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { showMidScreenModel } from "../redux/slices/midScreenSlice";
import { outOfSession, selectUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const styles = stylex.create({
  nav: {
    position: "absolute",
    height: "35vh",
    width: "15vw",
    boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
    zIndex: "900",
    border: `1px solid ${colors.myGray}`,
    backgroundColor: "white",
    right: "0%",
    borderTopLeftRadius: "27px",
    borderTopRightRadius: "27px",
    borderBottomRightRadius: "27px",
    borderBottomLeftRadius: "27px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    listStyle: "none",
    paddingVertical: "10%",
    paddingHorizontal: "0",
    justifyContent: "flex-start",
  },
  item: {
    backgroundColor: { default: "inherit", ":hover": `${colors.myGray}` },
    width: "80%",
    height: "33%",
    padding: "5%",
    margin: "0 auto",
  },
});

const UserDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser).userName;
  const openModel = (page) => {
    dispatch(showMidScreenModel(page));
  };

  return (
    <ul {...stylex.props(styles.nav)}>
      {user ? (
        <>
          <li
            onClick={() => dispatch(outOfSession())}
            {...stylex.props(styles.item)}
          >
            Log-out
          </li>
          <li onClick={() => navigate("./condoDeploymentPage")}  {...stylex.props(styles.item)}>Air bnb your home</li>
        </>
      ) : (
        <>
          <li
            onClick={() => openModel("register")}
            {...stylex.props(styles.item)}
          >
            Sign-up
          </li>
          <li onClick={() => openModel("login")} {...stylex.props(styles.item)}>
            Log-in
          </li>
          <li onClick={() => openModel("login")} {...stylex.props(styles.item)}>
            Air bnb your home
          </li>
        </>
      )}
    </ul>
  );
};

export default UserDropDown;
