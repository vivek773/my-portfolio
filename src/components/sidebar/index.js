// Sidebar

// Default
import { useState } from "react";

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
import Scrollbar from "../scrollbar";

// Utils
import { ADMIN_CONFIG } from "../../utils/config";
import { NAV_LIST } from "../../utils/Color";


const Sidebar = () => {
  const NAV_WIDTH = 280;
  const [isActive, setIsActive] = useState(0);

  const renderContent = (
    <Scrollbar
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
          eDispatched
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}></Box>
      <Box sx={{ mb: 5, padding: "8px" }}>
        {ADMIN_CONFIG.map((config, index) => {
          return (
            <List sx={{ p: 0, height: "48px" }}>
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
                    color: isActive === index ? NAV_LIST.selectedNavColor : NAV_LIST.navColor,
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
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
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
    </Box>
  );
};

export default Sidebar;
