// Payments details

// Default
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Redux
import { useDispatch } from "react-redux";
import { setBookings } from "../../store/features/BookingsSlice";

// Custom
import PaymentCardComponent from "./PaymentCardComponent";
import CustomButton from "../../forms/button/CustomButton";

// Utils
import { fetchGETRequest } from "../../utils/Services";

// Context
import { useLoader } from "../../context/LoaderContext";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPhoneNumber,
} from "../../utils/Helper";

const PaymentDetailComponent = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [paymentDetails, setPaymentDetails] = useState(null);

  const getBookingsData = async () => {
    startLoading();
    const response = await fetchGETRequest(`/booking/owner/get-bookings`, {});

    if (response?.statusCode === 200 && response) {
      dispatch(setBookings(response?.bookings));

      const findData = response?.bookings?.find(
        (item) => item?.booking_id === params?.state?.booking_id
      );

      if (findData) {
        navigate(`/bookings/${params?.state?.booking_id}`, { state: findData });
      }
      stopLoading();
    } else {
      stopLoading();
    }
  };

  useEffect(() => {
    setPaymentDetails(params?.state);
  }, [params]);

  return (
    <>
      <PaymentCardComponent
        title={"Detail"}
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Customer Name</Typography>
              <Typography paragraph>
                {`${paymentDetails?.customer?.first_name} ${paymentDetails?.customer?.last_name}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography paragraph>
                {paymentDetails?.customer?.email || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Card Number</Typography>
              <Typography paragraph>
                {` **** ${paymentDetails?.processor_details?.card_last_four}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Phone Number</Typography>
              <Typography paragraph>
                {formatPhoneNumber(paymentDetails?.customer?.phone_number) ||
                  "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Amount</Typography>
              <Typography paragraph>
                ${formatCurrency(paymentDetails?.amount) || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Fee</Typography>
              <Typography paragraph>
                ${formatCurrency(paymentDetails?.platform_fee) || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Net</Typography>
              <Typography paragraph>
                ${formatCurrency(paymentDetails?.net_amount_to_business) || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography paragraph>{paymentDetails?.status || "-"}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Transaction Time</Typography>
              <Typography paragraph>
                {formatDateTime(paymentDetails?.created_at) || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Booking Details</Typography>
              <CustomButton
                width={"fit-content"}
                onClick={getBookingsData}
                label={"Go"}
                isLoading={isLoading}
                size={"small"}
              />
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default PaymentDetailComponent;
