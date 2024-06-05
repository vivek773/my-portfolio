// Sidebar

// Default
import { useState, useEffect } from "react";
import { useLocation, NavLink as RouterLink } from "react-router-dom";

// MUI components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

// Logo
import LOGO from "../../assets/images/logo-1024.png";

// Custom
import ScrollbarComponent from "../scrollbar/ScrollbarComponent";

// Utils
import { ADMIN_CONFIG } from "../../utils/Config";
import { NAV_LIST } from "../../utils/Color";

// hooks
import useResponsive from "../../hooks/useResponsive";

const SidebarComponent = ({ openNav, onCloseNav }) => {
  const NAV_WIDTH = 280;
  const [isActive, setIsActive] = useState(0);
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    const path = pathname.split("/")[1];
    const getIndex = ADMIN_CONFIG.findIndex((item) => item.path === path);
    setIsActive(getIndex);
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <ScrollbarComponent
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{ px: 2.5, py: 3, display: "inline-flex", alignItems: "center" }}
      >
        <img src={LOGO} alt="Logo" style={{ width: "50px", height: "50px" }} />
        <Typography sx={{ fontWeight: 500, paddingLeft: 1.5 }}>
          eDispatched-135
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}></Box>
      <Box sx={{ mb: 5, padding: "8px" }}>
        {ADMIN_CONFIG.map((config, index) => {
          return (
            <List sx={{ p: 0, height: "48px" }} key={config.path}>
              <ListItem
                button
                key={config.title}
                sx={{
                  px: 0,
                  alignItems: "center",
                  backgroundColor:
                    isActive === index
                      ? NAV_LIST.selectedNavBgColor
                      : "transparent",
                  borderRadius: "5px",
                }}
                onClick={() => setIsActive(index)}
                component={RouterLink}
                to={`/${config.path}`}
              >
                <ListItemIcon
                  sx={{ justifyContent: "center", fontSize: "22px" }}
                >
                  {config.icon}
                </ListItemIcon>
                <Typography
                  paragraph
                  sx={{
                    fontSize: "14px",
                    mt: 0.5,
                    mb: 0.5,
                    color:
                      isActive === index
                        ? NAV_LIST.selectedNavColor
                        : NAV_LIST.navColor,
                    fontWeight: isActive === index ? 700 : 500,
                  }}
                >
                  {config.title}
                </Typography>
              </ListItem>
            </List>
          );
        })}
      </Box>
    </ScrollbarComponent>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarComponent;
