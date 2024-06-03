import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  MainImg: {
    height: "70vh",
    width: "60%",
    borderBottomLeftRadius: "20px",
    borderTopLeftRadius: "20px",
  },
  imgGrid: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    gap: "10px",
    height: "73vh",
  },
  regImgs: {
    height: "34vh",
    width: "100%",
    
  },
  secondariesImgs: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridTemplateRows: "repeat(2,1fr)",
    columnGap: "2%",
    height: "100%",
  },
  leftBottom: {},
  leftTop: {},
  rightTop: {
    borderTopRightRadius: "30px",
  },
  rightBottom: { borderBottomRightRadius: "30px" },
});
const ImagesGrid = ({ imgs }) => {
  return (
    <div {...stylex.props(styles.imgGrid)}>
      <img {...stylex.props(styles.MainImg)} src={imgs.mainImg} />
      <div {...stylex.props(styles.secondariesImgs)}>
        <img
          {...stylex.props(styles.regImgs, styles.leftTop)}
          src={imgs.regularImgs[0]}
        />
        <img
          {...stylex.props(styles.regImgs, styles.rightTop)}
          src={imgs.regularImgs[1]}
        />
        <img
          {...stylex.props(styles.regImgs, styles.leftBottom)}
          src={imgs.regularImgs[2]}
        />
        <img
          {...stylex.props(styles.regImgs, styles.rightBottom)}
          src={imgs.regularImgs[3]}
        />
      </div>
    </div>
  );
};

export default ImagesGrid;
