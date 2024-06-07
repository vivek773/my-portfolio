// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomButton from "../../forms/button/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomIconComponent from "../icon/CustomIconComponent";
// component

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: "80%",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: "80%",
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function BookingsToolbar({onChange,searchValue}) {
  const navigate = useNavigate();
  return (
    <StyledRoot>
      <StyledSearch
        value={searchValue}
        onChange={onChange}
        placeholder="Search booking..."
        startAdornment={
          <InputAdornment position="start">
            <CustomIconComponent icon="eva:search-fill" />
          </InputAdornment>
        }
      />
      <CustomButton
        label="Create Booking"
        width={"fit-content"}
        sx={{
          width: "auto",
          whiteSpace: "nowrap",
        }}
        onClick={() => navigate("/bookings/create-booking")}
      />
    </StyledRoot>
  );
}
