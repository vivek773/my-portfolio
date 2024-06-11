import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import CustomSelect from "../../forms/select/CustomSelect";
import SwitchComponent from "../switch/SwitchComponent";

// Context
import { useToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";
import { fetchPOSTRequest } from "../../utils/Services";

// Utils
import { CHECKWX_API_KEY, TIME_ZONE } from "../../utils/Constants";
import { Container, Stack } from "@mui/system";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const AddDestinationComponent = () => {
  const { setToast } = useToast();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [airportCode, setAirportCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addCustomAirport, setAddCustomAirport] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    airport_code: "",
    airport_name: "",
    city: "",
    state: "",
    country: "",
    destination_specific_cost: 0,
    show_in_departure_list: false,
    show_in_arrival_list: false,
    airport_timezone: "",
    airport_latitude: "",
    airport_longitude: "",
  });

  const handleSearch = async () => {
    if (!airportCode) {
      setToast({
        open: true,
        message: "Airport code is required.",
        severity: "error",
      });
      return;
    }

    setIsSearching(true);
    setAddCustomAirport(false);
    setShowForm(false);

    try {
      const response = await fetch(
        `https://api.checkwx.com/station/${airportCode}`,
        {
          headers: {
            "X-Api-Key": CHECKWX_API_KEY,
          },
        }
      );
      const data = await response.json();

      if (response.status !== 200 || data.results === 0) {
        setAddCustomAirport(true);
      } else {
        setSearchResults(data.data);
      }
    } catch (error) {
      setToast({
        open: true,
        message: "Failed to fetch data.",
        severity: "error",
      });
      setAddCustomAirport(true);
    }

    setIsSearching(false);
  };

  const handleSetFormValues = (airport = null) => {
    setFormValues({
      airport_code: airport ? airport.icao : "",
      airport_name: airport ? airport.name : "",
      city: airport ? airport.city : "",
      state: airport ? airport.state.name : "",
      country: airport ? airport.country.name : "",
      airport_latitude: airport ? airport.latitude.decimal : "",
      airport_longitude: airport ? airport.longitude.decimal : "",
      destination_specific_cost: 0,
      show_in_departure_list: false,
      show_in_arrival_list: false,
      airport_timezone: "",
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSwitchChange = (name) => {
    setFormValues({
      ...formValues,
      [name]: !formValues[name],
    });
  };

  const handleSelectChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    const valuesToSend = { ...formValues };
    if (
      typeof formValues.airport_timezone === "object" &&
      formValues.airport_timezone !== null
    ) {
      valuesToSend.airport_timezone = formValues.airport_timezone.value;
    }

    const response = await fetchPOSTRequest(
      `/destination/owner/add-destination`,
      valuesToSend
    );

    if (response?.statusCode === 201 && response) {
      setToast({
        open: true,
        message: response?.Message,
        severity: "success",
      });
      stopLoading();
      navigate(-1);
    } else {
      setToast({
        open: true,
        message: response?.Message,
        severity: "error",
      });
      stopLoading();
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <h2 style={{ justifyContent: "center" }}>Add Destination</h2>

        <Stack spacing={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
                mb={3}
              >
                Search for the airport using ICAO code and we will fetch the
                details for you. Try different combinations for example if X26
                doesn't work, try KX26.
              </Typography>
              <TextField
                label="Airport ICAO Code"
                value={airportCode}
                onChange={(e) => setAirportCode(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSearch}
                fullWidth
                size="large"
              >
                Search
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              {addCustomAirport && (
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  We couldn't find the airport. Please add manually.
                </Typography>
              )}

              {!isSearching && addCustomAirport && (
                <Button
                  variant="contained"
                  onClick={() => handleSetFormValues()}
                  fullWidth
                  size="large"
                >
                  Add Manually
                </Button>
              )}
            </Grid>
          </Grid>
        </Stack>

        {isSearching && <CircularProgress />}
      </Container>

      <Container maxWidth="md">
        {searchResults.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ICAO</TableCell>
                <TableCell>Airport Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((airport) => (
                <TableRow key={airport.icao}>
                  <TableCell>{airport.icao}</TableCell>
                  <TableCell>{airport.name}</TableCell>
                  <TableCell>{airport.city}</TableCell>
                  <TableCell>{airport.state.name}</TableCell>
                  <TableCell>{airport.country.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleSetFormValues(airport)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              {showForm && (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      name="airport_code"
                      label="Airport Code"
                      value={formValues.airport_code}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="airport_name"
                      label="Airport Name"
                      value={formValues.airport_name}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="city"
                      label="City"
                      value={formValues.city}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="state"
                      label="State"
                      value={formValues.state}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="country"
                      label="Country"
                      value={formValues.country}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="destination_specific_cost"
                      label="Destination Specific Cost"
                      type="number"
                      value={formValues.destination_specific_cost}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      name="airport_latitude"
                      label="Latitude"
                      type="number"
                      value={formValues.airport_latitude}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      name="airport_longitude"
                      label="Longitude"
                      type="number"
                      value={formValues.airport_longitude}
                      onChange={handleChange}
                      fullWidth
                    />
                    <SwitchComponent
                      value={formValues.show_in_departure_list}
                      label={"Show In Departure List"}
                      onChange={() =>
                        handleSwitchChange("show_in_departure_list")
                      }
                    />
                    <SwitchComponent
                      value={formValues.show_in_arrival_list}
                      label={"Show In Arrival List"}
                      onChange={() =>
                        handleSwitchChange("show_in_arrival_list")
                      }
                    />
                    <CustomSelect
                      name="airport_timezone"
                      label="Airport Timezone"
                      onChange={(_, newValue) =>
                        handleSelectChange("airport_timezone", newValue)
                      }
                      options={TIME_ZONE}
                      value={formValues.airport_timezone}
                    />
                    <CustomButton
                      label={"Add Destination"}
                      size={"large"}
                      type="submit"
                      disabled={false}
                      bgColor={"#479DE1"}
                      isLoading={isLoading}
                      onClick={handleSubmit}
                    />
                  </Stack>
                </form>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default AddDestinationComponent;
