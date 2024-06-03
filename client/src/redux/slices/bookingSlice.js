import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gusts: {
    adults: 0,
    children: 0,
    infants: 0,
    overall: 0,
  },
  pricing: { nightPrice: null, numDays: null, total: null },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateGusts: (state, action) => {
      state.gusts = action.payload;
    },
    incrementGusts: (state, action) => {
      state.gusts[action.payload]++;
      state.gusts.overall++;
    },
    decrementGusts: (state, action) => {
      state.gusts[action.payload]--;
      state.gusts.overall--;
    },
    setPrice: (state, action) => {
      state.pricing = action.payload;
    },
    restoreState: (state, action) => {
      state = action.payload;
    },
  },
});

export const {
  deleteBookingDates,
  updateBookingDate,
  decrementGusts,
  incrementGusts,
  setPrice,
  restoreState,
} = bookingSlice.actions;

export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;
