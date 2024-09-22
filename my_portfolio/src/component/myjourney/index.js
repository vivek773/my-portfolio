// Default
import React from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Utils
import { COMPANIES } from "../../utils/constant";

// Theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customTheme } from "../../theme";

const MyJourney = () => {
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.md)
  );

  const data = [
    {
      year: "2016",
      doing: "Started BCA at MJPRU, Bareilly.",
    },
    {
      year: "2017",
      doing: "Continued my BCA studies, building a strong foundation in programming.",
    },
    {
      year: "2018",
      doing: "Explored web development while continuing BCA.",
    },
    {
      year: "2019",
      doing: "Completed BCA and started MCA at AKTU, Lucknow.",
    },
    {
      year: "2020",
      doing: "Developed new skills in web technologies during MCA amidst the pandemic.",
    },
    {
      year: "2021",
      doing: "Worked on a freelance project and completed MCA.",
    },
    {
      year: "2022",
      doing: "Completed a 6-month internship in frontend development at Prolance IT.",
    },
    {
      year: "2024",
      doing: "Currently working at Prolance IT, delivering successful projects.",
    },
  ];
  

  return (
    <Box className="my-journey">
      <Container maxWidth="lg">
        <Typography variant="h5" className="my-journey-title">
          myJourney<span style={{ color: "#ffffff" }}>()</span>
        </Typography>
        <Typography paragraph className="my-journey-subtitle">
        Throughout my journey, I've acquired a strong foundation in software development while continually evolving my skills. From academic achievements to professional projects, I'm always eager to learn, grow, and take on new challenges in the ever-changing tech landscape.
        </Typography>

        <Grid container spacing={2} mt={4}>
          {data.map((journey) => {
            return (
              <Grid item xs={4} sm={4} md={3} lg={2} key={journey.year}>
                <Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography className="my-journey-list-title">
                      {journey.year}
                    </Typography>
                    <Box className="my-journey-list-line"></Box>
                  </Box>
                  <Typography className="my-journey-list-subtitle">
                    {journey.doing}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <button className="my-journey-list-upload-btn">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <CloudUploadIcon sx={{ padding: 0 }} />
            <Typography paragraph margin={0}>
              Upload Resume
            </Typography>
          </Box>
        </button>
      </Container>
    </Box>
  );
};

export default MyJourney;
