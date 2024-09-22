// Main section

// Default
import { animateScroll as scroll } from "react-scroll";

// MUI components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// Layout
import Layout from "../../layout";

// components
import Home from "../home";
import About from "../about";
import Skill from "../skill";
import Project from "../project";
import MyJourney from "../myjourney";

const Main = () => {
  return (
    <Layout>
      {/* Home page */}
      <Box id={"Home"} pt={20}>
        <Home />
      </Box>

      {/* About page */}
      <Box id={"About"}>
        <About />
      </Box>

      {/* Skills page */}
      <Box id={"Skills"}>
        <Skill />
      </Box>

      {/* Project page */}
      <Box id="Projects">
        <Project />
      </Box>

      {/* Company page */}
      <Box id="My Journey">
        <MyJourney />
      </Box>

      <Box className="layout-scroll-btn">
        <IconButton onClick={() => scroll.scrollToTop()}>
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
    </Layout>
  );
};

export default Main;
