import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  elliptic: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  clicked: {
    backgroundColor: "white",
  },
  childWasClicked: {
    backgroundColor: colors.myGray,
  },
  brotherClicked: {
    backgroundColor: colors.myGray,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "4%",
    backgroundColor: "white",
    justifyContent: "center",

    width: "30%",
  },
});
const SearchBox = ({ setClicked, clicked, children, id }) => {
  const onFieldClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  return (
    <div
      id={id}
      onClick={(e) => onFieldClick(e)}
      {...stylex.props(
        styles.box,
        styles.elliptic,

        clicked
          ? clicked === id
            ? styles.clicked
            : styles.brotherClicked
          : null
      )}
    >
      {children}
    </div>
  );
};

export default SearchBox;
