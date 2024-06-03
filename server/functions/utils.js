const { faker } = require("@faker-js/faker");
const { isEqual } = require("date-fns");
const { addDays } = require("date-fns");
const { format, isBefore } = require("date-fns");
const generateRandomBooleanValues = () => {
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  arr = [];
  for (let index = 0; index < randomNumber; index++) {
    arr.push({
      beds: {
        isKingSize: faker.datatype.boolean(0.7),
      },
    });
  }
  const result = {
    rooms: arr,
    bathroom: {
      bathtub: faker.datatype.boolean(0.7),
      hairdryer: faker.datatype.boolean(0.7),
      cleaningProducts: faker.datatype.boolean(0.7),
      hotWater: faker.datatype.boolean(0.7),
    },
    laundry: {
      washer: faker.datatype.boolean(0.7),
      essentials: faker.datatype.boolean(0.7),
      hangers: faker.datatype.boolean(0.7),
      iron: faker.datatype.boolean(0.7),
      dryingRack: faker.datatype.boolean(0.7),
    },
    entertainment: {
      TV: faker.datatype.boolean(0.7),
      hotTub: faker.datatype.boolean(0.7),
      pingPong: faker.datatype.boolean(0.7),
      snooker: faker.datatype.boolean(0.7),
    },
    family: {
      crib: faker.datatype.boolean(0.7),
      highChair: faker.datatype.boolean(0.7),
    },
    internetAndOffice: {
      wifi: faker.datatype.boolean(0.7),
      dedicatedWorkspace: faker.datatype.boolean(0.7),
    },
    kitchenAndDining: {
      kitchen: faker.datatype.boolean(0.7),
      refrigerator: faker.datatype.boolean(0.7),
      microwave: faker.datatype.boolean(0.7),
      dishes: faker.datatype.boolean(0.7),
      gasStove: faker.datatype.boolean(0.7),
      oven: faker.datatype.boolean(0.7),
      coffeeMaker: faker.datatype.boolean(0.7),
      diningTable: faker.datatype.boolean(0.7),
    },
    parkingAndFacilities: {
      elevator: faker.datatype.boolean(0.7),
      parking: faker.datatype.boolean(0.7),
    },
  };

  return result;
};
const findMostVisitedDestination = (
  visitedDestinations,
  visits,
  destination
) => {
  return visitedDestinations.length === 0
    ? destination
    : visits < visitedDestinations[0].visits
      ? findMostVisitedDestination(
          visitedDestinations.slice(1),
          visitedDestinations[0].visits,
          visitedDestinations[0].destination
        )
      : findMostVisitedDestination(
          visitedDestinations.slice(1),
          visits,
          destination
        );
};

const objectsDriller = (obj, obj2) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      objectsDriller(value, obj2);
    } else {
      obj2[key] = value;
    }
  }

  return obj2;
};
function sanitizeInput(input) {
  return input.replace(/\n/g, "");
}
const isDateBetween = (rentingStartDate, rentingEndDate, checkedDate) => {
  if (
    (isBefore(checkedDate, rentingEndDate) ||
      isEqual(checkedDate, rentingEndDate)) &&
    (isBefore(rentingStartDate, checkedDate) ||
      isEqual(rentingStartDate, checkedDate))
  ) {
    return true;
  }
  return false;
};

