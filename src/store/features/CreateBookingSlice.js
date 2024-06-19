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
    available: false,
    passengerTotalFlightDistance: 0,
    passengerTotalFlightDuration: 0,
    crewTotalFlightDistance: 0,
    crewTotalFlightDuration: 0,
    amountDueLater: 0,
    amountDueLaterDate: null,
    basePrice: 0,
    amountAtTimeOfBooking: 0,
    tax: 0,
    taxDueLater: 0,
    totalDueNow: 0,
    flight_segments: [],
  },
  quotedPrice: {
    amountDueLater: 0,
    amountDueLaterDate: null,
    basePrice: 0,
    amountAtTimeOfBooking: 0,
    tax: 0,
    taxDueLater: 0,
    totalDueNow: 0,
    flight_segments: [],
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
  isSearchCompleted: false,
  isSegmentConfirmed: false,
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
    setSelectedPlaneDetails: (state, action) => {
      state.selectedPlaneDetails = {
        selectedPlaneTailNumber:
          state.selectedPlaneDetails.selectedPlaneTailNumber,
        ...action.payload,
      };
    },
    setQuotedPrice: (state, action) => {
      state.quotedPrice = action.payload;
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
    setSearchCompleted: (state, action) => {
      state.isSearchCompleted = action.payload;
    },
    setIsSegmentConfirmed: (state, action) => {
      state.isSegmentConfirmed = action.payload;
    },
  },
});

export const {
  setSearchTripDetails,
  setOfferPriceResponse,
  setSelectedPlaneTailNumber,
  setSelectedPlaneDetails,
  setQuotedPrice,
  setCustomerDetails,
  setTotalNumberOfPassengers,
  addPassengerDetails,
  updatePassengerDetails,
  deletePassengerDetails,
  setLoading,
  setSearchCompleted,
  setIsSegmentConfirmed,
} = createBookingSlice.actions;

export default createBookingSlice.reducer;
