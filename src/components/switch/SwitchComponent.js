// Switch component 

// MUI components
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const SwitchComponent = ({ label, value, onChange }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="subtitle1">{label}</Typography>
      <Switch checked={value} onChange={onChange} />
    </Stack>
  );
}

export default SwitchComponent;
