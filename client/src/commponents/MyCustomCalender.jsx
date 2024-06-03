import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../css/calendar.css";
import { addDays, format } from "date-fns";
const today = ".react-datepicker__day--today";
const myClass = `.react-datepicker__day--in-range:hover  `;
const firstAndLastSelectedDates = `
.react-datepicker__day--keyboard-selected,
.react-datepicker__day--selected 

`;
const my = `.react-datepicker__day--in-selecting-range`;
const selectors = `
.react-datepicker__day--in-selecting-range:first-child,
.react-datepicker__day--in-selecting-range:last-child
`;

const MyCustomCalender = ({ minDate, relevantDispatch }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    relevantDispatch({ end, start });
  };
  return (
    <>
      <DatePicker
        inline
        calendarClassName={`calendar ,react-datepicker `}
        selected={startDate}
        onChange={onChange}
        minDate={minDate}
        dateFormat="MM/dd/yyyy "
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        shouldCloseOnSelect={false}
      />
    </>
  );
};

export default MyCustomCalender;
