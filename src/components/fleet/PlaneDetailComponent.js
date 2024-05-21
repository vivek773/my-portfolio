// Details page

// Default
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Redux 
import { useSelector } from "react-redux";

// Custom
import FleetDetailComponent from "./detail/FleetDetailComponent";
import AirworthinessSectionComponent from "./airworthiness/AirworthinessSectionComponent";

const PlaneDetailComponent = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Detail");
  const fleet = useSelector((state) => state.fleet)
 
  const tabDetailContent = () => {
    switch (value) {
      case "Detail":
        return <FleetDetailComponent />;
      case "Maintenance Logs":
        return null;
      case "Airworthiness Directives":
        return <AirworthinessSectionComponent />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon color="#000" />
          </IconButton>
          <Typography variant="h4">{fleet?.tail_number}</Typography>
        </Box>

        <Box sx={{ bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            centered
          >
            <Tab value="Detail" label="Detail" sx={{ textTransform: "none" }} />
            <Tab
              value="Maintenance Logs"
              label="Maintenance Logs"
              sx={{ textTransform: "none" }}
            />
            <Tab value="Airworthiness Directives" label="Airworthiness Directives" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>

      </Box>
      <>{tabDetailContent()}</>
    </>
  );
};

export default PlaneDetailComponent;
