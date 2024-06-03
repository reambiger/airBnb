import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useDispatch, useSelector } from "react-redux";
import { fuseAutoComplete } from "../../utils/fuse";
import { selectFilter, setDestination } from "../redux/slices/filterSlice";
import { CiLocationOn } from "react-icons/ci";
const styles = stylex.create({
  autoComplete: {
    position: "relative",
    left: "200px",
    minHeight: "0",
    width: "300px",
    border: `2px solid ${colors.myGray}`,
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white",
    zIndex: 100,
    boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-7vh",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    backgroundColor: { default: "white", ":hover": colors.myGray },
    alignItems: "center",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderBottom: `1px solid ${colors.myGray}`,
  },
  icon: {
    fontSize: "xx-large",
    backgroundColor: "rgb(221,221,221)",
    // height:"8vh",
    // width:"8vh",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    textAlign: "center",
    textJustify: "center",
    paddingVertical: "1.2vh",
    paddingHorizontal: "2vh",
    marginRight: "10%",
  },
});
const SearchAutoComplete = ({setClicked}) => {
  const selectDestination = useSelector(selectFilter).destinationValue;
  const [autoCompleteList, setAutoCompleteList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setAutoCompleteList(fuseAutoComplete(selectDestination));
  }, [selectDestination]);
  const setValue = (name) => {
    dispatch(setDestination(name));
    setClicked(null)
  };
  if (autoCompleteList.length===0) {
    return <></>
  }
  return (
    <div {...stylex.props(styles.autoComplete)}>
      {autoCompleteList.map((item) => (
        <div
          {...stylex.props(styles.location)}
          key={item.name}
          onClick={() => setValue(item.name)}
        >
          <LocationIcon />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const LocationIcon = () => {
  return (
    <span {...stylex.props(styles.icon)}>
      <CiLocationOn />
    </span>
  );
};
export default SearchAutoComplete;
