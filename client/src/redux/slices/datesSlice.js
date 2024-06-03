import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkIn: { start: null, end: null },
  checkOut: { start: null, end: null },
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    updateCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
  },
});

export const { updateCheckOut, updateCheckIn } = datesSlice.actions;

export const selectDates = (state) => state.dates;

export default datesSlice.reducer;
