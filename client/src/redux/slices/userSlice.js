import { createSlice } from "@reduxjs/toolkit";
import { isSetOnSession } from "../../../utils";

const initialState = {
userName:isSetOnSession("user")
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newSession: (state, action) => {
      state.userName=action.payload
    },
    outOfSession: (state, action) => {
      state.userName=null
      sessionStorage.removeItem("user");

    },
    

  },
});

export const selectUser= (state) => state.user;
export const {outOfSession,newSession} = userSlice.actions;

export default userSlice.reducer;
