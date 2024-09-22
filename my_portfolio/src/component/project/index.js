// Default

import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Images
import Image1 from "../../assets/images/image1.png";

// Theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customTheme } from "../../theme";

const Project = () => {
  const theme = useTheme();
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [centerPadding, setCenterPadding] = useState(80);

  const matchesXs = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.xs)
  );

  const matchesSm = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.sm)
  );

  const matchesMd = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.md)
  );

  const matchesLg = useMediaQuery(
    theme.breakpoints.down(customTheme.breakpoints.values.lg)
  );

  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    if (matchesXs) {
      setSlidesToShow(1);
      setCenterPadding(60);
    } else if (matchesSm) {
      setSlidesToShow(1);
      setCenterPadding(90);
    } else if (matchesMd) {
      setSlidesToShow(2);
      setCenterPadding(40);
    } else if (matchesLg) {
      setSlidesToShow(2);
      setCenterPadding(60);
    } else {
      setSlidesToShow(3);
      setCenterPadding(80);
    }
  }, [matchesXs, matchesSm, matchesMd, matchesLg]);

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    centerMode: true,
    autoplay: true,
    centerPadding: `${centerPadding}px`,
    autoplaySpeed: 1500,
  };

  return (
    <div className="project">
      <Container maxWidth="lg">
        <Typography variant="h5" className="project-title">
          projects<span style={{ color: "#ffffff" }}>()</span>
        </Typography>
      </Container>
      <Slider {...settings}>
        {array.map((project) => {
          return (
            <Box className="project-slider-container" key={project}>
              <img
                src={Image1}
                alt={project}
                className="project-slider-img"
              />
              <Box className="project-slider-overlay">
                <Typography variant="h6">upwork</Typography>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </div>
  );
};

export default Project;
