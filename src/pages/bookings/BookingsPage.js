import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../store/features/BookingsSlice";
import DataTable from "../../components/table/TableComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import CustomButton from "../../forms/button/CustomButton";
import { fetchGETRequest } from "../../utils/Services";
import { useLoader } from "../../context/LoaderContext";

const BookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const state = useSelector((state) => state.bookings);

  const columns = [
    { key: "index", label: "#" },
    { key: "tail_number", label: "Tail Number" },
    { key: "departure_date", label: "Departure Date" },
    {
      key: "trip_departure_airport_code",
      label: "Trip Departure Airport Code",
    },
    { key: "trip_arrival_airport_code", label: "Trip Arrival Airport Code" },

    { key: `Custoemr Name`, label: "Customer Name" },

    { key: "total_price", label: "Total Price" },
    { key: "amount_paid", label: "Amount Paid" },

    { key: "number_of_passengers", label: "Number Of Passengers" },

    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
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

  useEffect(() => {
    const columnsKeys = columns.map((item) => item.key);

    if (state.bookings?.length > 0) {
      const newData = state.bookings.map((booking, bookingIndex) => {
        const entries = columnsKeys.map((key) => {
          let value;
          if (key === "index") {
            value = bookingIndex + 1;
          } else if (key === "first_name" || key === "last_name") {
            value = booking.customer[key] ?? "-";
          } else if (key === "action") {
            value = (
              <CustomButton
                size={"small"}
                width={"fit-content"}
                onClick={() => handleView(booking)}
                label={"View"}
              />
            );
          } else if (key === "departure_date") {
            const flightSegment = booking.flightSegments.find(
              (segment) => segment.trip_leg_number === 1
            );
            value = flightSegment
              ? new Date(flightSegment.departing_flight_time).toLocaleString()
              : "-";
          } else {
            value = booking[key] ?? "-";
          }
          return { key, value };
        });

        return entries;
      });

      setRows([...newData]);
    }

    // eslint-disable-next-line
  }, [state]);

  const handleView = (data) => {
    navigate(`/bookings/${data?.booking_id}`, { state: data });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom mb={5}>
          Bookings
        </Typography>
        <SpinnerComponent show={isLoading} />
        {!isLoading && (
          <>
            {rows?.length > 0 ? (
              <DataTable rows={rows} columns={columns} />
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  mt={10}
                  fontWeight={500}
                  textAlign={"center"}
                  color={"Gray"}
                >
                  No data available
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default BookingsPage;
