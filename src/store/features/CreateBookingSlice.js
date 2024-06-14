import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTripDetails: {
    tripType: "",
    departureAirport: "",
    arrivalAirport: "",
    departureDate: null,
    departureTime: "",
    returnDate: null,
    returnTime: "",
  },
  offerPriceResponse: {},
  selectedPlaneDetails: {
    selectedPlaneTailNumber: "",
    basePrice: 0,
    tax: 0,
    totalBookingPrice: 0,
    totalDueNow: 0,
    dueLaterAmount: 0,
    dueLaterDate: "",
  },
  customerDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "",
    phoneNumber: "",
    nationality: "",
    passportNumber: "",
    passportExpiration: "",
    gender: "",
  },
  totalNumberOfPassengers: 1,
  passengerDetails: [],
  loading: false,
};

const createBookingSlice = createSlice({
  name: "createBooking",
  initialState,
  reducers: {
    setSearchTripDetails: (state, action) => {
      state.searchTripDetails = {
        ...state.searchTripDetails,
        ...action.payload,
      };
    },
    setOfferPriceResponse: (state, action) => {
      state.offerPriceResponse = action.payload;
    },
    setSelectedPlaneTailNumber: (state, action) => {
      state.selectedPlaneDetails.selectedPlaneTailNumber = action.payload;
    },
    setBasePrice: (state, action) => {
      state.selectedPlaneDetails.basePrice = action.payload;
    },
    setTax: (state, action) => {
      state.selectedPlaneDetails.tax = action.payload;
    },
    setTotalBookingPrice: (state, action) => {
      state.selectedPlaneDetails.totalBookingPrice = action.payload;
    },
    setTotalDueNow: (state, action) => {
      state.selectedPlaneDetails.totalDueNow = action.payload;
    },
    setDueLaterAmount: (state, action) => {
      state.selectedPlaneDetails.dueLaterAmount = action.payload;
    },
    setDueLaterDate: (state, action) => {
      state.selectedPlaneDetails.dueLaterDate = action.payload;
    },
    setCustomerDetails: (state, action) => {
      state.customerDetails = { ...state.customerDetails, ...action.payload };
    },
    setTotalNumberOfPassengers: (state, action) => {
      state.totalNumberOfPassengers = action.payload;
    },
    addPassengerDetails: (state, action) => {
      state.passengerDetails.push(action.payload);
    },
    updatePassengerDetails: (state, action) => {
      const { index, details } = action.payload;
      state.passengerDetails[index] = {
        ...state.passengerDetails[index],
        ...details,
      };
    },
    deletePassengerDetails: (state, action) => {
      state.passengerDetails = state.passengerDetails.filter(
        (_, index) => index !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSearchTripDetails,
  setOfferPriceResponse,
  setSelectedPlaneTailNumber,
  setBasePrice,
  setTax,
  setTotalBookingPrice,
  setTotalDueNow,
  setDueLaterAmount,
  setDueLaterDate,
  setCustomerDetails,
  setTotalNumberOfPassengers,
  addPassengerDetails,
  updatePassengerDetails,
  deletePassengerDetails,
  setLoading,
} = createBookingSlice.actions;

export default createBookingSlice.reducer;
