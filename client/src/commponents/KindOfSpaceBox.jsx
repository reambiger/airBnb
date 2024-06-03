import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import AmenitiesIcons from "./AmentiasIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUploadCondo,
  setKindOfSpace,
} from "../redux/slices/uploadCondoSlice";
const styles = stylex.create({
  box: {
    width: "45vw",
    height: "17vh",
    borderTopLeftRadius: "10px",
    border: `1px solid ${colors.myGray}`,
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  data: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headline: { fontSize: "x-large" },
  description: { fontSize: "large" },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: "5%",
  },
  icon: {
    paddingRight: "5%",
    paddingTop: "5%",
  },
  clicked: {
    backgroundColor: colors.myGray,

    border: "2px solid black",
  },
});
const KindOfSpaceBox = ({ headline, description, iconRef }) => {
  const dispatch = useDispatch();
  const chosenKindOfSpace = useSelector(selectUploadCondo).kindOfSpace;

  return (
    <div
      {...stylex.props(styles.box ,chosenKindOfSpace===iconRef&&styles.clicked)}
      onClick={() => dispatch(setKindOfSpace(iconRef))}
    >
      <div {...stylex.props(styles.data)}>
        <div {...stylex.props(styles.text)}>
          <span {...stylex.props(styles.headline)}>{headline}</span>
          <span {...stylex.props(styles.description)}>{description}</span>
        </div>
      </div>
      <div {...stylex.props(styles.icon)}>
        <AmenitiesIcons amenity={iconRef} />
      </div>
    </div>
  );
};

export default KindOfSpaceBox;
