// Payments slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  scheduledPayments: [],
};

const payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setScheduledPayments: (state, action) => {
      state.scheduledPayments = action.payload;
    },
    resetPayments: (state) => {
      state.payments = initialState.payments;
    },
  },
});

export const { setPayments, resetPayments, setScheduledPayments } =
  payments.actions;
export default payments.reducer;
