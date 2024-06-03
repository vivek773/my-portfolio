// Payments slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  pendingPayments:[]
};

const payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setPendingPayments: (state, action) => {
      state.pendingPayments = action.payload;
    },
    resetPayments: (state) => {
      state.payments = initialState.payments;
    },
  },
});

export const {
  setPayments,
  resetPayments,
  setPendingPayments
} = payments.actions;
export default payments.reducer;
