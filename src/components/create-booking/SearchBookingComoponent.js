import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fetchGETRequest, fetchPOSTRequest } from "../../utils/Services";

import {
  setSearchTripDetails,
  setOfferPriceResponse,
  setLoading,
} from "../../store/features/CreateBookingSlice";
import { setTax } from "../../store/features/BusinessSlice";

const SearchBookingComponent = () => {
  const dispatch = useDispatch();
  const [destinations, setDestinations] = useState([]);
  const {
    tripType,
    departureAirport,
    arrivalAirport,
    departureDate,
    departureTime,
    returnDate,
    returnTime,
    loading,
  } = useSelector((state) => state.createBooking.searchTripDetails);

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetchGETRequest(
        "/destination/owner/get-destinations"
      );
      if (response?.statusCode === 200 && response.destinations) {
        // Create a sorted copy of the response data
        const sortedDestinations = response.destinations
          .slice() // Create a copy of the array
          .sort((a, b) => a.airport_name.localeCompare(b.airport_name));
        setDestinations(sortedDestinations);
      }
    };
    fetchDestinations();
  }, []);

  const handleSearch = async () => {
    dispatch(setLoading(true));

    // Dispatch the search trip details
    dispatch(
      setSearchTripDetails({
        tripType,
        departureAirport,
        arrivalAirport,
        departureDate,
        departureTime,
        returnDate,
        returnTime,
      })
    );

    const departureDateTime = new Date(departureDate);
    departureDateTime.setHours(parseInt(departureTime.split(":")[0]), 0);

    let arrivalDateTime = null;
    if (tripType === "round_trip" && returnDate && returnTime) {
      arrivalDateTime = new Date(returnDate);
      arrivalDateTime.setHours(parseInt(returnTime.split(":")[0]), 0);
    }

    const payload = {
      trip_type: tripType,
      flight_segments: [
        {
          departure_airport_code: departureAirport,
          arrival_airport_code: arrivalAirport,
          departing_flight_time: departureDateTime.toISOString(),
          trip_leg_number: 1,
        },
      ],
    };

    if (arrivalDateTime) {
      payload.flight_segments.push({
        departure_airport_code: arrivalAirport,
        arrival_airport_code: departureAirport,
        departing_flight_time: arrivalDateTime.toISOString(),
        trip_leg_number: 2,
      });
    }

    try {
      const response = await fetchPOSTRequest(
        "/booking/owner/get-booking-prices",
        payload
      );
      if (response && response.data) {
        dispatch(setOfferPriceResponse(response.data.priceDetails));
        dispatch(setTax(response.data.taxSettings.tax_rate));
      }
    } catch (error) {
      console.error("Error fetching booking price:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const isFormValid =
    departureAirport &&
    arrivalAirport &&
    departureDate &&
    departureTime &&
    (tripType === "one_way" || (returnDate && returnTime));

  const timeOptions = Array.from({ length: 24 }, (_, hour) => {
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour.toString().padStart(2, "0")}:00 ${period}`;
  });

  return (
    <>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={4} mb={5}>
          <TextField
            select
            label="Trip Type"
            value={tripType}
            onChange={(e) =>
              dispatch(setSearchTripDetails({ tripType: e.target.value }))
            }
            fullWidth
          >
            <MenuItem value="one_way">One Way</MenuItem>
            <MenuItem value="round_trip">Round Trip</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={5} mb={5}>
          <TextField
            select
            label="Select Departure"
            value={departureAirport}
            onChange={(e) =>
              dispatch(
                setSearchTripDetails({ departureAirport: e.target.value })
              )
            }
            fullWidth
          >
            <MenuItem value="">Select Departure Airport</MenuItem>
            {Array.isArray(destinations) &&
              destinations.map((dest, index) => (
                <MenuItem key={index} value={dest.airport_code}>
                  {dest.airport_code} - {dest.airport_name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={5} mb={5}>
          <TextField
            select
            label="Select Arrival"
            value={arrivalAirport}
            onChange={(e) =>
              dispatch(setSearchTripDetails({ arrivalAirport: e.target.value }))
            }
            fullWidth
          >
            <MenuItem value="">Select Arrival Airport</MenuItem>
            {Array.isArray(destinations) &&
              destinations.map((dest, index) => (
                <MenuItem key={index} value={dest.airport_code}>
                  {dest.airport_code} - {dest.airport_name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={5} mb={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Departure Date"
              value={departureDate}
              onChange={(newValue) =>
                dispatch(setSearchTripDetails({ departureDate: newValue }))
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={5} mb={5}>
          <TextField
            select
            label="Select Departure Time"
            value={departureTime}
            onChange={(e) =>
              dispatch(setSearchTripDetails({ departureTime: e.target.value }))
            }
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
      </Grid>

      {tripType === "round_trip" && (
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} sm={6} md={5} mb={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Return Date"
                value={returnDate}
                onChange={(newValue) =>
                  dispatch(setSearchTripDetails({ returnDate: newValue }))
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={departureDate || new Date()}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={5} mb={5}>
            <TextField
              select
              label="Select Return Time"
              value={returnTime}
              onChange={(e) =>
                dispatch(setSearchTripDetails({ returnTime: e.target.value }))
              }
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
      )}

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={5} mb={5}>
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
    </>
  );
};

export default SearchBookingComponent;
