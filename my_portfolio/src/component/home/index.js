// Default
import React from "react";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Utils
import { CONFIG } from "../../utils/constant";

// Theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customTheme } from "../../theme";

const Home = () => {
  const userName = CONFIG.username.split(" ");
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.sm)
  );

  return (
    <Container maxWidth="lg" >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" className="home-hello-text">
            Hello, I am
          </Typography>
          <Typography
            variant={matches ? "h4" : "h3"}
            className="home-name-text"
          >{`< ${userName[0]} `}</Typography>
          <Typography
            variant={matches ? "h4" : "h3"}
            className="home-name-text"
          >{`${userName[1]} />`}</Typography>
          <Typography variant={matches ? "h5" : "h4"} className="home-dev-text">
            {CONFIG.developer}
          </Typography>

          <Box display={"flex"} gap={5} marginTop={"30px"}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                variant={matches ? "h2" : "h2"}
                className="home-experience-text"
                color={"#f0db4f"}
              >
                {CONFIG.yearOfExperience}
              </Typography>
              <Typography
                paragraph
                maxWidth={"100px"}
                className="home-experience-text"
                color={"#ffffff"}
              >
                years of experience
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                variant={matches ? "h2" : "h2"}
                className="home-experience-text"
                color={"#f0db4f"}
              >
                {CONFIG.completedProjects}
              </Typography>
              <Typography
                paragraph
                className="home-experience-text"
                maxWidth={"200px"}
                color={"#ffffff"}
              >
                Projects Completed around the world
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
