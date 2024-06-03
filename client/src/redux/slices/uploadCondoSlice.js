import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: null,
  kindOfSpace:null
};

export const uploadCondoSlice = createSlice({
  name: "uploadCondo",
  initialState,
  reducers: {
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setKindOfSpace: (state, action) => {
      state.kindOfSpace = action.payload;
    },
  },
});

export const selectUploadCondo = (state) => state.uploadCondo;
export const { setDescription ,setKindOfSpace} = uploadCondoSlice.actions;

export default uploadCondoSlice.reducer;
