// Booking view component

// MUI components
import Container from "@mui/material/Container";

// Custom
import BookingDetailComponent from "./BookingDetailComponent";
import BookingCustomerComponent from "./BookingCustomerComponent";
import BookingFlightSegmentsComponent from "./BookingFlightSegmentsComponent";
import BookingPassengersComponent from "./bookingPassengersComponent";


const BookingViewComponent = () => {

  return (
    <Container maxWidth="lg">
       <BookingDetailComponent />
       <BookingCustomerComponent />
       <BookingPassengersComponent />
       <BookingFlightSegmentsComponent />
    </Container>
  );
};

export default BookingViewComponent;
