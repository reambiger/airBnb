import {
  addDays,
  isBefore,
  isAfter,
  isEqual,
  compareAsc,
  format,
  getYear,
  differenceInYears,
  differenceInMonths,
  getDate,
} from "date-fns";
export const objectsDriller = (obj, obj2) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      objectsDriller(value, obj2);
    } else {
      obj2[key] = value;
    }
  }

  return obj2;
};
export const formatMyString = (str) => {
  let index = 0;
  const UpperCaseIndex = findUpperCaseLetters(str);
  const strArray = str.split("");
  for (const upperCase of UpperCaseIndex) {
    strArray.splice(upperCase + index, 0, " ");
    index++;
  }
  strArray.join("");
  strArray[0] = strArray[0].toUpperCase();
  return strArray;
};

function findUpperCaseLetters(str) {
  var upperCaseIndices = str.split("").reduce((acc, char, index) => {
    if (char === char.toUpperCase()) {
      acc.push(index);
    }
    return acc;
  }, []);
  return upperCaseIndices;
}

export function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;

  while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

export const rangeAfterCheckIn = (occupiedRanges, checkIn) => {
  const occupationStart = occupiedRanges
    .map((occupied) => occupied.rentingStartDate)
    .sort(compareAsc);
  const newLastDate = occupationStart.find((startDate) =>
    isBefore(checkIn, startDate)
  );
  return newLastDate;
};

export const addComasInNumbers = (number) => {
  const string = number.toString().split("");
  for (let index = string.length - 3; index > 0; index = index - 3) {
    string[index] = "," + string[index];
  }

  return string.join("");
};
export const returnGustsAllowed = (rooms) => {
  const numOfGuests = rooms.reduce((accumulator, currentRoom) => {
    return accumulator + sumBedsInARoom(currentRoom);
  }, 0);

  return numOfGuests;
  function sumBedsInARoom(room) {
    const numBeds = room.beds.reduce((accumulator, currentBed) => {
      return accumulator + bedsIsKingSize(currentBed);
    }, 0);
    return numBeds;
  }
  function bedsIsKingSize(bed) {
    return bed.isKingSize === true ? 2 : 1;
  }
};

export const formatStringForBackEnd = (date) => {
  return format(date, "yyyy-MM-dd").replace(/\//g, "-");
};

export const convertStringToDate = (dateString) => {
  const dateObject = new Date(dateString);

  return dateObject;
};

export const isSetOnSession = (key) => {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : null;
};

export const formatUnderScore = (str) => {
  const arr = str.split("_");

  return arr
    .map((word, key) => {
      if (key > 0) {
        return " " + word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join("");
};

export const myCommonDatesFormat = (range) => {
  if (range.start && range.end) {
    const checkInYear = getYear(range.start);
    const checkOutYear = getYear(range.end);

    if (differenceInYears(range.start, range.end) === 0) {
      if (differenceInMonths(range.start, range.end) === 0) {
        return `${getDate(range.start)} -${getDate(range.end)} ${format(range.start, "MMMM")} ${checkInYear}`;
      }
      return `${getDate(range.start)}${format(range.start, "MMMM")}-${getDate(range.end)}${format(range.end, "MMMM")} ${checkInYear}`;
    } else {
      return `${getDate(range.start)}${format(range.start, "MMMM")} ${checkInYear}-${getDate(range.end)}${format(range.end, "MMMM")} ${checkOutYear}`;
    }
  }
  return "Add days";
};

export const relevantDatesPrasnatition = (bookingData) => {
  const checkInYear = getYear(bookingData.checkIn);
  const checkOutYear = getYear(bookingData.checkOut);

  if (differenceInYears(bookingData.checkIn, bookingData.checkOut) === 0) {
    if (differenceInMonths(bookingData.checkIn, bookingData.checkOut) === 0) {
      return `${getDate(bookingData.checkIn)}-${getDate(bookingData.checkOut)} ${format(
        bookingData.checkIn,
        "MMMM"
      )} ${checkInYear}`;
    }
    return `${getDate(bookingData.checkIn)}${format(bookingData.checkIn, "MMMM")}-${getDate(bookingData.checkOut)}${format(bookingData.checkOut, "MMMM")} ${checkInYear}`;
  } else {
    return `${getDate(bookingData.checkIn)}${format(bookingData.checkIn, "MMMM")} ${checkInYear}-${getDate(bookingData.checkOut)}${format(bookingData.checkOut, "MMMM")} ${checkOutYear}`;
  }
};
