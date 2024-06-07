// Fleet page

// Default
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Utils
import { EDISPATCHED_HELMET } from "../../utils/Constants";

// Custom
import HelmetComponent from "../../components/helmet/HelmetComponent";
import CustomButton from "../../forms/button/CustomButton";
import FleetCardComponent from "../../components/fleet/FleetCardComponent";
import { fetchGETRequest } from "../../utils/Services";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

// Context
import { useLoader } from "../../context/LoaderContext";
import { formatCurrency } from "../../utils/Helper";

const FleetPage = () => {
  const [fleetData, setFleetData] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const getFleetData = async () => {
      startLoading();
      const response = await fetchGETRequest(`/fleet/owner/get-fleet`, {});
      if (response?.statusCode === 200 && response && response?.data) {
        setFleetData(response?.data);
        stopLoading();
      }
    };
    getFleetData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED_HELMET} Fleet`} />

      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Typography variant="h4">Fleet</Typography>
          <Box sx={{ mb: 2 }}>
            <CustomButton
              size="large"
              component={Link}
              label={"Add Plane"}
              width={"fit-content"}
              bgColor={"#479DE1"}
              to={"/fleet/add-plane"}
            />
          </Box>
        </Box>

        {isLoading && fleetData?.length === 0 ? (
          <SpinnerComponent show={isLoading} />
        ) : (
          <Grid container spacing={3}>
            {fleetData?.map((fleet) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={fleet?.tenant_id}>
                  <FleetCardComponent
                    tail_number={fleet.tail_number}
                    year={fleet.year}
                    make={fleet.make}
                    model={fleet.model}
                    hobbs={fleet.hobbs}
                    tach_one={fleet.tach_engine_one}
                    tach_two={fleet.tach_engine_two}
                    tenant_id={fleet.tenant_id}
                    standard_hourly_rate={formatCurrency(fleet.hourly_rate)}
                    category={fleet.category}
                    allFleetData={fleet}
                    status={
                      fleet.is_grounded
                        ? "Grounded"
                        : fleet.is_checked_out
                        ? "In flight"
                        : "Available"
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};
export default FleetPage;
