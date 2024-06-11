// MUI components
import Container from "@mui/material/Container";

// Custom
import BookingDetailComponent from "./BookingDetailComponent";
import BookingCustomerComponent from "./BookingCustomerComponent";
import BookingFlightSegmentsComponent from "./BookingFlightSegmentsComponent";
import BookingPassengersComponent from "./bookingPassengersComponent";

import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Header = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
}));

const BookingViewComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Header>
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIosNewIcon color="action" />
        </IconButton>
        <Typography variant="h4">
          Booking Reference - {location?.state?.booking_reference}
        </Typography>
      </Header>
      <BookingDetailComponent />
      <BookingCustomerComponent />
      <BookingPassengersComponent />
      <BookingFlightSegmentsComponent />
    </Container>
  );
};

export default BookingViewComponent;
