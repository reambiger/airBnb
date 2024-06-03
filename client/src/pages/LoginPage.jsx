import React from "react";
import LoginForm from "../commponents/LoginForm";
import FormBox from "../ui/FormBox";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "10vh",

    alignItems: "center",
  },
});
const LoginPage = () => {
  return (
    <div {...stylex.props(styles.page)}>
      <FormBox>
        <LoginForm />
      </FormBox>
    </div>
  );
};

export default LoginPage;
