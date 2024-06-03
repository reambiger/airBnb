import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import cameraImg from "../../src/assets/air-bnb-camra-img.png";
import FileDragAndDrop from "./FileDragAndDrop";
const styles = stylex.create({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "40vw",
    height: "30vw",
    backgroundColor: colors.myGray,
    borderBottomLeftRadius: "10px",

    borderTopLeftRadius: "10px",

    borderTopRightRadius: "10px",

    borderBottomRightRadius: "10px",
  },
});
const CondoPhotoDragger = () => {
  return (
    <FileDragAndDrop>
      <div {...stylex.props(styles.box)}>
        <img src={cameraImg} />
      </div>
    </FileDragAndDrop>
  );
};

export default CondoPhotoDragger;
