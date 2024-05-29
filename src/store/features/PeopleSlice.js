// People slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: []
};

const people = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    resetPeople: (state) => {
      state.people = initialState.people;
    },
  },
});

export const {
  setPeople,
  resetPeople,
} = people.actions;
export default people.reducer;
