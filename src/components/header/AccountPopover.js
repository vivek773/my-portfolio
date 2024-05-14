// Account popover

// Default
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI styles
import { alpha } from "@mui/material/styles";

// MUI components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";

// Utils
import { PROFILE } from "../../utils/Constants";

const AccountPopover = () => {
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(null);

  // const { user } = useSelector((state) => state.auth);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/* <Avatar alt="user-initials" sx={{ bgcolor: "#479DE1" }}>
          {`${user?.first_name.charAt(0)}${user?.last_name.charAt(0)}`}
        </Avatar> */}
        <Avatar alt="user-initials" sx={{ bgcolor: "#479DE1" }}>
          KC
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {user?.first_name} {user?.last_name} */}
            Kartik Chavda
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {/* {user?.email} */}
            kc72284@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(PROFILE);
            }}
          >
            Profile
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          // onClick={() => {
          //   handleClose();
          //   localStorage.removeItem("token");
          //   Cookies.remove("token");
          //   dispatch(logout());
          //   dispatch(reset());
          //   navigate("/login");
          // }}
          sx={{ m: 1 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
