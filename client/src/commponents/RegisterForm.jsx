import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import useLog from "../customHooks/useLog";
import { useDispatch } from "react-redux";
import { setError, showMidScreenModel } from "../redux/slices/midScreenSlice";

const styles = stylex.create({
  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    opacity: "0.8",
  },
  emailField: {
    height: "3vh",
    width: "100%",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
    fontSize: "medium",
  },
  passwordField: {
    height: "3vh",
    width: "100%",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
    fontSize: "medium",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  phoneField: {
    height: "3vh",
    width: "100%",
    height: "8vh",
    border: `2px solid ${colors.myGray}`,
    fontSize: "medium",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  error: {
    paddingVertical:0,
    marginVertical:0
  },
  form: { width: "100%", height: "100%" },
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
  input: {
    height: "3vh",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: `2px solid ${colors.myGray}`,
    textAlign: "center",
    fontSize: "medium",
  },
  errorCont:{
    display:"flex",
    flexDirection:"column",
    color:"red",
    maxHeight:"10vh",
    alignItems:"center"
  },
  
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { frontEndSession } = useLog();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLoginClick = () => {
    dispatch(showMidScreenModel("login"));
  };
  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      frontEndSession(data.fullName);
    } catch (error) {
      dispatch(setError(error.message));
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
    <>
      <form {...stylex.props(styles.form)} onSubmit={handleSubmit(onSubmit)}>
        <header {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.createAc)}>Create account</div>
          <div>
            <span>already have an account?</span>
            <span
              onClick={() => onLoginClick()}
              {...stylex.props(styles.login)}
            >
              {" "}
              login
            </span>
          </div>
        </header>
        <div {...stylex.props(styles.inputField)}>
          <input
            {...stylex.props(styles.phoneField)}
            id="fullName"
            placeholder="full name"
            {...register("fullName", { required: "Full name is required" })}
          />
        </div>
        <div {...stylex.props(styles.inputField)}>
          <input
            {...stylex.props(styles.emailField)}
            placeholder="Email"
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        <div {...stylex.props(styles.inputField)}>
          <input
            {...stylex.props(styles.passwordField)}
            id="password"
            placeholder="password"
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
            <div {...stylex.props(styles.error)} key={message}>*{message}</div>
          ))}
        </div>
        <footer {...stylex.props(styles.footer)}>
          <button {...stylex.props(styles.button)} type="submit">
            Register
          </button>
        </footer>
      </form>
    </>
  );
};

export default RegisterForm;
