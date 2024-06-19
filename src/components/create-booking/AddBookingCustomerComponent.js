import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { setCustomerDetails } from "../../store/features/CreateBookingSlice";
import { validateEmail, validatePhoneNumber } from "../../utils/Helper";

const AddBookingCustomerComponent = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.createBooking.customerDetails);
  const [isCustomerEditDisabled, setIsCustomerEditDisabled] = useState(false);

  const handleChange = (field, value) => {
    dispatch(setCustomerDetails({ [field]: value.trim() }));
  };

  const handleSaveCustomer = () => {
    setIsCustomerEditDisabled(true);
  };

  const handleEditCustomer = () => {
    setIsCustomerEditDisabled(false);
  };

  const isCustomerFormValid =
    customer.firstName &&
    customer.lastName &&
    customer.email &&
    customer.confirmEmail &&
    customer.phoneNumber &&
    customer.nationality &&
    validateEmail(customer.email) &&
    customer.email === customer.confirmEmail &&
    validatePhoneNumber(customer.phoneNumber);

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardHeader
        title="Customer Details"
        style={{ backgroundColor: "#f5f5f5" }}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={customer.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
              required
              disabled={isCustomerEditDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={customer.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              required
              disabled={isCustomerEditDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={customer.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
              required
              disabled={isCustomerEditDisabled}
              error={!!customer.email && !validateEmail(customer.email)}
              helperText={
                customer.email && !validateEmail(customer.email)
                  ? "Enter a valid email address"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Email"
              value={customer.confirmEmail}
              onChange={(e) => handleChange("confirmEmail", e.target.value)}
              fullWidth
              required
              disabled={isCustomerEditDisabled}
              error={
                !!customer.confirmEmail &&
                customer.email !== customer.confirmEmail
              }
              helperText={
                customer.confirmEmail &&
                customer.email !== customer.confirmEmail
                  ? "Email addresses do not match"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              country={"us"}
              value={customer.phoneNumber}
              onChange={(phone, countryData) => {
                handleChange("phoneNumber", phone.trim());
                handleChange("phoneCountryCode", `+${countryData.dialCode}`);
              }}
              inputStyle={{
                fontSize: "16px",
                width: "100%",
                height: "56px",
                borderRadius: "4px",
                borderColor:
                  customer.phoneNumber &&
                  !validatePhoneNumber(customer.phoneNumber)
                    ? "red"
                    : "",
              }}
              inputProps={{
                required: true,
                disabled: isCustomerEditDisabled,
              }}
              specialLabel="Phone Number *"
            />
            {customer.phoneNumber &&
              !validatePhoneNumber(customer.phoneNumber) && (
                <Typography variant="body2" color="error">
                  Enter a valid phone number with country code (e.g.,
                  +1234567890)
                </Typography>
              )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nationality"
              value={customer.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
              fullWidth
              required
              disabled={isCustomerEditDisabled}
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={
              isCustomerEditDisabled ? handleEditCustomer : handleSaveCustomer
            }
            disabled={
              !isCustomerEditDisabled &&
              (!customer.firstName ||
                !customer.lastName ||
                !customer.email ||
                !customer.confirmEmail ||
                !customer.phoneNumber ||
                !customer.nationality ||
                !validateEmail(customer.email) ||
                customer.email !== customer.confirmEmail ||
                !validatePhoneNumber(customer.phoneNumber))
            }
          >
            {isCustomerEditDisabled ? "Edit Customer" : "Save Customer"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddBookingCustomerComponent;
