import React from "react";
import KindOfSpaceBox from "./KindOfSpaceBox";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  display: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height:"60VH"
  },
});

const kindOfSpaceBoxes = [
  {
    iconRef: "home",
    headline: "An entire place",
    description: "Guests have the whole place to themselves.",
  },
  {
    iconRef: "door",
    headline: "A room",
    description:
      "   Guests have their own room in a home, plus access to shared spaces.",
  },
  {
    iconRef: "shared",
    headline: "A shared room  ",
    description:
      "Guests sleep in a room or common area that may be shared with you or others.",
  },
];
const SpaceBoxesDisplay = () => {
  return (
    <div {...stylex.props(styles.display)}>
      {kindOfSpaceBoxes.map((kind) => (
        <KindOfSpaceBox
          key={kind.iconRef}
          iconRef={kind.iconRef}
          headline={kind.headline}
          description={kind.description}
        />
      ))}
    </div>
  );
};

export default SpaceBoxesDisplay;
