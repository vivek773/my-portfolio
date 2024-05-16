// Ground section

// MUI components
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const GroundSectionComponent = () => {
  return (
    <CardContent sx={{ "&:last-child": { paddingBottom: "16px" }}}>
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
    </CardContent>
  );
};

export default GroundSectionComponent;
