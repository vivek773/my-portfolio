// Destination details

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import DestinationCardComponent from "./DestinationCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import DestinationDetailsModal from "./destinationModal/DestinationDetailModal";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../context/ModalContext";

// Utils
import { formatCurrency } from "../../utils/Helper";
import { Stack } from "@mui/material";

const DestinationDetailComponent = () => {
  const params = useLocation();
  const [destinationDetails, setDestinationDetails] = useState(null);

  const { openModal } = useModal();

  const state = useSelector((state) => state.destinations);

  useEffect(() => {
    const findDestination = state?.destinations?.find(
      (item) => item?.destination_id === params?.state?.destination_id
    );

    setDestinationDetails(findDestination);
  }, [params, state]);

  return (
    <>
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
      </Stack>
      <DestinationCardComponent
        title={`${destinationDetails?.city} ${destinationDetails?.state}`}
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("destinationDetail")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 9 }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Airport Name</Typography>
              <Typography paragraph>
                {destinationDetails?.airport_name || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">City</Typography>
              <Typography paragraph>
                {destinationDetails?.city || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">State</Typography>
              <Typography paragraph>
                {destinationDetails?.state || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Country</Typography>
              <Typography paragraph>
                {destinationDetails?.country || "-"}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography paragraph>
                {destinationDetails?.status || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                Destination Specific Cost
              </Typography>
              <Typography paragraph>
                ${formatCurrency(destinationDetails?.destination_specific_cost)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Airport Timezone</Typography>
              <Typography paragraph>
                {destinationDetails?.airport_timezone || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Show In Arrival List</Typography>
              <Typography paragraph>
                {destinationDetails?.show_in_arrival_list ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                Show In Departure List
              </Typography>
              <Typography paragraph>
                {destinationDetails?.show_in_departure_list ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Airport Longitude</Typography>
              <Typography paragraph>
                {destinationDetails?.airport_longitude || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Airport Latitude</Typography>
              <Typography paragraph>
                {destinationDetails?.airport_latitude || "-"}
              </Typography>
            </Grid>
          </Grid>
        }
      />
      <DestinationDetailsModal
        destinationDetails={destinationDetails}
        destinationData={params?.state}
      />
    </>
  );
};

export default DestinationDetailComponent;
