// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Button, Card, Chip, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/iconify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { renderChipColorByStatus } from "../../../pages/DashboardAppPage";

const FleetCard = ({
  tail_number,
  year,
  make,
  model,
  hobbs,
  tach,
  standard_hourly_rate,
  status,
  allFleetData,
  tenant_id,
  statusColor,
  color = "primary",
  sx,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 4,
        textAlign: "left",
        paddingLeft: 2,
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
            backgroundColor:
              status === "Available"
                ? (theme) => theme.palette.success.dark
                : status === "Grounded"
                ? (theme) => theme.palette.error.main
                : (theme) => theme.palette.info.main,
            color: "#fff",
          }}
        />
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72, paddingTop: 3 }}>
        <b>Hobbs:</b> {hobbs}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <b>Tach:</b> {tach}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72, paddingTop: 1 }}>
        <b>Rate:</b> ${standard_hourly_rate}/hr
      </Typography>

      <Button
        onClick={() => {
          navigate(`/plane/${tail_number}`, {
            state: {
              allFleetData,
            },
          });
        }}
        size="large"
        variant="contained"
        // component={RouterLink}
        sx={{ mt: 5 }}
      >
        Details
      </Button>
    </Card>
  );
}
