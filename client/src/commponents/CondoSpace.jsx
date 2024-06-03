import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import KindOfSpaceBox from "./KindOfSpaceBox";
import SpaceBoxesDisplay from "./SpaceBoxesDisplay";
const styles = stylex.create({
  page: {
    padding: "0",
    fontFamily: "Heebo', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: "3rem",
    marginBottom: "10vh",
  },
});


const CondoSpace = () => {
  return (
    <section {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        What type of place will guests have?
      </header>
      <main>
    <SpaceBoxesDisplay/>
      </main>
    </section>
  );
};

export default CondoSpace;
