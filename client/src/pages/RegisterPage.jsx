import React from "react";
import RegisterForm from "../commponents/RegisterForm";
import FormBox from "../ui/FormBox";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    height:"100%",
    width:"100%",
    display:"flex",
    flexDirection:"column",
    // justifyContent:"center",
    paddingTop:"10vh",
    alignItems:"center"
  },
});
const RegisterPage = () => {
  return (
    <div {...stylex.props(styles.page)}>
      <header></header>
      <FormBox>
        <RegisterForm />
      </FormBox>
      {/* <footer></footer> */}
    </div>
  );
};

export default RegisterPage;
