import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  render: false,
};

export const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    renderFeed: (state, action) => {
      state.render=!state.render
    },
  },
});

export const selectRender = (state) => state.apartment.render;
export const {renderFeed} = apartmentSlice.actions;

export default apartmentSlice.reducer;
