// Business customers

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import BookingCardComponent from "./BookingCardComponent";

const BookingCustomerComponent = () => {
  const params = useLocation()
  const [bookingCustomer, setBookingCustomer] = useState(null);

  useEffect(() => {
    const items = [
      { key: "first_name", label: "First Name", value: params?.state?.customer?.first_name },
      { key: "last_name", label: "Last Name", value: params?.state?.customer?.last_name },
      { key: "email", label: "Email", value: params?.state?.customer?.email },
      { key: "phone_number", label: "Phone Number", value: params?.state?.customer?.phone_number },
      { key: "nationality", label: "Nationality", value: params?.state?.customer?.nationality },
      { key: "date_of_birth", label: "Date Of Birth", value: params?.state?.customer?.date_of_birth },
      {
        key: "address",
        label: "Address",
        value: params?.state?.customer?.address,
      },
      {
        key: "weight",
        label: "Weight",
        value: params?.state?.customer?.weight,
      },
      {
        key: "documents",
        label: "Documents",
        value: params?.state?.customer?.documents,
      },
    ];
    setBookingCustomer([...items]);
  }, [params]);


  return (
    <>
      <BookingCardComponent
        title={"Booking Customer"}
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {bookingCustomer?.map((element, i) => (
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

export default BookingCustomerComponent;
