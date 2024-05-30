// Payments details

// Default
import { useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const PaymentDetailComponent = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [paymentDetails, setPaymentDetails] = useState(null);

  const getBookingsData = async () => {
    startLoading();
    const response = await fetchGETRequest(`/booking/owner/get-bookings`, {});

    if (response?.statusCode === 200 && response) {

      dispatch(setBookings(response?.bookings));
      
      const findData = response?.bookings?.find((item) => item?.booking_id === params?.state?.booking_id)
      
      if(findData) {
        navigate(`/bookings/${params?.state?.booking_id}`, { state: findData });
      }
      stopLoading();

    } else {
      stopLoading();
    }
  };

  useEffect(() => {
    const items = [
      {
        key: "first_name",
        label: "First Name",
        value: params?.state?.customer?.first_name,
      },
      {
        key: "last_name",
        label: "Last Name",
        value: params?.state?.customer?.last_name,
      },
      { key: "email", label: "Email", value: params?.state?.customer?.email },
      {
        key: "phone_number",
        label: "Phone Number",
        value: params?.state?.customer?.phone_number,
      },
      {
        key: "processor_details.card_last_4_digit",
        label: "Processor Details Card Last 4 Digit",
        value: params?.state?.processor_details?.card_last_4_digit,
      },
      {
        key: "processor_details.transaction_reference_id",
        label: "Processor Details Transaction Reference Id",
        value: params?.state?.processor_details?.transaction_reference_id,
      },
      {
        key: "action",
        label: "View Booking",
        value: (
          <CustomButton
            width={"fit-content"}
            onClick={getBookingsData}
            label={"Go"}
            isLoading={isLoading}
            size={"small"}
          />
        ),
      },
    ];
    setPaymentDetails([...items]);
  }, [params]);

  return (
    <>
      <PaymentCardComponent
        title={"Payment Detail"}
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {paymentDetails?.map((element, i) => (
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

export default PaymentDetailComponent;
