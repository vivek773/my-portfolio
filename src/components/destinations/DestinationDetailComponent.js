import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DestinationCardComponent from "./DestinationCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import DestinationDetailsModal from "./destinationModal/DestinationDetailModal";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
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
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Airport Name
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.airport_name || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                City
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.city || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                State
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.state || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Country
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.country || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.status || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Destination Specific Cost
              </Typography>
              <Typography paragraph align="center">
                {formatCurrency(destinationDetails?.destination_specific_cost)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Airport Timezone
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.airport_timezone || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Show In Arrival List
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.show_in_arrival_list ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Show In Departure List
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.show_in_departure_list ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Airport Longitude
              </Typography>
              <Typography paragraph align="center">
                {destinationDetails?.airport_longitude || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" align="center">
                Airport Latitude
              </Typography>
              <Typography paragraph align="center">
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
