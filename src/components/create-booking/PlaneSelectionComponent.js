import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";

import {
  setSelectedPlaneTailNumber,
  setSelectedPlaneDetails,
} from "../../store/features/CreateBookingSlice";

function PlaneSelectionComponent() {
  const dispatch = useDispatch();
  const offerPriceResponse = useSelector(
    (state) => state.createBooking.offerPriceResponse
  );
  const selectedPlaneTailNumber = useSelector(
    (state) => state.createBooking.selectedPlaneDetails.selectedPlaneTailNumber
  );

  const handlePlaneSelection = (tailNumber) => {
    if (selectedPlaneTailNumber === tailNumber) {
      dispatch(setSelectedPlaneTailNumber(""));
      dispatch(setSelectedPlaneDetails({}));
    } else {
      dispatch(setSelectedPlaneTailNumber(tailNumber));
      dispatch(setSelectedPlaneDetails(offerPriceResponse[tailNumber]));
    }
  };

  return (
    <Grid
      container
      spacing={3}
      style={{ marginTop: "20px" }}
      justifyContent="center"
    >
      {Object.entries(offerPriceResponse).map(([tailNumber, data]) => (
        <Grid container item key={tailNumber} xs={12} sm={6} md={5}>
          <Card
            style={{
              border:
                selectedPlaneTailNumber === tailNumber
                  ? "2px solid #479DE1"
                  : "1px solid #ccc",
              borderRadius: "8px",
              margin: "auto",
              minWidth: "300px",
              maxWidth: "450px",
              boxShadow:
                selectedPlaneTailNumber === tailNumber
                  ? "0 0 10px #479DE1"
                  : "0 0 5px #ccc",
              opacity:
                selectedPlaneTailNumber &&
                selectedPlaneTailNumber !== tailNumber
                  ? 0.5
                  : 1,
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
                  <Grid container spacing={1} pb={1} justifyContent="center">
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
                      <Typography>{data.crewTotalFlightDistance} nm</Typography>
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
                  <Typography style={{ color: "red", marginBottom: "10px" }}>
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
                  color={
                    selectedPlaneTailNumber === tailNumber ? "error" : "primary"
                  }
                  fullWidth
                  onClick={() => handlePlaneSelection(tailNumber)}
                  style={{ borderRadius: "8px" }}
                >
                  {selectedPlaneTailNumber === tailNumber
                    ? "Selected - Reset Selection"
                    : "Select"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PlaneSelectionComponent;
