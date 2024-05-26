// Bookings slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: []
};

const bookings = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    resetBookings: (state) => {
      state.bookings = initialState.bookings;
    },
  },
});

export const {
  setBookings,
  resetBookings,
} = bookings.actions;
export default bookings.reducer;
