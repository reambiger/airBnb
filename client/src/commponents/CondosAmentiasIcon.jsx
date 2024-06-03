import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { Icon } from "@mui/material";
import AmenitiesIcons from "./AmentiasIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUploadCondo,
  setDescription,
} from "../redux/slices/uploadCondoSlice";
const styles = stylex.create({
  box: {
    width: "15vw",
    height: "17vh",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: "10px",
    border: `1px solid ${colors.myGray}`,
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10%",
  },
  text: {
    fontSize: "x-large",
  },
  clicked: {
    backgroundColor: colors.myGray,

    border: "2px solid black",
  },
});

const CondosAmentiasIcon = ({ iconRef, text }) => {
  const dispatch = useDispatch();
  //   const chosenDescription = useSelector(selectUploadCondo).description;
  return (
    <div
      //   onClick={() => dispatch(setDescription(iconRef))}
      {...stylex.props(
        styles.box
        // chosenDescription === iconRef && styles.clicked
      )}
    >
      <AmenitiesIcons amenity={iconRef} variant={"amentiasDisplay"} />

      <span {...stylex.props(styles.text)}>{text}</span>
    </div>
  );
};

export default CondosAmentiasIcon;
