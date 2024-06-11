// Details section

// Default
import { useEffect, useState } from "react";

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import CustomButton from "../../../forms/button/CustomButton";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../../context/ModalContext";

// Modal
import DetailsSectionModal from "./detailModal/DetailsSectionModal";
import { formatCurrency } from "../../../utils/Helper";

const DetailsSectionComponent = () => {
  const [detailsItems, setDetailsItems] = useState([]);
  const fleet = useSelector((state) => state.fleet);
  const { openModal } = useModal();

  const CATEGORY_OPTIONS = [
    { label: "ASEL", value: "airplane_single_engine_land" },
    { label: "AMEL", value: "airplane_multi_engine_land" },
  ];

  useEffect(() => {
    const items = [
      {
        key: "cruise_speed_kts",
        label: "Cruise Speed (kts)",
        value: `${fleet?.details?.cruise_speed_kts}`,
      },
      {
        key: "year",
        label: "Year",
        value: fleet?.details?.year,
      },
      {
        key: "make",
        label: "Make",
        value: fleet?.details?.make,
      },
      {
        key: "model",
        label: "Model",
        value: fleet?.details?.model,
      },
      {
        key: "passenger_seats",
        label: "Passenger Seats",
        value: fleet?.details?.passenger_seats,
      },
      {
        key: "total_seats",
        label: "Total Seats",
        value: fleet?.details?.total_seats,
      },
      {
        key: "category",
        label: "Category",
        value: fleet?.details?.category,
      },
      {
        key: "icao_equipment",
        label: "Icao Equipment",
        value: fleet?.details?.icao_equipment,
      },
      {
        key: "icao_surveillance_codes",
        label: "Icao Surveillance Codes",
        value: fleet?.details?.icao_surveillance_codes,
      },
      {
        key: "serial_number",
        label: "Serial Number",
        value: fleet?.details?.serial_number,
      },
      {
        key: "faa_designator",
        label: "Faa Designator",
        value: fleet?.details?.faa_designator,
      },
      {
        key: "fuel_burn_rate",
        label: "Fuel Burn Rate",
        value: fleet?.details?.fuel_burn_rate,
      },
      {
        key: "empty_weight",
        label: "Empty Weight",
        value: fleet?.details?.empty_weight,
      },
      {
        key: "fuel_capacity",
        label: "Fuel Capacity",
        value: fleet?.details?.fuel_capacity,
      },
      {
        key: "hourly_rate",
        label: "Hourly Rate",
        value: formatCurrency(fleet?.details?.hourly_rate),
      },
    ];
    setDetailsItems([...items]);
  }, [fleet]);

  return (
    <>
      <FleetDetailCardComponent
        title="Details"
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("Details")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {detailsItems?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <FormControl>
                  <Typography variant="subtitle1">{element.label}</Typography>
                  <Typography paragraph>
                    {element.key === "category"
                      ? element.value
                        ? CATEGORY_OPTIONS.find(
                            (item) => item.value === element.value
                          ).label
                        : "-"
                      : element.value
                      ? element.key === "hourly_rate"
                        ? `${element.value}`
                        : element.key === "cruise_speed_kts"
                        ? `${element.value} kts`
                        : element.value
                      : "-"}
                  </Typography>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        }
      />
      <DetailsSectionModal
        detailsItems={detailsItems}
        setDetailsItems={setDetailsItems}
      />
    </>
  );
};

export default DetailsSectionComponent;
