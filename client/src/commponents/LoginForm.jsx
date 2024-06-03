import React from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../api"; // Ensure this import matches your actual API function
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMidScreenModel } from "../redux/slices/midScreenSlice";
import useLog from "../customHooks/useLog"; // Ensure this import matches your actual custom hook

const styles = stylex.create({
 inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
 },
 emailField: {
    height: "3vh",
    width: "100%",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
    fontSize: "medium",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
 },
 phoneField: {
    height: "3vh",
    width: "100%",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
    fontSize: "medium",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
 },
 error: {
    color: "red",
 },
 button: {
    height: "8vh",
    width: "100%",
    backgroundColor: colors.bold,
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
 },
 footer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingVertical: "5vh",
 },
 header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: "5vh",
 },
 createAc: {
    fontSize: "x-large",
    marginBottom: "2vh",
 },
 login: {
    color: { default: "blue", ":hover": "red" },
    borderBottom: { default: "1px solid blue", ":hover": "1px solid red" },
 },
 errorCont: {
    display: "flex",
    flexDirection: "column",
    color: "red",
    maxHeight: "10vh",
    alignItems: "center",
 },
});

const LoginForm = () => {
 const dispatch = useDispatch();
 const { frontEndSession } = useLog();
 const {
    register,
    handleSubmit,
    formState: { errors },
 } = useForm();

 const onRegisterClick = () => {
    dispatch(showMidScreenModel("register"));
 };

 const onSubmit = async (data) => {
    try {
      const fullName = await logUserIn(data);
      frontEndSession(fullName);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
 };

 const collectErrorMessages = () => {
    const errorMessages = [];
    for (const field in errors) {
      if (errors[field].message) {
        errorMessages.push(errors[field].message);
      }
    }
    return errorMessages;
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.createAc)}>Login</div>
        <div>
          <span>Don't have an account?</span>
          <span
            onClick={() => onRegisterClick()}
            {...stylex.props(styles.login)}
          >
            {" "}
            Register
          </span>
        </div>
      </header>
      <div {...stylex.props(styles.inputField)}>
        <input
          {...stylex.props(styles.emailField)}
          id="email"
          type="email"
          placeholder="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
      </div>
      <div {...stylex.props(styles.inputField)}>
        <input
          {...stylex.props(styles.phoneField)}
          placeholder="password"
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </div>
      <div {...stylex.props(styles.errorCont)}>
        {collectErrorMessages().map((message, index) => (
          <div {...stylex.props(styles.error)} key={index}>*{message}</div>
        ))}
      </div>
      <footer {...stylex.props(styles.footer)}>
        <button {...stylex.props(styles.button)} type="submit">
          Login
        </button>
      </footer>
    </form>
 );
};

export default LoginForm;
