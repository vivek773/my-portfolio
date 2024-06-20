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
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { setCustomerDetails } from "../../store/features/CreateBookingSlice";
import { validateEmail, validatePhoneNumber } from "../../utils/Helper";
import { fetchGETRequest } from "../../utils/Services";

const AddBookingCustomerComponent = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.createBooking.customerDetails);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomerDetailsVisible, setIsCustomerDetailsVisible] =
    useState(false);
  const [isCustomerEditDisabled, setIsCustomerEditDisabled] = useState(false);

  const handleChange = (field, value) => {
    dispatch(setCustomerDetails({ [field]: value.trim() }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetchGETRequest(
        `/internal-customer/owner/search-customer-by-email?email=${searchEmail}`
      );
      if (response.statusCode === 200 && response.customers.length > 0) {
        setSearchResults(response.customers);
      } else {
        setSearchResults([]);
        handleChange("email", searchEmail);
        handleChange("confirmEmail", searchEmail);
        setIsCustomerDetailsVisible(true);
        setIsCustomerEditDisabled(false);
      }
    } catch (error) {
      console.error("Error searching customer:", error);
      setSearchResults([]);
      handleChange("email", searchEmail);
      handleChange("confirmEmail", searchEmail);
      setIsCustomerDetailsVisible(true);
      setIsCustomerEditDisabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCustomer = (selectedCustomer) => {
    dispatch(
      setCustomerDetails({
        customerId: selectedCustomer.customer_id,
        firstName: selectedCustomer.first_name,
        lastName: selectedCustomer.last_name,
        email: selectedCustomer.email,
        confirmEmail: selectedCustomer.email,
        phoneNumber: selectedCustomer.phone_number,
        nationality: selectedCustomer.nationality,
      })
    );
    setSearchResults([]);
    setIsCustomerDetailsVisible(true);
    setIsCustomerEditDisabled(true);
  };

  const handleSaveCustomer = () => {
    setIsCustomerEditDisabled(true);
    // Additional logic to save the customer can be added here
  };

  const handleEditCustomer = () => {
    setIsCustomerEditDisabled(false);
  };

  const handleNewSearch = () => {
    setSearchEmail("");
    setIsCustomerDetailsVisible(false);
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
        <Box mb={3}>
          <Typography variant="h6">Search Customer by Email</Typography>
        </Box>
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Search Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                fullWidth
                disabled={isCustomerDetailsVisible}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isCustomerDetailsVisible ? handleNewSearch : handleSearch
                }
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : isCustomerDetailsVisible ? (
                  "Start a New Search"
                ) : (
                  "Search"
                )}
              </Button>
            </Grid>
          </Grid>
          {searchResults.length > 0 && (
            <>
              <Box mt={2}>
                <Typography variant="h5">Search Results</Typography>
              </Box>
              <Box mt={2}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map((result, index) => (
                        <TableRow
                          key={result.customer_id}
                          onClick={() => handleSelectCustomer(result)}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{result.first_name}</TableCell>
                          <TableCell>{result.last_name}</TableCell>
                          <TableCell>{result.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </Box>

        {isCustomerDetailsVisible && (
          <>
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
                  error={!!customer.email && !validateEmail(customer.email)}
                  helperText={
                    customer.email && !validateEmail(customer.email)
                      ? "Enter a valid email address"
                      : ""
                  }
                  disabled={isCustomerEditDisabled}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Email"
                  value={customer.confirmEmail}
                  onChange={(e) => handleChange("confirmEmail", e.target.value)}
                  fullWidth
                  required
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
                  disabled={isCustomerEditDisabled}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PhoneInput
                  country={"us"}
                  value={customer.phoneNumber}
                  onChange={(phone, countryData) => {
                    handleChange("phoneNumber", phone.trim());
                    handleChange(
                      "phoneCountryCode",
                      `+${countryData.dialCode}`
                    );
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
                  isCustomerEditDisabled
                    ? handleEditCustomer
                    : handleSaveCustomer
                }
                disabled={!isCustomerFormValid && !isCustomerEditDisabled}
              >
                {isCustomerEditDisabled ? "Edit Customer" : "Save Customer"}
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AddBookingCustomerComponent;
