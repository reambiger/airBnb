import React from "react";
import CondoDescriptionIcon from "./CondoDescriptionIcon";
import { colors } from "../tokens.stylex";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    height:"70vh",
    width:"50vw",
    gap:"4%"
  },
});
const accommodations = [
  {text:"Home",iconRef:"home"},
  {text:"Bed & Breakfast",iconRef:"bedAndBreakfast"},
  {text:"Apartment",iconRef:"apartment"},
  {text:"Hotel",iconRef:"hotel"},
  {text:"Boat",iconRef:"boat"},
  {text:"Cabin",iconRef:"cabin"},
  {text:"Tent",iconRef:"tent"},
  {text:"Trailer",iconRef:"trailer"},
  {text:"Castle",iconRef:"castle"},
  {text:"Barn",iconRef:"barn"},
  {text:"Tree House",iconRef:"treeHouse"},
  {text:"Different",iconRef:"alien"},
];
const CondosIconsDisplay = () => {
  return (
    <div {...stylex.props(styles.grid)}>
      {accommodations.map((accommodation) => (
        <CondoDescriptionIcon
          key={accommodation}
          iconRef={accommodation.iconRef}
          text={accommodation.text}
        />
      ))}
    </div>
  );
};

export default CondosIconsDisplay;
