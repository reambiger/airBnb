import React, { Children, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { formatMyString } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMidScreenModel,
  showMidScreenModel,
} from "../redux/slices/midScreenSlice";
import MyErrorComponent from "./MyErrorComponent";
import LoginForm from "./LoginForm";
import GeneralPopUp from "./GenrelPopUp";
import RelevantBookingSection from "./RelevantBookingSection";
import BookingLoginForm from "./BookingLoginForm";
import BookingRegisterForm from "./BookingRegisterForm";
import RegisterForm from "./RegisterForm";

const MidScreenModel = () => {
  const dispatch = useDispatch();
  const setLogged = (dest) => {
    dispatch(showMidScreenModel(dest));
  };
  const midScreen = useSelector(selectMidScreenModel);
  if (midScreen.error) {
    return (
      <>
        <MyErrorComponent>{midScreen.error}</MyErrorComponent>
      </>
    );
  }

  if (midScreen.show === "login") {
    return (
      <>
        <GeneralPopUp>
          <LoginForm />
        </GeneralPopUp>
      </>
    );
  }

  if (midScreen.show === "register") {
    return (
      <>
        <GeneralPopUp>
          <RegisterForm   />
        </GeneralPopUp>
      </>
    );
  }

  return <></>;
};

export default MidScreenModel;
