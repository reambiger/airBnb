import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import FilterButton from "../ui/FilterButton";
import AmenitiesIcons from "./AmentiasIcons";

const bathroom = ["bathtub", "hairdryer", "cleaningProducts", "hotWater"];
const laundry = ["washer", "essentials", "hangers", "iron", "dryingRack"];
const entertainment = ["tv", "hotTub", "pingPong", "snooker"];
const family = ["crib", "highChair"];
const internetAndOffice = ["wifi", "dedicatedWorkspace"];
const kitchenAndDining = [
  "kitchen",
  "refrigerator",
  "microwave",
  "dishes",
  "gasStove",
  "oven",
  "coffeeMaker",
  "diningTable",
];
const parkingAndFacilities = ["elevator", "parking"];
const styles = stylex.create({
  amentiasButtons: {
    marginTop: "5%",
    display: "grid",
    gridTemplateColumns: "repeat(2,2fr)",
    justifyContent: "center",
    gap: "5%",
  },
  display: {
    marginTop: "5%",

    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  ButtonsGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AmentiasButtonsGrid = ({ wantedAmenity }) => {
  let render = [];
  switch (wantedAmenity) {
    case "bathroom":
      render = bathroom;
      break;
    case "laundry":
      render = laundry;
      break;
    case "entertainment":
      render = entertainment;
      break;
    case "internetAndOffice":
      render = internetAndOffice;
      break;
    case "kitchenAndDining":
      render = kitchenAndDining;
      break;

    case "parkingAndFacilities":
      render = parkingAndFacilities;
      break;
    case "family":
      render = family;
      break;

    default:
      break;
  }
  return (
    <div {...stylex.props(styles.display)}>
      <span {...stylex.props(styles.ButtonsGrid)}>{wantedAmenity}</span>
      <div {...stylex.props(styles.amentiasButtons)}>
        {render.map((ament) => (
          <FilterButton amenity={ament} key={ament}>
            {ament} <AmenitiesIcons variant="button" amenity={ament} />{" "}
          </FilterButton>
        ))}
      </div>
    </div>
  );
};

export default AmentiasButtonsGrid;
