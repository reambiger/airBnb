import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import RenderRelevantDeploymentComponentBySteps from "./RenderRelevantDeploymentComponentBySteps";
const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
    minHeight: "110vh",
    width: "100vw",
    margin: "0 auto",
    padding: "0",
    fontFamily: "Heebo', sans-serif",
    marginTop: "35vh",
  },
});
const CondoDeploymentPage = () => {
  return (
    <div {...stylex.props(styles.page)}>
      <RenderRelevantDeploymentComponentBySteps />
    </div>
  );
};

export default CondoDeploymentPage;
