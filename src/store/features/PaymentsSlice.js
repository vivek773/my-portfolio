// Payments slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: []
};

const payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    resetPayments: (state) => {
      state.payments = initialState.payments;
    },
  },
});

export const {
  setPayments,
  resetPayments,
} = payments.actions;
export default payments.reducer;
