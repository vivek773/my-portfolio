// Maintenance Prediction section

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import CustomButton from "../../../forms/button/CustomButton";

const MaintenancePredictionSectionComponent = () => {
  const itemArr = [
    { label: "Upcoming 100 hour", value: "Click on Calculate to get data" },
    { label: "Upcoming oil change", value: "Click on Calculate to get data" }
  ];

  return (
    <FleetDetailCardComponent
      title="Maintenance"
      action={
        <CustomButton
          label={"Calculate"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
          
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

export default MaintenancePredictionSectionComponent;
