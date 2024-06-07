// Header

// MUI components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

// MUI styles
import { styled } from "@mui/material/styles";
import { bgBlur } from "../../utils/cssStyles";

// Redux
import { useSelector } from "react-redux";

// Custom
import CustomIconComponent from "../icon/CustomIconComponent";
import AccountPopoverComponent from "./AccountPopoverComponent";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: "#f9fafb" }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const HeaderComponent = ({ onOpenNav }) => {

  const auth = useSelector((state) => state.auth)

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <CustomIconComponent icon="eva:menu-2-fill" />
        </IconButton>
        <h1 style={{ color: "#637381" }}>{auth?.business_name}</h1>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopoverComponent auth={auth}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
export default HeaderComponent;