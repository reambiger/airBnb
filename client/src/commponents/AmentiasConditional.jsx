import React from "react";
import { formatMyString, objectsDriller } from "../../utils";
import AmentiasIcons from "./AmentiasIcons";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  AmentiasDiplsy: { display: "flex", flexDirection: "column", width: "50vw" },
  AmentiasGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)" },
  AmentiasBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50px",
    paddingVertical: "3%",
  },
  visible: { display: "block" },
  notVisible: { display: "none" },
});
const AmentiasConditional = ({ apartmentAmenities, showAmenities }) => {
  return (
    <>
      {apartmentAmenities.map((amenity, i) =>
        i < 6 ? (
          <span key={amenity}>
            <span {...stylex.props(styles.AmentiasBox)} key={amenity}>
              <AmentiasIcons amenity={amenity} variant="amentiasDisplay" />
              <span>{formatMyString(amenity)}</span>
            </span>
          </span>
        ) : (
          <span
            key={amenity}
            {...stylex.props(
              styles.AmentiasBox,
              showAmenities ? styles.visible : styles.notVisible
            )}
          >
            <span {...stylex.props(styles.AmentiasBox)} key={amenity}>
              <AmentiasIcons amenity={amenity} variant="amentiasDisplay" />
              <span>{formatMyString(amenity)}</span>
            </span>
          </span>
        )
      )}
    </>
  );
};

export default AmentiasConditional;
