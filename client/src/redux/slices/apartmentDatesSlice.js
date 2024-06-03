import { createSlice } from "@reduxjs/toolkit";
import { getDatesBetween, rangeAfterCheckIn } from "../../../utils";
import { subDays } from "date-fns";

const initialState = {
  available: null,
  occupied: null,
  checkIn: null,
  checkOut: null,
  rangeMinDate: null,
  rangeMaxDate: null,
  excludeDates: null,
};
const fetchInitialData = (occupied) => {
  const allOccupiedDays = occupied.map((excludeRange) => {
    return getDatesBetween(
      excludeRange.rentingStartDate,
      excludeRange.rentingEndDate
    );
  });
  return allOccupiedDays.flat();
};

export const apartmentDatesSlice = createSlice({
  name: "apartmentDates",
  initialState,
  reducers: {
    initializeCalender: (state, action) => {
      const today = new Date();
      state.available = action.payload.available;
      state.occupied = action.payload.occupied;
      state.rangeMinDate =
        action.payload.available.rentingStartDate > today
          ? action.payload.available.rentingStartDate
          : today;
      state.rangeMaxDate = action.payload.available.rentingEndDate;
      state.excludeDates = fetchInitialData(action.payload.occupied);
    },
    updateStartDate: (state, action) => {
      state.checkIn = action.payload;
      state.rangeMaxDate = rangeAfterCheckIn(state.occupied, action.payload);
      state.rangeMinDate = action.payload;
    },
    updateEndDate: (state, action) => {
      state.checkOut = action.payload;
    },
    cleanCalender: (state, action) => {
      state.rangeMinDate = state.available.rentingStartDate;
      state.rangeMaxDate = state.available.rentingEndDate;
      state.excludeDates = fetchInitialData(state.occupied);
      state.checkIn = null;
      state.checkOut = null;
    },
  },
});

export const selectApartmentDates = (state) => state.apartmentDates;
export const {
  initializeCalender,
  cleanCalender,
  updateStartDate,
  updateEndDate,
} = apartmentDatesSlice.actions;

export default apartmentDatesSlice.reducer;
