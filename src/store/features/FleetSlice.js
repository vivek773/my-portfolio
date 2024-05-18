// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tail_number: "",
  details: null,
  maintenanceLogs: [],
  airworthinessDirectives: [],
};

const fleet = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    setFleetDetails: (state, action) => {
      state.details = action.payload;
    },
    setMaintenanceLogs: (state, action) => {
      state.maintenanceLogs = action.payload;
    },
    setAirworthinessDirectives: (state, action) => {
      state.airworthinessDirectives = action.payload;
    },
  },
});

export const { setFleetDetails, setMaintenanceLogs, setAirworthinessDirectives } = fleet.actions;
export default fleet.reducer;
