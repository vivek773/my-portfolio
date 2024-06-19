import { Container } from "@mui/material";
import React from "react";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import AddBookingCustomerComponent from "../../components/create-booking/AddBookingCustomerComponent";
import AddBookingPassengerComponent from "../../components/create-booking/AddBookingPassengerComponent";
import BookingPriceCardComponent from "../../components/create-booking/BookingPriceCardComponent";
import CreateBookingFlightSegmentsComponent from "../../components/create-booking/CreateBookingFlightSegmentsComponent";
import PlaneSelectionComponent from "../../components/create-booking/PlaneSelectionComponent";
import SearchBookingComponent from "../../components/create-booking/SearchBookingComoponent";
import { fetchGETRequest } from "../../utils/Services";
import PaymentFormComponent from "../../components/create-booking/PaymentFormComponent";

import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setSearchCompleted,
} from "../../store/features/CreateBookingSlice";

function CreateBookingPage() {
  const isSearchCompleted = useSelector(
    (state) => state.createBooking.isSearchCompleted
  );

  const selectedPlane = useSelector(
    (state) => state.createBooking.selectedPlaneDetails.selectedPlaneTailNumber
  );

  const quotedPrice = useSelector((state) => state.createBooking.quotedPrice);

  const isQuotedPriceValid =
    quotedPrice &&
    Object.keys(quotedPrice).length > 0 &&
    quotedPrice.basePrice > 0;

  return (
    <Container>
      <h1>Create Booking</h1>
      {!isSearchCompleted ? (
        <SearchBookingComponent />
      ) : (
        <>
          <SearchBookingComponent />
          <PlaneSelectionComponent />
          {selectedPlane && (
            <>
              <CreateBookingFlightSegmentsComponent />
              {isQuotedPriceValid && (
                <>
                  <BookingPriceCardComponent />
                  <AddBookingCustomerComponent />
                  <AddBookingPassengerComponent />
                  <PaymentFormComponent />
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default CreateBookingPage;
