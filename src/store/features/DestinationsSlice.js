// Destinations slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: []
};

const destinations = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
    resetDestinations: (state) => {
      state.destinations = initialState.destinations;
    },
  },
});

export const {
  setDestinations,
  resetDestinations,
} = destinations.actions;
export default destinations.reducer;
