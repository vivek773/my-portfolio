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
  setQuotedPrice,
} from "../../store/features/CreateBookingSlice";

function PlaneSelectionComponent() {
  const dispatch = useDispatch();
  const offerPriceResponse = useSelector(
    (state) => state.createBooking.offerPriceResponse
  );
  const selectedPlaneTailNumber = useSelector(
    (state) => state.createBooking.selectedPlaneDetails.selectedPlaneTailNumber
  );
  const isSegmentConfirmed = useSelector(
    (state) => state.createBooking.isSegmentConfirmed
  );

  const handlePlaneSelection = (tailNumber) => {
    if (selectedPlaneTailNumber === tailNumber) {
      dispatch(setSelectedPlaneTailNumber(""));
      dispatch(setSelectedPlaneDetails({}));
      if (isSegmentConfirmed) {
        dispatch(setQuotedPrice({}));
      }
    } else {
      const selectedPlaneDetails = offerPriceResponse[tailNumber];
      dispatch(setSelectedPlaneTailNumber(tailNumber));
      dispatch(setSelectedPlaneDetails(selectedPlaneDetails));

      // Update the quoted price if confirm has been clicked at least once
      if (isSegmentConfirmed) {
        const flightSegments = selectedPlaneDetails.flight_segments;

        let totalBaseCost = 0;
        let totalTax = 0;
        let totalDueNow = 0;
        let totalDueLater = 0;
        let taxDueLater = 0;
        let taxDueNow = 0;

        flightSegments.forEach((segment) => {
          totalBaseCost += Number(segment.segment_base_cost || 0);
          totalBaseCost += Number(segment.departure_destination_cost || 0);
          totalBaseCost += Number(segment.arrival_destination_cost || 0);
          totalTax += Number(segment.segment_tax || 0);
          totalDueNow += Number(segment.amount_due_now || 0);
          totalDueLater += Number(segment.amount_due_later || 0);
          taxDueLater += Number(segment.tax_due_later || 0);
          taxDueNow += Number(segment.tax_due_now || 0);
        });

        const tripTotal = totalBaseCost + totalTax;

        const quotedPrice = {
          amountDueLater: totalDueLater,
          amountDueLaterDate: flightSegments[0]?.due_later_date || null,
          basePrice: totalBaseCost,
          amountAtTimeOfBooking: totalDueNow,
          tax: totalTax,
          tax_due_now: taxDueNow,
          taxDueLater: taxDueLater,
          totalDueNow: totalDueNow,
          tripTotal: tripTotal,
          flight_segments: flightSegments.map((segment) => ({
            ...segment,
            segment_total_cost: Number(segment.segment_total_cost || 0),
            tax: Number(segment.segment_tax || 0),
          })),
        };

        dispatch(setQuotedPrice(quotedPrice));
      }
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
                <b>{tailNumber}</b>
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
