import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGETRequest, fetchPOSTRequest } from "../../utils/Services";
import {
  Typography,
  Grid,
  Container,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  Box,
  CardHeader,
  IconButton,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  formatCurrency,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/Helper";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PaymentFormComponent from "./PaymentFormComponent";
import AddDestinationComponent from "../../components/destinations/AddDestinationComponent";

function CreateBookingPage() {
  const [destinations, setDestinations] = useState([]);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [tripType, setTripType] = useState("one_way");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState("");
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [openAddDestination, setOpenAddDestination] = useState(false);
  const [destinationType, setDestinationType] = useState("");
  const [newDestination, setNewDestination] = useState(null);

  // customer details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [extraPassengers, setExtraPassengers] = useState([]);
  const [isCustomerEditDisabled, setIsCustomerEditDisabled] = useState(false);
  const [isCustomerSaved, setIsCustomerSaved] = useState(false);
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  const [priceData, setPriceData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDestinationsData = async () => {
      setLoading(true);
      const response = await fetchGETRequest(
        `/destination/owner/get-destinations`
      );
      setLoading(false);

      if (response?.statusCode === 200 && response.destinations) {
        setDestinations(response.destinations);
      }
    };
    getDestinationsData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    const departureDateTime = new Date(
      selectedDepartureDate.getFullYear(),
      selectedDepartureDate.getMonth(),
      selectedDepartureDate.getDate(),
      parseInt(selectedDepartureTime.split(":")[0]),
      0
    );

    let arrivalDateTime = null;
    if (
      tripType === "round_trip" &&
      selectedArrivalDate &&
      selectedArrivalTime
    ) {
      arrivalDateTime = new Date(
        selectedArrivalDate.getFullYear(),
        selectedArrivalDate.getMonth(),
        selectedArrivalDate.getDate(),
        parseInt(selectedArrivalTime.split(":")[0]),
        0
      );
    }

    const payload = {
      trip_type: tripType,
      flight_segments: [
        {
          departure_airport_code: departure,
          arrival_airport_code: arrival,
          departing_flight_time: departureDateTime.toISOString(),
          trip_leg_number: 1,
        },
      ],
    };

    try {
      const response = await fetchPOSTRequest(
        "/booking/owner/get-booking-prices",
        payload
      );
      setLoading(false);

      if (response && response.data) {
        setPriceData(response.data.priceDetails);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching booking price:", error);
    }
  };

  const isFormValid =
    departure &&
    arrival &&
    selectedDepartureDate &&
    selectedDepartureTime &&
    (tripType === "one_way" || (selectedArrivalDate && selectedArrivalTime));

  // Generate time options for dropdown in 12-hour format with AM and PM
  const timeOptions = Array.from({ length: 24 }, (_, hour) => {
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour.toString().padStart(2, "0")}:00 ${period}`;
  });

  const handlePlaneSelection = (tailNumber) => {
    setSelectedPlane(selectedPlane === tailNumber ? null : tailNumber);
  };

  const handleSaveCustomer = () => {
    setIsCustomerEditDisabled(true);
    setIsCustomerSaved(true);
  };

  const handleEditCustomer = () => {
    setIsCustomerEditDisabled(false);
    setIsCustomerSaved(false);
  };
  const handleAddPassenger = () => {
    setExtraPassengers([
      ...extraPassengers,
      { firstName: "", lastName: "", nationality: "", isNew: true },
    ]);
    setIsEditDisabled(false);
  };
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = extraPassengers.map((passenger, i) => {
      if (i === index) {
        return { ...passenger, [field]: value.trim() };
      }
      return passenger;
    });
    setExtraPassengers(updatedPassengers);
  };
  const handleDeletePassenger = (index) => {
    const updatedPassengers = extraPassengers.filter((_, i) => i !== index);
    setExtraPassengers(updatedPassengers);
  };
  const handleEditPassengers = () => {
    setIsEditDisabled(false);
  };
  const handleSavePassengers = () => {
    const updatedPassengers = extraPassengers.map((passenger) => ({
      ...passenger,
      isNew: false,
    }));
    setExtraPassengers(updatedPassengers);
    setIsEditDisabled(true);
  };

  const handleOpenAddDestinationModal = (type) => {
    setDestinationType(type);
    setOpenAddDestination(true);
  };

  const handleCloseAddDestinationModal = async () => {
    setOpenAddDestination(false);

    // Refetch destinations after adding a new one
    const response = await fetchGETRequest(
      `/destination/owner/get-destinations`
    );

    if (response?.statusCode === 200 && response.destinations) {
      setDestinations(response.destinations);
    }

    setDestinationType("");
  };

  const handleAddDestination = (newDestination) => {
    // Update destinations state with the new destination
    setDestinations((prevDestinations) => [
      ...prevDestinations,
      newDestination,
    ]);

    // Automatically select the newly added destination
    if (destinationType === "departure") {
      setDeparture(newDestination.airport_code);
    } else if (destinationType === "arrival") {
      setArrival(newDestination.airport_code);
    }

    setOpenAddDestination(false); // Close the modal
  };

  return (
    <Container>
      <h1>Create Booking</h1>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={4} mb={5}>
          <TextField
            select
            label="Trip Type"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            fullWidth
          >
            <MenuItem value="one_way">One Way</MenuItem>
            <MenuItem value="round_trip">Round Trip</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent={"center"} mb={5}>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            select
            label="Select Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Departure Airport</MenuItem>
            {destinations
              .sort((a, b) => a.airport_name.localeCompare(b.airport_name)) // Sort based on airport_name
              .map((dest, index) => (
                <MenuItem key={index} value={dest.airport_code}>
                  {dest.airport_code} - {dest.airport_name}
                </MenuItem>
              ))}

            <MenuItem
              value="+add"
              onClick={() => handleOpenAddDestinationModal("departure")}
            >
              + Add a Destination
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextField
            select
            label="Select Arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Arrival Airport</MenuItem>
            {destinations
              .sort((a, b) => a.airport_name.localeCompare(b.airport_name)) // Sort based on airport_name
              .map((dest, index) => (
                <MenuItem key={index} value={dest.airport_code}>
                  {dest.airport_code} - {dest.airport_name}
                </MenuItem>
              ))}
            <MenuItem
              value="+add"
              onClick={() => handleOpenAddDestinationModal("arrival")}
            >
              + Add a Destination
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Departure Date"
              value={selectedDepartureDate}
              onChange={(newValue) => setSelectedDepartureDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            select
            label="Select Departure Time"
            value={selectedDepartureTime}
            onChange={(e) => setSelectedDepartureTime(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Departure Time</MenuItem>
            {timeOptions.map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {tripType === "round_trip" && (
          <>
            <Grid container spacing={2} justifyContent={"center"} mb={5}>
              <Grid item xs={12} sm={6} md={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Return Date"
                    value={selectedArrivalDate}
                    onChange={(newValue) => setSelectedArrivalDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    minDate={selectedDepartureDate || new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Select Return Time"
                  value={selectedArrivalTime}
                  onChange={(e) => setSelectedArrivalTime(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">Select Return Time</MenuItem>
                  {timeOptions.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      <Grid container spacing={2} justifyContent={"center"} mt={3}>
        <Grid item xs={12} sm={6} md={5}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!isFormValid || loading}
            size="large"
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Continue"}
          </Button>
        </Grid>
      </Grid>

      {Object.keys(priceData).length > 0 && (
        <Grid
          container
          spacing={3}
          style={{ marginTop: "20px" }}
          justifyContent="center"
        >
          {Object.entries(priceData).map(([tailNumber, data]) => (
            <Grid container item key={tailNumber} xs={12} sm={6} md={5}>
              <Card
                style={{
                  border:
                    selectedPlane === tailNumber
                      ? "2px solid #479DE1"
                      : "1px solid #ccc",
                  borderRadius: "8px",
                  margin: "auto",
                  minWidth: "300px",
                  maxWidth: "450px",
                  boxShadow:
                    selectedPlane === tailNumber
                      ? "0 0 10px #479DE1"
                      : "0 0 5px #ccc",
                  opacity:
                    selectedPlane && selectedPlane !== tailNumber ? 0.5 : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ opacity: 0.72 }}
                    align="center"
                    gutterBottom
                    mb={2}
                  >
                    <b> {tailNumber} </b>
                  </Typography>
                  {data.available ? (
                    <>
                      <Typography variant="h6" align="center" gutterBottom>
                        Passenger
                      </Typography>
                      <Grid
                        container
                        spacing={1}
                        pb={1}
                        justifyContent="center"
                      >
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Flight Distance:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {data.passengerTotalFlightDistance} nm
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Flight Duration:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {data.passengerTotalFlightDuration} hrs
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Base Price:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {formatCurrency(data.basePrice)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Amount at Booking:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {formatCurrency(data.amountAtTimeOfBooking)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Tax:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>{formatCurrency(data.tax)}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Total Due Now:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {formatCurrency(data.totalDueNow)}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        style={{ marginTop: "20px" }}
                      >
                        Crew
                      </Typography>
                      <Grid container spacing={1} justifyContent="center">
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Flight Distance:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {data.crewTotalFlightDistance} nm
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <Typography>
                            <b>Flight Duration:</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "left", paddingLeft: "10px" }}
                        >
                          <Typography>
                            {data.crewTotalFlightDuration} hrs
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Typography
                        style={{ color: "red", marginBottom: "10px" }}
                      >
                        Not available for this segment
                      </Typography>
                      {data.segments.map((segment, index) => (
                        <Box key={index} style={{ marginBottom: "10px" }}>
                          <Typography>
                            <b>Segment {index + 1}:</b>
                          </Typography>
                          <Typography>
                            <b>Departure:</b> {segment.departure}
                          </Typography>
                          <Typography>
                            <b>Arrival:</b> {segment.arrival}
                          </Typography>
                          <Typography>
                            <b>Departure Time:</b>{" "}
                            {new Date(
                              segment.departing_flight_time
                            ).toLocaleString()}
                          </Typography>
                          <Typography>
                            <b>Arrival Time:</b>{" "}
                            {new Date(segment.arrival_time).toLocaleString()}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  )}
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color={selectedPlane === tailNumber ? "error" : "primary"}
                      fullWidth
                      onClick={() => handlePlaneSelection(tailNumber)}
                      style={{ borderRadius: "8px" }}
                    >
                      {selectedPlane === tailNumber
                        ? "Selected - Reset Selection"
                        : "Select"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedPlane && (
        <Container maxWidth={"md"}>
          <Typography variant="h4" sx={{ marginTop: 10 }}>
            Creating Booking on Plane {selectedPlane}
          </Typography>

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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.trim())}
                    fullWidth
                    disabled={isCustomerEditDisabled}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
                    fullWidth
                    disabled={isCustomerEditDisabled}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    fullWidth
                    disabled={isCustomerEditDisabled}
                    required
                    error={!!email && !validateEmail(email)} // Convert to boolean
                    helperText={
                      email && !validateEmail(email)
                        ? "Enter a valid email address"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm Email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value.trim())}
                    fullWidth
                    disabled={isCustomerEditDisabled}
                    required
                    error={!!confirmEmail && email !== confirmEmail}
                    helperText={
                      confirmEmail && email !== confirmEmail
                        ? "Email addresses do not match"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PhoneInput
                    country={"us"}
                    value={phoneNumber}
                    onChange={(phone, countryData) => {
                      setPhoneNumber(phone.trim());
                      setPhoneCountryCode(`+${countryData.dialCode}`);
                    }}
                    inputStyle={{
                      fontSize: "16px",
                      width: "100%",
                      height: "56px", // Ensure this matches the height of TextField inputs
                      borderRadius: "4px",
                      borderColor:
                        phoneNumber && !validatePhoneNumber(phoneNumber)
                          ? "red"
                          : "",
                    }}
                    inputProps={{
                      required: true,
                      disabled: isCustomerEditDisabled,
                    }}
                    specialLabel="Phone Number *"
                  />

                  {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                    <Typography variant="body2" color="error">
                      Enter a valid phone number with country code (e.g.,
                      +1234567890)
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value.trim())}
                    fullWidth
                    disabled={isCustomerEditDisabled}
                    required
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
                  disabled={
                    !firstName ||
                    !lastName ||
                    !email ||
                    !confirmEmail ||
                    !phoneNumber ||
                    !nationality ||
                    !validateEmail(email) ||
                    email !== confirmEmail ||
                    !validatePhoneNumber(phoneNumber)
                  }
                >
                  {isCustomerEditDisabled ? "Edit Customer" : "Save Customer"}
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 3 }}>
            <CardHeader
              title="Add any extra Passengers"
              style={{ backgroundColor: "#f5f5f5", padding: 16 }}
              action={
                <Button
                  onClick={handleAddPassenger}
                  variant="text"
                  color="primary"
                  disabled={!isCustomerEditDisabled}
                >
                  Add Passenger
                </Button>
              }
            />
            <CardContent>
              {extraPassengers.map((passenger, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  sx={{ marginBottom: 2 }}
                >
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="First Name"
                      value={passenger.firstName}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "firstName",
                          e.target.value
                        )
                      }
                      fullWidth
                      disabled={isEditDisabled && !passenger.isNew}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Last Name"
                      value={passenger.lastName}
                      onChange={(e) =>
                        handlePassengerChange(index, "lastName", e.target.value)
                      }
                      fullWidth
                      disabled={isEditDisabled && !passenger.isNew}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Nationality"
                      value={passenger.nationality}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "nationality",
                          e.target.value
                        )
                      }
                      fullWidth
                      disabled={isEditDisabled && !passenger.isNew}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      onClick={() => handleDeletePassenger(index)}
                      disabled={isEditDisabled}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              {extraPassengers.length > 0 && (
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      isEditDisabled
                        ? handleEditPassengers
                        : handleSavePassengers
                    }
                    disabled={extraPassengers.some(
                      (passenger) =>
                        !passenger.firstName ||
                        !passenger.lastName ||
                        !passenger.nationality
                    )}
                  >
                    {isEditDisabled ? "Edit Passengers" : "Save Passengers"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          <PaymentFormComponent
            // handleSubmit={handleSubmit}
            isParentFormValid={isFormValid}
          />
        </Container>
      )}

      <Dialog
        open={openAddDestination}
        onClose={handleCloseAddDestinationModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add a Destination</DialogTitle>
        <DialogContent>
          <AddDestinationComponent onAddDestination={handleAddDestination} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default CreateBookingPage;
