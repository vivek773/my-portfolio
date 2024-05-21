// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tenant_id: "",
  name: "",
  street: "",
  unit: "",
  city: "",
  state: "",
  zip_code: null,
  phone_number: null,
  primary_airport_code: "",
  emails: [],
  merchant_account_details: [],
  business_settings_for_customer: [],
  business_settings_for_employee: [],
};

const business = createSlice({
  name: "business",
  initialState,
  reducers: {
    setTenantId: (state, action) => {
      state.tenant_id = action.payload;
    },
    setBusinessName: (state, action) => {
      state.name = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setZipCode: (state, action) => {
      state.zip_code = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phone_number = action.payload;
    },
    setPrimaryAirportCode: (state, action) => {
      state.primary_airport_code = action.payload;
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
  },
});

export const {
  setTenantId,
  setBusinessName,
  setStreet,
  setUnit,
  setCity,
  setState,
  setZipCode,
  setPhoneNumber,
  setPrimaryAirportCode,
  setEmails,
  setMerchantAccountDetails,
  setBusinessSettingsForCustomer,
  setBusinessSettingsForEmployee,
} = business.actions;
export default business.reducer;
