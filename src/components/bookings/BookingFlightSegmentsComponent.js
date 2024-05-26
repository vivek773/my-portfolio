// Booking flight segments

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

// MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom
import BookingCardComponent from "./BookingCardComponent";
import DataTable from "../table/TableComponent";

const BookingFlightSegmentsComponent = () => {
  const params = useLocation()
  const [bookingFlightSegments, setBookingFlightSegments] = useState(null);

  const columns = [
    { key: "trip_leg_number", label: "Trip Leg Number" },
    { key: "departure_airport_code", label: "Departure Airport Code " },
    { key: "departing_flight_time", label: "Departing Flight Time" },
    { key: "arrival_airport_code", label: "Arrival Airport Code" },
  ];

  useEffect(() => {
    function transformData(data, columns) {
      return data.map((item, index) => {
          return columns.map(column => {
              let value = item[column.key];
              if (column.key === "departing_flight_time" && value) {
                  value = moment(value).format('h:mm') ?? "-"; 
              }
              return { key: column.key, value: value ?? "-" };
          });
      });
  }

  const transformedData = transformData(params?.state?.flightSegments, columns);
  setBookingFlightSegments([...transformedData])
// eslint-disable-next-line
    }, [params])

  return (
    <>
      <BookingCardComponent
        title={"Booking Flight Segments"}
        component={
          bookingFlightSegments?.length > 0 ? (
            <Box mt={1} mb={1}> 
            <DataTable rows={bookingFlightSegments} columns={columns} />
            </Box>
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
