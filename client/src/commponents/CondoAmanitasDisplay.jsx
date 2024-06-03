import React from "react";
import CondoAmanitasField from "./CondoAmanitasField";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  page: {},
});
const amenitiesArray = [
    {
      category: "bathroom",
      amenities: [
        "bathtub",
        "cleaningProducts",
        "hotWater"
      ],
      description: "Ensure your guests enjoy a comfortable and refreshing bathroom experience with essential amenities."
    },
    {
      category: "laundry",
      amenities: [
        "washer",
        "essentials",
        "hangers",
        "iron",
        "dryingRack"
      ],
      description: "Make laundry convenient for your guests with well-equipped facilities."
    },
    {
      category: "entertainment",
      amenities: [
        "tv",
        "hotTub",
        "pingPong",
        "snooker"
      ],
      description: "Provide entertainment options to keep your guests entertained throughout their stay."
    },
    {
      category: "family",
      amenities: [
        "crib",
        "highChair"
      ],
      description: "Make family stays comfortable with amenities catering to the needs of little ones."
    },
    {
      category: "internetAndOffice",
      amenities: [
        "wifi",
        "dedicatedWorkspace"
      ],
      description: "Keep your guests connected and productive with reliable internet and workspaces."
    },
    {
      category: "kitchenAndDining",
      amenities: [
        "kitchen",
        "refrigerator",
        "microwave",
        "dishes",
        "gasStove",
        "oven",
        "coffeeMaker",
        "diningTable"
      ],
      description: "Allow your guests to enjoy the convenience of preparing and enjoying meals with a well-equipped kitchen and dining area."
    },
    {
      category: "parkingAndFacilities",
      amenities: [
        "elevator",
        "parking"
      ],
      description: "Provide convenient and secure facilities to enhance your guests' stay."
    }
  ];
  
  

const CondoAmanitasDisplay = () => {
  return (
    <div>
      {amenitiesArray.map((field) => (
        <CondoAmanitasField key={field.category} field={field} />
      ))}
    </div>
  );
};

export default CondoAmanitasDisplay;
