import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAmenity, setAmanitas } from "../redux/slices/filterSlice";
import FormButton from "./FormButton";

const FilterButton = ({ children, amenity }) => {
  const Amenity = useSelector(selectAmenity);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const customOnClick = (amenity) => {
    const some = () => {
      dispatch(setAmanitas(amenity));
      setClicked(!clicked);
    };
    return some;
  };

  return (
    <FormButton
      clicked={clicked}
      onClick={customOnClick(amenity)}
      clickedByDefault={Amenity.includes(amenity)}
    >
      {children}
    </FormButton>
  );
};

export default FilterButton;
