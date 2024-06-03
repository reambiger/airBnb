import React from "react";
import { useSelector } from "react-redux";
import { selectDates } from "../redux/slices/datesSlice";
import { selectFilter } from "../redux/slices/filterSlice";
import { format } from "date-fns";
import { formatStringForBackEnd } from "../../utils";

const useApiFactory = () => {
  const dates = useSelector(selectDates);
  const filters = useSelector(selectFilter);
  const apiBuilder = (name, type) => {
    let apiRequest = `http://localhost:8000/search?destination[name]=${name}&destination[type]=${type}`;
    const { filterMethod, priceRange, rooms, amanitas,gusts } = filters;
    const { checkIn, checkOut } = dates;
    apiRequest += filterMethod ? stringFilterMethod(filterMethod) : "";
    apiRequest +=
      priceRange.low || priceRange.high ? stringPriceRange(priceRange) : "";
    apiRequest += rooms>0 ? stringRooms(rooms) : "";
    apiRequest += gusts>0 ? stringGusts(gusts) : "";
    apiRequest += amanitas.length > 0 ? stringAmanitas(amanitas) : "";
    apiRequest +=
      checkIn.start && checkIn.end ? stringDates(checkIn, "checkInRange") : "";
    apiRequest +=
      checkOut.start && checkOut.end ? stringDates(checkOut, "checkOutRange") : "";

    return apiRequest;
  };

  return { apiBuilder };
};

const stringFilterMethod = (filterMethod) => {
  return `&filterMethod=${filterMethod}`;
};
const stringRooms = (rooms) => {
  return `&rooms=${rooms}`;
};
const stringGusts = (gusts) => {
  return `&gusts=${gusts}`;
};
const stringAmanitas = (amanitas) => {
  let amanitasString = "";
  amanitas.forEach((amenity) => {
    amanitasString = amanitasString + `&amanitas=${amenity}`;
  });
  return amanitasString;
};
const stringPriceRange = (priceRange) => {
  return `&priceRange[low]=${priceRange.low}&priceRange[high]=${priceRange.high}&`;
};
export default useApiFactory;

const stringDates = (range, name) => {
  const { start, end } = range;
  // return `&dates${[range]}=${start}&&dates${[range]}=${end}`;
  const formatedStart = formatStringForBackEnd(start);
  const formatedEnd = formatStringForBackEnd(end);
  return `&dates[${name}]=${formatedStart}&&dates[${name}]=${formatedEnd}`;
};

