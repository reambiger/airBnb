import { configureStore } from "@reduxjs/toolkit";
import apartmentReducer from "./slices/apartmentSlice";
import apartmentDatesReducer from "./slices/apartmentDatesSlice";
import filterReducer from "./slices/filterSlice";
import datesReducer from "./slices/datesSlice";
import bookingReducer from "./slices/bookingSlice";
import midScreenReducer from "./slices/midScreenSlice";
import userReducer from "./slices/userSlice";
import uploadCondoReducer from "./slices/uploadCondoSlice";
export const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
    apartmentDates: apartmentDatesReducer,
    filter: filterReducer,
    dates: datesReducer,
    booking: bookingReducer,
    midScreen: midScreenReducer,
    user: userReducer,
    uploadCondo: uploadCondoReducer,
  },
});
