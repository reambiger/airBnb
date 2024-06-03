import React, { useEffect, useState } from "react";
import { formatMyString, objectsDriller } from "../../utils";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import AmentiasConditional from "./AmentiasConditional";
const styles = stylex.create({
  container: {
    borderBottom: `2px solid ${colors.myGray}`,
    width: "60vw",
    marginBottom: "5vh",
    marginTop: "5vh",
    paddingLeft:"5vw"
  },
  AmentiasDiplsy: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    justifyContent: "space-between",
    minHeight: "50vh",
    paddingLeft: "5%",
  },
  button: {
    backgroundColor: "inherit",
    height: "8vh",
    width: "15vw",
    fontSize:"large",
    borderTopLeftRadius: "17px",
    borderTopRightRadius: "17px",
    borderBottomRightRadius: "17px",
    borderBottomLeftRadius: "17px",
    marginBottom:"5%"
  },
  headLine: { fontSize: "xx-large", paddingVertical: "3%" },
  AmentiasGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)" },
});
const AmentiasDiplsy = ({ amenities }) => {
  const [apartmentAmenities, setApartmentAmenities] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);
  useEffect(() => {
    findApartmentsAmanitas();
  }, []);

  const findApartmentsAmanitas = () => {
    const myAmanitas = Object.entries(objectsDriller(amenities, {}))
      .filter(
        (amenity) =>
          amenity[1] === true && amenity[0] !== ("isKingSize" || "dryingRack")
      )
      .map((amenity) => amenity[0]);
    setApartmentAmenities(myAmanitas);
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.AmentiasDiplsy)}>
        <header {...stylex.props(styles.headLine)}>
          what this place offers?
        </header>
        <div {...stylex.props(styles.AmentiasGrid)}>
          <AmentiasConditional
            showAmenities={showAmenities}
            apartmentAmenities={apartmentAmenities}
          />
        </div>
        <button
          {...stylex.props(styles.button)}
          onClick={() => setShowAmenities(!showAmenities)}
        >
          {showAmenities ? "hide" : `Show all ${apartmentAmenities.length} amenities`}
        </button>
      </div>
    </div>
  );
};

export default AmentiasDiplsy;
