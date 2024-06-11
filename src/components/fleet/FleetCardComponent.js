// Fleet card

// Default
import { useNavigate } from "react-router-dom";

// MUI components
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom
import CustomButton from "../../forms/button/CustomButton";

// Context

// Utils
import { CHIP } from "../../utils/Color";

const FleetCardComponent = ({
  tail_number,
  year,
  make,
  model,
  hobbs,
  tach_one,
  tach_two,
  standard_hourly_rate,
  status,
  category,
  sx,
}) => {
  const navigate = useNavigate();

  const chipBgColor = (chipStatus) => {
    switch (chipStatus) {
      case "Available":
        return CHIP.success;
      case "Grounded":
        return CHIP.danger;
      default:
        return CHIP.info;
    }
  };

  return (
    <Card
      sx={{
        py: 2,
        textAlign: "left",
        borderRadius: 3,
        paddingLeft: 2,
        boxShadow:
          "0px 2px 4px -1px rgba(145, 158, 171, 0.2), 0px 4px 5px 0px rgba(145, 158, 171, 0.14), 0px 1px 10px 0px rgba(145, 158, 171, 0.12)",
        ...sx,
      }}
    >
      <Typography variant="h3" sx={{ opacity: 0.72 }}>
        <b>{tail_number}</b>
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <b>
          {year} {make} {model}
        </b>
      </Typography>
      <Typography sx={{ paddingTop: 1 }}>
        <Chip
          size="small"
          label={status}
          sx={{
            backgroundColor: chipBgColor(status),
            color: "#ffffff",
          }}
        />
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72, paddingTop: 3 }}>
        <b>Hobbs:</b> {hobbs ?? "--"}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <b>Tach One:</b> {tach_one ?? "--"}
      </Typography>
      {category === "airplane_multi_engine_land" && (
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          <b>Tach Two:</b> {tach_two ?? "--"}
        </Typography>
      )}
      <Typography variant="subtitle2" sx={{ opacity: 0.72, paddingTop: 1 }}>
        <b>Rate:</b> {standard_hourly_rate}/hr
      </Typography>

      <Box sx={{ mt: 5 }}>
        <CustomButton
          onClick={() =>
            navigate(`/fleet/${tail_number}`, { state: tail_number })
          }
          size="large"
          label={"Details"}
          width={"fit-content"}
          bgColor={"#479DE1"}
        />
      </Box>
    </Card>
  );
};

export default FleetCardComponent;
