// Booking flight segments

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom
import BookingCardComponent from "./BookingCardComponent";
import DataTable from "../table/TableComponent";

const BookingPassengersComponent = () => {
  const params = useLocation()
  const [bookingPassengers, setBookingPassengers] = useState(null);

  const columns = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "nationality", label: "Nationality" },
    { key: "date_of_birth", label: "Date Of Birth" },
  ];

  useEffect(() => {
    function transformData(data, columns) {
      return data.map((item, index) => {
          return columns.map(column => {
              let value = item[column.key];
              return { key: column.key, value: value ?? "-" };
          });
      });
  }

  const transformedData = transformData(params?.state?.passengers, columns);
  setBookingPassengers([...transformedData])
// eslint-disable-next-line
    }, [params])

  return (
    <>
      <BookingCardComponent
        title={"Booking Passengers"}
        component={
          bookingPassengers?.length > 0 ? (
            <Box mt={1} mb={1}> 
            <DataTable rows={bookingPassengers} columns={columns} />
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

export default BookingPassengersComponent;
