import React, { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import fuseDestination from "../../utils/fuse";
import { useQueryClient } from "@tanstack/react-query";
import SearchModel from "../commponents/SearchModel";
import useApiFactory from "../customHooks/useApiFactory";
import SearchBox from "../commponents/SearchBox";
import { useLocation, useNavigate } from "react-router-dom";
import MidScreenModel from "../commponents/MidScreenModel";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/slices/midScreenSlice";
import { selectDates } from "../redux/slices/datesSlice";
import {
  differenceInMonths,
  differenceInYears,
  format,
  getDate,
  getYear,
} from "date-fns";
import { selectFilter, setDestination } from "../redux/slices/filterSlice";
import { myCommonDatesFormat } from "../../utils";
const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    paddingBottom: "10vh",
  },
  searchField: {
    display: "flex",
    flexDirection: "row",
    width: "70vw",
    height: "12vh",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    border: `2px solid ${colors.border}`,
    backgroundColor: "white",
    borderRadius: "30px",
  },

  elliptic: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  inputField: {
    border: "none",
    outline: "none",
    color: { default: "black", "::placeholder": "black" },
    fontSize: "large",
  },

  borderSpan: {
    width: "2px",
    height: "80%",
    backgroundColor: colors.myGray,
    marginTop: "0.5%",
  },
  button: {
    backgroundColor: colors.bold,
    width: "8%",
    height: "70%",
    fontSize: "xx-large",
    color: "white",
    margin: "5px",
    border: 0,
    alignSelf: "center",
    justifySelf: "center",
    borderTopLeftRadius: "27px",
    borderTopRightRadius: "27px",
    borderBottomRightRadius: "27px",
    borderBottomLeftRadius: "27px",
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
});

const SearchBar = () => {
  const { apiBuilder } = useApiFactory();
  const [clicked, setClicked] = useState(null);
  const { handleSubmit, register, watch } = useForm();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkIn, checkOut } = useSelector(selectDates);
  const inputData = useSelector(selectFilter).destinationValue;
  const destinationValue = watch("destination");
  useEffect(() => {
    dispatch(setDestination(destinationValue));
  }, [destinationValue, dispatch]);
  
  const onSearch = async (data) => {
    try {
      const { name, type } = fuseDestination(data.destination);
      sessionStorage.setItem("apiRequest", apiBuilder(name, type));
      setClicked(null);

      await queryClient.resetQueries({
        queryKey: ["apartments", "infinite"],
        exact: true,
      });
      if (location.pathname !== "/") {
        navigate("/");
      }
    } catch (error) {
      dispatch(
        setError(`could not find a destination named ${data.destination}`)
      );
    }
  };
  // add a search by gusts place also in the backend
  return (
    <>
      <div {...stylex.props(styles.container)}>
        <form
          {...stylex.props(
            styles.searchField,
            clicked && styles.childWasClicked
          )}
          onSubmit={handleSubmit(onSearch)}
        >
          <SearchBox
            setClicked={setClicked}
            clicked={clicked}
            id={"destination"}
          >
            <div>where</div>
            <input
              value={inputData ? inputData : ""}
              autoComplete="off"
              {...register("destination")}
              {...stylex.props(
                styles.inputField,
                clicked
                  ? clicked === "destination"
                    ? styles.clicked
                    : styles.brotherClicked
                  : null
              )}
              placeholder="search destination"
            />
          </SearchBox>

          <span {...stylex.props(styles.borderSpan, styles.elliptic)}></span>
          <SearchBox setClicked={setClicked} clicked={clicked} id={"checkIn"}>
            <div>check in</div>
            <div>{myCommonDatesFormat(checkIn)}</div>
          </SearchBox>
          <span {...stylex.props(styles.borderSpan, styles.elliptic)}></span>
          <SearchBox setClicked={setClicked} clicked={clicked} id={"checkOut"}>
            <div>check out</div>
            <div>{myCommonDatesFormat(checkOut)}</div>
          </SearchBox>
          <span {...stylex.props(styles.borderSpan)}></span>
          <SearchBox setClicked={setClicked} clicked={clicked} id={"filter"}>
            <div>filter</div>
          </SearchBox>
          <button {...stylex.props(styles.button)} type="submit">
            <CiSearch />
          </button>
        </form>
      </div>
      {clicked && <SearchModel setClicked={setClicked} modelName={clicked} />}
    </>
  );
};

export default SearchBar;
