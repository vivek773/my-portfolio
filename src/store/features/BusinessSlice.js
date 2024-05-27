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
  tax: null,
  emails: [],
  merchant_account_details: [],
  business_settings_for_customer: [],
  business_settings_for_employee: [],
};

const business = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessDetails: (state, action) => {
      state.business_details = action.payload;
    },
    setTax: (state, action) => { 
      state.tax = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setMerchantAccountDetails: (state, action) => {
      state.merchant_account_details = action.payload;
    },
    setBusinessSettingsForCustomer: (state, action) => {
      state.business_settings_for_customer = action.payload;
    },
    setBusinessSettingsForEmployee: (state, action) => {
      state.business_settings_for_employee = action.payload;
    },
    resetBusiness: (state) => {
      state.business_details = initialState.business_details;
      state.emails = initialState.emails;
      state.merchant_account_details = initialState.merchant_account_details;
      state.business_settings_for_customer =
        initialState.business_settings_for_customer;
      state.business_settings_for_employee =
        initialState.business_settings_for_employee;
    },
  },
});

export const {
  setBusinessDetails,
  setTax,
  setEmails,
  setMerchantAccountDetails,
  setBusinessSettingsForCustomer,
  setBusinessSettingsForEmployee,
  resetBusiness,
} = business.actions;
export default business.reducer;
