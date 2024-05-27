// Booking flight segments

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

const BookingPassengersComponent = () => {
  const params = useLocation();
  const [bookingPassengers, setBookingPassengers] = useState(null);

  const TABLE_HEAD = [
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "nationality", label: "Nationality" },
    { id: "date_of_birth", label: "Date Of Birth" },
  ];

  useEffect(() => {
    setBookingPassengers([...params?.state?.passengers]);
    // eslint-disable-next-line
  }, [params]);

  return (
    <>
      <BookingCardComponent
        title={"Booking Passengers"}
        component={
          bookingPassengers?.length > 0 ? (
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
                    {Array.isArray(bookingPassengers) &&
                      bookingPassengers?.map((passenger, index) => (
                        <TableRow hover key={index}>
                          <TableCell align="center">
                            {passenger?.first_name}
                          </TableCell>
                          <TableCell align="center">
                            {passenger?.last_name}
                          </TableCell>
                          <TableCell align="center">
                            {passenger?.nationality}
                          </TableCell>
                          <TableCell align="center">
                            {passenger?.date_of_birth}
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

export default BookingPassengersComponent;
