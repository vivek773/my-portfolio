// Bookings Page

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../store/features/BookingsSlice";

// Custom
import DataTable from "../../components/table/TableComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import CustomButton from "../../forms/button/CustomButton";

// Utils
import { fetchGETRequest } from "../../utils/Services";

// Context
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
    { key: "trip_departure_airport_code", label: "Trip Departure Airport Code" },
    { key: "trip_arrival_airport_code", label: "Trip Arrival Airport Code" },
    { key: "total_price", label: "Total Price" },
    { key: "amount_paid", label: "Amount Paid" },
    { key: "status", label: "Status" },
    { key: "number_of_passengers", label: "Number Of Passengers" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "action", label: "Action" },
  ];

  useEffect(() => {
    const getBookingsData = async () => {
      startLoading();
      const response = await fetchGETRequest(
        `/booking/owner/get-bookings`,
        {}
      );

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
      const newData = state.bookings.map((destination, destinationIndex) => {
        const entries = columnsKeys.map((key) => {
          let value;
          if (key === "index") {
            value = destinationIndex + 1;
          } else if (key === "first_name" || key === "last_name") {
            value = destination.customer[key] ?? "-";
          } else if (key === "action") {
            value = (
              <CustomButton size={"small"} width={"fit-content"} onClick={() => handleView(destination)} label={"View"} />
            );
          } else {
            value = destination[key] ?? "-";
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
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom mb={5}>Bookings</Typography>
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
