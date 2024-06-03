import React from "react";
import ApartmentBox from "./ApartmentBox";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  apartmentsGrid: {
    margin:"0 auto",
    padding:'0 auto',
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridGap: "1%",
    marginBottom:"6%",
    marginHorizontal:"1%"

  },
});
const ApartmentsGrid = ({ apartmentsGrid }) => {
  return (
    <>
      <div {...stylex.props(styles.apartmentsGrid)}>
        {apartmentsGrid.map((apart, i) => (
          <ApartmentBox key={i} apartment={apart} />
        ))}
      </div>
    </>
  );
};

export default ApartmentsGrid;
