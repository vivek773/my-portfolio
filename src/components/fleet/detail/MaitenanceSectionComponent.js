// Maintenance section

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import CustomButton from "../../../forms/button/CustomButton";

// Context
import { useModal } from "../../../context/ModalContext";

const MaintenanceSectionComponent = () => {
  const { openModal } = useModal();

  const itemArr = [
    { label: "Annual Due", value: "04/30/2026" },
    { label: "VOR Due", value: "05/11/2024" },
    { label: "ELT Due", value: "04/30/2026" },
    { label: "Annual Due", value: "04/30/2026" },
    { label: "VOR Due", value: "05/11/2024" },
    { label: "ELT Due", value: "04/30/2026" },
  ];

  return (
    <FleetDetailCardComponent
      title="Maintenance"
      action={
        <CustomButton
          label={"Edit"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
          onClick={() => openModal("Maintenance") }
        />
      }
      component={
        <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
          {itemArr.map((element, i) => (
            <Grid item key={i} xs={3}>
              <FormControl>
                <Typography variant="subtitle1">{element.label}</Typography>
                <Typography paragraph>
                  {element.value ? element.value : "-"}
                </Typography>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default MaintenanceSectionComponent;
