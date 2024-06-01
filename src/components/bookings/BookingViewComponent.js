// MUI components
import Container from "@mui/material/Container";

// Custom
import BookingDetailComponent from "./BookingDetailComponent";
import BookingCustomerComponent from "./BookingCustomerComponent";
import BookingFlightSegmentsComponent from "./BookingFlightSegmentsComponent";
import BookingPassengersComponent from "./bookingPassengersComponent";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  header: { alignItems: "center", display: "flex" },
  cardRoot: {
    border: "1px solid #ddd",
    margin: "35px 0",
    justifyContent: "center",
    display: "flex",
  },
  cardKey: { fontWeight: 600 },
}));

const BookingViewComponent = () => {
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <div className={classes.header}>
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIosNewIcon color="#000" />
        </IconButton>
        <Typography variant="h4">
          {" "}
          Booking Reference -{location?.state?.booking_reference}
        </Typography>
      </div>

      <BookingDetailComponent />
      <BookingCustomerComponent />
      <BookingPassengersComponent />
      <BookingFlightSegmentsComponent />
    </Container>
  );
};

export default BookingViewComponent;
