// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUser } = user.actions;
export default user.reducer;
