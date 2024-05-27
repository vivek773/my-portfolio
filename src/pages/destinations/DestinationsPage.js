// Destination page

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDestinations } from "../../store/features/DestinationsSlice";

// Custom
import Label from "../../components/label";
import CustomButton from "../../forms/button/CustomButton";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";
import { EDISPATCHED } from "../../utils/Constants";
import { renderChipColorByStatus } from "../../utils/Helper";
 
// Context
import { useLoader } from "../../context/LoaderContext";


const TABLE_HEAD = [
  { id: "number", label: "#" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },
  { id: "country", label: "Country" },
  { id: "airport_name", label: "Airport Name" },
  { id: "airport_code", label: "Airport Code" },
  { id: "airport_latitude", label: "Airport Latitude" },
  { id: "airport_longitude", label: "Airport Longitude" },
  { id: "status", label: "Status" },
  { id: "details", label: "Details" },
];


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
    <HelmetComponent title={`${EDISPATCHED} | Destinations`} />
      <Container maxWidth="xl">
      
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

        {isLoading && (
          <Box mt={10}>
            <SpinnerComponent show={isLoading} />
          </Box>
        )}

        {!isLoading && 
        (destinations?.length === 0 ? (
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
        ) : (
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
                        <TableCell align="center">
                          {destination.state}
                        </TableCell>
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
                            color={renderChipColorByStatus(destination.status)}
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
              count={destinations?.length}
              rowsPerPage={limit}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
            />
          </Card>
        ))}
      </Container>
    </>
  );
}
