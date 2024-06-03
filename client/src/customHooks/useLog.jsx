import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMidScreenModel, setError } from "../redux/slices/midScreenSlice";
import {
  newSession,
  outOfSession,
  selectUser,
} from "../redux/slices/userSlice";

const useLog = () => {
  const dispatch = useDispatch();
  const logged = useSelector(selectUser).fullName;

  const frontEndSession = (fullName) => {
    sessionStorage.setItem("user", fullName);
    dispatch(closeMidScreenModel());
    dispatch(newSession(fullName));

    setTimeout(() => {
      dispatch(outOfSession());
      dispatch(setError("your session has expired"));
    }, 600000);
  };
  return { frontEndSession };
};

export default useLog;
