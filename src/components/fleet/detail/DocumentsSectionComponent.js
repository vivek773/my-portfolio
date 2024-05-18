// Document section

// MUI components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";

const DocumentsSectionComponent = () => {
  
  const itemArr = [
    { label: "Pilot Operating Handbook", value: "" },
    { label: "Checklist", value: "" },
    { label: "Weight and Balance", value: "" },
    { label: "Airworthiness Certificate", value: "" },
  ];

  return (
    <FleetDetailCardComponent
      title="Documents"
      component={
        <Grid container spacing={{ xs: 5, md: 2 }} columns={{ md: 12 }}>
          {itemArr.map((item, index) => (
            <Grid sx={{ opacity: "1" }} item key={index} xs={6}>
              <Stack
                useFlexGap
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                margin="0px 10px"
              >
                <Typography variant="subtitle1" noWrap>
                  {item.label}
                </Typography>
                <Box
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton color="primary">
                    {" "}
                    <VisibilityIcon />{" "}
                  </IconButton>
                  <IconButton color="primary">
                    <DownloadIcon />{" "}
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="application/pdf" type="file" />
                    <CloudUploadIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default DocumentsSectionComponent;
