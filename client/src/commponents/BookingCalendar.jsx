import React, { useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "../css/bookingCalendar.css";
import { addDays, format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { selectBooking, updateBookingDate } from "../redux/slices/bookingSlice";
import {
  selectApartmentDates,
  updateEndDate,
  updateStartDate,
} from "../redux/slices/apartmentDatesSlice";
import { getDatesBetween, rangeAfterCheckIn } from "../../utils";

const range = "react-datepicker__day--highlighted-custom-1";

const select = "react-datepicker__day--highlighted-custom-2";

const BookingCalendar = ({ calendarClicked, setCalendarClicked }) => {
  const dispatch = useDispatch();
  const {
    checkIn,
    checkOut,

    rangeMinDate,
    rangeMaxDate,
    excludeDates,
  } = useSelector(selectApartmentDates);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = async (date) => {
    if (!checkIn && !checkOut) {
      await setCalendarClicked("checkOut");
      dispatch(updateStartDate(date));
    } else if (!checkIn) {
      await setCalendarClicked("checkOut");
    } else {
      dispatch(updateEndDate(date));
    }
  };
  const onlyDefine = (checkIn, checkOut) => {
    const define = [];
    checkIn && define.push(checkIn);
    checkOut && define.push(checkOut);
    return define;
  };
  const getRange = () => {
    const range = getDatesBetween(checkIn, checkOut);
    if (range.length > 2) {
      range.pop();
      range.shift();
      return range;
    }
    return [];
  };
  const highlightWithRanges = [
    {
      [select]: onlyDefine(checkIn, checkOut),
    },
    {
      [range]: getRange(checkIn, checkOut),
    },
  ];
  return (
    <>
      <DatePicker
        inline
        onChange={onChange}
        minDate={rangeMinDate}
        maxDate={rangeMaxDate}
        excludeDates={excludeDates}
        dateFormat="MM/dd/yyyy "
        monthsShown={2}
        shouldCloseOnSelect={false}
        highlightDates={highlightWithRanges}
      />
    </>
  );
};

export default BookingCalendar;
