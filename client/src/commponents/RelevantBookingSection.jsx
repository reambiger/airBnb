import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import FormBox from "../ui/FormBox";
import BookingRegisterForm from "./BookingRegisterForm";
import BookingLoginForm from "./BookingLoginForm";
import Payment from "./Payment";

const RelevantBookingSection = ({ userLogged, setLogged }) => {
  if (userLogged === "register") {
    return <BookingRegisterForm setLogged={setLogged} />;
  }
  if (userLogged === "login") {
    return <BookingLoginForm setLogged={setLogged} />;
  }
  if (userLogged === "payment") {
    return <Payment />;
  }
};

export default RelevantBookingSection;
