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
    setTailNumber: (state, action) => {
      state.tail_number = action.payload
    },
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

export const { setTailNumber, setFleetDetails, setMaintenanceLogs, setAirworthinessDirectives } = fleet.actions;
export default fleet.reducer;
