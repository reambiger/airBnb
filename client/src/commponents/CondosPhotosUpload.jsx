import React from "react";
import * as stylex from "@stylexjs/stylex";
import CondoPhotoDragger from "./CondoPhotoDragger";
const styles = stylex.create({
  display: {
    display: "flex",
    flexDirection: "column",
    height: "60VH",
    alignItems: "center",

  },
  subHeader: { fontSize: "larger", color: "rgb(135,135,135)" },
  header: { fontSize: "2.5rem", marginBottom: "2vh" },
  headers: { display: "flex", flexDirection: "column", marginBottom: "5vh" },
});
const CondosPhotosUpload = () => {
  return (
    <div {...stylex.props(styles.display)}>
      <div {...stylex.props(styles.headers)}>
        <header {...stylex.props(styles.header)}>
          Add some photos of your house
        </header>
        <header {...stylex.props(styles.subHeader)}>
          You'll need 5 photos to get started. You can add more or make changes
          later.{" "}
        </header>
        <main>
            <CondoPhotoDragger/>
        </main>
      </div>
    </div>
  );
};

export default CondosPhotosUpload;
