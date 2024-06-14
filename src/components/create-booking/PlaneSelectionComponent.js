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
import { formatCurrency } from "../../utils/Helper";
import {
  setSelectedPlaneTailNumber,
  setBasePrice,
  setTax,
  setTotalBookingPrice,
  setTotalDueNow,
  setDueLaterAmount,
  setDueLaterDate,
} from "../../store/features/CreateBookingSlice";

function PlaneSelectionComponent() {
  const dispatch = useDispatch();
  const offerPriceResponse = useSelector(
    (state) => state.createBooking.offerPriceResponse
  );

  const handlePlaneSelection = (tailNumber, data) => {
    dispatch(setSelectedPlaneTailNumber(tailNumber));
    dispatch(setBasePrice(data.basePrice));
    dispatch(setTax(data.tax));
    dispatch(setTotalBookingPrice(data.basePrice + data.tax));
    dispatch(setTotalDueNow(data.totalDueNow));
    dispatch(setDueLaterAmount(data.amountDueLater));
    dispatch(setDueLaterDate(data.amountDueLaterDate));
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
              border: "1px solid #ccc",
              borderRadius: "8px",
              margin: "auto",
              minWidth: "300px",
              maxWidth: "450px",
              boxShadow: "0 0 5px #ccc",
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
                      <Typography>{formatCurrency(data.basePrice)}</Typography>
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
                  fullWidth
                  style={{ borderRadius: "8px" }}
                  onClick={() => handlePlaneSelection(tailNumber, data)}
                >
                  Select
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
