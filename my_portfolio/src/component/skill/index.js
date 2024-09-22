import React from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Utils
import { SKILLS } from "../../utils/constant";

// Theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customTheme } from "../../theme";

const Skill = () => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.sm)
  );

  return (
    <Box className="skill" pt={8} pb={8}>
      <Container maxWidth="lg">
        <Typography variant="h5" className="skill-title">
          skills<span style={{ color: "#ffffff" }}>()</span>
        </Typography>

        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={ matchesMd ? 4 : 8}
          mt={5}
          justifyContent={matchesMd ? "center" : ""}
        >
          {SKILLS.map((skill) => (
            <Box
              key={skill.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                color: "#161616",
                backgroundColor: skill.bgColor,
                padding: matchesMd ? "30px 50px 30px 20px" : "30px 80px 30px 20px",
                borderRadius: "14px",
              }}
            >
              <Typography paragraph margin={0} width={"40px"}>
                {skill.name}
              </Typography>
              {skill.icon}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Skill;
