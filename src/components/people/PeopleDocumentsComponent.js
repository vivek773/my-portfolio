// People Document

// Default
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
import PeopleCardComponent from "./PeopleCardComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

const PeopleDocumentsComponent = () => {
  const params = useLocation();
  const [peopleDocuments, setPeopleDocuments] = useState(null);

  useEffect(() => {
    const items = [
      {
        key: "drivers_license",
        label: "Drivers License",
        value: params?.state?.details?.documents?.drivers_license,
      },
      {
        key: "pilot_license",
        label: "Pilot License",
        value: params?.state?.details?.documents?.pilot_license,
      },
    ];
    setPeopleDocuments([...items]);
  }, [params]);

  return (
    <>
      <PeopleCardComponent
        title="People Documents"
        component={
          <Grid
            container
            spacing={{ xs: 5, md: 2 }}
            columns={{ md: 12 }}
            style={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <SpinnerComponent show={false} size={30} />
            </Box>
            {peopleDocuments.map((item, index) => (
              <Grid item key={index} xs={6} sx={{ opacity: false ? 0.5 : 1 }}>
                <Stack
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
                    {item.value && (
                      <IconButton
                        color="primary"
                        // onClick={() => viewPDF(item.key)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                    {item.value && (
                      <IconButton
                        color="primary"
                        // onClick={() => downloadDocuments(item.key)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      // onClick={() => {
                      //   setDocumentModal(item.label);
                      //   openModal("Documents");
                      // }}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        }
      />
    </>
  );
};

export default PeopleDocumentsComponent;
