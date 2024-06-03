import React from "react";
import { colors } from "../tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import CondosAmentiasIcon from "./CondosAmentiasIcon";
const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    // height:"70vh",
    width:"50vw",
    gap:"4%"
  },
});

const CondosAmentiasIcons = ({field}) => {
  return (
    <div {...stylex.props(styles.grid)}>
      {field.map((amenity) => (
        <CondosAmentiasIcon
          key={amenity}
          iconRef={amenity}
          text={amenity}
        />
      ))}
    </div>
  );
};

export default CondosAmentiasIcons;
