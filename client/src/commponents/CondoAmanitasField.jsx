import React from "react";
import CondosIconsDisplay from "./CondosIconsDisplay";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import CondosAmentiasIcons from "./CondosAmentiasIcons";
const styles = stylex.create({
  section: {
    marginTop: "5vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginTop: "5vh",
    fontSize: "x-large",
  },
});
const CondoAmanitasField = ({ field }) => {
  return (
    <section {...stylex.props(styles.section)}>
      <header {...stylex.props(styles.header)}>{field.description}</header>
    <CondosAmentiasIcons field={field.amenities}/>
    </section>
  );
};

export default CondoAmanitasField;
