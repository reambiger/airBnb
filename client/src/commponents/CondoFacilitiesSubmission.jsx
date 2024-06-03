import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import FacillitiesField from "./FacillitiesField";
const styles = stylex.create({
  buttons: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    border: "1px solid black",
    height: "30px",
    width: "30px",
    textAlign: "center",
    textJustify: "center",
  },
  display: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    height: "40vh",
  },
  name: {},
  box: {
    width: "100%",
    borderBottom: `1px solid ${colors.myGray}`,
    
  },
  countZone: {},
  number: {},
});

const CondoFacilitiesSubmission = () => {
  const options = ["Guests", "Bedrooms", "Beds", "Bathrooms"];

  return (
    <div {...stylex.props(styles.display)}>
      {options.map((fieldName) => 
        <FacillitiesField key={fieldName} fieldName={fieldName} />)}
    </div>
  );
};

export default CondoFacilitiesSubmission;
