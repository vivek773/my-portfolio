// Booking page

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../store/features/BookingsSlice";

// Context
import { useLoader } from "../../context/LoaderContext";

// Custom
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import CustomButton from "../../forms/button/CustomButton";
import Label from "../../components/label";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";
import { EDISPATCHED_HELMET, readableStatus } from "../../utils/Constants";
import { formatCurrency, renderChipColorByStatus } from "../../utils/Helper";
import { Stack } from "@mui/material";
import BookingsToolbar from "../../components/bookings/BookingsToolbar";

const BookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const state = useSelector((state) => state.bookings);
  const [searchText, setSearchText] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  const TABLE_HEAD = [
    { id: "index", label: "#" },
    { id: "tail_number", label: "Tail Number" },
    { id: "departure_date", label: "Departure Date" },
    {
      id: "trip_departure_airport_code",
      label: "Departure",
    },
    { id: "trip_arrival_airport_code", label: "Arrival" },

    { id: `Customer Name`, label: "Customer Name" },
    { id: "booking_reference", label: "Booking Reference" },

    { id: "total_price", label: "Total Price" },
    { id: "amount_paid", label: "Amount Paid" },

    { id: "number_of_passengers", label: "# of Passengers" },

    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
    const getBookingsData = async () => {
      startLoading();
      const response = await fetchGETRequest(`/booking/owner/get-bookings`, {});

      if (response?.statusCode === 200 && response) {
        dispatch(setBookings(response?.bookings));
        stopLoading();
      } else {
        stopLoading();
      }
    };
    getBookingsData();

    // eslint-disable-next-line
  }, []);

  const getDepartureDate = (payload) => {
    const flightSegment = payload?.find(
      (segment) => segment.trip_leg_number === 1
    );
    return flightSegment
      ? new Date(flightSegment.departing_flight_time).toLocaleString()
      : "-";
  };

  const handleView = (data) => {
    navigate(`/bookings/${data?.booking_id}`, { state: data });
  };
  useEffect(() => {
    const filterBookingData = () => {
      if (!searchText) {
        return state?.bookings || [];
      }
      return state?.bookings?.filter((item) => {
        const customer = item?.customer;
        if (typeof customer === "object") {
          const fullName =
            `${customer.first_name} ${customer.last_name}`.toLowerCase();
          return fullName.includes(searchText.toLowerCase());
        }
        return false;
      });
    };

    const result = filterBookingData();
    setFilteredBookings(result);
  }, [searchText, state?.bookings]);
  return (
    <>
      <HelmetComponent title={`${EDISPATCHED_HELMET} Bookings`} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={5}
        >
          <Typography variant="h4" gutterBottom mb={0}>
            Bookings
          </Typography>
        </Stack>

        <Card>
          <BookingsToolbar
            searchValue={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
                {Array.isArray(filteredBookings) &&
                filteredBookings.length > 0 ? (
                  filteredBookings.map((booking, index) => (
                    <TableRow hover key={booking.booking_id || index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {booking?.tail_number}
                      </TableCell>
                      <TableCell align="center">
                        {getDepartureDate(booking?.flight_segments)}
                      </TableCell>
                      <TableCell align="center">
                        {booking?.trip_departure_airport_code}
                      </TableCell>
                      <TableCell align="center">
                        {booking?.trip_arrival_airport_code}
                      </TableCell>
                      <TableCell align="center">
                        {`${booking?.customer?.first_name} ${booking?.customer?.last_name}`}
                      </TableCell>
                      <TableCell align="center">
                        {booking?.booking_reference}
                      </TableCell>
                      <TableCell align="center">
                        ${formatCurrency(booking?.total_price)}
                      </TableCell>
                      <TableCell align="center">
                        ${formatCurrency(booking?.amount_paid)}
                      </TableCell>
                      <TableCell align="center">
                        {booking?.number_of_passengers}
                      </TableCell>
                      <TableCell align="center">
                        <Label color={renderChipColorByStatus(booking?.status)}>
                          {readableStatus(booking?.status)}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <CustomButton
                          size={"small"}
                          width={"fit-content"}
                          onClick={() => handleView(booking)}
                          label={"View"}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={TABLE_HEAD.length} align="center">
                      No bookings available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {state?.bookings.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={state?.bookings?.length}
              rowsPerPage={limit}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
            />
          )}
        </Card>
        {/* ))} */}
      </Container>
    </>
  );
};

export default BookingsPage;
