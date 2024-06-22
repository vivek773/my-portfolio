// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business_details: {
    name: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip_code: null,
    phone_number: null,
    primary_airport_code: "",
  },
  tax_rate: null,
  emails: [],
  merchant_account_details: [],
  business_settings: [],
};

const business = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessDetails: (state, action) => {
      state.business_details = action.payload;
    },
    setTax: (state, action) => {
      state.tax_rate = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setMerchantAccountDetails: (state, action) => {
      state.merchant_account_details = action.payload;
    },
    setBusinessSettings: (state, action) => {
      state.business_settings = action.payload;
    },

    resetBusiness: (state) => {
      state.business_details = initialState.business_details;
      state.emails = initialState.emails;
      state.merchant_account_details = initialState.merchant_account_details;
      state.business_settings = initialState.business_settings;
      state.business_settings = initialState.business_settings;
    },
  },
});

export const {
  setBusinessDetails,
  setTax,
  setEmails,
  setMerchantAccountDetails,
  setBusinessSettings,

  resetBusiness,
} = business.actions;
export default business.reducer;
