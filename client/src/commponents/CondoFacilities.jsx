import React from "react";
import * as stylex from "@stylexjs/stylex";
import CondoFacilitiesSubmission from "./CondoFacilitiesSubmission";
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
const CondoFacilities = () => {
  return (
    <div {...stylex.props(styles.display)}>
      <div {...stylex.props(styles.headers)}>
        <header {...stylex.props(styles.header)}>
          Share some basics about your place
        </header>
        <header {...stylex.props(styles.subHeader)}>
          You'll add more details later, like bed types.
        </header>
        <main>
            <CondoFacilitiesSubmission/>
        </main>
      </div>
    </div>
  );
};

export default CondoFacilities;
