import React, { useState } from "react";
import AmentiasButtonsGrid from "./AmentiasButtonsGrid";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../redux/slices/filterSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import FormButton from "../ui/FormButton";
import { formatMyString } from "../../utils";
const styles = stylex.create({
  filterMethod: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  filterButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    height: "40px",
    minWidth: "80px",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  amentiasButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    justifyContent: "center",
    gap: "5%",
    padding:"5%",
  },
  amentias: {
    paddingVertical:"5%",
    borderBottom: `1px ${colors.myGray} solid`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
const FilterMethodAmentias = () => {
  const [AmanitasButtons, setAmanitasButtons] = useState();

  const amenities = [
    "bathroom",
    "laundry",
    "entertainment",
    "family",
    "internetAndOffice",
    "kitchenAndDining",
  ];
  const customOnClick = (amenity) => {
    const customed = () => {
      setAmanitasButtons(amenity);
    };
    return customed;
  };
  return (
    <>
      <div {...stylex.props(styles.amentias)}>
        <div>filter by amanitas</div>
        <div {...stylex.props(styles.amentiasButtons)}>
          {amenities.map((amenity, index) => (
            <FormButton
              clicked={AmanitasButtons === amenity}
              key={amenity}
              onClick={customOnClick(amenity)}
            >
              {formatMyString(amenity)}
            </FormButton>
          ))}
        </div>
      </div>
      {AmanitasButtons && (
        <AmentiasButtonsGrid wantedAmenity={AmanitasButtons} />
      )}
    </>
  );
};

export default FilterMethodAmentias;
