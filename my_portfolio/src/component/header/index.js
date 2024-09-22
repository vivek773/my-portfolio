// Header component

// Default
import { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

//MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

//Svg
import ContactIcon from "../../assets/svg/contact";

// Utils
import { CONFIG, PAGES, RESPONSIVE_PAGES } from "../../utils/constant";

const Header = () => {
  const [sideNav, setSideNav] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const userName = CONFIG.username.split(" ");

  useEffect(() => {
    setRefresh(true);
  }, []);
  
  useEffect(() => {
    scroll.scrollToTop();
  }, [refresh]);

  return (
    <>
      <Box className="header">
        <div>
          <Typography component="h4" variant="h4" className="header-logo">
            {userName[0]}
            <span className="header-logo-color">{userName[1]}</span>
          </Typography>
        </div>
        <nav>
          <ul className="header-nav">
            {PAGES.map((page) => (
              <li className={`header-navitem`} key={page.id}>
                <Link
                  to={page.name}
                  activeClass="header-active-tab"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="header-btn">
          <ContactIcon />
          <Typography component="h6" variant="h6">
            Contact me
          </Typography>
        </button>

        <div className="header-menu">
          {sideNav ? (
            <IconButton onClick={() => setSideNav(false)}>
              <CloseIcon fontSize="large" style={{ color: "#f0db4f" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setSideNav(true)} sx={{ padding: 0 }}>
              <MenuIcon fontSize="large" style={{ color: "#f0db4f" }} />
            </IconButton>
          )}
        </div>
      </Box>

      <Box className={`${sideNav ? "header-newNav" : "header-hideNav"}`}>
        {/* <div className="header-close">
          <IconButton onClick={() => setSideNav(false)}>
            <CloseIcon fontSize="large" style={{ color: "#f0db4f" }} />
          </IconButton>
        </div> */}
        <nav>
          <ul className="header-navList">
            {RESPONSIVE_PAGES.map((page) => (
              <li className="header-newItem" key={page.id}>
                <Link
                  to={page.name}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  onClick={() => setSideNav(false)}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Box>
    </>
  );
};

export default Header;
