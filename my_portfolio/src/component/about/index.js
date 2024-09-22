// About section

// MUI components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// Utils
import { CONFIG, ABOUT_CARD_DATA } from "../../utils/constant";

const About = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={8} mt={10} mb={10}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant="h5" className="about-title">
            aboutMe<span style={{ color: "#ffffff" }}>()</span>
          </Typography>
          <Typography paragraph className="about-info">
            {CONFIG.about}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          display={"flex"}
          gap={2}
          flexDirection={"column"}
        >
          {ABOUT_CARD_DATA.map((card) => {
            return (
              <Box className="about-card" key={card.title}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <Typography variant="h6" className="about-card-title">
                    {card.title}
                  </Typography>
                  <Link href="#" className="about-card-link">
                    {card.linkText}
                  </Link>
                </Box>
                <Typography variant="h5" className="about-card-icon">
                  {card.icon}
                </Typography>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
