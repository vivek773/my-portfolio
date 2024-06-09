import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Modal from "../modal/Modal";
import { fetchPUTRequest } from "../../utils/Services";
import { useToast } from "../../context/ToastContext";
import { useModal } from "../../context/ModalContext";
import { useLoader } from "../../context/LoaderContext";
import { setBusinessSettings } from "../../store/features/BusinessSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  margin: "35px 0",
  boxShadow: "none",
  borderRadius: "10px",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "#f2f5f7",
  borderBottom: "1px solid #ddd",
  padding: "15px 25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const headerTitleStyle = {
  alignItems: "center",
  display: "flex",
};

const BusinessTicketPaymentSettingsCardComponent = () => {
  const businessSettings = useSelector(
    (state) => state.business.business_settings
  );
  const dispatch = useDispatch();
  const { setToast } = useToast();
  const { isModal, closeModal, openModal } = useModal();
  const { isLoading, startLoading, stopLoading } = useLoader();

  // Destructure the properties with default values to avoid undefined errors
  const {
    pay_in_full_at_time_of_booking = false,
    percentage_at_time_of_booking = 0,
    hours_before_flight_for_remaining_payment = 0,
  } = businessSettings || {};

  const [formValues, setFormValues] = useState({
    pay_in_full_at_time_of_booking,
    percentage_at_time_of_booking,
    hours_before_flight_for_remaining_payment,
  });
  const [previousValues, setPreviousValues] = useState({
    percentage_at_time_of_booking,
    hours_before_flight_for_remaining_payment,
  });

  useEffect(() => {
    setFormValues({
      pay_in_full_at_time_of_booking,
      percentage_at_time_of_booking,
      hours_before_flight_for_remaining_payment,
    });
    setPreviousValues({
      percentage_at_time_of_booking,
      hours_before_flight_for_remaining_payment,
    });
  }, [
    pay_in_full_at_time_of_booking,
    percentage_at_time_of_booking,
    hours_before_flight_for_remaining_payment,
  ]);

  const handleOpen = () => openModal("editPaymentSettings");
  const handleClose = () => closeModal();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "pay_in_full_at_time_of_booking") {
      const isFullPayment = value === "true";
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        pay_in_full_at_time_of_booking: isFullPayment,
        percentage_at_time_of_booking: isFullPayment
          ? 0
          : previousValues.percentage_at_time_of_booking,
        hours_before_flight_for_remaining_payment: isFullPayment
          ? 0
          : previousValues.hours_before_flight_for_remaining_payment,
      }));
    } else {
      setFormValues((prevFormValues) => {
        if (
          name === "percentage_at_time_of_booking" ||
          name === "hours_before_flight_for_remaining_payment"
        ) {
          setPreviousValues((prevPreviousValues) => ({
            ...prevPreviousValues,
            [name]: value,
          }));
        }
        return { ...prevFormValues, [name]: value };
      });
    }
  };

  const isFormValid = () => {
    if (formValues.pay_in_full_at_time_of_booking) {
      return true;
    }
    if (
      formValues.percentage_at_time_of_booking <= 0 ||
      formValues.percentage_at_time_of_booking >= 100
    ) {
      return false;
    }
    if (formValues.hours_before_flight_for_remaining_payment <= 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formValues };
    if (payload.pay_in_full_at_time_of_booking) {
      payload.percentage_at_time_of_booking = 0;
      payload.hours_before_flight_for_remaining_payment = 0;
    }
    startLoading();
    try {
      const response = await fetchPUTRequest(
        "/business/owner/update-ticket-payment-settings",
        payload
      );
      if (response.statusCode === 200) {
        dispatch(
          setBusinessSettings(response.updatedBusiness.business_settings)
        );
        setToast({
          open: true,
          message: response.message,
          severity: "success",
        });
        closeModal();
      } else {
        setToast({
          open: true,
          message: response.message,
          severity: "error",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message: "An error occurred",
        severity: "error",
      });
    } finally {
      stopLoading();
    }
  };

  const renderModalContent = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Pay in Full at Time of Booking"
        name="pay_in_full_at_time_of_booking"
        value={formValues.pay_in_full_at_time_of_booking}
        onChange={handleChange}
        select
        SelectProps={{
          native: true,
        }}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label="Percentage at Time of Booking"
        name="percentage_at_time_of_booking"
        value={formValues.percentage_at_time_of_booking}
        onChange={handleChange}
        type="number"
        disabled={formValues.pay_in_full_at_time_of_booking}
        helperText="Must be > 0 and < 100"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Hours Before Flight for Remaining Payment"
        name="hours_before_flight_for_remaining_payment"
        value={formValues.hours_before_flight_for_remaining_payment}
        onChange={handleChange}
        type="number"
        disabled={formValues.pay_in_full_at_time_of_booking}
        helperText="Must be > 0"
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </form>
  );

  return (
    <>
      <StyledCard>
        <StyledCardHeader
          title={
            <Typography sx={headerTitleStyle} variant="h6">
              Ticket Payment Settings
            </Typography>
          }
          action={
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Edit
            </Button>
          }
        />

        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="subtitle1" align="left">
                    Charge in full at the time of booking
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="left">
                    {pay_in_full_at_time_of_booking ? "Yes" : "No"}
                  </Typography>
                </Grid>
                <Grid item xs={11} mt={1} mb={4}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                  >
                    Set whether to charge the full amount at the time of booking
                    or partial. If set to "No", you can set the percentage to
                    charge at the time of booking and the hours before the
                    flight when the remaining payment is due.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    align="left"
                    style={{
                      color: pay_in_full_at_time_of_booking
                        ? "#aaa"
                        : "inherit",
                    }}
                  >
                    Percentage to charge at Time of Booking
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{
                      color: pay_in_full_at_time_of_booking
                        ? "#aaa"
                        : "inherit",
                    }}
                  >
                    {percentage_at_time_of_booking}%
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={1} mb={4}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                  >
                    Percentage of the total cost that must be paid at the time
                    of booking.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    align="left "
                    style={{
                      color: pay_in_full_at_time_of_booking
                        ? "#aaa"
                        : "inherit",
                    }}
                  >
                    Hours Before Flight for Remaining Payment
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{
                      color: pay_in_full_at_time_of_booking
                        ? "#aaa"
                        : "inherit",
                    }}
                  >
                    {hours_before_flight_for_remaining_payment}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                  >
                    Number of hours before the flight when the remaining payment
                    is due. We will automatically send a reminder email 24 hours
                    before the payment is due.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      <Modal
        title="Edit Payment Settings"
        open={isModal.open && isModal.type === "editPaymentSettings"}
        onClose={handleClose}
        content={renderModalContent()}
      />
    </>
  );
};

export default BusinessTicketPaymentSettingsCardComponent;
