import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: null,
  
  error:null
};

export const midScreenSlice = createSlice({
  name: "midScreen",
  initialState,
  reducers: {
    showMidScreenModel: (state,action) => {
      state.show=action.payload
    },
    closeMidScreenModel: (state, action) => {
      state.show=false
      state.error=null
    },
    setError: (state, action) => {
      state.show=!state.show
      state.error=action.payload
    },
  },
});

export const selectMidScreenModel = (state) => state.midScreen;
export const {showMidScreenModel,setError,closeMidScreenModel} = midScreenSlice.actions;

export default midScreenSlice.reducer;
