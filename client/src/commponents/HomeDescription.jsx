import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import CondosIconsDisplay from "./CondosIconsDisplay";
const styles = stylex.create({
  page: {
    padding: "0",
    fontFamily: "Heebo', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header:{
    fontSize:"3rem",
    marginBottom:"10vh"
  }
});
const HomeDescription = () => {
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
  return (
    <>
      <section {...stylex.props(styles.page)}>
        <header {...stylex.props(styles.header)}>Which of these best describes your place?</header>
        <main>
          <CondosIconsDisplay iconList={accommodations} />
        </main>
      </section>
    </>
  );
};

export default HomeDescription;
