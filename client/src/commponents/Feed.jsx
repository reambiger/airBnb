import ApartmentsGrid from "./ApartmentsGrid";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const Feed = ({ apartmentsPages }) => {
  const apartmentsGrids = apartmentsPages.map((page) => page.apartments);
  return (
    <div>
      {apartmentsGrids.map((grid, i) => (
        <ApartmentsGrid key={i} apartmentsGrid={grid} />
      ))}
    </div>
  );
};

export default Feed;
