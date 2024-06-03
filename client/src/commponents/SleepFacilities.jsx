import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { BiBed as KingSize } from "react-icons/bi";
import { FaBed as RegularBed } from "react-icons/fa";
const styles = stylex.create({
  roomBox: {
    width: "20vw",
    height: "20vh",
    border: `2px solid ${colors.myGray}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    marginBottom: "2%",
    
    
  },
  SleepFacilities: {
    marginTop: "5vh",
    display: "flex",
    width: "45vw",
    flexDirection: "column",
    alignItems: "center",
    marginBottom:"-100px",
  },

  roomDisplay: {
    marginTop: "1vh",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  header: {
    fontSize: "x-large",
    margin: " 0 auto",
  },
  icon: {
    fontSize: "xx-large",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const myRoomsBedsStr = (room) => {
  let myStr = "";
  const numOfKingSize = room.beds.filter(
    (bed) => bed.isKingSize === true
  ).length;
  myStr = numOfKingSize ? `${numOfKingSize} king size bed ` : "" + myStr;
  const numOfRegularBeds = room.beds.filter(
    (bed) => bed.isKingSize === false
  ).length;
  myStr = numOfRegularBeds ? `${numOfRegularBeds} regular bed ` : "" + myStr;
  return myStr;
};
const relevantIcons = (room) => {
  const icons = room.beds.map((bed, i) => {
     if (bed.isKingSize === true) {
       return <KingSize key={`${room.id}-king-${i}`} />;
     } else {
       return <RegularBed key={`${room.id}-regular-${i}`} />;
     }
  });
  return icons;
 };
 
const SleepFacilities = ({ rooms }) => {
  return (
    <div {...stylex.props(styles.SleepFacilities)}>
      <header {...stylex.props(styles.header)}>Where you'll sleep</header>
      <div {...stylex.props(styles.roomDisplay)}>
        {rooms.map((room, index) => (
          <div {...stylex.props(styles.roomBox)} key={room.id}>
            <span key={room.id + "4"}>Bedroom {index + 1}</span>
            <span {...stylex.props(styles.icons)}>
              {relevantIcons(room).map((icon, i) => (
                <span {...stylex.props(styles.icon)} key={i}>
                  {icon}
                </span>
              ))}
            </span>
            <span>{myRoomsBedsStr(room)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepFacilities;
