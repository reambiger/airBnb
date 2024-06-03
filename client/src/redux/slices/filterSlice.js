import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterMethod: null,
  priceRange: { low: null, high: null },
  rooms: 0,
  gusts:0,
  amanitas: [],
  destinationValue:null,
  destination:{type:null,name:null}
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterMethod: (state, action) => {
      if (state.filterMethod !== action.payload) {
        state.filterMethod = action.payload;
      } else {
        state.filterMethod = null;
      }
    },
    setLowPrice: (state, action) => {
      state.priceRange.low = action.payload;
    },
    setHighPrice: (state, action) => {
      state.priceRange.high = action.payload;
    },
    setDestination: (state, action) => {
      state.destinationValue = action.payload;
    },
    // setDestination: (state, action) => {
    //   state.destination = action.payload.name;
    //   state.destination = action.payload.type;
    // },
    decrementRooms: (state, action) => {
      if (state.rooms > 0) {
        state.rooms = state.rooms - 1;
      }
    },
    incrementRooms: (state, action) => {
      state.rooms = state.rooms + 1;
    },
    decrementGusts: (state, action) => {
      if (state.gusts > 0) {
        state.gusts = state.gusts - 1;
      }
    },
    incrementGusts: (state, action) => {
      state.gusts = state.gusts + 1;
    },

    setAmanitas: (state, action) => {
      const amanitas = state.amanitas;
      const wantedAmenity = action.payload;
      const index = amanitas.findIndex((Amenity) => Amenity === wantedAmenity);
      if (index === -1) {
        amanitas.push(wantedAmenity);
      } else {
        amanitas.splice(index, 1);
      }
      state.amanitas = amanitas;
    },
  },
});

export const {
  setFilterMethod,
  setLowPrice,
  setHighPrice,
  decrementRooms,
  incrementRooms,
  setAmanitas,
  decrementGusts,
  incrementGusts,
  setDestination
} = filterSlice.actions;

export const selectFilter = (state) => state.filter;
export const selectAmenity = (state) => state.filter.amanitas;

export default filterSlice.reducer;
