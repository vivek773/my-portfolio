// Airworthiness Section

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDestinations } from "../../store/features/DestinationsSlice";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import DataTable from "../../components/table/TableComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";

// Context
import { useLoader } from "../../context/LoaderContext";

const AirworthinessSectionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const state = useSelector((state) => state.destinations);

  const columns = [
    { key: "index", label: "#" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "airport_name", label: "Airport Name" },
    { key: "airport_code", label: "Airport Code" },
    { key: "airport_latitude", label: "Airport Latitude" },
    { key: "airport_longitude", label: "Airport Longitude" },
    { key: "status", label: "Status" },
  ];

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

  useEffect(() => {
    const columnsKeys = columns.map((item) => item.key);

    if (state?.destinations?.length > 0) {
      const newData = state.destinations.map(
        (destination, destinationIndex) => {
          const entries = Object.entries(destination)
            .map(([destinationKey, destinationValue]) => {
              if (columnsKeys.includes(destinationKey)) {
                return {
                  key: destinationKey,
                  value: destinationValue ?? "-",
                };
              }
              return null;
            })
            .filter((entry) => entry !== null);

          entries.unshift({
            key: "index",
            value: destinationIndex + 1,
          });

          return entries;
        }
      );
      setRows([...newData]);
    }
    // eslint-disable-next-line 
  }, [state]);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          mt={5}
          mb={5}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h4" gutterBottom mb={0}>
            Directions
          </Typography>
          <CustomButton
            label="Create Directions"
            width={"fit-content"}
            sx={{
              width: "auto",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/destinations/create-destination")}
          />
        </Box>

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

export default AirworthinessSectionComponent;
