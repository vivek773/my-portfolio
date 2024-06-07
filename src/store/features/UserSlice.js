// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: [],
};

const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
    resetUser: (state) => {
      state.User = initialState.User;
    },
  },
});

export const { setUser, resetUser } = User.actions;
export default User.reducer;
