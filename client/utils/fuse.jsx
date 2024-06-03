import Fuse from "fuse.js";
import dictionaryJson from "../data/dictionary.json";
import { formatUnderScore } from "../utils";

const fuseOptions = {
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};
const formattedForFrontEnd = dictionaryJson.map((destination) => {
  return { name: formatUnderScore(destination.name), type: destination.type };
});
const fuse = new Fuse(dictionaryJson, fuseOptions);
const frontFuse = new Fuse(formattedForFrontEnd, fuseOptions);

const fuseDestination = (name) => {
  if (
    fuse.search(name).length > 0 &&
    (fuse.search(name)[0].score < 0.4 ||
      typeof fuse.search(name)[0].score === "string")
  ) {
    return fuse.search(name)[0].item;
  }
  return null;
};
export const fuseAutoComplete = (name) => {
  if (name && frontFuse.search(name).length > 0) {
    return frontFuse
      .search(name)
      .filter((destination) => myFuseStandard(destination))
      .splice(0, 4)
      .map((destination) => {
        return { name: destination.item.name, type: destination.item.type };
      });
  }
  return [];
};

const myFuseStandard = (destination) => {
  if (destination.score < 0.4 || typeof destination.score === "string") {
    return true;
  }
  return false;
};

export default fuseDestination;
