// Ground section

// MUI components
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";

const GroundSectionComponent = () => {
  return (
    <FleetDetailCardComponent
      component={
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="subtitle1">Ground Plane?</Typography>
          <Switch
            checked={true}
            onChange={(e) => console.log(e.target.value)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
      }
    />
  );
};

export default GroundSectionComponent;