const randomInt = (small, big) => {
  const randomNumber = Math.floor(Math.random() * (big - small + 1)) + small;
  return randomNumber;
};
const returnGustsAllowed = (rooms) => {
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
const convertStringToDates = (str) => {
  const dateArr = str.split("/");
  let date = new Date("2001-07-14");

  return date;
};

const handleOccupationForBooking = (startDate, endDate, occupationRange) => {
  const datesArr = getDatesBetween(startDate, endDate);
  if (
    occupationRange.some((occupied) =>
      checkIfRangeIncludeInRange(occupied, datesArr)
    )
  ) {
    return false;
  }
  return true;
};

const checkIfRangeIncludeInRange = (referenceRange, checkedRange) => {
  
  return checkedRange.some((checkDate) => {
    if (
      isDateBetween(
        referenceRange.rentingStartDate,
        referenceRange.rentingEndDate,
        checkDate
      )
    ) {
      return true;
    }
  });
};
const handleAvailabilityRangeForBooking = (available, startDate, endDate) => {
  if (
    !isDateBetween(
      available.rentingStartDate,
      available.rentingEndDate,
      startDate
    ) ||
    !isDateBetween(
      available.rentingStartDate,
      available.rentingEndDate,
      endDate
    )
  ) {
    return false;
  }
  return true;
};
const isApartmentAvailable = (apartment, checkInRange, checkOutRange) => {
  const { available, occupied } = apartment;
  if (
    !isUserRangeInApartmentRange(
      checkInRange,
      available.rentingStartDate,
      available.rentingEndDate
    ) ||
    !isUserRangeInApartmentRange(
      checkOutRange,
      available.rentingStartDate,
      available.rentingEndDate
    )
  ) {
    return false;
  }
  return occupied.some((occupationRange) => {
    return isApartmentOccupiedInRange(
      occupationRange,
      checkInRange,
      checkOutRange
    );
  });
};
const isApartmentOccupiedInRange = (occupied, checkInRange, checkOutRange) => {
  if (
    isDateBetween(
      checkInRange[1],
      checkOutRange[0],
      occupied.rentingStartDate
    ) ||
    isDateBetween(checkInRange[1], checkOutRange[0], occupied.rentingEndDate)
  ) {
    // If there's an overlap, the apartment is occupied, so return false
    return false;
  }

  // If there's no overlap, the apartment is available, so return true
  return true;
};

const isUserRangeInApartmentRange = (
  userRange,
  rentingStartDate,
  rentingEndDate
) => {
  if (isDateBetween(rentingStartDate, rentingEndDate, userRange[0])) {
    return true;
  }
  if (isDateBetween(rentingStartDate, rentingEndDate, userRange[1])) {
    return true;
  }
  const hydratedRange = getDatesBetween(userRange[0], userRange[1]);
  const isDateInRangeRentingRange = myDateBetweenConstructor(
    rentingStartDate,
    rentingEndDate
  );
  if (searchCallbackOnSortedData(hydratedRange, isDateInRangeRentingRange)) {
    return true;
  }
  return false;
};
const myDateBetweenConstructor = (rentingStartDate, rentingEndDate) => {
  const myDateBetween = (date) => {
    return isDateBetween(rentingStartDate, rentingEndDate, date);
  };
  return myDateBetween;
};
const searchCallbackOnSortedData = (arr, callBack) => {
  if (arr.length > 1) {
    const midIndex = Math.floor(arr.length / 2);

    const firstHalf = arr.slice(0, midIndex);
    const secondHalf = arr.slice(midIndex);
    return (
      searchCallbackOnSortedData(firstHalf, callBack) ||
      searchCallbackOnSortedData(secondHalf, callBack)
    );
  } else {
    if (callBack(arr[0])) {
      return true;
    }
    return false;
  }
};

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;

  while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

function convertAndCheckDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
}
function convertAndValidateDates(checkInRange, checkOutRange) {
  let convertedCheckIn = [];
  try {
    convertedCheckIn = checkInRange.map(convertAndCheckDate);
  } catch (error) {
    return { error: `Error converting check-in dates: ${error.message}` };
  }

  let convertedCheckOut = [];
  try {
    convertedCheckOut = checkOutRange.map(convertAndCheckDate);
  } catch (error) {
    return { error: `Error converting check-out dates: ${error.message}` };
  }

  for (let i = 0; i < convertedCheckOut.length; i++) {
    if (convertedCheckOut[i] < convertedCheckIn[i]) {
      return {
        error: `Check-out date ${convertedCheckOut[i]} precedes check-in date ${convertedCheckIn[i]}`,
      };
    }
  }
  return { convertedCheckIn, convertedCheckOut };
}

module.exports = {
  generateRandomBooleanValues,
  findMostVisitedDestination,
  objectsDriller,
  sanitizeInput,
  isDateBetween,
  randomInt,
  returnGustsAllowed,
  convertStringToDates,
  isApartmentAvailable,
  isApartmentOccupiedInRange,
  isUserRangeInApartmentRange,
  myDateBetweenConstructor,
  searchCallbackOnSortedData,
  getDatesBetween,
  convertAndValidateDates,
  convertAndCheckDate,
  handleOccupationForBooking,
  handleAvailabilityRangeForBooking,
};
