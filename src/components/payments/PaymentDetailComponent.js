import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setBookings } from "../../store/features/BookingsSlice";
import PaymentCardComponent from "./PaymentCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import { fetchGETRequest } from "../../utils/Services";
import { useLoader } from "../../context/LoaderContext";
import {
  formatCurrency,
  formatDate,
  formatDateTimeLong,
  formatPhoneNumber,
} from "../../utils/Helper";
import { readableStatus } from "../../utils/Constants";

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
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Customer Name
              </Typography>
              <Typography paragraph align="center">
                {`${paymentDetails?.customer?.first_name} ${paymentDetails?.customer?.last_name}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Email
              </Typography>
              <Typography paragraph align="center">
                {paymentDetails?.customer?.email || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Card Number
              </Typography>
              <Typography paragraph align="center">
                {` **** ${paymentDetails?.processor_details?.card_last_four}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Phone Number
              </Typography>
              <Typography paragraph align="center">
                {formatPhoneNumber(paymentDetails?.customer?.phone_number) ||
                  "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Amount
              </Typography>
              <Typography paragraph align="center">
                ${formatCurrency(paymentDetails?.amount) || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Fee
              </Typography>
              <Typography paragraph align="center">
                ${formatCurrency(paymentDetails?.platform_fee) || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Net
              </Typography>
              <Typography paragraph align="center">
                ${formatCurrency(paymentDetails?.net_amount_to_business) || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
              <Typography paragraph align="center">
                {readableStatus(paymentDetails?.status) || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Transaction Time
              </Typography>
              <Typography paragraph align="center">
                {formatDateTimeLong(paymentDetails?.created_at) || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Booking Details
              </Typography>
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
