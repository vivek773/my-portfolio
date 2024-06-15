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
import SearchBookingComponent from "../../components/create-booking/SearchBookingComoponent";
import PlaneSelectionComponent from "../../components/create-booking/PlaneSelectionComponent";
import CreateBookingFlightSegmentsComponent from "../../components/create-booking/CreateBookingFlightSegmentsComponent";
import BookingPriceCardComponent from "../../components/create-booking/BookingPriceCardComponent";

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
      <SearchBookingComponent />

      <PlaneSelectionComponent />

      <CreateBookingFlightSegmentsComponent />

      <BookingPriceCardComponent />

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
