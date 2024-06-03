import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import CheckInModel from "./CheckInModel";
import FilterModel from "./FilterModel";
import CheckOutModel from "./CheckOutModel";
import SearchAutoComplete from "./SearchAutoComplete ";

const styles = stylex.create({});
const SearchModel = ({ modelName,setClicked }) => {
  switch (modelName) {
    case "destination":
      return <SearchAutoComplete setClicked={setClicked}/>;
    case "checkIn":
      return <CheckInModel setClicked={setClicked}/>;
    case "checkOut":
      return <CheckOutModel setClicked={setClicked}/>
      break;
    case "filter":
      return <FilterModel setClicked={setClicked}/>;

    default:
      return  <></>
  }

};

export default SearchModel;
