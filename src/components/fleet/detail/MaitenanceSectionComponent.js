// Maintenance section

// Default
import { useState, useEffect } from "react";

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

// Utils
import { formatDate } from "../../../utils/Helper";

// Modal
import MaintenanceSectionModal from "./detailModal/MaintenanceSectionModal";

const MaintenanceSectionComponent = () => {
  const { openModal } = useModal();
  const [maintenanceItems, setMaintenanceItems] = useState();
  const fleet = useSelector((state) => state.fleet);

  useEffect(() => {
    const items = [
      {
        key: "tail_number",
        label: "Tail Number",
        value: fleet?.details.tail_number,
      },
      {
        key: "altimeter_due_date",
        label: "Altimeter Due Date",
        value: formatDate(fleet?.details.altimeter_due_date),
      },
      {
        key: "transponder_due_date",
        label: "Transponder Due Date",
        value: formatDate(fleet?.details.transponder_due_date),
      },
      {
        key: "elt_due_date",
        label: "Elt Due Date",
        value: formatDate(fleet?.details.elt_due_date),
      },
      {
        key: "pitot_static_due_date",
        label: "Pitot Static Due Date",
        value: formatDate(fleet?.details.pitot_static_due_date),
      },
      {
        key: "vor_check_due_date",
        label: "Vor Check Due Date",
        value: formatDate(fleet?.details.vor_check_due_date),
      },
      {
        key: "hundred_hour_due",
        label: "Hundred Hour Due",
        value: fleet?.details.hundred_hour_due,
      },
      {
        key: "progressive_inspection_due_date",
        label: "Progressive Inspection Due Date",
        value: formatDate(fleet?.details.progressive_inspection_due_date),
      },
      {
        key: "progressive_maintenance_interval",
        label: "Progressive Maintenance Interval",
        value: fleet?.details.progressive_maintenance_interval,
      },
      {
        key: "special_inspection_due_date",
        label: "Special Inspection Due Date",
        value: formatDate(fleet?.details.special_inspection_due_date),
      },
      {
        key: "propeller_due_date",
        label: "Propeller Due Date",
        value: formatDate(fleet?.details.propeller_due_date),
      },
      {
        key: "engine_overhaul_due_date",
        label: "Engine Overhaul Due Date",
        value: formatDate(fleet?.details.engine_overhaul_due_date),
      },
      {
        key: "structural_inspection_due_date",
        label: "Structural Inspection Due Date",
        value: formatDate(fleet?.details.structural_inspection_due_date),
      },
      {
        key: "corrosion_due_date",
        label: "Corrosion Due Date",
        value: formatDate(fleet?.details.corrosion_due_date),
      },
      {
        key: "landing_gear_due_date",
        label: "Landing Gear Due Date",
        value: formatDate(fleet?.details.landing_gear_due_date),
      },
      {
        key: "hydraulic_system_due_date",
        label: "Hydraulic System Due Date",
        value: formatDate(fleet?.details.hydraulic_system_due_date),
      },
      {
        key: "fuel_system_due_date",
        label: "Fuel System Due Date",
        value: formatDate(fleet?.details.fuel_system_due_date),
      },
    ];

    setMaintenanceItems([...items]);
  }, [fleet]);

  return (
    <>
      <FleetDetailCardComponent
        title="Maintenance"
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("Maintenance")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {maintenanceItems?.map((element, i) =>
              element.key !== "tail_number" ? (
                <Grid item key={i} xs={3}>
                  <FormControl>
                    <Typography variant="subtitle1">{element.label}</Typography>
                    <Typography paragraph>
                      {element.value ? element.value : "-"}
                    </Typography>
                  </FormControl>
                </Grid>
              ) : null
            )}
          </Grid>
        }
      />
      <MaintenanceSectionModal
        maintenanceItems={maintenanceItems}
        setMaintenanceItems={setMaintenanceItems}
      />
    </>
  );
};

export default MaintenanceSectionComponent;
