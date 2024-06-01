// Business details

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import BookingCardComponent from "./BookingCardComponent";

// Utils
import { formatCurrency } from "../../utils/Helper";

const BookingDetailComponent = () => {
  const params = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const items = [
      {
        key: "tail_number",
        label: "Tail Number",
        value: params?.state?.tail_number,
      },
      {
        key: "booking_reference",
        label: "Booking Reference",
        value: params?.state?.booking_reference,
      },
      {
        key: "number_of_passengers",
        label: "Number Of Passengers",
        value: params?.state?.number_of_passengers,
      },
      { key: "trip_type", label: "Trip Type", value: params?.state?.trip_type },
      {
        key: "trip_departure_airport_code",
        label: "Trip Departure Airport Code",
        value: params?.state?.trip_departure_airport_code,
      },
      {
        key: "trip_arrival_airport_code",
        label: "Trip Arrival Airport Code",
        value: params?.state?.trip_arrival_airport_code,
      },
      {
        key: "base_price",
        label: "Base Price",
        value: formatCurrency(params?.state?.base_price),
      },
      {
        key: "tax",
        label: "Tax",
        value: params?.state?.tax,
      },
      {
        key: "discount",
        label: "Discount",
        value: params?.state?.discount,
      },
      {
        key: "total_price",
        label: "Total Price",
        value: formatCurrency(params?.state?.total_price),
      },
      {
        key: "amount_paid",
        label: "Amount Paid",
        value: params?.state?.amount_paid,
      },
      {
        key: "status",
        label: "Status",
        value: params?.state?.status,
      },
      {
        key: "amount_due_at_time_of_booking",
        label: "Amount Due At Time Of Booking",
        value: params?.state?.amount_due_at_time_of_booking,
      },
      {
        key: "amount_due_later",
        label: "Amount Due Later",
        value: `$${formatCurrency(params?.state?.amount_due_later)}`,
      },
      {
        key: "amount_due_later_date",
        label: "Amount Due Later Date",
        value: params?.state?.amount_due_later_date,
      },
    ];
    setBookingDetails([...items]);
  }, [params]);

  return (
    <>
      <BookingCardComponent
        title={"Booking Detail"}
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {bookingDetails?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1">{element.label}</Typography>
                <Typography paragraph>
                  {element?.value ? element.value : "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
      />
    </>
  );
};

export default BookingDetailComponent;
