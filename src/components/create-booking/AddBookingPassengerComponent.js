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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addPassengerDetails,
  updatePassengerDetails,
  deletePassengerDetails,
} from "../../store/features/CreateBookingSlice";

const AddBookingPassengerComponent = () => {
  const dispatch = useDispatch();
  const passengers = useSelector(
    (state) => state.createBooking.passengerDetails
  );
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  const handlePassengerChange = (index, field, value) => {
    dispatch(
      updatePassengerDetails({ index, details: { [field]: value.trim() } })
    );
  };

  const handleAddPassenger = () => {
    dispatch(
      addPassengerDetails({
        firstName: "",
        lastName: "",
        nationality: "",
        isNew: true,
      })
    );
    setIsEditDisabled(false);
  };

  const handleDeletePassenger = (index) => {
    dispatch(deletePassengerDetails(index));
  };

  const handleSavePassengers = () => {
    const updatedPassengers = passengers.map((passenger) => ({
      ...passenger,
      isNew: false,
    }));
    setIsEditDisabled(true);
  };

  const handleEditPassengers = () => {
    setIsEditDisabled(false);
  };

  const isPassengerFormValid = passengers.every(
    (passenger) =>
      passenger.firstName && passenger.lastName && passenger.nationality
  );

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardHeader
        title="Add any extra Passengers"
        style={{ backgroundColor: "#f5f5f5", padding: 16 }}
        action={
          <Button onClick={handleAddPassenger} variant="text" color="primary">
            Add Passenger
          </Button>
        }
      />
      <CardContent>
        {passengers.map((passenger, index) => (
          <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="First Name"
                value={passenger.firstName}
                onChange={(e) =>
                  handlePassengerChange(index, "firstName", e.target.value)
                }
                fullWidth
                required
                disabled={isEditDisabled && !passenger.isNew}
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
                required
                disabled={isEditDisabled && !passenger.isNew}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Nationality"
                value={passenger.nationality}
                onChange={(e) =>
                  handlePassengerChange(index, "nationality", e.target.value)
                }
                fullWidth
                required
                disabled={isEditDisabled && !passenger.isNew}
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
        {passengers.length > 0 && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={
                isEditDisabled ? handleEditPassengers : handleSavePassengers
              }
              disabled={
                !isEditDisabled &&
                passengers.some(
                  (passenger) =>
                    !passenger.firstName ||
                    !passenger.lastName ||
                    !passenger.nationality
                )
              }
            >
              {isEditDisabled ? "Edit Passengers" : "Save Passengers"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AddBookingPassengerComponent;
