import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  container: {
    zIndex:-100
  },})
export default function StarRating({ value }) {
  return (
    <div {...stylex.props(styles.container)}>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating name="no-value" value={value} precision={0.1} />
      </Box>
    </div>
  );
}
