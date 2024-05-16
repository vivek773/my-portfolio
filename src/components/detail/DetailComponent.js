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

// Custom
import FleetDetailComponent from "../fleet/FleetDetailComponent";

const DetailComponent = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Fleet");

  const tabDetailContent = () => {
    switch (value) {
      case "Fleet":
        return <FleetDetailComponent />;
      case "Maintenance Logs":
        return null;
      case "People":
        return null;
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
        {/* <Typography variant="h4">{allData.tail_number}</Typography> */}
        <Typography variant="h4">Kc12345</Typography>
      </Box>

      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          centered
        >
          <Tab value="Fleet" label="Fleet" sx={{ textTransform: "none" }} />
          <Tab
            value="Maintenance Logs"
            label="Maintenance Logs"
            sx={{ textTransform: "none" }}
          />
          <Tab value="People" label="People" sx={{ textTransform: "none" }} />
        </Tabs>
      </Box>

    </Box>
      <>{tabDetailContent()}</>
    </>
  );
};

export default DetailComponent;
