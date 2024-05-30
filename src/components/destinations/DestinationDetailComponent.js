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

const DestinationDetailComponent = () => {
  const params = useLocation();
  const [destinationDetails, setDestinationDetails] = useState(null);

  const { openModal } = useModal();

  const state = useSelector((state) => state.destinations)

  useEffect(() => {
    const findDestination = state?.destinations?.find((item) => item?.destination_id === params?.state?.destination_id)

    const items = [
      {
        key: "city",
        label: "City",
        value: findDestination?.city,
      },
      {
        key: "state",
        label: "State",
        value: findDestination?.state,
      },
      {
        key: "country",
        label: "Country",
        value: findDestination?.country,
      },
      {
        key: "airport_name",
        label: "Airport Name",
        value: findDestination?.airport_name,
      },
      {
        key: "status",
        label: "Status",
        value: findDestination?.status,
      },
      {
        key: "destination_specific_cost",
        label: "Destination Specific Cost",
        value: formatCurrency(findDestination?.destination_specific_cost),
      },
      { key: "airport_timezone", label: "Airport Timezone", value: findDestination?.airport_timezone },
      { key: "show_in_arrival_list", label: "Show In Arrival List", value: findDestination?.show_in_arrival_list },
      { key: "show_in_departure_list", label: "Show In Departure List", value: findDestination?.show_in_departure_list },
      { key: "airport_longitude", label: "Airport Longitude", value: findDestination?.airport_longitude },
      { key: "airport_latitude", label: "Airport Latitude", value: findDestination?.airport_latitude },
    ]
    setDestinationDetails([...items]);
  }, [params, state]);

  return (
    <>
      <DestinationCardComponent
        title={"Destination Detail"}
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
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {destinationDetails?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1">{element.label}</Typography>
                <Typography paragraph>
                  {element?.value ? element.value : "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
      />
      <DestinationDetailsModal destinationDetails={destinationDetails} destinationData={params?.state}/>
    </>
  );
};

export default DestinationDetailComponent;
