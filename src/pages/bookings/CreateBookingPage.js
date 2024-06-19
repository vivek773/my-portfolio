import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
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

function CreateBookingPage() {
  // customer details

  return (
    <Container>
      <h1>Create Booking</h1>
      <SearchBookingComponent />

      <PlaneSelectionComponent />

      <CreateBookingFlightSegmentsComponent />

      <BookingPriceCardComponent />

      <AddBookingCustomerComponent />

      <AddBookingPassengerComponent />

      <PaymentFormComponent />
    </Container>
  );
}

export default CreateBookingPage;
