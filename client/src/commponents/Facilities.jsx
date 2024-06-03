import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegMap } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";

import { FaStar } from "react-icons/fa";
const styles = stylex.create({
  facilities: {
    display: "flex",
    flexDirection: "column",
    width: "60vw",
    marginTop: "-300PX",
    paddingTop: "300px",
  },
  facilitiesGrid: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  facility: {
    borderBottom: `2px solid ${colors.myGray}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "20vh",
    borderRight: `2px solid ${colors.myGray}`,
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "6%",
  },
  name: { fontSize: "large" },
  score: { fontSize: "x-large" },
  icon: { fontSize: "xx-large" },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "20vw",
    fontSize: "xx-large",
    paddingBottom: "2%",
    paddingLeft: "10%",
    paddingTop: "10%",
  },
});
const Facilities = ({ facilities }) => {
  const [facilitiesArr, setFacilitiesArr] = useState();
  useEffect(() => {
    setFacilitiesArr(addRelevantIcon(facilities));
  }, []);

  const addRelevantIcon = (facilities) => {
    const modified = Object.entries(facilities).slice(1, 6);
    modified.forEach((facility) => {
      if (facility.length < 3) {
        facility.push(checkWitchIcon(facility));
      }
    });
    return modified;
  };

  const checkWitchIcon = (facility) => {
    switch (facility[0]) {
      case "cleanliness":
        return <MdOutlineCleaningServices />;

      case "communication":
        return <FaRegMessage />;

      case "location":
        return <FaRegMap />;

      case "value":
        return <IoPricetagsOutline />;

      case "accuracy":
        return <CiCircleCheck />;

      default:
        break;
    }
  };

  return (
    <div {...stylex.props(styles.facilities)}>
      <header {...stylex.props(styles.header)}>
        <span>
          <FaStar />
        </span>

        <span>{`${facilities.overall} - ${facilities.numOfReview} Reviews`}</span>
      </header>
      <div {...stylex.props(styles.facilitiesGrid)}>
        <span></span>
        {facilitiesArr?.map((facil, i) => (
          <span key={i} {...stylex.props(styles.facility)}>
            <span {...stylex.props(styles.name)}>{facil[0]}</span>
            <span {...stylex.props(styles.score)}>{facil[1]}</span>
            <span {...stylex.props(styles.icon)}>{facil[2]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
