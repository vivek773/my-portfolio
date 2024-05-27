import {
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDestinations } from "../../store/features/DestinationsSlice";
import { fetchGETRequest } from "../../utils/Services";
import { useLoader } from "../../context/LoaderContext";
import { CHIP } from "../../utils/Color"; // Assuming your theme file is in this path
import Label from "../../components/label";
import CustomButton from "../../forms/button/CustomButton";

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "state", label: "State", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "airport_name", label: "Airport Name", alignRight: false },
  { id: "airport_code", label: "Airport Code", alignRight: false },
  { id: "airport_latitude", label: "Airport Latitude", alignRight: false },
  { id: "airport_longitude", label: "Airport Longitude", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "details", label: "Details", alignRight: true },
];

const renderChipColorByStatus = (status) => {
  if (status === "active") {
    return "success";
  } else if (status === "inactive") {
    return "error";
  } else if (status === "invited") {
    return "info";
  } else if (status === "banned") {
    return "error";
  } else if (status === "inactive") {
    return "warning";
  }
};

export default function DestinationsPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isLoading, startLoading, stopLoading } = useLoader();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { destinations } = useSelector((state) => state.destinations);

  useEffect(() => {
    const getDestinationsData = async () => {
      startLoading();
      const response = await fetchGETRequest(
        `/destination/owner/get-destinations`,
        {}
      );

      if (response?.statusCode === 200 && response) {
        dispatch(setDestinations(response?.destinations));
        stopLoading();
      } else {
        stopLoading();
      }
    };
    getDestinationsData();

    // eslint-disable-next-line
  }, []);

  const handleView = (data) => {
    navigate(`/destinations/${data?.destination_id}`, { state: data });
  };

  return (
    <>
      <Container maxWidth="xl">
        {isLoading && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={5}
        >
          <Typography variant="h4" gutterBottom mb={0}>
            Destinations
          </Typography>
          <CustomButton
            label="Add Destination"
            width={"fit-content"}
            sx={{
              width: "auto",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/destinations/add-destination")}
          />
        </Stack>

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
                {Array.isArray(destinations) &&
                  destinations?.map((destination, index) => (
                    <TableRow hover key={destination.destination_id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{destination.city}</TableCell>
                      <TableCell align="center">{destination.state}</TableCell>
                      <TableCell align="center">
                        {destination.country}
                      </TableCell>
                      <TableCell align="center">
                        {destination.airport_name}
                      </TableCell>
                      <TableCell align="center">
                        {destination.airport_code}
                      </TableCell>
                      <TableCell align="center">
                        {destination.airport_latitude}
                      </TableCell>
                      <TableCell align="center">
                        {destination.airport_longitude}
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          color={
                            // (status === "banned" && "inactive") || "success"
                            renderChipColorByStatus(destination.status)
                          }
                        >
                          {destination.status}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <CustomButton
                          width={"fit-content"}
                          onClick={() => handleView(destination)}
                          label={"View"}
                          size={"small"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={destinations.length}
            rowsPerPage={limit}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
          />
        </Card>
      </Container>
    </>
  );
}
