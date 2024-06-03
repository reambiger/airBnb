import React from "react";
import * as stylex from "@stylexjs/stylex";
import CondoAmanitasDisplay from "./CondoAmanitasDisplay";
const styles = stylex.create({
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subHeader: { fontSize: "larger", color: "rgb(135,135,135)" },
  header: { fontSize: "2.5rem", marginBottom: "2vh" },
  headers: { display: "flex", flexDirection: "column", marginBottom: "5vh" },
});
const CondoAmanitas = () => {
  return (
    <div {...stylex.props(styles.display)}>
      <div {...stylex.props(styles.headers)}>
        <header {...stylex.props(styles.header)}>
          Tell guests what your place has to offer{" "}
        </header>
        <header {...stylex.props(styles.subHeader)}>
          You can add more amenities after you publish your listing.{" "}
        </header>
        <main><CondoAmanitasDisplay/></main>
      </div>
    </div>
  );
};

export default CondoAmanitas;
