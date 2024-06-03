import React from 'react'

const UseUploadCondo = () => {
    const dates = useSelector(selectDates);
    const filters = useSelector(selectFilter);
    const CondoApiBuilder = () => {
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
  
    return { CondoApiBuilder };
  };

export default UseUploadCondo