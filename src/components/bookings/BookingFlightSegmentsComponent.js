// Booking flight segments

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

// MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Custom
import BookingCardComponent from "./BookingCardComponent";

const BookingFlightSegmentsComponent = () => {
  const params = useLocation();
  const [bookingFlightSegments, setBookingFlightSegments] = useState(null);

  const TABLE_HEAD = [
    { id: "trip_leg_number", label: "Trip Leg Number" },
    { id: "departure_airport_code", label: "Departure Airport Code " },
    { id: "departing_flight_time", label: "Departing Flight Time" },
    { id: "arrival_airport_code", label: "Arrival Airport Code" },
    { id: "arrival_time", label: "Estimated Arrival" },
  ];

  useEffect(() => {
    setBookingFlightSegments([...params?.state?.flight_segments]);
    // eslint-disable-next-line
  }, [params]);

  return (
    <>
      <BookingCardComponent
        title={"Booking Flight Segments"}
        component={
          bookingFlightSegments?.length > 0 ? (
            <Card>
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
                    {Array.isArray(bookingFlightSegments) &&
                      bookingFlightSegments?.map((segment, index) => (
                        <TableRow hover key={index}>
                          <TableCell align="center">
                            {segment?.trip_leg_number}
                          </TableCell>
                          <TableCell align="center">
                            {segment?.departure_airport_code}
                          </TableCell>
                          <TableCell align="center">
                            {moment(segment?.departing_flight_time).format(
                              "h:mm a"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {segment?.arrival_airport_code}
                          </TableCell>
                          <TableCell align="center">
                            {moment(segment?.arrival_time).format("h:mm a")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ) : (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={500}
                textAlign={"center"}
                color={"Gray"}
              >
                No data available
              </Typography>
            </Box>
          )
        }
      />
    </>
  );
};

export default BookingFlightSegmentsComponent;
