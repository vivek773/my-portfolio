import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { formatCurrency } from "../../utils/Helper";
import CustomButton from "../../forms/button/CustomButton";
import { setQuotedPrice } from "../../store/features/CreateBookingSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  margin: "20px 0",
  boxShadow: "none",
  borderRadius: "10px",
  padding: "20px",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "#f2f5f7",
  borderBottom: "1px solid #ddd",
  padding: "15px 25px",
}));

const headerTitleStyle = {
  alignItems: "center",
  display: "flex",
};

const CreateBookingFlightSegmentsComponent = () => {
  const dispatch = useDispatch();
  const selectedPlaneDetails = useSelector(
    (state) => state.createBooking.selectedPlaneDetails
  );
  const offerPriceResponse = useSelector(
    (state) => state.createBooking.offerPriceResponse
  );
  const taxRate = useSelector((state) => state.business.tax_rate);

  const TABLE_HEAD = [
    { id: "trip_leg_number", label: "Leg" },
    { id: "departure_airport_code", label: "Departure" },
    { id: "arrival_airport_code", label: "Arrival" },
    { id: "departing_flight_time", label: "Departure Time" },
    { id: "arrival_time", label: "Estimated Arrival" },
    { id: "flight_duration", label: "Duration" },
    { id: "segment_base_cost", label: "Segment Base Cost" },
    { id: "departure_destination_cost", label: "Departure Destination Cost" },
    { id: "arrival_destination_cost", label: "Arrival Destination Cost" },
    { id: "segment_total_cost", label: "Segment Total Cost" },
    { id: "action", label: "Action" },
  ];

  const handleConfirm = () => {
    const flightSegments = selectedPlaneDetails.flight_segments;

    let basePrice = 0;
    flightSegments.forEach((segment) => {
      basePrice += segment.segment_total_cost;
    });

    console.log(taxRate);

    const tax = (basePrice * taxRate) / 100;
    const totalDueNow = basePrice + tax;

    const quotedPrice = {
      basePrice,
      amountAtTimeOfBooking: basePrice,
      tax,
      totalDueNow,
      amountDueLater: 0,
      amountDueLaterDate: null,
      taxDueLater: 0,
    };

    dispatch(setQuotedPrice(quotedPrice));
  };

  return (
    <>
      {selectedPlaneDetails.selectedPlaneTailNumber && (
        <StyledCard>
          <StyledCardHeader
            title={
              <Typography sx={headerTitleStyle} variant={"h6"}>
                Customer Flight Segments
              </Typography>
            }
          />
          <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((header) => (
                      <TableCell key={header.id} align="center">
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPlaneDetails.flight_segments?.map(
                    (segment, index) => (
                      <TableRow hover key={index}>
                        <TableCell align="center">
                          {segment?.trip_leg_number}
                        </TableCell>
                        <TableCell align="center">
                          {segment?.departure_airport_code}
                        </TableCell>
                        <TableCell align="center">
                          {segment?.arrival_airport_code}
                        </TableCell>
                        <TableCell align="center">
                          {moment(segment?.departing_flight_time).format(
                            "h:mm a MM/DD/YYYY"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {moment(segment?.arrival_time).format(
                            "h:mm a MM/DD/YYYY"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {segment?.flight_duration} hrs
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(segment?.segment_base_cost)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(segment?.departure_destination_cost)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(segment?.arrival_destination_cost)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(segment?.segment_total_cost)}
                        </TableCell>
                        <TableCell align="center">
                          <Box>
                            <Typography variant="body1" color="primary">
                              Edit
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </StyledCard>
      )}

      <CustomButton label={"Confirm"} onClick={handleConfirm} />
    </>
  );
};

export default CreateBookingFlightSegmentsComponent;
