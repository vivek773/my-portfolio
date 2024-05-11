// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: { },
});

// export const {  } = auth.actions;
export default auth.reducer;
